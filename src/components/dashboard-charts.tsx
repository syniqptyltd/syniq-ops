"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type RevenueData = {
  month: string
  revenue: number
  expenses: number
}

type StatusData = {
  name: string
  value: number
  color: string
}

type ChartProps = {
  revenueData: RevenueData[]
  jobsData: StatusData[]
  invoicesData: StatusData[]
}

export function DashboardCharts({ revenueData, jobsData, invoicesData }: ChartProps) {
  const COLORS = {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Revenue Trend */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue and expenses over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.danger} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={COLORS.danger} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
                formatter={(value: number) => `R ${value.toLocaleString()}`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={COLORS.primary}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke={COLORS.danger}
                fillOpacity={1}
                fill="url(#colorExpenses)"
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Jobs Status */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs by Status</CardTitle>
          <CardDescription>Distribution of your current jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={jobsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {jobsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Invoice Status */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Status</CardTitle>
          <CardDescription>Payment status breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={invoicesData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {invoicesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
