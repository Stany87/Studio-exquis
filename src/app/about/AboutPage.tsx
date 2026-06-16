"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { GFS_Didot, Great_Vibes } from "next/font/google";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const gfsDidot = GFS_Didot({ subsets: ["greek"], weight: "400", display: "swap" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap" });

const SE = {
  bg: "#FAF8F6",
  bgPanel: "#F5F0EC",
  bgDark: "#2D2926",
  accent: "#DEB5A0",
  accentBright: "#B57E5D",
  text: "#2D2926",
  textSecondary: "#6B6462",
  textMuted: "#9B9492",
  textFaint: "#C5BBB5",
};

/* Unsplash helper */
function unsplash(id: string, w = 1920, h = 1080) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;
}

/* ═══ Image IDs (verified working Unsplash) ═══ */
const IMAGES = {
  hero: "1618221195710-dd6b41faaea6",           // luxury modern interior wide
  storyLeft: "1497366216548-37526070297c",       // design workspace
  storyRight: "1600585154340-be6161a56a0c",      // luxury living room
  philosophy1: "1616486338812-3dadae4b4ace",     // elegant interior
  philosophy2: "1615529328331-f8917597711f",     // warm modern living room
  process1: "1586023492125-27b2c045efd7",        // interior styling materials
  process2: "1618221195710-dd6b41faaea6",        // modern designed room
  process3: "1600585154340-be6161a56a0c",        // finished interior
  gallery1: "1616486338812-3dadae4b4ace",        // elegant space
  gallery2: "1600585154340-be6161a56a0c",        // living room
  gallery3: "1618221195710-dd6b41faaea6",        // modern interior
  gallery4: "1615529328331-f8917597711f",        // bedroom
  gallery5: "1497366216548-37526070297c",        // workspace
};

/* ═══ Scroll reveal hook ═══ */
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.12 }
    );
    const targets = el.querySelectorAll("[data-reveal]");
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [ref]);
}

/* ══════════════════════════════════════════════════════════════════════
   ABOUT PAGE
   ══════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useReveal(pageRef);

  // ── 3D tilt tracking for hero ──
  const heroRef = useRef<HTMLElement>(null);
  const tiltRef = useRef({ rotateX: 0, rotateY: 0, imgX: 0, imgY: 0 });
  const animFrameRef = useRef<number>(0);
  const [heroTilt, setHeroTilt] = useState({ rotateX: 0, rotateY: 0, imgX: 0, imgY: 0 });

  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    const maxTilt = 6; // subtler for full-width hero
    const targetRotateY = nx * maxTilt;
    const targetRotateX = -ny * maxTilt;
    const maxShift = 25; // larger shift for full image
    const targetImgX = -nx * maxShift;
    const targetImgY = -ny * maxShift;

    cancelAnimationFrame(animFrameRef.current);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = 0.06;

    const animate = () => {
      const prev = tiltRef.current;
      const next = {
        rotateX: lerp(prev.rotateX, targetRotateX, ease),
        rotateY: lerp(prev.rotateY, targetRotateY, ease),
        imgX: lerp(prev.imgX, targetImgX, ease),
        imgY: lerp(prev.imgY, targetImgY, ease),
      };
      tiltRef.current = next;
      setHeroTilt({ ...next });

      const delta = Math.abs(next.rotateX - targetRotateX) + Math.abs(next.rotateY - targetRotateY);
      if (delta > 0.01) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const handleHeroMouseLeave = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = 0.04;

    const animate = () => {
      const prev = tiltRef.current;
      const next = {
        rotateX: lerp(prev.rotateX, 0, ease),
        rotateY: lerp(prev.rotateY, 0, ease),
        imgX: lerp(prev.imgX, 0, ease),
        imgY: lerp(prev.imgY, 0, ease),
      };
      tiltRef.current = next;
      setHeroTilt({ ...next });

      if (Math.abs(next.rotateX) + Math.abs(next.rotateY) > 0.01) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        tiltRef.current = { rotateX: 0, rotateY: 0, imgX: 0, imgY: 0 };
        setHeroTilt({ rotateX: 0, rotateY: 0, imgX: 0, imgY: 0 });
      }
    };
    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <div ref={pageRef} style={{ background: "transparent" }}>
      {/* ─── Fixed Navbar ────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between"
        style={{
          height: 72,
          paddingLeft: "clamp(1.5rem, 4dvh, 3rem)",
          paddingRight: "clamp(1.5rem, 4dvh, 3rem)",
          background: "rgba(250,248,246,0.85)",
          backdropFilter: "blur(20px) saturate(140%)",
          borderBottom: "1px solid rgba(45,41,38,0.06)",
        }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none" }}
        >
          <BrandLogo width={140} height={40} dark={true} animated={false} />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={`text-[11px] tracking-[0.18em] uppercase ${gfsDidot.className}`} style={{ color: SE.textSecondary, textDecoration: "none" }}>Home</Link>
          <span className={`text-[11px] tracking-[0.18em] uppercase ${gfsDidot.className}`} style={{ color: SE.accent }}>About</span>
          <Link href="/#services" className={`text-[11px] tracking-[0.18em] uppercase ${gfsDidot.className}`} style={{ color: SE.textSecondary, textDecoration: "none" }}>Services</Link>
          <Link href="/#contact" className={`text-[11px] tracking-[0.18em] uppercase ${gfsDidot.className}`} style={{ color: SE.textSecondary, textDecoration: "none" }}>Contact</Link>
        </div>
        <Link
          href="/#contact"
          className={`hidden md:flex items-center justify-center px-5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase ${gfsDidot.className}`}
          style={{ border: `1px solid ${SE.accent}`, color: SE.text, textDecoration: "none" }}
        >
          Book Consultation
        </Link>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
           1. HERO — Full-width cinematic image with 3D parallax
         ═══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ height: "100dvh", perspective: "1200px" }}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* Image layer — tilts and shifts with mouse */}
        <div
          className="absolute inset-[-30px]"
          style={{
            transform: `rotateX(${heroTilt.rotateX}deg) rotateY(${heroTilt.rotateY}deg) translate3d(${heroTilt.imgX}px, ${heroTilt.imgY}px, 0) scale(1.05)`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <img
            src={unsplash(IMAGES.hero, 2400, 1350)}
            alt="Studio Exquis luxury interior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(45,41,38,0.3) 0%, rgba(45,41,38,0.6) 100%)" }} />

        {/* Moving glare overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${50 + heroTilt.rotateY * 5}% ${50 - heroTilt.rotateX * 5}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
          }}
        />

        {/* Content — stays fixed, no tilt */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10">
          <span
            className={`text-[10px] tracking-[0.4em] uppercase mb-6 ${gfsDidot.className}`}
            style={{ color: SE.accent }}
          >
            THE STUDIO EXQUIS STORY
          </span>
          <h1
            className={`${greatVibes.className} mb-6`}
            style={{ color: "rgba(255,255,255,0.95)", fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1.1 }}
          >
            Crafting Spaces,<br />Shaping Lives
          </h1>
          <p
            className={`max-w-2xl text-base leading-relaxed ${gfsDidot.className}`}
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            For over a decade, we have transformed empty rooms into living poetry.
            This is the story of how obsession with beauty became our profession.
          </p>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 flex flex-col items-center gap-3">
            <div style={{ width: 1, height: 50, background: "linear-gradient(180deg, transparent, rgba(222,181,160,0.6))" }} />
            <span className={`text-[9px] tracking-[0.3em] uppercase ${gfsDidot.className}`} style={{ color: "rgba(255,255,255,0.4)" }}>SCROLL</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           2. OUR STORY — The founding narrative
         ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          paddingTop: "clamp(6rem, 14dvh, 10rem)",
          paddingBottom: "clamp(6rem, 14dvh, 10rem)",
          paddingLeft: "clamp(2rem, 8vw, 8rem)",
          paddingRight: "clamp(2rem, 8vw, 8rem)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow */}
          <div data-reveal className="reveal-fade text-center mb-16">
            <span className={`text-[13px] tracking-[0.4em] uppercase block mb-4 font-bold ${gfsDidot.className}`} style={{ color: SE.accentBright }}>OUR BEGINNING</span>
            <h2 className={`${greatVibes.className}`} style={{ color: SE.text, fontSize: "clamp(3rem, 6.5vw, 4.8rem)" }}>
              Where It All Started
            </h2>
          </div>

          {/* Two-column: image + text */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div data-reveal className="reveal-fade">
              <div className="overflow-hidden" style={{ borderRadius: 24 }}>
                <img
                  src={unsplash(IMAGES.storyLeft, 800, 1000)}
                  alt="Interior design workspace"
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>
            </div>

            <div data-reveal className="reveal-fade">
              <span className={`text-sm italic block mb-6 ${gfsDidot.className}`} style={{ color: SE.accent }}>2011 — The First Sketch</span>

              <p className={`text-base leading-[2] mb-6 ${gfsDidot.className}`} style={{ color: SE.textSecondary }}>
                It began in a sunlit apartment in Mumbai with nothing but a sketchbook, a measuring tape,
                and an unshakable conviction: that the spaces people inhabit should move them. Not impress
                them. Not overwhelm them. <em>Move</em> them.
              </p>

              <p className={`text-base leading-[2] mb-6 ${gfsDidot.className}`} style={{ color: SE.textSecondary }}>
                Our founder spent three years studying under master artisans in Rajasthan, learning
                the language of stone and silk, before opening Studio Exquis with a single room and
                a single promise: <strong style={{ color: SE.text }}>every surface will tell a story</strong>.
              </p>

              <p className={`text-base leading-[2] mb-8 ${gfsDidot.className}`} style={{ color: SE.textSecondary }}>
                What started as a passion for residential interiors quickly grew into something
                larger. Clients didn&apos;t just want beautiful rooms — they wanted spaces that
                understood them. Spaces that breathed when they breathed. Spaces that knew the
                difference between a house and a home.
              </p>

              <div className="flex items-center gap-4">
                <div style={{ width: 50, height: 1, background: SE.accent }} />
                <span className={`text-[10px] tracking-[0.2em] uppercase ${gfsDidot.className}`} style={{ color: SE.textMuted }}>
                  AND SO, THE JOURNEY BEGAN
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           3. FULL-WIDTH IMAGE BREAK
         ═══════════════════════════════════════════════════════════ */}
      <section data-reveal className="reveal-fade" style={{ padding: "0 clamp(1.5rem, 5vw, 5rem)" }}>
        <div className="overflow-hidden" style={{ borderRadius: 32 }}>
          <img
            src={unsplash(IMAGES.storyRight, 2400, 900)}
            alt="Luxury living room designed by Studio Exquis"
            className="w-full object-cover"
            style={{ height: "60dvh", width: "100%" }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           3.5 MEET OUR FOUNDER — Oneal Hopkins
         ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          paddingTop: "clamp(6rem, 14dvh, 10rem)",
          paddingBottom: "clamp(6rem, 14dvh, 10rem)",
          paddingLeft: "clamp(2rem, 8vw, 8rem)",
          paddingRight: "clamp(2rem, 8vw, 8rem)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="reveal-fade text-center mb-16">
            <span className={`text-[13px] tracking-[0.4em] uppercase block mb-4 font-bold ${gfsDidot.className}`} style={{ color: SE.accentBright }}>MEET OUR FOUNDER</span>
            <h2 className={`${greatVibes.className}`} style={{ color: SE.text, fontSize: "clamp(3rem, 6.5vw, 4.8rem)" }}>
              The Vision Behind the Studio
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Founder photo */}
            <div data-reveal className="reveal-fade flex justify-center">
              <div className="overflow-hidden relative" style={{ borderRadius: 24, maxWidth: 420 }}>
                <img
                  src="/founder-oneal.png"
                  alt="Oneal Hopkins — Founder of Studio Exquis"
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
                {/* Subtle name overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-16"
                  style={{ background: "linear-gradient(0deg, rgba(45,41,38,0.6) 0%, transparent 100%)" }}
                >
                  <span className={`${greatVibes.className} text-2xl block`} style={{ color: "rgba(255,255,255,0.9)" }}>
                    Oneal Hopkins
                  </span>
                  <span className={`text-[9px] tracking-[0.25em] uppercase ${gfsDidot.className}`} style={{ color: "rgba(255,255,255,0.5)" }}>
                    FOUNDER &amp; CREATIVE DIRECTOR
                  </span>
                </div>
              </div>
            </div>

            {/* Founder story */}
            <div data-reveal className="reveal-fade">
              <span className={`text-sm italic block mb-6 ${gfsDidot.className}`} style={{ color: SE.accent }}>
                A relentless eye for the extraordinary
              </span>

              <p className={`text-base leading-[2] mb-6 ${gfsDidot.className}`} style={{ color: SE.textSecondary }}>
                Oneal Hopkins didn&apos;t just study design — he lived it. Growing up surrounded by the
                raw textures of India&apos;s architectural heritage, he developed an instinct for beauty
                that no classroom could teach. The way monsoon light filters through carved jali screens.
                The warmth of hand-polished teak against bare feet. These weren&apos;t lessons — they were
                awakenings.
              </p>

              <p className={`text-base leading-[2] mb-6 ${gfsDidot.className}`} style={{ color: SE.textSecondary }}>
                After apprenticing with master craftsmen across Rajasthan and studying contemporary
                design in Milan, Oneal founded Studio Exquis with a single conviction:
                <strong style={{ color: SE.text }}> luxury is not excess — it is precision</strong>.
                Every material, every proportion, every shadow in a Studio Exquis space is deliberate.
              </p>

              <p className={`text-base leading-[2] mb-8 ${gfsDidot.className}`} style={{ color: SE.textSecondary }}>
                Today, Oneal leads a team of designers who share his obsession with the invisible
                details that transform a room from beautiful to unforgettable. His work has been
                featured in Architectural Digest, Elle Decor, and recognized with over 28 international
                design awards.
              </p>

              <div className="flex items-center gap-4">
                <div style={{ width: 50, height: 1, background: SE.accent }} />
                <span className={`text-[10px] tracking-[0.2em] uppercase ${gfsDidot.className}`} style={{ color: SE.textMuted }}>
                  TURNING SPACES INTO POETRY SINCE 2011
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           4. PHILOSOPHY — What drives us
         ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          paddingTop: "clamp(6rem, 14dvh, 10rem)",
          paddingBottom: "clamp(6rem, 14dvh, 10rem)",
          paddingLeft: "clamp(2rem, 8vw, 8rem)",
          paddingRight: "clamp(2rem, 8vw, 8rem)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="reveal-fade text-center mb-16">
            <span className={`text-[13px] tracking-[0.4em] uppercase block mb-4 font-bold ${gfsDidot.className}`} style={{ color: SE.accentBright }}>OUR PHILOSOPHY</span>
            <h2 className={`${greatVibes.className}`} style={{ color: SE.text, fontSize: "clamp(3rem, 6.5vw, 4.8rem)" }}>
              Design is Not What You See
            </h2>
          </div>

          {/* Three-column philosophy pillars */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            {[
              {
                number: "01",
                title: "Listen First",
                text: "Every project begins with silence. We sit in your space, we feel its light, we understand its bones. Only then do we pick up a pencil. The best designs are born from patience, not haste.",
              },
              {
                number: "02",
                title: "Material Truth",
                text: "We never ask a material to be something it is not. Marble is marble — cold, ancient, magnificent. Silk is silk — liquid, warm, ephemeral. We honour their nature, and they reward us with timelessness.",
              },
              {
                number: "03",
                title: "Invisible Craft",
                text: "The greatest design is the one you don't notice. When a room simply feels right — when the light falls exactly where it should, when the proportions sing — that is our work made invisible.",
              },
            ].map((pillar) => (
              <div key={pillar.number} data-reveal className="reveal-fade">
                <span className={`${greatVibes.className} block mb-3`} style={{ color: SE.accent, fontSize: "2.5rem" }}>{pillar.number}</span>
                <h3 className={`text-lg mb-4 ${gfsDidot.className}`} style={{ color: SE.text }}>{pillar.title}</h3>
                <div className="mb-5" style={{ width: 30, height: 1, background: SE.accent }} />
                <p className={`text-sm leading-[1.9] ${gfsDidot.className}`} style={{ color: SE.textSecondary }}>{pillar.text}</p>
              </div>
            ))}
          </div>

          {/* Side-by-side images */}
          <div className="grid md:grid-cols-2 gap-6">
            <div data-reveal className="reveal-fade overflow-hidden" style={{ borderRadius: 24 }}>
              <img
                src={unsplash(IMAGES.philosophy1, 900, 600)}
                alt="Elegant interior space"
                className="w-full object-cover"
                style={{ aspectRatio: "3/2" }}
              />
            </div>
            <div data-reveal className="reveal-fade overflow-hidden" style={{ borderRadius: 24 }}>
              <img
                src={unsplash(IMAGES.philosophy2, 900, 600)}
                alt="Warm living space"
                className="w-full object-cover"
                style={{ aspectRatio: "3/2" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           5. THE PROCESS — How we work
         ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: SE.bgPanel,
          paddingTop: "clamp(6rem, 14dvh, 10rem)",
          paddingBottom: "clamp(6rem, 14dvh, 10rem)",
          paddingLeft: "clamp(2rem, 8vw, 8rem)",
          paddingRight: "clamp(2rem, 8vw, 8rem)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="reveal-fade text-center mb-20">
            <span className={`text-[13px] tracking-[0.4em] uppercase block mb-4 font-bold ${gfsDidot.className}`} style={{ color: SE.accentBright }}>THE JOURNEY</span>
            <h2 className={`${greatVibes.className}`} style={{ color: SE.text, fontSize: "clamp(3rem, 6.5vw, 4.8rem)" }}>
              From Dream to Dwelling
            </h2>
          </div>

          {/* Process steps */}
          <div className="space-y-24">
            {[
              {
                step: "01",
                title: "Discovery & Consultation",
                text: "We begin every relationship with a conversation — never a pitch. We visit your space, study its light at different hours, understand how you live, what you treasure, and what you dream of. This phase is unhurried and essential. The best foundations are laid in listening.",
                image: IMAGES.process1,
                reverse: false,
              },
              {
                step: "02",
                title: "Design & Material Selection",
                text: "Our design studio becomes your private showroom. We present curated material palettes — hand-selected marbles, bespoke fabrics, artisan hardware — each piece chosen for how it feels in the hand, catches the light, and ages with grace. Nothing is arbitrary. Every choice has a reason.",
                image: IMAGES.process2,
                reverse: true,
              },
              {
                step: "03",
                title: "Crafting & Installation",
                text: "With blueprints approved and materials sourced from ateliers across the world, our trusted craftsmen bring the vision to life. We oversee every joint, every finish, every alignment. The installation is not the end — it is the moment the space takes its first breath.",
                image: IMAGES.process3,
                reverse: false,
              },
            ].map((item) => (
              <div
                key={item.step}
                data-reveal
                className={`reveal-fade grid md:grid-cols-2 gap-12 md:gap-20 items-center ${item.reverse ? "md:[direction:rtl]" : ""}`}
              >
                <div className="overflow-hidden md:[direction:ltr]" style={{ borderRadius: 24 }}>
                  <img
                    src={unsplash(item.image, 900, 700)}
                    alt={item.title}
                    className="w-full object-cover"
                    style={{ aspectRatio: "9/7" }}
                  />
                </div>
                <div className="md:[direction:ltr]">
                  <span className={`${greatVibes.className} block mb-2`} style={{ color: SE.accent, fontSize: "3rem" }}>{item.step}</span>
                  <h3 className={`text-xl mb-4 ${gfsDidot.className}`} style={{ color: SE.text }}>{item.title}</h3>
                  <div className="mb-5" style={{ width: 40, height: 1, background: SE.accent }} />
                  <p className={`text-sm leading-[2] ${gfsDidot.className}`} style={{ color: SE.textSecondary }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           6. QUOTE BREAK
         ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative flex items-center justify-center text-center"
        style={{
          minHeight: "50dvh",
          paddingTop: "clamp(4rem, 10dvh, 8rem)",
          paddingBottom: "clamp(4rem, 10dvh, 8rem)",
          paddingLeft: "clamp(2rem, 10vw, 10rem)",
          paddingRight: "clamp(2rem, 10vw, 10rem)",
        }}
      >
        <div data-reveal className="reveal-fade max-w-3xl">
          <div className="mx-auto mb-8" style={{ width: 1, height: 60, background: `linear-gradient(180deg, transparent, ${SE.accent}, transparent)` }} />
          <blockquote
            className={`text-xl md:text-2xl italic leading-relaxed mb-6 ${gfsDidot.className}`}
            style={{ color: SE.text }}
          >
            &ldquo;We don&apos;t design interiors. We design the way a person feels when they walk
            through their own front door. That moment of exhale — that is our medium.&rdquo;
          </blockquote>
          <cite
            className={`block text-[10px] tracking-[0.25em] uppercase not-italic ${gfsDidot.className}`}
            style={{ color: SE.textMuted }}
          >
            ONEAL HOPKINS, FOUNDER
          </cite>
          <div className="mx-auto mt-8" style={{ width: 1, height: 60, background: `linear-gradient(180deg, transparent, ${SE.accent}, transparent)` }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           7. NUMBERS — Impact at a glance
         ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative"
        style={{
          background: SE.bgDark,
          paddingTop: "clamp(5rem, 10dvh, 8rem)",
          paddingBottom: "clamp(5rem, 10dvh, 8rem)",
          paddingLeft: "clamp(2rem, 8vw, 8rem)",
          paddingRight: "clamp(2rem, 8vw, 8rem)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div data-reveal className="reveal-fade text-center mb-16">
            <span className={`text-[13px] tracking-[0.4em] uppercase block mb-4 font-bold ${gfsDidot.className}`} style={{ color: SE.accentBright }}>BY THE NUMBERS</span>
            <h2 className={`${greatVibes.className}`} style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(2.7rem, 5.5vw, 4.3rem)" }}>
              A Decade of Dedication
            </h2>
          </div>

          <div data-reveal className="reveal-fade grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { value: "14+", label: "YEARS", sub: "of practice" },
              { value: "120+", label: "PROJECTS", sub: "delivered worldwide" },
              { value: "28", label: "AWARDS", sub: "design accolades" },
              { value: "100%", label: "REFERRAL", sub: "client satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`${greatVibes.className} mb-1`} style={{ color: SE.accentBright, fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>{stat.value}</div>
                <div className={`text-[10px] tracking-[0.25em] uppercase mb-1 ${gfsDidot.className}`} style={{ color: "rgba(255,255,255,0.6)" }}>{stat.label}</div>
                <div className={`text-[10px] italic ${gfsDidot.className}`} style={{ color: "rgba(255,255,255,0.3)" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           8. GALLERY — Five-image strip
         ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          paddingTop: "clamp(5rem, 10dvh, 8rem)",
          paddingBottom: "clamp(2rem, 4dvh, 3rem)",
          paddingLeft: "clamp(1rem, 3vw, 3rem)",
          paddingRight: "clamp(1rem, 3vw, 3rem)",
        }}
      >
        <div data-reveal className="reveal-fade text-center mb-12">
          <span className={`text-[13px] tracking-[0.4em] uppercase block mb-4 font-bold ${gfsDidot.className}`} style={{ color: SE.accentBright }}>SELECTED WORK</span>
          <h2 className={`${greatVibes.className}`} style={{ color: SE.text, fontSize: "clamp(2.7rem, 5.5vw, 4rem)" }}>
            A Glimpse of Our World
          </h2>
        </div>

        <div data-reveal className="reveal-fade grid grid-cols-2 md:grid-cols-5 gap-3">
          {[IMAGES.gallery1, IMAGES.gallery2, IMAGES.gallery3, IMAGES.gallery4, IMAGES.gallery5].map((id, i) => (
            <div key={i} className="overflow-hidden" style={{ borderRadius: 16, aspectRatio: "3/4" }}>
              <img
                src={unsplash(id, 500, 700)}
                alt={`Studio Exquis project ${i + 1}`}
                className="w-full h-full object-cover"
                style={{ transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           9. CTA — Let's create together
         ═══════════════════════════════════════════════════════════ */}
      <section
        className="text-center"
        style={{
          paddingTop: "clamp(5rem, 12dvh, 9rem)",
          paddingBottom: "clamp(5rem, 12dvh, 9rem)",
          paddingLeft: "clamp(2rem, 8vw, 8rem)",
          paddingRight: "clamp(2rem, 8vw, 8rem)",
        }}
      >
        <div data-reveal className="reveal-fade max-w-2xl mx-auto">
          <span className={`text-[13px] tracking-[0.4em] uppercase block mb-6 font-bold ${gfsDidot.className}`} style={{ color: SE.accentBright }}>READY TO BEGIN?</span>
          <h2 className={`${greatVibes.className} mb-6`} style={{ color: SE.text, fontSize: "clamp(3rem, 6.5vw, 5rem)", lineHeight: 1.2 }}>
            Let&apos;s Design Your Story
          </h2>
          <p className={`text-sm leading-relaxed mb-10 ${gfsDidot.className}`} style={{ color: SE.textSecondary }}>
            Every extraordinary space begins with a single conversation.
            We would love to hear about your vision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+919426133932"
              className={`inline-flex items-center justify-center px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase ${gfsDidot.className}`}
              style={{ background: SE.accent, color: "white", textDecoration: "none", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#D1A08A"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = SE.accent; }}
            >
              Call +91 94261 33932
            </a>
            <a
              href="mailto:hello@studioexquis.com"
              className={`inline-flex items-center justify-center px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase ${gfsDidot.className}`}
              style={{ border: `1px solid ${SE.accent}`, color: SE.text, textDecoration: "none", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SE.accent; (e.currentTarget as HTMLElement).style.color = "white"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = SE.text; }}
            >
              Send an Email
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FOOTER
         ═══════════════════════════════════════════════════════════ */}
      <footer
        style={{
          background: SE.bgDark,
          color: "rgba(255,255,255,0.7)",
          paddingTop: "clamp(3rem, 6dvh, 5rem)",
          paddingBottom: "clamp(1.5rem, 3dvh, 2rem)",
          paddingLeft: "clamp(2rem, 8vw, 8rem)",
          paddingRight: "clamp(2rem, 8vw, 8rem)",
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" style={{ textDecoration: "none" }}>
            <BrandLogo width={120} height={35} dark={false} animated={false} />
          </Link>
          <span className={`text-[10px] tracking-[0.15em] uppercase ${gfsDidot.className}`} style={{ color: "rgba(255,255,255,0.25)" }}>
            {new Date().getFullYear()} STUDIO EXQUIS. ALL RIGHTS RESERVED.
          </span>
          <span className={`text-[10px] tracking-[0.15em] uppercase ${gfsDidot.className}`} style={{ color: "rgba(255,255,255,0.2)" }}>DESIGNED WITH OBSESSION</span>
        </div>
      </footer>

      {/* ═══ Reveal animations CSS ═══ */}
      <style jsx global>{`
        .reveal-fade {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .revealed .reveal-fade,
        .reveal-fade.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
