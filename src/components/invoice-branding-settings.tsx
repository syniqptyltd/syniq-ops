"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { updateUserProfile } from "@/lib/supabase/actions"
import { toast } from "sonner"
import { Palette, Type, AlignLeft, Image as ImageIcon, Eye } from "lucide-react"

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

type InvoiceBrandingSettingsProps = {
  initialSettings: BrandingSettings
  onPreview?: (settings: BrandingSettings) => void
}

export function InvoiceBrandingSettings({ initialSettings, onPreview }: InvoiceBrandingSettingsProps) {
  const [settings, setSettings] = useState<BrandingSettings>(initialSettings)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateUserProfile(settings)
      toast.success("Invoice branding settings saved successfully")
    } catch (error) {
      console.error("Error saving branding settings:", error)
      toast.error("Failed to save branding settings")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = () => {
    if (onPreview) {
      onPreview(settings)
    }
  }

  const resetToDefaults = () => {
    setSettings({
      ...settings,
      invoice_primary_color: "#4F46E5",
      invoice_secondary_color: "#6366F1",
      invoice_accent_color: "#8B5CF6",
      invoice_font: "helvetica",
      invoice_footer_text: "Thank you for your business!",
      invoice_header_style: "gradient",
      invoice_show_logo: true,
      invoice_logo_position: "left",
    })
    toast.info("Reset to default branding")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Colors
          </CardTitle>
          <CardDescription>
            Customize the color scheme for your invoices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primary-color"
                  type="color"
                  value={settings.invoice_primary_color}
                  onChange={(e) =>
                    setSettings({ ...settings, invoice_primary_color: e.target.value })
                  }
                  className="h-10 w-20"
                />
                <Input
                  type="text"
                  value={settings.invoice_primary_color}
                  onChange={(e) =>
                    setSettings({ ...settings, invoice_primary_color: e.target.value })
                  }
                  placeholder="#4F46E5"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Header background color</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondary-color"
                  type="color"
                  value={settings.invoice_secondary_color}
                  onChange={(e) =>
                    setSettings({ ...settings, invoice_secondary_color: e.target.value })
                  }
                  className="h-10 w-20"
                />
                <Input
                  type="text"
                  value={settings.invoice_secondary_color}
                  onChange={(e) =>
                    setSettings({ ...settings, invoice_secondary_color: e.target.value })
                  }
                  placeholder="#6366F1"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Table header color</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex gap-2">
                <Input
                  id="accent-color"
                  type="color"
                  value={settings.invoice_accent_color}
                  onChange={(e) =>
                    setSettings({ ...settings, invoice_accent_color: e.target.value })
                  }
                  className="h-10 w-20"
                />
                <Input
                  type="text"
                  value={settings.invoice_accent_color}
                  onChange={(e) =>
                    setSettings({ ...settings, invoice_accent_color: e.target.value })
                  }
                  placeholder="#8B5CF6"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Total amount color</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Typography
          </CardTitle>
          <CardDescription>
            Choose the font style for your invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="font">Font Family</Label>
            <Select
              value={settings.invoice_font}
              onValueChange={(value) => setSettings({ ...settings, invoice_font: value })}
            >
              <SelectTrigger id="font">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="helvetica">Helvetica (Modern, Clean)</SelectItem>
                <SelectItem value="times">Times (Classic, Formal)</SelectItem>
                <SelectItem value="courier">Courier (Typewriter, Technical)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Logo Settings
          </CardTitle>
          <CardDescription>
            Configure how your logo appears on invoices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-logo">Show Logo</Label>
              <p className="text-sm text-muted-foreground">
                Display your company logo on invoices
              </p>
            </div>
            <Switch
              id="show-logo"
              checked={settings.invoice_show_logo}
              onCheckedChange={(checked: boolean) =>
                setSettings({ ...settings, invoice_show_logo: checked })
              }
            />
          </div>

          {settings.invoice_show_logo && (
            <div className="space-y-2">
              <Label htmlFor="logo-position">Logo Position</Label>
              <Select
                value={settings.invoice_logo_position}
                onValueChange={(value) =>
                  setSettings({ ...settings, invoice_logo_position: value })
                }
              >
                <SelectTrigger id="logo-position">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlignLeft className="h-5 w-5" />
            Header & Footer
          </CardTitle>
          <CardDescription>
            Customize the header style and footer message
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="header-style">Header Style</Label>
            <Select
              value={settings.invoice_header_style}
              onValueChange={(value) =>
                setSettings({ ...settings, invoice_header_style: value })
              }
            >
              <SelectTrigger id="header-style">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid Color</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="footer-text">Footer Text</Label>
            <Textarea
              id="footer-text"
              value={settings.invoice_footer_text}
              onChange={(e) =>
                setSettings({ ...settings, invoice_footer_text: e.target.value })
              }
              placeholder="Thank you for your business!"
              rows={3}
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground">
              {settings.invoice_footer_text.length}/200 characters
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleSave} disabled={isSaving} className="flex-1">
          {isSaving ? "Saving..." : "Save Branding Settings"}
        </Button>
        <Button onClick={handlePreview} variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button onClick={resetToDefaults} variant="outline">
          Reset to Defaults
        </Button>
      </div>
    </div>
  )
}
