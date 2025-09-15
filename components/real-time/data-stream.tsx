"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, Users, AlertTriangle } from "lucide-react"

interface DataPoint {
  timestamp: Date
  reports: number
  socialMentions: number
  activeUsers: number
  criticalAlerts: number
}

export function DataStream() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([])
  const [currentData, setCurrentData] = useState<DataPoint>({
    timestamp: new Date(),
    reports: 247,
    socialMentions: 1834,
    activeUsers: 1247,
    criticalAlerts: 3,
  })

  useEffect(() => {
    // Simulate real-time data stream
    const interval = setInterval(() => {
      const newDataPoint: DataPoint = {
        timestamp: new Date(),
        reports: currentData.reports + Math.floor(Math.random() * 5 - 2),
        socialMentions: currentData.socialMentions + Math.floor(Math.random() * 20 - 10),
        activeUsers: currentData.activeUsers + Math.floor(Math.random() * 10 - 5),
        criticalAlerts: Math.max(0, currentData.criticalAlerts + Math.floor(Math.random() * 3 - 1)),
      }

      setCurrentData(newDataPoint)
      setDataPoints((prev) => [...prev.slice(-19), newDataPoint]) // Keep last 20 points
    }, 2000)

    return () => clearInterval(interval)
  }, [currentData])

  const metrics = [
    {
      label: "Active Reports",
      value: currentData.reports,
      icon: AlertTriangle,
      color: "text-red-600",
      change: dataPoints.length > 1 ? currentData.reports - dataPoints[dataPoints.length - 2].reports : 0,
    },
    {
      label: "Social Mentions",
      value: currentData.socialMentions,
      icon: TrendingUp,
      color: "text-blue-600",
      change: dataPoints.length > 1 ? currentData.socialMentions - dataPoints[dataPoints.length - 2].socialMentions : 0,
    },
    {
      label: "Active Users",
      value: currentData.activeUsers,
      icon: Users,
      color: "text-green-600",
      change: dataPoints.length > 1 ? currentData.activeUsers - dataPoints[dataPoints.length - 2].activeUsers : 0,
    },
    {
      label: "Critical Alerts",
      value: currentData.criticalAlerts,
      icon: Activity,
      color: "text-orange-600",
      change: dataPoints.length > 1 ? currentData.criticalAlerts - dataPoints[dataPoints.length - 2].criticalAlerts : 0,
    },
  ]

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-manrope text-lg flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Live Data Stream
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className="text-center p-3 rounded-lg bg-muted/30">
                <Icon className={`w-5 h-5 mx-auto mb-2 ${metric.color}`} />
                <div className="text-2xl font-bold">{metric.value.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                <Badge
                  variant={metric.change > 0 ? "default" : metric.change < 0 ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}
                </Badge>
              </div>
            )
          })}
        </div>

        {/* Mini Chart */}
        <div className="mt-4 h-16 bg-muted/20 rounded-lg p-2">
          <div className="flex items-end justify-between h-full">
            {dataPoints.slice(-10).map((point, index) => (
              <div
                key={index}
                className="bg-accent rounded-sm w-2 transition-all duration-300"
                style={{
                  height: `${Math.max(10, (point.reports / Math.max(...dataPoints.map((d) => d.reports))) * 100)}%`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center mt-2">
          Last updated: {currentData.timestamp.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  )
}
