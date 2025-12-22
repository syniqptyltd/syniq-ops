import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-primary/10 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/90 shadow-lg shadow-primary/5">
      {/* Subtle gradient line at top */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center gap-2.5 transition-all hover:scale-105">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg ring-2 ring-primary/20 transition-all group-hover:ring-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20">
                <Image
                  src="/SYNIQ-LOGO.png"
                  alt="Syniq Ops Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-xl font-bold text-transparent">
                Syniq Ops
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden md:inline-flex font-semibold hover:bg-primary/10 hover:text-primary transition-all"
              asChild
            >
              <Link href="/pricing">Pricing</Link>
            </Button>
            <Button
              variant="ghost"
              className="hidden sm:inline-flex font-semibold hover:bg-secondary/10 hover:text-secondary transition-all"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              className="group btn-shimmer relative overflow-hidden bg-gradient-to-r from-primary to-secondary font-bold shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
              asChild
            >
              <Link href="/pricing">
                <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}