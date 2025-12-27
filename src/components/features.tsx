'use client'

import { useState } from "react"
import { Users, Briefcase, FileText, Receipt, Calculator, TrendingUp, Sparkles, Clock, DollarSign, CheckCircle2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Users,
    title: "Client Management Software",
    description:
      "Keep all your client information organized with billing details, VAT numbers, and complete contact history in one central location.",
    useCase: {
      scenario: "HVAC Contractor with 120+ Active Clients",
      workflow: [
        "Store client details once: name, address, VAT number, billing contact",
        "Access full job history in seconds when client calls",
        "Track payment patterns to identify reliable vs slow payers",
        "Generate repeat invoices without re-entering information"
      ],
      benefits: {
        timeSaved: "Save 2-3 hours per week on admin",
        costReduction: "Reduce data entry errors by 95%",
        roi: "Stop losing invoices to incorrect VAT numbers"
      }
    }
  },
  {
    icon: Briefcase,
    title: "Job Line Items & Project Tracking",
    description:
      "Create detailed job breakdowns with separate line items for labor, materials, and services. Give clients complete transparency.",
    useCase: {
      scenario: "Electrical Installation Project",
      workflow: [
        "Line 1: Labour - 8 hours @ R450/hour = R3,600",
        "Line 2: Materials - DB board, cables, breakers = R2,100",
        "Line 3: COC Certificate fee = R850",
        "Auto-calculate VAT on each line item separately"
      ],
      benefits: {
        timeSaved: "Create detailed quotes in under 5 minutes",
        costReduction: "Eliminate pricing disputes with transparent breakdowns",
        roi: "Clients approve quotes 40% faster with clear itemization"
      }
    }
  },
  {
    icon: FileText,
    title: "VAT-Compliant Invoicing",
    description:
      "Generate VAT-compliant invoices with detailed cost breakdowns. Track payments, manage outstanding balances, and get paid faster with professional invoicing.",
    useCase: {
      scenario: "Monthly Invoicing for Service Business",
      workflow: [
        "Generate invoice from completed job with one click",
        "Invoice includes your logo, VAT number, banking details",
        "Automatically formatted per SARS requirements",
        "Download PDF and email directly to client",
        "Track payment status: Outstanding → Paid"
      ],
      benefits: {
        timeSaved: "Create 20 invoices in the time it took to do 3 manually",
        costReduction: "No more accountant fees for basic invoicing",
        roi: "Get paid 7-10 days faster with professional invoices"
      }
    }
  },
  {
    icon: Receipt,
    title: "Expense Tracking & VAT Claims",
    description:
      "Track all business expenses by category with VAT claimable amounts. Perfect for service businesses with materials and subcontractors.",
    useCase: {
      scenario: "Plumber Claiming VAT Back on Materials",
      workflow: [
        "Record expense: Builders Warehouse - R1,725 (inc. VAT)",
        "System auto-calculates VAT portion: R225",
        "Categorize: Materials / Tools / Fuel / Subcontractors",
        "Run monthly VAT report for your accountant",
        "Export to Excel for SARS submissions"
      ],
      benefits: {
        timeSaved: "30 minutes per month vs manual spreadsheets",
        costReduction: "Claim every rand of VAT back - average R2,500/month",
        roi: "Never miss a VAT claim again = R30,000+ per year recovered"
      }
    }
  },
  {
    icon: Calculator,
    title: "Financial Accounting",
    description:
      "Built-in profit & loss statements, expense categorization, and financial health indicators to keep your business profitable.",
    useCase: {
      scenario: "Quarterly Business Performance Review",
      workflow: [
        "View total revenue vs expenses at a glance",
        "See profit margin per job type (maintenance vs installations)",
        "Identify your most profitable service categories",
        "Spot expense trends before they become problems",
        "Share P&L with your accountant in one click"
      ],
      benefits: {
        timeSaved: "Instant reports vs 2-3 days waiting for accountant",
        costReduction: "Reduce accountant fees by R1,500-R3,000 per quarter",
        roi: "Make data-driven decisions to boost profit margins by 15-25%"
      }
    }
  },
  {
    icon: TrendingUp,
    title: "Business Analytics",
    description:
      "Visual charts and insights showing revenue trends, expense patterns, and monthly performance to help you make informed decisions.",
    useCase: {
      scenario: "Growing a Maintenance Business",
      workflow: [
        "Compare revenue month-over-month with visual charts",
        "Identify seasonal trends (e.g., aircon spike in summer)",
        "Track average job value and client lifetime value",
        "Monitor expense ratios (materials vs labor vs overhead)",
        "Set targets and track progress toward goals"
      ],
      benefits: {
        timeSaved: "See business health in 30 seconds vs hours in Excel",
        costReduction: "Optimize resource allocation based on real data",
        roi: "Businesses using analytics grow 2x faster on average"
      }
    }
  },
]

export function Features() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)

  const gradients = [
    "from-primary/10 to-primary/5",
    "from-secondary/10 to-secondary/5",
    "from-primary/10 via-secondary/5 to-primary/5",
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-muted/50 via-background to-accent/10 py-24 sm:py-32">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary opacity-5 blur-[120px]" />
        <div className="absolute left-0 bottom-1/4 h-[500px] w-[500px] rounded-full bg-secondary opacity-5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            Powerful Features
          </div>
          <h2 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-balance text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Small Business Operations Platform Features
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Powerful features designed specifically for South African service businesses. See exactly how client management software, VAT-compliant invoicing, and expense tracking save you time and money.
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const gradient = gradients[index % gradients.length]
            const colors = index % 2 === 0
              ? { icon: "from-primary to-primary/80", ring: "ring-primary/10" }
              : { icon: "from-secondary to-secondary/80", ring: "ring-secondary/10" }
            const isExpanded = expandedFeature === index

            return (
              <Card
                key={feature.title}
                className={`group relative overflow-hidden border-2 border-border bg-card transition-all duration-300 ${
                  isExpanded ? "lg:col-span-2 border-primary/40 shadow-2xl shadow-primary/20" : "hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                } ${feature.title === "Professional Invoicing" && !isExpanded ? "ring-2 ring-primary/20" : ""}`}
              >
                {/* Gradient accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${colors.icon}`} />

                <CardContent className="p-8">
                  {/* Icon with gradient background */}
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.icon} text-white shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/30`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-card-foreground">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{feature.description}</p>

                  {!isExpanded && (
                    <button
                      onClick={() => setExpandedFeature(index)}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      See real example <ArrowRight className="h-4 w-4" />
                    </button>
                  )}

                  {isExpanded && (
                    <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                      {/* Use Case Scenario */}
                      <div className="rounded-lg bg-primary/5 p-4 border border-primary/10">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <Briefcase className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">Real Example</p>
                            <p className="mt-1 text-sm text-muted-foreground">{feature.useCase.scenario}</p>
                          </div>
                        </div>
                      </div>

                      {/* Workflow Steps */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="h-5 w-5 text-secondary" />
                          <p className="text-sm font-semibold text-foreground">How It Works</p>
                        </div>
                        <ol className="space-y-2">
                          {feature.useCase.workflow.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10 text-xs font-semibold text-secondary">
                                {stepIndex + 1}
                              </span>
                              <span className="pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* ROI Benefits */}
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-lg bg-green-500/10 p-3 border border-green-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-green-600" />
                            <p className="text-xs font-semibold text-green-600">Time Saved</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{feature.useCase.benefits.timeSaved}</p>
                        </div>
                        <div className="rounded-lg bg-blue-500/10 p-3 border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="h-4 w-4 text-blue-600" />
                            <p className="text-xs font-semibold text-blue-600">Cost Reduction</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{feature.useCase.benefits.costReduction}</p>
                        </div>
                        <div className="rounded-lg bg-purple-500/10 p-3 border border-purple-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-purple-600" />
                            <p className="text-xs font-semibold text-purple-600">ROI Impact</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{feature.useCase.benefits.roi}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedFeature(null)}
                        className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Show less
                      </button>
                    </div>
                  )}
                </CardContent>

                {/* Animated gradient overlay on hover */}
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                {/* Corner accent */}
                <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-primary opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" />
              </Card>
            )
          })}
        </div>

        {/* Total ROI Summary */}
        <div className="mt-16 mx-auto max-w-4xl">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
                  <DollarSign className="h-4 w-4" />
                  Combined ROI
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Average service business saves R50,000+ per year
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  By combining efficient invoicing, accurate VAT tracking, and data-driven decision making,
                  our customers report average annual savings of R50,000-R75,000 in reduced admin costs,
                  recovered VAT claims, and improved cash flow.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-primary">10hrs</p>
                    <p className="text-sm text-muted-foreground">Saved per week</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-secondary">R30k</p>
                    <p className="text-sm text-muted-foreground">VAT recovered/year</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">25%</p>
                    <p className="text-sm text-muted-foreground">Profit margin boost</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
