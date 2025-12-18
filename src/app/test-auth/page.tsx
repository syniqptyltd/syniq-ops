import { createServerSupabaseClient } from "@/lib/supabase/server"

export default async function TestAuthPage() {
  const supabase = await createServerSupabaseClient()

  const { data } = await supabase.auth.getUser()

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}
