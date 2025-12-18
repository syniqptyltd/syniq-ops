import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to streamline your operations?
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Join South African small businesses already using Syniq Ops to manage their daily operations
          </p>
          <div className="mt-10">
            <Button size="lg" className="text-base" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
