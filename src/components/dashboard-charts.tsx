"use client"

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
    <div className="p-6">
      {/* Revenue Trend - Large Chart */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
            <XAxis
              dataKey="month"
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
            />
            <YAxis
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              tickFormatter={(value) => `R${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value: number) => `R ${value.toLocaleString()}`}
              labelStyle={{ fontWeight: 600, marginBottom: "8px" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={COLORS.primary}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke={COLORS.secondary}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorExpenses)"
              name="Expenses"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Jobs & Invoices - Side by Side */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Jobs Status */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Jobs by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={jobsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                stroke="hsl(var(--card))"
              >
                {jobsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Invoice Status */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Invoice Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={invoicesData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
              <XAxis
                dataKey="name"
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
              />
              <YAxis
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                cursor={{ fill: "hsl(var(--muted)/0.2)" }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {invoicesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
