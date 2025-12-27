'use client'

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Quote, TrendingUp, Clock, DollarSign, CheckCircle2 } from "lucide-react"
import { useState } from "react"

const caseStudies = [
  {
    company: "Cape Town Electrical Services",
    industry: "Electrical Installation & Maintenance",
    size: "8 employees, 200+ active clients",
    location: "Cape Town, Western Cape",
    challenge: {
      title: "Drowning in paperwork and missing VAT claims",
      details: [
        "Spending 12+ hours per week on manual invoicing in Excel",
        "Losing track of expenses and missing R3,000-R5,000 in VAT claims monthly",
        "Average payment time of 45 days due to informal invoices",
        "No visibility into which job types were most profitable"
      ]
    },
    solution: {
      title: "Implemented Syniq Ops for end-to-end operations",
      details: [
        "Migrated all 200+ client records with VAT numbers to centralized system",
        "Created invoice templates with company branding and SARS-compliant formatting",
        "Set up expense tracking for materials, tools, and subcontractor costs",
        "Implemented job line items for transparent pricing on all quotes"
      ]
    },
    results: {
      metrics: [
        { label: "Admin time saved", value: "10 hrs/week", change: "-83%", icon: Clock, color: "text-green-600" },
        { label: "VAT recovered", value: "R42k/year", change: "+R3,500/month", icon: DollarSign, color: "text-blue-600" },
        { label: "Payment time", value: "28 days", change: "-38%", icon: TrendingUp, color: "text-purple-600" },
        { label: "Profit visibility", value: "Real-time", change: "100% visibility", icon: CheckCircle2, color: "text-green-600" }
      ],
      quote: "We recovered R42,000 in VAT in the first year just by tracking everything properly. The time savings alone pays for Syniq Ops 10 times over.",
      author: "Johan van der Merwe",
      role: "Owner, Cape Town Electrical Services"
    }
  },
  {
    company: "Pro Plumbing Johannesburg",
    industry: "Plumbing & Drainage Services",
    size: "4 employees, 150+ active clients",
    location: "Johannesburg, Gauteng",
    challenge: {
      title: "Cash flow problems and disorganized client records",
      details: [
        "No system for tracking which clients paid on time vs late payers",
        "Creating invoices manually took 2-3 hours per day",
        "Missing expense receipts meant losing VAT claims worth thousands",
        "Couldn't track profitability per job type (emergency vs scheduled maintenance)"
      ]
    },
    solution: {
      title: "Centralized operations on Syniq Ops platform",
      details: [
        "Imported all client data with payment history tracking",
        "Automated invoice generation from completed jobs",
        "Digital expense tracking with automatic VAT calculation",
        "P&L reports showing maintenance vs emergency call-out profitability"
      ]
    },
    results: {
      metrics: [
        { label: "Invoicing time", value: "15 min/day", change: "-88%", icon: Clock, color: "text-green-600" },
        { label: "Cash flow improved", value: "R35k", change: "avg. monthly", icon: DollarSign, color: "text-blue-600" },
        { label: "VAT claims", value: "R28k/year", change: "recovered", icon: TrendingUp, color: "text-purple-600" },
        { label: "Job profitability", value: "Tracked", change: "by category", icon: CheckCircle2, color: "text-green-600" }
      ],
      quote: "I can now see exactly which types of jobs make the most money. Emergency call-outs have 40% higher margins than I thought. This data changed how I run my business.",
      author: "Thabo Mokoena",
      role: "Managing Director, Pro Plumbing Johannesburg"
    }
  },
  {
    company: "Aircon Masters Durban",
    industry: "HVAC Installation & Service",
    size: "6 employees, 180+ active clients",
    location: "Durban, KwaZulu-Natal",
    challenge: {
      title: "Seasonal cash flow gaps and pricing inconsistency",
      details: [
        "Revenue dropped 60% in winter months with no advance planning",
        "Different technicians quoted different prices for same jobs",
        "Accountant fees of R4,500/quarter for basic bookkeeping",
        "No way to identify most profitable clients or services"
      ]
    },
    solution: {
      title: "Data-driven operations with Syniq Ops analytics",
      details: [
        "Historical data analysis revealed seasonal patterns for better planning",
        "Standardized pricing with job line item templates",
        "Built-in P&L reports eliminated need for bookkeeping service",
        "Client lifetime value tracking identified top 20% revenue generators"
      ]
    },
    results: {
      metrics: [
        { label: "Accountant savings", value: "R18k/year", change: "eliminated", icon: DollarSign, color: "text-green-600" },
        { label: "Price consistency", value: "100%", change: "standardized", icon: CheckCircle2, color: "text-blue-600" },
        { label: "Seasonal planning", value: "6 months", change: "forecasted", icon: TrendingUp, color: "text-purple-600" },
        { label: "Client insights", value: "Top 20%", change: "identified", icon: Clock, color: "text-green-600" }
      ],
      quote: "The analytics showed us that maintenance contracts are our most stable revenue. We've now shifted focus and smooth out those winter dips. Game changer.",
      author: "Priya Naidoo",
      role: "Operations Manager, Aircon Masters Durban"
    }
  }
]

export function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState(0)
  const currentCase = caseStudies[selectedCase]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-primary opacity-5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-secondary opacity-5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Quote className="h-4 w-4" />
            Customer Success Stories
          </div>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Real businesses, real results
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            South African service businesses saving time and money with Syniq Ops
          </p>
        </div>

        {/* Case study selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {caseStudies.map((study, index) => (
            <button
              key={index}
              onClick={() => setSelectedCase(index)}
              className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                selectedCase === index
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border-2 border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {study.company}
            </button>
          ))}
        </div>

        {/* Case study content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left column: Challenge & Solution */}
          <div className="space-y-6">
            {/* Company info */}
            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{currentCase.company}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Industry:</strong> {currentCase.industry}</p>
                  <p><strong className="text-foreground">Size:</strong> {currentCase.size}</p>
                  <p><strong className="text-foreground">Location:</strong> {currentCase.location}</p>
                </div>
              </CardContent>
            </Card>

            {/* Challenge */}
            <Card className="border-2 border-red-500/20 bg-red-500/5">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                    ⚠️
                  </span>
                  The Challenge
                </h4>
                <p className="font-semibold text-foreground mb-3">{currentCase.challenge.title}</p>
                <ul className="space-y-2">
                  {currentCase.challenge.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className="border-2 border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                    💡
                  </span>
                  The Solution
                </h4>
                <p className="font-semibold text-foreground mb-3">{currentCase.solution.title}</p>
                <ul className="space-y-2">
                  {currentCase.solution.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right column: Results */}
          <div className="space-y-6">
            {/* Metrics */}
            <Card className="border-2 border-green-500/20 bg-green-500/5">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                    📊
                  </span>
                  The Results
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {currentCase.results.metrics.map((metric, idx) => {
                    const Icon = metric.icon
                    return (
                      <div key={idx} className="rounded-lg bg-card border-2 border-border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`h-5 w-5 ${metric.color}`} />
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            {metric.label}
                          </p>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">{metric.change}</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quote */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <blockquote className="text-lg leading-relaxed text-foreground italic mb-4">
                  "{currentCase.results.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                    {currentCase.results.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{currentCase.results.author}</p>
                    <p className="text-sm text-muted-foreground">{currentCase.results.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="border-2 border-primary bg-gradient-to-r from-primary to-secondary text-white">
              <CardContent className="p-6 text-center">
                <p className="text-lg font-semibold mb-4">
                  Ready to achieve similar results?
                </p>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-primary font-semibold hover:bg-white/90 transition-colors"
                >
                  Start your free trial
                  <ArrowRight className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
