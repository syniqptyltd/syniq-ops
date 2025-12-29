'use client'

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { LayoutDashboard } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function AppShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-gradient-to-b from-background via-muted/20 to-background py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <h2 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-balance text-4xl font-bold tracking-tight text-transparent sm:text-5xl mb-6">
            See Syniq Ops in Action
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Explore our intuitive dashboard designed specifically for South African service businesses.
          </p>
        </motion.div>

        {/* Dashboard Screenshot Display - Now Much Larger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-2 shadow-2xl backdrop-blur-sm bg-card/50">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Description Panel - Reduced size */}
                <motion.div
                  className="lg:col-span-1 bg-gradient-to-br from-muted/50 to-background p-6 lg:p-8 flex flex-col justify-center order-2 lg:order-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <LayoutDashboard className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Dashboard Overview</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                    Get a comprehensive view of your business with real-time analytics, revenue tracking, and key performance metrics at a glance.
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {[
                      "Real-time business metrics",
                      "Revenue & expense tracking",
                      "Outstanding invoices",
                      "Recent activity feed"
                    ].map((item, index) => (
                      <motion.li
                        key={item}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      >
                        <span className="text-primary mt-0.5 font-bold">✓</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Screenshot - Much Larger, Browser Frame */}
                <motion.div
                  className="lg:col-span-2 relative p-6 lg:p-10 order-1 lg:order-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Browser Frame */}
                  <div className="relative w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/50 bg-background">
                    {/* Browser Top Bar */}
                    <div className="bg-muted/80 backdrop-blur-sm px-4 py-3 flex items-center gap-2 border-b border-border/50">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 mx-4 hidden sm:block">
                        <div className="bg-background/60 rounded-md px-3 py-1 text-xs text-muted-foreground flex items-center gap-2">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span>app.syniqops.com/dashboard</span>
                        </div>
                      </div>
                    </div>

                    {/* Screenshot */}
                    <div className="relative aspect-[16/10] w-full bg-background">
                      <Image
                        src="/Dashboard.png"
                        alt="Dashboard Overview"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        priority
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Depth Shadow */}
                  <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 blur-2xl" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
