# Automated Invoice Generation from Jobs

## Overview

Your SyniqOps app now supports **automated invoice generation directly from jobs**! This powerful feature eliminates manual data entry by automatically creating invoices based on job pricing information.

---

## How It Works

### 1. Setting Up Job Pricing

When creating or editing a job, you'll now see a **Pricing** section with two options:

#### Fixed Price
- Select "Fixed Price" and enter a total amount
- Example: Website redesign for R5,000.00

#### Hourly Rate
- Select "Hourly Rate"
- Enter your hourly rate (e.g., R500/hr)
- Enter hours worked (e.g., 10 hours)
- The system automatically calculates the subtotal

### 2. Invoice Preview

As you enter pricing information, you'll see a **live preview** showing:
- **Subtotal**: Base amount (fixed price or hourly rate × hours)
- **VAT (15%)**: Automatically calculated
- **Total**: Final invoice amount with VAT included

Example:
```
Subtotal:  R 5,000.00
VAT (15%):   R 750.00
─────────────────────
Total:     R 5,750.00
```

### 3. Generating the Invoice

Once a job has pricing information:

1. Go to the **Jobs** page
2. Click the menu (⋮) on any job with pricing
3. Select **"Generate Invoice"**
4. Confirm the invoice details
5. Invoice is automatically created and you're redirected to the Invoices page

---

## Features

### Automatic Calculations
- **Subtotal**: Calculated from fixed price OR hourly rate × hours
- **VAT**: Automatically added at 15%
- **Total**: Subtotal + VAT
- **Invoice Number**: Auto-generated (format: `INV-{timestamp}`)
- **Due Date**: Automatically set to 30 days from creation

### Smart Line Items
**For Fixed Price Jobs:**
```
Description: Website Redesign
Quantity: 1
Price: R5,000.00
```

**For Hourly Rate Jobs:**
```
Description: Website Redesign (10 hours @ R500/hr)
Quantity: 10
Price: R500.00
```

### Validation
The system won't let you generate an invoice if:
- Job has no pricing information
- Client is not found
- Required fields are missing

You'll get helpful error messages guiding you to fix the issue.

---

## Step-by-Step Example

### Creating a Job with Fixed Price

1. Click **"Create Job"** on the Jobs page
2. Fill in basic details:
   - Title: "Website Redesign"
   - Client: "Acme Corp"
   - Status: "In Progress"
   - Due Date: Select date
   - Description: "Redesign corporate website"
3. Scroll to **Pricing** section
4. Select **"Fixed Price"**
5. Enter: `5000`
6. See preview:
   - Subtotal: R 5,000.00
   - VAT (15%): R 750.00
   - Total: R 5,750.00
7. Click **"Create Job"**

### Creating a Job with Hourly Rate

1. Click **"Create Job"**
2. Fill in basic details
3. Scroll to **Pricing** section
4. Select **"Hourly Rate"**
5. Enter hourly rate: `500`
6. Enter hours worked: `10`
7. See preview:
   - Subtotal: R 5,000.00 (500 × 10)
   - VAT (15%): R 750.00
   - Total: R 5,750.00
8. Click **"Create Job"**

### Generating the Invoice

1. Go to **Jobs** page
2. Find your job in the table
3. Click the **menu (⋮)** button
4. Click **"Generate Invoice"**
5. Confirm the dialog:
   - "Generate invoice for R5,000.00 (fixed price)?"
   - OR "Generate invoice for 10 hours at R500.00/hr?"
6. Click **OK**
7. Success message appears with invoice number and total
8. Automatically redirected to **Invoices** page
9. Your new invoice is ready to view/download/email

---

## Benefits

### Time Savings
- No manual invoice creation
- No copy-pasting job details
- No manual calculations
- Instant invoice generation

### Accuracy
- Eliminates human error in calculations
- Consistent VAT application
- Professional formatting
- Automatic invoice numbering

### Workflow Integration
- Seamless job-to-invoice flow
- Client information carries over
- Job title becomes invoice line item
- Due dates automatically set

---

## Database Changes

### New Columns Added to `jobs` Table

```sql
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS pricing_type text DEFAULT 'fixed';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS fixed_price numeric;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS hourly_rate numeric;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS hours_worked numeric;
```

### Migration Instructions

Run this SQL in your Supabase SQL Editor:

```sql
-- Add pricing fields to jobs table
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS hourly_rate numeric;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS hours_worked numeric;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS fixed_price numeric;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS pricing_type text DEFAULT 'fixed';
```

Or simply run the provided migration file:
```bash
# In Supabase SQL Editor, paste contents of:
add-job-pricing-fields.sql
```

---

## Files Modified

### New Files
- `src/lib/invoice-automation.ts` - Invoice generation logic
- `add-job-pricing-fields.sql` - Database migration

### Modified Files
- `src/lib/supabase/types.ts` - Added pricing fields to Job type
- `src/components/job-modal.tsx` - Added pricing form fields and preview
- `src/app/dashboard/jobs/page.tsx` - Added "Generate Invoice" menu item

---

## Usage Tips

### When to Use Fixed Price
- One-time projects
- Flat-rate services
- Retainer fees
- Package deals

### When to Use Hourly Rate
- Ongoing work
- Consulting
- Support services
- Time-based billing

### Best Practices

1. **Always add pricing when creating jobs** - Makes invoice generation instant
2. **Update hours as you work** - Keep hourly jobs current
3. **Use job status to track invoicing** - Only generate invoices for completed work
4. **Review before generating** - Check the confirmation dialog

---

## Technical Details

### Invoice Generation Logic

The `generateInvoiceFromJob()` function:
1. Validates job has pricing information
2. Builds line items based on pricing type
3. Calculates subtotal, VAT (15%), and total
4. Generates unique invoice number
5. Sets due date to 30 days from today
6. Creates invoice record in database
7. Returns success with invoice details

### Preview Calculation

The job modal calculates preview in real-time:
```typescript
const calculatePreview = () => {
  if (pricing_type === "fixed" && fixed_price) {
    const subtotal = fixed_price
    const vat = subtotal * 0.15
    const total = subtotal + vat
    return { subtotal, vat, total }
  } else if (pricing_type === "hourly" && hourly_rate && hours_worked) {
    const subtotal = hourly_rate * hours_worked
    const vat = subtotal * 0.15
    const total = subtotal + vat
    return { subtotal, vat, total }
  }
  return null
}
```

---

## Error Handling

### No Pricing Information
**Error**: "This job doesn't have pricing information. Please edit the job and add a fixed price or hourly rate."

**Solution**: Edit the job and add pricing in the Pricing section.

### Client Not Found
**Error**: "Client not found for this job"

**Solution**: Ensure the job has a valid client selected.

### Invoice Creation Failed
**Error**: "Error generating invoice: [specific error]"

**Solution**: Check your Supabase connection and ensure the invoices table exists.

---

## What's Next?

### Future Enhancements (Ideas)
- Expense tracking and inclusion in invoices
- Multiple line items per job
- Discounts and adjustments
- Recurring invoices from recurring jobs
- Email invoice directly from job
- Payment tracking linked to jobs
- Project phases with separate invoicing
- Custom invoice templates per client

---

## Summary

Your invoice workflow is now fully automated:

1. ✅ Create job with pricing information
2. ✅ Track job progress
3. ✅ Click "Generate Invoice" when ready
4. ✅ Invoice created automatically
5. ✅ Download PDF, email, or mark as paid

**No more manual invoice creation!** 🎉

---

## Support

If you encounter issues:
1. Ensure database migration was run
2. Check that jobs have pricing information
3. Verify client exists for the job
4. Check browser console for errors

Need help? Review:
- [INVOICE_FIXES.md](./INVOICE_FIXES.md) - Invoice page functionality
- [ENHANCEMENTS_SUMMARY.md](./ENHANCEMENTS_SUMMARY.md) - All features
- [QUICK_START.md](./QUICK_START.md) - Setup guide
