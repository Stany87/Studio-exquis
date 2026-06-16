"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface BrandLogoProps {
  width?: number | string
  height?: number | string
  dark?: boolean
  animated?: boolean
  className?: string
}

/**
 * Brand logo component displaying the traced "Studio Exquis" signature.
 * 
 * - `dark={true}` → dark text (for light backgrounds)
 * - `dark={false}` → white/cream text (for dark backgrounds)
 * - `animated={true}` → fade-in on mount
 */
export default function BrandLogo({
  width = 200,
  height = 60,
  dark = true,
  animated = true,
  className = "",
}: BrandLogoProps) {
  // CSS filter to invert black SVG to white for dark backgrounds
  // The SVG is black by default, so we invert + adjust for cream (#FAF8F6)
  const lightFilter = "invert(1) brightness(0.98) sepia(0.02)"
  // For dark mode on light bg, keep as-is (black signature on light bg)
  // but adjust to match brand dark (#2D2926) — slightly warm dark
  const darkFilter = "brightness(0.16) sepia(0.1) saturate(0.8)"

  const imgStyle: React.CSSProperties = {
    filter: dark ? darkFilter : lightFilter,
    objectFit: "contain" as const,
    objectPosition: "center",
  }

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={className}
        style={{ width: typeof width === "number" ? width : undefined, height: typeof height === "number" ? height : undefined }}
      >
        <Image
          src="/studio-exquis-signature.svg"
          alt="Studio Exquis"
          width={typeof width === "number" ? width : 200}
          height={typeof height === "number" ? height : 60}
          style={imgStyle}
          priority
          unoptimized
        />
      </motion.div>
    )
  }

  return (
    <div
      className={className}
      style={{ width: typeof width === "number" ? width : undefined, height: typeof height === "number" ? height : undefined }}
    >
      <Image
        src="/studio-exquis-signature.svg"
        alt="Studio Exquis"
        width={typeof width === "number" ? width : 200}
        height={typeof height === "number" ? height : 60}
        style={imgStyle}
        priority
        unoptimized
      />
    </div>
  )
}
