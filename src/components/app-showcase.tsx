'use client'

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { LayoutDashboard } from "lucide-react"

export function AppShowcase() {

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
            Explore our intuitive dashboard designed specifically for South African service businesses. Everything you need to manage your operations in one powerful platform.
          </p>
        </div>

        {/* Dashboard Screenshot Display */}
        <Card className="overflow-hidden border-2 shadow-2xl">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Description Panel */}
              <div className="lg:col-span-2 bg-gradient-to-br from-muted/50 to-background p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <LayoutDashboard className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">Dashboard Overview</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Get a comprehensive view of your business with real-time analytics, revenue tracking, and key performance metrics at a glance. Monitor your clients, jobs, invoices, and expenses all from one central dashboard.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Real-time business metrics and KPIs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Revenue and expense tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Outstanding invoices overview</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Recent activity feed</span>
                  </li>
                </ul>
              </div>

              {/* Screenshot */}
              <div className="lg:col-span-3 relative bg-gradient-to-br from-muted/30 to-background p-6">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border/40 shadow-lg bg-white">
                  <Image
                    src="/Dashboard.png"
                    alt="Dashboard Overview"
                    fill
                    className="object-cover object-top transition-all duration-300"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
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
