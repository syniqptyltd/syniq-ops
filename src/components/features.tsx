'use client'

import { Users, Briefcase, FileText, Receipt, Calculator, TrendingUp, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: Users,
    title: "Client Management",
    description: "Keep all client information in one place. Track contacts, communication history, and relationship status.",
    benefits: [
      "Centralized client database",
      "Contact history tracking",
      "Client communication logs"
    ]
  },
  {
    icon: Briefcase,
    title: "Job Management",
    description: "Organize and track all your jobs from start to finish. Assign tasks, set deadlines, and monitor progress.",
    benefits: [
      "Task assignment & tracking",
      "Deadline management",
      "Job status monitoring"
    ]
  },
  {
    icon: FileText,
    title: "Automated Invoicing",
    description: "Create professional VAT-compliant invoices in seconds. Send, track, and get paid faster.",
    benefits: [
      "VAT-compliant invoices",
      "Automated payment reminders",
      "Online payment integration"
    ]
  },
  {
    icon: Receipt,
    title: "Expense Tracking",
    description: "Monitor all business expenses and maximize your VAT claims with accurate record keeping.",
    benefits: [
      "Receipt capture & storage",
      "VAT claim tracking",
      "Expense categorization"
    ]
  },
  {
    icon: Calculator,
    title: "Financial Accounting",
    description: "Get real-time P&L statements and financial reports to understand your business performance.",
    benefits: [
      "Profit & loss statements",
      "Cash flow tracking",
      "Financial reporting"
    ]
  },
  {
    icon: TrendingUp,
    title: "Business Analytics",
    description: "Make data-driven decisions with actionable insights on revenue, expenses, and business growth.",
    benefits: [
      "Revenue analytics",
      "Performance metrics",
      "Growth insights"
    ]
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 via-background to-background" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="mx-auto max-w-2xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Everything You Need to Run Your Business
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            From client management to automated invoicing, all the tools you need in one platform.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group/card"
              >
                {/* Floating card with depth */}
                <Card className="relative h-full overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:shadow-[0_20px_60px_rgb(0,0,0,0.18)] hover:-translate-y-2">
                  <CardContent className="p-8 flex flex-col h-full">
                    {/* Icon with gradient background */}
                    <div className="mb-6">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 transition-all duration-300 group-hover/card:scale-110">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                      {feature.description}
                    </p>

                    {/* Benefits list */}
                    <ul className="space-y-2.5 mt-auto">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Soft shadow beneath card for floating effect */}
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-muted/30 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover/card:opacity-70 -z-10" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
