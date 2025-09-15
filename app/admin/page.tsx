"use client"

import { AuthProvider, useAuth } from "@/components/auth/auth-provider"
import { FloatingNav } from "@/components/floating-nav"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { UserManagement } from "@/components/admin/user-management"
import { ReportVerification } from "@/components/admin/report-verification"
import { SystemMonitoring } from "@/components/admin/system-monitoring"
import { ConfigurationPanel } from "@/components/admin/configuration-panel"
import { Settings, Shield } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { useState } from "react"

type AdminView = "overview" | "users" | "reports" | "monitoring" | "config"

function AdminPage() {
  const { user } = useAuth()
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [activeView, setActiveView] = useState<AdminView>("overview")

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <FloatingNav />
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <Settings className="w-12 h-12 text-accent mx-auto mb-4" />
              <h1 className="font-manrope text-2xl font-bold text-foreground mb-2">Admin Panel</h1>
              <p className="text-muted-foreground">Please sign in to access the admin panel</p>
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

  // Check if user has admin privileges
  if (user.role !== "analyst" && user.role !== "official") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <FloatingNav />
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-md mx-auto text-center">
            <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-manrope text-2xl font-bold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access the admin panel.</p>
          </div>
        </section>
      </div>
    )
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "users":
        return <UserManagement />
      case "reports":
        return <ReportVerification />
      case "monitoring":
        return <SystemMonitoring />
      case "config":
        return <ConfigurationPanel />
      default:
        return (
          <div className="grid lg:grid-cols-2 gap-6">
            <SystemMonitoring />
            <ReportVerification />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <FloatingNav />

      <section className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="font-manrope text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">System administration and management dashboard</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminSidebar activeView={activeView} onViewChange={setActiveView} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-4">{renderActiveView()}</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function Page() {
  return (
    <AuthProvider>
      <AdminPage />
    </AuthProvider>
  )
}
