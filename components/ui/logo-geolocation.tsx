"use client"
import Image from "next/image"
import { useEffect } from "react"

export default function LogoAndGeolocation() {
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {},
        () => {},
        { enableHighAccuracy: true }
      )
    }
  }, [])
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <Image src="/images/logo.png" alt="Logo" width={48} height={48} priority />
      <span style={{ fontWeight: 700, fontSize: 24 }}>Samudra CHETNA</span>
    </div>
  )
}