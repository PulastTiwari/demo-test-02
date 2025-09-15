"use client"

import { AuthProvider, useAuth } from "@/components/auth/auth-provider"
import { FloatingNav } from "@/components/floating-nav"
import { SocialMediaFeed } from "@/components/analytics/social-media-feed"
import { SentimentAnalysis } from "@/components/analytics/sentiment-analysis"
import { TrendingKeywords } from "@/components/analytics/trending-keywords"
import { EngagementMetrics } from "@/components/analytics/engagement-metrics"
import { Eye } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { useState } from "react"

function AnalyticsPage() {
  const { user } = useAuth()
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <FloatingNav />
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <Eye className="w-12 h-12 text-accent mx-auto mb-4" />
              <h1 className="font-manrope text-2xl font-bold text-foreground mb-2">Social Media Analytics</h1>
              <p className="text-muted-foreground">Please sign in to access social media monitoring</p>
            </div>
            {authMode === "login" ? (
              <LoginForm onToggleMode={() => setAuthMode("register")} />
            ) : (
              <RegisterForm onToggleMode={() => setAuthMode("login")} />
            )}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <FloatingNav />

      <section className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="font-manrope text-3xl font-bold text-foreground mb-2">Social Media Analytics</h1>
            <p className="text-muted-foreground">
              AI-powered monitoring of social platforms for ocean hazard discussions and public sentiment
            </p>
          </div>

          {/* Analytics Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Metrics */}
            <div className="lg:col-span-1 space-y-6">
              <SentimentAnalysis />
              <TrendingKeywords />
              <EngagementMetrics />
            </div>

            {/* Right Column - Feed */}
            <div className="lg:col-span-2">
              <SocialMediaFeed />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function Page() {
  return (
    <AuthProvider>
      <AnalyticsPage />
    </AuthProvider>
  )
}
