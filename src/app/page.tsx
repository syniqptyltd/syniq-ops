import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { DetailedFeatures } from "@/components/detailed-features"
import { CaseStudies } from "@/components/case-studies"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Syniq Ops - Business Operations Software for Service Companies",
  description: "Manage clients, create VAT-compliant invoices, track expenses, and run your service business efficiently. Built for South African businesses with full VAT support and automated invoicing.",
  openGraph: {
    title: "Syniq Ops - Business Operations Software for Service Companies",
    description: "Manage clients, create VAT-compliant invoices, track expenses, and run your service business efficiently.",
    url: "/",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <DetailedFeatures />
        <CaseStudies />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
