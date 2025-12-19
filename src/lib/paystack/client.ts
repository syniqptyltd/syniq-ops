/**
 * Paystack API Client
 * Server-side only - handles all Paystack API communication
 */

import { PAYSTACK_CONFIG } from './config'
import crypto from 'crypto'

/**
 * Validate required environment variables at runtime
 */
function validateEnv() {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    throw new Error('PAYSTACK_SECRET_KEY is required')
  }
  if (!process.env.PAYSTACK_WEBHOOK_SECRET) {
    throw new Error('PAYSTACK_WEBHOOK_SECRET is required')
  }
}

/**
 * Initialize a payment transaction
 */
export async function initializeTransaction(params: {
  email: string
  amount: number // in kobo
  reference: string
  metadata?: Record<string, any>
  plan?: string
  channels?: string[]
}) {
  validateEnv()
  const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...params,
      currency: PAYSTACK_CONFIG.currency,
      callback_url: PAYSTACK_CONFIG.callbackUrl,
      cancel_action: PAYSTACK_CONFIG.cancelUrl,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to initialize transaction')
  }

  const data = await response.json()
  return data.data as {
    authorization_url: string
    access_code: string
    reference: string
  }
}

/**
 * Verify a transaction
 */
export async function verifyTransaction(reference: string) {
  validateEnv()
  const response = await fetch(
    `${PAYSTACK_CONFIG.baseUrl}/transaction/verify/${reference}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
      },
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to verify transaction')
  }

  const data = await response.json()
  return data.data as {
    status: string
    reference: string
    amount: number
    customer: {
      email: string
      customer_code: string
    }
    metadata: Record<string, any>
    paid_at: string
  }
}

/**
 * Create a plan on Paystack (for subscriptions)
 */
export async function createPlan(params: {
  name: string
  amount: number // in kobo
  interval: 'monthly' | 'annually'
}) {
  const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/plan`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...params,
      currency: PAYSTACK_CONFIG.currency,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create plan')
  }

  const data = await response.json()
  return data.data as {
    plan_code: string
    name: string
    amount: number
    interval: string
  }
}

/**
 * Create a subscription
 */
export async function createSubscription(params: {
  customer: string // customer code or email
  plan: string // plan code
  authorization: string // authorization code from previous transaction
}) {
  const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/subscription`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create subscription')
  }

  const data = await response.json()
  return data.data as {
    subscription_code: string
    email_token: string
    status: string
    amount: number
    next_payment_date: string
  }
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(subscriptionCode: string, token: string) {
  const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/subscription/disable`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: subscriptionCode,
      token,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to cancel subscription')
  }

  return response.json()
}

/**
 * Verify Paystack webhook signature
 */
export function verifyWebhookSignature(payload: string, signature: string): boolean {
  validateEnv()
  const hash = crypto
    .createHmac('sha512', PAYSTACK_CONFIG.webhookSecret)
    .update(payload)
    .digest('hex')

  return hash === signature
}

/**
 * Generate a unique payment reference
 */
export function generatePaymentReference(userId: string, type: 'sub' | 'otp'): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)
  return `${type}_${userId.substring(0, 8)}_${timestamp}_${random}`
}
