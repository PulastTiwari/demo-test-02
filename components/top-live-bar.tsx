"use client"

import { useEffect, useState } from "react"
import { LiveStatusIndicator } from "@/components/real-time/live-status-indicator"

export default function TopLiveBar() {
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // trigger mount animation
    const t = setTimeout(() => setMounted(true), 10)
    // check prefers-reduced-motion and respect it
    const mql = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null
    const handleReduced = () => setPrefersReducedMotion(!!(mql && mql.matches))
    handleReduced()
    mql?.addEventListener?.("change", handleReduced)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      aria-hidden={!mounted}
      className={`fixed bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ease-out ${
        // on small screens raise further to avoid mobile nav overlap
        mounted ? "translate-y-0 opacity-100" : prefersReducedMotion ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } sm:bottom-20`}
      style={prefersReducedMotion ? { transition: "none" } : undefined}
    >
      <div className="glass rounded-full px-4 py-2 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <LiveStatusIndicator />
        </div>
      </div>
    </div>
  )
}
