import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          {/* Privacy content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Syniq Ops ("we", "us", "our") is operated by <strong className="text-foreground">Syniq (Pty) Ltd</strong>.
                This Privacy Policy explains how we collect, use, store, and protect your
                personal information when you use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Profile & account information (name, email, business details)</li>
                <li>Payment & billing information</li>
                <li>Usage data (logs, performance metrics, error reports)</li>
                <li>Client and job data you enter into the system</li>
                <li>Invoice and expense records</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Data</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Operate and provide the Service</li>
                <li>Authenticate users and maintain account security</li>
                <li>Process payments and billing</li>
                <li>Improve product experience and develop new features</li>
                <li>Provide customer support</li>
                <li>Send important service updates and notifications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We apply reasonable technical and organizational safeguards to protect
                your data. This includes encryption, secure authentication, and regular
                security reviews. However, no system is completely secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under applicable South African data protection laws, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Object to certain data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your data for as long as your account is active or as needed to
                provide you services. You may request deletion of your account and data at
                any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices,
                please contact us at:{" "}
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
