'use client'

import Image from "next/image"
import { Users, Briefcase, FileText, Receipt, Calculator, TrendingUp, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: Users,
    title: "Client Management",
    description: "Track clients, contacts & history.",
    screenshot: "/Clients.png",
  },
  {
    icon: Briefcase,
    title: "Job Management",
    description: "Track tasks, assignments & deadlines.",
    screenshot: "/Jobs.png",
  },
  {
    icon: FileText,
    title: "Automated Invoicing",
    description: "Effortless billing & payments.",
    screenshot: "/Invoice.png",
  },
  {
    icon: Receipt,
    title: "Expense Tracking",
    description: "Monitor costs & VAT claims.",
    screenshot: "/Expenses.png",
  },
  {
    icon: Calculator,
    title: "Financial Accounting",
    description: "P&L statements & insights.",
    screenshot: "/Accounting.png",
  },
  {
    icon: TrendingUp,
    title: "Business Analytics",
    description: "Actionable insights & ROI.",
    screenshot: "/Dashboard.png",
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-muted/30 py-20 sm:py-32">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,rgb(var(--primary)/.03),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            Everything You Need
          </div>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Powerful Features for Service Businesses
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            From client management to automated invoicing, everything you need to run your service business efficiently.
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
                className="relative"
              >
                {/* Floating card with depth */}
                <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-2">
                  <CardContent className="p-0">
                    {/* Screenshot */}
                    <div className="relative aspect-[4/3] w-full bg-muted/30">
                      <Image
                        src={feature.screenshot}
                        alt={feature.title}
                        fill
                        className={`${feature.title.includes('Invoicing') ? 'object-contain p-4' : 'object-cover object-top'}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {/* Icon */}
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-foreground">
                          {feature.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Soft shadow beneath card for floating effect */}
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-muted/30 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
