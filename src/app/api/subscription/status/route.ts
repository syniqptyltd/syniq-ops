/**
 * Subscription Status API
 * Returns current user's subscription and purchase status
 */

import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { hasAccess: false, subscription: null, purchase: null },
        { status: 401 }
      )
    }

    // Check for active subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['active', 'trialing'])
      .maybeSingle()

    // Check for active purchase
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle()

    const hasAccess = !!(
      (subscription && new Date(subscription.current_period_end) > new Date()) ||
      (purchase && (!purchase.expires_at || new Date(purchase.expires_at) > new Date()))
    )

    return NextResponse.json({
      hasAccess,
      subscription,
      purchase,
    })
  } catch (error) {
    console.error('Error checking subscription status:', error)
    return NextResponse.json(
      { hasAccess: false, subscription: null, purchase: null },
      { status: 500 }
    )
  }
}
