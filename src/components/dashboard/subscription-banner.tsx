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
        console.log("Subscription banner - status data:", data)
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

  console.log("Subscription banner - rendering with status:", status)
  console.log("Has purchase?", !!status?.purchase)
  console.log("Has subscription?", !!status?.subscription)

  // Has active purchase (lifetime or annual) - CHECK THIS FIRST
  if (status?.purchase) {
    console.log("Rendering purchase section, purchase:", status.purchase)
    const purchase = status.purchase

    // Show warning for annual prepaid that's expiring soon
    if (purchase.expires_at) {
      const expiryDate = new Date(purchase.expires_at)
      const daysRemaining = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

      if (daysRemaining <= 30) {
        return (
          <Alert className="mb-6 border-2 border-secondary/30 bg-gradient-to-r from-accent/50 to-secondary/10 shadow-md">
            <AlertCircle className="h-5 w-5 text-secondary" />
            <AlertDescription className="ml-2 flex items-center justify-between">
              <span className="font-medium text-foreground">
                ⏰ Your annual access expires in <strong className="text-secondary">{daysRemaining} days</strong> on {expiryDate.toLocaleDateString()}.
              </span>
              <Button asChild size="sm" className="ml-4 bg-gradient-to-r from-secondary to-secondary/80 shadow-md hover:shadow-lg">
                <Link href="/pricing">Renew Access</Link>
              </Button>
            </AlertDescription>
          </Alert>
        )
      }
    }
    // Lifetime purchase - no banner needed
    return null
  }

  // Has active subscription (including trial)
  if (status?.subscription) {
    const sub = status.subscription
    const periodEnd = new Date(sub.current_period_end)
    const daysRemaining = Math.ceil((periodEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    const isTrialing = sub.status === "trialing"

    // Show banner for trial users
    if (isTrialing) {
      return (
        <Alert className={`mb-6 border-2 ${daysRemaining <= 2 ? "border-destructive/40 bg-gradient-to-r from-destructive/10 to-secondary/10" : "border-primary/40 bg-gradient-to-r from-primary/10 to-accent/30"} shadow-lg`}>
          <AlertCircle className={`h-5 w-5 ${daysRemaining <= 2 ? "text-destructive" : "text-primary"}`} />
          <AlertDescription className="ml-2 flex items-center justify-between">
            <span className={`font-medium ${daysRemaining <= 2 ? "text-destructive-foreground" : "text-foreground"}`}>
              {daysRemaining <= 0
                ? "⚠️ Your free trial has expired. Subscribe now to continue using Syniq Ops."
                : daysRemaining === 1
                ? "🎯 Your free trial ends tomorrow. Subscribe now to keep all features."
                : `✨ You have ${daysRemaining} days left in your free trial.`
              }
            </span>
            <Button asChild size="sm" className="ml-4 bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-lg font-semibold">
              <Link href="/pricing">
                <Crown className="mr-2 h-4 w-4" />
                Subscribe Now
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )
    }

    // Show warning if subscription ends soon or is canceled
    if (sub.cancel_at_period_end || daysRemaining <= 7) {
      return (
        <Alert className="mb-6 border-2 border-secondary/30 bg-gradient-to-r from-accent/40 to-secondary/5 shadow-md">
          <AlertCircle className="h-5 w-5 text-secondary" />
          <AlertDescription className="ml-2 flex items-center justify-between">
            <span className="font-medium text-foreground">
              {sub.cancel_at_period_end
                ? `⚠️ Your subscription ends on ${periodEnd.toLocaleDateString()}. Renew to keep access.`
                : `🔄 Your subscription renews in ${daysRemaining} days.`
              }
            </span>
            <Button asChild size="sm" variant="outline" className="ml-4 border-2 border-primary/30 hover:bg-primary/10">
              <Link href="/dashboard/subscription">Manage Subscription</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )
    }
    // Active subscription, all good
    return null
  }

  // No subscription or purchase - trial expired or never started
  if (!status?.hasAccess) {
    return (
      <Alert className="mb-6 border-2 border-destructive/50 bg-gradient-to-r from-destructive/15 to-secondary/10 shadow-lg">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <AlertDescription className="ml-2 flex items-center justify-between">
          <span className="font-semibold text-foreground">
            ⚠️ Your trial has expired. Subscribe now to regain access to all features.
          </span>
          <Button asChild size="sm" className="ml-4 bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-lg font-semibold">
            <Link href="/pricing">
              <Crown className="mr-2 h-4 w-4" />
              Subscribe Now
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  // All good, no banner needed
  return null
}
