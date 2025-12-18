import { createBrowserClient as createClient } from "@supabase/ssr"

/**
 * Creates a Supabase client for client-side usage
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export function createBrowserClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
