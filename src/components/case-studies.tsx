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
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl sm:text-3xl font-medium text-slate-800 italic mb-6">
            "Syniq Ops has transformed how we manage our team!"
          </p>
          <p className="text-lg text-slate-600">
            - Jane D., Plumbing Service
          </p>
        </motion.div>
      </div>
    </section>
  )
}
