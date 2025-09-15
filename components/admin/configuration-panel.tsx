"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Save, RotateCcw } from "lucide-react"

interface SystemConfig {
  alertThresholds: {
    critical: number
    high: number
    medium: number
  }
  notifications: {
    emailEnabled: boolean
    smsEnabled: boolean
    pushEnabled: boolean
  }
  dataRetention: {
    reports: number
    socialMedia: number
    analytics: number
  }
  apiLimits: {
    rateLimit: number
    maxFileSize: number
  }
  maintenance: {
    mode: boolean
    message: string
  }
}

export function ConfigurationPanel() {
  const [config, setConfig] = useState<SystemConfig>({
    alertThresholds: {
      critical: 90,
      high: 70,
      medium: 50,
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: false,
      pushEnabled: true,
    },
    dataRetention: {
      reports: 365,
      socialMedia: 90,
      analytics: 180,
    },
    apiLimits: {
      rateLimit: 1000,
      maxFileSize: 10,
    },
    maintenance: {
      mode: false,
      message: "System maintenance in progress. Please check back later.",
    },
  })

  const [hasChanges, setHasChanges] = useState(false)

  const updateConfig = (section: keyof SystemConfig, key: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    console.log("Saving configuration:", config)
    setHasChanges(false)
    // Implementation for saving configuration
  }

  const handleReset = () => {
    // Reset to default values
    setHasChanges(false)
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-manrope text-xl flex items-center gap-2">
            <Settings className="w-5 h-5" />
            System Configuration
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Alert Thresholds */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Alert Thresholds</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="critical-threshold">Critical (%)</Label>
              <Input
                id="critical-threshold"
                type="number"
                value={config.alertThresholds.critical}
                onChange={(e) => updateConfig("alertThresholds", "critical", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="high-threshold">High (%)</Label>
              <Input
                id="high-threshold"
                type="number"
                value={config.alertThresholds.high}
                onChange={(e) => updateConfig("alertThresholds", "high", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medium-threshold">Medium (%)</Label>
              <Input
                id="medium-threshold"
                type="number"
                value={config.alertThresholds.medium}
                onChange={(e) => updateConfig("alertThresholds", "medium", Number.parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={config.notifications.emailEnabled}
                onCheckedChange={(checked) => updateConfig("notifications", "emailEnabled", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch
                id="sms-notifications"
                checked={config.notifications.smsEnabled}
                onCheckedChange={(checked) => updateConfig("notifications", "smsEnabled", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch
                id="push-notifications"
                checked={config.notifications.pushEnabled}
                onCheckedChange={(checked) => updateConfig("notifications", "pushEnabled", checked)}
              />
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Data Retention (Days)</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reports-retention">Reports</Label>
              <Input
                id="reports-retention"
                type="number"
                value={config.dataRetention.reports}
                onChange={(e) => updateConfig("dataRetention", "reports", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social-retention">Social Media</Label>
              <Input
                id="social-retention"
                type="number"
                value={config.dataRetention.socialMedia}
                onChange={(e) => updateConfig("dataRetention", "socialMedia", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="analytics-retention">Analytics</Label>
              <Input
                id="analytics-retention"
                type="number"
                value={config.dataRetention.analytics}
                onChange={(e) => updateConfig("dataRetention", "analytics", Number.parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* API Limits */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">API Limits</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rate-limit">Rate Limit (requests/hour)</Label>
              <Input
                id="rate-limit"
                type="number"
                value={config.apiLimits.rateLimit}
                onChange={(e) => updateConfig("apiLimits", "rateLimit", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-file-size">Max File Size (MB)</Label>
              <Input
                id="max-file-size"
                type="number"
                value={config.apiLimits.maxFileSize}
                onChange={(e) => updateConfig("apiLimits", "maxFileSize", Number.parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Maintenance Mode</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
              <Switch
                id="maintenance-mode"
                checked={config.maintenance.mode}
                onCheckedChange={(checked) => updateConfig("maintenance", "mode", checked)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance-message">Maintenance Message</Label>
              <Textarea
                id="maintenance-message"
                value={config.maintenance.message}
                onChange={(e) => updateConfig("maintenance", "message", e.target.value)}
                placeholder="Enter maintenance message for users..."
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
