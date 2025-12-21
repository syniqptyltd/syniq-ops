import { Navbar } from "@/components/navbar"
import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/20 px-4 py-12 sm:px-6 lg:px-8">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/4 h-[350px] w-[350px] rounded-full bg-primary opacity-10 blur-[120px] animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-secondary opacity-10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative w-full max-w-md space-y-8">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Welcome Back
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Log in to your account
              </span>
            </h1>
            <p className="mt-3 text-pretty text-lg text-muted-foreground">
              Continue managing your business operations
            </p>
          </div>

          {/* Form card with enhanced styling */}
          <div className="rounded-2xl border-2 border-primary/20 bg-card p-8 shadow-2xl shadow-primary/10 backdrop-blur-sm">
            <LoginForm />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="group inline-flex items-center gap-1 font-bold text-primary transition-all hover:text-secondary hover:gap-2"
            >
              Sign up
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
