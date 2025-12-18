import { Users, Briefcase, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Users,
    title: "Client Management",
    description:
      "Keep all your client information organized and accessible. Track contact details, history, and communications in one central location.",
  },
  {
    icon: Briefcase,
    title: "Job Tracking",
    description:
      "Monitor project progress from start to finish. Assign tasks, set deadlines, and ensure nothing falls through the cracks.",
  },
  {
    icon: FileText,
    title: "Professional Invoicing",
    description:
      "Create and send professional invoices in minutes. Track payments, manage outstanding balances, and get paid faster.",
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
            Powerful features designed specifically for small business owners
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
