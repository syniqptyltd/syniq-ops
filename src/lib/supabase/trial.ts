"use server"

/**
 * Trial Management
 * Handles creation and management of free trial subscriptions
 */

import { createServerSupabaseClient } from "./server"

/**
 * Create a 7-day free trial subscription for a new user
 * Should be called after user signup
 */
export async function createTrialSubscription(userId: string, planId: "starter" | "professional" = "professional") {
  try {
    const supabase = await createServerSupabaseClient()

    // Check if user already has a subscription
    const { data: existing } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (existing) {
      console.log('User already has a subscription:', userId)
      return { success: true, message: 'Subscription already exists' }
    }

    // Create trial subscription (7 days)
    const now = new Date()
    const trialEnd = new Date(now)
    trialEnd.setDate(trialEnd.getDate() + 7) // 7-day trial

    const { error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        status: 'trialing',
        billing_cycle: 'monthly', // Default to monthly, can be changed when they pay
        current_period_start: now.toISOString(),
        current_period_end: trialEnd.toISOString(),
      })

    if (error) {
      console.error('Failed to create trial subscription:', error)
      return { error: 'Failed to create trial subscription' }
    }

    console.log('Trial subscription created for user:', userId)
    return { success: true, message: 'Trial subscription created' }
  } catch (error) {
    console.error('Error creating trial subscription:', error)
    return { error: 'Failed to create trial subscription' }
  }
}

/**
 * Check if user's trial has expired
 */
export async function isTrialExpired(userId: string): Promise<boolean> {
  try {
    const supabase = await createServerSupabaseClient()

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'trialing')
      .single()

    if (!subscription) {
      return false // No trial subscription
    }

    const trialEnd = new Date(subscription.current_period_end)
    const now = new Date()

    return now > trialEnd
  } catch (error) {
    console.error('Error checking trial expiry:', error)
    return false
  }
}
