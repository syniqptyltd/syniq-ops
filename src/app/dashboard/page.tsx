import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, FileText, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Receipt } from "lucide-react"
import { getDashboardStats, getUserProfile } from "@/lib/supabase/actions"
import { getDashboardAnalytics } from "@/lib/supabase/analytics"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentActivity } from "@/components/recent-activity"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const [stats, analytics, userProfile] = await Promise.all([
    getDashboardStats(),
    getDashboardAnalytics(),
    getUserProfile(),
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate trends (mock for now - in production, compare with previous period)
  const trends = {
    clients: { value: 12, isPositive: true },
    jobs: { value: 8, isPositive: true },
    invoices: { value: 5, isPositive: false },
    revenue: { value: 15, isPositive: true },
  }

  const statCards = [
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      trend: trends.clients,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      icon: Briefcase,
      trend: trends.jobs,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-600",
    },
    {
      title: "Outstanding Invoices",
      value: stats.outstandingInvoices,
      icon: FileText,
      subtext: `${formatCurrency(stats.outstandingAmount)} unpaid`,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-600",
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(stats.monthlyRevenue),
      icon: TrendingUp,
      trend: trends.revenue,
      highlight: true,
      iconBg: "bg-green-500/10",
      iconColor: "text-green-600",
    },
    {
      title: "Monthly Expenses",
      value: formatCurrency(stats.monthlyExpenses || 0),
      icon: Receipt,
      subtext: `Net: ${formatCurrency(stats.monthlyRevenue - (stats.monthlyExpenses || 0))}`,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-600",
    },
  ]

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {userProfile?.business_name ? `Welcome back, ${userProfile.business_name}!` : "Dashboard"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">Here's an overview of your business performance</p>
        </div>
        <Link href="/dashboard/invoices">
          <Button size="lg" className="shadow-sm">
            <FileText className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </Link>
      </div>

      {/* Stats Cards - Redesigned */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.title}
              className={`group relative overflow-hidden border shadow-sm transition-all hover:shadow-md ${
                stat.highlight ? 'border-l-4 border-l-primary' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`rounded-lg p-2 ${stat.iconBg}`}>
                    <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-2">
                  <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                  {stat.trend && (
                    <div className="flex items-center gap-1 text-xs">
                      {stat.trend.isPositive ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5 text-rose-600" />
                      )}
                      <span className={`font-medium ${stat.trend.isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                        {stat.trend.value}%
                      </span>
                      <span className="text-muted-foreground">vs last month</span>
                    </div>
                  )}
                  {stat.subtext && (
                    <p className="text-xs text-muted-foreground">{stat.subtext}</p>
                  )}
                </div>
              </CardContent>

              {/* Subtle hover gradient */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity group-hover:from-primary/5 group-hover:to-transparent group-hover:opacity-100" />
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <DashboardCharts
        revenueData={analytics.revenueData}
        jobsData={analytics.jobsData}
        invoicesData={analytics.invoicesData}
      />

      {/* Recent Activity */}
      <RecentActivity activities={analytics.recentActivity} />

      {/* Quick Actions */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          <CardDescription className="text-sm">Common tasks to keep your business running smoothly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/clients" className="group">
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-4 px-4 border shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="rounded-lg bg-blue-500/10 p-2.5">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">Add New Client</div>
                    <div className="text-xs text-muted-foreground">Create client profile</div>
                  </div>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/jobs" className="group">
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-4 px-4 border shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="rounded-lg bg-purple-500/10 p-2.5">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">Create Job</div>
                    <div className="text-xs text-muted-foreground">Start new project</div>
                  </div>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/invoices" className="group">
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-4 px-4 border shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="rounded-lg bg-orange-500/10 p-2.5">
                    <FileText className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">Send Invoice</div>
                    <div className="text-xs text-muted-foreground">Generate & send</div>
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
