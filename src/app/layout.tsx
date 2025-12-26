import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Plus_Jakarta_Sans as V0_Font_Plus_Jakarta_Sans, IBM_Plex_Mono as V0_Font_IBM_Plex_Mono, Lora as V0_Font_Lora } from 'next/font/google'

import { Toaster } from "sonner"
import { CookieConsent } from "@/components/cookie-consent"

// Initialize fonts
const _plusJakartaSans = V0_Font_Plus_Jakarta_Sans({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800"] })
const _ibmPlexMono = V0_Font_IBM_Plex_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })
const _lora = V0_Font_Lora({ subsets: ['latin'], weight: ["400","500","600","700"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://syniqops.com'),
  title: {
    default: "Syniq Ops - Small Business Operations Platform | Client & Invoice Management",
    template: "%s | Syniq Ops"
  },
  description: "Manage your clients, jobs, and invoices all in one place. Built for South African small businesses with VAT compliance, automated invoicing, and expense tracking.",
  keywords: [
    "business management",
    "invoice software",
    "client management",
    "South African business",
    "VAT compliant invoicing",
    "small business operations",
    "expense tracking",
    "job management",
    "business operations platform",
    "automated invoicing"
  ],
  authors: [{ name: "Syniq Ops" }],
  creator: "Syniq Ops",
  publisher: "Syniq Ops",
  generator: "v0.app",
  icons: {
    icon: "/SYNIQ-Favicon.png",
    apple: "/SYNIQ-Favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "/",
    title: "Syniq Ops - Small Business Operations Platform",
    description: "Manage your clients, jobs, and invoices all in one place. Built for South African small businesses with VAT compliance.",
    siteName: "Syniq Ops",
    images: [{
      url: "/SYNIQ-LOGO.png",
      width: 1200,
      height: 630,
      alt: "Syniq Ops - Business Operations Platform"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Syniq Ops - Small Business Operations Platform",
    description: "Manage your clients, jobs, and invoices all in one place. Built for South African small businesses.",
    images: ["/SYNIQ-LOGO.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code-here',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Syniq Ops',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '199',
      priceCurrency: 'ZAR',
      priceValidUntil: '2026-12-31',
    },
    creator: {
      '@type': 'Organization',
      name: 'Syniq (Pty) Ltd',
      url: 'https://syniqops.com',
      logo: 'https://syniqops.com/SYNIQ-LOGO.png',
      email: 'syniq.store@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'ZA',
      },
      areaServed: 'ZA',
    },
    description: 'Business operations software for South African service companies. Manage clients, create VAT-compliant invoices, track expenses, and run your business efficiently.',
    featureList: [
      'Client Management',
      'VAT-Compliant Invoicing',
      'Expense Tracking',
      'Job Management',
      'Financial Reports',
      'Payment Tracking',
    ],
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <CookieConsent />
        <Analytics />
        <Toaster richColors />

      </body>
    </html>
  )
} 