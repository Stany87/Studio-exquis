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
};

const SERVICES = [
  {
    title: "Residential Design",
    description: "Complete home interiors from concept to final styling. We create living spaces that reflect your identity.",
    icon: "I",
  },
  {
    title: "Commercial Spaces",
    description: "Boutique hotels, restaurants, and retail environments designed to captivate and convert.",
    icon: "II",
  },
  {
    title: "Bespoke Furniture",
    description: "Custom furniture and millwork crafted by master artisans to your exact specifications.",
    icon: "III",
  },
  {
    title: "Art Curation",
    description: "Gallery-level art consulting and placement to elevate your interior narrative.",
    icon: "IV",
  },
  {
    title: "Renovation & Restoration",
    description: "Sensitive restoration of heritage properties with modern luxury integration.",
    icon: "V",
  },
  {
    title: "Design Consultation",
    description: "Expert guidance sessions for those who want our eye without a full-scope project.",
    icon: "VI",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("svc-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = section.querySelectorAll("[data-svc]");
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative"
      style={{
        background: "transparent",
        paddingTop: "clamp(5rem, 12dvh, 9rem)",
        paddingBottom: "clamp(5rem, 12dvh, 9rem)",
        paddingLeft: "clamp(2rem, 8vw, 8rem)",
        paddingRight: "clamp(2rem, 8vw, 8rem)",
      }}
    >
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <div data-svc className="svc-fade">
          <span
            className={`text-[10px] tracking-[0.3em] uppercase block mb-4 ${gfsDidot.className}`}
            style={{ color: SE.textMuted }}
          >
            WHAT WE DO
          </span>
          <h2
            className={`${greatVibes.className} mb-6`}
            style={{
              color: SE.text,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              lineHeight: 1.2,
            }}
          >
            Our Services
          </h2>
          <div
            className="mx-auto"
            style={{ width: 60, height: 1, background: SE.accent }}
          />
        </div>
      </div>

      {/* Services grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, i) => (
          <div
            key={service.title}
            data-svc
            className="svc-fade group"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div
              className="p-8 h-full"
              style={{
                borderRadius: 24,
                border: "1px solid rgba(45,41,38,0.06)",
                background: "rgba(245,240,236,0.5)",
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(222,181,160,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 50px -15px rgba(45,41,38,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(45,41,38,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Icon (roman numeral) */}
              <div
                className={`mb-5 ${greatVibes.className}`}
                style={{ fontSize: "2rem", color: SE.accentBright, lineHeight: 1 }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3
                className={`text-base mb-3 ${gfsDidot.className}`}
                style={{ color: SE.text, letterSpacing: "0.02em" }}
              >
                {service.title}
              </h3>

              {/* Divider */}
              <div
                className="mb-4"
                style={{ width: 30, height: 1, background: SE.accentBright, transition: "width 0.3s ease" }}
              />

              {/* Description */}
              <p
                className={`text-sm leading-relaxed ${gfsDidot.className}`}
                style={{ color: SE.textSecondary }}
              >
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CSS */}
      <style jsx>{`
        .svc-fade {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .svc-visible .svc-fade,
        .svc-fade.svc-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
