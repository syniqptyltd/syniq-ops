"use client"

import { useState } from "react"

interface PricingToggleProps {
  onBillingChange: (isYearly: boolean) => void
}

export function PricingToggle({ onBillingChange }: PricingToggleProps) {
  const [isYearly, setIsYearly] = useState(false)

  const handleToggle = (yearly: boolean) => {
    setIsYearly(yearly)
    onBillingChange(yearly)
  }

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background p-1">
      <button
        onClick={() => handleToggle(false)}
        className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
          !isYearly
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => handleToggle(true)}
        className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
          isYearly
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Yearly <span className="ml-1 text-xs text-primary">({isYearly ? "Active" : "Save 17%"})</span>
      </button>
    </div>
  )
}
