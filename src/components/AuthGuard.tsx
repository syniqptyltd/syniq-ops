'use client'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) location.href = '/login'
      setLoading(false)
    })
  }, [])

  if (loading) return null
  return <>{children}</>
}
