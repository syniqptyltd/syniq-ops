import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Billing & Subscription Terms - Syniq Ops",
  description: "Review our billing terms for Syniq Ops subscriptions. Understand payment processing, cancellations, and subscription management.",
}

export default function BillingTermsPage() {
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
                            Billing & Subscription Terms
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </header>

                    {/* Billing terms content */}
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <section className="mb-8">
                            <p className="text-muted-foreground leading-relaxed">
                                Pricing is displayed within the application and may change with notice.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Payments</h2>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Processed by third-party providers</li>
                                <li>Billed in advance</li>
                                <li>Recurring where applicable</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Cancellations</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                You may cancel at any time. Access remains until the end of the billing period.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Refunds</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Fees are non-refundable unless required by law.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Failed Payments</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We may suspend services if payment fails.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
