"use client";
import { useRef, useEffect } from "react";
import { GFS_Didot, Great_Vibes } from "next/font/google";

const gfsDidot = GFS_Didot({ subsets: ["greek"], weight: "400", display: "swap" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap" });

const SE = {
  bg: "#FAF8F6",
  accent: "#DEB5A0",
  accentBright: "#B57E5D",
  text: "#2D2926",
  textSecondary: "#6B6462",
  textMuted: "#9B9492",
  textFaint: "#C5BBB5",
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    const els = section.querySelectorAll("[data-animate]");
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative"
      style={{
        background: "transparent",
        paddingTop: "clamp(6rem, 14dvh, 10rem)",
        paddingBottom: "clamp(6rem, 14dvh, 10rem)",
        paddingLeft: "clamp(2rem, 8vw, 8rem)",
        paddingRight: "clamp(2rem, 8vw, 8rem)",
      }}
    >
      {/* Decorative line */}
      <div
        className="mx-auto mb-16"
        style={{ width: 1, height: 80, background: `linear-gradient(180deg, transparent, ${SE.accent}, transparent)` }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div data-animate className="about-fade text-center mb-6">
          <span
            className={`text-[11px] tracking-[0.35em] uppercase font-bold ${gfsDidot.className}`}
            style={{ color: SE.accentBright }}
          >
            ABOUT THE STUDIO
          </span>
        </div>

        {/* Main heading */}
        <div data-animate className="about-fade text-center mb-12">
          <h2
            className={`${greatVibes.className}`}
            style={{
              color: SE.text,
              fontSize: "clamp(3rem, 7vw, 4.8rem)",
              lineHeight: 1.2,
            }}
          >
            Where Vision Meets Craft
          </h2>
        </div>

        {/* Two-column text */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div data-animate className="about-fade">
            <p
              className={`text-base leading-[1.9] ${gfsDidot.className}`}
              style={{ color: SE.textSecondary }}
            >
              Every space has a story waiting to be told. At Studio Exquis, we don&apos;t start with blueprints; we start by listening. We listen to the way morning light filters through a window, the gentle cadence of daily life, and the quiet, unexpressed dreams of the people who will call this home.
            </p>
            <p
              className={`text-base leading-[1.9] mt-6 ${gfsDidot.className}`}
              style={{ color: SE.textSecondary }}
            >
              We believe in the integrity of raw, honest materials. The organic sweep of a walnut slab, the unique storytelling of Calacatta marble, the soft texture of hand-woven Belgian linen. We don&apos;t design to follow passing trends; we design to let these natural elements speak for themselves.
            </p>
          </div>

          <div data-animate className="about-fade">
            <p
              className={`text-base leading-[1.9] ${gfsDidot.className}`}
              style={{ color: SE.textSecondary }}
            >
              Our portfolio spans from historic European estates to contemporary urban sanctuaries, but our philosophy remains unchanged: luxury is found in the details felt rather than seen. The comforting weight of a custom brass handle, the hand-applied texture of plaster walls, the subtle shifting of shadows as afternoon fades into dusk.
            </p>
            <p
              className={`text-base leading-[1.9] mt-6 ${gfsDidot.className}`}
              style={{ color: SE.textSecondary }}
            >
              These elements are not mere decorations. They are the architecture of human emotion.
            </p>
          </div>
        </div>

        {/* Link to full About page */}
        <div data-animate className="about-fade text-center mt-12">
          <a
            href="/about"
            className={`inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase ${gfsDidot.className}`}
            style={{ color: SE.accent, textDecoration: "none", transition: "color 0.25s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = SE.text; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = SE.accent; }}
          >
            <span style={{ width: 30, height: 1, background: "currentColor", display: "inline-block" }} />
            Read Our Full Story
            <span style={{ width: 30, height: 1, background: "currentColor", display: "inline-block" }} />
          </a>
        </div>

        {/* Stats row */}
        <div
          data-animate
          className="about-fade grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12"
          style={{ borderTop: `1px solid rgba(45,41,38,0.08)` }}
        >
          {[
            { value: "14+", label: "YEARS OF PRACTICE" },
            { value: "120+", label: "PROJECTS DELIVERED" },
            { value: "6", label: "COUNTRIES" },
            { value: "28", label: "DESIGN AWARDS" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className={`${greatVibes.className} mb-2`}
                style={{ color: SE.accentBright, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                {stat.value}
              </div>
              <div
                className={`text-[10px] tracking-[0.2em] uppercase ${gfsDidot.className}`}
                style={{ color: SE.textMuted }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for scroll-triggered animations */}
      <style jsx>{`
        .about-fade {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .animate-in .about-fade,
        .about-fade.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        [data-animate]:nth-child(2) .about-fade,
        [data-animate]:nth-of-type(2).about-fade {
          transition-delay: 0.1s;
        }
        [data-animate]:nth-child(3) .about-fade,
        [data-animate]:nth-of-type(3).about-fade {
          transition-delay: 0.2s;
        }
        [data-animate]:nth-child(4) .about-fade,
        [data-animate]:nth-of-type(4).about-fade {
          transition-delay: 0.3s;
        }
      `}</style>
    </section>
  );
}
