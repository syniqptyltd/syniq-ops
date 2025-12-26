import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Log In to Your Account - Syniq Ops",
  description: "Access your Syniq Ops account to manage clients, create invoices, and track your business operations.",
  robots: {
    index: false, // Don't index login pages
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
