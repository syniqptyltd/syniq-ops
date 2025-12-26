import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-secondary py-24 sm:py-32">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-white opacity-10 blur-[100px] animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 h-[250px] w-[250px] rounded-full bg-secondary opacity-20 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden border-2 border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
          <div className="px-6 py-16 sm:px-12 sm:py-24">
            <div className="mx-auto max-w-3xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4" />
                Used by Service Businesses Across SA
              </div>

              <h2 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Ready to Transform Your Operations?
              </h2>
              <p className="mt-6 text-pretty text-xl leading-relaxed text-white/90">
                Join service businesses across South Africa using Syniq Ops to manage clients, jobs, expenses, and invoicing with ease.
              </p>

              {/* Features list with enhanced styling */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2.5 rounded-full bg-white/20 px-5 py-2.5 backdrop-blur-sm">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-white">Free 7-day trial</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-full bg-white/20 px-5 py-2.5 backdrop-blur-sm">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-white">No credit card required</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-full bg-white/20 px-5 py-2.5 backdrop-blur-sm">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-white">Setup in minutes</span>
                </div>
              </div>

              <div className="mt-12">
                <Button size="lg" className="group btn-shimmer h-16 bg-white px-10 text-lg font-bold text-primary shadow-2xl transition-all hover:scale-105 hover:bg-white/95 hover:shadow-white/30" asChild>
                  <Link href="/pricing">
                    🚀 Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <p className="mt-8 text-sm text-white/80">
                No commitment • Cancel anytime • South African support
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
