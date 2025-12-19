"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check, Zap, Shield, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import { SubscriptionPaymentButton, OneTimePaymentButton } from "@/components/pricing/payment-button"
import type { PlanId, BillingCycle } from "@/lib/paystack/config"

// Consistent number formatting to avoid hydration issues
function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const plans = [
  {
    name: "Starter",
    price: {
      monthly: 199,
      yearly: 1979, // 199 * 12 * 0.83 (17% discount)
    },
    description: "Perfect for solo entrepreneurs and small teams getting started.",
    features: [
      "Up to 50 clients",
      "Unlimited jobs & invoices",
      "VAT-compliant invoicing",
      "Expense tracking",
      "Basic reporting",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: {
      monthly: 599,
      yearly: 5970, // 599 * 12 * 0.83 (17% discount)
    },
    description: "For growing businesses that need advanced features and insights.",
    features: [
      "Unlimited clients",
      "Unlimited jobs & invoices",
      "VAT-compliant invoicing",
      "Advanced expense tracking",
      "Job line items & breakdowns",
      "P&L statements",
      "Business analytics & charts",
      "Priority email support",
      "Custom branding on invoices",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: {
      monthly: 1999,
      yearly: 19910, // 1999 * 12 * 0.83 (17% discount)
    },
    description: "For established businesses requiring premium support and customization.",
    features: [
      "Everything in Professional",
      "Multi-user accounts",
      "Advanced permissions",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Phone & priority support",
      "Custom reporting",
      "Data export & backups",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const oneTimeOptions = [
  {
    name: "Annual Prepaid",
    price: 4478, // 5970 * 0.75 (25% off yearly price)
    originalPrice: 5970,
    savings: "Save R1,492",
    description: "Professional plan - Pay once for 12 months.",
    features: [
      "All Professional features",
      "12 months access",
      "One-time payment",
      "25% discount",
    ],
  },
  {
    name: "Lifetime Access",
    price: 12999,
    originalPrice: 21528, // 599 * 12 * 3 years worth
    savings: "Save R8,529",
    description: "Professional plan - Pay once, use forever. Limited to first 100 users!",
    features: [
      "All Professional features",
      "Lifetime access - no recurring fees",
      "All future updates included",
      "Priority support forever",
      "Early access to new features",
      "Founder tier benefits",
      "Limited to first 100 users",
    ],
    badge: "Limited Offer",
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Header */}
        <section className="border-b border-border bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-4 text-pretty text-lg text-muted-foreground sm:text-xl">
                Choose the plan that fits your business. All prices include VAT.
                Cancel anytime, no questions asked.
              </p>

              {/* Billing Toggle */}
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-background p-1">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                    !isYearly
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                    isYearly
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Yearly{" "}
                  <span className={`ml-1 text-xs ${isYearly ? "text-primary-foreground/80" : "text-primary"}`}>
                    (Save 17%)
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {plans.map((plan) => {
                const displayPrice = isYearly ? plan.price.yearly : plan.price.monthly
                const pricePerMonth = isYearly ? Math.round(plan.price.yearly / 12) : plan.price.monthly

                return (
                  <Card
                    key={plan.name}
                    className={`relative flex flex-col ${
                      plan.popular
                        ? "border-primary/50 shadow-lg shadow-primary/10 lg:scale-105"
                        : "border-border"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <div className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-md">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          Most Popular
                        </div>
                      </div>
                    )}

                    <CardHeader className="pb-8 pt-8">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                      <div className="mt-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold tracking-tight text-foreground">
                            R{formatPrice(displayPrice)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {isYearly ? "/year" : "/month"}
                          </span>
                        </div>
                        {isYearly && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            R{pricePerMonth}/month (incl. VAT)
                          </p>
                        )}
                        {!isYearly && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            or R{formatPrice(plan.price.yearly)}/year (incl. VAT)
                          </p>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col">
                      <ul className="flex-1 space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check className="h-5 w-5 shrink-0 text-primary" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        {plan.name === "Enterprise" ? (
                          <Button
                            asChild
                            className="w-full"
                            variant="outline"
                            size="lg"
                          >
                            <Link href="mailto:syniq.store@gmail.com">{plan.cta}</Link>
                          </Button>
                        ) : (
                          <SubscriptionPaymentButton
                            planId={plan.name.toLowerCase() as PlanId}
                            billingCycle={isYearly ? "yearly" : "monthly"}
                            label={plan.cta}
                            variant={plan.popular ? "default" : "outline"}
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* One-Time Payment Options */}
        <section className="border-t border-border bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Prefer a One-Time Payment?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Pay once and get access at a discounted rate - no recurring charges ever.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-3xl space-y-6">
              {oneTimeOptions.map((option) => (
                <Card
                  key={option.name}
                  className={`relative ${
                    option.badge
                      ? "border-primary/50 bg-gradient-to-br from-primary/10 via-primary/5 to-background"
                      : "border-primary/30 bg-gradient-to-br from-primary/5 to-background"
                  }`}
                >
                  {option.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-primary/80 px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg">
                        <Sparkles className="h-3.5 w-3.5" />
                        {option.badge}
                      </div>
                    </div>
                  )}
                  <CardContent className={`${option.badge ? "pt-10" : "pt-8"} p-8`}>
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-2xl font-bold text-foreground">{option.name}</h3>
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {option.savings}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{option.description}</p>

                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {option.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="h-4 w-4 shrink-0 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col items-center gap-4 sm:items-end lg:min-w-[200px]">
                        <div className="text-center sm:text-right">
                          <div className="text-sm text-muted-foreground line-through">
                            R{formatPrice(option.originalPrice)}
                          </div>
                          <div className="text-3xl font-bold text-foreground">
                            R{formatPrice(option.price)}
                          </div>
                          <div className="text-xs text-muted-foreground">(incl. VAT)</div>
                        </div>
                        <OneTimePaymentButton
                          productType={option.name === "Lifetime Access" ? "lifetime" : "annual_prepaid"}
                          label={option.badge ? "Claim Your Spot" : "Get Started"}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Secure Payments</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  All payments are processed securely through trusted South African payment providers.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Cancel Anytime</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  No long-term commitments. Cancel your subscription anytime with no penalties.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">14-Day Free Trial</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try any plan free for 14 days. No credit card required to start.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-border bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Do I need a credit card for the free trial?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  No, you can start your 14-day free trial without providing any payment information.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Are prices inclusive of VAT?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Yes, all prices shown include South African VAT (15%). You'll see the exact amount
                  before completing payment.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Can I upgrade or downgrade my plan?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect
                  immediately, and we'll prorate any charges.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  What payment methods do you accept?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We accept major credit cards, debit cards, and EFT payments through our secure South
                  African payment partners.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  What happens to my lifetime access if you change features?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Lifetime access means you get all current Professional features plus all future updates
                  and new features we add - forever. Your one-time payment covers everything.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  What happens if I cancel my subscription?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You'll retain access to your account until the end of your current billing period.
                  After that, your account will be downgraded to read-only access, and no further charges
                  will be made.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Do you offer refunds?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We handle refund requests on a case-by-case basis. If you're not satisfied within the
                  first 30 days, contact us and we'll work something out. See our{" "}
                  <Link href="/legal/billing" className="text-primary hover:underline">
                    Billing Terms
                  </Link>{" "}
                  for details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to streamline your operations?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join South African service businesses using Syniq Ops to manage their operations.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">Start Your Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="mailto:syniq.store@gmail.com">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
