'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const testimonials = [
  {
    quote: "We recovered R42,000 in VAT in the first year just by tracking everything properly. The time savings alone pays for Syniq Ops 10 times over.",
    author: "Johan van der Merwe",
    role: "Owner",
    company: "Cape Town Electrical",
    industry: "Electrical Services",
    metric: "10 hrs/week saved",
  },
  {
    quote: "I can now see exactly which types of jobs make the most money. Emergency call-outs have 40% higher margins than I thought.",
    author: "Thabo Mokoena",
    role: "Managing Director",
    company: "Pro Plumbing JHB",
    industry: "Plumbing Services",
    metric: "R35k cash flow boost",
  },
  {
    quote: "The analytics showed us that maintenance contracts are our most stable revenue. We've shifted focus and smoothed out winter dips.",
    author: "Priya Naidoo",
    role: "Operations Manager",
    company: "Aircon Masters",
    industry: "HVAC Services",
    metric: "R18k/year saved",
  },
]

export function CaseStudies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-muted/30 py-20 sm:py-32">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_50%,rgb(var(--primary)/.03),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Quote className="h-4 w-4" />
            Customer Stories
          </div>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Trusted by Service Businesses
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            South African businesses saving time and growing with Syniq Ops
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Floating card with depth */}
              <Card className="group relative h-full overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-2">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-sm leading-relaxed text-foreground mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Metric badge */}
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {testimonial.metric}
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.industry}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Soft shadow beneath card for floating effect */}
              <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-muted/30 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
