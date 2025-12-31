"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ROICalculator } from "@/components/roi-calculator"
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
        <section className="relative overflow-hidden border-b bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 py-24 sm:py-32">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 px-4 py-1.5 text-sm font-medium text-teal-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Simple, transparent pricing
              </div>
              <h1 className="bg-gradient-to-br from-teal-600 via-slate-900 to-cyan-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
                Choose Your Plan
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-slate-600">
                Everything you need to manage your business efficiently.
                <br />
                All prices include VAT. Cancel anytime.
              </p>

              {/* Billing Toggle */}
              <div className="mt-10 inline-flex items-center gap-1.5 rounded-xl border-2 border-teal-200 bg-white p-1.5 shadow-lg">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    !isYearly
                      ? "bg-teal-600 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isYearly
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900"
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
                        ? "border-teal-200 bg-gradient-to-br from-teal-50 via-white to-cyan-50 shadow-xl shadow-teal-500/10"
                        : "border-slate-200 bg-white shadow-lg hover:border-teal-200 hover:shadow-xl"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                          ⭐ Most Popular
                        </div>
                      </div>
                    )}

                    <div className={`h-2 overflow-hidden rounded-t-lg ${plan.popular ? "bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500" : "bg-gradient-to-r from-teal-200 to-cyan-200"}`} />

                    <CardHeader className="space-y-6 p-8 pb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">{plan.description}</p>
                      </div>
                      <div className="pt-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-bold bg-gradient-to-br from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                            R{formatPrice(displayPrice)}
                          </span>
                          <span className="text-base font-medium text-slate-600">
                            {isYearly ? "/year" : "/mo"}
                          </span>
                        </div>
                        {isYearly && (
                          <p className="mt-2 text-sm font-medium text-cyan-600">
                            💰 R{pricePerMonth}/month • Save 17%
                          </p>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col p-8 pt-0">
                      <ul className="flex-1 space-y-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100">
                              <Check className="h-3.5 w-3.5 text-teal-600" />
                            </div>
                            <span className="text-sm leading-relaxed text-slate-600">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        {plan.name === "Enterprise" ? (
                          <Button
                            asChild
                            className="w-full border-2 border-teal-200 bg-white text-slate-900 hover:border-teal-400 hover:bg-teal-50"
                            variant="outline"
                            size="lg"
                          >
                            <Link href="mailto:sales@syniqsolutions.co.za">{plan.cta}</Link>
                          </Button>
                        ) : (
                          <Button
                            className={`w-full text-base font-semibold shadow-md transition-all duration-300 ${
                              plan.popular
                                ? "bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-lg hover:shadow-teal-500/30"
                                : "bg-teal-600 hover:bg-teal-700 hover:shadow-lg"
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
        <section className="relative overflow-hidden border-t bg-gradient-to-br from-cyan-50/50 via-white to-teal-50/30 pb-24 pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.08),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.08),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-100 to-teal-100 px-4 py-1.5 text-sm font-semibold text-cyan-700">
                <Sparkles className="h-4 w-4" />
                Best Value
              </div>
              <h2 className="bg-gradient-to-br from-slate-900 via-teal-600 to-cyan-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                One-Time Payment Options
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Pay once and own it forever. No subscriptions, no recurring charges.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-5xl space-y-8">
              {oneTimeOptions.map((option) => (
                <Card
                  key={option.name}
                  className={`group relative border-2 transition-all duration-300 hover:-translate-y-1 ${
                    option.badge
                      ? "border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-teal-50 shadow-2xl shadow-cyan-500/10"
                      : "border-slate-200 bg-white shadow-xl hover:border-cyan-200 hover:shadow-2xl"
                  }`}
                >
                  {option.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2 text-sm font-bold text-white shadow-lg">
                        <Sparkles className="h-4 w-4" />
                        {option.badge}
                      </div>
                    </div>
                  )}

                  <div className={`h-2 overflow-hidden rounded-t-lg ${option.badge ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500" : "bg-gradient-to-r from-cyan-200 to-teal-200"}`} />

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
        <section className="border-t bg-gradient-to-br from-teal-50/50 via-white to-cyan-50/30 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-teal-500/30">
                  <Shield className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">🔒 Secure Payments</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Bank-level encryption through trusted South African payment providers.
                </p>
              </div>

              <div className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-cyan-500/30">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">⚡ Cancel Anytime</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  No long-term commitments. Cancel your subscription with one click.
                </p>
              </div>

              <div className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-500 text-white shadow-lg shadow-teal-500/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-teal-500/30">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">🎉 7-Day Free Trial</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Try Professional plan free for 7 days. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t bg-slate-50 py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900">
              Frequently asked questions
            </h2>

            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Do I need a credit card for the free trial?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  No, you can start your 7-day free trial without providing any payment information.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Are prices inclusive of VAT?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Yes, all prices shown include South African VAT (15%). You'll see the exact amount
                  before completing payment.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Can I upgrade or downgrade my plan?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  You can change your plan at any time. Changes take effect immediately, and we'll prorate any charges.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  What payment methods do you accept?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  We accept major credit cards, debit cards, and EFT payments through our secure South
                  African payment partners.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  What happens to my lifetime access if you change features?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Lifetime access means you get all current Professional features plus all future updates
                  and new features we add. Your one-time payment covers everything.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  What happens if I cancel my subscription?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  You'll retain access until the end of your current billing period.
                  After that, your account will be downgraded to read-only access, and no further charges
                  will be made.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Do you offer refunds?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  We handle refund requests on a case-by-case basis. If you're not satisfied within the
                  first 30 days, contact us and we'll work something out. See our{" "}
                  <Link href="/legal/billing" className="text-teal-600 hover:underline">
                    Billing Terms
                  </Link>{" "}
                  for details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden border-t bg-gradient-to-br from-slate-800 via-slate-700 to-teal-800 py-24">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
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
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white shadow-xl shadow-black/20 text-lg font-bold px-8 py-6 h-auto"
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
                <Link href="mailto:sales@syniqsolutions.co.za">💬 Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <ROICalculator />
      </main>
      <Footer />
    </div>
  )
}
