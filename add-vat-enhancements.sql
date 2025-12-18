-- Migration: Add VAT enhancements
-- Purpose: Add client VAT number and business VAT registration status
-- Date: 2025-12-17

-- ========================================
-- Add client VAT number
-- ========================================

ALTER TABLE clients
ADD COLUMN IF NOT EXISTS vat_number text;

COMMENT ON COLUMN clients.vat_number IS 'Client VAT registration number for B2B invoicing';

-- ========================================
-- Add VAT registration flag to user profiles
-- ========================================

ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS is_vat_registered boolean DEFAULT false;

COMMENT ON COLUMN user_profiles.is_vat_registered IS 'Whether the business is currently VAT registered - controls VAT calculations';

-- ========================================
-- Indexes (optional, for performance)
-- ========================================

-- Index for searching clients by VAT number
CREATE INDEX IF NOT EXISTS idx_clients_vat_number ON clients(vat_number) WHERE vat_number IS NOT NULL;

-- ========================================
-- Migration Complete
-- ========================================

-- Summary:
-- 1. Added vat_number column to clients table
-- 2. Added is_vat_registered flag to user_profiles table
-- 3. Created index on client vat_number for performance

-- Usage:
-- - Set is_vat_registered to true in user profile when business registers for VAT
-- - When false, VAT calculations will be skipped in jobs and invoices
-- - Store client VAT numbers for B2B invoicing requirements
