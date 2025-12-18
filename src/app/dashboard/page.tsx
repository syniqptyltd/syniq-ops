import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, FileText, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Receipt } from "lucide-react"
import { getDashboardStats } from "@/lib/supabase/actions"
import { getDashboardAnalytics } from "@/lib/supabase/analytics"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentActivity } from "@/components/recent-activity"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const [stats, analytics] = await Promise.all([getDashboardStats(), getDashboardAnalytics()])

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your business.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/invoices">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <div className="flex items-center text-xs mt-1">
              {trends.clients.isPositive ? (
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={trends.clients.isPositive ? "text-green-500" : "text-red-500"}>
                {trends.clients.value}%
              </span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeJobs}</div>
            <div className="flex items-center text-xs mt-1">
              {trends.jobs.isPositive ? (
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={trends.jobs.isPositive ? "text-green-500" : "text-red-500"}>{trends.jobs.value}%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.outstandingInvoices}</div>
            <p className="text-xs text-muted-foreground mt-1">{formatCurrency(stats.outstandingAmount)} unpaid</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(stats.monthlyRevenue)}</div>
            <div className="flex items-center text-xs mt-1">
              {trends.revenue.isPositive ? (
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={trends.revenue.isPositive ? "text-green-500" : "text-red-500"}>
                {trends.revenue.value}%
              </span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatCurrency(stats.monthlyExpenses || 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Net: {formatCurrency(stats.monthlyRevenue - (stats.monthlyExpenses || 0))}
            </p>
          </CardContent>
        </Card>
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
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to keep your business running smoothly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/dashboard/clients">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Add New Client
              </Button>
            </Link>
            <Link href="/dashboard/jobs">
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="mr-2 h-4 w-4" />
                Create Job
              </Button>
            </Link>
            <Link href="/dashboard/invoices">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Send Invoice
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
