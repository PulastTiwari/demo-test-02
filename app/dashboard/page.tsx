"use client"

import { AuthProvider, useAuth } from "@/components/auth/auth-provider"
import { FloatingNav } from "@/components/floating-nav"
import { InteractiveMap } from "@/components/dashboard/interactive-map"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { RecentReports } from "@/components/dashboard/recent-reports"
import { FilterPanel } from "@/components/dashboard/filter-panel"
import { DataStream } from "@/components/real-time/data-stream"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { useState } from "react"

export interface DashboardFilters {
  dateRange: string
  hazardTypes: string[]
  severityLevels: string[]
  sources: string[]
  location: string
}

function DashboardPage() {
  const { user } = useAuth()
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: "7d",
    hazardTypes: [],
    severityLevels: [],
    sources: [],
    location: "",
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <FloatingNav />
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <BarChart3 className="w-12 h-12 text-accent mx-auto mb-4" />
              <h1 className="font-manrope text-2xl font-bold text-foreground mb-2">Dashboard Access</h1>
              <p className="text-muted-foreground">Please sign in to view the analytics dashboard</p>
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

      <section className="pt-32 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="font-manrope text-3xl font-bold text-foreground mb-2">Ocean Hazard Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time monitoring and analytics for ocean hazards across India's coastline
            </p>
          </div>

          {/* Stats Overview */}
          <StatsOverview filters={filters} />

          {/* Main Dashboard Layout */}
          <div className="grid lg:grid-cols-4 gap-6 mt-8">
            {/* Filter Panel */}
            <div className="lg:col-span-1 space-y-6">
              <FilterPanel filters={filters} onFiltersChange={setFilters} />
              <DataStream />
            </div>

            {/* Map and Reports */}
            <div className="lg:col-span-3 space-y-6">
              {/* Interactive Map */}
              <Card className="glass-card">
                <CardContent className="p-0">
                  <InteractiveMap filters={filters} />
                </CardContent>
              </Card>

              {/* Recent Reports */}
              <RecentReports filters={filters} />
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
      <DashboardPage />
    </AuthProvider>
  )
}
