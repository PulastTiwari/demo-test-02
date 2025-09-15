"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import LanguageToggle from "@/components/ui/language-toggle"
import { NotificationSystem } from "@/components/real-time/notification-system"
import { LiveStatusIndicator } from "@/components/real-time/live-status-indicator"
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
      <nav
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
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
            <div className="hidden md:block">
              <LanguageToggle />
            </div>
            <NotificationSystem />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          // Keep the mobile menu above the navbar
          <div className="absolute -top-56 left-1/2 transform -translate-x-1/2 w-72 glass-card rounded-2xl p-4 md:hidden">
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
              <div className="pt-2">
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Live status placed slightly above the navbar */}
      <div className="fixed bottom-28 left-1/2 transform -translate-x-1/2 z-40">
        <div className="glass rounded-full px-4 py-2">
          <LiveStatusIndicator />
        </div>
      </div>
    </>
  )
}
