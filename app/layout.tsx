import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AlertBanner } from "@/components/real-time/alert-banner"

import "./globals.css"
// Logo will appear in the navigation bar; remove from layout

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Samudra CHETNA - Ocean Hazard Reporting Platform",
  description: "Integrated platform for crowdsourced ocean hazard reporting and social media analytics by INCOIS",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <html lang="en" className="smooth-scroll">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${manrope.variable}`}>
        {/* Keyboard-accessible skip link for bypassing navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white text-sm px-3 py-2 rounded shadow"
        >
          Skip to main content
        </a>

        <AlertBanner />

        {/* Main landmark so accessibility tools can detect page region */}
        <main id="main-content"> 
          <Suspense fallback={null}>{children}</Suspense>
        </main>

        <Analytics />
      </body>
    </html>
  )
}
