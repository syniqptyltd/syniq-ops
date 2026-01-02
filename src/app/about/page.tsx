'use client'

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, Handshake, Shield } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
  const scrollToMission = () => {
    const missionSection = document.getElementById('mission-section')
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const values = [
    {
      icon: Settings,
      title: "Simplicity",
      description: "We design for ease of use, making complex tasks simple.",
      bgColor: "bg-white",
      iconColor: "bg-gradient-to-br from-teal-500 to-cyan-500"
    },
    {
      icon: Handshake,
      title: "Partnership",
      description: "We are your long-term partner, dedicated to your success.",
      bgColor: "bg-white",
      iconColor: "bg-gradient-to-br from-teal-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "Dependable software you can count on, every single day.",
      bgColor: "bg-white",
      iconColor: "bg-gradient-to-br from-teal-500 to-cyan-500"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
                  Empowering Small Service Businesses to{" "}
                  <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Thrive
                  </span>
                </h1>
                <p className="text-lg text-slate-600 mb-8">
                  Our mission is to simplify operations and help you focus on what matters most: your customers.
                </p>
                <button
                  onClick={scrollToMission}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  See Our Story
                </button>
              </motion.div>

              {/* Right: Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                    alt="Team collaboration"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission-section" className="py-16 bg-gradient-to-br from-cyan-50/50 via-white to-teal-50/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At Syniq Ops, we build intuitive, reliable tools that give small service businesses the operational clarity and efficiency they need to grow without the chaos.
            </p>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Core Values</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className={`${value.bgColor} border-2 border-slate-200 shadow-lg h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                      <CardContent className="p-8 flex flex-col items-center text-center">
                        <div className={`${value.iconColor} p-4 rounded-full mb-4`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                        <p className="text-sm text-slate-600">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
