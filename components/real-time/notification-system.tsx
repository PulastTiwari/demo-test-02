"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, X, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react"

interface Notification {
  id: string
  type: "alert" | "info" | "success" | "warning"
  title: string
  message: string
  timestamp: Date
  location?: string
  severity?: "low" | "medium" | "high" | "critical"
  read: boolean
  actionRequired?: boolean
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const bellRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  // Mock real-time notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "alert",
        title: "Critical Storm Surge Warning",
        message: "Severe storm surge detected at Chennai Marina. Immediate evacuation recommended for coastal areas.",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        location: "Chennai, Tamil Nadu",
        severity: "critical",
        read: false,
        actionRequired: true,
      },
      {
        id: "2",
        type: "warning",
        title: "High Wave Activity",
        message: "Unusual wave patterns reported at Mumbai Marine Drive. Citizens advised to maintain safe distance.",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        location: "Mumbai, Maharashtra",
        severity: "high",
        read: false,
        actionRequired: false,
      },
      {
        id: "3",
        type: "info",
        title: "Social Media Trend Alert",
        message: "Increased mentions of 'coastal flooding' detected across social platforms in Goa region.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        location: "Goa",
        severity: "medium",
        read: true,
        actionRequired: false,
      },
      {
        id: "4",
        type: "success",
        title: "Incident Verification Complete",
        message: "Report #HZ-2024-001 has been verified by official sources. Status updated to confirmed.",
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        read: true,
        actionRequired: false,
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: Math.random() > 0.7 ? "alert" : Math.random() > 0.5 ? "warning" : "info",
        title: "New Hazard Report",
        message: "A new ocean hazard has been reported and is being processed.",
        timestamp: new Date(),
        read: false,
        actionRequired: Math.random() > 0.7,
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)])
      setUnreadCount((prev) => prev + 1)
    }, 30000) // New notification every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return AlertTriangle
      case "warning":
        return AlertTriangle
      case "success":
        return CheckCircle
      case "info":
        return Info
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "alert":
        return "text-red-600 bg-red-50 border-red-200"
      case "warning":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "success":
        return "text-green-600 bg-green-50 border-green-200"
      case "info":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getSeverityBadge = (severity?: string) => {
    if (!severity) return null
    const colors = {
      critical: "destructive",
      high: "default",
      medium: "secondary",
      low: "outline",
    }
    return (
      <Badge variant={colors[severity as keyof typeof colors] as any} className="text-xs">
        {severity}
      </Badge>
    )
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const removeNotification = (id: string) => {
    const notification = notifications.find((n) => n.id === id)
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    if (notification && !notification.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1))
    }
  }

  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      const target = e.target as Node
      if (isOpen) {
        if (panelRef.current && panelRef.current.contains(target)) return
        if (bellRef.current && bellRef.current.contains(target)) return
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickAway)
    return () => document.removeEventListener("mousedown", handleClickAway)
  }, [isOpen])

  return (
  // Anchor container matches TopLiveBar's top-right fixed container
  <div className="relative pointer-events-auto">
      {/* Notification Bell */}
      <Button
        ref={bellRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen((s) => !s)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        // Anchor notifications to the top-right of the viewport (near LanguageToggle in TopLiveBar)
        <Card
          id="notification-panel"
          ref={panelRef}
          className={`z-[9999] shadow-lg glass-card w-80 max-w-[95vw] max-h-96 overflow-hidden
            fixed top-16 right-4 sm:top-16 sm:right-4 md:right-6 lg:right-8`}
          role="dialog"
          aria-label="Notifications"
          style={{ pointerEvents: 'auto' }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => setEnabled((v) => !v)}
                    className="form-checkbox h-4 w-4"
                    aria-label={enabled ? "Disable notifications" : "Enable notifications"}
                  />
                  <span className="hidden sm:inline">Notifications</span>
                </label>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type)
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 border-l-4 hover:bg-muted/30 transition-colors cursor-pointer ${
                          !notification.read ? "bg-accent/5" : ""
                        } ${getNotificationColor(notification.type)}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            {!notification.read && <div className="w-2 h-2 bg-accent rounded-full"></div>}
                          </div>
                          <div className="flex items-center gap-1">
                            {getSeverityBadge(notification.severity)}
                            {notification.actionRequired && (
                              <Badge variant="outline" className="text-xs">
                                Action Required
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                              className="w-6 h-6 p-0"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {notification.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          {notification.location && <span>{notification.location}</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
