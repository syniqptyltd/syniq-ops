import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PopiaPage() {
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
                            POPIA Compliance Notice
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </header>

                    {/* POPIA content */}
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Syniq Ops ("we", "us", "our"), operated by <strong className="text-foreground">Syniq (Pty) Ltd</strong>, is committed to complying with the Protection of Personal Information Act (POPIA)
                                of South Africa. This notice outlines how we process personal information in accordance with POPIA requirements.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Data We Process</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We collect and process personal information necessary to provide our services, including but not limited to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Account and contact details</li>
                                <li>Business and invoicing information</li>
                                <li>Usage and diagnostic data</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Legal Basis for Processing</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We process personal information based on the following legal grounds:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Performance of a contract</li>
                                <li>Compliance with legal obligations</li>
                                <li>Legitimate interests pursued by us</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Protection Measures</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We implement appropriate technical and organizational measures to protect personal information
                                against unauthorized access, loss, or destruction.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Your rights</h2>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Access your data</li>
                                <li>Request correction or deletion</li>
                                <li>Object to processing</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                For POPIA requests, email:{" "}
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