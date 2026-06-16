"use client";
import { useEffect, useState } from "react";
import { GFS_Didot, Great_Vibes } from "next/font/google";
import BrandLogo from "@/components/BrandLogo";

const gfsDidot = GFS_Didot({ subsets: ["greek"], weight: "400", display: "swap" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap" });

const SE = {
  bg: "#FAF8F6",
  bgPanel: "#F5F0EC",
  accent: "#DEB5A0",
  accentHover: "#D1A08A",
  text: "#2D2926",
  textSecondary: "#6B6462",
  textMuted: "#9B9492",
};

const NAV_LINKS = [
  { label: "Portfolio", href: "#cinema-reel", isRoute: false },
  { label: "About", href: "/about", isRoute: true },
  { label: "Our Process", href: "#proof-of-work", isRoute: false },
  { label: "Services", href: "#services", isRoute: false },
  { label: "Contact", href: "#contact", isRoute: false },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const reel = document.getElementById("cinema-reel");
    if (!reel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show navbar when reel is NOT fully visible (scrolled past)
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(reel);

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between"
      style={{
        height: 72,
        paddingLeft: "clamp(1.5rem, 4dvh, 3rem)",
        paddingRight: "clamp(1.5rem, 4dvh, 3rem)",
        background: scrolled && visible ? "rgba(250,248,246,0.85)" : "transparent",
        backdropFilter: visible ? "blur(20px) saturate(140%)" : "none",
        borderBottom: visible ? "1px solid rgba(45,41,38,0.06)" : "1px solid transparent",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease, border-bottom 0.4s ease, backdrop-filter 0.4s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Logo */}
      <a
        href="#cinema-reel"
        onClick={(e) => handleClick(e, "#cinema-reel")}
        style={{ textDecoration: "none" }}
      >
        <BrandLogo width={140} height={40} dark={true} animated={false} />
      </a>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              if (link.isRoute) return; // let browser navigate
              handleClick(e, link.href);
            }}
            className={`text-[11px] tracking-[0.18em] uppercase ${gfsDidot.className}`}
            style={{
              color: SE.textSecondary,
              textDecoration: "none",
              transition: "color 0.25s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = SE.accent; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = SE.textSecondary; }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#contact"
        onClick={(e) => handleClick(e, "#contact")}
        className={`hidden md:flex items-center justify-center px-5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase ${gfsDidot.className}`}
        style={{
          border: `1px solid ${SE.accent}`,
          color: SE.text,
          textDecoration: "none",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SE.accent; (e.currentTarget as HTMLElement).style.color = "white"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = SE.text; }}
      >
        Book Consultation
      </a>
    </nav>
  );
}
