"use client"

import { useEffect, useState } from "react"
import { getPlanPermissions, type PlanId, type SubscriptionPermissions } from "@/lib/subscription/permissions"

interface SubscriptionStatus {
  hasAccess: boolean
  subscription: {
    plan_id: string
    status: string
    billing_cycle?: string
    current_period_end: string
    cancel_at_period_end?: boolean
  } | null
  purchase: {
    product_type: string
    expires_at?: string
  } | null
}

export function useSubscription() {
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<SubscriptionStatus | null>(null)
  const [permissions, setPermissions] = useState<SubscriptionPermissions>(getPlanPermissions(null))

  useEffect(() => {
    loadSubscription()
  }, [])

  const loadSubscription = async () => {
    try {
      const response = await fetch("/api/subscription/status")
      if (response.ok) {
        const data = await response.json()
        console.log("Subscription status loaded:", data)
        setStatus(data)

        // Determine plan ID from subscription or purchase
        let planId: PlanId = null
        if (data.subscription) {
          planId = data.subscription.plan_id as PlanId
          console.log("User has subscription, plan:", planId)
        } else if (data.purchase) {
          // Purchases (annual prepaid & lifetime) are always Professional plan
          planId = "professional"
          console.log("User has purchase (lifetime/annual), treating as Professional plan")
        } else {
          console.log("No subscription or purchase found")
        }

        const permissions = getPlanPermissions(planId)
        console.log("Setting permissions for plan", planId, ":", permissions)
        setPermissions(permissions)
      }
    } catch (error) {
      console.error("Error loading subscription:", error)
    } finally {
      setLoading(false)
    }
  }

  const planId: PlanId = status?.subscription?.plan_id as PlanId || (status?.purchase ? "professional" : null)

  return {
    loading,
    status,
    permissions,
    planId,
    hasAccess: status?.hasAccess || false,
    isTrialing: status?.subscription?.status === "trialing",
    refresh: loadSubscription,
  }
}
