"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, Users, Eye, CheckCircle } from "lucide-react"
import type { DashboardFilters } from "@/app/dashboard/page"

interface StatsOverviewProps {
  filters: DashboardFilters
}

export function StatsOverview({ filters }: StatsOverviewProps) {
  // Mock stats - replace with real API data
  const stats = [
    {
      title: "Active Reports",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: AlertTriangle,
      description: "Last 24 hours",
    },
    {
      title: "Verified Incidents",
      value: "89",
      change: "+5%",
      trend: "up",
      icon: CheckCircle,
      description: "Confirmed by officials",
    },
    {
      title: "Community Reports",
      value: "1,234",
      change: "+18%",
      trend: "up",
      icon: Users,
      description: "This week",
    },
    {
      title: "Social Media Mentions",
      value: "5,678",
      change: "+25%",
      trend: "up",
      icon: Eye,
      description: "Hazard-related posts",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={stat.trend === "up" ? "default" : "secondary"} className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </Badge>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
