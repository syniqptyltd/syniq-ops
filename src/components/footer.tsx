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
        {/* Header with Logo and Social Icons */}
        <div className="mb-12 flex items-start justify-between">
          {/* Brand */}
          <div>
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

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/SyniqPtyLtd"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 transition-all hover:bg-primary/10 hover:scale-110"
              aria-label="X (Twitter)"
            >
              <svg className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/syniq-pty-ltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 transition-all hover:bg-primary/10 hover:scale-110"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/syniqptyltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 transition-all hover:bg-primary/10 hover:scale-110"
              aria-label="Instagram"
            >
              <svg className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

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