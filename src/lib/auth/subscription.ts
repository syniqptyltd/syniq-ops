/**
 * Subscription Status Helpers
 * Server-side utilities to check user access and subscription status
 */

import { createServerSupabaseClient } from "@/lib/supabase/server"

/**
 * Check if the current user has active access (subscription or purchase)
 */
export async function hasActiveAccess(): Promise<boolean> {
  try {
    const supabase = await createServerSupabaseClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return false
    }

    // Check for active subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['active', 'trialing'])
      .gte('current_period_end', new Date().toISOString())
      .single()

    if (subscription) {
      return true
    }

    // Check for active purchase
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .or('expires_at.is.null,expires_at.gte.' + new Date().toISOString())
      .single()

    return !!purchase
  } catch (error) {
    console.error('Error checking access:', error)
    return false
  }
}

/**
 * Get user's current subscription details
 */
export async function getSubscriptionDetails() {
  try {
    const supabase = await createServerSupabaseClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return null
    }

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['active', 'trialing'])
      .single()

    return subscription
  } catch (error) {
    console.error('Error getting subscription:', error)
    return null
  }
}

/**
 * Get user's purchase details
 */
export async function getPurchaseDetails() {
  try {
    const supabase = await createServerSupabaseClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return null
    }

    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    return purchase
  } catch (error) {
    console.error('Error getting purchase:', error)
    return null
  }
}

/**
 * Require active subscription/purchase (for protected routes)
 * Returns redirect response if no active access
 */
export async function requireActiveAccess() {
  const hasAccess = await hasActiveAccess()

  if (!hasAccess) {
    return { redirect: '/pricing', hasAccess: false }
  }

  return { hasAccess: true }
}
