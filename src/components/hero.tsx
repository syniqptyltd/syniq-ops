'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Sparkles, Zap, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24 lg:py-32">
      {/* Clean minimal background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_50%,rgb(var(--primary)/.05),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Grid Layout: Text Left, Image Right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hero Copy */}
          <div className="max-w-2xl lg:max-w-none">
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
            className="mt-10 flex flex-wrap gap-6 text-base"
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
            className="mt-12 flex flex-col gap-4 sm:flex-row"
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
            className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground"
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

          {/* Right Column: Floating Dashboard Preview */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Floating Card Container */}
            <motion.div
              className="relative"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Browser Frame */}
              <div className="relative w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/50 bg-background">
                {/* Browser Top Bar */}
                <div className="bg-muted/80 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-background/60 rounded-md px-3 py-1 text-xs text-muted-foreground flex items-center gap-2">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>app.syniqops.com</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Screenshot */}
                <div className="relative aspect-[16/10] w-full bg-background">
                  <Image
                    src="/Dashboard.png"
                    alt="Syniq Ops Dashboard"
                    fill
                    className="object-cover object-top"
                    sizes="50vw"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Soft depth shadow */}
              <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl" />

              {/* Ambient glow */}
              <div className="absolute inset-0 -z-20 translate-y-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl" />
            </motion.div>

            {/* Floating elements for visual interest */}
            <motion.div
              className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-secondary/10 blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
