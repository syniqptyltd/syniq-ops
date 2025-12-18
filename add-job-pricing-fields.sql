-- Add pricing fields to jobs table for invoice automation
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS hourly_rate numeric;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS hours_worked numeric;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS fixed_price numeric;

-- Add a pricing_type column to track whether job is fixed price or hourly
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS pricing_type text DEFAULT 'fixed';

-- Add a comment to explain the pricing fields
COMMENT ON COLUMN jobs.hourly_rate IS 'Hourly rate in ZAR for hourly jobs';
COMMENT ON COLUMN jobs.hours_worked IS 'Total hours worked on the job';
COMMENT ON COLUMN jobs.fixed_price IS 'Fixed price in ZAR for fixed-price jobs';
COMMENT ON COLUMN jobs.pricing_type IS 'Either "fixed" or "hourly" - determines which pricing fields to use';
