"use server"

import { createInvoice, getUserProfile } from "./supabase/actions"

type Job = {
  id: string
  title: string
  client_id: string
  description?: string
  hourly_rate?: number
  hours_worked?: number
  fixed_price?: number
  vat_inclusive?: boolean
  line_items?: Array<{
    id: string
    description: string
    quantity: number
    price: number
  }>
  job_address?: string | null
  job_city?: string | null
  job_postal_code?: string | null
}

type AutoInvoiceOptions = {
  job: Job
  clientName: string
  additionalItems?: Array<{
    description: string
    quantity: number
    price: number
  }>
}

/**
 * Automatically generate an invoice from a job
 */
export async function generateInvoiceFromJob({ job, clientName, additionalItems = [] }: AutoInvoiceOptions) {
  // Check if business is VAT registered
  const userProfile = await getUserProfile()
  const isVatRegistered = userProfile?.is_vat_registered || false

  // Build line items from job
  const lineItems = []
  let baseAmount = 0

  // Priority 1: Use job line items if available (most detailed)
  if (job.line_items && job.line_items.length > 0) {
    // Use detailed line items from job
    job.line_items.forEach((item) => {
      lineItems.push({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        price: job.vat_inclusive ? item.price / 1.15 : item.price,
      })
      baseAmount += item.quantity * item.price
    })
  }
  // Priority 2: Use fixed price (simple single-line)
  else if (job.fixed_price && job.fixed_price > 0) {
    // Fixed price job
    baseAmount = job.fixed_price
    lineItems.push({
      id: "1",
      description: job.title,
      quantity: 1,
      price: job.vat_inclusive ? job.fixed_price / 1.15 : job.fixed_price,
    })
  }
  // Priority 3: Use hourly rate (time-based)
  else if (job.hourly_rate && job.hours_worked) {
    // Hourly rate job
    baseAmount = job.hourly_rate * job.hours_worked
    const pricePerHour = job.vat_inclusive ? job.hourly_rate / 1.15 : job.hourly_rate
    lineItems.push({
      id: "1",
      description: `${job.title} (${job.hours_worked} hours @ R${job.hourly_rate}/hr${job.vat_inclusive ? " VAT incl" : ""})`,
      quantity: job.hours_worked,
      price: pricePerHour,
    })
  }
  // No pricing method available
  else {
    // No pricing info - return error
    return {
      error: "Job must have line items, fixed price, or hourly rate with hours worked",
    }
  }

  // Add any additional items
  additionalItems.forEach((item, index) => {
    lineItems.push({
      id: String(lineItems.length + 1),
      ...item,
    })
    if (job.vat_inclusive) {
      // Adjust additional item base amount for VAT inclusive calculations
      baseAmount += item.quantity * item.price
    }
  })

  // Calculate totals based on VAT registration and inclusive/exclusive
  let subtotal: number
  let vat: number
  let total: number

  if (!isVatRegistered) {
    // Not VAT registered - no VAT charged
    subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
    vat = 0
    total = subtotal
  } else if (job.vat_inclusive) {
    // VAT registered and price includes VAT - calculate backwards
    total = baseAmount
    subtotal = total / 1.15
    vat = total - subtotal
  } else {
    // VAT registered and price excludes VAT - calculate forwards
    subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
    vat = subtotal * 0.15
    total = subtotal + vat
  }

  // Generate invoice number
  const invoiceNumber = `INV-${Date.now()}`

  // Calculate due date (30 days from now)
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 30)

  // Create invoice
  const result = await createInvoice({
    invoice_number: invoiceNumber,
    client_id: job.client_id,
    amount: total,
    status: "unpaid",
    due_date: dueDate.toISOString().split("T")[0],
    line_items: lineItems,
  })

  if (result?.error) {
    return { error: result.error }
  }

  return {
    success: true,
    invoiceNumber,
    total,
    message: `Invoice ${invoiceNumber} created successfully for ${clientName}`,
  }
}

/**
 * Calculate invoice preview without creating it
 */
export async function calculateInvoicePreview(job: Job) {
  let subtotal = 0

  if (job.fixed_price && job.fixed_price > 0) {
    subtotal = job.fixed_price
  } else if (job.hourly_rate && job.hours_worked) {
    subtotal = job.hourly_rate * job.hours_worked
  }

  const vat = subtotal * 0.15
  const total = subtotal + vat

  return {
    subtotal,
    vat,
    total,
    hasPrice: subtotal > 0,
  }
}
