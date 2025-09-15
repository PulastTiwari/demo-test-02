"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Twitter, Facebook, Youtube, MessageCircle, Heart, Share, Search } from "lucide-react"

interface SocialPost {
  id: string
  platform: "twitter" | "facebook" | "youtube"
  author: string
  content: string
  timestamp: string
  location?: string
  engagement: {
    likes: number
    shares: number
    comments: number
  }
  sentiment: "positive" | "negative" | "neutral"
  hazardRelevance: number
  keywords: string[]
  verified: boolean
}

// Mock social media data
const MOCK_POSTS: SocialPost[] = [
  {
    id: "1",
    platform: "twitter",
    author: "@ChennaiWeather",
    content:
      "🌊 High waves alert for Chennai Marina Beach! Water levels rising rapidly. Stay away from the shore. #ChennaiWeather #StormSurge #SafetyFirst",
    timestamp: "5 minutes ago",
    location: "Chennai, Tamil Nadu",
    engagement: { likes: 245, shares: 89, comments: 34 },
    sentiment: "negative",
    hazardRelevance: 0.95,
    keywords: ["high waves", "storm surge", "Chennai", "safety"],
    verified: true,
  },
  {
    id: "2",
    platform: "facebook",
    author: "Mumbai Coastal Watch",
    content:
      "Unusual tidal patterns observed at Juhu Beach this morning. Local fishermen report strange currents. Authorities have been notified. Please exercise caution if visiting coastal areas.",
    timestamp: "12 minutes ago",
    location: "Mumbai, Maharashtra",
    engagement: { likes: 156, shares: 67, comments: 23 },
    sentiment: "neutral",
    hazardRelevance: 0.78,
    keywords: ["tidal patterns", "Juhu Beach", "currents", "caution"],
    verified: false,
  },
  {
    id: "3",
    platform: "youtube",
    author: "Goa Beach Safety",
    content:
      "LIVE: Coastal flooding at Calangute Beach - Emergency response teams on site. Tourists advised to move to higher ground immediately.",
    timestamp: "18 minutes ago",
    location: "Goa",
    engagement: { likes: 89, shares: 156, comments: 78 },
    sentiment: "negative",
    hazardRelevance: 0.92,
    keywords: ["coastal flooding", "Calangute", "emergency", "evacuation"],
    verified: true,
  },
  {
    id: "4",
    platform: "twitter",
    author: "@KeralaCoastGuard",
    content:
      "Swell surge advisory for Kovalam and nearby beaches. Wave heights expected to reach 3-4 meters. Fishing operations suspended until further notice. #KeralaCoast #SwellSurge",
    timestamp: "25 minutes ago",
    location: "Kerala",
    engagement: { likes: 312, shares: 198, comments: 45 },
    sentiment: "neutral",
    hazardRelevance: 0.88,
    keywords: ["swell surge", "Kovalam", "wave heights", "fishing"],
    verified: true,
  },
  {
    id: "5",
    platform: "facebook",
    author: "Puducherry Residents Group",
    content:
      "Beautiful sunset at Rock Beach today! The waves seem a bit higher than usual though. Anyone else notice this? #PuducherryBeach #Sunset",
    timestamp: "1 hour ago",
    location: "Puducherry",
    engagement: { likes: 67, shares: 12, comments: 18 },
    sentiment: "positive",
    hazardRelevance: 0.45,
    keywords: ["Rock Beach", "waves", "higher than usual"],
    verified: false,
  },
]

export function SocialMediaFeed() {
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [platformFilter, setPlatformFilter] = useState<string>("all")
  const [sentimentFilter, setSentimentFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return Twitter
      case "facebook":
        return Facebook
      case "youtube":
        return Youtube
      default:
        return MessageCircle
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500"
      case "negative":
        return "bg-red-500"
      case "neutral":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 0.8) return "text-red-600"
    if (relevance >= 0.6) return "text-orange-600"
    if (relevance >= 0.4) return "text-yellow-600"
    return "text-green-600"
  }

  const filteredPosts = posts.filter((post) => {
    if (platformFilter !== "all" && post.platform !== platformFilter) return false
    if (sentimentFilter !== "all" && post.sentiment !== sentimentFilter) return false
    if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-manrope text-xl">Social Media Feed</CardTitle>
          <Badge variant="secondary">{filteredPosts.length} posts</Badge>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48"
            />
          </div>

          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sentiment</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {filteredPosts.map((post) => {
          const PlatformIcon = getPlatformIcon(post.platform)
          return (
            <div key={post.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <PlatformIcon className="w-4 h-4 text-accent" />
                  <span className="font-medium text-sm">{post.author}</span>
                  {post.verified && (
                    <Badge variant="outline" className="text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getSentimentColor(post.sentiment)}`}></div>
                  <span className={`text-xs font-medium ${getRelevanceColor(post.hazardRelevance)}`}>
                    {Math.round(post.hazardRelevance * 100)}% relevant
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-sm mb-3">{post.content}</p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1 mb-3">
                {post.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>

              {/* Post Footer */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    <span>{post.engagement.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share className="w-3 h-3" />
                    <span>{post.engagement.shares}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.engagement.comments}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {post.location && <span>{post.location}</span>}
                  <span>•</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
