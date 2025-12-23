import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

type LineItem = {
  description: string
  quantity: number
  price: number
}

type BrandingSettings = {
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  font?: string
  footerText?: string
  headerStyle?: string
  showLogo?: boolean
  logoPosition?: string
  logoUrl?: string
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
  branding?: BrandingSettings
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [79, 70, 229] // Default indigo
}

export function generateInvoicePDF(data: InvoiceData) {
  const doc = new jsPDF()

  // Get branding settings or use defaults
  const branding = data.branding || {}
  const font = branding.font || "helvetica"
  const headerStyle = branding.headerStyle || "gradient"
  const footerText = branding.footerText || "Thank you for your business!"

  // Colors - convert hex to RGB
  const primaryColor = hexToRgb(branding.primaryColor || "#4F46E5")
  const secondaryColor = hexToRgb(branding.secondaryColor || "#6366F1")
  const accentColor = hexToRgb(branding.accentColor || "#8B5CF6")
  const darkGray: [number, number, number] = [55, 65, 81]
  const lightGray: [number, number, number] = [156, 163, 175]

  // Header
  if (headerStyle === "gradient") {
    // Create gradient effect with multiple rectangles
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 40, "F")
    doc.setFillColor(...secondaryColor)
    doc.setGState(new (doc as any).GState({ opacity: 0.3 }))
    doc.rect(0, 0, 210, 20, "F")
    doc.setGState(new (doc as any).GState({ opacity: 1 }))
  } else if (headerStyle === "minimal") {
    // Minimal header - no background, just border
    doc.setDrawColor(...primaryColor)
    doc.setLineWidth(1)
    doc.line(0, 40, 210, 40)
  } else {
    // Solid color header
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 40, "F")
  }

  // Set text color based on header style
  if (headerStyle === "minimal") {
    doc.setTextColor(...primaryColor)
  } else {
    doc.setTextColor(255, 255, 255)
  }

  doc.setFontSize(28)
  doc.setFont(font as any, "bold")

  // Position business name based on logo settings
  const logoPosition = branding.logoPosition || "left"
  let businessNameX = 20
  if (logoPosition === "center") {
    businessNameX = 105
  } else if (logoPosition === "right") {
    businessNameX = 160
  }

  doc.text(data.businessName || "Your Business", businessNameX, 25, {
    align: logoPosition === "center" ? "center" : logoPosition === "right" ? "right" : "left"
  })

  doc.setFontSize(10)
  doc.setFont(font as any, "normal")
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

  const tableData = (data.lineItems || []).map((item) => [
    item?.description || "Item",
    (item?.quantity || 0).toString(),
    `R ${(item?.price || 0).toFixed(2)}`,
    `R ${((item?.quantity || 0) * (item?.price || 0)).toFixed(2)}`,
  ])

  autoTable(doc, {
    startY: yPos,
    head: [["Description", "Quantity", "Price", "Amount"]],
    body: tableData,
    theme: "striped",
    headStyles: {
      fillColor: secondaryColor,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 10,
      font: font,
    },
    styles: {
      fontSize: 9,
      cellPadding: 5,
      font: font,
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
  doc.setDrawColor(...accentColor)
  doc.setLineWidth(0.5)
  doc.line(totalsX, finalY + 12, 190, finalY + 12)

  doc.setFont(font as any, "bold")
  doc.setFontSize(12)
  doc.setTextColor(...accentColor)
  doc.text("TOTAL:", totalsX, finalY + 20)
  doc.text(`R ${data.total.toFixed(2)}`, 190, finalY + 20, { align: "right" })

  // Footer
  doc.setTextColor(...lightGray)
  doc.setFontSize(8)
  doc.setFont(font as any, "italic")
  doc.text(footerText, 105, 280, { align: "center" })

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
