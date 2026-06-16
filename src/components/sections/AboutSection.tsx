"use client";
import { useRef, useEffect } from "react";
import { GFS_Didot, Great_Vibes } from "next/font/google";

const gfsDidot = GFS_Didot({ subsets: ["greek"], weight: "400", display: "swap" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap" });

const SE = {
  bg: "#FAF8F6",
  accent: "#DEB5A0",
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
            className={`text-[10px] tracking-[0.3em] uppercase ${gfsDidot.className}`}
            style={{ color: SE.textMuted }}
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
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
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
              Studio Exquis was founded on a singular belief: that the spaces we inhabit
              shape the lives we lead. Every project begins with listening — to the light
              in a room, to the rhythm of a household, to the unspoken desires that a
              client hasn&apos;t yet found words for.
            </p>
            <p
              className={`text-base leading-[1.9] mt-6 ${gfsDidot.className}`}
              style={{ color: SE.textSecondary }}
            >
              We don&apos;t follow trends. We follow materials — the grain of a walnut slab,
              the veining of Calacatta marble, the drape of Belgian linen. When the
              materials speak, the design writes itself.
            </p>
          </div>

          <div data-animate className="about-fade">
            <p
              className={`text-base leading-[1.9] ${gfsDidot.className}`}
              style={{ color: SE.textSecondary }}
            >
              From penthouses in Manhattan to châteaux in the Loire Valley, our work
              spans continents but shares a common thread: an obsessive attention to the
              details that most people feel but never see. The way a handle sits in the
              palm. The exact temperature of a wall color at dusk.
            </p>
            <p
              className={`text-base leading-[1.9] mt-6 ${gfsDidot.className}`}
              style={{ color: SE.textSecondary }}
            >
              These are not decorations. They are the architecture of feeling.
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
                style={{ color: SE.accent, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
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
