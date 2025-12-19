"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Crown, Calendar, CreditCard, AlertCircle } from "lucide-react"
import Link from "next/link"
import { cancelSubscription } from "@/lib/paystack/actions"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface SubscriptionData {
  hasAccess: boolean
  subscription: any | null
  purchase: any | null
}

export default function SubscriptionPage() {
  const [data, setData] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [canceling, setCanceling] = useState(false)

  useEffect(() => {
    loadSubscriptionData()
  }, [])

  const loadSubscriptionData = async () => {
    try {
      const response = await fetch("/api/subscription/status")
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error("Error loading subscription:", error)
      toast.error("Failed to load subscription details")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    setCanceling(true)
    try {
      const result = await cancelSubscription()
      if ("error" in result) {
        toast.error(result.error)
      } else {
        toast.success(result.message)
        loadSubscriptionData() // Reload data
      }
    } catch (error) {
      toast.error("Failed to cancel subscription")
    } finally {
      setCanceling(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
        <p className="text-muted-foreground">Manage your subscription and billing</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>Your active subscription or purchase details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!data?.hasAccess && (
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Free Plan</p>
                <p className="text-sm text-muted-foreground">Limited features and access</p>
              </div>
              <Button asChild>
                <Link href="/pricing">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade Now
                </Link>
              </Button>
            </div>
          )}

          {data?.subscription && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium capitalize">{data.subscription.plan_id} Plan</p>
                    <Badge variant={data.subscription.status === "active" ? "default" : "secondary"}>
                      {data.subscription.status}
                    </Badge>
                    {data.subscription.cancel_at_period_end && (
                      <Badge variant="destructive">Canceling</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">
                    {data.subscription.billing_cycle} billing
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    R{data.subscription.billing_cycle === "monthly" ? "599" : "5,970"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    per {data.subscription.billing_cycle === "monthly" ? "month" : "year"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {data.subscription.cancel_at_period_end ? "Expires" : "Renews"} on{" "}
                  {new Date(data.subscription.current_period_end).toLocaleDateString()}
                </span>
              </div>

              {!data.subscription.cancel_at_period_end && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Cancel Subscription
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Your subscription will remain active until{" "}
                        {new Date(data.subscription.current_period_end).toLocaleDateString()}. After that,
                        you'll lose access to premium features.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleCancelSubscription}
                        disabled={canceling}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {canceling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Cancel Subscription
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {data.subscription.cancel_at_period_end && (
                <div className="flex items-center gap-2 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <p className="text-sm text-orange-900">
                    Your subscription will end on{" "}
                    {new Date(data.subscription.current_period_end).toLocaleDateString()}.
                  </p>
                </div>
              )}
            </div>
          )}

          {data?.purchase && !data?.subscription && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium capitalize">
                      {data.purchase.product_type === "lifetime" ? "Lifetime Access" : "Annual Prepaid"}
                    </p>
                    <Badge>Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {data.purchase.product_type === "lifetime"
                      ? "Never expires"
                      : "One-time payment"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    R{data.purchase.product_type === "lifetime" ? "12,999" : "4,478"}
                  </p>
                  <p className="text-sm text-muted-foreground">One-time</p>
                </div>
              </div>

              {data.purchase.expires_at && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Expires on {new Date(data.purchase.expires_at).toLocaleDateString()}</span>
                </div>
              )}

              {!data.purchase.expires_at && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Crown className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-900">You have lifetime access!</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>View your payment history and invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Payment history will be displayed here. Contact support for invoice requests.
          </p>
        </CardContent>
      </Card>

      {/* Upgrade Options */}
      {data?.hasAccess && (
        <Card>
          <CardHeader>
            <CardTitle>Upgrade or Change Plan</CardTitle>
            <CardDescription>Explore other plans and pricing options</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/pricing">View All Plans</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
