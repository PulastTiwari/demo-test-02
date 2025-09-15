"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

interface TrendingKeyword {
  keyword: string
  mentions: number
  trend: number
  category: "hazard" | "location" | "action" | "general"
}

export function TrendingKeywords() {
  // Mock trending keywords data
  const trendingKeywords: TrendingKeyword[] = [
    { keyword: "storm surge", mentions: 1247, trend: 45, category: "hazard" },
    { keyword: "Chennai", mentions: 892, trend: 23, category: "location" },
    { keyword: "high waves", mentions: 756, trend: 67, category: "hazard" },
    { keyword: "evacuation", mentions: 634, trend: 89, category: "action" },
    { keyword: "Mumbai coast", mentions: 523, trend: 12, category: "location" },
    { keyword: "safety alert", mentions: 445, trend: 34, category: "action" },
    { keyword: "coastal flooding", mentions: 389, trend: 56, category: "hazard" },
    { keyword: "Kerala beaches", mentions: 267, trend: 78, category: "location" },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hazard":
        return "bg-red-100 text-red-800"
      case "location":
        return "bg-blue-100 text-blue-800"
      case "action":
        return "bg-green-100 text-green-800"
      case "general":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-manrope text-lg flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Trending Keywords
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {trendingKeywords.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.keyword}</span>
                <Badge variant="secondary" className={`text-xs ${getCategoryColor(item.category)}`}>
                  {item.category}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{item.mentions}</span>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{item.trend}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
