import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Acceptable Use Policy - Syniq Ops",
  description: "Review acceptable use guidelines for Syniq Ops. Understand permitted uses, prohibited activities, and enforcement policies.",
}

export default function AcceptableUsePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    {/* Back button */}
                    <div className="mb-8">
                        <Button variant="ghost" asChild>
                            <Link href="/" className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>

                    {/* Page header */}
                    <header className="mb-12 border-b border-border pb-8">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            Acceptable Use Policy
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </header>

                    {/* Acceptable Use content */}
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Overview</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                This policy outlines permitted and prohibited uses of Syniq Ops ("we", "us", "our"), Operated by <strong className="text-foreground">Syniq (Pty) Ltd</strong>.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">You agree not to:</h2>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Use the platform for unlawful or fraudulent activities</li>
                                <li>Upload malware or malicious code</li>
                                <li>Attempt unauthorised access</li>
                                <li>Reverse engineer or resell the service</li>
                                <li>Disrupt platform performance</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Enforcement</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We reserve the right to suspend or terminate accounts that violate this policy.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}