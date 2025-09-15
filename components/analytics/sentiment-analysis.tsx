"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function SentimentAnalysis() {
  // Mock sentiment data
  const sentimentData = {
    positive: 25,
    neutral: 45,
    negative: 30,
    trend: {
      positive: 5,
      neutral: -2,
      negative: -3,
    },
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return TrendingUp
    if (trend < 0) return TrendingDown
    return Minus
  }

  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-green-600"
    if (trend < 0) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-manrope text-lg">Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Positive Sentiment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Positive</span>
            <div className="flex items-center gap-1">
              <span className="text-sm">{sentimentData.positive}%</span>
              {(() => {
                const TrendIcon = getTrendIcon(sentimentData.trend.positive)
                return <TrendIcon className={`w-3 h-3 ${getTrendColor(sentimentData.trend.positive)}`} />
              })()}
            </div>
          </div>
          <Progress value={sentimentData.positive} className="h-2" />
        </div>

        {/* Neutral Sentiment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Neutral</span>
            <div className="flex items-center gap-1">
              <span className="text-sm">{sentimentData.neutral}%</span>
              {(() => {
                const TrendIcon = getTrendIcon(sentimentData.trend.neutral)
                return <TrendIcon className={`w-3 h-3 ${getTrendColor(sentimentData.trend.neutral)}`} />
              })()}
            </div>
          </div>
          <Progress value={sentimentData.neutral} className="h-2" />
        </div>

        {/* Negative Sentiment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Negative</span>
            <div className="flex items-center gap-1">
              <span className="text-sm">{sentimentData.negative}%</span>
              {(() => {
                const TrendIcon = getTrendIcon(sentimentData.trend.negative)
                return <TrendIcon className={`w-3 h-3 ${getTrendColor(sentimentData.trend.negative)}`} />
              })()}
            </div>
          </div>
          <Progress value={sentimentData.negative} className="h-2" />
        </div>

        {/* Overall Sentiment */}
        <div className="pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              {sentimentData.positive > sentimentData.negative ? "Positive" : "Negative"}
            </div>
            <div className="text-xs text-muted-foreground">Overall Public Sentiment</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
