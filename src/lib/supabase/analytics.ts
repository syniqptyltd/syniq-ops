"use server"

import { createServerSupabaseClient } from "./server"

export async function getDashboardAnalytics() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      revenueData: [],
      jobsData: [],
      invoicesData: [],
      recentActivity: [],
    }
  }

  // Get job status distribution
  const { data: allJobs } = await supabase.from("jobs").select("status").eq("user_id", user.id)

  const jobsData = [
    {
      name: "Pending",
      value: allJobs?.filter((j) => j.status === "pending").length || 0,
      color: "#f59e0b",
    },
    {
      name: "In Progress",
      value: allJobs?.filter((j) => j.status === "in_progress").length || 0,
      color: "#3b82f6",
    },
    {
      name: "Completed",
      value: allJobs?.filter((j) => j.status === "completed").length || 0,
      color: "#10b981",
    },
  ]

  // Get invoice status distribution
  const { data: allInvoices } = await supabase.from("invoices").select("status, amount").eq("user_id", user.id)

  const invoicesData = [
    {
      name: "Paid",
      value: allInvoices?.filter((i) => i.status === "paid").length || 0,
      color: "#10b981",
    },
    {
      name: "Unpaid",
      value: allInvoices?.filter((i) => i.status === "unpaid").length || 0,
      color: "#f59e0b",
    },
    {
      name: "Overdue",
      value: allInvoices?.filter((i) => i.status === "overdue").length || 0,
      color: "#ef4444",
    },
  ]

  // Generate last 6 months revenue and expense data
  const revenueData = await Promise.all(
    Array.from({ length: 6 }, async (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (5 - i))

      // Get start and end of month
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59)

      // Get paid invoices for this month
      const { data: monthInvoices } = await supabase
        .from("invoices")
        .select("amount")
        .eq("user_id", user.id)
        .eq("status", "paid")
        .gte("created_at", startOfMonth.toISOString())
        .lte("created_at", endOfMonth.toISOString())

      const revenue = monthInvoices?.reduce((sum, inv) => sum + inv.amount, 0) || 0

      // Get expenses for this month
      const { data: monthExpenses } = await supabase
        .from("expenses")
        .select("amount")
        .eq("user_id", user.id)
        .gte("expense_date", startOfMonth.toISOString().split("T")[0])
        .lte("expense_date", endOfMonth.toISOString().split("T")[0])

      const expenses = monthExpenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0

      return {
        month: date.toLocaleDateString("en-US", { month: "short" }),
        revenue: revenue,
        expenses: expenses,
      }
    })
  )

  // Get recent activity
  const [recentInvoices, recentJobs, recentClients] = await Promise.all([
    supabase
      .from("invoices")
      .select("id, invoice_number, status, created_at, clients(name)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("jobs")
      .select("id, title, status, created_at, clients(name)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("clients")
      .select("id, name, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(2),
  ])

  const recentActivity = [
    ...(recentInvoices.data?.map((inv: any) => ({
      id: inv.id,
      type: "invoice" as const,
      title: `Invoice ${inv.invoice_number}`,
      description: `Created for ${inv.clients?.name || "client"}`,
      timestamp: inv.created_at,
      status: inv.status === "paid" ? ("success" as const) : ("pending" as const),
    })) || []),
    ...(recentJobs.data?.map((job: any) => ({
      id: job.id,
      type: "job" as const,
      title: job.title,
      description: `For ${job.clients?.name || "client"}`,
      timestamp: job.created_at,
      status: job.status === "completed" ? ("success" as const) : ("pending" as const),
    })) || []),
    ...(recentClients.data?.map((client: any) => ({
      id: client.id,
      type: "client" as const,
      title: `New client: ${client.name}`,
      description: "Added to your client list",
      timestamp: client.created_at,
      status: "success" as const,
    })) || []),
  ]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 8)

  return {
    revenueData,
    jobsData,
    invoicesData,
    recentActivity,
  }
}
