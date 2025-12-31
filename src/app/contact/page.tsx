'use client'

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    subject: 'General Inquiry',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-slate-50 to-cyan-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-slate-600 mb-12">
                Have a question about Syniq Ops? We're here to help your small service business succeed.
              </p>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center">
                    <Mail className="h-7 w-7 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Email Us</h3>
                    <a href="mailto:support@syniqsolutions.co.za" className="text-slate-600 hover:text-teal-600 transition-colors">
                      support@syniqsolutions.co.za
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="h-7 w-7 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">WhatsApp Us</h3>
                    <a
                      href="https://wa.me/27609931134"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-teal-600 transition-colors"
                    >
                      +27 60 993 1134
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-2 border-slate-200 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:ring-0 focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Work Email */}
                    <div>
                      <label htmlFor="workEmail" className="block text-sm font-semibold text-slate-700 mb-2">
                        Work Email
                      </label>
                      <input
                        type="email"
                        id="workEmail"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:ring-0 focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:ring-0 focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
                      >
                        <option>General Inquiry</option>
                        <option>Sales Question</option>
                        <option>Technical Support</option>
                        <option>Billing Question</option>
                        <option>Partnership Opportunity</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={5}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:ring-0 focus:outline-none transition-colors resize-none"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 rounded-lg shadow-lg transition-all hover:shadow-xl"
                    >
                      Send Message
                    </Button>

                    <p className="text-sm text-slate-500 text-center">
                      We respect your privacy. No spam, ever.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
