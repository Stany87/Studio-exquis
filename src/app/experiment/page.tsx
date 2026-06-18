"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, ArrowLeft } from "lucide-react"
import { GFS_Didot, Great_Vibes } from "next/font/google"
import BrandLogo from "@/components/BrandLogo"

/* ══════════════════════════════════════════════════════════════════════
   FONTS
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
   DESIGN SYSTEM COLOR TOKENS
   ══════════════════════════════════════════════════════════════════════ */
const SE = {
  bg: "#FAF8F6",
  accent: "#DEB5A0",
  accentBright: "#B57E5D",
  text: "#2D2926",
  textSecondary: "#6B6462",
  textMuted: "#9B9492",
  textFaint: "#C5BBB5",
}

const CARDS_DATA = [
  {
    title: "Atelier Story",
    description: "Explore our legacy, craft philosophy, and the creative team behind our projects.",
    href: "/about",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop&q=80",
    label: "ABOUT US",
  },
  {
    title: "Bespoke Services",
    description: "Tailored residential and commercial designs, bespoke furniture, and art curation.",
    href: "/#services",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=800&fit=crop&q=80",
    label: "OUR WORK",
  },
  {
    title: "Get in Touch",
    description: "Begin your journey. Book a private consultation at our Vadodara or Aurangabad showrooms.",
    href: "/#contact",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop&q=80",
    label: "COLLABORATE",
  },
]

export default function ExperimentPage() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const tiltRef = useRef({ rotateX: 0, rotateY: 0, imgX: 0, imgY: 0 })
  const animFrameRef = useRef<number>(0)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, imgX: 0, imgY: 0 })

  // Disable scroll entirely for this experimental page
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  // Mouse-tracking 3D tilt
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1

      const maxTilt = isUnlocked ? 3 : 12
      const targetRotateY = nx * maxTilt
      const targetRotateX = -ny * maxTilt

      const maxShift = isUnlocked ? 15 : 15
      const targetImgX = -nx * maxShift
      const targetImgY = -ny * maxShift

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

        const delta = Math.abs(next.rotateX - targetRotateX) + Math.abs(next.rotateY - targetRotateY)
        if (delta > 0.01) {
          animFrameRef.current = requestAnimationFrame(animate)
        }
      }
      animFrameRef.current = requestAnimationFrame(animate)
    },
    [isUnlocked]
  )

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

  // Escape to lock capsule
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isUnlocked) {
        setIsUnlocked(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isUnlocked])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#FAF8F6] flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
    >
      {/* ── BACKGROUND SILK DRIFT OVERLAY ── */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0" style={{ mixBlendMode: "multiply" }}>
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: "url('/silk-texture.png')" }}
        />
      </div>

      {/* ── BRAND LOGO TRANSITION ── */}
      <motion.div
        animate={{
          top: isUnlocked ? "4.5rem" : "4.5rem",
          y: isUnlocked ? "-10%" : "0%",
          scale: isUnlocked ? 0.9 : 1.0,
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-none z-40"
      >
        <BrandLogo width={200} height={80} dark={!isUnlocked} animationType="write" />
        <span
          className="text-[7.5px] tracking-[0.45em] uppercase -mt-1 block leading-none font-bold text-[#8A7F7C]"
          style={{ fontFamily: "var(--font-gfs-didot)" }}
        >
          ARCHITECTURE & INTERIOR DESIGN
        </span>
      </motion.div>

      {/* ── LOCKED STATE HELPER TEXT ── */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-end py-16 pointer-events-none z-[15]">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#6B6462] animate-pulse font-bold">
              Click Capsule to Explore
            </span>
            <span className="text-[10px] tracking-[0.15em] font-light text-[#C5BBB5]">
              VADODARA · AURANGABAD
            </span>
          </div>
        </div>
      )}

      {/* ── THE 3D TILT CAPSULE ── */}
      <motion.div
        layout
        onClick={() => {
          if (!isUnlocked) {
            setIsUnlocked(true)
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
        <div className="relative w-full h-full overflow-hidden bg-[#FAF8F6]">
          <motion.div
            className="absolute inset-[-30px]"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: `translate3d(${tilt.imgX}px, ${tilt.imgY}px, 0) scale(1.08)`,
              transformOrigin: "center center",
            }}
          >
            <Image
              src="/studio-exquis-reception.jpg"
              alt="Studio Exquis flagship showroom"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </motion.div>

          {/* Glare effect */}
          <div
            className="absolute inset-0 pointer-events-none z-[5]"
            style={{
              background: `radial-gradient(ellipse at ${50 + tilt.rotateY * (isUnlocked ? 5 : 3)}% ${50 - tilt.rotateX * (isUnlocked ? 5 : 3)}%, rgba(255,255,255,${isUnlocked ? 0.04 : 0.12}) 0%, transparent 60%)`,
            }}
          />

          {/* Background overlay when unlocked */}
          {isUnlocked && (
            <div className="absolute inset-0 bg-black/45 pointer-events-none z-10 backdrop-blur-[2px] transition-all duration-700" />
          )}
        </div>
      </motion.div>

      {/* ── EXPANDED EXPERIMENTAL DASHBOARD ── */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute inset-0 z-20 flex flex-col justify-between px-8 md:px-16 py-12 pointer-events-none"
          >
            {/* Top Bar spacing (for BrandLogo) */}
            <div className="w-full flex justify-between items-center pointer-events-auto h-12">
              <button
                onClick={() => setIsUnlocked(false)}
                className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 font-semibold uppercase tracking-wider text-[10px]"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Return</span>
              </button>

              <Link
                href="/"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-md"
                style={{ textDecoration: "none" }}
              >
                Full Site
              </Link>
            </div>

            {/* Central Navigation Grid */}
            <div className="w-full max-w-5xl mx-auto flex flex-col justify-center h-full pointer-events-auto mt-12 mb-6">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {CARDS_DATA.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="relative overflow-hidden group cursor-pointer"
                    style={{ borderRadius: 24, height: "clamp(220px, 30vh, 320px)" }}
                  >
                    {/* Card background image with scale effect */}
                    <div className="absolute inset-0 z-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                    </div>

                    {/* Card Content */}
                    <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end text-white">
                      <span className={`text-[9px] tracking-[0.3em] font-bold block mb-2 text-[#DEB5A0] ${gfsDidot.className}`}>
                        {card.label}
                      </span>
                      <h3 className={`text-xl font-normal tracking-wide mb-2 ${gfsDidot.className}`}>
                        {card.title}
                      </h3>
                      <p className="text-white/70 text-[11px] leading-relaxed line-clamp-2 mb-4">
                        {card.description}
                      </p>
                      
                      {/* Interactive Button */}
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-semibold text-white/95 hover:text-white transition-all"
                        style={{ textDecoration: "none" }}
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>

                    {/* Subtle border shine */}
                    <div className="absolute inset-0 border border-white/10 rounded-[24px] pointer-events-none group-hover:border-[#DEB5A0]/30 transition-colors duration-300" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Footer Spacing */}
            <div className="w-full flex justify-between items-center text-[8.5px] tracking-[0.2em] uppercase text-white/40 pointer-events-auto">
              <span>Studio Exquis © {new Date().getFullYear()}</span>
              <span className="hidden sm:inline">Minimal Experimental Hub v1.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
