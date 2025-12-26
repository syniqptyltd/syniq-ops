import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Create Your Account - Syniq Ops",
  description: "Start your 7-day free trial of Syniq Ops. No credit card required. Get instant access to professional invoicing, client management, and expense tracking for your service business.",
  openGraph: {
    title: "Create Your Account - Syniq Ops",
    description: "Start your 7-day free trial. No credit card required.",
    url: "/signup",
    type: "website",
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
