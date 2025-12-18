-- Quick fix migration for immediate testing
-- This adds the missing due_date column to the jobs table
-- Run this in your Supabase SQL Editor if you already have the tables created

-- First, let's check what columns exist and add missing ones

-- For jobs table
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS due_date date;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- For invoices table
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS due_date date;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS line_items jsonb DEFAULT '[]'::jsonb;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS invoice_number text;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- For clients table
ALTER TABLE clients ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);

-- Enable RLS (if not already enabled)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own clients" ON clients;
DROP POLICY IF EXISTS "Users can insert their own clients" ON clients;
DROP POLICY IF EXISTS "Users can update their own clients" ON clients;
DROP POLICY IF EXISTS "Users can delete their own clients" ON clients;

DROP POLICY IF EXISTS "Users can view their own jobs" ON jobs;
DROP POLICY IF EXISTS "Users can insert their own jobs" ON jobs;
DROP POLICY IF EXISTS "Users can update their own jobs" ON jobs;
DROP POLICY IF EXISTS "Users can delete their own jobs" ON jobs;

DROP POLICY IF EXISTS "Users can view their own invoices" ON invoices;
DROP POLICY IF EXISTS "Users can insert their own invoices" ON invoices;
DROP POLICY IF EXISTS "Users can update their own invoices" ON invoices;
DROP POLICY IF EXISTS "Users can delete their own invoices" ON invoices;

-- Create RLS policies for clients table
CREATE POLICY "Users can view their own clients"
  ON clients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own clients"
  ON clients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own clients"
  ON clients FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own clients"
  ON clients FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS policies for jobs table
CREATE POLICY "Users can view their own jobs"
  ON jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own jobs"
  ON jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs"
  ON jobs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jobs"
  ON jobs FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS policies for invoices table
CREATE POLICY "Users can view their own invoices"
  ON invoices FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own invoices"
  ON invoices FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own invoices"
  ON invoices FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own invoices"
  ON invoices FOR DELETE
  USING (auth.uid() = user_id);

-- IMPORTANT: Update existing data with your user_id
-- First, get your user ID by running:
-- SELECT id, email FROM auth.users;
--
-- Then uncomment and run these with your actual user ID:
-- UPDATE clients SET user_id = 'YOUR_USER_ID_HERE' WHERE user_id IS NULL;
-- UPDATE jobs SET user_id = 'YOUR_USER_ID_HERE' WHERE user_id IS NULL;
-- UPDATE invoices SET user_id = 'YOUR_USER_ID_HERE' WHERE user_id IS NULL;
