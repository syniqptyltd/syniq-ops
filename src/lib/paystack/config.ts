/**
 * Paystack Configuration
 * Centralized config for all Paystack-related settings
 */

export const PAYSTACK_CONFIG = {
  // API Keys (never expose secret key to client)
  secretKey: process.env.PAYSTACK_SECRET_KEY!,
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  webhookSecret: process.env.PAYSTACK_WEBHOOK_SECRET!,

  // API Endpoints
  baseUrl: 'https://api.paystack.co',

  // Callback URLs
  callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/callback`,
  cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/canceled`,

  // Plan configurations (amounts in kobo - 1 ZAR = 100 kobo)
  plans: {
    starter: {
      monthly: {
        id: 'starter-monthly',
        name: 'Starter Monthly',
        amount: 19900, // R199 in kobo
        interval: 'monthly' as const,
      },
      yearly: {
        id: 'starter-yearly',
        name: 'Starter Yearly',
        amount: 197900, // R1,979 in kobo
        interval: 'annually' as const,
      },
    },
    professional: {
      monthly: {
        id: 'professional-monthly',
        name: 'Professional Monthly',
        amount: 59900, // R599 in kobo
        interval: 'monthly' as const,
      },
      yearly: {
        id: 'professional-yearly',
        name: 'Professional Yearly',
        amount: 597000, // R5,970 in kobo
        interval: 'annually' as const,
      },
    },
    enterprise: {
      monthly: {
        id: 'enterprise-monthly',
        name: 'Enterprise Monthly',
        amount: 199900, // R1,999 in kobo
        interval: 'monthly' as const,
      },
      yearly: {
        id: 'enterprise-yearly',
        name: 'Enterprise Yearly',
        amount: 1991000, // R19,910 in kobo
        interval: 'annually' as const,
      },
    },
  },

  // One-time products (amounts in kobo)
  products: {
    annual_prepaid: {
      id: 'annual-prepaid',
      name: 'Annual Prepaid (Professional)',
      amount: 447800, // R4,478 in kobo
    },
    lifetime: {
      id: 'lifetime-access',
      name: 'Lifetime Access (Professional)',
      amount: 1299900, // R12,999 in kobo
    },
  },

  // Currency
  currency: 'ZAR' as const,
} as const

// Type helpers
export type PlanId = 'starter' | 'professional' | 'enterprise'
export type BillingCycle = 'monthly' | 'yearly'
export type ProductType = 'annual_prepaid' | 'lifetime'
export type PaymentType = 'subscription' | 'one-time'

// Validate required environment variables (only warn, don't throw during module load)
if (typeof window === 'undefined') {
  // Server-side only checks
  if (!process.env.PAYSTACK_SECRET_KEY) {
    console.warn('PAYSTACK_SECRET_KEY is not set - payment functions will fail')
  }
  if (!process.env.PAYSTACK_WEBHOOK_SECRET) {
    console.warn('PAYSTACK_WEBHOOK_SECRET is not set - webhook validation will fail')
  }
}

if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
  console.warn('NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is not set')
}
