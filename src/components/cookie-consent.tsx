"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Cookie, Settings } from "lucide-react"

const COOKIE_CONSENT_KEY = "syniq-ops-cookie-consent"
const COOKIE_PREFERENCES_KEY = "syniq-ops-cookie-preferences"

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000)
    } else {
      // Load saved preferences
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY)
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs))
      }
    }
  }, [])

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true")
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs))
    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    }
    saveConsent(allAccepted)
  }

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    }
    saveConsent(essentialOnly)
  }

  const handleSavePreferences = () => {
    saveConsent(preferences)
    setShowPreferences(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pb-4 px-4 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-4xl border-primary/20 bg-card/95 backdrop-blur-lg shadow-2xl">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  Cookie Consent
                </h3>
                {!showPreferences ? (
                  <>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      We use cookies to ensure the proper functioning of our platform, analyze usage,
                      and improve your experience. Essential cookies are required for the site to work.
                      You can choose to accept all cookies or customize your preferences.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      By clicking "Accept All", you agree to our use of cookies as described in our{" "}
                      <Link href="/legal/cookies" className="text-primary hover:underline font-medium">
                        Cookie Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/legal/popia" className="text-primary hover:underline font-medium">
                        POPIA Compliance Notice
                      </Link>.
                    </p>
                  </>
                ) : (
                  <div className="mt-4 space-y-4">
                    {/* Essential Cookies */}
                    <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
                      <input
                        type="checkbox"
                        checked={preferences.essential}
                        disabled
                        className="mt-1 h-4 w-4 rounded border-border"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">
                          Essential Cookies <span className="text-muted-foreground">(Required)</span>
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          These cookies are necessary for authentication, security, and basic site functionality.
                          They cannot be disabled.
                        </p>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-start gap-3 rounded-lg border border-border bg-background p-4">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) =>
                          setPreferences({ ...preferences, analytics: e.target.checked })
                        }
                        className="mt-1 h-4 w-4 rounded border-border accent-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">Analytics Cookies</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Help us understand how you use our platform so we can improve performance and user experience.
                        </p>
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-start gap-3 rounded-lg border border-border bg-background p-4">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) =>
                          setPreferences({ ...preferences, marketing: e.target.checked })
                        }
                        className="mt-1 h-4 w-4 rounded border-border accent-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">Marketing Cookies</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Used to deliver personalized content and track the effectiveness of our campaigns.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {!showPreferences ? (
                    <>
                      <Button onClick={handleAcceptAll} size="sm" className="text-sm">
                        Accept All
                      </Button>
                      <Button onClick={handleRejectAll} variant="outline" size="sm" className="text-sm">
                        Reject All
                      </Button>
                      <Button
                        onClick={() => setShowPreferences(true)}
                        variant="ghost"
                        size="sm"
                        className="text-sm gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Manage Preferences
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={handleSavePreferences} size="sm" className="text-sm">
                        Save Preferences
                      </Button>
                      <Button
                        onClick={() => setShowPreferences(false)}
                        variant="outline"
                        size="sm"
                        className="text-sm"
                      >
                        Back
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              className="shrink-0"
              aria-label="Close cookie banner"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
