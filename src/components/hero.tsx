'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Sparkles, Zap, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/20 py-24 sm:py-32 lg:py-40">
      {/* Animated background decoration - Removed bounce animations */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d5dde5_1px,transparent_1px),linear-gradient(to_bottom,#d5dde5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40" />

        {/* Gradient orbs - Reduced opacity and removed pulse */}
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-primary opacity-5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-secondary opacity-5 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] rounded-full bg-accent opacity-8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated Badge */}
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-gradient-to-r from-accent/80 to-accent/40 px-5 py-2 text-sm font-medium text-accent-foreground shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold text-transparent">Built for South African service businesses</span>
          </motion.div>

          {/* Main heading with gradient */}
          <motion.h1
            className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Small Business Operations Platform to Run Your Service Business{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Effortlessly
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="mt-8 text-pretty text-xl leading-relaxed text-muted-foreground sm:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From client management software to professional invoicing with detailed cost breakdowns. Everything you need to manage your operations, track expenses, and grow your business with VAT-compliant invoicing and expense tracking.
            <span className="font-semibold text-foreground"> Stop juggling spreadsheets</span> and get back to what you do best.
          </motion.p>

          {/* Key benefits with icons */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {[
              { icon: CheckCircle2, label: "VAT compliant invoicing", color: "primary" },
              { icon: Zap, label: "Expense tracking", color: "secondary" },
              { icon: TrendingUp, label: "Job line items", color: "primary" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className={`group flex items-center gap-2.5 rounded-full bg-${item.color}/10 px-4 py-2 transition-all hover:bg-${item.color}/20`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-${item.color}/20`}>
                  <item.icon className={`h-4 w-4 text-${item.color}`} />
                </div>
                <span className="font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="group btn-shimmer h-14 bg-gradient-to-r from-primary to-secondary px-8 text-lg font-bold shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40" asChild>
                <Link href="/pricing">
                  ✨ Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" variant="outline" className="h-14 border-2 border-primary/30 bg-background/50 px-8 text-lg font-semibold backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/5" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Social proof with icons */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {[
              { label: "No credit card required" },
              { label: "Free 7-day trial" },
              { label: "View Pricing →", href: "/pricing" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.0 + index * 0.1 }}
              >
                <div className={`h-1.5 w-1.5 rounded-full ${index === 1 ? 'bg-secondary' : 'bg-primary'}`} />
                {item.href ? (
                  <Link href={item.href} className="font-medium text-primary transition-colors hover:text-secondary">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
