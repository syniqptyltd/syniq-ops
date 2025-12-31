import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-teal-800 py-24 sm:py-32">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-5xl mb-8">
          Ready to Transform Your Operations?
        </h2>

        <Button size="lg" className="group h-14 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 px-10 text-lg font-bold shadow-2xl transition-all hover:scale-105" asChild>
          <Link href="/pricing">
            Start Your 14-Day Free Trial
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>

        <p className="mt-6 text-sm text-white/70">
          No credit card required
        </p>
      </div>
    </section>
  )
}
