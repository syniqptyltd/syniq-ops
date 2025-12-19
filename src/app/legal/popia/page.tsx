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
                Syniq Ops ("we", "us", "our"), operated by <strong className="text-foreground">Syniq (Pty) Ltd</strong>,
                is committed to complying with the Protection of Personal Information Act 4 of 2013 (POPIA)
                of the Republic of South Africa. This notice outlines how we process personal information
                in accordance with POPIA's eight conditions for lawful processing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Responsible Party</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Syniq (Pty) Ltd is the responsible party under POPIA for the processing of your personal information.
                Our contact details are:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Company: Syniq (Pty) Ltd</li>
                <li>Email: syniq.store@gmail.com</li>
                <li>Service: Syniq Ops Business Management Platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Personal Information We Process</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect and process the following categories of personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Account Information:</strong> Name, email address, password (encrypted), business name</li>
                <li><strong className="text-foreground">Business Information:</strong> VAT registration number, contact details, business address</li>
                <li><strong className="text-foreground">Client Data:</strong> Information you store about your clients (names, contact details, VAT numbers)</li>
                <li><strong className="text-foreground">Financial Data:</strong> Invoices, expenses, job records, payment information</li>
                <li><strong className="text-foreground">Usage Data:</strong> Log files, IP addresses, browser type, device information, usage patterns</li>
                <li><strong className="text-foreground">Communication Data:</strong> Support requests, feedback, correspondence with us</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Purpose of Processing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We process your personal information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>To create and maintain your user account</li>
                <li>To provide the Syniq Ops platform and its features</li>
                <li>To process payments and manage billing</li>
                <li>To authenticate users and maintain security</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To improve our services and develop new features</li>
                <li>To send important service updates and notifications</li>
                <li>To comply with legal obligations and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Legal Basis for Processing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We process personal information based on the following lawful grounds under POPIA:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Consent:</strong> You have given explicit consent for us to process your data for specific purposes</li>
                <li><strong className="text-foreground">Contract Performance:</strong> Processing is necessary to fulfill our service agreement with you</li>
                <li><strong className="text-foreground">Legal Obligation:</strong> Processing is required to comply with South African laws and regulations</li>
                <li><strong className="text-foreground">Legitimate Interest:</strong> Processing is necessary for our legitimate business interests (e.g., security, fraud prevention)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Subject Rights Under POPIA</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As a data subject under POPIA, you have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Right to Access:</strong> Request access to your personal information we hold</li>
                <li><strong className="text-foreground">Right to Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong className="text-foreground">Right to Deletion:</strong> Request deletion of your personal information (subject to legal retention requirements)</li>
                <li><strong className="text-foreground">Right to Object:</strong> Object to the processing of your personal information in certain circumstances</li>
                <li><strong className="text-foreground">Right to Data Portability:</strong> Request your data in a portable format</li>
                <li><strong className="text-foreground">Right to Withdraw Consent:</strong> Withdraw previously given consent at any time</li>
                <li><strong className="text-foreground">Right to Lodge a Complaint:</strong> Lodge a complaint with the Information Regulator</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Security Measures</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, loss, destruction, or alteration:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication mechanisms</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and user permissions</li>
                <li>Secure hosting infrastructure</li>
                <li>Staff training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes
                outlined in this notice, unless a longer retention period is required by law. When you close
                your account, we will delete or anonymize your personal information within a reasonable
                timeframe, except where retention is required for legal, regulatory, or legitimate business purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Sharing of Personal Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Service Providers:</strong> Third-party service providers who assist in operating our platform (e.g., hosting, payment processing)</li>
                <li><strong className="text-foreground">Legal Authorities:</strong> When required by law or to protect our rights and safety</li>
                <li><strong className="text-foreground">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We ensure that all third parties are bound by confidentiality obligations and comply with POPIA requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cross-Border Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your personal information may be processed on servers located outside of South Africa.
                When we transfer data internationally, we ensure appropriate safeguards are in place to
                protect your information in accordance with POPIA requirements, including contractual
                agreements with service providers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your experience. For detailed information
                about our use of cookies, please see our{" "}
                <Link href="/legal/cookies" className="text-primary hover:underline font-medium">
                  Cookie Policy
                </Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Notice</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this POPIA Compliance Notice from time to time. We will notify you of any
                material changes via email or through the platform. Your continued use of our services
                after such notification constitutes acceptance of the updated notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Exercising Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To exercise any of your rights under POPIA, please contact us at:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Email: syniq.store@gmail.com</li>
                <li>Subject Line: "POPIA Data Subject Request"</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We will respond to your request within a reasonable timeframe as required by POPIA.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information Regulator</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you believe we have not complied with POPIA, you have the right to lodge a complaint
                with the Information Regulator (South Africa):
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Website: <a href="https://www.justice.gov.za/inforeg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.justice.gov.za/inforeg</a></li>
                <li>Email: inforeg@justice.gov.za</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this POPIA Compliance Notice or our data practices,
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
