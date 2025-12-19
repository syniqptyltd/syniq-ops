-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id TEXT NOT NULL CHECK (plan_id IN ('starter', 'professional', 'enterprise')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
    billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')),
    current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_period_end TIMESTAMPTZ NOT NULL,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
    paystack_subscription_code TEXT UNIQUE,
    paystack_customer_code TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create purchases table (for one-time payments)
CREATE TABLE IF NOT EXISTS public.purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_type TEXT NOT NULL CHECK (product_type IN ('annual_prepaid', 'lifetime')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'refunded')),
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'ZAR',
    expires_at TIMESTAMPTZ, -- NULL for lifetime purchases
    paystack_reference TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create payments table (audit log of all payment attempts)
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'ZAR',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'abandoned')),
    payment_type TEXT NOT NULL CHECK (payment_type IN ('subscription', 'one-time')),
    plan_id TEXT, -- For subscriptions
    product_type TEXT, -- For one-time purchases
    billing_cycle TEXT, -- For subscriptions
    paystack_reference TEXT UNIQUE NOT NULL,
    paystack_access_code TEXT,
    authorization_url TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_subscriptions_paystack_code ON public.subscriptions(paystack_subscription_code);

CREATE INDEX idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX idx_purchases_status ON public.purchases(status);
CREATE INDEX idx_purchases_reference ON public.purchases(paystack_reference);

CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_reference ON public.payments(paystack_reference);
CREATE INDEX idx_payments_status ON public.payments(status);

-- Create partial unique indexes for business logic constraints
-- Only one active subscription per user
CREATE UNIQUE INDEX unique_active_subscription_idx
    ON public.subscriptions (user_id)
    WHERE status IN ('active', 'trialing');

-- Only one active purchase per user per product type
CREATE UNIQUE INDEX unique_active_purchase_idx
    ON public.purchases (user_id, product_type)
    WHERE status = 'active';

-- Enable Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
CREATE POLICY "Users can view their own subscriptions"
    ON public.subscriptions FOR SELECT
    USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Service role can manage all subscriptions"
    ON public.subscriptions FOR ALL
    USING (true)
    WITH CHECK (true);

-- RLS Policies for purchases
CREATE POLICY "Users can view their own purchases"
    ON public.purchases FOR SELECT
    USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Service role can manage all purchases"
    ON public.purchases FOR ALL
    USING (true)
    WITH CHECK (true);

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments"
    ON public.payments FOR SELECT
    USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Service role can manage all payments"
    ON public.payments FOR ALL
    USING (true)
    WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchases_updated_at
    BEFORE UPDATE ON public.purchases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Helper function to check if user has active subscription or purchase
CREATE OR REPLACE FUNCTION has_active_access(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.subscriptions
        WHERE user_id = p_user_id
        AND status IN ('active', 'trialing')
        AND current_period_end > NOW()
    ) OR EXISTS (
        SELECT 1 FROM public.purchases
        WHERE user_id = p_user_id
        AND status = 'active'
        AND (expires_at IS NULL OR expires_at > NOW())
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
