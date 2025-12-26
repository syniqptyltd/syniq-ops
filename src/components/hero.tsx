import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Sparkles, Zap, TrendingUp } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/20 py-24 sm:py-32 lg:py-40">
      {/* Animated background decoration */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d5dde5_1px,transparent_1px),linear-gradient(to_bottom,#d5dde5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-primary opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-secondary opacity-20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] rounded-full bg-accent opacity-30 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Floating elements */}
        <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute right-[15%] top-[30%] h-3 w-3 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute left-[20%] bottom-[25%] h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-gradient-to-r from-accent/80 to-accent/40 px-5 py-2 text-sm font-medium text-accent-foreground shadow-lg backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold text-transparent">Built for South African service businesses</span>
          </div>

          {/* Main heading with gradient */}
          <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Run Your Service Business{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Effortlessly
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-8 text-pretty text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            Track every job, manage client details, and create VAT-compliant invoices with line-by-line breakdowns.
            <span className="font-semibold text-foreground"> Stop juggling spreadsheets</span> and get back to what you do best.
          </p>

          {/* Key benefits with icons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-base">
            <div className="group flex items-center gap-2.5 rounded-full bg-primary/10 px-4 py-2 transition-all hover:bg-primary/20 hover:scale-105">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium text-foreground">VAT compliant invoicing</span>
            </div>
            <div className="group flex items-center gap-2.5 rounded-full bg-secondary/10 px-4 py-2 transition-all hover:bg-secondary/20 hover:scale-105">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20">
                <Zap className="h-4 w-4 text-secondary" />
              </div>
              <span className="font-medium text-foreground">Expense tracking</span>
            </div>
            <div className="group flex items-center gap-2.5 rounded-full bg-primary/10 px-4 py-2 transition-all hover:bg-primary/20 hover:scale-105">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium text-foreground">Job line items</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group btn-shimmer h-14 bg-gradient-to-r from-primary to-secondary px-8 text-lg font-bold shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/40" asChild>
              <Link href="/pricing">
                ✨ Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 border-2 border-primary/30 bg-background/50 px-8 text-lg font-semibold backdrop-blur-sm transition-all hover:scale-105 hover:border-primary hover:bg-primary/5" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          {/* Social proof with icons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span>Free 7-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <Link href="/pricing" className="font-medium text-primary transition-colors hover:text-secondary">
                View Pricing →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
