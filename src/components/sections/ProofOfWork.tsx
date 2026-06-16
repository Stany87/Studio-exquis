"use client";
import { useRef, useEffect } from "react";
import { GFS_Didot, Great_Vibes } from "next/font/google";

const gfsDidot = GFS_Didot({ subsets: ["greek"], weight: "400", display: "swap" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap" });

const SE = {
  bg: "#FAF8F6",
  bgPanel: "#F5F0EC",
  accent: "#DEB5A0",
  text: "#2D2926",
  textSecondary: "#6B6462",
  textMuted: "#9B9492",
};

export default function ProofOfWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {/* autoplay blocked */});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pow-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = section.querySelectorAll("[data-pow]");
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proof-of-work"
      className="relative"
      style={{
        background: SE.bgPanel,
        paddingTop: "clamp(5rem, 12dvh, 9rem)",
        paddingBottom: "clamp(5rem, 12dvh, 9rem)",
        paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <div data-pow className="pow-fade">
          <span
            className={`text-[10px] tracking-[0.3em] uppercase block mb-4 ${gfsDidot.className}`}
            style={{ color: SE.textMuted }}
          >
            OUR PROCESS
          </span>
          <h2
            className={`${greatVibes.className} mb-6`}
            style={{
              color: SE.text,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              lineHeight: 1.2,
            }}
          >
            From Blueprint to Reality
          </h2>
          <p
            className={`text-sm leading-relaxed max-w-2xl mx-auto ${gfsDidot.className}`}
            style={{ color: SE.textSecondary }}
          >
            Every masterpiece begins with a vision and thousands of meticulous decisions.
            Watch the transformation of raw space into curated luxury — every beam,
            every surface, every detail orchestrated with precision.
          </p>
        </div>
      </div>

      {/* Video Container */}
      <div data-pow className="pow-fade max-w-6xl mx-auto">
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 32,
            boxShadow: "0 40px 80px -20px rgba(45,41,38,0.12)",
            border: "1px solid rgba(45,41,38,0.06)",
          }}
        >
          <video
            ref={videoRef}
            src="/studio-timelapse.mp4"
            muted
            loop
            playsInline
            controls
            preload="metadata"
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "16/9",
              objectFit: "cover",
              background: "#2D2926",
            }}
          />

          {/* Subtle overlay at bottom for text */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-8 pb-6 pointer-events-none"
            style={{
              background: "linear-gradient(0deg, rgba(45,41,38,0.5) 0%, transparent 100%)",
              height: "30%",
            }}
          >
            <span
              className={`text-[10px] tracking-[0.25em] uppercase ${gfsDidot.className}`}
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              CONSTRUCTION TIMELAPSE
            </span>
            <span
              className={`text-[10px] tracking-[0.2em] uppercase ${gfsDidot.className}`}
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              STUDIO EXQUIS · 2025
            </span>
          </div>
        </div>
      </div>

      {/* Bottom quote */}
      <div data-pow className="pow-fade max-w-3xl mx-auto text-center mt-16">
        <div
          className="mx-auto mb-8"
          style={{ width: 40, height: 1, background: SE.accent }}
        />
        <blockquote
          className={`text-lg italic leading-relaxed ${gfsDidot.className}`}
          style={{ color: SE.textSecondary }}
        >
          &ldquo;The details are not the details. They make the design.&rdquo;
        </blockquote>
        <cite
          className={`block mt-4 text-[10px] tracking-[0.25em] uppercase not-italic ${gfsDidot.className}`}
          style={{ color: SE.textMuted }}
        >
          — CHARLES EAMES
        </cite>
      </div>

      {/* CSS */}
      <style jsx>{`
        .pow-fade {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pow-visible .pow-fade,
        .pow-fade.pow-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
