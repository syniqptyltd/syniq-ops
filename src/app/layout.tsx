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
  title: "Syniq Ops - Small Business Operations Platform",
  description: "Manage your clients, jobs, and invoices all in one place. Built for South African small businesses.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/SYNIQ-Favicon.png",
        sizes: "any",
      },
      {
        url: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <CookieConsent />
        <Analytics />
        <Toaster richColors />

      </body>
    </html>
  )
} 