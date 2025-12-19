import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                <Image
                  src="/LOGO-light.png"
                  alt="Syniq Ops Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-semibold text-foreground">Syniq Ops</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <Link href="/pricing">Pricing</Link>
            </Button>
            <Button variant="ghost" className="hidden sm:inline-flex" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}