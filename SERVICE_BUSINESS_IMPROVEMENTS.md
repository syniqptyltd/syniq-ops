# Service Business Improvements

Enhancements to make SyniqOps better suited for service-based businesses with detailed cost tracking and better invoice breakdowns.

## 1. Enhanced Expense Categories for Service Businesses

### Changes Made
Updated expense categories in [src/components/expense-modal.tsx](src/components/expense-modal.tsx) to better reflect service business needs.

### New Categories (22 total)
1. **Materials & Supplies** - Job-specific materials and consumables
2. **Tools & Equipment** - Business tools and equipment purchases
3. **Vehicle Expenses** - Vehicle-related costs
4. **Fuel & Mileage** - Transportation fuel and mileage
5. **Subcontractors** - Third-party contractor costs
6. **Labor Costs** - Employee wages and labor
7. **Professional Services** - Legal, accounting, consulting
8. **Software & Subscriptions** - Business software and SaaS
9. **Marketing & Advertising** - Promotional expenses
10. **Office Expenses** - Office supplies and overhead
11. **Rent & Utilities** - Facility costs
12. **Insurance** - Business insurance premiums
13. **Licenses & Permits** - Regulatory requirements
14. **Training & Education** - Staff development
15. **Repairs & Maintenance** - Equipment and facility upkeep
16. **Travel & Accommodation** - Business travel
17. **Meals & Entertainment** - Client entertainment
18. **Bank Fees** - Banking charges
19. **Telecommunications** - Phone and internet
20. **Safety Equipment** - PPE and safety gear
21. **Waste Disposal** - Disposal services
22. **Other** - Miscellaneous expenses

### Why These Categories?
Service businesses have different cost structures than product businesses:
- More focus on labor and subcontractors
- Vehicle and fuel expenses are significant
- Materials are job-specific, not inventory
- Safety equipment and licenses are common
- Telecommunications and professional services are essential

## 2. Job Line Items for Detailed Invoicing

### Database Changes
Created migration: [add-job-line-items.sql](add-job-line-items.sql)

Added `line_items` JSONB column to jobs table:
```sql
ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS line_items jsonb DEFAULT '[]'::jsonb;
```

### Line Item Structure
```json
[
  {
    "id": "1",
    "description": "Labor - 8 hours",
    "quantity": 8,
    "price": 500.00
  },
  {
    "id": "2",
    "description": "Materials - Pipes and fittings",
    "quantity": 1,
    "price": 1200.00
  }
]
```

### TypeScript Types
Updated [src/lib/supabase/types.ts](src/lib/supabase/types.ts) to include line_items in jobs table:
```typescript
line_items: Array<{
  id: string
  description: string
  quantity: number
  price: number
}>
```

### Benefits
- **Better transparency**: Customers see exactly what they're paying for
- **Easier adjustments**: Modify individual line items without recalculating entire job
- **Professional invoices**: Detailed breakdown looks more professional
- **Cost tracking**: Track materials vs labor separately
- **Accurate pricing**: Itemize every aspect of the service

## 3. Enhanced Invoice Generation

### Changes Made
Updated [src/lib/invoice-automation.ts](src/lib/invoice-automation.ts) to support line items with intelligent fallback.

### Priority System
Invoice generation now uses a three-tier priority system:

**Priority 1: Job Line Items** (Most detailed)
- Uses detailed line items from job
- Each item has description, quantity, price
- Best for complex jobs with multiple components

**Priority 2: Fixed Price** (Simple)
- Single line item with job title
- For straightforward, flat-rate jobs
- Quick and simple

**Priority 3: Hourly Rate** (Time-based)
- Single line showing hours worked and rate
- For time and materials jobs
- Automatically calculates total

### Example Usage

**Line Items Job:**
```typescript
{
  title: "Plumbing Repair",
  line_items: [
    { id: "1", description: "Labor - 3 hours", quantity: 3, price: 500 },
    { id: "2", description: "Pipe fittings", quantity: 12, price: 45 },
    { id: "3", description: "Sealant and tape", quantity: 1, price: 120 }
  ]
}
// Invoice shows 3 line items with detailed breakdown
```

**Fixed Price Job:**
```typescript
{
  title: "Garden Maintenance",
  fixed_price: 800
}
// Invoice shows single line: "Garden Maintenance - R800"
```

**Hourly Job:**
```typescript
{
  title: "Electrical Inspection",
  hourly_rate: 600,
  hours_worked: 2.5
}
// Invoice shows: "Electrical Inspection (2.5 hours @ R600/hr) - R1,500"
```

### Backward Compatibility
- Existing jobs using fixed_price or hourly_rate continue working
- No breaking changes to current functionality
- Line items are optional - add them when needed

## 4. Accounting Page

### Overview
Created comprehensive accounting page at [src/app/dashboard/accounting/page.tsx](src/app/dashboard/accounting/page.tsx)

### Features

#### Key Metrics Dashboard
- **Total Revenue**: Sum of all paid invoices
- **Total Expenses**: Sum of all recorded expenses
- **Net Profit**: Revenue - Expenses with profit margin %
- **Outstanding**: Unpaid invoices amount

#### Profit & Loss Statement
- Revenue breakdown
- Expenses grouped by category
- Net profit/loss calculation
- Clear visual separation of income vs expenses

#### Monthly Breakdown
- Current month revenue
- Current month expenses
- Current month net profit
- Quick month-over-month comparison

#### VAT Summary
- Total VAT claimable from expenses
- Count of claimable expenses
- Helpful for VAT return preparation

#### Business Health Indicators
- **Average Invoice Value**: Total revenue / number of invoices
- **Average Expense**: Total expenses / number of expenses
- **Expense Ratio**: Expenses as percentage of revenue

### Accounting Data Service
Created [src/lib/supabase/accounting.ts](src/lib/supabase/accounting.ts):
```typescript
{
  totalRevenue: number
  totalExpenses: number
  paidInvoiceCount: number
  expenseCount: number
  expensesByCategory: { category: string; total: number }[]
  totalVatClaimable: number
  vatClaimableCount: number
}
```

### Benefits
- **Financial visibility**: See profit/loss at a glance
- **Category insights**: Understand where money is being spent
- **VAT tracking**: Know how much VAT can be claimed
- **Performance metrics**: Monitor business health indicators
- **Simple presentation**: Easy to understand, no accounting knowledge required

## Navigation Updates

Added "Accounting" link to dashboard navigation:
- Icon: Calculator
- Position: Between Expenses and Profile
- Accessible from all dashboard pages

## Files Modified

### Database
1. `add-job-line-items.sql` - Line items migration

### Types
2. `src/lib/supabase/types.ts` - Added line_items to jobs

### Components
3. `src/components/expense-modal.tsx` - Updated categories

### Pages
4. `src/app/dashboard/accounting/page.tsx` - New accounting page
5. `src/app/dashboard/layout.tsx` - Added accounting nav link

### Business Logic
6. `src/lib/invoice-automation.ts` - Enhanced invoice generation
7. `src/lib/supabase/accounting.ts` - New accounting data service

## Usage Examples

### Creating a Job with Line Items

In your job creation form, you would build line items like:
```typescript
const job = {
  title: "Bathroom Renovation",
  client_id: "client-123",
  due_date: "2025-12-25",
  vat_inclusive: false,
  line_items: [
    {
      id: "1",
      description: "Demolition and prep work",
      quantity: 1,
      price: 2500
    },
    {
      id: "2",
      description: "Plumbing installation",
      quantity: 1,
      price: 4500
    },
    {
      id: "3",
      description: "Tile and fixtures",
      quantity: 1,
      price: 3200
    },
    {
      id: "4",
      description: "Labor - 40 hours",
      quantity: 40,
      price: 450
    }
  ]
}
```

### Invoice Generation
```typescript
const result = await generateInvoiceFromJob({
  job: job,
  clientName: "John Smith"
})

// Invoice will show 4 detailed line items
// Customer sees exactly what they're paying for
// Total = 2500 + 4500 + 3200 + (40 * 450) = R28,200
```

### Viewing Accounting Data

Navigate to Dashboard > Accounting to see:
- Total revenue from all paid invoices
- Total expenses by category
- Net profit calculation
- VAT claimable amount
- Key performance metrics

## Benefits Summary

### For Service Businesses
✅ Expense categories match service business operations
✅ Track subcontractors, labor, materials separately
✅ Monitor vehicle and fuel costs
✅ Manage licenses and permits expenses

### For Detailed Invoicing
✅ Itemize every component of a job
✅ Show labor and materials separately
✅ Professional, transparent invoices
✅ Easy to adjust individual items
✅ Better client communication

### For Financial Management
✅ Quick profit/loss overview
✅ Expense breakdown by category
✅ VAT tracking and claiming
✅ Business health indicators
✅ Monthly performance tracking

## Database Migration Required

Don't forget to run the database migration:

```bash
# Execute in Supabase SQL editor or via psql
psql -d your_database < add-job-line-items.sql
```

Or copy/paste the contents of [add-job-line-items.sql](add-job-line-items.sql) into your Supabase SQL editor.

## Future Enhancements

Potential improvements for later:

1. **Job Templates**: Create job templates with pre-defined line items
2. **Expense Allocation**: Link expenses directly to specific jobs
3. **Profit by Job**: See which jobs are most profitable
4. **Budget vs Actual**: Set budgets and track actuals
5. **Export Reports**: Export accounting data to PDF/Excel
6. **Multi-currency**: Support for multiple currencies
7. **Custom Categories**: Let users create their own expense categories
8. **Tax Reports**: Generate tax-ready reports
9. **Cash Flow**: Track cash flow projections
10. **Invoice Templates**: Create different invoice layouts for different job types

## Testing Checklist

### Line Items
- [ ] Create job with line items
- [ ] Generate invoice from job with line items
- [ ] Verify invoice shows all line items correctly
- [ ] Test with VAT inclusive and exclusive pricing
- [ ] Verify backward compatibility with fixed price jobs
- [ ] Verify backward compatibility with hourly jobs

### Expenses
- [ ] Create expense with new categories
- [ ] Verify categories appear in dropdown
- [ ] Create multiple expenses in different categories
- [ ] Check accounting page shows expenses by category

### Accounting Page
- [ ] Navigate to accounting page
- [ ] Verify total revenue shows correctly
- [ ] Verify total expenses shows correctly
- [ ] Verify net profit calculation is accurate
- [ ] Check VAT claimable total
- [ ] Verify expense breakdown by category
- [ ] Check business health indicators

## Summary

✅ **Expense Categories**: Updated 22 categories for service businesses
✅ **Job Line Items**: Detailed invoice breakdowns with line items
✅ **Invoice Generation**: Intelligent priority system (line items → fixed → hourly)
✅ **Accounting Page**: Complete profit/loss and financial overview
✅ **Navigation**: Added accounting link to dashboard
✅ **Type Safety**: All TypeScript types updated
✅ **Backward Compatible**: Existing jobs continue working

Your invoicing system is now optimized for service businesses with professional, detailed invoices and comprehensive financial tracking!
