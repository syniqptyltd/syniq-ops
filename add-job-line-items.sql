-- Migration: Add line items to jobs
-- Purpose: Allow jobs to have detailed line items for better invoice breakdowns
-- Date: 2025-12-18

-- ========================================
-- Add line_items column to jobs table
-- ========================================

ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS line_items jsonb DEFAULT '[]'::jsonb;

COMMENT ON COLUMN jobs.line_items IS 'Array of line items with description, quantity, and price for detailed job breakdowns';

-- ========================================
-- Example line_items structure:
-- ========================================
-- [
--   {
--     "id": "1",
--     "description": "Labor - 8 hours",
--     "quantity": 8,
--     "price": 500.00
--   },
--   {
--     "id": "2",
--     "description": "Materials - Pipes and fittings",
--     "quantity": 1,
--     "price": 1200.00
--   }
-- ]

-- ========================================
-- Migration Complete
-- ========================================

-- Summary:
-- 1. Added line_items jsonb column to jobs table
-- 2. Line items allow detailed breakdown of job costs
-- 3. Each line item has: id, description, quantity, price
-- 4. Maintains backward compatibility with existing pricing_type fields

-- Usage:
-- - Use line_items for detailed job breakdowns
-- - Falls back to pricing_type (fixed/hourly) if line_items is empty
-- - Invoice generation will prioritize line_items over fixed_price/hourly_rate
