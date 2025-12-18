import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Manage your business operations in one place
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Take control of your clients, jobs, and invoices with Syniq Ops. The all-in-one platform built for South
            African small businesses.
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
