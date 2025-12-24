# Paystack Payment Integration Documentation

Complete guide for the Paystack payment integration in Syniq Ops.

## Overview

This integration handles:
- ✅ Subscription payments (monthly/yearly)
- ✅ One-time payments (annual prepaid/lifetime)
- ✅ Webhook-driven confirmations
- ✅ Supabase as source of truth
- ✅ Secure server-side processing

## Architecture

### Payment Flow

```
User clicks "Start Free Trial" → Server Action initializes payment
                                        ↓
                            Creates pending payment record
                                        ↓
                        Redirects to Paystack payment page
                                        ↓
                            User completes payment
                                        ↓
                    Paystack sends webhook to /api/webhooks/paystack
                                        ↓
                    Webhook verifies signature & processes
                                        ↓
            Updates subscription/purchase records in Supabase
                                        ↓
                    Redirects user to /payment/callback
                                        ↓
                    Callback page verifies status & redirects to dashboard
```

### Security Model

1. **Server-side only**: All Paystack API calls use secret key on server
2. **Webhook validation**: Verifies Paystack signature before processing
3. **Idempotency**: Handles duplicate webhook calls gracefully
4. **Source of truth**: Supabase database, not Paystack callbacks

## Setup

### 1. Environment Variables

Add to your `.env.local`:

```env
# Paystack Configuration
# For PRODUCTION (Live keys - charges real money):
PAYSTACK_SECRET_KEY=sk_live_your_live_secret_key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_live_public_key

# For DEVELOPMENT (Test keys - no real charges):
# PAYSTACK_SECRET_KEY=sk_test_your_test_secret_key
# NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_test_public_key

PAYSTACK_WEBHOOK_SECRET=your_webhook_secret

# Supabase Service Role (for webhooks)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Get Paystack keys from**: https://dashboard.paystack.com/#/settings/developer

**⚠️ IMPORTANT - Live vs Test Keys:**
- **Test keys** (`sk_test_...` / `pk_test_...`): Use for development. No real money charged.
- **Live keys** (`sk_live_...` / `pk_live_...`): Use for production. Real payments processed.
- **Current Status**: ✅ Live keys are configured and active (verified account)
- Switch between test/live by commenting/uncommenting the appropriate lines
- Never commit live keys to version control (already in `.gitignore`)

### 2. Database Migration

Run the migration to create payment tables:

```bash
# If using Supabase CLI
supabase db push

# Or apply the migration file directly in Supabase dashboard
# File: supabase/migrations/20250101000001_create_payments_schema.sql
```

### 3. Configure Paystack Webhook

1. Go to https://dashboard.paystack.com/#/settings/developer
2. Add webhook URL: `https://your-domain.com/api/webhooks/paystack`
3. Copy the webhook secret to `PAYSTACK_WEBHOOK_SECRET`

## Database Schema

### Tables

**subscriptions**
- Stores recurring subscription information
- One active subscription per user
- Tracks billing cycle, period dates, cancellation status

**purchases**
- Stores one-time purchases (annual/lifetime)
- One active purchase per product type per user
- Tracks expiry dates (null for lifetime)

**payments**
- Audit log of all payment attempts
- Links to Paystack references
- Tracks payment status (pending/success/failed)

### Functions

- `has_active_access(user_id)`: Check if user has valid subscription or purchase

## API Reference

### Server Actions

Located in `src/lib/paystack/actions.ts`

#### `initializeSubscriptionPayment(planId, billingCycle)`

Initializes a subscription payment.

**Parameters:**
- `planId`: 'starter' | 'professional' | 'enterprise'
- `billingCycle`: 'monthly' | 'yearly'

**Returns:**
```ts
{
  success: true,
  authorizationUrl: string,
  reference: string
} | {
  error: string
}
```

#### `initializeOneTimePayment(productType)`

Initializes a one-time payment.

**Parameters:**
- `productType`: 'annual_prepaid' | 'lifetime'

**Returns:**
```ts
{
  success: true,
  authorizationUrl: string,
  reference: string
} | {
  error: string
}
```

#### `getUserSubscriptionStatus()`

Gets current user's subscription/purchase status.

**Returns:**
```ts
{
  subscription: Subscription | null,
  purchase: Purchase | null,
  hasAccess: boolean
}
```

#### `cancelSubscription()`

Cancels user's subscription at period end.

**Returns:**
```ts
{
  success: true,
  message: string
} | {
  error: string
}
```

### Webhooks

#### POST `/api/webhooks/paystack`

Handles Paystack webhook events.

**Events processed:**
- `charge.success`: Payment successful → creates/updates subscription or purchase
- `subscription.create`: Subscription created
- `subscription.not_renew`: Subscription will not renew
- `subscription.disable`: Subscription disabled

**Security:**
- Verifies `x-paystack-signature` header
- Validates signature with webhook secret
- Rejects invalid requests with 401

### API Routes

#### GET `/api/payment/verify?reference={reference}`

Verifies payment status for client-side polling.

**Response:**
```json
{
  "status": "success" | "pending" | "failed",
  "payment_type": "subscription" | "one-time",
  "amount": number,
  "message": string
}
```

## Components

### `<SubscriptionPaymentButton>`

Located in `src/components/pricing/payment-button.tsx`

```tsx
<SubscriptionPaymentButton
  planId="professional"
  billingCycle="monthly"
  label="Start Free Trial"
  variant="default"
/>
```

**Props:**
- `planId`: Plan identifier
- `billingCycle`: Billing frequency
- `label`: Button text
- `variant`: Button style

### `<OneTimePaymentButton>`

```tsx
<OneTimePaymentButton
  productType="lifetime"
  label="Claim Your Spot"
/>
```

**Props:**
- `productType`: Product identifier
- `label`: Button text

## Pages

### `/payment/callback`

Success page shown after payment completion.
- Polls payment status
- Shows loading/success/failed states
- Auto-redirects to dashboard on success

### `/payment/canceled`

Shown when user cancels payment.
- Provides options to retry or return to dashboard

## Testing

### Test Mode

1. Use test API keys from Paystack dashboard
2. Test card numbers:
   - Success: `4084084084084081`
   - Declined: `4084080000000408`

### Webhook Testing

Use Paystack's webhook testing tool or:

```bash
# Install Paystack CLI
npm install -g @paystack/cli

# Forward webhooks to localhost
paystack webhooks forward http://localhost:3000/api/webhooks/paystack
```

### Manual Testing Checklist

- [ ] Initialize subscription payment (monthly)
- [ ] Initialize subscription payment (yearly)
- [ ] Initialize one-time payment (annual)
- [ ] Initialize one-time payment (lifetime)
- [ ] Complete payment successfully
- [ ] Cancel payment
- [ ] Webhook processes correctly
- [ ] Database records created
- [ ] User has access after payment
- [ ] Cancel subscription works

## Pricing Configuration

Edit prices in `src/lib/paystack/config.ts`:

```ts
export const PAYSTACK_CONFIG = {
  plans: {
    professional: {
      monthly: {
        amount: 59900, // R599 in kobo (1 ZAR = 100 kobo)
        interval: 'monthly',
      },
      yearly: {
        amount: 597000, // R5,970 in kobo
        interval: 'annually',
      },
    },
  },
}
```

**Important:** Amounts are in kobo (1/100 of ZAR)

## Subscription Management

### Check User Access

```ts
import { hasActiveAccess } from '@/lib/auth/subscription'

const hasAccess = await hasActiveAccess()
if (!hasAccess) {
  redirect('/pricing')
}
```

### Get Subscription Details

```ts
import { getSubscriptionDetails } from '@/lib/auth/subscription'

const subscription = await getSubscriptionDetails()
if (subscription) {
  console.log('Plan:', subscription.plan_id)
  console.log('Expires:', subscription.current_period_end)
}
```

### Protect Routes

```ts
import { requireActiveAccess } from '@/lib/auth/subscription'

export default async function ProtectedPage() {
  const { redirect, hasAccess } = await requireActiveAccess()

  if (redirect) {
    return redirect(redirect)
  }

  return <div>Protected content</div>
}
```

## Common Issues

### Webhook not receiving events

1. Check webhook URL is correct in Paystack dashboard
2. Verify webhook secret is correct
3. Check server logs for errors
4. Test with Paystack webhook testing tool

### Payment successful but subscription not created

1. Check webhook logs: `console.log` statements in webhook handler
2. Verify Supabase service role key is correct
3. Check RLS policies allow service role to insert

### Double-charging prevention

The system handles this automatically:
- Idempotent webhook processing (checks if already processed)
- Unique constraints on payment references
- Status checks before creating records

## Production Checklist

Before going live:

- [ ] Switch to live API keys
- [ ] Update webhook URL to production domain
- [ ] Test with real ZAR amounts
- [ ] Verify RLS policies are correct
- [ ] Set up monitoring/alerts for failed payments
- [ ] Document customer support procedures
- [ ] Test subscription renewal flow
- [ ] Test cancellation flow
- [ ] Verify email notifications (if implemented)

## Support

For Paystack issues:
- Dashboard: https://dashboard.paystack.com
- Docs: https://paystack.com/docs
- Support: support@paystack.com

For integration issues:
- Check server logs
- Verify environment variables
- Test in development mode first
- Review webhook payload in Paystack dashboard
