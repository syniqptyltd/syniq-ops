"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Loader2, Lock } from "lucide-react"
import { signIn, signUp } from "@/lib/supabase/actions"
import { initializeSubscriptionPayment, initializeOneTimePayment } from "@/lib/paystack/actions"
import { toast } from "sonner"
import { getUser } from "@/lib/supabase/actions"

const PLAN_DETAILS = {
  starter_monthly: { name: "Starter", price: 199, billing: "Monthly", type: "subscription" as const },
  starter_yearly: { name: "Starter", price: 1979, billing: "Yearly", type: "subscription" as const },
  professional_monthly: { name: "Professional", price: 599, billing: "Monthly", type: "subscription" as const },
  professional_yearly: { name: "Professional", price: 5970, billing: "Yearly", type: "subscription" as const },
  enterprise_monthly: { name: "Enterprise", price: 1999, billing: "Monthly", type: "subscription" as const },
  enterprise_yearly: { name: "Enterprise", price: 19910, billing: "Yearly", type: "subscription" as const },
  annual_prepaid: { name: "Annual Prepaid", price: 4478, billing: "One-time", type: "one-time" as const },
  lifetime: { name: "Lifetime Access", price: 12999, billing: "One-time", type: "one-time" as const },
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planParam = searchParams.get("plan")

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  // Auth form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")

  const planDetails = planParam ? PLAN_DETAILS[planParam as keyof typeof PLAN_DETAILS] : null

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const userData = await getUser()
    setUser(userData)
    if (userData) {
      setEmail(userData.email || "")
    }
    setLoading(false)
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
      if (authMode === "signup") {
        const result = await signUp(email, password, fullName)
        if (result.error) {
          toast.error(result.error)
        } else {
          toast.success("Account created! Please check your email to verify your account.")
          // Refresh user state
          await checkUser()
        }
      } else {
        const result = await signIn(email, password)
        if (result.error) {
          toast.error(result.error)
        } else {
          toast.success("Signed in successfully!")
          // Refresh user state
          await checkUser()
        }
      }
    } catch (error) {
      toast.error("Authentication failed. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  const handleProceedToPayment = async () => {
    if (!planDetails) {
      toast.error("No plan selected")
      return
    }

    setProcessing(true)

    try {
      let result

      if (planDetails.type === "subscription") {
        const [planId, billingCycle] = (planParam as string).split("_")
        result = await initializeSubscriptionPayment(
          planId as any,
          billingCycle as any
        )
      } else {
        result = await initializeOneTimePayment(
          planParam === "lifetime" ? "lifetime" : "annual_prepaid"
        )
      }

      if ("error" in result) {
        toast.error(result.error)
      } else if (result.authorizationUrl) {
        // Redirect to Paystack
        window.location.href = result.authorizationUrl
      }
    } catch (error) {
      console.error("Payment initialization error:", error)
      toast.error("Failed to initialize payment. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!planDetails) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-background">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>No Plan Selected</CardTitle>
              <CardDescription>Please select a plan from the pricing page</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/pricing">View Pricing Plans</a>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex-1 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/20 py-12">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/3 top-1/4 h-[400px] w-[400px] rounded-full bg-primary opacity-10 blur-[120px] animate-pulse" />
          <div className="absolute right-1/3 bottom-1/4 h-[350px] w-[350px] rounded-full bg-secondary opacity-10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container relative mx-auto px-4 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Plan Details */}
            <div>
              <div className="mb-8">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                  <Lock className="h-4 w-4" />
                  Secure Checkout
                </div>
                <h1 className="text-4xl font-bold">
                  <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                    Complete Your Order
                  </span>
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  Get started with Syniq Ops today
                </p>
              </div>

              <Card className="border-2 border-primary/20 shadow-2xl shadow-primary/10 backdrop-blur-sm">
                <CardHeader className="border-b-2 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-lg">{planDetails.name} Plan</p>
                      <p className="text-sm font-medium text-muted-foreground">{planDetails.billing}</p>
                    </div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">R{formatPrice(planDetails.price)}</p>
                  </div>

                  <div className="border-t-2 border-primary/10 pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <span className="font-medium">Secure payment processing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <span className="font-medium">VAT included</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <span className="font-medium">Cancel anytime</span>
                    </div>
                  </div>

                  <div className="border-t-2 border-primary/10 pt-4">
                    <div className="flex items-center justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">R{formatPrice(planDetails.price)}</span>
                    </div>
                    {planDetails.billing !== "One-time" && (
                      <p className="text-xs font-medium text-muted-foreground mt-1">
                        Billed {planDetails.billing.toLowerCase()}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Auth / Payment */}
            <div>
              {!user ? (
                <Card className="border-2 border-secondary/20 shadow-2xl shadow-secondary/10 backdrop-blur-sm">
                  <CardHeader className="border-b-2 border-secondary/10 bg-gradient-to-br from-secondary/5 to-transparent">
                    <CardTitle className="text-xl">Sign In or Create Account</CardTitle>
                    <CardDescription className="text-base">
                      You need to be signed in to complete your purchase
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as any)}>
                      <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-primary/10 to-secondary/10">
                        <TabsTrigger value="signin" className="font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">Sign In</TabsTrigger>
                        <TabsTrigger value="signup" className="font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">Sign Up</TabsTrigger>
                      </TabsList>

                      <TabsContent value="signin">
                        <form onSubmit={handleAuth} className="space-y-4">
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary font-bold shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40" disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                          </Button>
                        </form>
                      </TabsContent>

                      <TabsContent value="signup">
                        <form onSubmit={handleAuth} className="space-y-4">
                          <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                              id="fullName"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email-signup">Email</Label>
                            <Input
                              id="email-signup"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="password-signup">Password</Label>
                            <Input
                              id="password-signup"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              required
                              minLength={6}
                            />
                          </div>
                          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary font-bold shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40" disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-secondary/20 shadow-2xl shadow-secondary/10 backdrop-blur-sm">
                  <CardHeader className="border-b-2 border-secondary/10 bg-gradient-to-br from-secondary/5 to-transparent">
                    <CardTitle className="text-xl">Complete Payment</CardTitle>
                    <CardDescription className="text-base">
                      You're signed in as <span className="font-semibold text-primary">{user.email}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
                      <p className="text-sm font-medium mb-3">You will be redirected to Paystack to complete your payment securely.</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                          <Lock className="h-3 w-3 text-primary" />
                        </div>
                        <span className="font-medium">256-bit SSL encrypted</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleProceedToPayment}
                      className="w-full bg-gradient-to-r from-primary to-secondary font-bold shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/40"
                      size="lg"
                      disabled={processing}
                    >
                      {processing && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                      Proceed to Payment
                    </Button>

                    <p className="text-xs text-center font-medium text-muted-foreground">
                      By proceeding, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
