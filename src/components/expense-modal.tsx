"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

type Expense = {
  id?: string
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
}

type ExpenseModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  expense?: Expense
  onSave: (expense: Expense) => Promise<void>
}

const DEFAULT_CATEGORIES = [
  "Materials & Supplies",
  "Tools & Equipment",
  "Vehicle Expenses",
  "Fuel & Mileage",
  "Subcontractors",
  "Labor Costs",
  "Professional Services",
  "Software & Subscriptions",
  "Marketing & Advertising",
  "Office Expenses",
  "Rent & Utilities",
  "Insurance",
  "Licenses & Permits",
  "Training & Education",
  "Repairs & Maintenance",
  "Travel & Accommodation",
  "Meals & Entertainment",
  "Bank Fees",
  "Telecommunications",
  "Safety Equipment",
  "Waste Disposal",
  "Other",
]

const PAYMENT_METHODS = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Cheque",
  "Other",
]

export function ExpenseModal({ open, onOpenChange, expense, onSave }: ExpenseModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Expense>(() => {
    if (expense) {
      return expense
    }
    return {
      description: "",
      amount: 0,
      category: "",
      expense_date: new Date().toISOString().split("T")[0],
      vendor: null,
      payment_method: null,
      reference_number: null,
      notes: null,
      is_vat_claimable: false,
      vat_amount: 0,
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate required fields
      if (!formData.description || !formData.amount || !formData.category) {
        toast.error("Please fill in all required fields")
        return
      }

      if (formData.amount <= 0) {
        toast.error("Amount must be greater than 0")
        return
      }

      await onSave(formData)
      toast.success(expense ? "Expense updated successfully" : "Expense created successfully")
      onOpenChange(false)

      // Reset form if creating new expense
      if (!expense) {
        setFormData({
          description: "",
          amount: 0,
          category: "",
          expense_date: new Date().toISOString().split("T")[0],
          vendor: null,
          payment_method: null,
          reference_number: null,
          notes: null,
          is_vat_claimable: false,
          vat_amount: 0,
        })
      }
    } catch (error) {
      console.error("Error saving expense:", error)
      toast.error("Failed to save expense")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{expense ? "Edit Expense" : "Add New Expense"}</DialogTitle>
          <DialogDescription>
            {expense ? "Update expense details below" : "Enter expense details below"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Description */}
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Input
                id="description"
                placeholder="Office supplies, software license, etc."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={isLoading}
                required
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">
                Amount (R) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount || ""}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                disabled={isLoading}
                required
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="expense_date">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="expense_date"
                type="date"
                value={formData.expense_date}
                onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
                disabled={isLoading}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                disabled={isLoading}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Vendor */}
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor</Label>
              <Input
                id="vendor"
                placeholder="Company or vendor name"
                value={formData.vendor || ""}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value || null })}
                disabled={isLoading}
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label htmlFor="payment_method">Payment Method</Label>
              <Select
                value={formData.payment_method || ""}
                onValueChange={(value) => setFormData({ ...formData, payment_method: value || null })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reference Number */}
            <div className="space-y-2">
              <Label htmlFor="reference_number">Reference Number</Label>
              <Input
                id="reference_number"
                placeholder="Invoice #, receipt #, etc."
                value={formData.reference_number || ""}
                onChange={(e) => setFormData({ ...formData, reference_number: e.target.value || null })}
                disabled={isLoading}
              />
            </div>

            {/* VAT Claimable */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 pt-7">
                <Checkbox
                  id="is_vat_claimable"
                  checked={formData.is_vat_claimable}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_vat_claimable: checked as boolean })
                  }
                  disabled={isLoading}
                />
                <Label htmlFor="is_vat_claimable" className="font-normal cursor-pointer text-sm">
                  VAT Claimable
                </Label>
              </div>
            </div>

            {/* VAT Amount */}
            {formData.is_vat_claimable && (
              <div className="space-y-2">
                <Label htmlFor="vat_amount">VAT Amount (R)</Label>
                <Input
                  id="vat_amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.vat_amount || ""}
                  onChange={(e) => setFormData({ ...formData, vat_amount: parseFloat(e.target.value) || 0 })}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  Amount of VAT to claim back (usually 15% of total)
                </p>
              </div>
            )}

            {/* Notes */}
            <div className="col-span-2 space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about this expense..."
                value={formData.notes || ""}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value || null })}
                disabled={isLoading}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : expense ? "Update Expense" : "Add Expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
