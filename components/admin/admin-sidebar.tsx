"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, FileCheck, Activity, Settings, BarChart3 } from "lucide-react"

type AdminView = "overview" | "users" | "reports" | "monitoring" | "config"

interface AdminSidebarProps {
  activeView: AdminView
  onViewChange: (view: AdminView) => void
}

export function AdminSidebar({ activeView, onViewChange }: AdminSidebarProps) {
  const menuItems = [
    {
      id: "overview" as AdminView,
      label: "Overview",
      icon: BarChart3,
      badge: null,
    },
    {
      id: "users" as AdminView,
      label: "User Management",
      icon: Users,
      badge: "1,247",
    },
    {
      id: "reports" as AdminView,
      label: "Report Verification",
      icon: FileCheck,
      badge: "23",
    },
    {
      id: "monitoring" as AdminView,
      label: "System Monitoring",
      icon: Activity,
      badge: "Live",
    },
    {
      id: "config" as AdminView,
      label: "Configuration",
      icon: Settings,
      badge: null,
    },
  ]

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-manrope text-lg">Admin Menu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="w-4 h-4 mr-2" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
