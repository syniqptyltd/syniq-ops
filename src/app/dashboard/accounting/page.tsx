"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStats } from "@/lib/supabase/actions"
import { TrendingUp, TrendingDown, DollarSign, Receipt, Wallet, Loader2 } from "lucide-react"
import { getAccountingData } from "@/lib/supabase/accounting"
import { useSubscription } from "@/hooks/use-subscription"
import { UpgradePrompt } from "@/components/subscription/upgrade-prompt"

export default function AccountingPage() {
  const { permissions, loading: subscriptionLoading } = useSubscription()
  const [stats, setStats] = useState<any>(null)
  const [accountingData, setAccountingData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const [statsData, accData] = await Promise.all([getDashboardStats(), getAccountingData()])
    setStats(statsData)
    setAccountingData(accData)
    setLoading(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  if (loading || subscriptionLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!permissions.hasProfitLossStatements) {
    return (
      <div className="space-y-6 pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Accounting
          </h1>
          <p className="text-sm text-muted-foreground mt-2">Financial overview and profit/loss summary</p>
        </div>
        <UpgradePrompt
          feature="Profit & Loss Statements"
          requiredPlan="Professional"
          variant="card"
        />
      </div>
    )
  }

  const netProfit = accountingData.totalRevenue - accountingData.totalExpenses
  const profitMargin =
    accountingData.totalRevenue > 0 ? (netProfit / accountingData.totalRevenue) * 100 : 0

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          Accounting
        </h1>
        <p className="text-sm text-muted-foreground mt-2">Financial overview and profit/loss summary</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-card to-muted/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-3xl font-bold tracking-tight text-emerald-600">
                {formatCurrency(accountingData.totalRevenue)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {accountingData.paidInvoiceCount} paid invoices
              </p>
            </div>
          </CardContent>
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-emerald-500/10 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
        </Card>

        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-card to-muted/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-gradient-to-br from-red-500/20 to-red-500/10">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
              <p className="text-3xl font-bold tracking-tight text-red-600">
                {formatCurrency(accountingData.totalExpenses)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{accountingData.expenseCount} expenses</p>
            </div>
          </CardContent>
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-red-500/10 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
        </Card>

        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-card to-muted/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-gradient-to-br from-primary/20 to-primary/10">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Net Profit</p>
              <p className={`text-3xl font-bold tracking-tight ${netProfit >= 0 ? "text-primary" : "text-destructive"}`}>
                {formatCurrency(netProfit)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {profitMargin.toFixed(1)}% profit margin
              </p>
            </div>
          </CardContent>
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-primary/10 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
        </Card>

        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-card to-muted/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-gradient-to-br from-amber-500/20 to-amber-500/10">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Outstanding</p>
              <p className="text-3xl font-bold tracking-tight text-amber-600">
                {formatCurrency(stats.outstandingAmount)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stats.outstandingInvoices} unpaid invoices</p>
            </div>
          </CardContent>
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-amber-500/10 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
        </Card>
      </div>

      {/* Profit & Loss Statement */}
      <Card className="relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <CardHeader className="border-b border-border/40">
          <CardTitle className="text-xl font-bold">Profit & Loss Statement</CardTitle>
          <CardDescription>Summary of income and expenses</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Revenue Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-green-600">Revenue</span>
                <span className="text-green-600">{formatCurrency(accountingData.totalRevenue)}</span>
              </div>
              <div className="pl-4 space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Paid Invoices</span>
                  <span>{formatCurrency(accountingData.totalRevenue)}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-red-600">Expenses</span>
                <span className="text-red-600">{formatCurrency(accountingData.totalExpenses)}</span>
              </div>
              {accountingData.expensesByCategory.length > 0 ? (
                <div className="pl-4 space-y-1 text-sm">
                  {accountingData.expensesByCategory.map((cat: any) => (
                    <div key={cat.category} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{cat.category}</span>
                      <span>{formatCurrency(cat.total)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pl-4 text-sm text-muted-foreground">No expenses recorded</div>
              )}
            </div>

            <div className="border-t-2 border-border pt-4">
              <div className="flex items-center justify-between font-bold text-lg">
                <span>Net Profit/Loss</span>
                <span className={netProfit >= 0 ? "text-green-600" : "text-red-600"}>
                  {formatCurrency(netProfit)}
                </span>
              </div>
              {netProfit < 0 && (
                <p className="text-sm text-destructive mt-2">Your expenses exceed your revenue</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <CardHeader className="border-b border-border/40">
            <CardTitle className="text-xl font-bold">Current Month</CardTitle>
            <CardDescription>This month's financial summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Revenue</span>
              <span className="font-semibold text-green-600">{formatCurrency(stats.monthlyRevenue)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Expenses</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(stats.monthlyExpenses || 0)}
              </span>
            </div>
            <div className="border-t pt-2 flex items-center justify-between font-semibold">
              <span>Net Profit</span>
              <span
                className={
                  stats.monthlyRevenue - (stats.monthlyExpenses || 0) >= 0
                    ? "text-primary"
                    : "text-destructive"
                }
              >
                {formatCurrency(stats.monthlyRevenue - (stats.monthlyExpenses || 0))}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <CardHeader className="border-b border-border/40">
            <CardTitle className="text-xl font-bold">VAT Summary</CardTitle>
            <CardDescription>VAT claimable from expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total VAT Claimable</span>
              <span className="font-semibold">{formatCurrency(accountingData.totalVatClaimable)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Claimable Expenses</span>
              <span>{accountingData.vatClaimableCount} expenses</span>
            </div>
            {accountingData.totalVatClaimable > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                You can potentially claim back {formatCurrency(accountingData.totalVatClaimable)} in VAT
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card className="relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <CardHeader className="border-b border-border/40">
          <CardTitle className="text-xl font-bold">Business Health Indicators</CardTitle>
          <CardDescription>Key metrics for business performance</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Average Invoice Value</p>
              <p className="text-2xl font-bold">
                {accountingData.paidInvoiceCount > 0
                  ? formatCurrency(accountingData.totalRevenue / accountingData.paidInvoiceCount)
                  : formatCurrency(0)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Average Expense</p>
              <p className="text-2xl font-bold">
                {accountingData.expenseCount > 0
                  ? formatCurrency(accountingData.totalExpenses / accountingData.expenseCount)
                  : formatCurrency(0)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Expense Ratio</p>
              <p className="text-2xl font-bold">
                {accountingData.totalRevenue > 0
                  ? `${((accountingData.totalExpenses / accountingData.totalRevenue) * 100).toFixed(1)}%`
                  : "0%"}
              </p>
              <p className="text-xs text-muted-foreground">Of revenue spent on expenses</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
