/**
 * Payment Verification API
 * Client-side endpoint to check payment status
 *
 * This endpoint checks both:
 * 1. Our database payment record (updated by webhook)
 * 2. Paystack's API directly (in case webhook is delayed)
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyTransaction } from '@/lib/paystack/client'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const reference = searchParams.get('reference')

    if (!reference) {
      return NextResponse.json(
        { error: 'Reference is required' },
        { status: 400 }
      )
    }

    // Create Supabase client inside the function
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Get payment record
    const { data: payment, error } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('paystack_reference', reference)
      .single()

    if (error || !payment) {
      return NextResponse.json(
        { status: 'failed', message: 'Payment not found' },
        { status: 404 }
      )
    }

    // If payment is still pending, verify directly with Paystack
    if (payment.status === 'pending') {
      try {
        console.log('Payment still pending, verifying with Paystack:', reference)
        const paystackData = await verifyTransaction(reference)

        if (paystackData.status === 'success') {
          console.log('Paystack confirms payment success, updating database')

          // Update payment status
          await supabaseAdmin
            .from('payments')
            .update({ status: 'success', updated_at: new Date().toISOString() })
            .eq('id', payment.id)

          // Process the payment (same logic as webhook)
          if (payment.payment_type === 'subscription') {
            await processSubscriptionPayment(payment, paystackData, supabaseAdmin)
          } else if (payment.payment_type === 'one-time') {
            await processOneTimePayment(payment, paystackData, supabaseAdmin)
          }

          return NextResponse.json({
            status: 'success',
            payment_type: payment.payment_type,
            amount: payment.amount,
            message: 'Payment confirmed',
          })
        }
      } catch (verifyError) {
        console.error('Paystack verification error:', verifyError)
        // Continue with database status if Paystack verification fails
      }
    }

    return NextResponse.json({
      status: payment.status,
      payment_type: payment.payment_type,
      amount: payment.amount,
      message: payment.status === 'success'
        ? 'Payment confirmed'
        : payment.status === 'pending'
        ? 'Payment is being processed'
        : 'Payment failed',
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { status: 'failed', message: 'Verification failed' },
      { status: 500 }
    )
  }
}

/**
 * Process subscription payment
 * Converts trialing subscription to active paid subscription
 */
async function processSubscriptionPayment(payment: any, data: any, supabaseAdmin: any) {
  const userId = payment.user_id
  const planId = payment.plan_id
  const billingCycle = payment.billing_cycle

  console.log('Processing subscription payment for user:', userId)

  // Calculate period dates
  const now = new Date()
  const periodEnd = new Date(now)
  if (billingCycle === 'monthly') {
    periodEnd.setMonth(periodEnd.getMonth() + 1)
  } else {
    periodEnd.setFullYear(periodEnd.getFullYear() + 1)
  }

  // Check if user has existing subscription (likely a trial)
  const { data: existingSubscription } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .single()

  if (existingSubscription) {
    // Convert trial to paid subscription
    console.log('Upgrading existing subscription from', existingSubscription.status, 'to active')
    await supabaseAdmin
      .from('subscriptions')
      .update({
        plan_id: planId,
        billing_cycle: billingCycle,
        current_period_start: now.toISOString(),
        current_period_end: periodEnd.toISOString(),
        cancel_at_period_end: false,
        paystack_customer_code: data.customer?.customer_code,
        status: 'active',
      })
      .eq('id', existingSubscription.id)
  } else {
    // Create new active subscription
    console.log('Creating new active subscription for user:', userId)
    await supabaseAdmin.from('subscriptions').insert({
      user_id: userId,
      plan_id: planId,
      status: 'active',
      billing_cycle: billingCycle,
      current_period_start: now.toISOString(),
      current_period_end: periodEnd.toISOString(),
      paystack_customer_code: data.customer?.customer_code,
    })
  }

  console.log('Subscription activated successfully for user:', userId)
}

/**
 * Process one-time payment (annual/lifetime)
 */
async function processOneTimePayment(payment: any, _data: any, supabaseAdmin: any) {
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

  // Cancel ALL existing subscriptions (trial and active) since they're upgrading to a one-time purchase
  const { data: existingSubscriptions } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['trialing', 'active'])

  if (existingSubscriptions && existingSubscriptions.length > 0) {
    console.log(`Canceling ${existingSubscriptions.length} subscription(s) for user purchasing lifetime/annual:`, userId)
    await supabaseAdmin
      .from('subscriptions')
      .update({ status: 'canceled' })
      .eq('user_id', userId)
      .in('status', ['trialing', 'active'])
  }

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
