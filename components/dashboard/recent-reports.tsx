"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, MapPin, Clock, Users, Eye, CheckCircle } from "lucide-react"
import type { DashboardFilters } from "@/app/dashboard/page"

interface RecentReportsProps {
  filters: DashboardFilters
}

// Mock data - replace with real API
const MOCK_RECENT_REPORTS = [
  {
    id: "1",
    type: "Storm Surge",
    severity: "critical",
    location: "Chennai Marina Beach",
    timestamp: "2 minutes ago",
    source: "official",
    verified: true,
    description: "Severe storm surge warning issued for Chennai coastline. Immediate evacuation recommended.",
  },
  {
    id: "2",
    type: "High Waves",
    severity: "high",
    location: "Mumbai Marine Drive",
    timestamp: "15 minutes ago",
    source: "citizen",
    verified: true,
    description: "Unusually high waves observed, water splashing over the promenade.",
  },
  {
    id: "3",
    type: "Coastal Flooding",
    severity: "medium",
    location: "Goa Calangute Beach",
    timestamp: "1 hour ago",
    source: "social_media",
    verified: false,
    description: "Multiple social media reports of coastal flooding in tourist areas.",
  },
  {
    id: "4",
    type: "Swell Surge",
    severity: "high",
    location: "Kerala Kovalam",
    timestamp: "2 hours ago",
    source: "official",
    verified: true,
    description: "Swell surge advisory issued for Kerala coast. Fishermen advised not to venture out.",
  },
  {
    id: "5",
    type: "Unusual Tides",
    severity: "low",
    location: "Puducherry Beach",
    timestamp: "3 hours ago",
    source: "citizen",
    verified: false,
    description: "Local residents report unusual tidal patterns and water levels.",
  },
]

export function RecentReports({ filters }: RecentReportsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "citizen":
        return Users
      case "official":
        return AlertTriangle
      case "social_media":
        return Eye
      default:
        return AlertTriangle
    }
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-manrope text-xl">Recent Reports</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {MOCK_RECENT_REPORTS.map((report) => {
          const SourceIcon = getSourceIcon(report.source)
          return (
            <div key={report.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{report.type}</h4>
                  <Badge variant={getSeverityColor(report.severity) as any}>{report.severity}</Badge>
                  {report.verified && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <SourceIcon className="w-3 h-3" />
                  <span className="capitalize">{report.source.replace("_", " ")}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{report.description}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{report.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{report.timestamp}</span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
