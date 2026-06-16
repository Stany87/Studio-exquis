"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import { GFS_Didot } from "next/font/google";

const gfsDidot = GFS_Didot({ subsets: ["greek"], weight: "400", display: "swap" });

type BackgroundType = "ivory" | "champagne" | "blush" | "glass";
type AnimationType = "handwritten" | "draw" | "write" | "fade-stagger" | "glow-flow";

export default function LogoDemoPage() {
  const [bgType, setBgType] = useState<BackgroundType>("ivory");
  const [animType, setAnimType] = useState<AnimationType>("handwritten");
  const [replayKey, setReplayKey] = useState(0);
  const [speed, setSpeed] = useState<number>(1);

  // Replay animation trigger
  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  // Define background details
  const bgs = {
    ivory: {
      name: "Ivory Editorial Paper",
      style: {
        background: "#FAF8F6",
        color: "#2D2926",
        border: "1px solid rgba(45, 41, 38, 0.08)",
        boxShadow: "0 20px 50px rgba(45, 41, 38, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      },
      pageStyle: "bg-[#FAF8F6]",
    },
    champagne: {
      name: "Champagne Silk Sand",
      style: {
        background: "linear-gradient(135deg, #FCFAF9 0%, #F3ECE7 100%)",
        color: "#2D2926",
        border: "1px solid rgba(222, 181, 160, 0.3)",
        boxShadow: "0 25px 60px rgba(222, 181, 160, 0.15), 0 4px 20px rgba(45, 41, 38, 0.02)",
      },
      pageStyle: "bg-[#F5F0EC]",
    },
    blush: {
      name: "Rose Blush Gradient",
      style: {
        background: "linear-gradient(135deg, #FAF4F0 0%, #EBDCD0 100%)",
        color: "#2D2926",
        border: "1px solid rgba(222, 181, 160, 0.4)",
        boxShadow: "0 25px 65px rgba(222, 181, 160, 0.22)",
      },
      pageStyle: "bg-[#EAE4DF]",
    },
    glass: {
      name: "Luxury Frosted Glass",
      style: {
        background: "rgba(255, 255, 255, 0.45)",
        backdropFilter: "blur(24px) saturate(120%)",
        color: "#2D2926",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 30px 70px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      },
      pageStyle: "bg-[#FAF8F6]",
    },
  };

  return (
    <div className={`min-h-screen relative flex flex-col justify-between p-6 sm:p-12 overflow-hidden transition-colors duration-700 ${bgs[bgType].pageStyle}`}>
      
      {/* Decorative blurred background blobs for Glassmorphism */}
      <AnimatePresence>
        {bgType === "glass" && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute w-[45vw] h-[45vw] rounded-full bg-[#DEB5A0] blur-[100px] -top-12 -left-12 pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.25, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute w-[40vw] h-[40vw] rounded-full bg-[#D1A08A] blur-[120px] -bottom-12 -right-12 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex justify-between items-center z-10 w-full max-w-5xl mx-auto">
        <Link href="/" className="group flex items-center gap-2" style={{ textDecoration: "none" }}>
          <span className="text-xl font-light text-[#2D2926] tracking-widest font-serif group-hover:text-[#DEB5A0] transition-colors">
            STUDIO EXQUIS
          </span>
        </Link>
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#6B6462] font-semibold">
          Logo Animation Laboratory
        </span>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 z-10 w-full max-w-5xl mx-auto">
        
        {/* Animated Presentation Canvas Card */}
        <motion.div
          key={`${bgType}-${replayKey}-${animType}-${speed}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl py-20 px-8 sm:px-16 rounded-[32px] flex flex-col items-center justify-center relative transition-all duration-500"
          style={bgs[bgType].style}
        >
          {/* Subtle Label */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DEB5A0] animate-pulse"></span>
            <span className="text-[8px] tracking-[0.3em] uppercase font-bold text-[#6B6462]">
              {bgs[bgType].name}
            </span>
          </div>

          {/* Logo container */}
          <div className="w-full max-w-md aspect-[824/223] relative flex items-center justify-center">
            {/* The BrandLogo component with active states */}
            <BrandLogo
              key={replayKey}
              width="100%"
              height="100%"
              dark={true}
              animationType={animType}
              className="w-full"
            />
          </div>

          {/* Subtitle animation (matched to ink draw) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: animType === "handwritten" ? 5.8 : 1.2, duration: 1.0 }}
            className="text-[9px] tracking-[0.45em] uppercase text-[#2D2926] mt-4 font-bold text-center leading-none"
            style={{ fontFamily: "var(--font-gfs-didot)" }}
          >
            ARCHITECTURE & INTERIOR DESIGN
          </motion.div>
        </motion.div>

        {/* Playground Controls Grid */}
        <div className="w-full max-w-3xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#F5F0EC]/80 backdrop-blur-md p-8 rounded-3xl border border-black/[0.04]">
          
          {/* Left Panel: Animation Types */}
          <div className="flex flex-col gap-4">
            <h3 className={`text-xs tracking-[0.2em] uppercase text-[#6B6462] font-bold ${gfsDidot.className}`}>
              Select Animation Mode
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {(["handwritten", "draw", "write", "fade-stagger", "glow-flow"] as AnimationType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setAnimType(type);
                    handleReplay();
                  }}
                  className={`px-4 py-2 rounded-full text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 ${
                    animType === type
                      ? "bg-[#2D2926] text-white shadow-lg shadow-[#2D2926]/10"
                      : "bg-white hover:bg-[#FAF8F6] text-[#2D2926] border border-black/[0.05]"
                  }`}
                >
                  {type === "handwritten" && "✍️ Sequential Draw"}
                  {type === "draw" && "✒️ Outline Sketch"}
                  {type === "write" && "🪞 Clipping Wipe"}
                  {type === "fade-stagger" && "📶 Staggered Fade"}
                  {type === "glow-flow" && "✨ Shimmer Glow"}
                </button>
              ))}
            </div>
            
            <p className="text-[10px] text-[#6B6462] leading-relaxed mt-2 italic">
              {animType === "handwritten" && "Sequential Ink Stroke: Renders in 6 separate strokes mimicking a real ink drawing, with localized fills fading in sequentially."}
              {animType === "draw" && "Outline Sketch: Animates path outlines simultaneously, then smoothly transitions to the filled color state."}
              {animType === "write" && "Clipping Wipe: Reveals the logo from left to right using a sliding mask, creating a clean reveal."}
              {animType === "fade-stagger" && "Staggered Fade: Renders paths sequentially using simple stagger offsets and translations."}
              {animType === "glow-flow" && "Shimmer Glow: Plays a continuous metallic light gradient animation flowing across the paths."}
            </p>
          </div>

          {/* Right Panel: Backgrounds & Actions */}
          <div className="flex flex-col gap-5 justify-between">
            
            {/* Background selection */}
            <div className="flex flex-col gap-3">
              <h3 className={`text-xs tracking-[0.2em] uppercase text-[#6B6462] font-bold ${gfsDidot.className}`}>
                Subtle Background style
              </h3>
              <div className="flex flex-wrap gap-2">
                {(["ivory", "champagne", "blush", "glass"] as BackgroundType[]).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBgType(bg)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] tracking-wider font-semibold transition-all duration-300 ${
                      bgType === bg
                        ? "bg-[#DEB5A0] text-white shadow-md shadow-[#DEB5A0]/20"
                        : "bg-white hover:bg-[#FAF8F6] text-[#6B6462] border border-black/[0.05]"
                    }`}
                  >
                    {bg.charAt(0).toUpperCase() + bg.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-2 border-t border-black/[0.04]">
              <button
                onClick={handleReplay}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold text-white bg-[#DEB5A0] hover:bg-[#D1A08A] transition-all shadow-md shadow-[#DEB5A0]/25`}
              >
                🔄 Replay Animation
              </button>
              
              <Link 
                href="/" 
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold text-[#2D2926] bg-white border border-black/[0.05] hover:bg-[#FAF8F6] transition-all`}
                style={{ textDecoration: "none" }}
              >
                Back to Site
              </Link>
            </div>
            
          </div>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 mt-6 z-10 text-[9px] tracking-[0.2em] uppercase text-[#9B9492]">
        <span>© 2026 Studio Exquis Editorial</span>
        <span>Aesthetic Precision & Luxury Editorial Layouts</span>
      </footer>

    </div>
  );
}
