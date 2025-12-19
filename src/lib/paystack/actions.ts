"use server"

/**
 * Server actions for Paystack payment processing
 * These run on the server and handle payment initialization
 */

import { createServerSupabaseClient } from "@/lib/supabase/server"
import {
  initializeTransaction,
  generatePaymentReference,
  verifyTransaction
} from "./client"
import { PAYSTACK_CONFIG, type PlanId, type BillingCycle, type ProductType } from "./config"

/**
 * Initialize a subscription payment
 */
export async function initializeSubscriptionPayment(
  planId: PlanId,
  billingCycle: BillingCycle
) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: "You must be logged in to subscribe" }
    }

    // Get plan configuration
    const planConfig = PAYSTACK_CONFIG.plans[planId][billingCycle]

    // Generate unique reference
    const reference = generatePaymentReference(user.id, 'sub')

    // Create pending payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        amount: planConfig.amount / 100, // Convert kobo to ZAR
        currency: PAYSTACK_CONFIG.currency,
        status: 'pending',
        payment_type: 'subscription',
        plan_id: planId,
        billing_cycle: billingCycle,
        paystack_reference: reference,
        metadata: {
          plan_name: planConfig.name,
          plan_id: planConfig.id,
        },
      })

    if (paymentError) {
      console.error('Failed to create payment record:', paymentError)
      return { error: "Failed to initialize payment" }
    }

    // Initialize Paystack transaction
    const paystackResponse = await initializeTransaction({
      email: user.email!,
      amount: planConfig.amount,
      reference,
      metadata: {
        user_id: user.id,
        plan_id: planId,
        billing_cycle: billingCycle,
        payment_type: 'subscription',
        plan_name: planConfig.name,
      },
    })

    // Update payment record with authorization details
    await supabase
      .from('payments')
      .update({
        paystack_access_code: paystackResponse.access_code,
        authorization_url: paystackResponse.authorization_url,
      })
      .eq('paystack_reference', reference)

    return {
      success: true,
      authorizationUrl: paystackResponse.authorization_url,
      reference: paystackResponse.reference,
    }
  } catch (error) {
    console.error('Subscription initialization error:', error)
    return {
      error: error instanceof Error ? error.message : "Failed to initialize payment"
    }
  }
}

/**
 * Initialize a one-time payment (Annual Prepaid or Lifetime)
 */
export async function initializeOneTimePayment(productType: ProductType) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: "You must be logged in to purchase" }
    }

    // Check if user already has this product
    const { data: existingPurchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('product_type', productType)
      .eq('status', 'active')
      .single()

    if (existingPurchase) {
      return { error: "You already have an active purchase of this type" }
    }

    // Get product configuration
    const productConfig = PAYSTACK_CONFIG.products[productType]

    // Generate unique reference
    const reference = generatePaymentReference(user.id, 'otp')

    // Create pending payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        amount: productConfig.amount / 100, // Convert kobo to ZAR
        currency: PAYSTACK_CONFIG.currency,
        status: 'pending',
        payment_type: 'one-time',
        product_type: productType,
        paystack_reference: reference,
        metadata: {
          product_name: productConfig.name,
          product_id: productConfig.id,
        },
      })

    if (paymentError) {
      console.error('Failed to create payment record:', paymentError)
      return { error: "Failed to initialize payment" }
    }

    // Initialize Paystack transaction
    const paystackResponse = await initializeTransaction({
      email: user.email!,
      amount: productConfig.amount,
      reference,
      metadata: {
        user_id: user.id,
        product_type: productType,
        payment_type: 'one-time',
        product_name: productConfig.name,
      },
    })

    // Update payment record with authorization details
    await supabase
      .from('payments')
      .update({
        paystack_access_code: paystackResponse.access_code,
        authorization_url: paystackResponse.authorization_url,
      })
      .eq('paystack_reference', reference)

    return {
      success: true,
      authorizationUrl: paystackResponse.authorization_url,
      reference: paystackResponse.reference,
    }
  } catch (error) {
    console.error('One-time payment initialization error:', error)
    return {
      error: error instanceof Error ? error.message : "Failed to initialize payment"
    }
  }
}

/**
 * Get user's current subscription status
 */
export async function getUserSubscriptionStatus() {
  try {
    const supabase = await createServerSupabaseClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { subscription: null, purchase: null }
    }

    // Get active subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['active', 'trialing'])
      .gte('current_period_end', new Date().toISOString())
      .single()

    // Get active purchase
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .or('expires_at.is.null,expires_at.gte.' + new Date().toISOString())
      .single()

    return {
      subscription: subscription || null,
      purchase: purchase || null,
      hasAccess: !!(subscription || purchase)
    }
  } catch (error) {
    console.error('Failed to get subscription status:', error)
    return { subscription: null, purchase: null, hasAccess: false }
  }
}

/**
 * Cancel user's subscription (mark for cancellation at period end)
 */
export async function cancelSubscription() {
  try {
    const supabase = await createServerSupabaseClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: "You must be logged in" }
    }

    // Get active subscription
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    if (subError || !subscription) {
      return { error: "No active subscription found" }
    }

    // Mark for cancellation at period end
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({ cancel_at_period_end: true })
      .eq('id', subscription.id)

    if (updateError) {
      return { error: "Failed to cancel subscription" }
    }

    return { success: true, message: "Subscription will be canceled at the end of the current period" }
  } catch (error) {
    console.error('Cancel subscription error:', error)
    return { error: "Failed to cancel subscription" }
  }
}
