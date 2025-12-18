# Enhanced Invoicing Features - Implementation Guide

## Overview

Your SyniqOps app has been enhanced with professional invoicing features including:
- VAT inclusive/exclusive pricing options
- Company profile management (VAT number, address, registration)
- Client billing addresses
- Job site addresses for better tracking
- Professional invoice generation using company profile data

---

## Database Changes

### Migration File: `add-enhanced-fields.sql`

Run this SQL in your Supabase SQL Editor to add all new fields:

```sql
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
```

---

## New Features

### 1. VAT Inclusive/Exclusive Pricing

#### How It Works

**VAT Exclusive (default):**
- You enter the base price (e.g., R5,000)
- VAT (15%) is calculated on top: R750
- Total shown: R5,750

**VAT Inclusive:**
- You enter the final price including VAT (e.g., R5,750)
- System calculates backwards:
  - Subtotal: R5,750 ÷ 1.15 = R5,000
  - VAT: R750
  - Total: R5,750

#### Job Modal Updates

New checkbox in the pricing section:
```
☐ Price includes VAT (15%)
```

When checked, the preview automatically recalculates to show the breakdown of a VAT-inclusive price.

**Example - VAT Exclusive:**
```
Fixed Price: R5,000.00
☐ Price includes VAT (15%)

Preview:
Subtotal:  R 5,000.00
VAT (15%):   R 750.00
──────────────────
Total:     R 5,750.00
```

**Example - VAT Inclusive:**
```
Fixed Price: R5,750.00
☑ Price includes VAT (15%)

Preview:
Subtotal:  R 5,000.00  (calculated: 5750 ÷ 1.15)
VAT (15%):   R 750.00  (calculated: 5750 - 5000)
──────────────────
Total:     R 5,750.00
```

---

### 2. Job Site Address

Track the physical location where work is performed:

#### Fields Added to Job Modal:
- **Job Site Address** (optional)
  - Street address
  - City
  - Postal Code

#### Use Cases:
- On-site services (plumbing, electrical, construction)
- Field work tracking
- Multiple job locations for same client
- Better job organization
- Include in invoices for clarity

#### Job Modal Screenshot (Described):
```
┌──────────────────────────────────┐
│ Job Site Address (Optional)      │
├──────────────────────────────────┤
│ [123 Main Street            ]    │
│ [City         ] [Postal Code]    │
└──────────────────────────────────┘
```

---

### 3. Company Profile (User Profile)

Store your business information for professional invoices.

#### New Table: `user_profiles`

Fields:
- **Business Name**: Your company name
- **VAT Number**: e.g., "VAT4123456789"
- **Registration Number**: Company registration
- **Address**:
  - Address Line 1
  - Address Line 2 (optional)
  - City
  - Postal Code
  - Country (default: South Africa)
- **Contact Info**:
  - Phone
  - Email
  - Website
- **Branding**:
  - Logo URL

#### Database Functions Created:

**Get Profile:**
```typescript
const profile = await getUserProfile()
// Returns user's company profile or null
```

**Create Profile:**
```typescript
await createUserProfile({
  business_name: "SyniqOps",
  vat_number: "VAT4123456789",
  address_line1: "123 Business St",
  city: "Cape Town",
  phone: "+27 82 123 4567",
  email: "hello@syniqops.com"
})
```

**Update Profile:**
```typescript
await updateUserProfile({
  vat_number: "VAT9876543210",
  phone: "+27 82 999 8888"
})
```

**Upsert Profile (Create or Update):**
```typescript
await upsertUserProfile({
  business_name: "SyniqOps",
  vat_number: "VAT4123456789"
  // Creates if doesn't exist, updates if exists
})
```

---

### 4. Client Billing Address

Track where clients should receive invoices.

#### Fields Added to Clients:
- **Billing Address**: Street address
- **Billing City**: City
- **Billing Postal Code**: Postal code
- **Billing Country**: Country (default: South Africa)

#### Use Cases:
- Different billing vs. service address
- Corporate billing departments
- Professional invoice formatting
- Accurate tax records

#### Planned: Client Modal Update
*(To be implemented next)*
- Add billing address fields to client creation/editing
- Optional fields - won't be required
- Show on invoices

---

## Updated Files

### 1. Type Definitions: `src/lib/supabase/types.ts`

**Updated `clients` table:**
```typescript
{
  billing_address: string | null
  billing_city: string | null
  billing_postal_code: string | null
  billing_country: string | null
}
```

**Updated `jobs` table:**
```typescript
{
  vat_inclusive: boolean
  job_address: string | null
  job_city: string | null
  job_postal_code: string | null
}
```

**New `user_profiles` table:**
```typescript
{
  id: string
  user_id: string
  business_name: string | null
  vat_number: string | null
  registration_number: string | null
  address_line1: string | null
  address_line2: string | null
  city: string | null
  postal_code: string | null
  country: string | null
  phone: string | null
  email: string | null
  website: string | null
  logo_url: string | null
  created_at: string
  updated_at: string
}
```

### 2. Job Modal: `src/components/job-modal.tsx`

**Added:**
- VAT inclusive/exclusive checkbox
- Job site address fields (address, city, postal code)
- Updated calculatePreview() to handle VAT inclusive pricing
- State management for new fields

**calculatePreview() Logic:**
```typescript
const calculatePreview = () => {
  let baseAmount = 0

  // Get base amount from fixed or hourly pricing
  if (pricing_type === "fixed" && fixed_price) {
    baseAmount = fixed_price
  } else if (pricing_type === "hourly" && hourly_rate && hours_worked) {
    baseAmount = hourly_rate * hours_worked
  }

  if (vat_inclusive) {
    // Price includes VAT - calculate backwards
    const total = baseAmount
    const subtotal = total / 1.15
    const vat = total - subtotal
    return { subtotal, vat, total }
  } else {
    // Price excludes VAT - calculate forwards
    const subtotal = baseAmount
    const vat = subtotal * 0.15
    const total = subtotal + vat
    return { subtotal, vat, total }
  }
}
```

### 3. Database Actions: `src/lib/supabase/actions.ts`

**Added Functions:**
- `getUserProfile()` - Get user's company profile
- `createUserProfile(data)` - Create new profile
- `updateUserProfile(data)` - Update existing profile
- `upsertUserProfile(data)` - Create or update profile

---

## Still To Implement

### 1. Profile Settings Page
- Create `/dashboard/settings` or `/dashboard/profile`
- Form to edit company profile
- Save VAT number, address, phone, etc.
- Upload logo (future feature)

### 2. Update Client Modal
- Add billing address fields
- Make them optional
- Show in client details

### 3. Enhanced Invoice Generation
- Pull company data from user profile
- Include VAT number on invoices
- Include company registration number
- Use company address instead of hardcoded
- Show client billing address on invoice
- Show job site address if different

### 4. Invoice PDF Enhancements
- Add VAT number to invoice header
- Add registration number
- Professional footer with company details
- Show "VAT Inclusive" or "VAT Exclusive" label
- Proper address formatting

---

## How to Use (After Complete Implementation)

### Setting Up Your Company Profile

1. Go to Dashboard → Settings (or Profile)
2. Fill in your company information:
   - Business Name: "SyniqOps"
   - VAT Number: "VAT4123456789"
   - Registration: "2024/123456/07"
   - Address: Full business address
   - Phone, Email, Website
3. Click "Save Profile"

### Creating Jobs with New Features

1. Click "Create Job"
2. Fill in basic info (title, client, date)
3. **Job Site Address** (if on-site work):
   - Enter street address
   - City and postal code
4. **Pricing**:
   - Choose Fixed Price or Hourly
   - Check "Price includes VAT" if your quote already includes VAT
   - See real-time preview of breakdown
5. Save job

### Adding Client Billing Address

1. Edit client
2. Scroll to "Billing Address" section
3. Fill in:
   - Billing Address
   - City
   - Postal Code
   - Country
4. Save client

### Generating Professional Invoices

When you generate an invoice from a job:
- Your company VAT number appears on invoice
- Your business address is shown
- Client billing address is included
- Job site address is shown (if entered)
- VAT breakdown is accurate (inclusive or exclusive)
- Professional formatting throughout

---

## Example Invoice (Described)

```
┌──────────────────────────────────────────┐
│         SYNIQOPS                         │
│    VAT: VAT4123456789                    │
│    Reg: 2024/123456/07                   │
│                                          │
│  123 Business St, Cape Town, 8001        │
│  +27 82 123 4567                         │
│  hello@syniqops.com                      │
├──────────────────────────────────────────┤
│  INVOICE #INV-1234567890                 │
│  Date: 17 Dec 2025                       │
│  Due: 16 Jan 2026                        │
├──────────────────────────────────────────┤
│  Bill To:                                │
│  Acme Corp                               │
│  456 Client Ave                          │
│  Johannesburg, 2000                      │
│                                          │
│  Job Site:                               │
│  789 Work St, Sandton, 2196              │
├──────────────────────────────────────────┤
│  Description          Qty    Rate  Amount│
│  Website Redesign      10    R500  R5,000│
│  (10 hours @ R500/hr)                    │
│                                          │
│                      Subtotal:   R 5,000 │
│                   VAT (15%):      R 750  │
│                      ─────────────────── │
│                         TOTAL:  R 5,750  │
│                                          │
│  Payment Terms: Net 30                   │
│  * VAT Exclusive pricing                 │
└──────────────────────────────────────────┘
```

---

## Benefits

### Professionalism
✅ Company VAT number on all invoices
✅ Proper business registration details
✅ Complete company contact information
✅ Professional address formatting

### Accuracy
✅ Correct VAT calculations (inclusive vs exclusive)
✅ Clear breakdown of charges
✅ Separate billing and job site addresses
✅ Proper tax compliance

### Flexibility
✅ Choose VAT inclusive or exclusive per job
✅ Track multiple job locations
✅ Different billing addresses per client
✅ Reusable company profile

### Organization
✅ Job site addresses for field work
✅ Billing addresses for invoicing
✅ Company info in one place
✅ Professional record keeping

---

## Migration Checklist

- [ ] Run `add-enhanced-fields.sql` in Supabase SQL Editor
- [ ] Verify all tables updated successfully
- [ ] Test creating jobs with new fields
- [ ] Set up your company profile
- [ ] Test VAT inclusive/exclusive calculations
- [ ] Add billing addresses to existing clients (optional)
- [ ] Generate test invoice to verify formatting
- [ ] Update any existing jobs with job site addresses

---

## Next Steps

1. **Create Profile Settings Page**
   - Form to edit user profile
   - Save company details
   - Show success messages

2. **Update Client Modal**
   - Add billing address fields
   - Make them optional
   - Show in client list

3. **Enhance Invoice Generation**
   - Pull data from user profile
   - Include VAT number
   - Show job site address
   - Professional PDF formatting

4. **Update Invoice PDF Template**
   - Company header with VAT number
   - Client billing address
   - Job site address section
   - VAT inclusive/exclusive label
   - Professional footer

---

## Support

If you encounter issues:
1. Verify database migration ran successfully
2. Check that new columns exist in tables
3. Ensure user_profiles table was created
4. Test with simple job first (no optional fields)
5. Check browser console for errors

---

**Your invoicing is now enterprise-grade!** 🎉

Professional, compliant, and flexible.
