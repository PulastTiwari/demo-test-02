"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, RotateCcw } from "lucide-react"
import type { DashboardFilters } from "@/app/dashboard/page"

interface FilterPanelProps {
  filters: DashboardFilters
  onFiltersChange: (filters: DashboardFilters) => void
}

const HAZARD_TYPES = [
  { value: "tsunami", label: "Tsunami" },
  { value: "storm-surge", label: "Storm Surge" },
  { value: "high-waves", label: "High Waves" },
  { value: "swell-surge", label: "Swell Surge" },
  { value: "coastal-flooding", label: "Coastal Flooding" },
  { value: "unusual-tides", label: "Unusual Tides" },
  { value: "coastal-erosion", label: "Coastal Erosion" },
  { value: "marine-debris", label: "Marine Debris" },
  { value: "oil-spill", label: "Oil Spill" },
]

const SEVERITY_LEVELS = [
  { value: "low", label: "Low", color: "bg-green-500" },
  { value: "medium", label: "Medium", color: "bg-yellow-500" },
  { value: "high", label: "High", color: "bg-orange-500" },
  { value: "critical", label: "Critical", color: "bg-red-500" },
]

const SOURCES = [
  { value: "citizen", label: "Citizen Reports" },
  { value: "official", label: "Official Sources" },
  { value: "social_media", label: "Social Media" },
]

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const updateFilter = (key: keyof DashboardFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: keyof DashboardFilters, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const resetFilters = () => {
    onFiltersChange({
      dateRange: "7d",
      hazardTypes: [],
      severityLevels: [],
      sources: [],
      location: "",
    })
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-manrope text-lg flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Range */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Time Period</Label>
          <Select value={filters.dateRange} onValueChange={(value) => updateFilter("dateRange", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Location</Label>
          <Input
            placeholder="Search by location..."
            value={filters.location}
            onChange={(e) => updateFilter("location", e.target.value)}
          />
        </div>

        {/* Hazard Types */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Hazard Types</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {HAZARD_TYPES.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={type.value}
                  checked={filters.hazardTypes.includes(type.value)}
                  onCheckedChange={() => toggleArrayFilter("hazardTypes", type.value)}
                />
                <Label htmlFor={type.value} className="text-sm font-normal cursor-pointer">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Severity Levels */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Severity Levels</Label>
          <div className="space-y-2">
            {SEVERITY_LEVELS.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <Checkbox
                  id={level.value}
                  checked={filters.severityLevels.includes(level.value)}
                  onCheckedChange={() => toggleArrayFilter("severityLevels", level.value)}
                />
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                  <Label htmlFor={level.value} className="text-sm font-normal cursor-pointer">
                    {level.label}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Data Sources</Label>
          <div className="space-y-2">
            {SOURCES.map((source) => (
              <div key={source.value} className="flex items-center space-x-2">
                <Checkbox
                  id={source.value}
                  checked={filters.sources.includes(source.value)}
                  onCheckedChange={() => toggleArrayFilter("sources", source.value)}
                />
                <Label htmlFor={source.value} className="text-sm font-normal cursor-pointer">
                  {source.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
