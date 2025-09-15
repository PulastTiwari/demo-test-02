"use client"

import { useState } from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, AlertTriangle, Waves, Zap, Users } from "lucide-react"
import type { DashboardFilters } from "@/app/dashboard/page"

interface HazardReport {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  location: {
    lat: number
    lng: number
    name: string
  }
  timestamp: string
  source: "citizen" | "official" | "social_media"
  description: string
  verified: boolean
}

interface Hotspot {
  id: string
  location: {
    lat: number
    lng: number
  }
  intensity: number
  reportCount: number
  dominantHazard: string
}

// Mock data - replace with real API
const MOCK_REPORTS: HazardReport[] = [
  {
    id: "1",
    type: "high-waves",
    severity: "high",
    location: { lat: 19.0176, lng: 72.8562, name: "Mumbai Coast" },
    timestamp: "2024-01-15T10:30:00Z",
    source: "citizen",
    description: "Unusually high waves observed near Marine Drive",
    verified: true,
  },
  {
    id: "2",
    type: "storm-surge",
    severity: "critical",
    location: { lat: 13.0827, lng: 80.2707, name: "Chennai Marina" },
    timestamp: "2024-01-15T09:15:00Z",
    source: "official",
    description: "Storm surge warning issued for Chennai coastline",
    verified: true,
  },
  {
    id: "3",
    type: "coastal-flooding",
    severity: "medium",
    location: { lat: 15.2993, lng: 74.124, name: "Goa Beaches" },
    timestamp: "2024-01-15T08:45:00Z",
    source: "social_media",
    description: "Reports of coastal flooding from social media",
    verified: false,
  },
  {
    id: "4",
    type: "unusual-tides",
    severity: "low",
    location: { lat: 11.9416, lng: 79.8083, name: "Puducherry" },
    timestamp: "2024-01-15T07:20:00Z",
    source: "citizen",
    description: "Unusual tidal patterns observed",
    verified: true,
  },
  {
    id: "5",
    type: "swell-surge",
    severity: "high",
    location: { lat: 8.5241, lng: 76.9366, name: "Thiruvananthapuram" },
    timestamp: "2024-01-15T06:10:00Z",
    source: "official",
    description: "Swell surge advisory for Kerala coast",
    verified: true,
  },
]

const MOCK_HOTSPOTS: Hotspot[] = [
  {
    id: "h1",
    location: { lat: 19.0176, lng: 72.8562 },
    intensity: 0.8,
    reportCount: 12,
    dominantHazard: "high-waves",
  },
  {
    id: "h2",
    location: { lat: 13.0827, lng: 80.2707 },
    intensity: 0.95,
    reportCount: 18,
    dominantHazard: "storm-surge",
  },
  {
    id: "h3",
    location: { lat: 15.2993, lng: 74.124 },
    intensity: 0.6,
    reportCount: 8,
    dominantHazard: "coastal-flooding",
  },
]

interface InteractiveMapProps {
  filters: DashboardFilters
}

export function InteractiveMap({ filters }: InteractiveMapProps) {
  const [selectedReport, setSelectedReport] = useState<HazardReport | null>(null)
  const [showHotspots, setShowHotspots] = useState(true)
  const [mapView, setMapView] = useState<"satellite" | "terrain" | "street">("terrain")

  // Filter reports based on current filters
  const filteredReports = MOCK_REPORTS.filter((report) => {
    if (filters.hazardTypes.length > 0 && !filters.hazardTypes.includes(report.type)) return false
    if (filters.severityLevels.length > 0 && !filters.severityLevels.includes(report.severity)) return false
    if (filters.sources.length > 0 && !filters.sources.includes(report.source)) return false
    return true
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "citizen":
        return Users
      case "official":
        return AlertTriangle
      case "social_media":
        return Waves
      default:
        return MapPin
    }
  }

  return (
    <div className="relative">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-manrope text-xl">Live Hazard Map</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={showHotspots ? "default" : "outline"}
              size="sm"
              onClick={() => setShowHotspots(!showHotspots)}
            >
              <Zap className="w-4 h-4 mr-1" />
              Hotspots
            </Button>
            <select
              value={mapView}
              onChange={(e) => setMapView(e.target.value as any)}
              className="px-3 py-1 text-sm border rounded-md bg-background"
            >
              <option value="terrain">Terrain</option>
              <option value="satellite">Satellite</option>
              <option value="street">Street</option>
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Map Container */}
        <div className="relative h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-b-lg overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Coastline representation */}
              <path
                d="M0,200 Q100,180 200,190 T400,200 L400,300 L0,300 Z"
                fill="currentColor"
                className="text-blue-200"
              />
              <path
                d="M0,220 Q150,200 300,210 T400,220 L400,300 L0,300 Z"
                fill="currentColor"
                className="text-blue-300"
              />
            </svg>
          </div>

          {/* Hotspots */}
          {showHotspots &&
            MOCK_HOTSPOTS.map((hotspot) => (
              <div
                key={hotspot.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                style={{
                  left: `${(hotspot.location.lng - 68) * 8}%`,
                  top: `${(28 - hotspot.location.lat) * 8}%`,
                }}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 border-white shadow-lg ${
                    hotspot.intensity > 0.8 ? "bg-red-500" : hotspot.intensity > 0.6 ? "bg-orange-500" : "bg-yellow-500"
                  }`}
                >
                  <div className="w-full h-full rounded-full animate-ping opacity-30 bg-current"></div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white px-2 py-1 rounded shadow">
                  {hotspot.reportCount}
                </div>
              </div>
            ))}

          {/* Report Markers */}
          {filteredReports.map((report) => {
            const SourceIcon = getSourceIcon(report.source)
            return (
              <div
                key={report.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${(report.location.lng - 68) * 8}%`,
                  top: `${(28 - report.location.lat) * 8}%`,
                }}
                onClick={() => setSelectedReport(report)}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${getSeverityColor(
                    report.severity,
                  )}`}
                >
                  <SourceIcon className="w-3 h-3 text-white" />
                </div>
              </div>
            )
          })}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
            <div className="font-medium mb-2">Legend</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Low</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
            <div className="font-medium mb-1">Active Reports</div>
            <div className="text-2xl font-bold text-accent">{filteredReports.length}</div>
          </div>
        </div>

        {/* Selected Report Details */}
        {selectedReport && (
          <div className="p-4 border-t bg-muted/30">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium capitalize">{selectedReport.type.replace("-", " ")}</h4>
                <p className="text-sm text-muted-foreground">{selectedReport.location.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    selectedReport.severity === "critical"
                      ? "destructive"
                      : selectedReport.severity === "high"
                        ? "default"
                        : "secondary"
                  }
                >
                  {selectedReport.severity}
                </Badge>
                {selectedReport.verified && <Badge variant="outline">Verified</Badge>}
              </div>
            </div>
            <p className="text-sm mb-2">{selectedReport.description}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Source: {selectedReport.source.replace("_", " ")}</span>
              <span>{new Date(selectedReport.timestamp).toLocaleString()}</span>
            </div>
          </div>
        )}
      </CardContent>
    </div>
  )
}
