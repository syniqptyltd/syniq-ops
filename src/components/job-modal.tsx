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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { createJob, updateJob, getUserProfile } from "@/lib/supabase/actions"

type Job = {
  id?: string
  title: string
  client_id: string
  status: string
  due_date: string
  description?: string
  pricing_type?: "fixed" | "hourly"
  fixed_price?: number | null
  hourly_rate?: number | null
  hours_worked?: number | null
  vat_inclusive?: boolean
  job_address?: string | null
  job_city?: string | null
  job_postal_code?: string | null
}

type Client = {
  id: string
  name: string
}

type JobModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  job?: Job | null
  clients: Client[]
  onSave: () => Promise<void>
}

export function JobModal({ open, onOpenChange, job, clients, onSave }: JobModalProps) {
  const [formData, setFormData] = useState<Omit<Job, "id">>({
    title: "",
    client_id: "",
    status: "pending",
    due_date: "",
    description: "",
    pricing_type: "fixed",
    fixed_price: null,
    hourly_rate: null,
    hours_worked: null,
    vat_inclusive: false,
    job_address: null,
    job_city: null,
    job_postal_code: null,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof Job, string>>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isVatRegistered, setIsVatRegistered] = useState(false)

  const isEdit = !!job?.id

  // Fetch VAT registration status
  useEffect(() => {
    const fetchVatStatus = async () => {
      const userProfile = await getUserProfile()
      setIsVatRegistered(userProfile?.is_vat_registered || false)
    }
    fetchVatStatus()
  }, [])

  useEffect(() => {
    if (open && job) {
      setFormData({
        title: job.title || "",
        client_id: job.client_id || "",
        status: job.status || "pending",
        due_date: job.due_date || "",
        description: job.description || "",
        pricing_type: job.pricing_type || "fixed",
        fixed_price: job.fixed_price || null,
        hourly_rate: job.hourly_rate || null,
        hours_worked: job.hours_worked || null,
        vat_inclusive: job.vat_inclusive || false,
        job_address: job.job_address || null,
        job_city: job.job_city || null,
        job_postal_code: job.job_postal_code || null,
      })
      setErrors({})
    } else if (open && !job) {
      setFormData({
        title: "",
        client_id: "",
        status: "pending",
        due_date: "",
        description: "",
        pricing_type: "fixed",
        fixed_price: null,
        hourly_rate: null,
        hours_worked: null,
        vat_inclusive: false,
        job_address: null,
        job_city: null,
        job_postal_code: null,
      })
      setErrors({})
    }
  }, [open, job])

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFormData({
        title: "",
        client_id: "",
        status: "pending",
        due_date: "",
        description: "",
        pricing_type: "fixed",
        fixed_price: null,
        hourly_rate: null,
        hours_worked: null,
        vat_inclusive: false,
        job_address: null,
        job_city: null,
        job_postal_code: null,
      })
      setErrors({})
    }
    onOpenChange(newOpen)
  }

  const calculatePreview = () => {
    let baseAmount = 0

    if (formData.pricing_type === "fixed" && formData.fixed_price) {
      baseAmount = formData.fixed_price
    } else if (formData.pricing_type === "hourly" && formData.hourly_rate && formData.hours_worked) {
      baseAmount = formData.hourly_rate * formData.hours_worked
    } else {
      return null
    }

    // Only calculate VAT if business is VAT registered
    if (!isVatRegistered) {
      return { subtotal: baseAmount, vat: 0, total: baseAmount }
    }

    if (formData.vat_inclusive) {
      // Price includes VAT - calculate backwards
      const total = baseAmount
      const subtotal = total / 1.15
      const vat = total - subtotal
      return { subtotal, vat, total }
    } else {
      // Price excludes VAT - calculate forwards
      const subtotal = baseAmount
      const vat = subtotal * 0.15
      const total = subtotal + vat
      return { subtotal, vat, total }
    }
  }

  const preview = calculatePreview()

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Job, string>> = {}

    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    }

    if (!formData.client_id) {
      newErrors.client_id = "Please select a client"
    }

    if (!formData.due_date) {
      newErrors.due_date = "Please select a due date"
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
      if (isEdit && job?.id) {
        result = await updateJob(job.id, formData)
      } else {
        result = await createJob(formData)
      }

      if (result?.error) {
        alert("Error saving job: " + result.error)
      } else {
        await onSave()
        handleOpenChange(false)
      }
    } catch (error) {
      console.error("Error saving job:", error)
      alert("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Job" : "Create New Job"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update job details below." : "Enter job details to create a new job."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Job Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Website Redesign"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={errors.title ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="client">
                Client <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.client_id}
                onValueChange={(value) => setFormData({ ...formData, client_id: value })}
              >
                <SelectTrigger className={errors.client_id ? "border-destructive" : ""}>
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
              {errors.client_id && <p className="text-sm text-destructive">{errors.client_id}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">
                Status <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date">
                Due Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                className={errors.due_date ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.due_date && <p className="text-sm text-destructive">{errors.due_date}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Project details and requirements..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={isLoading}
                rows={4}
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <Label>Job Site Address (Optional)</Label>
              <div className="space-y-2">
                <Input
                  id="job_address"
                  placeholder="123 Main Street"
                  value={formData.job_address || ""}
                  onChange={(e) => setFormData({ ...formData, job_address: e.target.value || null })}
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    id="job_city"
                    placeholder="City"
                    value={formData.job_city || ""}
                    onChange={(e) => setFormData({ ...formData, job_city: e.target.value || null })}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="job_postal_code"
                    placeholder="Postal Code"
                    value={formData.job_postal_code || ""}
                    onChange={(e) => setFormData({ ...formData, job_postal_code: e.target.value || null })}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <Label>Pricing</Label>
              <RadioGroup
                value={formData.pricing_type}
                onValueChange={(value: "fixed" | "hourly") =>
                  setFormData({ ...formData, pricing_type: value, fixed_price: null, hourly_rate: null, hours_worked: null })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed" className="font-normal cursor-pointer">
                    Fixed Price
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hourly" id="hourly" />
                  <Label htmlFor="hourly" className="font-normal cursor-pointer">
                    Hourly Rate
                  </Label>
                </div>
              </RadioGroup>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="vat_inclusive"
                  checked={formData.vat_inclusive}
                  onCheckedChange={(checked) => setFormData({ ...formData, vat_inclusive: checked as boolean })}
                  disabled={isLoading || !isVatRegistered}
                />
                <Label htmlFor="vat_inclusive" className="font-normal cursor-pointer text-sm">
                  Price includes VAT (15%)
                  {!isVatRegistered && <span className="ml-2 text-xs text-muted-foreground">(Not VAT Registered)</span>}
                </Label>
              </div>

              {formData.pricing_type === "fixed" ? (
                <div className="space-y-2">
                  <Label htmlFor="fixed_price">Fixed Price (ZAR)</Label>
                  <Input
                    id="fixed_price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="5000.00"
                    value={formData.fixed_price || ""}
                    onChange={(e) => setFormData({ ...formData, fixed_price: e.target.value ? parseFloat(e.target.value) : null })}
                    disabled={isLoading}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hourly_rate">Hourly Rate (ZAR)</Label>
                    <Input
                      id="hourly_rate"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="500.00"
                      value={formData.hourly_rate || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, hourly_rate: e.target.value ? parseFloat(e.target.value) : null })
                      }
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours_worked">Hours Worked</Label>
                    <Input
                      id="hours_worked"
                      type="number"
                      min="0"
                      step="0.25"
                      placeholder="10"
                      value={formData.hours_worked || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, hours_worked: e.target.value ? parseFloat(e.target.value) : null })
                      }
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              {preview && (
                <div className="bg-muted p-3 rounded-md space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">R {preview.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      VAT (15%){!isVatRegistered && <span className="ml-1 text-xs">(Not Registered)</span>}:
                    </span>
                    <span className="font-medium">R {preview.vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-border">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-primary">R {preview.total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Create Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
