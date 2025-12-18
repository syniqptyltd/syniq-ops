import { Navbar } from "@/components/navbar"
import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Welcome back</h1>
            <p className="mt-2 text-pretty text-muted-foreground">Log in to your Syniq Ops account</p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
