import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-teal-100 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 shadow-lg shadow-teal-500/5">
      {/* Subtle gradient line at top */}
      <div className="h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center gap-2.5 transition-all hover:scale-105">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg ring-2 ring-teal-200 transition-all group-hover:ring-teal-400 group-hover:shadow-lg group-hover:shadow-teal-500/20">
                <Image
                  src="/SYNIQ-LOGO.png"
                  alt="Syniq Ops Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="bg-gradient-to-r from-slate-900 to-teal-600 bg-clip-text text-xl font-bold text-transparent">
                Syniq Ops
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden lg:inline-flex font-semibold hover:bg-teal-100 hover:text-teal-700 transition-all"
              asChild
            >
              <Link href="/#features">Features</Link>
            </Button>
            <Button
              variant="ghost"
              className="hidden md:inline-flex font-semibold hover:bg-teal-100 hover:text-teal-700 transition-all"
              asChild
            >
              <Link href="/pricing">Pricing</Link>
            </Button>
            <Button
              variant="ghost"
              className="hidden lg:inline-flex font-semibold hover:bg-teal-100 hover:text-teal-700 transition-all"
              asChild
            >
              <Link href="/about">About Us</Link>
            </Button>
            <Button
              variant="ghost"
              className="hidden lg:inline-flex font-semibold hover:bg-teal-100 hover:text-teal-700 transition-all"
              asChild
            >
              <Link href="/contact">Contact</Link>
            </Button>
            <Button
              variant="ghost"
              className="hidden sm:inline-flex font-semibold hover:bg-cyan-100 hover:text-cyan-700 transition-all"
              asChild
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button
              className="group btn-shimmer relative overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 font-bold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              asChild
            >
              <Link href="/pricing">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}