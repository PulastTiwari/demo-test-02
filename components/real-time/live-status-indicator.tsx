"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Activity } from "lucide-react"

interface SystemStatus {
  connected: boolean
  lastUpdate: Date
  activeUsers: number
  systemHealth: "healthy" | "warning" | "critical"
}

export function LiveStatusIndicator() {
  const [status, setStatus] = useState<SystemStatus>({
    connected: true,
    lastUpdate: new Date(),
    activeUsers: 1247,
    systemHealth: "healthy",
  })

  // Avoid rendering locale-specific time on the server to prevent hydration
  // mismatches. We'll only format and show the time after the component
  // is mounted on the client.
  const [mounted, setMounted] = useState(false)
  const [formattedTime, setFormattedTime] = useState("")

  useEffect(() => {
    setMounted(true)

    // Simulate real-time status updates
    const interval = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        lastUpdate: new Date(),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        connected: Math.random() > 0.05, // 95% uptime simulation
        systemHealth: Math.random() > 0.9 ? "warning" : "healthy",
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Update the formatted time whenever lastUpdate changes — only on client
  useEffect(() => {
    if (!mounted) return
    setFormattedTime(status.lastUpdate.toLocaleTimeString())
  }, [status.lastUpdate, mounted])

  const getStatusColor = () => {
    if (!status.connected) return "destructive"
    if (status.systemHealth === "warning") return "secondary"
    return "default"
  }

  const getStatusIcon = () => {
    if (!status.connected) return WifiOff
    return Wifi
  }

  const StatusIcon = getStatusIcon()

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <StatusIcon className="w-4 h-4" />
        <Badge variant={getStatusColor()}>{status.connected ? "Live" : "Disconnected"}</Badge>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground">
        <Activity className="w-4 h-4" />
        <span>{status.activeUsers.toLocaleString()} active users</span>
      </div>

      <div className="text-muted-foreground">Last update: {mounted ? formattedTime : "—"}</div>
    </div>
  )
}
