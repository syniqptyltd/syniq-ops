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

      {/* 3-Column Grid Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Business Analytics */}
        <div className="space-y-6">
          {/* Total Clients Card */}
          <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Total Clients
                </CardTitle>
                <div className="rounded-lg p-2 bg-blue-500/10">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-2">
                <div className="text-2xl font-bold tracking-tight">{stats.totalClients}</div>
                <div className="flex items-center gap-1 text-xs">
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="font-medium text-emerald-600">{trends.clients.value}%</span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </div>
            </CardContent>
            <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-muted/30 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
          </Card>

          {/* Active Jobs Card */}
          <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Active Jobs
                </CardTitle>
                <div className="rounded-lg p-2 bg-purple-500/10">
                  <Briefcase className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-2">
                <div className="text-2xl font-bold tracking-tight">{stats.activeJobs}</div>
                <div className="flex items-center gap-1 text-xs">
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="font-medium text-emerald-600">{trends.jobs.value}%</span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </div>
            </CardContent>
            <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-muted/30 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
          </Card>

          {/* Quick Actions Card */}
          <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              <CardDescription className="text-sm">Common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/dashboard/clients" className="group/action">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-3 px-3 border shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="rounded-lg bg-blue-500/10 p-2">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm">Add New Client</div>
                        <div className="text-xs text-muted-foreground">Create client profile</div>
                      </div>
                    </div>
                  </Button>
                </Link>
                <Link href="/dashboard/jobs" className="group/action">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-3 px-3 border shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="rounded-lg bg-purple-500/10 p-2">
                        <Briefcase className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm">Create Job</div>
                        <div className="text-xs text-muted-foreground">Start new project</div>
                      </div>
                    </div>
                  </Button>
                </Link>
                <Link href="/dashboard/invoices" className="group/action">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-3 px-3 border shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="rounded-lg bg-orange-500/10 p-2">
                        <FileText className="h-4 w-4 text-orange-600" />
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
            <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-muted/30 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
          </Card>
        </div>

        {/* Middle Column: Job Tracking & Activity */}
        <div className="space-y-6">
          {/* Outstanding Invoices Card */}
          <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Outstanding Invoices
                </CardTitle>
                <div className="rounded-lg p-2 bg-orange-500/10">
                  <FileText className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-2">
                <div className="text-2xl font-bold tracking-tight">{stats.outstandingInvoices}</div>
                <p className="text-xs text-muted-foreground">{formatCurrency(stats.outstandingAmount)} unpaid</p>
              </div>
            </CardContent>
            <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-muted/30 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
          </Card>

          {/* Recent Activity */}
          <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity activities={analytics.recentActivity} />
            </CardContent>
            <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-muted/30 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
          </Card>
        </div>

        {/* Right Column: Financial Summary */}
        <div className="space-y-6">
          {/* Monthly Revenue Card */}
          <Card className="group relative overflow-hidden rounded-2xl border-0 border-l-4 border-l-primary bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Monthly Revenue
                </CardTitle>
                <div className="rounded-lg p-2 bg-green-500/10">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-2">
                <div className="text-2xl font-bold tracking-tight">{formatCurrency(stats.monthlyRevenue)}</div>
                <div className="flex items-center gap-1 text-xs">
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="font-medium text-emerald-600">{trends.revenue.value}%</span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </div>
            </CardContent>
            <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-muted/30 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
          </Card>

          {/* Monthly Expenses Card */}
          <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Monthly Expenses
                </CardTitle>
                <div className="rounded-lg p-2 bg-red-500/10">
                  <Receipt className="h-4 w-4 text-red-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-2">
                <div className="text-2xl font-bold tracking-tight">{formatCurrency(stats.monthlyExpenses || 0)}</div>
                <p className="text-xs text-muted-foreground">Net: {formatCurrency(stats.monthlyRevenue - (stats.monthlyExpenses || 0))}</p>
              </div>
            </CardContent>
            <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-muted/30 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
          </Card>

          {/* Charts Card */}
          <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)]">
            <CardContent className="p-0">
              <DashboardCharts
                revenueData={analytics.revenueData}
                jobsData={analytics.jobsData}
                invoicesData={analytics.invoicesData}
              />
            </CardContent>
            <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-muted/30 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
          </Card>
        </div>
      </div>
    </div>
  )
}
