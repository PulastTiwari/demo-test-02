"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share, MessageCircle, Eye } from "lucide-react"

export function EngagementMetrics() {
  // Mock engagement data
  const metrics = [
    {
      label: "Total Reach",
      value: "2.4M",
      change: "+15%",
      icon: Eye,
      color: "text-blue-600",
    },
    {
      label: "Interactions",
      value: "45.2K",
      change: "+23%",
      icon: Heart,
      color: "text-red-600",
    },
    {
      label: "Shares",
      value: "12.8K",
      change: "+18%",
      icon: Share,
      color: "text-green-600",
    },
    {
      label: "Comments",
      value: "8.9K",
      change: "+12%",
      icon: MessageCircle,
      color: "text-purple-600",
    },
  ]

  const platformBreakdown = [
    { platform: "Twitter", percentage: 45, posts: 1234 },
    { platform: "Facebook", percentage: 35, posts: 892 },
    { platform: "YouTube", percentage: 20, posts: 456 },
  ]

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-manrope text-lg">Engagement Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className="text-center">
                <Icon className={`w-5 h-5 mx-auto mb-1 ${metric.color}`} />
                <div className="text-lg font-bold">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
                <Badge variant="secondary" className="text-xs mt-1">
                  {metric.change}
                </Badge>
              </div>
            )
          })}
        </div>

        {/* Platform Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Platform Distribution</h4>
          {platformBreakdown.map((platform, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>{platform.platform}</span>
                <span>{platform.percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${platform.percentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground">{platform.posts} posts</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
