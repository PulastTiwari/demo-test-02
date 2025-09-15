"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
// LanguageToggle moved to top-right in TopLiveBar
import { NotificationSystem } from "@/components/real-time/notification-system"
import TopLiveBar from "@/components/top-live-bar"
import { Home, AlertTriangle, BarChart3, Users, Settings, Menu, X, Eye } from "lucide-react"

export function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/report", label: "Report Hazard", icon: AlertTriangle },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/analytics", label: "Analytics", icon: Eye },
    { href: "/community", label: "Community", icon: Users },
    { href: "/admin", label: "Admin", icon: Settings },
  ]

  return (
    <>
      {/* Persistent top live bar */}
      <TopLiveBar />

      {/* Unified bottom navigation (fixed) for all viewports */}
      <nav
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 glass border border-white/10 rounded-full px-6 py-3 shadow-lg transition-all duration-300`}
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Samudra CHETNA" width={32} height={32} className="rounded-full" />
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <NotificationSystem />
            {/* mobile toggle visible on small screens */}
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-panel"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu panel (stacked) */}
        {isMobileMenuOpen && (
          <div id="mobile-menu-panel" className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-72 glass-card rounded-2xl p-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
