"use server"

import { createServerSupabaseClient } from "./server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function signIn(email: string, password: string) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Return success without redirect - let the client handle it
  revalidatePath("/dashboard", "layout")
  return { success: true }
}

export async function signUp(email: string, password: string, businessName: string) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        business_name: businessName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Check if email confirmation is required
  // If user session exists immediately, email confirmation is disabled
  if (data?.session) {
    return {
      success: true,
      message: "Account created successfully! You can now log in.",
      autoConfirmed: true
    }
  }

  // Email confirmation is required
  return {
    success: true,
    message: "Check your email to confirm your account",
    autoConfirmed: false
  }
}

export async function signOut() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect("/login")
}

export async function getUser() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

export async function updateProfile(data: {
  full_name?: string
  email?: string
  phone?: string
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("profiles").update(data).eq("id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/settings")
  return { success: true }
}

export async function updateOrganization(data: {
  business_name?: string
  business_email?: string
  business_phone?: string
  business_address?: string
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("organizations").update(data).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/settings")
  return { success: true }
}

export async function getClients() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.error("No authenticated user")
    return []
  }

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching clients:", error)
    return []
  }

  return data || []
}

export async function createClient(clientData: {
  name: string
  email: string
  phone: string
  notes?: string
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("clients").insert({
    ...clientData,
    user_id: user.id,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/clients")
  return { success: true }
}

export async function updateClient(
  id: string,
  clientData: {
    name?: string
    email?: string
    phone?: string
    notes?: string
  },
) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("clients").update(clientData).eq("id", id).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/clients")
  return { success: true }
}

export async function deleteClient(id: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("clients").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/clients")
  return { success: true }
}

export async function getJobs() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.error("No authenticated user")
    return []
  }

  const { data, error } = await supabase
    .from("jobs")
    .select(`
      *,
      clients (
        id,
        name
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching jobs:", error)
    return []
  }

  return data || []
}

export async function createJob(jobData: {
  title: string
  client_id: string
  status: string
  due_date: string
  description?: string
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("jobs").insert({
    ...jobData,
    user_id: user.id,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/jobs")
  return { success: true }
}

export async function updateJob(
  id: string,
  jobData: {
    title?: string
    client_id?: string
    status?: string
    due_date?: string
    description?: string
  },
) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("jobs").update(jobData).eq("id", id).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/jobs")
  return { success: true }
}

export async function deleteJob(id: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("jobs").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/jobs")
  return { success: true }
}

export async function getInvoices() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.error("No authenticated user")
    return []
  }

  const { data, error } = await supabase
    .from("invoices")
    .select(`
      *,
      clients (
        id,
        name,
        email,
        phone,
        billing_address,
        billing_city,
        billing_postal_code,
        billing_country
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching invoices:", error)
    return []
  }

  return data || []
}

export async function createInvoice(invoiceData: {
  invoice_number: string
  client_id: string
  amount: number
  status: string
  due_date: string
  line_items: any[]
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("invoices").insert({
    ...invoiceData,
    user_id: user.id,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/invoices")
  return { success: true }
}

export async function updateInvoice(
  id: string,
  invoiceData: {
    client_id?: string
    amount?: number
    status?: string
    due_date?: string
    line_items?: any[]
  },
) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("invoices").update(invoiceData).eq("id", id).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/invoices")
  return { success: true }
}

export async function deleteInvoice(id: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("invoices").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/invoices")
  return { success: true }
}

export async function getDashboardStats() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      totalClients: 0,
      activeJobs: 0,
      outstandingInvoices: 0,
      outstandingAmount: 0,
      monthlyRevenue: 0,
    }
  }

  // Get counts
  const [clientsRes, jobsRes, invoicesRes] = await Promise.all([
    supabase.from("clients").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "in_progress"),
    supabase
      .from("invoices")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "unpaid"),
  ])

  // Get outstanding invoices total
  const { data: unpaidInvoices } = await supabase
    .from("invoices")
    .select("amount")
    .eq("user_id", user.id)
    .eq("status", "unpaid")

  const outstandingAmount = unpaidInvoices?.reduce((sum, inv) => sum + inv.amount, 0) || 0

  // Get monthly revenue (current month paid invoices based on created_at)
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { data: paidInvoices } = await supabase
    .from("invoices")
    .select("amount")
    .eq("user_id", user.id)
    .eq("status", "paid")
    .gte("created_at", startOfMonth.toISOString())

  const monthlyRevenue = paidInvoices?.reduce((sum, inv) => sum + inv.amount, 0) || 0

  // Get monthly expenses (current month expenses)
  const { data: monthExpenses } = await supabase
    .from("expenses")
    .select("amount")
    .eq("user_id", user.id)
    .gte("expense_date", startOfMonth.toISOString().split("T")[0])

  const monthlyExpenses = monthExpenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0

  return {
    totalClients: clientsRes.count || 0,
    activeJobs: jobsRes.count || 0,
    outstandingInvoices: invoicesRes.count || 0,
    outstandingAmount,
    monthlyRevenue,
    monthlyExpenses,
  }
}

// ========================================
// User Profile Actions
// ========================================

export async function getUserProfile() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows returned
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

export async function createUserProfile(profileData: any) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase.from("user_profiles").insert({
    user_id: user.id,
    ...profileData,
  })

  if (error) {
    console.error("Error creating user profile:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function updateUserProfile(profileData: any) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase
    .from("user_profiles")
    .update({
      ...profileData,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id)

  if (error) {
    console.error("Error updating user profile:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function upsertUserProfile(profileData: any) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase.from("user_profiles").upsert(
    {
      user_id: user.id,
      ...profileData,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id",
    }
  )

  if (error) {
    console.error("Error upserting user profile:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

// ========================================
// Expense Management
// ========================================

export async function getExpenses() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .order("expense_date", { ascending: false })

  if (error) {
    console.error("Error fetching expenses:", error)
    return { error: error.message }
  }

  return data
}

export async function createExpense(expenseData: any) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { data, error } = await supabase.from("expenses").insert({
    user_id: user.id,
    ...expenseData,
  }).select().single()

  if (error) {
    console.error("Error creating expense:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/expenses")
  revalidatePath("/dashboard")
  return data
}

export async function updateExpense(id: string, expenseData: any) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { data, error } = await supabase
    .from("expenses")
    .update({
      ...expenseData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) {
    console.error("Error updating expense:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/expenses")
  revalidatePath("/dashboard")
  return data
}

export async function deleteExpense(id: string) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase.from("expenses").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    console.error("Error deleting expense:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/expenses")
  revalidatePath("/dashboard")
  return { success: true }
}

