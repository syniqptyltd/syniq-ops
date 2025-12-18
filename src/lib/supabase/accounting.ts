"use server"

import { createServerSupabaseClient } from "./server"

export async function getAccountingData() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      totalRevenue: 0,
      totalExpenses: 0,
      paidInvoiceCount: 0,
      expenseCount: 0,
      expensesByCategory: [],
      totalVatClaimable: 0,
      vatClaimableCount: 0,
    }
  }

  // Get all paid invoices for total revenue
  const { data: paidInvoices } = await supabase
    .from("invoices")
    .select("amount")
    .eq("user_id", user.id)
    .eq("status", "paid")

  const totalRevenue = paidInvoices?.reduce((sum, inv) => sum + inv.amount, 0) || 0
  const paidInvoiceCount = paidInvoices?.length || 0

  // Get all expenses
  const { data: expenses } = await supabase
    .from("expenses")
    .select("amount, category, is_vat_claimable, vat_amount")
    .eq("user_id", user.id)

  const totalExpenses = expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0
  const expenseCount = expenses?.length || 0

  // Get VAT claimable expenses
  const totalVatClaimable =
    expenses
      ?.filter((exp) => exp.is_vat_claimable)
      .reduce((sum, exp) => sum + exp.vat_amount, 0) || 0

  const vatClaimableCount = expenses?.filter((exp) => exp.is_vat_claimable).length || 0

  // Group expenses by category
  const expensesByCategory: { category: string; total: number }[] = []
  if (expenses && expenses.length > 0) {
    const categoryMap = new Map<string, number>()

    expenses.forEach((exp) => {
      const current = categoryMap.get(exp.category) || 0
      categoryMap.set(exp.category, current + exp.amount)
    })

    categoryMap.forEach((total, category) => {
      expensesByCategory.push({ category, total })
    })

    // Sort by total descending
    expensesByCategory.sort((a, b) => b.total - a.total)
  }

  return {
    totalRevenue,
    totalExpenses,
    paidInvoiceCount,
    expenseCount,
    expensesByCategory,
    totalVatClaimable,
    vatClaimableCount,
  }
}
