import { Users, Briefcase, FileText, Receipt, Calculator, TrendingUp, Sparkles } from "lucide-react"
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
  const gradients = [
    "from-primary/10 to-primary/5",
    "from-secondary/10 to-secondary/5",
    "from-primary/10 via-secondary/5 to-primary/5",
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-muted/50 via-background to-accent/10 py-24 sm:py-32">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary opacity-5 blur-[120px]" />
        <div className="absolute left-0 bottom-1/4 h-[500px] w-[500px] rounded-full bg-secondary opacity-5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            Powerful Features
          </div>
          <h2 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-balance text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Everything you need to run your business
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Powerful features designed specifically for South African service businesses
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const gradient = gradients[index % gradients.length]
            const colors = index % 2 === 0
              ? { icon: "from-primary to-primary/80", ring: "ring-primary/10" }
              : { icon: "from-secondary to-secondary/80", ring: "ring-secondary/10" }

            return (
              <Card
                key={feature.title}
                className={`group relative overflow-hidden border-2 border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 ${
                  feature.title === "Professional Invoicing" ? "lg:col-span-1 ring-2 ring-primary/20" : ""
                }`}
              >
                {/* Gradient accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${colors.icon}`} />

                <CardContent className="p-8">
                  {/* Icon with gradient background */}
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.icon} text-white shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/30`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-card-foreground">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                </CardContent>

                {/* Animated gradient overlay on hover */}
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                {/* Corner accent */}
                <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-primary opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
