-- =====================================================
-- Test Account Setup with Example Content
-- =====================================================
-- This script creates a test user account with sample data
-- for demonstration purposes
-- =====================================================

-- Note: You'll need to create the user through Supabase Auth first
-- Test Credentials:
-- Email: test@syniqops.com
-- Password: TestPassword123!

-- After creating the auth user, get the user_id from Supabase Auth
-- User ID: d121338e-c672-4f2a-8600-cad8ba292d35

-- =====================================================
-- 1. Create User Profile
-- =====================================================
INSERT INTO user_profiles (
  user_id,
  business_name,
  vat_number,
  registration_number,
  is_vat_registered,
  address_line1,
  address_line2,
  city,
  postal_code,
  country,
  phone,
  email,
  website,
  logo_url,
  invoice_primary_color,
  invoice_secondary_color,
  invoice_accent_color,
  invoice_font,
  invoice_footer_text,
  invoice_header_style,
  invoice_show_logo,
  invoice_logo_position
) VALUES (
  'd121338e-c672-4f2a-8600-cad8ba292d35',
  'Syniq Ops Demo',
  'VAT4987654321',
  '2024/123456/07',
  true,
  '123 Innovation Drive',
  'Tech Park, Building 5',
  'Cape Town',
  '8001',
  'South Africa',
  '+27 21 123 4567',
  'demo@syniqops.com',
  'https://www.syniqops.com',
  null,
  '#355E58', -- Spruce (from your color palette)
  '#72B0AB', -- Sapphire
  '#CFB97E', -- Sage
  'helvetica',
  'Thank you for your business! Payment terms: 30 days.',
  'gradient',
  true,
  'left'
);

-- =====================================================
-- 2. Create Sample Clients
-- =====================================================
INSERT INTO clients (
  user_id,
  name,
  email,
  phone,
  vat_number,
  billing_address,
  billing_city,
  billing_postal_code,
  billing_country
) VALUES
  (
    'd121338e-c672-4f2a-8600-cad8ba292d35',
    'Acme Corporation',
    'accounts@acmecorp.co.za',
    '+27 11 234 5678',
    'VAT4111222333',
    '456 Business Boulevard',
    'Johannesburg',
    '2001',
    'South Africa'
  ),
  (
    'd121338e-c672-4f2a-8600-cad8ba292d35',
    'Green Energy Solutions',
    'billing@greenenergy.co.za',
    '+27 21 987 6543',
    'VAT4555666777',
    '789 Renewable Road',
    'Cape Town',
    '8000',
    'South Africa'
  ),
  (
    'd121338e-c672-4f2a-8600-cad8ba292d35',
    'Digital Marketing Pro',
    'finance@digitalpro.co.za',
    '+27 31 456 7890',
    null,
    '321 Social Media Street',
    'Durban',
    '4001',
    'South Africa'
  ),
  (
    'd121338e-c672-4f2a-8600-cad8ba292d35',
    'Tech Innovators Ltd',
    'payments@techinnovators.co.za',
    '+27 12 345 6789',
    'VAT4888999000',
    '654 Innovation Avenue',
    'Pretoria',
    '0002',
    'South Africa'
  ),
  (
    'd121338e-c672-4f2a-8600-cad8ba292d35',
    'Coastal Construction',
    'admin@coastalconstruction.co.za',
    '+27 41 234 5678',
    'VAT4222333444',
    '147 Harbor Drive',
    'Port Elizabeth',
    '6001',
    'South Africa'
  );

-- =====================================================
-- 3. Create Sample Jobs
-- =====================================================
-- Note: Replace client_id values after inserting clients
-- You can get client IDs with: SELECT id, name FROM clients WHERE user_id = 'YOUR_USER_ID_HERE';

WITH sample_clients AS (
  SELECT id, name FROM clients WHERE user_id = 'd121338e-c672-4f2a-8600-cad8ba292d35'::uuid LIMIT 5
)
INSERT INTO jobs (
  user_id,
  client_id,
  title,
  description,
  status,
  due_date
)
SELECT
  'd121338e-c672-4f2a-8600-cad8ba292d35'::uuid,
  (SELECT id FROM sample_clients WHERE name = 'Acme Corporation'),
  'Website Redesign',
  'Complete overhaul of company website with modern design and improved UX',
  'in_progress',
  CURRENT_DATE + INTERVAL '14 days'
UNION ALL
SELECT
  'd121338e-c672-4f2a-8600-cad8ba292d35',
  (SELECT id FROM sample_clients WHERE name = 'Green Energy Solutions'),
  'Solar Panel Installation',
  'Install 20kW solar system with battery backup',
  'completed',
  CURRENT_DATE - INTERVAL '5 days'
UNION ALL
SELECT
  'd121338e-c672-4f2a-8600-cad8ba292d35',
  (SELECT id FROM sample_clients WHERE name = 'Digital Marketing Pro'),
  'Social Media Management',
  'Monthly social media content creation and management',
  'in_progress',
  CURRENT_DATE + INTERVAL '15 days'
UNION ALL
SELECT
  'd121338e-c672-4f2a-8600-cad8ba292d35',
  (SELECT id FROM sample_clients WHERE name = 'Tech Innovators Ltd'),
  'Cloud Infrastructure Setup',
  'Design and implement AWS cloud infrastructure',
  'pending',
  CURRENT_DATE + INTERVAL '30 days'
UNION ALL
SELECT
  'd121338e-c672-4f2a-8600-cad8ba292d35',
  (SELECT id FROM sample_clients WHERE name = 'Coastal Construction'),
  'Building Maintenance',
  'Quarterly building maintenance and repairs',
  'completed',
  CURRENT_DATE - INTERVAL '15 days';

-- =====================================================
-- 4. Create Sample Invoices
-- =====================================================
WITH sample_clients AS (
  SELECT id, name FROM clients WHERE user_id = 'd121338e-c672-4f2a-8600-cad8ba292d35'
)
INSERT INTO invoices (
  user_id,
  invoice_number,
  client_id,
  amount,
  status,
  due_date,
  line_items,
  created_at
)
SELECT
  'd121338e-c672-4f2a-8600-cad8ba292d35',
  'INV-' || TO_CHAR(CURRENT_DATE - INTERVAL '30 days', 'YYYYMMDD') || '-001',
  (SELECT id FROM sample_clients WHERE name = 'Green Energy Solutions'),
  89250.00,
  'paid',
  CURRENT_DATE - INTERVAL '15 days',
  ARRAY['[
    {"id": "1", "description": "Solar Panels (20x 500W)", "quantity": 20, "price": 3500},
    {"id": "2", "description": "Inverter 10kW", "quantity": 1, "price": 15000},
    {"id": "3", "description": "Battery Storage 15kWh", "quantity": 1, "price": 25000},
    {"id": "4", "description": "Installation Labour", "quantity": 40, "price": 750}
  ]'::jsonb],
  CURRENT_DATE - INTERVAL '30 days'
UNION ALL
SELECT
  'd121338e-c672-4f2a-8600-cad8ba292d35',
  'INV-' || TO_CHAR(CURRENT_DATE - INTERVAL '20 days', 'YYYYMMDD') || '-002',
  (SELECT id FROM sample_clients WHERE name = 'Acme Corporation'),
  51750.00,
  'unpaid',
  CURRENT_DATE + INTERVAL '10 days',
  ARRAY['[
    {"id": "1", "description": "Website Design", "quantity": 1, "price": 25000},
    {"id": "2", "description": "Frontend Development", "quantity": 80, "price": 850},
    {"id": "3", "description": "Backend Development", "quantity": 60, "price": 950},
    {"id": "4", "description": "Content Migration", "quantity": 20, "price": 600}
  ]'::jsonb],
  CURRENT_DATE - INTERVAL '20 days'
UNION ALL
SELECT
  'd121338e-c672-4f2a-8600-cad8ba292d35',
  'INV-' || TO_CHAR(CURRENT_DATE - INTERVAL '10 days', 'YYYYMMDD') || '-003',
  (SELECT id FROM sample_clients WHERE name = 'Digital Marketing Pro'),
  34000.00,
  'unpaid',
  CURRENT_DATE + INTERVAL '20 days',
  ARRAY['[
    {"id": "1", "description": "Social Media Strategy", "quantity": 1, "price": 8000},
    {"id": "2", "description": "Content Creation (40 posts)", "quantity": 40, "price": 350},
    {"id": "3", "description": "Community Management", "quantity": 30, "price": 400}
  ]'::jsonb],
  CURRENT_DATE - INTERVAL '10 days'
UNION ALL
SELECT
  'd121338e-c672-4f2a-8600-cad8ba292d35',
  'INV-' || TO_CHAR(CURRENT_DATE - INTERVAL '60 days', 'YYYYMMDD') || '-004',
  (SELECT id FROM sample_clients WHERE name = 'Coastal Construction'),
  23000.00,
  'overdue',
  CURRENT_DATE - INTERVAL '30 days',
  ARRAY['[
    {"id": "1", "description": "Roof Repairs", "quantity": 1, "price": 12000},
    {"id": "2", "description": "Painting Services", "quantity": 5, "price": 1500},
    {"id": "3", "description": "Plumbing Maintenance", "quantity": 8, "price": 750}
  ]'::jsonb],
  CURRENT_DATE - INTERVAL '60 days'
UNION ALL
SELECT
  'd121338e-c672-4f2a-8600-cad8ba292d35',
  'INV-' || TO_CHAR(CURRENT_DATE - INTERVAL '5 days', 'YYYYMMDD') || '-005',
  (SELECT id FROM sample_clients WHERE name = 'Tech Innovators Ltd'),
  77625.00,
  'unpaid',
  CURRENT_DATE + INTERVAL '25 days',
  ARRAY['[
    {"id": "1", "description": "AWS Infrastructure Design", "quantity": 1, "price": 20000},
    {"id": "2", "description": "Server Configuration", "quantity": 40, "price": 950},
    {"id": "3", "description": "Database Setup & Optimization", "quantity": 25, "price": 1100},
    {"id": "4", "description": "Security Implementation", "quantity": 30, "price": 850}
  ]'::jsonb],
  CURRENT_DATE - INTERVAL '5 days';

-- =====================================================
-- Success Message
-- =====================================================
SELECT
  'Test account setup complete!' as message,
  'Email: test@syniqops.com' as login_email,
  'Password: TestPassword123!' as login_password,
  'Remember to replace YOUR_USER_ID_HERE with actual user ID' as important_note;
