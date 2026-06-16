"use client"

import { useState, useEffect } from "react"
import CinemaReel from "@/components/sections/cinema-reel/CinemaReel"
import Navbar from "@/components/Navbar"
import AboutSection from "@/components/sections/AboutSection"
import ProofOfWork from "@/components/sections/ProofOfWork"
import ServicesSection from "@/components/sections/ServicesSection"
import Footer from "@/components/sections/Footer"

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false)

  // Disable scroll when in capsule stage
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isUnlocked])

  return (
    <main className="relative min-h-screen bg-transparent">
      {/* Navbar only visible when website is unlocked */}
      {isUnlocked && <Navbar />}

      {/* Hero section handles the capsule-to-hero expansion */}
      <CinemaReel isUnlocked={isUnlocked} onUnlockChange={setIsUnlocked} />

      {/* Website sections slide up and fade in upon unlocking */}
      <div
        className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: isUnlocked ? 1 : 0,
          transform: isUnlocked ? "translateY(0)" : "translateY(80px)",
          height: isUnlocked ? "auto" : 0,
          overflow: isUnlocked ? "visible" : "hidden",
          pointerEvents: isUnlocked ? "auto" : "none",
        }}
      >
        <AboutSection />
        <ProofOfWork />
        <ServicesSection />
        <Footer />
      </div>
    </main>
  )
}
