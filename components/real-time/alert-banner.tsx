"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X, ExternalLink } from "lucide-react"

interface AlertBanner {
  id: string
  type: "emergency" | "warning" | "info"
  title: string
  message: string
  location: string
  actionUrl?: string
  dismissible: boolean
  expiresAt?: Date
}

export function AlertBanner() {
  const [alerts, setAlerts] = useState<AlertBanner[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(typeof window !== "undefined" && window.innerWidth < 640)
    updateIsMobile()
    window.addEventListener("resize", updateIsMobile)
    // detect prefers-reduced-motion
    const mql = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null
    const handleReduced = () => setPrefersReducedMotion(!!(mql && mql.matches))
    handleReduced()
    mql?.addEventListener?.("change", handleReduced)
    setMounted(true)
    return () => {
      window.removeEventListener("resize", updateIsMobile)
      mql?.removeEventListener?.("change", handleReduced)
    }
  }, [])

  useEffect(() => {
    // Mock critical alerts
    const mockAlerts: AlertBanner[] = [
      {
        id: "emergency-1",
        type: "emergency",
        title: "TSUNAMI WARNING",
        message:
          "Tsunami warning issued for Chennai and surrounding coastal areas. Evacuate immediately to higher ground.",
        location: "Chennai, Tamil Nadu",
        actionUrl: "/emergency-response",
        dismissible: false,
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      },
    ]

    // Simulate receiving alerts
    const timer = setTimeout(() => {
      setAlerts(mockAlerts)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "emergency":
        return "border-red-500 bg-red-50 text-red-900"
      case "warning":
        return "border-orange-500 bg-orange-50 text-orange-900"
      case "info":
        return "border-blue-500 bg-blue-50 text-blue-900"
      default:
        return "border-gray-500 bg-gray-50 text-gray-900"
    }
  }

  if (alerts.length === 0 || !mounted) return null

  const container = typeof document !== "undefined" ? document.body : null

  const content = (
    // Position the alert: top-right on desktop, bottom-center on mobile. Use very high z-index so it overlays everything.
    <div
      aria-live="assertive"
      role="alert"
      className="fixed top-4 right-4 md:top-4 md:right-4 sm:bottom-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-[9999] px-2 w-auto"
    >
      <div className="space-y-2">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            className={`${getAlertStyles(alert.type)} glass-card shadow-lg max-w-sm ${
              prefersReducedMotion ? "" : isMobile ? "animate-in slide-in-from-bottom-2 duration-300" : "animate-in slide-in-from-top-2 duration-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 mt-1" aria-hidden />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-bold text-sm mb-1">
                      {alert.title} - {alert.location}
                    </div>
                    <AlertDescription className="text-sm">{alert.message}</AlertDescription>
                  </div>

                  {/* Close / dismiss button (always available) */}
                  <div className="ml-2">
                    <Button size="sm" variant="ghost" onClick={() => dismissAlert(alert.id)} aria-label={`Dismiss ${alert.title}`}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {alert.actionUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={alert.actionUrl}>
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Details
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Alert>
        ))}
      </div>
    </div>
  )

  return container ? createPortal(content, container) : content
}
