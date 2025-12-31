'use client'

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { CheckCircle2, DollarSign, FileText, BarChart3, Zap, TrendingUp, Calendar } from "lucide-react"
import Image from "next/image"

export function Features() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" })
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" })

  return (
    <>
      {/* Effortless Admin Automation Section */}
      <section ref={ref1} className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                Effortless Admin Automation
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Streamline your day-to-day. From intelligent scheduling and dispatching to centralized client management, Syniq Ops handles the busywork so you can focus on growth.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: CheckCircle2, text: "Reduce manual errors", color: "text-pink-500" },
                  { icon: Calendar, text: "Optimize team schedules", color: "text-pink-500" },
                  { icon: Zap, text: "Enhance client communication", color: "text-pink-500" }
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  >
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-pink-100`}>
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <span className="text-slate-700 font-medium">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Illustration */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Mockup 1.png"
                  alt="Admin Automation Dashboard"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrated Smart Accounting Section */}
      <section ref={ref2} className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-cyan-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Illustration */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Mockup 2.png"
                  alt="Smart Accounting Dashboard"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                Integrated Smart Accounting
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Stay on top of your finances without the headache. Track expenses, generate real-time reports, and sync seamlessly with your favorite accounting software.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: TrendingUp, text: "Gain financial clarity", color: "text-teal-500" },
                  { icon: FileText, text: "Simplify tax prep", color: "text-teal-500" },
                  { icon: BarChart3, text: "Make informed decisions", color: "text-teal-500" }
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  >
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-teal-100`}>
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <span className="text-slate-700 font-medium">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Faster, Simpler Invoicing Section */}
      <section ref={ref3} className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                Faster, Simpler Invoicing
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Turn quotes into cash in clicks. Create professional estimates, accept secure online payments, and automate payment reminders to improve cash flow.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Zap, text: "Get paid quicker", color: "text-teal-500" },
                  { icon: CheckCircle2, text: "Look more professional", color: "text-teal-500" },
                  { icon: DollarSign, text: "Reduce late payments", color: "text-teal-500" }
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  >
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-teal-100`}>
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <span className="text-slate-700 font-medium">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Illustration */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView3 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Mockup 3.png"
                  alt="Invoicing Dashboard"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
