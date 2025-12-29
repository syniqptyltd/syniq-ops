'use client'

import Image from "next/image"
import { Users, Briefcase, FileText, Receipt, Calculator, TrendingUp, Sparkles, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedTitle, setSelectedTitle] = useState<string>("")

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

        <div className="mt-16 grid gap-12 sm:grid-cols-1 lg:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group/card cursor-zoom-in"
                onClick={() => {
                  setSelectedImage(feature.screenshot)
                  setSelectedTitle(feature.title)
                }}
              >
                {/* Floating card with depth and zoom */}
                <Card className="relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:shadow-[0_20px_60px_rgb(0,0,0,0.18)] hover:scale-[1.02]">
                  <CardContent className="p-0">
                    {/* Content at top - reduced padding */}
                    <div className="px-6 pt-6 pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        {/* Icon */}
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-foreground">
                          {feature.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground pl-[52px]">
                        {feature.description}
                      </p>
                    </div>

                    {/* Screenshot - Much larger, edge-to-edge */}
                    <div className="relative aspect-[16/9] w-full bg-muted/30">
                      <Image
                        src={feature.screenshot}
                        alt={feature.title}
                        fill
                        className={`${feature.title.includes('Invoicing') ? 'object-contain p-6' : 'object-cover object-top'} transition-transform duration-500 group-hover/card:scale-105`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized
                      />
                      {/* Zoom hint on hover */}
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                        <div className="rounded-full bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg backdrop-blur-sm">
                          Click to zoom
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Soft shadow beneath card for floating effect */}
                <div className="absolute -bottom-6 left-6 right-6 h-12 bg-gradient-to-b from-muted/40 to-transparent blur-2xl opacity-60 transition-opacity duration-300 group-hover/card:opacity-80 -z-10" />
              </motion.div>
            )
          })}
        </div>

        {/* Image Lightbox Modal */}
        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-7xl w-[95vw] p-0 overflow-hidden bg-background border-0">
            <div className="relative w-full">
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-lg transition-all hover:bg-background hover:scale-110"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>

              {/* Full-size screenshot */}
              {selectedImage && (
                <div className="relative w-full aspect-[16/9] bg-muted">
                  <Image
                    src={selectedImage}
                    alt={selectedTitle}
                    fill
                    className="object-contain"
                    sizes="95vw"
                    unoptimized
                  />
                </div>
              )}

              {/* Image title */}
              {selectedTitle && (
                <div className="px-6 py-4 border-t border-border bg-muted/30">
                  <h3 className="text-lg font-semibold text-foreground">{selectedTitle}</h3>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
