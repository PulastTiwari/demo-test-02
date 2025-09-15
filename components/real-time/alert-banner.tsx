"use client"

import { useState, useEffect } from "react"
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

  if (alerts.length === 0) return null

  return (
    <div className="fixed top-20 left-0 right-0 z-40 px-4">
      <div className="max-w-7xl mx-auto space-y-2">
        {alerts.map((alert) => (
          <Alert key={alert.id} className={`${getAlertStyles(alert.type)} animate-in slide-in-from-top-2 duration-300`}>
            <AlertTriangle className="h-4 w-4" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-bold text-sm mb-1">
                    {alert.title} - {alert.location}
                  </div>
                  <AlertDescription className="text-sm">{alert.message}</AlertDescription>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {alert.actionUrl && (
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  )}
                  {alert.dismissible && (
                    <Button size="sm" variant="ghost" onClick={() => dismissAlert(alert.id)}>
                      <X className="w-4 h-4" />
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
}
