/**
 * Subscription-based permissions and feature access control
 */

export type PlanId = "starter" | "professional" | "enterprise" | null

export interface SubscriptionPermissions {
  // Client limits
  maxClients: number | null // null = unlimited

  // Feature access
  hasJobLineItems: boolean
  hasAdvancedExpenseTracking: boolean
  hasProfitLossStatements: boolean
  hasBusinessAnalytics: boolean
  hasCustomBranding: boolean
  hasMultiUserAccounts: boolean
  hasAdvancedPermissions: boolean
  hasApiAccess: boolean
  hasCustomIntegrations: boolean

  // Support level
  supportLevel: "email" | "priority" | "dedicated"
}

/**
 * Get permissions for a given plan
 */
export function getPlanPermissions(planId: PlanId): SubscriptionPermissions {
  switch (planId) {
    case "starter":
      return {
        maxClients: 50,
        hasJobLineItems: false,
        hasAdvancedExpenseTracking: false,
        hasProfitLossStatements: false,
        hasBusinessAnalytics: false,
        hasCustomBranding: false,
        hasMultiUserAccounts: false,
        hasAdvancedPermissions: false,
        hasApiAccess: false,
        hasCustomIntegrations: false,
        supportLevel: "email",
      }

    case "professional":
      return {
        maxClients: null, // unlimited
        hasJobLineItems: true,
        hasAdvancedExpenseTracking: true,
        hasProfitLossStatements: true,
        hasBusinessAnalytics: true,
        hasCustomBranding: true,
        hasMultiUserAccounts: false,
        hasAdvancedPermissions: false,
        hasApiAccess: false,
        hasCustomIntegrations: false,
        supportLevel: "priority",
      }

    case "enterprise":
      return {
        maxClients: null, // unlimited
        hasJobLineItems: true,
        hasAdvancedExpenseTracking: true,
        hasProfitLossStatements: true,
        hasBusinessAnalytics: true,
        hasCustomBranding: true,
        hasMultiUserAccounts: true,
        hasAdvancedPermissions: true,
        hasApiAccess: true,
        hasCustomIntegrations: true,
        supportLevel: "dedicated",
      }

    default:
      // No active subscription - trial expired or never started
      return {
        maxClients: 0,
        hasJobLineItems: false,
        hasAdvancedExpenseTracking: false,
        hasProfitLossStatements: false,
        hasBusinessAnalytics: false,
        hasCustomBranding: false,
        hasMultiUserAccounts: false,
        hasAdvancedPermissions: false,
        hasApiAccess: false,
        hasCustomIntegrations: false,
        supportLevel: "email",
      }
  }
}

/**
 * Check if user can access a specific feature
 */
export function canAccessFeature(
  planId: PlanId,
  feature: keyof Omit<SubscriptionPermissions, "maxClients" | "supportLevel">
): boolean {
  const permissions = getPlanPermissions(planId)
  return permissions[feature]
}

/**
 * Get the minimum plan required for a feature
 */
export function getMinimumPlanForFeature(
  feature: keyof Omit<SubscriptionPermissions, "maxClients" | "supportLevel">
): PlanId {
  if (getPlanPermissions("starter")[feature]) return "starter"
  if (getPlanPermissions("professional")[feature]) return "professional"
  if (getPlanPermissions("enterprise")[feature]) return "enterprise"
  return null
}

/**
 * Format plan name for display
 */
export function formatPlanName(planId: PlanId): string {
  if (!planId) return "No Plan"
  return planId.charAt(0).toUpperCase() + planId.slice(1)
}
