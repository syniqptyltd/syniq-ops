# Invoice Branding Feature

## Overview

The Invoice Branding feature allows users to customize the appearance of their generated invoices with their own brand identity. This includes custom colors, fonts, logos, and styling options.

## Features

### 1. **Custom Colors**
- **Primary Color**: Used for the invoice header background
- **Secondary Color**: Applied to table headers
- **Accent Color**: Highlights the total amount and important elements

### 2. **Typography**
- **Font Selection**: Choose from:
  - Helvetica (Modern, Clean)
  - Times (Classic, Formal)
  - Courier (Typewriter, Technical)

### 3. **Logo Settings**
- **Show/Hide Logo**: Toggle logo visibility on invoices
- **Logo Position**: Choose where to display the logo
  - Left
  - Center
  - Right

### 4. **Header Styles**
- **Solid**: Single solid color header
- **Gradient**: Subtle gradient effect with primary and secondary colors
- **Minimal**: Clean, borderless design with just a line separator

### 5. **Custom Footer Text**
- Personalize the footer message (up to 200 characters)
- Default: "Thank you for your business!"

## Database Schema

The branding settings are stored in the `user_profiles` table:

```sql
-- Branding Fields
invoice_primary_color text DEFAULT '#4F46E5'
invoice_secondary_color text DEFAULT '#6366F1'
invoice_accent_color text DEFAULT '#8B5CF6'
invoice_font text DEFAULT 'helvetica'
invoice_footer_text text DEFAULT 'Thank you for your business!'
invoice_header_style text DEFAULT 'gradient'
invoice_show_logo boolean DEFAULT true
invoice_logo_position text DEFAULT 'left'
```

## Installation

### 1. Run the Database Migration

Execute the SQL migration to add branding fields to your database:

```bash
psql -d your_database < add-invoice-branding.sql
```

Or run it directly in your Supabase SQL Editor.

### 2. Access Branding Settings

Navigate to:
```
/dashboard/settings/branding
```

## Usage

### For End Users

1. **Navigate to Branding Settings**
   - Go to Dashboard → Settings → Branding

2. **Customize Your Branding**
   - Select your brand colors using the color pickers or hex input
   - Choose your preferred font style
   - Configure logo display settings
   - Select a header style
   - Write a custom footer message

3. **Preview & Save**
   - Click "Preview" to see how your invoice will look
   - Click "Save Branding Settings" to apply changes
   - Use "Reset to Defaults" to restore default styling

4. **Generate Branded Invoices**
   - All new invoices will automatically use your branding
   - Download or view invoices from the Invoices page

### For Developers

The PDF generator now accepts branding settings:

```typescript
import { generateInvoicePDF } from "@/lib/pdf-generator"

generateInvoicePDF({
  // ... invoice data
  branding: {
    primaryColor: "#4F46E5",
    secondaryColor: "#6366F1",
    accentColor: "#8B5CF6",
    font: "helvetica",
    footerText: "Thank you for your business!",
    headerStyle: "gradient",
    showLogo: true,
    logoPosition: "left",
    logoUrl: "https://..."
  }
})
```

## Components

### 1. **InvoiceBrandingSettings** (`src/components/invoice-branding-settings.tsx`)
- Main UI component for branding configuration
- Handles all user input and validation
- Real-time preview capability

### 2. **Invoice Branding Page** (`src/app/dashboard/settings/branding/page.tsx`)
- Settings page wrapper
- Loads user's current branding settings
- Manages state and data flow

### 3. **PDF Generator** (`src/lib/pdf-generator.ts`)
- Updated to support branding customization
- Converts hex colors to RGB
- Applies fonts, colors, and styles dynamically
- Handles different header styles

## Technical Details

### Color Format
- Colors are stored as hex strings (e.g., `#4F46E5`)
- Converted to RGB tuples for jsPDF rendering
- Fallback to default indigo if invalid hex

### Font Support
- Limited to jsPDF-supported fonts: helvetica, times, courier
- Applied consistently across all invoice text
- Font selection affects both headings and body text

### Header Styles Implementation

**Gradient**: Creates a layered effect using multiple rectangles with opacity
```typescript
doc.setFillColor(...primaryColor)
doc.rect(0, 0, 210, 40, "F")
doc.setFillColor(...secondaryColor)
doc.setGState(new doc.GState({ opacity: 0.3 }))
doc.rect(0, 0, 210, 20, "F")
```

**Minimal**: Simple border line, no background fill
```typescript
doc.setDrawColor(...primaryColor)
doc.setLineWidth(1)
doc.line(0, 40, 210, 40)
```

**Solid**: Single color fill
```typescript
doc.setFillColor(...primaryColor)
doc.rect(0, 0, 210, 40, "F")
```

## Best Practices

### Color Selection
- Ensure sufficient contrast between header and text colors
- Test colors with both light and dark themes
- Use brand colors that reflect your business identity

### Typography
- Helvetica: Best for modern, professional services
- Times: Ideal for legal, traditional businesses
- Courier: Suitable for technical or development services

### Footer Text
- Keep it professional and concise
- Include relevant business information if needed
- Consider adding payment terms or contact info

## Future Enhancements

Potential improvements for future versions:

1. **Logo Upload & Management**
   - Direct logo upload from settings
   - Logo sizing and positioning controls
   - Support for PNG, SVG formats

2. **More Font Options**
   - Integration with Google Fonts
   - Custom font uploads
   - Font weight and style variations

3. **Template Library**
   - Pre-designed invoice templates
   - Industry-specific layouts
   - Quick template switching

4. **Advanced Customization**
   - Custom fields on invoices
   - Line item styling options
   - Watermark support
   - Multi-language support

5. **Live Preview**
   - Real-time invoice preview
   - Sample data generation
   - Side-by-side comparison

## Troubleshooting

### Colors Not Applying
- Verify hex color format includes '#' prefix
- Check that migration was run successfully
- Ensure user profile exists

### Fonts Not Changing
- Confirm font value matches: 'helvetica', 'times', or 'courier'
- Clear browser cache
- Re-save branding settings

### Settings Not Persisting
- Check user authentication
- Verify database RLS policies
- Ensure `updateUserProfile` action is working

## Support

For issues or questions about invoice branding:
- Check this documentation first
- Review database schema and RLS policies
- Test with default settings to isolate issues
- Contact support at syniq.store@gmail.com
