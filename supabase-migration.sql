-- Migration to create tables and set up Row Level Security (RLS)
-- Run this in your Supabase SQL Editor

-- Create clients table if it doesn't exist
CREATE TABLE IF NOT EXISTS clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  notes text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create jobs table if it doesn't exist
CREATE TABLE IF NOT EXISTS jobs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  due_date date NOT NULL,
  description text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create invoices table if it doesn't exist
CREATE TABLE IF NOT EXISTS invoices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  invoice_number text NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  status text DEFAULT 'unpaid' NOT NULL,
  due_date date NOT NULL,
  line_items jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Add user_id column to clients table if it doesn't exist (for existing tables)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clients' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE clients ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add user_id column to jobs table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE jobs ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add user_id column to invoices table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'invoices' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE invoices ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add due_date column to jobs table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'due_date'
  ) THEN
    ALTER TABLE jobs ADD COLUMN due_date date;
  END IF;
END $$;

-- Add description column to jobs table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'description'
  ) THEN
    ALTER TABLE jobs ADD COLUMN description text;
  END IF;
END $$;

-- Add due_date column to invoices table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'invoices' AND column_name = 'due_date'
  ) THEN
    ALTER TABLE invoices ADD COLUMN due_date date;
  END IF;
END $$;

-- Add line_items column to invoices table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'invoices' AND column_name = 'line_items'
  ) THEN
    ALTER TABLE invoices ADD COLUMN line_items jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Add invoice_number column to invoices table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'invoices' AND column_name = 'invoice_number'
  ) THEN
    ALTER TABLE invoices ADD COLUMN invoice_number text;
  END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);

-- Enable Row Level Security on all tables
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

-- Note: If you have existing data in these tables without user_id values,
-- you'll need to update them manually or they won't be visible after RLS is enabled.
-- Example to update existing records (uncomment and modify as needed):
-- UPDATE clients SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
-- UPDATE jobs SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
-- UPDATE invoices SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
