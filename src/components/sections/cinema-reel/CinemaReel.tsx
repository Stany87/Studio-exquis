"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { GFS_Didot, Great_Vibes } from "next/font/google"
import BrandLogo from "@/components/BrandLogo"

/* ══════════════════════════════════════════════════════════════════════
   FONTS — Studio Exquis Brand
   ══════════════════════════════════════════════════════════════════════ */
const gfsDidot = GFS_Didot({
  subsets: ["greek"],
  weight: "400",
  display: "swap",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

/* ══════════════════════════════════════════════════════════════════════
   PALETTE TOKENS
   ══════════════════════════════════════════════════════════════════════ */
const SE = {
  bg: "#FAF8F6",
  accent: "#DEB5A0",
  text: "#2D2926",
  textSecondary: "#6B6462",
  textMuted: "#9B9492",
  textFaint: "#C5BBB5",
}

interface GalleryImage {
  id: string
  src: string
  alt: string
  year: string
  eyebrow: string
  category: string
  titleLines: string[]
  leadDesigner: string
  description: string
  awardText: string
}

const STUDIO_RECEPTION: GalleryImage = {
  id: "studio-exquis-showroom",
  src: "/studio-exquis-reception.jpg",
  alt: "Studio Exquis flagship showroom and reception",
  year: "2026",
  eyebrow: "STUDIO EXQUIS · FLAGSHIP SHOWROOM",
  category: "CREATIVE HEADQUARTERS",
  titleLines: ["STUDIO", "EXQUIS"],
  leadDesigner: "ONEAL HOPKINS",
  description: "Our flagship atelier and design showroom. A space designed to reflect our architectural core: honest textures, precise lighting, and custom stonework. This is where vision meets execution.",
  awardText: "ATELIER & SHOWROOM OF THE YEAR",
}

interface CinemaReelProps {
  className?: string
  isUnlocked: boolean
  onUnlockChange: (val: boolean) => void
}

export default function CinemaReel({ className, isUnlocked, onUnlockChange }: CinemaReelProps) {
  // ── 3D tilt tracking state ──
  const sectionRef = useRef<HTMLElement>(null)
  const tiltRef = useRef({ rotateX: 0, rotateY: 0, imgX: 0, imgY: 0 })
  const animFrameRef = useRef<number>(0)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, imgX: 0, imgY: 0 })
  const [logoAnimation, setLogoAnimation] = useState<"draw" | "write" | "fade-stagger" | "glow-flow" | "handwritten">("handwritten")

  // Mouse-tracking 3D tilt (works in both locked and unlocked states)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      // Normalized -1 to 1
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1

      // Tilt: stronger for capsule, subtler for fullscreen
      const maxTilt = isUnlocked ? 4 : 12
      const targetRotateY = nx * maxTilt
      const targetRotateX = -ny * maxTilt

      // Inner image parallax shift: larger for fullscreen
      const maxShift = isUnlocked ? 25 : 15
      const targetImgX = -nx * maxShift
      const targetImgY = -ny * maxShift

      // Smooth lerp via RAF
      cancelAnimationFrame(animFrameRef.current)
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      const ease = 0.08

      const animate = () => {
        const prev = tiltRef.current
        const next = {
          rotateX: lerp(prev.rotateX, targetRotateX, ease),
          rotateY: lerp(prev.rotateY, targetRotateY, ease),
          imgX: lerp(prev.imgX, targetImgX, ease),
          imgY: lerp(prev.imgY, targetImgY, ease),
        }
        tiltRef.current = next
        setTilt({ ...next })

        // Keep animating until close enough
        const delta = Math.abs(next.rotateX - targetRotateX) + Math.abs(next.rotateY - targetRotateY)
        if (delta > 0.01) {
          animFrameRef.current = requestAnimationFrame(animate)
        }
      }
      animFrameRef.current = requestAnimationFrame(animate)
    },
    [isUnlocked]
  )

  // Smoothly reset tilt when mouse leaves
  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current)
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const ease = 0.06

    const animate = () => {
      const prev = tiltRef.current
      const next = {
        rotateX: lerp(prev.rotateX, 0, ease),
        rotateY: lerp(prev.rotateY, 0, ease),
        imgX: lerp(prev.imgX, 0, ease),
        imgY: lerp(prev.imgY, 0, ease),
      }
      tiltRef.current = next
      setTilt({ ...next })

      const delta = Math.abs(next.rotateX) + Math.abs(next.rotateY)
      if (delta > 0.01) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        tiltRef.current = { rotateX: 0, rotateY: 0, imgX: 0, imgY: 0 }
        setTilt({ rotateX: 0, rotateY: 0, imgX: 0, imgY: 0 })
      }
    }
    animFrameRef.current = requestAnimationFrame(animate)
  }, [])

  // Smoothly transition tilt when lock state changes
  useEffect(() => {
    // Don't hard-reset — the lerp will naturally settle
    // Just ensure we cancel any stale frame
    cancelAnimationFrame(animFrameRef.current)
  }, [isUnlocked])

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

  // Handle escape key to return to capsule
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isUnlocked) {
        onUnlockChange(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isUnlocked, onUnlockChange])

  // Left to right panning animation
  const panningAnimation = {
    x: ["0%", "-15%"],
    transition: {
      x: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        duration: 16,
        ease: "linear" as const,
      },
    },
  }

  // Fade animation variants
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <section
      ref={sectionRef}
      id="cinema-reel"
      className="relative w-full h-[100dvh] overflow-hidden bg-transparent flex items-center justify-center"
      style={{
        "--cinema-pad-x": "clamp(1.5rem, 4dvh, 3rem)",
        perspective: "1200px",
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Unified Brand Logo - animates smoothly between locked (top) and unlocked (center-large) states */}
      <motion.div
        animate={{
          top: isUnlocked ? "50%" : "4rem",
          y: isUnlocked ? "-150%" : "0%",
          scale: isUnlocked ? 1.75 : 1.0,
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
          delay: isUnlocked ? 0.9 : 0
        }}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-auto z-40"
      >
        <a
          href="#cinema-reel"
          onClick={(e) => {
            e.preventDefault();
            if (isUnlocked) {
              onUnlockChange(false);
            }
          }}
          className={`block leading-none ${isUnlocked ? "cursor-pointer" : "cursor-default"}`}
          style={{ textDecoration: "none" }}
        >
          <BrandLogo
            width={220}
            height={90}
            dark={!isUnlocked}
            animationType={isUnlocked ? logoAnimation : "write"}
          />
        </a>
        <motion.span
          animate={{
            color: isUnlocked ? "rgba(255, 255, 255, 0.85)" : "#8A7F7C",
          }}
          transition={{ duration: 0.9 }}
          className="text-[7.5px] tracking-[0.45em] uppercase -mt-1 block leading-none font-bold"
          style={{ fontFamily: "var(--font-gfs-didot)" }}
        >
          ARCHITECTURE & INTERIOR DESIGN
        </motion.span>
      </motion.div>

      {/* Background/Intro text when locked */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-end py-12 pointer-events-none z-[15]">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#6B6462] animate-pulse font-bold">
              Click Capsule to Enter
            </span>
            <span className="text-[10px] tracking-[0.15em] font-light text-[#C5BBB5]">
              VADODARA · AURANGABAD
            </span>
          </div>
        </div>
      )}

      {/* The main interactive capsule/hero image frame */}
      <motion.div
        layout
        onClick={() => {
          if (!isUnlocked) {
            onUnlockChange(true)
          }
        }}
        animate={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          rotateX: isUnlocked ? 0 : tilt.rotateX,
          rotateY: isUnlocked ? 0 : tilt.rotateY,
          width: isUnlocked ? "100%" : "clamp(200px, 30dvh, 300px)",
          height: isUnlocked ? "100%" : "clamp(260px, 40dvh, 400px)",
          borderRadius: isUnlocked ? "0px" : "135px",
          borderWidth: isUnlocked ? 0 : 1.5,
          borderColor: isUnlocked ? "rgba(222, 181, 160, 0)" : "rgba(222, 181, 160, 0.65)",
          boxShadow: isUnlocked
            ? "none"
            : "0 0 35px rgba(222, 181, 160, 0.45), 0 25px 65px -10px rgba(45, 41, 38, 0.25)",
        }}
        transition={{
          default: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          rotateX: { type: "tween", duration: 0.1 },
          rotateY: { type: "tween", duration: 0.1 },
        }}
        className={`absolute overflow-hidden z-10 border ${isUnlocked ? "cursor-default" : "cursor-pointer"}`}
        style={{
          borderStyle: "solid",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Container for the image */}
        <div className="relative w-full h-full overflow-hidden bg-[#FAF8F6]">
          <AnimatePresence mode="sync">
            <motion.div
              key="studio-reception-image"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <motion.div
                className="absolute inset-[-30px]"
                animate={!isUnlocked && tilt.rotateX === 0 && tilt.rotateY === 0 ? {} : undefined}
                style={{
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  transform: `translate3d(${tilt.imgX}px, ${tilt.imgY}px, 0) scale(1.08)`,
                  transformOrigin: "center center",
                }}
              >
                <Image
                  src={STUDIO_RECEPTION.src}
                  alt={STUDIO_RECEPTION.alt}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                  quality={100}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Subtle 3D shine/glare overlay that moves with tilt */}
          <div
            className="absolute inset-0 pointer-events-none z-[5]"
            style={{
              background: `radial-gradient(ellipse at ${50 + tilt.rotateY * (isUnlocked ? 5 : 3)}% ${50 - tilt.rotateX * (isUnlocked ? 5 : 3)}%, rgba(255,255,255,${isUnlocked ? 0.06 : 0.12}) 0%, transparent 60%)`,
            }}
          />
        </div>

        {/* UI overlays only rendered when isUnlocked is true */}
        {isUnlocked && (
          <>
            {/* Dark vignettes on top of full-bleed image for readability */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/45 via-transparent to-black/60 z-10" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.35)_100%)] z-10" />

            {/* Brand Header Overlay */}
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6 pointer-events-none"
              style={{ height: "12dvh" }}
            >
              {/* Contact (Left) */}
              <div className="pointer-events-auto flex items-center h-full">
                <a
                  href="tel:+919426133932"
                  className="group flex flex-col items-start gap-0.5"
                  style={{ textDecoration: "none" }}
                >
                  <span className="flex items-center gap-1.5 text-[9px] tracking-[0.25em] font-bold text-[#DEB5A0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DEB5A0] animate-pulse"></span>
                    CALL ATELIER
                  </span>
                  <span className="text-[13px] sm:text-[14px] font-extrabold tracking-wide text-white transition-colors hover:text-[#DEB5A0]">
                    +91 94261 33932
                  </span>
                </a>
              </div>

              {/* Logo is now top-level unified */}

              {/* CTA + Close (Right) */}
              <div className="pointer-events-auto flex items-center gap-4 h-full">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className={`flex items-center justify-center px-6 py-2.5 rounded-full text-[9.5px] tracking-[0.22em] uppercase font-bold bg-white text-[#2D2926] hover:bg-[#FAF8F6] transition-all duration-300 ${gfsDidot.className}`}
                  style={{ textDecoration: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
                >
                  Book Appointment
                </a>

                {/* Return to Capsule lock button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onUnlockChange(false)
                  }}
                  className="p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
                  aria-label="Return to capsule view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.header>

            {/* Left Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute left-8 md:left-16 bottom-8 md:bottom-16 max-w-lg z-20 pointer-events-auto select-text"
            >
              <div className="flex flex-col gap-4 text-white">
                <div>
                  <span className={`text-sm italic ${gfsDidot.className} text-[#DEB5A0]`}>
                    {STUDIO_RECEPTION.year}
                  </span>
                  <span className="block text-[9px] tracking-[0.2em] uppercase mt-1 text-white/60">
                    {STUDIO_RECEPTION.eyebrow}
                  </span>
                </div>

                <div>
                  <span className="text-[9px] tracking-[0.25em] uppercase block mb-1 text-white/50">
                    {STUDIO_RECEPTION.category}
                  </span>
                  <h2
                    className={`${gfsDidot.className} uppercase leading-[1.1] font-normal text-3xl sm:text-4xl md:text-5xl tracking-tight`}
                  >
                    {STUDIO_RECEPTION.titleLines.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </h2>
                  <span className="block text-[10px] tracking-[0.15em] uppercase mt-2 text-white/70">
                    LEAD DESIGNER: {STUDIO_RECEPTION.leadDesigner}
                  </span>
                </div>

                <p className={`text-[13px] md:text-[14px] italic leading-relaxed text-white/80 max-w-md ${gfsDidot.className}`}>
                  {STUDIO_RECEPTION.description}
                </p>

                {/* Awards / Highlights */}
                <div className="flex items-center gap-3 py-1">
                  <img src="/left-award-symbol.svg" alt="" className="h-8 w-4 opacity-50 invert" />
                  <div className="flex flex-col items-start">
                    <div className="flex gap-0.5 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-[10px] text-[#DEB5A0]">★</span>
                      ))}
                    </div>
                    <span className="text-[9px] tracking-[0.15em] uppercase font-bold text-white/70">
                      {STUDIO_RECEPTION.awardText}
                    </span>
                  </div>
                  <img src="/right-award-symbol.svg" alt="" className="h-8 w-4 opacity-50 invert" />
                </div>
              </div>
            </motion.div>

            {/* Logo Style Selector (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute right-8 md:right-16 bottom-8 md:bottom-16 z-20 flex flex-col items-end gap-2 pointer-events-auto"
            >
              <span className="text-[7.5px] tracking-[0.25em] uppercase text-white/50 font-bold mb-1">
                Logo Style
              </span>
              <div className="flex items-center gap-1.5 bg-black/35 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                {(["handwritten", "glow-flow", "write", "draw", "fade-stagger"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setLogoAnimation(type)}
                    className={`px-3 py-1 rounded-full text-[8.5px] tracking-wider uppercase font-semibold transition-all duration-300 ${
                      logoAnimation === type
                        ? "bg-[#DEB5A0] text-white"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {type === "handwritten" && "Draw"}
                    {type === "glow-flow" && "Shimmer"}
                    {type === "write" && "Wipe"}
                    {type === "draw" && "Outline"}
                    {type === "fade-stagger" && "Fade"}
                  </button>
                ))}
              </div>
              <Link 
                href="/logo-demo" 
                className="text-[8px] tracking-[0.2em] uppercase text-[#DEB5A0] hover:text-white transition-colors mt-2"
                style={{ textDecoration: "none" }}
              >
                Open Sandbox Studio →
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>
    </section>
  )
}
