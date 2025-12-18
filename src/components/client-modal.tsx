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
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { createClient, updateClient } from "@/lib/supabase/actions"

type Client = {
  id?: string
  name: string
  email: string
  phone: string
  notes?: string
  vat_number?: string | null
  billing_address?: string | null
  billing_city?: string | null
  billing_postal_code?: string | null
  billing_country?: string | null
}

type ClientModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  client?: Client | null
  onSave: () => Promise<void>
}

export function ClientModal({ open, onOpenChange, client, onSave }: ClientModalProps) {
  const [formData, setFormData] = useState<Omit<Client, "id">>({
    name: "",
    email: "",
    phone: "",
    notes: "",
    vat_number: null,
    billing_address: null,
    billing_city: null,
    billing_postal_code: null,
    billing_country: "South Africa",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof Client, string>>>({})
  const [isLoading, setIsLoading] = useState(false)

  const isEdit = !!client?.id

  useEffect(() => {
    if (open && client) {
      setFormData({
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        notes: client.notes || "",
        vat_number: client.vat_number || null,
        billing_address: client.billing_address || null,
        billing_city: client.billing_city || null,
        billing_postal_code: client.billing_postal_code || null,
        billing_country: client.billing_country || "South Africa",
      })
      setErrors({})
    } else if (open && !client) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        notes: "",
        vat_number: null,
        billing_address: null,
        billing_city: null,
        billing_postal_code: null,
        billing_country: "South Africa",
      })
      setErrors({})
    }
  }, [open, client])

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        notes: "",
        vat_number: null,
        billing_address: null,
        billing_city: null,
        billing_postal_code: null,
        billing_country: "South Africa",
      })
      setErrors({})
    }
    onOpenChange(newOpen)
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Client, string>> = {}

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone || formData.phone.trim().length < 10) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      let result
      if (isEdit && client?.id) {
        result = await updateClient(client.id, formData)
      } else {
        result = await createClient(formData)
      }

      if (result?.error) {
        alert("Error saving client: " + result.error)
      } else {
        await onSave()
        handleOpenChange(false)
      }
    } catch (error) {
      console.error("Error saving client:", error)
      alert("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Client" : "Add New Client"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update client information below." : "Enter client details to add them to your system."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Client Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Acme Corporation"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@acme.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+27 82 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={errors.phone ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional information about the client..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                disabled={isLoading}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vat_number">VAT Number (Optional)</Label>
              <Input
                id="vat_number"
                placeholder="4123456789"
                value={formData.vat_number || ""}
                onChange={(e) => setFormData({ ...formData, vat_number: e.target.value || null })}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">Client's VAT registration number for B2B invoicing</p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <Label>Billing Address (Optional)</Label>
              <div className="space-y-2">
                <Input
                  id="billing_address"
                  placeholder="123 Business Street"
                  value={formData.billing_address || ""}
                  onChange={(e) => setFormData({ ...formData, billing_address: e.target.value || null })}
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    id="billing_city"
                    placeholder="City"
                    value={formData.billing_city || ""}
                    onChange={(e) => setFormData({ ...formData, billing_city: e.target.value || null })}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="billing_postal_code"
                    placeholder="Postal Code"
                    value={formData.billing_postal_code || ""}
                    onChange={(e) => setFormData({ ...formData, billing_postal_code: e.target.value || null })}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Input
                  id="billing_country"
                  placeholder="Country"
                  value={formData.billing_country || ""}
                  onChange={(e) => setFormData({ ...formData, billing_country: e.target.value || null })}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Add Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
