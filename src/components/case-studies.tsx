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
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cyan-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Loved by Service Businesses Across South Africa
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See how Syniq Ops is helping small service teams save time, reduce costs, and grow their business.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="h-full border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="h-10 w-10 text-teal-500 opacity-50" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-teal-500 text-teal-500" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-slate-700 leading-relaxed mb-6 flex-grow">
                    "{testimonial.quote}"
                  </p>

                  {/* Metric Badge */}
                  <div className="inline-flex items-center gap-2 self-start mb-4 px-3 py-1.5 bg-teal-100 rounded-full">
                    <span className="text-xs font-bold text-teal-700">
                      {testimonial.metric}
                    </span>
                  </div>

                  {/* Author Info */}
                  <div className="border-t border-slate-200 pt-4">
                    <p className="font-bold text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-600">
                      {testimonial.role}, {testimonial.company}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{testimonial.industry}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
