import { Navbar } from "@/components/navbar"
import { SignupForm } from "@/components/signup-form"
import Link from "next/link"
import { Sparkles, ArrowRight, Zap } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-secondary/5 via-background to-primary/10 px-4 py-12 sm:px-6 lg:px-8">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-1/4 top-1/4 h-[350px] w-[350px] rounded-full bg-secondary opacity-10 blur-[120px] animate-pulse" />
          <div className="absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-primary opacity-10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative w-full max-w-md space-y-8">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
              <Zap className="h-4 w-4" />
              Get Started Free
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                Create your account
              </span>
            </h1>
            <p className="mt-3 text-pretty text-lg text-muted-foreground">
              Start managing your business operations in minutes
            </p>

            {/* Benefits list */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>

          {/* Form card with enhanced styling */}
          <div className="rounded-2xl border-2 border-secondary/20 bg-card p-8 shadow-2xl shadow-secondary/10 backdrop-blur-sm">
            <SignupForm />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="group inline-flex items-center gap-1 font-bold text-primary transition-all hover:text-secondary hover:gap-2"
            >
              Log in
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
