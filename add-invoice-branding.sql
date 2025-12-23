-- Add invoice branding fields to user_profiles table
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS invoice_primary_color text DEFAULT '#4F46E5';
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS invoice_secondary_color text DEFAULT '#6366F1';
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS invoice_accent_color text DEFAULT '#8B5CF6';
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS invoice_font text DEFAULT 'helvetica';
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS invoice_footer_text text DEFAULT 'Thank you for your business!';
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS invoice_header_style text DEFAULT 'gradient';
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS invoice_show_logo boolean DEFAULT true;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS invoice_logo_position text DEFAULT 'left';

-- Add comments for documentation
COMMENT ON COLUMN user_profiles.invoice_primary_color IS 'Primary color for invoice header and accents (hex format)';
COMMENT ON COLUMN user_profiles.invoice_secondary_color IS 'Secondary color for invoice elements (hex format)';
COMMENT ON COLUMN user_profiles.invoice_accent_color IS 'Accent color for highlights (hex format)';
COMMENT ON COLUMN user_profiles.invoice_font IS 'Font family for invoice: helvetica, times, courier';
COMMENT ON COLUMN user_profiles.invoice_footer_text IS 'Custom footer text for invoices';
COMMENT ON COLUMN user_profiles.invoice_header_style IS 'Header style: solid, gradient, minimal';
COMMENT ON COLUMN user_profiles.invoice_show_logo IS 'Whether to display logo on invoices';
COMMENT ON COLUMN user_profiles.invoice_logo_position IS 'Logo position: left, center, right';
