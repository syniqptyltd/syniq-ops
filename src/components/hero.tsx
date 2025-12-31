'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Sparkles, Zap, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
      {/* Clean minimal background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_50%,rgb(var(--primary)/.05),transparent)]" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(var(--primary)/.02)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--primary)/.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

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
              className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Streamline Your Service Business{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Operations
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
              className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Save time, reduce costs, and grow with Syniq Ops. The all-in-one operations management tool for small service teams.
            </motion.p>

            {/* Key benefits with icons */}
            <motion.div
              className="mt-8 flex flex-wrap gap-4 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                { icon: CheckCircle2, label: "Automated scheduling" },
                { icon: Zap, label: "Optimized routes" },
                { icon: TrendingUp, label: "Real-time reporting" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="group h-12 bg-gradient-to-r from-primary to-secondary px-8 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30" asChild>
                  <Link href="/pricing">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Free 7-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Floating Dashboard Preview */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Screenshot Container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/50 bg-background">
              {/* Browser Top Bar */}
              <div className="bg-muted/50 px-4 py-2.5 flex items-center gap-2 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                </div>
              </div>

              {/* Dashboard Screenshot */}
              <div className="relative aspect-[16/10] w-full bg-muted/30">
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
            <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl opacity-60" />
          </motion.div>
        </div>
      </div>
    </section >
  )
}
