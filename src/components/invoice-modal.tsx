"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { createInvoice, getUserProfile } from "@/lib/supabase/actions"

type LineItem = {
  id: string
  description: string
  quantity: number
  price: number
}

type Client = {
  id: string
  name: string
}

type InvoiceFormData = {
  clientId: string
  lineItems: LineItem[]
  dueDate: string
}

type Invoice = {
  id: string
  client_id: string
  line_items: any[]
  due_date: string
}

type InvoiceModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  clients: Client[]
  invoice?: Invoice | null
  onSave: () => Promise<void>
}

export function InvoiceModal({ open, onOpenChange, clients, invoice, onSave }: InvoiceModalProps) {
  const [formData, setFormData] = useState<InvoiceFormData>({
    clientId: "",
    lineItems: [{ id: "1", description: "", quantity: 1, price: 0 }],
    dueDate: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isVatRegistered, setIsVatRegistered] = useState(false)

  const isEdit = !!invoice?.id

  // Fetch VAT registration status
  useEffect(() => {
    const fetchVatStatus = async () => {
      const userProfile = await getUserProfile()
      setIsVatRegistered(userProfile?.is_vat_registered || false)
    }
    fetchVatStatus()
  }, [])

  // Reset or populate form when modal opens
  useEffect(() => {
    if (open && invoice) {
      // Editing existing invoice
      setFormData({
        clientId: invoice.client_id || "",
        lineItems: invoice.line_items || [{ id: "1", description: "", quantity: 1, price: 0 }],
        dueDate: invoice.due_date || "",
      })
      setErrors({})
    } else if (open && !invoice) {
      // Creating new invoice
      setFormData({
        clientId: "",
        lineItems: [{ id: "1", description: "", quantity: 1, price: 0 }],
        dueDate: "",
      })
      setErrors({})
    }
  }, [open, invoice])

  const addLineItem = () => {
    const newId = String(Date.now())
    setFormData({
      ...formData,
      lineItems: [...formData.lineItems, { id: newId, description: "", quantity: 1, price: 0 }],
    })
  }

  const removeLineItem = (id: string) => {
    if (formData.lineItems.length > 1) {
      setFormData({
        ...formData,
        lineItems: formData.lineItems.filter((item) => item.id !== id),
      })
    }
  }

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setFormData({
      ...formData,
      lineItems: formData.lineItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  const calculateSubtotal = () => {
    return formData.lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }

  const calculateVAT = () => {
    // Only calculate VAT if business is VAT registered
    return isVatRegistered ? calculateSubtotal() * 0.15 : 0
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(amount)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.clientId) {
      newErrors.clientId = "Please select a client"
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Please select a due date"
    }

    formData.lineItems.forEach((item, index) => {
      if (!item.description.trim()) {
        newErrors[`lineItem-${index}-description`] = "Description is required"
      }
      if (item.quantity <= 0) {
        newErrors[`lineItem-${index}-quantity`] = "Quantity must be greater than 0"
      }
      if (item.price < 0) {
        newErrors[`lineItem-${index}-price`] = "Price cannot be negative"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const total = calculateTotal()

      let result

      if (isEdit && invoice?.id) {
        // Update existing invoice
        const { updateInvoice } = await import("@/lib/supabase/actions")
        result = await updateInvoice(invoice.id, {
          client_id: formData.clientId,
          amount: total,
          due_date: formData.dueDate,
          line_items: formData.lineItems,
        })
      } else {
        // Create new invoice
        const { generateInvoiceNumber } = await import("@/lib/supabase/actions")
        const invoiceNumber = await generateInvoiceNumber()
        result = await createInvoice({
          invoice_number: invoiceNumber,
          client_id: formData.clientId,
          amount: total,
          status: "unpaid",
          due_date: formData.dueDate,
          line_items: formData.lineItems,
        })
      }

      if (result?.error) {
        alert(`Error ${isEdit ? "updating" : "creating"} invoice: ` + result.error)
      } else {
        await onSave()
        onOpenChange(false)
      }
    } catch (error) {
      console.error("Error saving invoice:", error)
      alert("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Invoice" : "Create New Invoice"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update invoice details and line items."
              : "Generate an invoice for your client with line items and totals."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Client Selection */}
            <div className="space-y-2">
              <Label htmlFor="client">
                Client <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.clientId}
                onValueChange={(value) => setFormData({ ...formData, clientId: value })}
              >
                <SelectTrigger className={errors.clientId ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.length === 0 ? (
                    <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                      No clients available. Add a client first.
                    </div>
                  ) : (
                    clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors.clientId && <p className="text-sm text-destructive">{errors.clientId}</p>}
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Label htmlFor="dueDate">
                Due Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={errors.dueDate ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.dueDate && <p className="text-sm text-destructive">{errors.dueDate}</p>}
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Line Items</Label>
                <Button type="button" variant="outline" size="sm" onClick={addLineItem} disabled={isLoading}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {formData.lineItems.map((item, index) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor={`description-${item.id}`}>Description</Label>
                          <Input
                            id={`description-${item.id}`}
                            placeholder="Service or product description"
                            value={item.description}
                            onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                            className={errors[`lineItem-${index}-description`] ? "border-destructive" : ""}
                            disabled={isLoading}
                          />
                          {errors[`lineItem-${index}-description`] && (
                            <p className="text-sm text-destructive">{errors[`lineItem-${index}-description`]}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
                          <div className="grid gap-2">
                            <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                            <Input
                              id={`quantity-${item.id}`}
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateLineItem(item.id, "quantity", Number(e.target.value))}
                              className={errors[`lineItem-${index}-quantity`] ? "border-destructive" : ""}
                              disabled={isLoading}
                            />
                            {errors[`lineItem-${index}-quantity`] && (
                              <p className="text-sm text-destructive">{errors[`lineItem-${index}-quantity`]}</p>
                            )}
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor={`price-${item.id}`}>Price (ZAR)</Label>
                            <Input
                              id={`price-${item.id}`}
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.price}
                              onChange={(e) => updateLineItem(item.id, "price", Number(e.target.value))}
                              className={errors[`lineItem-${index}-price`] ? "border-destructive" : ""}
                              disabled={isLoading}
                            />
                            {errors[`lineItem-${index}-price`] && (
                              <p className="text-sm text-destructive">{errors[`lineItem-${index}-price`]}</p>
                            )}
                          </div>

                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeLineItem(item.id)}
                              disabled={formData.lineItems.length === 1 || isLoading}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                              <span className="sr-only">Remove item</span>
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Line Total:</span>
                          <span className="font-medium">{formatCurrency(item.quantity * item.price)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Totals Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      VAT (15%){!isVatRegistered && <span className="ml-1 text-xs">(Not VAT Registered)</span>}:
                    </span>
                    <span>{formatCurrency(calculateVAT())}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-lg">{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Update Invoice" : "Save Invoice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
