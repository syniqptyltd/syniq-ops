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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">Track and manage your business expenses</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{expenses.length} expenses recorded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VAT Claimable</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {totalVatClaimable.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {expenses.filter((e) => e.is_vat_claimable).length} claimable expenses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
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
            </div>
            <p className="text-xs text-muted-foreground">Current month expenses</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
          <CardDescription>View and manage all your business expenses</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">Loading expenses...</p>
            </div>
          ) : expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No expenses yet</p>
              <Button onClick={handleCreate}>
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
                          <div className="text-xs text-muted-foreground">Ref: {expense.reference_number}</div>
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
                          <span className="text-muted-foreground">-</span>
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
