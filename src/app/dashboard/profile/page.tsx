"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Building2, Save } from "lucide-react"
import { getUserProfile, upsertUserProfile } from "@/lib/supabase/actions"

type ProfileData = {
  business_name: string
  vat_number: string
  registration_number: string
  is_vat_registered: boolean
  address_line1: string
  address_line2: string
  city: string
  postal_code: string
  country: string
  phone: string
  email: string
  website: string
}

export default function ProfilePage() {
  const [formData, setFormData] = useState<ProfileData>({
    business_name: "",
    vat_number: "",
    registration_number: "",
    is_vat_registered: false,
    address_line1: "",
    address_line2: "",
    city: "",
    postal_code: "",
    country: "South Africa",
    phone: "",
    email: "",
    website: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    setIsLoading(true)
    const profile = await getUserProfile()

    if (profile) {
      setFormData({
        business_name: profile.business_name || "",
        vat_number: profile.vat_number || "",
        registration_number: profile.registration_number || "",
        is_vat_registered: profile.is_vat_registered || false,
        address_line1: profile.address_line1 || "",
        address_line2: profile.address_line2 || "",
        city: profile.city || "",
        postal_code: profile.postal_code || "",
        country: profile.country || "South Africa",
        phone: profile.phone || "",
        email: profile.email || "",
        website: profile.website || "",
      })
    }

    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveMessage(null)

    try {
      const result = await upsertUserProfile(formData)

      if (result?.error) {
        setSaveMessage({ type: "error", text: result.error })
      } else {
        setSaveMessage({ type: "success", text: "Profile saved successfully!" })
        setTimeout(() => setSaveMessage(null), 3000)
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      setSaveMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your business information used in invoices and documents
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Business Information
              </CardTitle>
              <CardDescription>Your company details for professional invoicing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="business_name">Business Name</Label>
                  <Input
                    id="business_name"
                    placeholder="SyniqOps"
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vat_number">VAT Number</Label>
                  <Input
                    id="vat_number"
                    placeholder="VAT4123456789"
                    value={formData.vat_number}
                    onChange={(e) => setFormData({ ...formData, vat_number: e.target.value })}
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground">Will appear on invoices</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="is_vat_registered"
                  checked={formData.is_vat_registered}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_vat_registered: checked as boolean })}
                  disabled={isSaving}
                />
                <Label htmlFor="is_vat_registered" className="font-normal cursor-pointer text-sm">
                  Business is currently VAT registered (controls VAT calculations on invoices)
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registration_number">Company Registration Number</Label>
                <Input
                  id="registration_number"
                  placeholder="2024/123456/07"
                  value={formData.registration_number}
                  onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                  disabled={isSaving}
                />
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle>Business Address</CardTitle>
              <CardDescription>Your company's physical address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address_line1">Address Line 1</Label>
                <Input
                  id="address_line1"
                  placeholder="123 Business Street"
                  value={formData.address_line1}
                  onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address_line2">Address Line 2 (Optional)</Label>
                <Input
                  id="address_line2"
                  placeholder="Suite 100"
                  value={formData.address_line2}
                  onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
                  disabled={isSaving}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Cape Town"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input
                    id="postal_code"
                    placeholder="8001"
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="South Africa"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    disabled={isSaving}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How clients can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+27 82 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hello@syniqops.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://www.syniqops.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  disabled={isSaving}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex items-center justify-between">
            <div>
              {saveMessage && (
                <p
                  className={`text-sm ${
                    saveMessage.type === "success" ? "text-green-600" : "text-destructive"
                  }`}
                >
                  {saveMessage.text}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isSaving} size="lg">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
