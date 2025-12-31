import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, FileText, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Receipt, Clock, CheckCircle } from "lucide-react"
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

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-teal-600 to-slate-900 bg-clip-text text-transparent">
            {userProfile?.business_name ? `Welcome back, ${userProfile.business_name}` : "Dashboard"}
          </h1>
          <p className="text-sm text-slate-600 mt-2">Here's what's happening with your business today</p>
        </div>
        <Link href="/dashboard/invoices">
          <Button size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-lg text-white">
            <FileText className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </Link>
      </div>

      {/* Top Stats Grid - 4 Columns */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Clients */}
        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-teal-50/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-gradient-to-br from-teal-500/20 to-teal-500/10">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${trends.clients.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {trends.clients.isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                <span>{trends.clients.value}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Clients</p>
              <p className="text-3xl font-bold tracking-tight text-slate-900">{stats.totalClients}</p>
            </div>
          </CardContent>
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-teal-500/10 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
        </Card>

        {/* Active Jobs */}
        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-cyan-50/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10">
                <Briefcase className="h-6 w-6 text-cyan-600" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${trends.jobs.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {trends.jobs.isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                <span>{trends.jobs.value}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Active Jobs</p>
              <p className="text-3xl font-bold tracking-tight text-slate-900">{stats.activeJobs}</p>
            </div>
          </CardContent>
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-cyan-500/10 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
        </Card>

        {/* Outstanding Invoices */}
        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-amber-50/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-gradient-to-br from-amber-500/20 to-amber-500/10">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Pending Payment</p>
              <p className="text-3xl font-bold tracking-tight text-slate-900">{stats.outstandingInvoices}</p>
              <p className="text-xs text-slate-600 mt-1">{formatCurrency(stats.outstandingAmount)} unpaid</p>
            </div>
          </CardContent>
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-amber-500/10 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
        </Card>

        {/* Monthly Revenue */}
        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-500 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-white/20 backdrop-blur-sm">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-white/90">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>{trends.revenue.value}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-white/80 mb-1">Monthly Revenue</p>
              <p className="text-3xl font-bold tracking-tight text-white">{formatCurrency(stats.monthlyRevenue)}</p>
            </div>
          </CardContent>
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-teal-500/30 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
        </Card>
      </div>

      {/* Main Content Grid - 2 Columns */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Charts & Analytics (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Chart */}
          <Card className="relative overflow-hidden rounded-2xl border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CardHeader className="border-b border-slate-200 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Revenue Overview</CardTitle>
                  <CardDescription className="mt-1.5 text-slate-600">Track your financial performance over time</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <DashboardCharts
                revenueData={analytics.revenueData}
                jobsData={analytics.jobsData}
                invoicesData={analytics.invoicesData}
              />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="relative overflow-hidden rounded-2xl border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CardHeader className="border-b border-slate-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-900">Recent Activity</CardTitle>
                <Link href="/dashboard/activity" className="text-sm text-teal-600 hover:underline">
                  View all
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <RecentActivity activities={analytics.recentActivity} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Quick Actions & Summary */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-slate-50/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-xl font-bold text-slate-900">Quick Actions</CardTitle>
              <CardDescription className="text-slate-600">Common tasks at your fingertips</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Link href="/dashboard/clients">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4 px-4 border-2 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-500/10 p-2.5">
                        <Users className="h-5 w-5 text-teal-600" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-sm text-slate-900">Add Client</div>
                        <div className="text-xs text-slate-600">Create new profile</div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Button>
                </Link>

                <Link href="/dashboard/jobs">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4 px-4 border-2 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 p-2.5">
                        <Briefcase className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-sm text-slate-900">Create Job</div>
                        <div className="text-xs text-slate-600">Start new project</div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Button>
                </Link>

                <Link href="/dashboard/invoices">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4 px-4 border-2 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/10 p-2.5">
                        <FileText className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-sm text-slate-900">Send Invoice</div>
                        <div className="text-xs text-slate-600">Generate & send</div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card className="relative overflow-hidden rounded-2xl border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-xl font-bold text-slate-900">Financial Summary</CardTitle>
              <CardDescription className="text-slate-600">This month's overview</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-5">
                {/* Revenue */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg p-2 bg-emerald-500/10">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Revenue</p>
                      <p className="text-lg font-bold text-slate-900">{formatCurrency(stats.monthlyRevenue)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>+{trends.revenue.value}%</span>
                  </div>
                </div>

                {/* Expenses */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg p-2 bg-red-500/10">
                      <Receipt className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Expenses</p>
                      <p className="text-lg font-bold text-slate-900">{formatCurrency(stats.monthlyExpenses || 0)}</p>
                    </div>
                  </div>
                </div>

                {/* Net Profit */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg p-2 bg-gradient-to-br from-teal-500/20 to-cyan-500/20">
                      <DollarSign className="h-4 w-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Net Profit</p>
                      <p className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        {formatCurrency(stats.monthlyRevenue - (stats.monthlyExpenses || 0))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
