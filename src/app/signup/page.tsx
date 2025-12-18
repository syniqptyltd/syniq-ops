import { Navbar } from "@/components/navbar"
import { SignupForm } from "@/components/signup-form"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Create your account
            </h1>
            <p className="mt-2 text-pretty text-muted-foreground">Start managing your business operations in minutes</p>
          </div>

          <SignupForm />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
