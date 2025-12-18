import { Users, Briefcase, FileText, Receipt, Calculator, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Users,
    title: "Client Management",
    description:
      "Keep all your client information organized with billing details, VAT numbers, and complete contact history in one central location.",
  },
  {
    icon: Briefcase,
    title: "Job Line Items",
    description:
      "Create detailed job breakdowns with separate line items for labor, materials, and services. Give clients complete transparency.",
  },
  {
    icon: FileText,
    title: "Professional Invoicing",
    description:
      "Generate VAT-compliant invoices with detailed cost breakdowns. Track payments, manage outstanding balances, and get paid faster.",
  },
  {
    icon: Receipt,
    title: "Expense Tracking",
    description:
      "Track all business expenses by category with VAT claimable amounts. Perfect for service businesses with materials and subcontractors.",
  },
  {
    icon: Calculator,
    title: "Financial Accounting",
    description:
      "Built-in profit & loss statements, expense categorization, and financial health indicators to keep your business profitable.",
  },
  {
    icon: TrendingUp,
    title: "Business Analytics",
    description:
      "Visual charts and insights showing revenue trends, expense patterns, and monthly performance to help you make informed decisions.",
  },
]

export function Features() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to run your business
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Powerful features designed specifically for South African service businesses
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="group relative overflow-hidden border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50"
              >
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                </CardContent>
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
