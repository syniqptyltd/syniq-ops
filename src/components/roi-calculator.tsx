'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp, Clock, DollarSign, Zap } from "lucide-react"

export function ROICalculator() {
  // User inputs
  const [employees, setEmployees] = useState(5)
  const [invoicesPerMonth, setInvoicesPerMonth] = useState(40)
  const [avgInvoiceValue, setAvgInvoiceValue] = useState(3500)
  const [expensesPerMonth, setExpensesPerMonth] = useState(15000)

  // Calculations
  const [savings, setSavings] = useState({
    adminTimeSaved: 0,
    adminCostSaved: 0,
    vatRecovered: 0,
    fasterPayments: 0,
    accountantSavings: 0,
    totalMonthlySavings: 0,
    totalAnnualSavings: 0,
    syniqCost: 199,
    netMonthlySavings: 0,
    netAnnualSavings: 0,
    roi: 0,
    paybackDays: 0
  })

  useEffect(() => {
    // Admin time calculations
    const manualTimePerInvoice = 15 // minutes
    const syniqTimePerInvoice = 2 // minutes
    const timeSavedPerInvoice = manualTimePerInvoice - syniqTimePerInvoice
    const totalTimeSavedHours = (timeSavedPerInvoice * invoicesPerMonth) / 60
    const hourlyRate = 300 // Average admin hourly rate in ZA
    const adminCostSaved = totalTimeSavedHours * hourlyRate

    // VAT recovery (assume 15% VAT and 70% of expenses have claimable VAT)
    const vatableExpenses = expensesPerMonth * 0.7
    const vatRecoverable = vatableExpenses * 0.15
    const currentVATClaimed = vatRecoverable * 0.70 // Assume 70% recovery rate without system
    const improvedVATClaimed = vatRecoverable * 0.95 // 95% with proper tracking
    const vatRecovered = improvedVATClaimed - currentVATClaimed

    // Faster payments (reduce payment time from 45 to 28 days = 17 days faster)
    const monthlyRevenue = invoicesPerMonth * avgInvoiceValue
    const daysImprovement = 17
    const cashFlowImprovement = (monthlyRevenue * daysImprovement) / 365
    const opportunityCost = cashFlowImprovement * 0.10 // 10% annual opportunity cost
    const fasterPayments = opportunityCost

    // Accountant savings (basic bookkeeping R4,500/quarter = R1,500/month)
    const accountantSavings = employees >= 5 ? 1500 : employees >= 3 ? 1000 : 500

    // Totals
    const totalMonthlySavings = adminCostSaved + vatRecovered + fasterPayments + accountantSavings
    const totalAnnualSavings = totalMonthlySavings * 12
    const syniqCost = 199 // per month
    const netMonthlySavings = totalMonthlySavings - syniqCost
    const netAnnualSavings = netMonthlySavings * 12
    const roi = ((netMonthlySavings / syniqCost) * 100)
    const paybackDays = (syniqCost / (totalMonthlySavings / 30))

    setSavings({
      adminTimeSaved: Math.round(totalTimeSavedHours * 10) / 10,
      adminCostSaved: Math.round(adminCostSaved),
      vatRecovered: Math.round(vatRecovered),
      fasterPayments: Math.round(fasterPayments),
      accountantSavings,
      totalMonthlySavings: Math.round(totalMonthlySavings),
      totalAnnualSavings: Math.round(totalAnnualSavings),
      syniqCost,
      netMonthlySavings: Math.round(netMonthlySavings),
      netAnnualSavings: Math.round(netAnnualSavings),
      roi: Math.round(roi),
      paybackDays: Math.round(paybackDays)
    })
  }, [employees, invoicesPerMonth, avgInvoiceValue, expensesPerMonth])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-muted/50 via-background to-accent/10 py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-primary opacity-5 blur-[120px]" />
        <div className="absolute left-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-secondary opacity-5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Calculator className="h-4 w-4" />
            ROI Calculator
          </div>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Calculate your savings
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            See exactly how much time and money Syniq Ops will save your business
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input controls */}
          <Card className="border-2 border-border">
            <CardHeader className="border-b">
              <h3 className="text-xl font-bold text-foreground">Your Business Details</h3>
              <p className="text-sm text-muted-foreground">Adjust the sliders to match your business</p>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {/* Employees */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Number of Employees</Label>
                  <span className="text-2xl font-bold text-primary">{employees}</span>
                </div>
                <Slider
                  value={[employees]}
                  onValueChange={(value) => setEmployees(value[0])}
                  min={1}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Solo entrepreneur to small team</p>
              </div>

              {/* Invoices per month */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Invoices Per Month</Label>
                  <span className="text-2xl font-bold text-primary">{invoicesPerMonth}</span>
                </div>
                <Slider
                  value={[invoicesPerMonth]}
                  onValueChange={(value) => setInvoicesPerMonth(value[0])}
                  min={5}
                  max={200}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">How many invoices do you send monthly?</p>
              </div>

              {/* Average invoice value */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Average Invoice Value</Label>
                  <span className="text-2xl font-bold text-primary">R{avgInvoiceValue.toLocaleString()}</span>
                </div>
                <Slider
                  value={[avgInvoiceValue]}
                  onValueChange={(value) => setAvgInvoiceValue(value[0])}
                  min={500}
                  max={20000}
                  step={500}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Typical invoice amount</p>
              </div>

              {/* Monthly expenses */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Monthly Business Expenses</Label>
                  <span className="text-2xl font-bold text-primary">R{expensesPerMonth.toLocaleString()}</span>
                </div>
                <Slider
                  value={[expensesPerMonth]}
                  onValueChange={(value) => setExpensesPerMonth(value[0])}
                  min={5000}
                  max={100000}
                  step={5000}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Materials, tools, subcontractors, etc.</p>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* Savings breakdown */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader className="border-b">
                <h3 className="text-xl font-bold text-foreground">Your Monthly Savings</h3>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-card border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Admin Time Saved</p>
                      <p className="text-xs text-muted-foreground">{savings.adminTimeSaved} hrs/month</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-green-600">R{savings.adminCostSaved.toLocaleString()}</p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-card border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">VAT Recovered</p>
                      <p className="text-xs text-muted-foreground">Improved claim accuracy</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-blue-600">R{savings.vatRecovered.toLocaleString()}</p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-card border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Faster Payments</p>
                      <p className="text-xs text-muted-foreground">Cash flow improvement</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-purple-600">R{savings.fasterPayments.toLocaleString()}</p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-card border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                      <Calculator className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Accountant Savings</p>
                      <p className="text-xs text-muted-foreground">Basic bookkeeping</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-orange-600">R{savings.accountantSavings.toLocaleString()}</p>
                </div>

                <div className="border-t-2 border-dashed pt-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-base font-semibold text-foreground">Total Monthly Savings</p>
                    <p className="text-2xl font-bold text-foreground">R{savings.totalMonthlySavings.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <p>Less: Syniq Ops subscription</p>
                    <p>-R{savings.syniqCost}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Net savings */}
            <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-600/10">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Net Monthly Savings</h3>
                <p className="text-5xl font-bold text-green-600 mb-6">R{savings.netMonthlySavings.toLocaleString()}</p>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                  <div>
                    <p className="text-2xl font-bold text-foreground">R{savings.netAnnualSavings.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">Annual Savings</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{savings.roi}%</p>
                    <p className="text-xs text-muted-foreground mt-1">Monthly ROI</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{savings.paybackDays}</p>
                    <p className="text-xs text-muted-foreground mt-1">Days to payback</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="border-2 border-primary bg-gradient-to-r from-primary to-secondary text-white">
              <CardContent className="p-6 text-center">
                <p className="text-lg font-semibold mb-4">
                  Start saving R{savings.netMonthlySavings.toLocaleString()}/month today
                </p>
                <a
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-primary font-bold text-lg hover:bg-white/90 transition-colors shadow-xl"
                >
                  Start 7-Day Free Trial
                </a>
                <p className="text-sm text-white/80 mt-4">No credit card required</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Assumptions note */}
        <Card className="mt-12 border border-muted">
          <CardContent className="p-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">Calculation Assumptions:</h4>
            <ul className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
              <li>• Admin time: Manual invoicing takes 15 min vs 2 min with Syniq Ops</li>
              <li>• Admin hourly rate: R300 (South African average)</li>
              <li>• VAT recovery: 70% of expenses are VATable, improving claims from 70% to 95%</li>
              <li>• Payment time: Professional invoices reduce payment time from 45 to 28 days</li>
              <li>• Opportunity cost: 10% annual return on improved cash flow</li>
              <li>• Accountant savings: R500-R1,500/month based on business size</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
