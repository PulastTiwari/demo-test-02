"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth/auth-provider"
import { MapPin, Upload, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  address?: string
}

interface MediaFile {
  id: string
  file: File
  preview: string
  type: "image" | "video"
}

const HAZARD_TYPES = [
  { value: "tsunami", label: "Tsunami", severity: "critical" },
  { value: "storm-surge", label: "Storm Surge", severity: "high" },
  { value: "high-waves", label: "High Waves", severity: "medium" },
  { value: "swell-surge", label: "Swell Surge", severity: "medium" },
  { value: "coastal-flooding", label: "Coastal Flooding", severity: "high" },
  { value: "unusual-tides", label: "Unusual Tides", severity: "low" },
  { value: "coastal-erosion", label: "Coastal Erosion", severity: "medium" },
  { value: "marine-debris", label: "Marine Debris", severity: "low" },
  { value: "oil-spill", label: "Oil Spill", severity: "high" },
  { value: "other", label: "Other", severity: "medium" },
]

export function IncidentReportForm() {
  const { user } = useAuth()
  const [location, setLocation] = useState<LocationData | null>(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Form data
  const [hazardType, setHazardType] = useState("")
  const [severity, setSeverity] = useState("")
  const [description, setDescription] = useState("")
  const [contactInfo, setContactInfo] = useState("")

  const getCurrentLocation = () => {
    setLocationLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords

          // Mock reverse geocoding - replace with real service
          const address = `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`

          setLocation({ latitude, longitude, accuracy, address })
          setLocationLoading(false)
        },
        (error) => {
          console.error("Location error:", error)
          setLocationLoading(false)
        },
        { enableHighAccuracy: true, timeout: 10000 },
      )
    }
  }

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    files.forEach((file) => {
      const mediaFile: MediaFile = {
        id: Date.now().toString() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith("video/") ? "video" : "image",
      }
      setMediaFiles((prev) => [...prev, mediaFile])
    })
  }

  const removeMedia = (id: string) => {
    setMediaFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file) URL.revokeObjectURL(file.preview)
      return prev.filter((f) => f.id !== id)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock submission - replace with real API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Incident Report:", {
      user: user?.id,
      hazardType,
      severity,
      description,
      location,
      mediaFiles: mediaFiles.length,
      contactInfo,
      timestamp: new Date().toISOString(),
    })

    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="glass-card max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="font-manrope text-xl font-bold mb-2">Report Submitted</h3>
          <p className="text-muted-foreground mb-6">
            Your hazard report has been successfully submitted and will be reviewed by our team.
          </p>
          <Button onClick={() => setSubmitted(false)} className="w-full">
            Submit Another Report
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-manrope text-2xl">Incident Report Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Location Information</Label>
              <Button type="button" variant="outline" size="sm" onClick={getCurrentLocation} disabled={locationLoading}>
                {locationLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <MapPin className="w-4 h-4 mr-2" />
                )}
                Get Current Location
              </Button>
            </div>

            {location && (
              <div className="p-4 bg-accent/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="font-medium text-sm">Location Captured</span>
                  <Badge variant="secondary" className="text-xs">
                    ±{location.accuracy.toFixed(0)}m accuracy
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{location.address}</p>
              </div>
            )}
          </div>

          {/* Hazard Type */}
          <div className="space-y-2">
            <Label htmlFor="hazard-type">Hazard Type *</Label>
            <Select value={hazardType} onValueChange={setHazardType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select the type of ocean hazard" />
              </SelectTrigger>
              <SelectContent>
                {HAZARD_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <span>{type.label}</span>
                      <Badge
                        variant={
                          type.severity === "critical"
                            ? "destructive"
                            : type.severity === "high"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {type.severity}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Severity */}
          <div className="space-y-2">
            <Label htmlFor="severity">Severity Level *</Label>
            <Select value={severity} onValueChange={setSeverity} required>
              <SelectTrigger>
                <SelectValue placeholder="Rate the severity of the hazard" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Low - Minor concern
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Medium - Moderate risk
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    High - Significant threat
                  </div>
                </SelectItem>
                <SelectItem value="critical">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Critical - Immediate danger
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you observed, including time, conditions, and any immediate impacts..."
              className="min-h-[120px]"
              required
            />
          </div>

          {/* Media Upload */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Media Evidence</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                id="media-upload"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
              />
              <label htmlFor="media-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Click to upload photos or videos</p>
                <p className="text-xs text-muted-foreground">Supports JPG, PNG, MP4, MOV (max 10MB each)</p>
              </label>
            </div>

            {/* Media Preview */}
            {mediaFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mediaFiles.map((media) => (
                  <div key={media.id} className="relative group">
                    {media.type === "image" ? (
                      <img
                        src={media.preview || "/placeholder.svg"}
                        alt="Upload preview"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <video src={media.preview} className="w-full h-24 object-cover rounded-lg" muted />
                    )}
                    <button
                      type="button"
                      onClick={() => removeMedia(media.id)}
                      aria-label="Remove uploaded media"
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Information (Optional)</Label>
            <Input
              id="contact"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Phone number or additional contact details"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !location || !hazardType || !severity || !description}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Submitting Report...
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Submit Hazard Report
                </>
              )}
            </Button>

            {(!location || !hazardType || !severity || !description) && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Please fill all required fields and capture your location
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
