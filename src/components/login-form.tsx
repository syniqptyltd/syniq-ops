"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { signIn } from "@/lib/supabase/actions"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})
  const [formError, setFormError] = useState("")

  const validateForm = () => {
    const newErrors: typeof errors = {}

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const result = await signIn(formData.email, formData.password)

      if (result?.error) {
        setFormError(result.error)
        setIsLoading(false)
      } else if (result?.success) {
        // Success - redirect to dashboard
        window.location.href = "/dashboard"
      }
    } catch (error) {
      setFormError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    // Clear form error when user starts typing
    if (formError) {
      setFormError("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange("email")}
          disabled={isLoading}
          className={errors.email ? "border-destructive" : ""}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange("password")}
          disabled={isLoading}
          className={errors.password ? "border-destructive" : ""}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <p id="password-error" className="text-sm text-destructive">
            {errors.password}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Log in"
        )}
      </Button>
    </form>
  )
}
