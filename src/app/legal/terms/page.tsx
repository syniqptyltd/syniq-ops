import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions - Syniq Ops",
  description: "Read our terms and conditions for using Syniq Ops business operations software. Learn about your rights, responsibilities, and our service commitments.",
}

export default function TermsPage() {
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
              Terms & Conditions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          {/* Terms content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using Syniq Ops (the "Service"), operated by{" "}
                <strong className="text-foreground">Syniq (Pty) Ltd</strong>, you agree to be bound by these Terms
                and Conditions. If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you create an account with us, you must provide accurate, complete, and current
                information. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Ensuring your account information remains accurate and up to date</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Subscriptions & Payments</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Certain features of the Service require a paid subscription:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Payment is due in advance on a recurring basis</li>
                <li>Subscriptions automatically renew unless cancelled</li>
                <li>Prices are subject to change with 30 days notice</li>
                <li>Refunds are handled on a case-by-case basis</li>
                <li>We reserve the right to modify or discontinue features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service for any fraudulent or illegal purpose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data & Content Ownership</h2>
              <p className="text-muted-foreground leading-relaxed">
                You retain all rights to the data and content you submit to the Service. By using
                the Service, you grant us a license to store, process, and display your content
                solely for the purpose of providing the Service to you. We will not share your
                business data with third parties except as outlined in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Service Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to maintain high availability, we do not guarantee uninterrupted
                access to the Service. We reserve the right to modify, suspend, or discontinue
                any part of the Service with or without notice. We are not liable for any
                modification, suspension, or discontinuation of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by South African law, Syniq (Pty) Ltd and its
                affiliates, officers, employees, and agents shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages, including but not limited
                to loss of profits, data, or other intangible losses resulting from your use of
                the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify and hold harmless Syniq (Pty) Ltd from any claims, damages,
                losses, liabilities, and expenses (including legal fees) arising from your use of
                the Service or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to terminate or suspend your account immediately, without
                prior notice, for conduct that we believe violates these Terms or is harmful to
                other users, us, or third parties. You may terminate your account at any time by
                contacting us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of
                material changes via email or through the Service. Your continued use of the Service
                after such modifications constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of the
                Republic of South Africa. Any disputes arising from these Terms or the Service
                shall be subject to the exclusive jurisdiction of the courts of South Africa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at:{" "}
                <a
                  href="mailto:support@syniqsolutions.co.za"
                  className="text-primary hover:underline font-medium"
                >
                  support@syniqsolutions.co.za
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
