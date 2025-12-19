/**
 * Paystack Webhook Handler
 * Processes payment confirmations and subscription events
 *
 * SECURITY: Verifies Paystack signature before processing
 * IDEMPOTENCY: Handles duplicate webhook calls gracefully
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyWebhookSignature, verifyTransaction } from '@/lib/paystack/client'

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const body = await request.text()
    const signature = request.headers.get('x-paystack-signature')

    if (!signature) {
      console.error('Missing Paystack signature')
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
    }

    // Create Supabase client with service role for webhook processing
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Verify webhook signature
    const isValid = verifyWebhookSignature(body, signature)
    if (!isValid) {
      console.error('Invalid Paystack signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Parse the webhook event
    const event = JSON.parse(body)
    console.log('Paystack webhook event:', event.event)

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        await handleChargeSuccess(event.data, supabaseAdmin)
        break

      case 'subscription.create':
      case 'subscription.not_renew':
      case 'subscription.disable':
        await handleSubscriptionEvent(event, supabaseAdmin)
        break

      default:
        console.log('Unhandled webhook event:', event.event)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Handle successful charge (payment)
 */
async function handleChargeSuccess(data: any, supabaseAdmin: any) {
  const reference = data.reference
  const amount = data.amount / 100 // Convert kobo to ZAR
  const customerEmail = data.customer.email
  const metadata = data.metadata || {}

  console.log('Processing charge success:', reference)

  // Verify the transaction with Paystack (additional security check)
  try {
    const verifiedData = await verifyTransaction(reference)
    if (verifiedData.status !== 'success') {
      console.error('Transaction verification failed:', reference)
      return
    }
  } catch (error) {
    console.error('Transaction verification error:', error)
    return
  }

  // Find the payment record
  const { data: payment, error: paymentError } = await supabaseAdmin
    .from('payments')
    .select('*')
    .eq('paystack_reference', reference)
    .single()

  if (paymentError || !payment) {
    console.error('Payment record not found:', reference)
    return
  }

  // Check if already processed (idempotency)
  if (payment.status === 'success') {
    console.log('Payment already processed:', reference)
    return
  }

  // Update payment status
  await supabaseAdmin
    .from('payments')
    .update({ status: 'success', updated_at: new Date().toISOString() })
    .eq('id', payment.id)

  // Process based on payment type
  if (payment.payment_type === 'subscription') {
    await processSubscriptionPayment(payment, data)
  } else if (payment.payment_type === 'one-time') {
    await processOneTimePayment(payment, data)
  }
}

/**
 * Process subscription payment
 */
async function processSubscriptionPayment(payment: any, data: any) {
  const userId = payment.user_id
  const planId = payment.plan_id
  const billingCycle = payment.billing_cycle

  console.log('Processing subscription for user:', userId)

  // Calculate period dates
  const now = new Date()
  const periodEnd = new Date(now)
  if (billingCycle === 'monthly') {
    periodEnd.setMonth(periodEnd.getMonth() + 1)
  } else {
    periodEnd.setFullYear(periodEnd.getFullYear() + 1)
  }

  // Check if user has existing subscription
  const { data: existingSubscription } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .single()

  if (existingSubscription) {
    // Update existing subscription
    await supabaseAdmin
      .from('subscriptions')
      .update({
        plan_id: planId,
        billing_cycle: billingCycle,
        current_period_start: now.toISOString(),
        current_period_end: periodEnd.toISOString(),
        cancel_at_period_end: false,
        paystack_customer_code: data.customer.customer_code,
        status: 'active',
      })
      .eq('id', existingSubscription.id)
  } else {
    // Create new subscription
    await supabaseAdmin.from('subscriptions').insert({
      user_id: userId,
      plan_id: planId,
      status: 'active',
      billing_cycle: billingCycle,
      current_period_start: now.toISOString(),
      current_period_end: periodEnd.toISOString(),
      paystack_customer_code: data.customer.customer_code,
      paystack_subscription_code: data.subscription?.subscription_code,
    })
  }

  console.log('Subscription processed successfully for user:', userId)
}

/**
 * Process one-time payment (annual/lifetime)
 */
async function processOneTimePayment(payment: any, data: any) {
  const userId = payment.user_id
  const productType = payment.product_type

  console.log('Processing one-time payment for user:', userId)

  // Calculate expiry date
  let expiresAt: string | null = null
  if (productType === 'annual_prepaid') {
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)
    expiresAt = expiryDate.toISOString()
  }
  // lifetime has no expiry (null)

  // Create purchase record
  await supabaseAdmin.from('purchases').insert({
    user_id: userId,
    product_type: productType,
    status: 'active',
    amount: payment.amount,
    currency: payment.currency,
    expires_at: expiresAt,
    paystack_reference: payment.paystack_reference,
  })

  console.log('One-time purchase processed successfully for user:', userId)
}

/**
 * Handle subscription-specific events
 */
async function handleSubscriptionEvent(event: any, supabaseAdmin: any) {
  const subscriptionCode = event.data.subscription_code

  console.log('Processing subscription event:', event.event, subscriptionCode)

  const { data: subscription } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('paystack_subscription_code', subscriptionCode)
    .single()

  if (!subscription) {
    console.error('Subscription not found:', subscriptionCode)
    return
  }

  // Update subscription status based on event
  let status = subscription.status
  if (event.event === 'subscription.disable' || event.event === 'subscription.not_renew') {
    status = 'canceled'
  }

  await supabaseAdmin
    .from('subscriptions')
    .update({ status })
    .eq('id', subscription.id)

  console.log('Subscription event processed:', event.event)
}
