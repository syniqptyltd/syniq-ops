"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { initializeSubscriptionPayment, initializeOneTimePayment } from "@/lib/paystack/actions"
import type { PlanId, BillingCycle, ProductType } from "@/lib/paystack/config"
import { toast } from "sonner"

interface SubscriptionButtonProps {
  planId: PlanId
  billingCycle: BillingCycle
  label: string
  variant?: "default" | "outline"
}

export function SubscriptionPaymentButton({
  planId,
  billingCycle,
  label,
  variant = "default",
}: SubscriptionButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)

    try {
      const result = await initializeSubscriptionPayment(planId, billingCycle)

      if (result.error) {
        toast.error(result.error)
        setIsLoading(false)
        return
      }

      if (result.authorizationUrl) {
        // Redirect to Paystack payment page
        window.location.href = result.authorizationUrl
      }
    } catch (error) {
      console.error("Payment initialization error:", error)
      toast.error("Failed to initialize payment. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant={variant}
      size="lg"
      className="w-full"
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  )
}

interface OneTimePaymentButtonProps {
  productType: ProductType
  label: string
}

export function OneTimePaymentButton({
  productType,
  label,
}: OneTimePaymentButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)

    try {
      const result = await initializeOneTimePayment(productType)

      if (result.error) {
        toast.error(result.error)
        setIsLoading(false)
        return
      }

      if (result.authorizationUrl) {
        // Redirect to Paystack payment page
        window.location.href = result.authorizationUrl
      }
    } catch (error) {
      console.error("Payment initialization error:", error)
      toast.error("Failed to initialize payment. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      size="lg"
      className="w-full sm:w-auto"
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  )
}
