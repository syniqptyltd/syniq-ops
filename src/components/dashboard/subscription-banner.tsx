"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, Crown } from "lucide-react"
import Link from "next/link"

interface SubscriptionStatus {
  hasAccess: boolean
  subscription: any | null
  purchase: any | null
}

export function SubscriptionBanner() {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSubscription()
  }, [])

  const checkSubscription = async () => {
    try {
      const response = await fetch("/api/subscription/status")
      if (response.ok) {
        const data = await response.json()
        setStatus(data)
      }
    } catch (error) {
      console.error("Error checking subscription:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return null
  }

  // No subscription or purchase - show upgrade banner
  if (!status?.hasAccess) {
    return (
      <Alert className="mb-6 border-orange-200 bg-orange-50">
        <AlertCircle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="ml-2 flex items-center justify-between">
          <span className="text-orange-900">
            You're on the free plan. Upgrade to unlock all features and unlimited access.
          </span>
          <Button asChild size="sm" className="ml-4">
            <Link href="/pricing">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade Now
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  // Has active subscription
  if (status.subscription) {
    const sub = status.subscription
    const periodEnd = new Date(sub.current_period_end)
    const daysRemaining = Math.ceil((periodEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

    // Show warning if subscription ends soon or is canceled
    if (sub.cancel_at_period_end || daysRemaining <= 7) {
      return (
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="ml-2 flex items-center justify-between">
            <span className="text-orange-900">
              {sub.cancel_at_period_end
                ? `Your subscription ends on ${periodEnd.toLocaleDateString()}. Renew to keep access.`
                : `Your subscription renews in ${daysRemaining} days.`
              }
            </span>
            <Button asChild size="sm" variant="outline" className="ml-4">
              <Link href="/dashboard/subscription">Manage Subscription</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )
    }
  }

  // Has active purchase (lifetime or annual)
  if (status.purchase) {
    const purchase = status.purchase

    // Show warning for annual prepaid that's expiring soon
    if (purchase.expires_at) {
      const expiryDate = new Date(purchase.expires_at)
      const daysRemaining = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

      if (daysRemaining <= 30) {
        return (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="ml-2 flex items-center justify-between">
              <span className="text-orange-900">
                Your annual access expires in {daysRemaining} days on {expiryDate.toLocaleDateString()}.
              </span>
              <Button asChild size="sm" className="ml-4">
                <Link href="/pricing">Renew Access</Link>
              </Button>
            </AlertDescription>
          </Alert>
        )
      }
    }
  }

  // All good, no banner needed
  return null
}
