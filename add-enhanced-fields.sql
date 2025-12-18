-- Add VAT inclusive/exclusive option to jobs
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS vat_inclusive boolean DEFAULT false;

-- Add client address fields
ALTER TABLE clients ADD COLUMN IF NOT EXISTS billing_address text;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS billing_city text;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS billing_postal_code text;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS billing_country text DEFAULT 'South Africa';

-- Add job site address
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS job_address text;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS job_city text;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS job_postal_code text;

-- Create user profiles table for company information
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  business_name text,
  vat_number text,
  registration_number text,
  address_line1 text,
  address_line2 text,
  city text,
  postal_code text,
  country text DEFAULT 'South Africa',
  phone text,
  email text,
  website text,
  logo_url text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create index for user_profiles
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Enable RLS for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" ON user_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Add comments for documentation
COMMENT ON TABLE user_profiles IS 'Stores business/company information for users';
COMMENT ON COLUMN user_profiles.vat_number IS 'VAT registration number';
COMMENT ON COLUMN user_profiles.registration_number IS 'Company registration number';

COMMENT ON COLUMN jobs.vat_inclusive IS 'Whether the pricing includes VAT or is exclusive';
COMMENT ON COLUMN jobs.job_address IS 'Physical address where the job is being performed';

COMMENT ON COLUMN clients.billing_address IS 'Client billing address line 1';
COMMENT ON COLUMN clients.billing_city IS 'Client billing city';
