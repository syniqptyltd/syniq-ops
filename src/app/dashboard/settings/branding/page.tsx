"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { InvoiceBrandingSettings } from "@/components/invoice-branding-settings"
import { getUserProfile } from "@/lib/supabase/actions"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brush } from "lucide-react"

type BrandingSettings = {
  invoice_primary_color: string
  invoice_secondary_color: string
  invoice_accent_color: string
  invoice_font: string
  invoice_footer_text: string
  invoice_header_style: string
  invoice_show_logo: boolean
  invoice_logo_position: string
  logo_url?: string
}

export default function InvoiceBrandingPage() {
  const [settings, setSettings] = useState<BrandingSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadSettings() {
      try {
        const profile = await getUserProfile()
        if (profile) {
          setSettings({
            invoice_primary_color: profile.invoice_primary_color || "#4F46E5",
            invoice_secondary_color: profile.invoice_secondary_color || "#6366F1",
            invoice_accent_color: profile.invoice_accent_color || "#8B5CF6",
            invoice_font: profile.invoice_font || "helvetica",
            invoice_footer_text: profile.invoice_footer_text || "Thank you for your business!",
            invoice_header_style: profile.invoice_header_style || "gradient",
            invoice_show_logo: profile.invoice_show_logo ?? true,
            invoice_logo_position: profile.invoice_logo_position || "left",
            logo_url: profile.logo_url,
          })
        }
      } catch (error) {
        console.error("Error loading branding settings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brush className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Invoice Branding
                </h1>
                <p className="text-muted-foreground mt-1">
                  Customize the appearance of your invoices with your brand colors, logo, and style
                </p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : settings ? (
            <InvoiceBrandingSettings
              initialSettings={settings}
              onPreview={(brandingSettings) => {
                // Preview functionality can be implemented here
                console.log("Preview with settings:", brandingSettings)
              }}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Settings Found</CardTitle>
                <CardDescription>
                  Unable to load your branding settings. Please try again later.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
