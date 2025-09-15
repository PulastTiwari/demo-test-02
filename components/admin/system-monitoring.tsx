"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Database, Wifi, AlertTriangle, CheckCircle } from "lucide-react"

interface SystemMetrics {
  uptime: string
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  activeConnections: number
  requestsPerMinute: number
  errorRate: number
  databaseStatus: "healthy" | "warning" | "critical"
  apiStatus: "online" | "offline"
}

export function SystemMonitoring() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    uptime: "99.9%",
    cpuUsage: 45,
    memoryUsage: 67,
    diskUsage: 23,
    activeConnections: 1247,
    requestsPerMinute: 2340,
    errorRate: 0.02,
    databaseStatus: "healthy",
    apiStatus: "online",
  })

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + Math.random() * 10 - 5)),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + Math.random() * 6 - 3)),
        diskUsage: Math.max(0, Math.min(100, prev.diskUsage + Math.random() * 2 - 1)),
        activeConnections: Math.max(0, prev.activeConnections + Math.floor(Math.random() * 20 - 10)),
        requestsPerMinute: Math.max(0, prev.requestsPerMinute + Math.floor(Math.random() * 100 - 50)),
        errorRate: Math.max(0, prev.errorRate + (Math.random() * 0.01 - 0.005)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "online":
        return "text-green-600"
      case "warning":
        return "text-orange-600"
      case "critical":
      case "offline":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "online":
        return CheckCircle
      case "warning":
      case "critical":
      case "offline":
        return AlertTriangle
      default:
        return Activity
    }
  }

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return "text-red-600"
    if (usage >= 60) return "text-orange-600"
    return "text-green-600"
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-manrope text-xl flex items-center gap-2">
          <Activity className="w-5 h-5" />
          System Monitoring
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* System Status */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span className="text-sm font-medium">Database</span>
            </div>
            <div className="flex items-center gap-2">
              {(() => {
                const StatusIcon = getStatusIcon(metrics.databaseStatus)
                return <StatusIcon className={`w-4 h-4 ${getStatusColor(metrics.databaseStatus)}`} />
              })()}
              <Badge variant="outline" className="capitalize">
                {metrics.databaseStatus}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              <span className="text-sm font-medium">API Status</span>
            </div>
            <div className="flex items-center gap-2">
              {(() => {
                const StatusIcon = getStatusIcon(metrics.apiStatus)
                return <StatusIcon className={`w-4 h-4 ${getStatusColor(metrics.apiStatus)}`} />
              })()}
              <Badge variant="outline" className="capitalize">
                {metrics.apiStatus}
              </Badge>
            </div>
          </div>
        </div>

        {/* Resource Usage */}
        <div className="space-y-4">
          <h4 className="font-medium">Resource Usage</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">CPU Usage</span>
              <span className={`text-sm font-medium ${getUsageColor(metrics.cpuUsage)}`}>
                {metrics.cpuUsage.toFixed(1)}%
              </span>
            </div>
            <Progress value={metrics.cpuUsage} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Memory Usage</span>
              <span className={`text-sm font-medium ${getUsageColor(metrics.memoryUsage)}`}>
                {metrics.memoryUsage.toFixed(1)}%
              </span>
            </div>
            <Progress value={metrics.memoryUsage} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Disk Usage</span>
              <span className={`text-sm font-medium ${getUsageColor(metrics.diskUsage)}`}>
                {metrics.diskUsage.toFixed(1)}%
              </span>
            </div>
            <Progress value={metrics.diskUsage} className="h-2" />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-accent">{metrics.activeConnections.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Active Connections</div>
          </div>

          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-accent">{metrics.requestsPerMinute.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Requests/Minute</div>
          </div>

          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-accent">{metrics.uptime}</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>

          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-accent">{(metrics.errorRate * 100).toFixed(2)}%</div>
            <div className="text-xs text-muted-foreground">Error Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
