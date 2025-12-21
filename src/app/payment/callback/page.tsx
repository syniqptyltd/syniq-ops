"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import Link from "next/link"

function PaymentCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reference = searchParams.get("reference")

  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")
  const [message, setMessage] = useState("Processing your payment...")
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    if (!reference) {
      setStatus("failed")
      setMessage("No payment reference found")
      return
    }

    // Poll for payment confirmation (webhook should process first)
    const checkPaymentStatus = async () => {
      try {
        // Wait a bit for webhook to process
        await new Promise(resolve => setTimeout(resolve, 3000))

        console.log(`Checking payment status (attempt ${attempts + 1})...`)
        const response = await fetch(`/api/payment/verify?reference=${reference}`)
        const data = await response.json()

        console.log('Payment verification response:', data)

        if (data.status === "success") {
          setStatus("success")
          setMessage("Payment successful! Your subscription is now active.")

          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push("/dashboard")
          }, 3000)
        } else if (data.status === "failed") {
          setStatus("failed")
          setMessage(data.message || "Payment failed. Please try again.")
        } else {
          // Still processing, check again (max 10 attempts = ~20 seconds)
          const newAttempts = attempts + 1
          setAttempts(newAttempts)

          if (newAttempts >= 10) {
            console.error('Payment verification timeout after 10 attempts')
            setStatus("failed")
            setMessage("Payment verification is taking longer than expected. Please check your subscription status in the dashboard or contact support if you were charged.")
          } else {
            setTimeout(checkPaymentStatus, 2000)
          }
        }
      } catch (error) {
        console.error("Error verifying payment:", error)
        setStatus("failed")
        setMessage("Error verifying payment. Please contact support.")
      }
    }

    checkPaymentStatus()
  }, [reference, router, attempts])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex-1 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/20">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/3 top-1/4 h-[350px] w-[350px] rounded-full bg-primary opacity-10 blur-[120px] animate-pulse" />
          <div className="absolute right-1/3 bottom-1/4 h-[300px] w-[300px] rounded-full bg-secondary opacity-10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-2 border-primary/20 shadow-2xl shadow-primary/10 backdrop-blur-sm">
            <CardContent className="pt-12 pb-12">
              <div className="flex flex-col items-center text-center">
                {status === "loading" && (
                  <>
                    <div className="relative mb-8">
                      <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-2xl animate-pulse" />
                      <Loader2 className="relative h-20 w-20 text-primary animate-spin" />
                    </div>
                    <h1 className="text-3xl font-bold mb-3">
                      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Processing Payment
                      </span>
                    </h1>
                    <p className="text-lg text-muted-foreground">{message}</p>
                  </>
                )}

                {status === "success" && (
                  <>
                    <div className="relative mb-8">
                      <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 blur-2xl animate-pulse" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-xl shadow-green-500/30">
                        <CheckCircle2 className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-3">
                      <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                        Payment Successful!
                      </span>
                    </h1>
                    <p className="text-lg text-muted-foreground mb-6">{message}</p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 text-sm font-semibold text-primary">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Redirecting to dashboard...
                    </div>
                  </>
                )}

                {status === "failed" && (
                  <>
                    <div className="relative mb-8">
                      <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 blur-2xl" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-xl shadow-red-500/30">
                        <XCircle className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-3">
                      <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                        Payment Failed
                      </span>
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8">{message}</p>
                    <div className="flex gap-4">
                      <Button className="bg-gradient-to-r from-primary to-secondary font-bold shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40" asChild>
                        <Link href="/pricing">Try Again</Link>
                      </Button>
                      <Button variant="outline" className="border-2 border-primary/30 font-semibold hover:border-primary hover:bg-primary/5" asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-background">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="pt-12 pb-12">
                <div className="flex flex-col items-center text-center">
                  <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Loading...
                  </h1>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  )
}
