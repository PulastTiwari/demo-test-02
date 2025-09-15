"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Clock, AlertTriangle, MapPin, User } from "lucide-react"

interface PendingReport {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  location: string
  submittedBy: string
  submittedAt: string
  description: string
  mediaCount: number
  confidence: number
  status: "pending" | "verified" | "rejected"
}

export function ReportVerification() {
  const [statusFilter, setStatusFilter] = useState("pending")

  // Mock pending reports
  const reports: PendingReport[] = [
    {
      id: "HZ-2024-001",
      type: "Storm Surge",
      severity: "critical",
      location: "Chennai Marina Beach",
      submittedBy: "Rajesh Kumar",
      submittedAt: "2024-01-15T10:30:00Z",
      description: "Severe storm surge observed with water levels rising rapidly. Multiple areas flooded.",
      mediaCount: 3,
      confidence: 0.92,
      status: "pending",
    },
    {
      id: "HZ-2024-002",
      type: "High Waves",
      severity: "high",
      location: "Mumbai Marine Drive",
      submittedBy: "Priya Sharma",
      submittedAt: "2024-01-15T09:15:00Z",
      description: "Unusually high waves crashing over the promenade. Pedestrians advised to stay away.",
      mediaCount: 2,
      confidence: 0.87,
      status: "pending",
    },
    {
      id: "HZ-2024-003",
      type: "Coastal Flooding",
      severity: "medium",
      location: "Goa Calangute Beach",
      submittedBy: "Tourist Group",
      submittedAt: "2024-01-15T08:45:00Z",
      description: "Water entering beach-side restaurants and shops. Tourists evacuating.",
      mediaCount: 1,
      confidence: 0.65,
      status: "verified",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return CheckCircle
      case "rejected":
        return XCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-600"
      case "rejected":
        return "text-red-600"
      default:
        return "text-orange-600"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600"
    if (confidence >= 0.6) return "text-orange-600"
    return "text-red-600"
  }

  const filteredReports = reports.filter((report) => {
    if (statusFilter !== "all" && report.status !== statusFilter) return false
    return true
  })

  const handleVerify = (reportId: string) => {
    console.log("Verifying report:", reportId)
    // Implementation for report verification
  }

  const handleReject = (reportId: string) => {
    console.log("Rejecting report:", reportId)
    // Implementation for report rejection
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-manrope text-xl">Report Verification</CardTitle>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="all">All Reports</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {filteredReports.map((report) => {
          const StatusIcon = getStatusIcon(report.status)
          return (
            <div key={report.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              {/* Report Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      {report.type}
                      <Badge variant={getSeverityColor(report.severity) as any}>{report.severity}</Badge>
                    </h4>
                    <p className="text-sm text-muted-foreground">Report ID: {report.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon className={`w-4 h-4 ${getStatusColor(report.status)}`} />
                  <Badge variant="outline" className="capitalize">
                    {report.status}
                  </Badge>
                </div>
              </div>

              {/* Report Details */}
              <p className="text-sm mb-3">{report.description}</p>

              {/* Metadata */}
              <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{report.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>Submitted by {report.submittedBy}</span>
                </div>
                <div>
                  <span>Media files: {report.mediaCount}</span>
                </div>
                <div>
                  <span className={getConfidenceColor(report.confidence)}>
                    Confidence: {Math.round(report.confidence * 100)}%
                  </span>
                </div>
              </div>

              {/* Actions */}
              {report.status === "pending" && (
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => handleVerify(report.id)}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verify
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleReject(report.id)}>
                    <XCircle className="w-3 h-3 mr-1" />
                    Reject
                  </Button>
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </div>
              )}

              <div className="text-xs text-muted-foreground mt-2">
                Submitted: {new Date(report.submittedAt).toLocaleString()}
              </div>
            </div>
          )
        })}

        {filteredReports.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No reports found for the selected status</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
