"use client"

import { AuthProvider, useAuth } from "@/components/auth/auth-provider"
import { FloatingNav } from "@/components/floating-nav"
import { IncidentReportForm } from "@/components/incident/incident-report-form"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, MapPin, Camera } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { useState } from "react"

function ReportPage() {
  const { user } = useAuth()
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <FloatingNav />
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <AlertTriangle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h1 className="font-manrope text-2xl font-bold text-foreground mb-2">Report Ocean Hazard</h1>
              <p className="text-muted-foreground">Please sign in to submit a hazard report</p>
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

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              Emergency Reporting
            </div>
            <h1 className="font-manrope text-4xl font-bold text-foreground mb-4">Report Ocean Hazard</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help protect coastal communities by reporting observed ocean hazards with precise location data and media
              evidence.
            </p>
          </div>

          {/* Quick Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <MapPin className="w-6 h-6 text-accent mx-auto mb-2" />
                <h3 className="font-medium text-sm">GPS Location</h3>
                <p className="text-xs text-muted-foreground">Automatic geolocation capture</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <Camera className="w-6 h-6 text-accent mx-auto mb-2" />
                <h3 className="font-medium text-sm">Media Upload</h3>
                <p className="text-xs text-muted-foreground">Photos and videos supported</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-6 h-6 text-accent mx-auto mb-2" />
                <h3 className="font-medium text-sm">Real-time Alert</h3>
                <p className="text-xs text-muted-foreground">Instant notification to authorities</p>
              </CardContent>
            </Card>
          </div>

          {/* Report Form */}
          <IncidentReportForm />
        </div>
      </section>
    </div>
  )
}

export default function Page() {
  return (
    <AuthProvider>
      <ReportPage />
    </AuthProvider>
  )
}
