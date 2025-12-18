# Supabase Integration Setup Guide

This document explains the fixes applied to the Supabase integration and how to complete the setup.

## Issues Fixed

### 1. Missing User ID Filtering
**Problem:** All database queries were missing `user_id` filtering, which meant:
- Queries would return no data (empty arrays) when Row Level Security (RLS) is enabled
- Users could potentially see other users' data if RLS wasn't properly configured
- Data wasn't associated with the authenticated user

**Solution:**
- Added `user_id` to all database queries in [actions.ts](src/lib/supabase/actions.ts)
- Automatically set `user_id` when creating new records
- Filter by `user_id` when reading, updating, or deleting records

### 2. Missing Job Modal
**Problem:** The jobs page had no way to create or edit jobs - the button did nothing.

**Solution:**
- Created [job-modal.tsx](src/components/job-modal.tsx) component
- Integrated the modal into the jobs page
- Added functionality to create and edit jobs with proper client selection

### 3. Status Value Mismatch
**Problem:** Status values in the UI (e.g., "Paid", "In Progress") didn't match database values (e.g., "paid", "in_progress").

**Solution:**
- Updated all status constants to use lowercase snake_case format
- Fixed status comparisons in queries
- Updated TypeScript types to reflect correct values

### 4. Database Schema Issues
**Problem:** Database tables were missing required columns like `user_id`, `description`, and `line_items`.

**Solution:**
- Created [supabase-migration.sql](supabase-migration.sql) to update the database schema
- Added proper indexes for better performance
- Set up Row Level Security (RLS) policies

## Setup Instructions

### Step 1: Run the Database Migration

1. Open your Supabase project dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of [supabase-migration.sql](supabase-migration.sql)
4. Run the migration
5. This will:
   - Add `user_id` columns to all tables
   - Add missing columns (`description`, `line_items`)
   - Create database indexes
   - Enable Row Level Security (RLS)
   - Set up RLS policies

### Step 2: Update Existing Data (If Applicable)

If you have existing data in your database without `user_id` values, you need to assign them to a user:

```sql
-- Get your user ID first
SELECT id FROM auth.users WHERE email = 'your-email@example.com';

-- Update existing records with your user ID
UPDATE clients SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
UPDATE jobs SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
UPDATE invoices SET user_id = 'YOUR_USER_ID' WHERE user_id IS NULL;
```

### Step 3: Environment Variables

Ensure you have the following environment variables set in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 4: Test the Application

1. Start the development server: `npm run dev`
2. Log in with your account
3. Test each section:
   - **Clients**: Create, edit, and delete clients
   - **Jobs**: Create, edit, and delete jobs
   - **Invoices**: Create and delete invoices
   - **Dashboard**: Verify stats are displaying correctly

## Database Schema

### Clients Table
```sql
- id: uuid (primary key)
- user_id: uuid (references auth.users)
- name: text
- email: text
- phone: text
- notes: text
- created_at: timestamp
- updated_at: timestamp
```

### Jobs Table
```sql
- id: uuid (primary key)
- user_id: uuid (references auth.users)
- title: text
- client_id: uuid (references clients)
- status: text (pending, in_progress, completed)
- due_date: date
- description: text
- created_at: timestamp
- updated_at: timestamp
```

### Invoices Table
```sql
- id: uuid (primary key)
- user_id: uuid (references auth.users)
- invoice_number: text
- client_id: uuid (references clients)
- amount: numeric
- status: text (paid, unpaid, overdue)
- due_date: date
- line_items: jsonb
- created_at: timestamp
- updated_at: timestamp
```

## Status Values Reference

### Job Status
- `pending` - Job is pending
- `in_progress` - Job is currently being worked on
- `completed` - Job is completed

### Invoice Status
- `paid` - Invoice has been paid
- `unpaid` - Invoice is unpaid
- `overdue` - Invoice is overdue

## Files Modified

1. [src/lib/supabase/actions.ts](src/lib/supabase/actions.ts) - Added user_id filtering to all queries
2. [src/lib/supabase/types.ts](src/lib/supabase/types.ts) - Updated TypeScript types
3. [src/app/dashboard/jobs/page.tsx](src/app/dashboard/jobs/page.tsx) - Fixed status values and integrated modal
4. [src/app/dashboard/invoices/page.tsx](src/app/dashboard/invoices/page.tsx) - Fixed status values
5. [src/components/job-modal.tsx](src/components/job-modal.tsx) - Created new component
6. [src/components/invoice-modal.tsx](src/components/invoice-modal.tsx) - Fixed status value

## Troubleshooting

### No Data Showing Up

If you're not seeing any data after the migration:

1. Check if RLS is enabled: Go to your Supabase dashboard → Database → Tables
2. Verify the RLS policies are created: Go to Policies tab for each table
3. Make sure existing data has `user_id` set (see Step 2 above)
4. Check browser console for error messages

### Authentication Issues

If you're getting "Not authenticated" errors:

1. Make sure you're logged in
2. Check if your session is valid
3. Verify environment variables are set correctly
4. Try logging out and back in

### Foreign Key Violations

If you get foreign key errors when creating jobs or invoices:

1. Make sure the client exists before creating a job/invoice
2. Verify the `client_id` is correct
3. Check that the client belongs to the same user

## Next Steps

1. Run the migration script in Supabase SQL Editor
2. Update any existing data with proper `user_id` values
3. Test all functionality
4. Consider generating TypeScript types from your Supabase schema using the Supabase CLI:
   ```bash
   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/database.types.ts
   ```

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Check the Supabase logs in your project dashboard
3. Verify all migration steps were completed successfully
