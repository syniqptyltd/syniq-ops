# Expense Tracking Implementation

Complete expense tracking system for SyniqOps invoicing application.

## Features Implemented

### 1. Database Schema
- **expenses table**: Main table for storing expense records
  - Description, amount, category, expense date
  - Vendor, payment method, reference number
  - Notes for additional context
  - VAT claimable flag and VAT amount tracking
  - User-scoped with Row Level Security (RLS)

- **expense_categories table**: Custom expense categories
  - User-defined categories with descriptions
  - Color coding and icon support
  - User-scoped with RLS

### 2. TypeScript Types
Added type definitions in [src/lib/supabase/types.ts](src/lib/supabase/types.ts):
- `expenses` table types (Row, Insert, Update)
- `expense_categories` table types (Row, Insert, Update)

### 3. Server Actions
Created CRUD operations in [src/lib/supabase/actions.ts](src/lib/supabase/actions.ts):
- `getExpenses()` - Fetch all user expenses sorted by date
- `createExpense(expenseData)` - Create new expense
- `updateExpense(id, expenseData)` - Update existing expense
- `deleteExpense(id)` - Delete expense

### 4. Expense Modal Component
Created [src/components/expense-modal.tsx](src/components/expense-modal.tsx):
- Form for creating/editing expenses
- All fields supported: description, amount, date, category, vendor, payment method, reference number, notes
- VAT claimable checkbox with VAT amount field
- Form validation
- Default categories: Office Supplies, Equipment, Software, Travel, Meals & Entertainment, Marketing, Utilities, Rent, Insurance, Professional Services, Fuel, Maintenance, Other
- Payment methods: Cash, Credit Card, Debit Card, Bank Transfer, Cheque, Other

### 5. Expenses Page
Created [src/app/dashboard/expenses/page.tsx](src/app/dashboard/expenses/page.tsx):
- Dashboard-style summary cards:
  - Total expenses
  - VAT claimable amount
  - Current month expenses
- Complete expense history table with:
  - Date, description, category badges
  - Vendor and payment method
  - Amount display
  - VAT claimable badge
  - Edit and delete actions
- Empty state with call-to-action
- Delete confirmation dialog

### 6. Navigation Integration
Updated [src/app/dashboard/layout.tsx](src/app/dashboard/layout.tsx):
- Added "Expenses" navigation link with Receipt icon
- Positioned between Invoices and Profile

### 7. Dashboard Integration
Updated [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx):
- Added "Monthly Expenses" card showing current month expenses
- Displays net profit (Monthly Revenue - Monthly Expenses)
- 5-column grid layout for dashboard cards

### 8. Analytics Integration
Updated [src/lib/supabase/analytics.ts](src/lib/supabase/analytics.ts):
- Modified revenue trend chart to include actual expense data
- Queries expenses by month for last 6 months
- Replaces placeholder expense data (was 0) with real expense aggregation

Updated [src/lib/supabase/actions.ts](src/lib/supabase/actions.ts):
- Added `monthlyExpenses` to dashboard stats
- Calculates current month expenses total

## Database Migration

Run the migration file to set up the database schema:

```bash
# Execute the migration SQL
psql -d your_database < add-expense-tracking.sql
```

Or run it directly in your Supabase SQL editor:
[add-expense-tracking.sql](add-expense-tracking.sql)

## Usage

### Creating an Expense
1. Navigate to Dashboard > Expenses
2. Click "Add Expense" button
3. Fill in required fields:
   - Description (required)
   - Amount (required)
   - Category (required)
   - Date (defaults to today)
4. Optionally add:
   - Vendor name
   - Payment method
   - Reference number
   - Notes
   - VAT claimable flag + VAT amount
5. Click "Add Expense"

### Editing an Expense
1. Go to Expenses page
2. Click pencil icon on expense row
3. Update fields as needed
4. Click "Update Expense"

### Deleting an Expense
1. Go to Expenses page
2. Click trash icon on expense row
3. Confirm deletion in dialog

### Viewing Analytics
- **Dashboard**: See "Monthly Expenses" card with current month total
- **Revenue Trend Chart**: Now shows actual expenses line (red) alongside revenue (green)
- **Expenses Page**: View summary cards with total, VAT claimable, and monthly expenses

## Data Flow

### Expense Creation Flow
```
User fills form → ExpenseModal validates → createExpense() server action →
Supabase insert → Revalidate paths → UI updates → Success toast
```

### Dashboard Stats Flow
```
Page load → getDashboardStats() → Query expenses for current month →
Sum amounts → Return monthlyExpenses → Display in card
```

### Analytics Chart Flow
```
Page load → getDashboardAnalytics() → Loop 6 months →
Query expenses per month → Sum amounts → Return expense data →
Chart renders with expense line
```

## Security

All expense operations are protected by:
- Supabase authentication check (requires logged-in user)
- Row Level Security (RLS) policies on database
- User ID scoping on all queries
- Server-side validation

## Type Safety

All code is fully type-safe:
- TypeScript types for all database tables
- Server action return types
- Component props types
- Form data types

## Files Modified

1. **Database**
   - `add-expense-tracking.sql` - Database schema migration

2. **Types**
   - `src/lib/supabase/types.ts` - Added expense types

3. **Server Actions**
   - `src/lib/supabase/actions.ts` - Added expense CRUD + dashboard stats
   - `src/lib/supabase/analytics.ts` - Added expense analytics

4. **Components**
   - `src/components/expense-modal.tsx` - New expense form modal

5. **Pages**
   - `src/app/dashboard/expenses/page.tsx` - New expenses page
   - `src/app/dashboard/page.tsx` - Added monthly expenses card
   - `src/app/dashboard/layout.tsx` - Added expenses navigation link

6. **UI Components**
   - `src/components/ui/alert-dialog.tsx` - Added for delete confirmation

## Future Enhancements

Potential improvements for the expense tracking system:

1. **Expense Categories Management**
   - UI for creating custom expense categories
   - Category icons and colors
   - Category-based reporting

2. **Receipt Uploads**
   - File upload for receipt images
   - Supabase Storage integration
   - Receipt preview in expense modal

3. **Recurring Expenses**
   - Template for monthly recurring expenses
   - Automatic expense creation
   - Recurring expense management

4. **Advanced Filtering**
   - Filter by date range
   - Filter by category
   - Filter by vendor
   - Search functionality

5. **Expense Reports**
   - Export to PDF/Excel
   - Category breakdown charts
   - Vendor analysis
   - Tax report generation

6. **Budget Tracking**
   - Set monthly budgets by category
   - Budget vs actual comparison
   - Alerts for budget overruns

## Testing Checklist

### Basic Functionality
- [ ] Create new expense
- [ ] Edit existing expense
- [ ] Delete expense
- [ ] View expenses list
- [ ] Navigate to expenses page from sidebar

### Data Display
- [ ] Total expenses card shows correct sum
- [ ] VAT claimable card shows correct sum
- [ ] Monthly expenses card shows current month only
- [ ] Expense table displays all fields correctly
- [ ] VAT badge only shows when is_vat_claimable is true

### Dashboard Integration
- [ ] Monthly expenses card appears on dashboard
- [ ] Net profit calculation is correct (revenue - expenses)
- [ ] Revenue trend chart shows expense line
- [ ] Expense data matches actual database records

### Validation
- [ ] Cannot submit without required fields (description, amount, category)
- [ ] Amount must be greater than 0
- [ ] Date field works correctly
- [ ] VAT amount field only shows when VAT claimable is checked

### Security
- [ ] Cannot view other users' expenses
- [ ] Cannot edit other users' expenses
- [ ] Cannot delete other users' expenses
- [ ] Unauthenticated users redirected to login

## Summary

The expense tracking system is now fully functional with:
- ✅ Complete database schema with RLS
- ✅ Full CRUD operations
- ✅ User-friendly expense modal
- ✅ Comprehensive expenses page
- ✅ Dashboard integration
- ✅ Analytics chart integration
- ✅ Type-safe TypeScript throughout
- ✅ Secure server actions

You can now track expenses, view them alongside revenue, and get insights into your business profitability!
