'use client'

import { Users, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Automated scheduling & dispatching",
    bgColor: "bg-gradient-to-br from-emerald-400 to-emerald-500",
    iconBg: "bg-emerald-600"
  },
  {
    icon: TrendingUp,
    title: "Reduce Costs",
    description: "Optimized routes & inventory",
    bgColor: "bg-gradient-to-br from-sky-300 to-sky-400",
    iconBg: "bg-sky-500"
  },
  {
    icon: Users,
    title: "Boost Efficiency",
    description: "Real-time reporting & invoicing",
    bgColor: "bg-gradient-to-br from-lime-300 to-lime-400",
    iconBg: "bg-lime-500"
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cyan-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group/card"
              >
                {/* Colored card */}
                <Card className={`relative h-full overflow-hidden rounded-2xl border-0 ${feature.bgColor} shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}>
                  <CardContent className="p-8 flex flex-col items-center text-center h-full justify-center min-h-[280px]">
                    {/* Icon with colored background */}
                    <div className="mb-6">
                      <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl ${feature.iconBg} shadow-lg transition-all duration-300 group-hover/card:scale-110`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base leading-relaxed text-slate-800 font-medium">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
