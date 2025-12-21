"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check, Zap, Shield, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/subscription/status")
      if (response.ok) {
        const data = await response.json()
        // User is logged in if we get a valid response (even if hasAccess is false)
        setIsLoggedIn(true)
      } else if (response.status === 401) {
        // User is not logged in
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.error("Error checking auth status:", error)
      setIsLoggedIn(false)
    } finally {
      setLoading(false)
    }
  }

  const handlePlanClick = (planName: string, isYearly: boolean) => {
    if (planName === "Enterprise") {
      // Enterprise always goes to email
      return
    }

    const planParam = `${planName.toLowerCase()}_${isYearly ? "yearly" : "monthly"}`

    if (isLoggedIn) {
      // Existing users (including expired trials) go to checkout
      router.push(`/checkout?plan=${planParam}`)
    } else {
      // New users go to signup for free trial
      router.push("/signup")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header with gradient background */}
        <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-accent/30 py-24 sm:py-32">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#d5dde5_1px,transparent_1px),linear-gradient(to_bottom,#d5dde5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground shadow-sm">
                <Sparkles className="h-4 w-4" />
                Simple, transparent pricing
              </div>
              <h1 className="bg-gradient-to-br from-primary via-foreground to-secondary bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
                Choose Your Plan
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
                Everything you need to manage your business efficiently.
                <br />
                All prices include VAT. Cancel anytime.
              </p>

              {/* Billing Toggle */}
              <div className="mt-10 inline-flex items-center gap-1.5 rounded-xl border-2 border-primary/20 bg-card p-1.5 shadow-lg">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    !isYearly
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isYearly
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Annual
                  <span className="ml-1.5 text-xs">💰 Save 17%</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="overflow-visible pb-24 pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3 mt-8">
              {plans.map((plan, index) => {
                const displayPrice = isYearly ? plan.price.yearly : plan.price.monthly
                const pricePerMonth = isYearly ? Math.round(plan.price.yearly / 12) : plan.price.monthly

                return (
                  <Card
                    key={plan.name}
                    className={`group relative flex flex-col border-2 transition-all duration-300 hover:-translate-y-1 ${
                      plan.popular
                        ? "border-primary/50 bg-gradient-to-br from-primary/5 via-card to-accent/10 shadow-xl shadow-primary/10"
                        : "border-border bg-card shadow-lg hover:border-primary/30 hover:shadow-xl"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                          ⭐ Most Popular
                        </div>
                      </div>
                    )}

                    <div className={`h-2 overflow-hidden rounded-t-lg ${plan.popular ? "bg-gradient-to-r from-primary via-secondary to-primary" : "bg-gradient-to-r from-primary/20 to-secondary/20"}`} />

                    <CardHeader className="space-y-6 p-8 pb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
                      </div>
                      <div className="pt-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                            R{formatPrice(displayPrice)}
                          </span>
                          <span className="text-base font-medium text-muted-foreground">
                            {isYearly ? "/year" : "/mo"}
                          </span>
                        </div>
                        {isYearly && (
                          <p className="mt-2 text-sm font-medium text-secondary">
                            💰 R{pricePerMonth}/month • Save 17%
                          </p>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col p-8 pt-0">
                      <ul className="flex-1 space-y-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                              <Check className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span className="text-sm leading-relaxed text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        {plan.name === "Enterprise" ? (
                          <Button
                            asChild
                            className="w-full border-2 border-primary/20 bg-card text-foreground hover:border-primary hover:bg-primary/5"
                            variant="outline"
                            size="lg"
                          >
                            <Link href="mailto:syniq.store@gmail.com">{plan.cta}</Link>
                          </Button>
                        ) : (
                          <Button
                            className={`w-full text-base font-semibold shadow-md transition-all duration-300 ${
                              plan.popular
                                ? "bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30"
                                : "bg-primary hover:bg-primary/90 hover:shadow-lg"
                            }`}
                            size="lg"
                            onClick={() => handlePlanClick(plan.name, isYearly)}
                            disabled={loading}
                          >
                            {plan.cta}
                          </Button>
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
        <section className="relative overflow-hidden border-t bg-gradient-to-br from-accent/20 via-background to-primary/5 pb-24 pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,102,255,0.05),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(255,140,66,0.05),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary/10 to-secondary/5 px-4 py-1.5 text-sm font-semibold text-secondary">
                <Sparkles className="h-4 w-4" />
                Best Value
              </div>
              <h2 className="bg-gradient-to-br from-foreground via-primary to-secondary bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                One-Time Payment Options
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Pay once and own it forever. No subscriptions, no recurring charges.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-5xl space-y-8">
              {oneTimeOptions.map((option) => (
                <Card
                  key={option.name}
                  className={`group relative border-2 transition-all duration-300 hover:-translate-y-1 ${
                    option.badge
                      ? "border-secondary/50 bg-gradient-to-br from-accent/30 via-card to-secondary/5 shadow-2xl shadow-secondary/10"
                      : "border-border bg-card shadow-xl hover:border-secondary/30 hover:shadow-2xl"
                  }`}
                >
                  {option.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary to-secondary/80 px-5 py-2 text-sm font-bold text-white shadow-lg">
                        <Sparkles className="h-4 w-4" />
                        {option.badge}
                      </div>
                    </div>
                  )}

                  <div className={`h-2 overflow-hidden rounded-t-lg ${option.badge ? "bg-gradient-to-r from-secondary via-primary to-secondary" : "bg-gradient-to-r from-secondary/30 to-primary/30"}`} />

                  <CardContent className="p-10">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-4">
                          <h3 className="text-3xl font-bold text-foreground">{option.name}</h3>
                          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-secondary/20 to-secondary/10 px-3 py-1 text-sm font-bold text-secondary">
                            💰 {option.savings}
                          </span>
                        </div>
                        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{option.description}</p>

                        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                          {option.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                                <Check className="h-3.5 w-3.5 text-secondary" />
                              </div>
                              <span className="leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col items-start gap-6 lg:items-end lg:min-w-[220px]">
                        <div className="lg:text-right">
                          <div className="text-base font-medium text-muted-foreground line-through">
                            R{formatPrice(option.originalPrice)}
                          </div>
                          <div className="mt-1 bg-gradient-to-br from-primary to-secondary bg-clip-text text-5xl font-bold text-transparent">
                            R{formatPrice(option.price)}
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">One-time payment</div>
                        </div>
                        <Button
                          asChild
                          className={`w-full text-base font-semibold shadow-lg lg:w-auto ${
                            option.badge
                              ? "bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-xl hover:shadow-secondary/30"
                              : "border-2 border-secondary/30 bg-card text-foreground hover:border-secondary hover:bg-secondary/5"
                          }`}
                          variant={option.badge ? "default" : "outline"}
                          size="lg"
                        >
                          <Link href={`/checkout?plan=${option.name === "Lifetime Access" ? "lifetime" : "annual_prepaid"}`}>
                            {option.badge ? "🚀 Claim Lifetime Access" : "Get Annual Access"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="border-t bg-gradient-to-br from-primary/5 via-background to-accent/10 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/30">
                  <Shield className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-foreground">🔒 Secure Payments</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Bank-level encryption through trusted South African payment providers.
                </p>
              </div>

              <div className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 text-white shadow-lg shadow-secondary/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-secondary/30">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-foreground">⚡ Cancel Anytime</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  No long-term commitments. Cancel your subscription with one click.
                </p>
              </div>

              <div className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary text-white shadow-lg shadow-primary/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/30">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-foreground">🎉 7-Day Free Trial</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Try Professional plan free for 7 days. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t bg-muted/40 py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
              Frequently asked questions
            </h2>

            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Do I need a credit card for the free trial?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  No, you can start your 7-day free trial without providing any payment information.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Are prices inclusive of VAT?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Yes, all prices shown include South African VAT (15%). You'll see the exact amount
                  before completing payment.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Can I upgrade or downgrade my plan?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  You can change your plan at any time. Changes take effect immediately, and we'll prorate any charges.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground">
                  What payment methods do you accept?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We accept major credit cards, debit cards, and EFT payments through our secure South
                  African payment partners.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground">
                  What happens to my lifetime access if you change features?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Lifetime access means you get all current Professional features plus all future updates
                  and new features we add. Your one-time payment covers everything.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground">
                  What happens if I cancel my subscription?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  You'll retain access until the end of your current billing period.
                  After that, your account will be downgraded to read-only access, and no further charges
                  will be made.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Do you offer refunds?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
        <section className="relative overflow-hidden border-t bg-gradient-to-br from-primary via-primary/90 to-secondary py-24">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Join hundreds of South African service businesses already using Syniq Ops to streamline their operations.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                onClick={() => handlePlanClick("Professional", false)}
                disabled={loading}
                className="bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/20 text-lg font-bold px-8 py-6 h-auto"
                size="lg"
              >
                {isLoggedIn ? "🚀 Subscribe Now" : "✨ Start Free Trial"}
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-lg font-semibold px-8 py-6 h-auto"
                size="lg"
              >
                <Link href="mailto:syniq.store@gmail.com">💬 Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
