import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Target, Zap, Globe, Shield } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: CheckCircle2,
      title: "Clear",
      description: "Easy to understand and use"
    },
    {
      icon: Shield,
      title: "Reliable",
      description: "Dependable in day-to-day operations"
    },
    {
      icon: Zap,
      title: "Practical",
      description: "Designed for real workflows, not theory"
    },
    {
      icon: Target,
      title: "Scalable",
      description: "Able to grow with your business"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex-1 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/20">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-primary opacity-10 blur-[120px] animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-secondary opacity-10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <Globe className="h-4 w-4" />
              About Syniq
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Building Software That Works
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Practical tools for service businesses that want to run smarter, not harder
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8 mb-16">
            <Card className="border-2 border-primary/20 shadow-2xl shadow-primary/10 backdrop-blur-sm">
              <CardContent className="p-8 sm:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-foreground mb-6">
                    Syniq builds practical software for service businesses that want to run smarter, not harder.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground mb-6">
                    We focus on the everyday operations that quietly make or break a business — job management, invoicing, payments, and reporting — and bring them together into one simple, reliable platform. No unnecessary features. No complexity for the sake of it. Just tools that work the way real businesses do.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground mb-6">
                    Syniq was built with service-based businesses in mind, especially those operating in fast-moving, resource-constrained environments. We understand the pressure of managing clients, cash flow, and teams while still delivering quality work. Our goal is to remove friction from those processes so business owners can focus on growth, not admin.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Values Section */}
            <div>
              <h2 className="text-2xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  We believe good software should be:
                </span>
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {values.map((value) => {
                  const Icon = value.icon
                  return (
                    <Card key={value.title} className="border-2 border-primary/10 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{value.title}</h3>
                            <p className="text-muted-foreground">{value.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Closing Statement */}
            <Card className="border-2 border-secondary/20 shadow-2xl shadow-secondary/10 backdrop-blur-sm">
              <CardContent className="p-8 sm:p-12 text-center">
                <p className="text-base leading-relaxed text-muted-foreground mb-4">
                  Syniq is proudly built in South Africa, with a global mindset and local realities in mind.
                </p>
                <p className="text-lg font-semibold text-foreground">
                  We're committed to building long-term tools that businesses can trust as they grow.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
