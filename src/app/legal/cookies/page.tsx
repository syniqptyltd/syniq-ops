import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CookiePolicyPage() {
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
                            Cookie Policy
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </header>

                    {/* Cookie Policy content */}
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Syniq Solutions ("we", "us", "our"), operated by <strong className="text-foreground">Syniq (Pty) Ltd</strong>, uses cookies and similar technologies to ensure the proper
                                functioning of our platform.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">What are cookies?</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Cookies are small text files stored on your device to help websites function efficiently and
                                securely.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies we use</h2>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li><strong>Essential:</strong> authentication, security, session management</li>
                                <li><strong>Analytics:</strong> usage metrics and diagnostics</li>
                                <li><strong>Preferences:</strong> saved settings</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Managing cookies</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                You can control cookies via your browser settings. Disabling essential cookies may impact
                                functionality.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                For cookie‑related questions, contact:{" "}
                                <a
                                    href="mailto:syniq.store@gmail.com"
                                    className="text-primary hover:underline font-medium"
                                >
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