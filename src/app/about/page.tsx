'use client'

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, Handshake, Shield } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
  const values = [
    {
      icon: Settings,
      title: "Simplicity",
      description: "We design for ease of use, making complex tasks simple.",
      bgColor: "bg-lime-200",
      iconColor: "bg-pink-300"
    },
    {
      icon: Handshake,
      title: "Partnership",
      description: "We are your long-term partner, dedicated to your success.",
      bgColor: "bg-lime-200",
      iconColor: "bg-pink-300"
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "Dependable software you can count on, every single day.",
      bgColor: "bg-lime-200",
      iconColor: "bg-pink-300"
    }
  ]

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      description: "Sarah Chen is a cat of se-founder, lin gemelietad and star ofnonman service companies and rewired to rem businesses spaces.",
      image: "/team/sarah.jpg"
    },
    {
      name: "David Miller",
      role: "CTO",
      description: "David Miller is a veer reduction professional servic intemberx and customen alechy our communalises and essential clarty and learn CEO.",
      image: "/team/david.jpg"
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Customer Success",
      description: "Maria Redtigues, is head of your customer Success is arworiding and optional businesses at least of customer success.",
      image: "/team/maria.jpg"
    },
    {
      name: "Kenji Tanaka",
      role: "Lead Product Designer",
      description: "Kenji Tanaka Lead Product Designer percome create and crous estrones designer has design merles, and product scenergies.",
      image: "/team/kenji.jpg"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-cyan-400 via-teal-400 to-cyan-500 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
                  Empowering Small Service Businesses to Thrive
                </h1>
                <p className="text-lg text-white/90 mb-8">
                  Our mission is to simplify operations and help you focus on what matters most: your customers.
                </p>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
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
                  <div className="w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-white/50 text-center">
                      <p className="text-sm">Team collaboration image</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At Syniq Ops, we build intuitive, reliable tools that give small service businesses the operational clarity and efficiency they need to grow without the chaos.
            </p>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-100">
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
                    <Card className={`${value.bgColor} border-0 shadow-lg h-full`}>
                      <CardContent className="p-8 flex flex-col items-center text-center">
                        <div className={`${value.iconColor} p-4 rounded-full mb-4`}>
                          <Icon className="h-8 w-8 text-slate-700" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                        <p className="text-sm text-slate-700">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Meet the Team</h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-2 border-slate-200 shadow-lg overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                          <p className="text-sm font-semibold text-teal-600 mb-3">{member.role}</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{member.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
