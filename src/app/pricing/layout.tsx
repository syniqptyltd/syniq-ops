import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Pricing Plans - Syniq Ops",
  description: "Affordable pricing for South African service businesses. Start at R199/month with VAT-compliant invoicing, expense tracking, and job management. 7-day free trial, no credit card required.",
  openGraph: {
    title: "Pricing Plans - Syniq Ops",
    description: "Affordable pricing for South African service businesses. Start at R199/month. 7-day free trial, no credit card required.",
    url: "/pricing",
    type: "website",
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
