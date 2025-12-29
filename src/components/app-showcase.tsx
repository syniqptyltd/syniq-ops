'use client'

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { LayoutDashboard, FileText, Briefcase, Users, Receipt, Calculator } from "lucide-react"

const screenshots = [
  {
    id: "dashboard",
    title: "Dashboard Overview",
    description: "Get a comprehensive view of your business with real-time analytics, revenue tracking, and key performance metrics at a glance.",
    image: "/Dashboard.png",
    icon: LayoutDashboard,
  },
  {
    id: "clients",
    title: "Client Management",
    description: "Store all client information, VAT numbers, and billing details in one place. Quick access to client history and payment patterns.",
    image: "/Clients.png",
    icon: Users,
  },
  {
    id: "jobs",
    title: "Job Tracking",
    description: "Manage jobs with detailed line items, track progress, and organize work with our intuitive kanban board view.",
    image: "/Jobs.png",
    icon: Briefcase,
  },
  {
    id: "invoices",
    title: "VAT-Compliant Invoicing",
    description: "Create professional, SARS-compliant invoices in seconds with automatic VAT calculations and customizable branding.",
    image: "/Invoice.png",
    icon: FileText,
  },
  {
    id: "expenses",
    title: "Expense Tracking",
    description: "Track all business expenses with VAT categorization. Never miss a VAT claim again with organized expense management.",
    image: "/Expenses.png",
    icon: Receipt,
  },
  {
    id: "accounting",
    title: "Accounting Reports",
    description: "Generate detailed financial reports, VAT summaries, and export data for your accountant with a single click.",
    image: "/Accounting.png",
    icon: Calculator,
  },
]

export function AppShowcase() {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-gradient-to-b from-background via-muted/20 to-background py-16 sm:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-balance text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            See Syniq Ops in Action
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Explore our intuitive interface designed specifically for South African service businesses. Everything you need to manage your operations in one powerful platform.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max mx-auto justify-center">
            {screenshots.map((screenshot, index) => {
              const Icon = screenshot.icon
              return (
                <button
                  key={screenshot.id}
                  onClick={() => setSelectedTab(index)}
                  className={`group flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    selectedTab === index
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{screenshot.title}</span>
                  <span className="sm:hidden">{screenshot.title.split(" ")[0]}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Screenshot Display */}
        <Card className="overflow-hidden border-2 shadow-2xl">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Description Panel */}
              <div className="lg:col-span-2 bg-gradient-to-br from-muted/50 to-background p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const Icon = screenshots[selectedTab].icon
                    return <Icon className="h-8 w-8 text-primary" />
                  })()}
                  <h3 className="text-2xl font-bold">{screenshots[selectedTab].title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {screenshots[selectedTab].description}
                </p>
              </div>

              {/* Screenshot */}
              <div className="lg:col-span-3 relative bg-gradient-to-br from-muted/30 to-background p-6">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border/40 shadow-lg">
                  <Image
                    src={screenshots[selectedTab].image}
                    alt={screenshots[selectedTab].title}
                    fill
                    className="object-cover object-top transition-all duration-300"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={selectedTab === 0}
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Highlights */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-3 rounded-lg border border-border/40 bg-card p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Clean & Intuitive</h4>
              <p className="text-sm text-muted-foreground">Easy to navigate interface designed for busy service professionals</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border/40 bg-card p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Mobile Responsive</h4>
              <p className="text-sm text-muted-foreground">Access your business data anywhere, on any device</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border/40 bg-card p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Lightning Fast</h4>
              <p className="text-sm text-muted-foreground">Optimized performance for quick access to critical business data</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
