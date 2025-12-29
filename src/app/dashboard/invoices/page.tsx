"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Eye, Pencil, Trash2, FileText, Download, Check } from "lucide-react"
import { InvoiceModal } from "@/components/invoice-modal"
import { getInvoices, deleteInvoice, getClients, updateInvoice, getUserProfile } from "@/lib/supabase/actions"
import { downloadInvoicePDF } from "@/lib/pdf-generator"

type InvoiceStatus = "paid" | "unpaid" | "overdue"

type Invoice = {
  id: string
  invoice_number: string
  client_id: string
  amount: number
  status: InvoiceStatus
  due_date: string
  line_items?: any[]
  clients?: {
    id: string
    name: string
    email?: string
    phone?: string
    vat_number?: string
    billing_address?: string
    billing_city?: string
    billing_postal_code?: string
    billing_country?: string
  }
  created_at?: string
}

type Client = {
  id: string
  name: string
  email?: string
  phone?: string
  vat_number?: string
  billing_address?: string
  billing_city?: string
  billing_postal_code?: string
  billing_country?: string
}

type UserProfile = {
  business_name?: string
  vat_number?: string
  registration_number?: string
  is_vat_registered?: boolean
  address_line1?: string
  address_line2?: string
  city?: string
  postal_code?: string
  country?: string
  phone?: string
  email?: string
  website?: string
  invoice_primary_color?: string
  invoice_secondary_color?: string
  invoice_accent_color?: string
  invoice_font?: string
  invoice_footer_text?: string
  invoice_header_style?: string
  invoice_show_logo?: boolean
  invoice_logo_position?: string
  logo_url?: string
}

const statusConfig = {
  paid: {
    label: "Paid",
    variant: "default" as const,
  },
  unpaid: {
    label: "Unpaid",
    variant: "secondary" as const,
  },
  overdue: {
    label: "Overdue",
    variant: "destructive" as const,
  },
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    const [invoiceData, clientData, profileData] = await Promise.all([
      getInvoices(),
      getClients(),
      getUserProfile(),
    ])
    setInvoices(invoiceData as Invoice[])
    setClients(clientData as Client[])
    setUserProfile(profileData as UserProfile)
    setIsLoading(false)
  }

  const handleCreateInvoice = () => {
    setSelectedInvoice(null)
    setModalOpen(true)
  }

  const handleViewInvoice = async (invoiceId: string) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId)
    if (!invoice) return

    const client = invoice.clients || clients.find((c) => c.id === invoice.client_id)

    // Parse line_items - it's stored as jsonb[] in database
    // When retrieved, it's an array with a single element that contains the actual items
    let lineItems: any[] = []
    if (invoice.line_items && Array.isArray(invoice.line_items)) {
      if (invoice.line_items.length > 0 && Array.isArray(invoice.line_items[0])) {
        // First element is the actual array of items
        lineItems = invoice.line_items[0]
      } else if (invoice.line_items.length > 0 && typeof invoice.line_items[0] === 'object') {
        // Already parsed correctly
        lineItems = invoice.line_items
      }
    }

    const subtotal = lineItems.reduce((sum: number, item: any) => sum + (item?.quantity || 0) * (item?.price || 0), 0)
    const vat = subtotal * 0.15

    // Format business address
    const addressParts = [
      userProfile?.address_line1,
      userProfile?.address_line2,
      userProfile?.city,
      userProfile?.postal_code,
      userProfile?.country,
    ].filter(Boolean)
    const businessAddress = addressParts.join(", ")

    const { openInvoicePDF } = await import("@/lib/pdf-generator")

    openInvoicePDF({
      invoiceNumber: invoice.invoice_number,
      clientName: client?.name || "Client",
      clientEmail: client?.email || "",
      clientPhone: client?.phone,
      clientVatNumber: client?.vat_number,
      clientBillingAddress: client?.billing_address,
      clientBillingCity: client?.billing_city,
      clientBillingPostalCode: client?.billing_postal_code,
      clientBillingCountry: client?.billing_country,
      date: new Date(invoice.created_at || "").toLocaleDateString("en-ZA"),
      dueDate: new Date(invoice.due_date).toLocaleDateString("en-ZA"),
      lineItems: lineItems,
      subtotal,
      vat,
      total: invoice.amount,
      isVatRegistered: userProfile?.is_vat_registered,
      businessName: userProfile?.business_name || "Your Business",
      businessEmail: userProfile?.email,
      businessPhone: userProfile?.phone,
      businessAddress: businessAddress || undefined,
      businessVatNumber: userProfile?.vat_number,
      businessRegistrationNumber: userProfile?.registration_number,
      branding: {
        primaryColor: userProfile?.invoice_primary_color,
        secondaryColor: userProfile?.invoice_secondary_color,
        accentColor: userProfile?.invoice_accent_color,
        font: userProfile?.invoice_font,
        footerText: userProfile?.invoice_footer_text,
        headerStyle: userProfile?.invoice_header_style,
        showLogo: userProfile?.invoice_show_logo,
        logoPosition: userProfile?.invoice_logo_position,
        logoUrl: userProfile?.logo_url,
      },
    })
  }

  const handleEditInvoice = (invoiceId: string) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId)
    if (invoice) {
      setSelectedInvoice(invoice)
      setModalOpen(true)
    }
  }

  const handleMarkAsPaid = async (invoiceId: string) => {
    const result = await updateInvoice(invoiceId, { status: "paid" })
    if (result?.error) {
      alert("Error updating invoice: " + result.error)
    } else {
      await loadData()
    }
  }

  const handleDeleteInvoice = async (invoiceId: string) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      const result = await deleteInvoice(invoiceId)
      if (result?.error) {
        alert("Error deleting invoice: " + result.error)
      } else {
        await loadData()
      }
    }
  }

  const handleDownloadInvoice = async (invoiceId: string) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId)
    if (!invoice) return

    const client = invoice.clients || clients.find((c) => c.id === invoice.client_id)
    const lineItems = invoice.line_items || []

    const subtotal = lineItems.reduce((sum: number, item: any) => sum + item.quantity * item.price, 0)
    const vat = subtotal * 0.15

    // Format business address
    const addressParts = [
      userProfile?.address_line1,
      userProfile?.address_line2,
      userProfile?.city,
      userProfile?.postal_code,
      userProfile?.country,
    ].filter(Boolean)
    const businessAddress = addressParts.join(", ")

    downloadInvoicePDF({
      invoiceNumber: invoice.invoice_number,
      clientName: client?.name || "Client",
      clientEmail: client?.email || "",
      clientPhone: client?.phone,
      clientVatNumber: client?.vat_number,
      clientBillingAddress: client?.billing_address,
      clientBillingCity: client?.billing_city,
      clientBillingPostalCode: client?.billing_postal_code,
      clientBillingCountry: client?.billing_country,
      date: new Date(invoice.created_at || "").toLocaleDateString("en-ZA"),
      dueDate: new Date(invoice.due_date).toLocaleDateString("en-ZA"),
      lineItems: lineItems,
      subtotal,
      vat,
      total: invoice.amount,
      isVatRegistered: userProfile?.is_vat_registered,
      businessName: userProfile?.business_name || "Your Business",
      businessEmail: userProfile?.email,
      businessPhone: userProfile?.phone,
      businessAddress: businessAddress || undefined,
      businessVatNumber: userProfile?.vat_number,
      businessRegistrationNumber: userProfile?.registration_number,
      branding: {
        primaryColor: userProfile?.invoice_primary_color,
        secondaryColor: userProfile?.invoice_secondary_color,
        accentColor: userProfile?.invoice_accent_color,
        font: userProfile?.invoice_font,
        footerText: userProfile?.invoice_footer_text,
        headerStyle: userProfile?.invoice_header_style,
        showLogo: userProfile?.invoice_show_logo,
        logoPosition: userProfile?.invoice_logo_position,
        logoUrl: userProfile?.logo_url,
      },
    })
  }

  const handleSaveInvoice = async () => {
    await loadData()
    setModalOpen(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading invoices...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Invoices
          </h1>
          <p className="text-sm text-muted-foreground mt-2">Track payments and manage invoicing</p>
        </div>
        <Button onClick={handleCreateInvoice} size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      {invoices.length === 0 ? (
        <Card className="relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-6 mb-4">
              <FileText className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="mb-2">No invoices yet</CardTitle>
            <CardDescription className="text-center mb-6 max-w-sm">
              Start billing your clients by creating your first invoice. Keep track of all payments and outstanding
              amounts.
            </CardDescription>
            <Button onClick={handleCreateInvoice} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Invoice
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="relative overflow-hidden rounded-2xl border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <CardHeader className="border-b border-border/40">
            <CardTitle className="text-xl font-bold">All Invoices</CardTitle>
            <CardDescription>A list of all your invoices and their payment status</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                      <TableCell>{invoice.clients?.name || "No client"}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>
                        <Badge variant={statusConfig[invoice.status].variant}>
                          {statusConfig[invoice.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(invoice.due_date)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewInvoice(invoice.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadInvoice(invoice.id)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {invoice.status !== "paid" && (
                              <DropdownMenuItem onClick={() => handleMarkAsPaid(invoice.id)}>
                                <Check className="mr-2 h-4 w-4 text-green-600" />
                                Mark as Paid
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleEditInvoice(invoice.id)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteInvoice(invoice.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      <InvoiceModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        clients={clients}
        invoice={selectedInvoice ? {
          ...selectedInvoice,
          line_items: selectedInvoice.line_items || []
        } : null}
        onSave={handleSaveInvoice}
      />
    </div>
  )
}
