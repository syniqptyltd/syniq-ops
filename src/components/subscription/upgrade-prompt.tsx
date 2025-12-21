"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Crown, Lock } from "lucide-react"
import Link from "next/link"

interface UpgradePromptProps {
  feature: string
  requiredPlan?: "Professional" | "Enterprise"
  variant?: "inline" | "banner" | "card"
  className?: string
}

export function UpgradePrompt({
  feature,
  requiredPlan = "Professional",
  variant = "inline",
  className = ""
}: UpgradePromptProps) {
  if (variant === "banner") {
    return (
      <Alert className={`border-orange-200 bg-orange-50 ${className}`}>
        <Crown className="h-4 w-4 text-orange-600" />
        <AlertDescription className="ml-2 flex items-center justify-between">
          <span className="text-orange-900">
            {feature} is available on the {requiredPlan} plan. Upgrade to unlock this feature.
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

  if (variant === "card") {
    return (
      <div className={`flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-lg bg-muted/30 ${className}`}>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{feature}</h3>
        <p className="text-sm text-muted-foreground text-center mb-4 max-w-sm">
          This feature is available on the {requiredPlan} plan. Upgrade to unlock advanced capabilities.
        </p>
        <Button asChild>
          <Link href="/pricing">
            <Crown className="mr-2 h-4 w-4" />
            Upgrade to {requiredPlan}
          </Link>
        </Button>
      </div>
    )
  }

  // inline variant
  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      <Lock className="h-4 w-4" />
      <span>
        Requires {requiredPlan} plan.{" "}
        <Link href="/pricing" className="text-primary hover:underline font-medium">
          Upgrade
        </Link>
      </span>
    </div>
  )
}
