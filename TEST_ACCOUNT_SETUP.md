# Test Account Setup Guide

This guide will help you create a test account with example content for Syniq Ops.

## Quick Setup

### Test Account Credentials
```
Email: test@syniqops.com
Password: TestPassword123!
```

## Step-by-Step Instructions

### Step 1: Create Auth User in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User** → **Create new user**
4. Enter the following:
   - **Email**: `test@syniqops.com`
   - **Password**: `TestPassword123!`
   - **Auto Confirm User**: ✅ (check this)
5. Click **Create User**
6. **Copy the User ID** (UUID) from the newly created user

### Step 2: Update the SQL Script

1. Open `setup-test-account.sql`
2. Find all instances of `YOUR_USER_ID_HERE`
3. Replace with the User ID you copied from Step 1
4. Save the file

### Step 3: Run the SQL Script

#### Option A: Using Supabase SQL Editor (Recommended)
1. Go to Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `setup-test-account.sql`
4. Click **Run** or press `Ctrl+Enter`

#### Option B: Using psql Command Line
```bash
# Make sure to replace YOUR_USER_ID in the file first!
psql -h your-supabase-host -U postgres -d postgres -f setup-test-account.sql
```

### Step 4: Verify Setup

1. Log in to the application using:
   - Email: `test@syniqops.com`
   - Password: `TestPassword123!`

2. You should see:
   - ✅ 5 Sample Clients
   - ✅ 5 Sample Jobs (with different statuses)
   - ✅ 5 Sample Invoices (paid, unpaid, and overdue)
   - ✅ Company Profile with branding settings
   - ✅ Custom invoice branding configured

## What Gets Created

### User Profile
- **Business Name**: Syniq Ops Demo
- **VAT Number**: VAT4987654321
- **Registration**: 2024/123456/07
- **Address**: 123 Innovation Drive, Cape Town
- **Invoice Branding**: Custom colors matching your site palette

### Sample Clients (5)
1. **Acme Corporation** - Johannesburg
2. **Green Energy Solutions** - Cape Town
3. **Digital Marketing Pro** - Durban (not VAT registered)
4. **Tech Innovators Ltd** - Pretoria
5. **Coastal Construction** - Port Elizabeth

### Sample Jobs (5)
1. **Website Redesign** (In Progress) - R45,000
2. **Solar Panel Installation** (Completed) - Line items pricing
3. **Social Media Management** (In Progress) - Hourly @ R850/hr
4. **Cloud Infrastructure Setup** (Pending) - R67,500
5. **Building Maintenance** (Completed) - Line items pricing

### Sample Invoices (5)
1. **Paid Invoice** - Green Energy Solutions - R89,250
2. **Unpaid Invoice** - Acme Corporation - R51,750
3. **Unpaid Invoice** - Digital Marketing Pro - R34,000
4. **Overdue Invoice** - Coastal Construction - R23,000 (30 days overdue)
5. **Recent Invoice** - Tech Innovators Ltd - R77,625

## Testing Scenarios

### 1. Invoice Management
- View invoices with different statuses
- Download PDF invoices with custom branding
- Mark invoices as paid
- Create new invoices from jobs

### 2. Job Management
- View jobs in different states (pending, in progress, completed)
- Different pricing models (fixed, hourly, line items)
- Generate invoices from completed jobs

### 3. Client Management
- View clients with complete billing information
- Some clients with VAT, some without
- Multiple cities across South Africa

### 4. Invoice Branding
- Go to Profile → Invoice Branding
- Colors are pre-configured with your site palette:
  - Primary: Spruce (#355E58)
  - Secondary: Sapphire (#72B0AB)
  - Accent: Sage (#CFB97E)
- Test different header styles and fonts

### 5. Dashboard Analytics
- View total revenue from paid invoices
- Outstanding invoice amounts
- Job completion statistics

## Customizing Test Data

### Adding More Clients
```sql
INSERT INTO clients (user_id, name, email, phone, vat_number, billing_address, billing_city, billing_postal_code, billing_country)
VALUES ('YOUR_USER_ID', 'New Client Name', 'email@example.com', '+27 XX XXX XXXX', 'VATXXXXXXX', 'Address', 'City', 'Code', 'South Africa');
```

### Adding More Jobs
```sql
INSERT INTO jobs (user_id, client_id, title, description, status, priority, pricing_type, fixed_price)
VALUES ('YOUR_USER_ID', 'CLIENT_ID', 'Job Title', 'Description', 'pending', 'medium', 'fixed', 10000.00);
```

### Adding More Invoices
```sql
INSERT INTO invoices (user_id, invoice_number, client_id, amount, status, due_date, line_items)
VALUES (
  'YOUR_USER_ID',
  'INV-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-XXX',
  'CLIENT_ID',
  15000.00,
  'unpaid',
  CURRENT_DATE + INTERVAL '30 days',
  '[{"id": "1", "description": "Service", "quantity": 1, "price": 15000}]'::jsonb
);
```

## Resetting Test Data

To completely reset the test account data:

```sql
-- Delete all data for test user
DELETE FROM invoices WHERE user_id = 'YOUR_USER_ID';
DELETE FROM jobs WHERE user_id = 'YOUR_USER_ID';
DELETE FROM clients WHERE user_id = 'YOUR_USER_ID';
DELETE FROM user_profiles WHERE user_id = 'YOUR_USER_ID';

-- Then re-run the setup script
```

## Troubleshooting

### Issue: User ID not found
**Solution**: Make sure you've created the auth user in Supabase first and copied the correct UUID.

### Issue: Foreign key constraint errors
**Solution**: Ensure clients are created before jobs, and jobs before invoices.

### Issue: Invoice branding fields not working
**Solution**: Run the `add-invoice-branding.sql` migration first to add the branding columns.

### Issue: Can't log in
**Solution**:
1. Check that "Auto Confirm User" was enabled when creating the user
2. Verify the email and password are correct
3. Check Supabase Auth logs for any errors

## Next Steps

After setting up the test account:

1. **Explore the Dashboard** - See how data is displayed
2. **Test Invoice Generation** - Create PDFs with custom branding
3. **Try Different Workflows** - Client → Job → Invoice flow
4. **Customize Branding** - Change colors, fonts, and styling
5. **Test Payment Flows** - Mark invoices as paid
6. **Generate Reports** - View accounting data and analytics

## Production Deployment

⚠️ **Important**: This is test data only!

Before deploying to production:
1. Delete all test data
2. Remove or secure the test account
3. Update RLS policies if needed
4. Configure proper authentication
5. Set up real payment processing

## Support

For issues or questions:
- Check the main documentation
- Review database schema
- Contact: syniq.store@gmail.com
