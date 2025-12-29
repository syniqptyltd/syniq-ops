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
    primary: "#355E58",      // Dark teal
    secondary: "#72B0AB",    // Light teal
    accent: "#CFB97E",       // Gold
    destructive: "#FE9179",  // Coral
    chart1: "#72B0AB",       // Light teal
    chart2: "#FE9179",       // Coral
    chart3: "#CFB97E",       // Gold
    chart4: "#B89D47",       // Dark gold
    chart5: "#355E58",       // Dark teal
  }

  return (
    <div className="p-6">
      {/* Revenue Trend - Large Chart */}
      <div className="mb-8">
        <h3 className="text-base font-bold mb-4 text-foreground">Revenue vs Expenses</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.chart1} stopOpacity={0.4} />
                <stop offset="95%" stopColor={COLORS.chart1} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.chart2} stopOpacity={0.4} />
                <stop offset="95%" stopColor={COLORS.chart2} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#BCDDDC" opacity={0.3} />
            <XAxis
              dataKey="month"
              className="text-xs"
              stroke="#355E58"
              tickLine={false}
              style={{ fontSize: '12px' }}
            />
            <YAxis
              className="text-xs"
              stroke="#355E58"
              tickLine={false}
              tickFormatter={(value) => `R${(value / 1000).toFixed(0)}k`}
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #BCDDDC",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(53, 94, 88, 0.15)",
                padding: "12px",
              }}
              formatter={(value: number) => [`R ${value.toLocaleString()}`, '']}
              labelStyle={{ fontWeight: 600, marginBottom: "8px", color: "#053229" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={COLORS.chart1}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke={COLORS.chart2}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorExpenses)"
              name="Expenses"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Jobs & Invoices - Side by Side */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Jobs Status - Donut Chart */}
        <div>
          <h3 className="text-base font-bold mb-4 text-foreground">Jobs by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={jobsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={3}
                stroke="#ffffff"
              >
                {jobsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #BCDDDC",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(53, 94, 88, 0.15)",
                  padding: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Invoice Status - Rounded Bar Chart */}
        <div>
          <h3 className="text-base font-bold mb-4 text-foreground">Invoice Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={invoicesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#BCDDDC" opacity={0.3} />
              <XAxis
                dataKey="name"
                className="text-xs"
                stroke="#355E58"
                tickLine={false}
                style={{ fontSize: '12px' }}
              />
              <YAxis
                className="text-xs"
                stroke="#355E58"
                tickLine={false}
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #BCDDDC",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(53, 94, 88, 0.15)",
                  padding: "12px",
                }}
                cursor={{ fill: "rgba(188, 221, 220, 0.2)" }}
              />
              <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={60}>
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
