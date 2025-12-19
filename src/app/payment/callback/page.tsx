"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reference = searchParams.get("reference")

  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")
  const [message, setMessage] = useState("Processing your payment...")

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

        const response = await fetch(`/api/payment/verify?reference=${reference}`)
        const data = await response.json()

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
          // Still processing, check again
          setTimeout(checkPaymentStatus, 2000)
        }
      } catch (error) {
        console.error("Error verifying payment:", error)
        setStatus("failed")
        setMessage("Error verifying payment. Please contact support.")
      }
    }

    checkPaymentStatus()
  }, [reference, router])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="flex flex-col items-center text-center">
                {status === "loading" && (
                  <>
                    <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                      Processing Payment
                    </h1>
                    <p className="text-muted-foreground">{message}</p>
                  </>
                )}

                {status === "success" && (
                  <>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                      Payment Successful!
                    </h1>
                    <p className="text-muted-foreground mb-6">{message}</p>
                    <p className="text-sm text-muted-foreground">
                      Redirecting to dashboard...
                    </p>
                  </>
                )}

                {status === "failed" && (
                  <>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
                      <XCircle className="h-10 w-10 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                      Payment Failed
                    </h1>
                    <p className="text-muted-foreground mb-6">{message}</p>
                    <div className="flex gap-4">
                      <Button asChild>
                        <Link href="/pricing">Try Again</Link>
                      </Button>
                      <Button variant="outline" asChild>
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
