/**
 * Payment Verification API
 * Client-side endpoint to check payment status
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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
