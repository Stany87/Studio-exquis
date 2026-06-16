"use client";
import { GFS_Didot, Great_Vibes } from "next/font/google";
import BrandLogo from "@/components/BrandLogo";

const gfsDidot = GFS_Didot({ subsets: ["greek"], weight: "400", display: "swap" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap" });

const SE = {
  text: "#2D2926",
  textSecondary: "#6B6462",
  textMuted: "#9B9492",
  textFaint: "#C5BBB5",
  accent: "#DEB5A0",
};

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative"
      style={{
        background: SE.text,
        color: "rgba(255,255,255,0.7)",
        paddingTop: "clamp(5rem, 12dvh, 8rem)",
        paddingBottom: "clamp(2rem, 4dvh, 3rem)",
        paddingLeft: "clamp(2rem, 8vw, 8rem)",
        paddingRight: "clamp(2rem, 8vw, 8rem)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Top section */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Brand */}
          <div>
            <BrandLogo width={160} height={45} dark={false} animated={false} />
            <p
              className={`text-sm leading-relaxed ${gfsDidot.className}`}
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Luxury interior design for those who
              understand that beauty is not decoration —
              it is atmosphere.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className={`text-[10px] tracking-[0.25em] uppercase mb-6 ${gfsDidot.className}`}
              style={{ color: SE.accent }}
            >
              NAVIGATE
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Portfolio", href: "#cinema-reel" },
                { label: "About", href: "#about" },
                { label: "Our Process", href: "#proof-of-work" },
                { label: "Services", href: "#services" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-sm ${gfsDidot.className}`}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    transition: "color 0.25s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = SE.accent; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={`text-[10px] tracking-[0.25em] uppercase mb-6 ${gfsDidot.className}`}
              style={{ color: SE.accent }}
            >
              GET IN TOUCH
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@studioexquis.com"
                className={`text-sm ${gfsDidot.className}`}
                style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.25s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = SE.accent; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
              >
                hello@studioexquis.com
              </a>
              <span className={`text-sm ${gfsDidot.className}`} style={{ color: "rgba(255,255,255,0.35)" }}>
                +91 94261 33932
              </span>
              <span className={`text-sm ${gfsDidot.className}`} style={{ color: "rgba(255,255,255,0.35)" }}>
                Vadodara · Aurangabad
              </span>
            </div>

            {/* CTA */}
            <a
              href="mailto:hello@studioexquis.com"
              className={`inline-flex items-center justify-center px-6 py-3 rounded-full mt-8 text-[10px] tracking-[0.2em] uppercase ${gfsDidot.className}`}
              style={{
                border: `1px solid ${SE.accent}`,
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SE.accent; (e.currentTarget as HTMLElement).style.color = "white"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
            >
              Book a Consultation
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <span
            className={`text-[10px] tracking-[0.15em] uppercase ${gfsDidot.className}`}
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            © {new Date().getFullYear()} STUDIO EXQUIS. ALL RIGHTS RESERVED.
          </span>
          <span
            className={`text-[10px] tracking-[0.15em] uppercase ${gfsDidot.className}`}
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            DESIGNED WITH OBSESSION
          </span>
        </div>
      </div>
    </footer>
  );
}
