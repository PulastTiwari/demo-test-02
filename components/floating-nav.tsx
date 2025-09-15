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

      {/* Desktop: top-center nav. Mobile: bottom-centered control (fixed) */}
      <nav
        className={`hidden md:flex fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled ? "floating-nav" : "bg-white/30 backdrop-blur-lg border border-white/10"
        } rounded-full px-6 py-3 shadow-lg`}
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Samudra CHETNA" width={32} height={32} className="rounded-full" />
            <span className="font-manrope font-bold text-lg text-foreground hidden sm:block">Samudra CHETNA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* language toggle moved to top-right */}
            <NotificationSystem />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-panel"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

      </nav>

      {/* Mobile bottom nav (visible on small screens) */}
      <nav className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`bg-white/30 backdrop-blur-lg border border-white/10 rounded-full px-4 py-2 shadow-lg flex items-center gap-2`}> 
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Samudra CHETNA" width={28} height={28} className="rounded-full" />
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu-panel"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu panel opens upward from bottom */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu-panel"
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-72 glass-card rounded-2xl p-4"
          >
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
              {/* language toggle moved to top-right */}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
