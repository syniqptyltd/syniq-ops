import Link from "next/link"
import Image from "next/image" // Add this import
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                {/* Replace this span with Image component */}
                <Image 
                  src="/LOGO-light.png" 
                  alt="Syniq Ops Logo" 
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xl font-semibold text-foreground">Syniq Ops</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}