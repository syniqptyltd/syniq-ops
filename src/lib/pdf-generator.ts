import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

type LineItem = {
  description: string
  quantity: number
  price: number
}

type InvoiceData = {
  invoiceNumber: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  clientVatNumber?: string
  clientBillingAddress?: string
  clientBillingCity?: string
  clientBillingPostalCode?: string
  clientBillingCountry?: string
  date: string
  dueDate: string
  lineItems: LineItem[]
  subtotal: number
  vat: number
  total: number
  vatInclusive?: boolean
  isVatRegistered?: boolean
  jobSiteAddress?: string
  jobSiteCity?: string
  jobSitePostalCode?: string
  businessName?: string
  businessEmail?: string
  businessPhone?: string
  businessAddress?: string
  businessVatNumber?: string
  businessRegistrationNumber?: string
}

export function generateInvoicePDF(data: InvoiceData) {
  const doc = new jsPDF()

  // Colors
  const primaryColor: [number, number, number] = [79, 70, 229] // Indigo
  const darkGray: [number, number, number] = [55, 65, 81]
  const lightGray: [number, number, number] = [156, 163, 175]

  // Header
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, 210, 40, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(28)
  doc.setFont("helvetica", "bold")
  doc.text(data.businessName || "Your Business", 20, 25)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("INVOICE", 170, 25)

  // Business details
  doc.setTextColor(...darkGray)
  doc.setFontSize(9)
  let yPos = 50
  if (data.businessEmail) {
    doc.text(data.businessEmail, 20, yPos)
    yPos += 5
  }
  if (data.businessPhone) {
    doc.text(data.businessPhone, 20, yPos)
    yPos += 5
  }
  if (data.businessAddress) {
    doc.text(data.businessAddress, 20, yPos)
    yPos += 5
  }
  if (data.businessVatNumber) {
    doc.text(`VAT: ${data.businessVatNumber}`, 20, yPos)
    yPos += 5
  }
  if (data.businessRegistrationNumber) {
    doc.text(`Reg: ${data.businessRegistrationNumber}`, 20, yPos)
    yPos += 5
  }

  // Invoice details
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text("Invoice Number:", 140, 50)
  doc.text("Date:", 140, 57)
  doc.text("Due Date:", 140, 64)

  doc.setFont("helvetica", "normal")
  doc.text(data.invoiceNumber, 175, 50)
  doc.text(data.date, 175, 57)
  doc.text(data.dueDate, 175, 64)

  // Bill to
  yPos += 10
  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.setTextColor(...darkGray)
  doc.text("Bill To:", 20, yPos)

  yPos += 7
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(data.clientName, 20, yPos)
  yPos += 5
  doc.setFontSize(9)
  doc.text(data.clientEmail, 20, yPos)
  yPos += 5
  if (data.clientPhone) {
    doc.text(data.clientPhone, 20, yPos)
    yPos += 5
  }
  if (data.clientVatNumber) {
    doc.text(`VAT: ${data.clientVatNumber}`, 20, yPos)
    yPos += 5
  }
  if (data.clientBillingAddress) {
    doc.text(data.clientBillingAddress, 20, yPos)
    yPos += 5
  }
  if (data.clientBillingCity || data.clientBillingPostalCode) {
    const cityPostal = [data.clientBillingCity, data.clientBillingPostalCode].filter(Boolean).join(", ")
    if (cityPostal) {
      doc.text(cityPostal, 20, yPos)
      yPos += 5
    }
  }
  if (data.clientBillingCountry) {
    doc.text(data.clientBillingCountry, 20, yPos)
    yPos += 5
  }

  // Job site address (if different from billing)
  if (data.jobSiteAddress) {
    yPos += 5
    doc.setFont("helvetica", "bold")
    doc.text("Job Site:", 20, yPos)
    yPos += 5
    doc.setFont("helvetica", "normal")
    doc.text(data.jobSiteAddress, 20, yPos)
    yPos += 5
    if (data.jobSiteCity || data.jobSitePostalCode) {
      const siteCity = [data.jobSiteCity, data.jobSitePostalCode].filter(Boolean).join(", ")
      if (siteCity) {
        doc.text(siteCity, 20, yPos)
        yPos += 5
      }
    }
  }

  // Line items table
  yPos += 15
  doc.setTextColor(...darkGray)

  const tableData = data.lineItems.map((item) => [
    item.description,
    item.quantity.toString(),
    `R ${item.price.toFixed(2)}`,
    `R ${(item.quantity * item.price).toFixed(2)}`,
  ])

  autoTable(doc, {
    startY: yPos,
    head: [["Description", "Quantity", "Price", "Amount"]],
    body: tableData,
    theme: "striped",
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 10,
    },
    styles: {
      fontSize: 9,
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 30, halign: "center" },
      2: { cellWidth: 40, halign: "right" },
      3: { cellWidth: 40, halign: "right" },
    },
  })

  // Get final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY + 10

  // Totals
  const totalsX = 140
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.setTextColor(...darkGray)

  doc.text("Subtotal:", totalsX, finalY)
  doc.text(`R ${data.subtotal.toFixed(2)}`, 190, finalY, { align: "right" })

  // Show VAT line only if VAT registered
  if (data.isVatRegistered && data.vat > 0) {
    const vatLabel = data.vatInclusive ? "VAT (15% incl):" : "VAT (15%):"
    doc.text(vatLabel, totalsX, finalY + 7)
    doc.text(`R ${data.vat.toFixed(2)}`, 190, finalY + 7, { align: "right" })
  } else if (!data.isVatRegistered) {
    doc.text("VAT:", totalsX, finalY + 7)
    doc.text("Not VAT registered", 190, finalY + 7, { align: "right" })
  }

  // Total
  doc.setDrawColor(...primaryColor)
  doc.setLineWidth(0.5)
  doc.line(totalsX, finalY + 12, 190, finalY + 12)

  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.setTextColor(...primaryColor)
  doc.text("TOTAL:", totalsX, finalY + 20)
  doc.text(`R ${data.total.toFixed(2)}`, 190, finalY + 20, { align: "right" })

  // Footer
  doc.setTextColor(...lightGray)
  doc.setFontSize(8)
  doc.setFont("helvetica", "italic")
  doc.text("Thank you for your business!", 105, 280, { align: "center" })

  return doc
}

export function downloadInvoicePDF(data: InvoiceData) {
  const doc = generateInvoicePDF(data)
  doc.save(`Invoice-${data.invoiceNumber}.pdf`)
}

export function openInvoicePDF(data: InvoiceData) {
  const doc = generateInvoicePDF(data)
  doc.output("dataurlnewwindow", {filename: `Invoice-${data.invoiceNumber}.pdf`})
}
