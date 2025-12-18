-- Migration: Add Expense Tracking
-- Purpose: Track business expenses for accounting and reporting
-- Date: 2025-12-17

-- ========================================
-- Create expenses table
-- ========================================

CREATE TABLE IF NOT EXISTS expenses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Expense details
  description text NOT NULL,
  amount numeric NOT NULL CHECK (amount >= 0),
  category text NOT NULL,

  -- Date information
  expense_date date NOT NULL DEFAULT CURRENT_DATE,

  -- Optional fields
  vendor text,
  payment_method text,
  reference_number text,
  notes text,

  -- Attachments (for future use)
  receipt_url text,

  -- Tax information
  is_vat_claimable boolean DEFAULT false,
  vat_amount numeric DEFAULT 0,

  -- Timestamps
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- ========================================
-- Create expense categories enum (as table for flexibility)
-- ========================================

CREATE TABLE IF NOT EXISTS expense_categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  color text,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, name)
);

-- ========================================
-- Add default expense categories
-- ========================================

-- This will be done per user when they first access expenses
-- Common categories: Office Supplies, Travel, Marketing, Equipment, etc.

-- ========================================
-- Row Level Security
-- ========================================

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_categories ENABLE ROW LEVEL SECURITY;

-- Users can only see their own expenses
CREATE POLICY "Users can view their own expenses" ON expenses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own expenses" ON expenses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses" ON expenses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses" ON expenses
  FOR DELETE USING (auth.uid() = user_id);

-- Users can only see their own categories
CREATE POLICY "Users can view their own categories" ON expense_categories
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own categories" ON expense_categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categories" ON expense_categories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categories" ON expense_categories
  FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- Indexes for performance
-- ========================================

CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_expense_date ON expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_user_date ON expenses(user_id, expense_date DESC);

CREATE INDEX IF NOT EXISTS idx_expense_categories_user_id ON expense_categories(user_id);

-- ========================================
-- Trigger for updated_at
-- ========================================

CREATE OR REPLACE FUNCTION update_expenses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER expenses_updated_at
  BEFORE UPDATE ON expenses
  FOR EACH ROW
  EXECUTE FUNCTION update_expenses_updated_at();

-- ========================================
-- Migration Complete
-- ========================================

-- Summary:
-- 1. Created expenses table with comprehensive fields
-- 2. Created expense_categories table for custom categories
-- 3. Set up Row Level Security policies
-- 4. Created indexes for performance
-- 5. Added trigger for automatic updated_at

-- Features:
-- - Track amount, date, category, vendor
-- - Payment method and reference number
-- - Optional receipt attachments
-- - VAT claimable flag for tax purposes
-- - Custom expense categories per user
-- - Full audit trail with timestamps

-- Common expense categories to add:
-- - Office Supplies
-- - Travel & Transport
-- - Marketing & Advertising
-- - Equipment & Tools
-- - Software & Subscriptions
-- - Utilities
-- - Professional Services
-- - Insurance
-- - Rent & Facilities
-- - Meals & Entertainment
-- - Training & Education
-- - Bank Fees & Charges
-- - Other
