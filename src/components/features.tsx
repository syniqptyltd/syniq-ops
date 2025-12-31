'use client'

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { CheckCircle2, Clock, DollarSign, Calendar, FileText, BarChart3, Zap, TrendingUp, Users } from "lucide-react"

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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-teal-400 to-blue-500 opacity-10" />
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    {/* Icon grid representing scheduling/automation */}
                    {[
                      { icon: Calendar, label: "Schedule", color: "bg-blue-500" },
                      { icon: FileText, label: "Tasks", color: "bg-pink-500" },
                      { icon: Clock, label: "Track", color: "bg-teal-500" },
                      { icon: CheckCircle2, label: "Complete", color: "bg-purple-500" }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                      >
                        <div className={`${item.color} p-3 rounded-full mb-2`}>
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs font-medium text-slate-600">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100 shadow-2xl p-8">
                <div className="h-full flex items-center justify-center">
                  <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                    {/* Dashboard mockup */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-700">Financial Overview</h3>
                        <BarChart3 className="h-5 w-5 text-teal-500" />
                      </div>
                      {/* Chart bars */}
                      <div className="space-y-2">
                        <div className="h-3 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full w-3/4"></div>
                        <div className="h-3 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full w-full"></div>
                        <div className="h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full w-1/2"></div>
                      </div>
                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <div className="bg-teal-50 rounded-lg p-3">
                          <div className="text-xs text-teal-700 font-medium">Revenue</div>
                          <div className="text-lg font-bold text-teal-900">R45.2k</div>
                        </div>
                        <div className="bg-pink-50 rounded-lg p-3">
                          <div className="text-xs text-pink-700 font-medium">Expenses</div>
                          <div className="text-lg font-bold text-pink-900">R12.8k</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-teal-50 to-cyan-100 shadow-2xl p-8">
                <div className="h-full flex items-center justify-center">
                  {/* Invoice mockup */}
                  <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-xl shadow-lg p-6 w-full max-w-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Invoice</h3>
                        <p className="text-xs text-slate-500">#INV-2024-001</p>
                      </div>
                      <div className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        PAID
                      </div>
                    </div>
                    {/* Invoice lines */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Service</span>
                        <span className="font-medium text-slate-900">R2,500</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Materials</span>
                        <span className="font-medium text-slate-900">R850</span>
                      </div>
                      <div className="border-t border-slate-200 pt-3 flex justify-between">
                        <span className="font-bold text-slate-900">Total</span>
                        <span className="font-bold text-teal-600 text-lg">R3,350</span>
                      </div>
                    </div>
                    {/* Payment button mockup */}
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center py-3 rounded-lg font-semibold text-sm shadow-md">
                      Pay Now
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
