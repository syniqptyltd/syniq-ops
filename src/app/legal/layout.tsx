import { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: true, // Index legal pages for trust
    follow: true,
  },
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
