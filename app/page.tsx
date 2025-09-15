"use client"

import { useState } from "react"
import Link from "next/link"
import { AuthProvider, useAuth } from "@/components/auth/auth-provider"
import { FloatingNav } from "@/components/floating-nav"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves, AlertTriangle, Users, BarChart3, Eye } from "lucide-react"

function HomePage() {
  const { user, logout } = useAuth()
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  if (!user) {
    // Single-screen landing hero: full viewport height and no vertical scrolling.
    return (
      <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative">
        <FloatingNav />

        {/* Centered Hero Section */}
        <section className="h-full flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Waves className="w-4 h-4" />
              Powered by INCOIS
            </div>

            <h1 className="font-manrope text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Samudra Chetna
              <span className="text-accent block">Ocean Hazard Reporting Platform</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Join thousands of citizens, officials, and analysts in creating a comprehensive early warning system for
              ocean hazards across India's coastline.
            </p>

            {/* Auth Forms */}
            <div className="max-w-md mx-auto pb-24 sm:pb-12">{/* extra bottom padding to avoid floating nav overlap on small screens */}
              {authMode === "login" ? (
                <LoginForm onToggleMode={() => setAuthMode("register") } />
              ) : (
                <RegisterForm onToggleMode={() => setAuthMode("login") } />
              )}
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <FloatingNav />

      {/* Dashboard Preview */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-manrope text-3xl font-bold text-foreground mb-2">Welcome back, {user.name}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">
                  {user.role}
                </Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
            </div>
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Link href="/report">
              <Card className="glass-card hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-manrope font-semibold mb-2">Report Hazard</h3>
                  <p className="text-sm text-muted-foreground">Submit a new ocean hazard report</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard">
              <Card className="glass-card hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-manrope font-semibold mb-2">View Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Access real-time analytics</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/analytics">
              <Card className="glass-card hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-manrope font-semibold mb-2">Social Analytics</h3>
                  <p className="text-sm text-muted-foreground">Monitor social media trends</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="glass-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-manrope font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">Connect with other users</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Placeholder */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="font-manrope font-semibold text-lg mb-4">Recent Activity</h3>
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Dashboard features coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default function Page() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  )
}
