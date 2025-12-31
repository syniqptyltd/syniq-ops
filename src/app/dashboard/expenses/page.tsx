"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ExpenseModal } from "@/components/expense-modal"
import { getExpenses, createExpense, updateExpense, deleteExpense } from "@/lib/supabase/actions"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Receipt } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type Expense = {
  id: string
  description: string
  amount: number
  category: string
  expense_date: string
  vendor: string | null
  payment_method: string | null
  reference_number: string | null
  notes: string | null
  is_vat_claimable: boolean
  vat_amount: number
  created_at: string
  updated_at: string
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>()
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null)

  const loadExpenses = async () => {
    setIsLoading(true)
    const data = await getExpenses()
    if (Array.isArray(data)) {
      setExpenses(data)
    } else if (data?.error) {
      toast.error(data.error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadExpenses()
  }, [])

  const handleCreate = () => {
    setSelectedExpense(undefined)
    setModalOpen(true)
  }

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense)
    setModalOpen(true)
  }

  const handleSave = async (expenseData: any) => {
    if (selectedExpense) {
      // Update existing expense
      const result = await updateExpense(selectedExpense.id, expenseData)
      if (result?.error) {
        throw new Error(result.error)
      }
    } else {
      // Create new expense
      const result = await createExpense(expenseData)
      if (result?.error) {
        throw new Error(result.error)
      }
    }
    await loadExpenses()
  }

  const handleDeleteClick = (id: string) => {
    setExpenseToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!expenseToDelete) return

    const result = await deleteExpense(expenseToDelete)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Expense deleted successfully")
      await loadExpenses()
    }
    setDeleteDialogOpen(false)
    setExpenseToDelete(null)
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const totalVatClaimable = expenses
    .filter((exp) => exp.is_vat_claimable)
    .reduce((sum, exp) => sum + exp.vat_amount, 0)

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-teal-600 to-slate-900 bg-clip-text text-transparent">
            Expenses
          </h1>
          <p className="text-sm text-slate-600 mt-2">Track and manage your business expenses</p>
        </div>
        <Button onClick={handleCreate} size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-lg text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-teal-50/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-gradient-to-br from-teal-500/20 to-teal-500/10">
                <Receipt className="h-6 w-6 text-teal-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Expenses</p>
              <p className="text-3xl font-bold tracking-tight text-slate-900">R {totalExpenses.toLocaleString()}</p>
              <p className="text-xs text-slate-600 mt-1">{expenses.length} expenses recorded</p>
            </div>
          </CardContent>
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-teal-500/10 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
        </Card>

        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-cyan-50/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10">
                <Receipt className="h-6 w-6 text-cyan-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">VAT Claimable</p>
              <p className="text-3xl font-bold tracking-tight text-slate-900">R {totalVatClaimable.toLocaleString()}</p>
              <p className="text-xs text-slate-600 mt-1">
                {expenses.filter((e) => e.is_vat_claimable).length} claimable expenses
              </p>
            </div>
          </CardContent>
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-cyan-500/10 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
        </Card>

        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-amber-50/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-gradient-to-br from-amber-500/20 to-amber-500/10">
                <Receipt className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">This Month</p>
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                R{" "}
                {expenses
                  .filter((exp) => {
                    const expDate = new Date(exp.expense_date)
                    const now = new Date()
                    return (
                      expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear()
                    )
                  })
                  .reduce((sum, exp) => sum + exp.amount, 0)
                  .toLocaleString()}
              </p>
              <p className="text-xs text-slate-600 mt-1">Current month expenses</p>
            </div>
          </CardContent>
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-amber-500/10 to-transparent blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70 -z-10" />
        </Card>
      </div>

      <Card className="relative overflow-hidden rounded-2xl border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-xl font-bold text-slate-900">Expense History</CardTitle>
          <CardDescription className="text-slate-600">View and manage all your business expenses</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-slate-600">Loading expenses...</p>
            </div>
          ) : expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Receipt className="h-12 w-12 text-slate-600 mb-4" />
              <p className="text-slate-600 mb-4">No expenses yet</p>
              <Button onClick={handleCreate} className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Expense
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>VAT</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="whitespace-nowrap">
                        {new Date(expense.expense_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{expense.description}</div>
                        {expense.reference_number && (
                          <div className="text-xs text-slate-600">Ref: {expense.reference_number}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{expense.category}</Badge>
                      </TableCell>
                      <TableCell>{expense.vendor || "-"}</TableCell>
                      <TableCell>{expense.payment_method || "-"}</TableCell>
                      <TableCell className="text-right font-medium">
                        R {expense.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {expense.is_vat_claimable ? (
                          <Badge variant="default" className="bg-green-600">
                            R {expense.vat_amount.toLocaleString()}
                          </Badge>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(expense)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(expense.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <ExpenseModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        expense={selectedExpense}
        onSave={handleSave}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this expense? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
