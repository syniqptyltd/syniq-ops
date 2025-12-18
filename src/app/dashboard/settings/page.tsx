"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, Building2, User, LogOut } from "lucide-react"
import { updateProfile, updateOrganization, signOut, getUser } from "@/lib/supabase/actions"
import { toast } from "sonner"

export default function SettingsPage() {
  toast.success("aved")
  const [isLoadingOrg, setIsLoadingOrg] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  // Placeholder organization data
  const [orgData, setOrgData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  // Placeholder user profile data
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    setIsLoadingData(true)
    const user = await getUser()

    if (user) {
      // Set profile data from user metadata
      setProfileData({
        fullName: user.user_metadata?.full_name || "",
        email: user.email || "",
        phone: user.user_metadata?.phone || "",
      })

      // Set org data from user metadata
      setOrgData({
        name: user.user_metadata?.business_name || "",
        email: user.user_metadata?.business_email || "",
        phone: user.user_metadata?.business_phone || "",
        address: user.user_metadata?.business_address || "",
      })
    }
    setIsLoadingData(false)
  }

  const handleSaveOrganization = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoadingOrg(true)

    const result = await updateOrganization({
      business_name: orgData.name,
      business_email: orgData.email,
      business_phone: orgData.phone,
      business_address: orgData.address,
    })

    setIsLoadingOrg(false)

    if (result?.error) {
      toast.error(" Error updating organization details")
    } else {
      toast.success("Successfully updated organization details")
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoadingProfile(true)

    const result = await updateProfile({
      full_name: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
    })

    setIsLoadingProfile(false)

    if (result?.error) {
      toast.error("Error updating profile")
    } else {
      toast.success("Successfully updated profile")
    }
  }

  const handleLogout = async () => {
    await signOut()
  }

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your organization and profile settings</p>
      </div>

      {/* Organization Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>Update your business information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveOrganization}>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Business Name</Label>
                  <Input
                    id="org-name"
                    value={orgData.name}
                    onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                    disabled={isLoadingOrg}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-email">Business Email</Label>
                  <Input
                    id="org-email"
                    type="email"
                    value={orgData.email}
                    onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                    disabled={isLoadingOrg}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="org-phone">Business Phone</Label>
                  <Input
                    id="org-phone"
                    type="tel"
                    value={orgData.phone}
                    onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                    disabled={isLoadingOrg}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-address">Business Address</Label>
                  <Input
                    id="org-address"
                    value={orgData.address}
                    onChange={(e) => setOrgData({ ...orgData, address: e.target.value })}
                    disabled={isLoadingOrg}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoadingOrg}>
                  {isLoadingOrg && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* User Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Full Name</Label>
                <Input
                  id="profile-name"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  disabled={isLoadingProfile}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profile-email">Email</Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={isLoadingProfile}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-phone">Phone</Label>
                  <Input
                    id="profile-phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={isLoadingProfile}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoadingProfile}>
                  {isLoadingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Logout Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>Manage your account session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Log out of your account</p>
              <p className="text-sm text-muted-foreground">You can always log back in anytime</p>
            </div>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
