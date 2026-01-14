"use client"

import { LandingHero } from "@/components/LandingHero"
import { Features } from "@/components/Features"
import { HowItWorks } from "@/components/HowItWorks"
import { Stats } from "@/components/Stats"
import { FinalCTA } from "@/components/FinalCTA"
import { ScrollProgress } from "@/components/ScrollProgress"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Hero Section */}
      <LandingHero />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Stats Section */}
      <Stats />

      {/* Final CTA */}
      <FinalCTA />
    </main>
  )
}
