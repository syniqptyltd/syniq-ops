# Quick Start Guide - Fix Supabase Integration

## The Error You're Seeing

```
Error saving job: Could not find the 'due_date' column of 'jobs' in the schema cache
```

This means your database tables are missing required columns. Here's how to fix it:

## Solution - 3 Steps

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Run the Migration Script

Copy and paste the **entire contents** of [quick-fix-migration.sql](quick-fix-migration.sql) into the SQL editor and click "Run".

This will:
- Add all missing columns (`due_date`, `description`, `user_id`, etc.)
- Create database indexes
- Set up Row Level Security (RLS) policies

### Step 3: Update Existing Data

After running the migration, you need to assign existing data to your user account.

**First, get your user ID:**

Run this query in the SQL editor:
```sql
SELECT id, email FROM auth.users;
```

Copy your user `id` (it looks like: `123e4567-e89b-12d3-a456-426614174000`)

**Then, update your existing data:**

Run these queries, replacing `YOUR_USER_ID_HERE` with the ID you copied:

```sql
UPDATE clients SET user_id = 'YOUR_USER_ID_HERE' WHERE user_id IS NULL;
UPDATE jobs SET user_id = 'YOUR_USER_ID_HERE' WHERE user_id IS NULL;
UPDATE invoices SET user_id = 'YOUR_USER_ID_HERE' WHERE user_id IS NULL;
```

### Step 4: Test

1. Refresh your app in the browser
2. Try creating a new client
3. Try creating a new job
4. Try creating a new invoice

Everything should work now!

## What If I Don't Have Any Existing Data?

If this is a fresh start:
1. Just run the [quick-fix-migration.sql](quick-fix-migration.sql) script
2. You can skip Step 3 (updating existing data)
3. Start using the app - all new data will automatically get the correct `user_id`

## Alternative: Create Fresh Tables

If you want to start completely fresh, use [supabase-migration.sql](supabase-migration.sql) instead. This will:
- Create all tables from scratch with the correct schema
- Set up all RLS policies
- Set up proper indexes

To use it:
1. Delete your existing tables (clients, jobs, invoices) in Supabase Table Editor
2. Run the [supabase-migration.sql](supabase-migration.sql) script
3. Start fresh with no data migration needed

## Still Having Issues?

### Check if RLS is the problem

Run this to temporarily disable RLS for testing:

```sql
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE invoices DISABLE ROW LEVEL SECURITY;
```

If this fixes it, the issue is with RLS policies. Re-enable RLS and check that:
1. All records have a `user_id` set
2. The `user_id` matches your logged-in user's ID

### Check your authentication

Make sure you're logged in! The error could also mean you're not authenticated.

1. Open browser dev tools (F12)
2. Go to Console tab
3. Look for authentication errors
4. Try logging out and back in

## Need More Help?

Check the detailed guide in [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for:
- Complete schema documentation
- Troubleshooting guide
- Understanding status values
- Database structure reference
