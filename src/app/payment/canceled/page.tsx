import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentCanceledPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 mb-6">
                  <XCircle className="h-10 w-10 text-orange-600" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Payment Canceled
                </h1>
                <p className="text-muted-foreground mb-6">
                  Your payment was canceled. No charges have been made.
                </p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
