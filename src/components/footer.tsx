import Image from "next/image"
import Link from "next/link"
import { Mail, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-primary/10 bg-gradient-to-br from-muted/50 via-background to-accent/20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-primary opacity-5 blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-[250px] w-[250px] rounded-full bg-secondary opacity-5 blur-[100px]" />
      </div>

      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2.5 transition-all hover:scale-105">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg ring-2 ring-primary/20 transition-all group-hover:ring-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20">
                <Image
                  src="/SYNIQ-LOGO.png"
                  alt="Syniq Ops Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-xl font-bold text-transparent">
                Syniq Ops
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The all-in-one operations platform built for South African service businesses.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" />
              Built for South Africa
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-foreground">Product</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-foreground">Company</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@syniqsolutions.co.za"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-secondary"
                >
                  <Mail className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-foreground">Legal</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/legal/privacy"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/popia"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  POPIA Compliance
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/billing"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  Billing Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/refund"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/acceptable-use"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  Acceptable Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t-2 border-gradient-to-r from-primary/20 to-secondary/20 pt-8">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Syniq (Pty) Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="/legal/privacy"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Privacy
              </Link>
              <div className="h-1 w-1 rounded-full bg-primary/30" />
              <Link
                href="/legal/terms"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}