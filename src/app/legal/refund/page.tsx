import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund Policy - Syniq Ops",
  description: "Understand our refund policy for Syniq Ops subscriptions and payments. Learn about eligibility, timelines, and exceptional circumstances for refunds.",
}

export default function RefundPolicyPage() {
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
                            Refund Policy
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </header>

                    {/* Refund policy content */}
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <section className="mb-8">
                            <p className="text-muted-foreground leading-relaxed">
                                We want you to be confident using Syniq. This policy explains when refunds may apply.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Subscriptions</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Subscription fees are billed in advance and are non-refundable. You may cancel your subscription at any time, and access will remain available until the end of your current billing period.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">One-Time Payments</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Refunds for one-time purchases may be requested within 7 days of purchase, provided the service has not been significantly used. After this period, one-time payments are non-refundable.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Add-ons and Credits</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Payments for add-ons, usage-based features, or credits are non-refundable once activated or used.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Exceptional Circumstances</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Refunds may be issued in cases of:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Duplicate charges</li>
                                <li>Billing errors</li>
                                <li>Technical issues that prevent access to the service</li>
                            </ul>
                            <p className="text-muted-foreground leading-relaxed mt-4">
                                Refunds are processed at our discretion and, where approved, will be issued to the original payment method.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Abuse</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We reserve the right to refuse refunds or suspend accounts in cases of suspected abuse or repeated refund requests.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                For refund requests or questions about this policy, contact us at{' '}
                                <a href="mailto:syniq.store@gmail.com" className="text-primary hover:underline">
                                    syniq.store@gmail.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
