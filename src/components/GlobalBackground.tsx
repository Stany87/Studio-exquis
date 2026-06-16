"use client";

import { useEffect, useRef } from "react";

export default function GlobalBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.5;

      const handlePlay = () => {
        video.playbackRate = 0.5;
      };

      video.addEventListener("play", handlePlay);

      // Force play if autoplay gets blocked or delayed
      video.play().catch((err) => {
        console.warn("Autoplay failed or blocked:", err);
      });

      return () => {
        video.removeEventListener("play", handlePlay);
      };
    }
  }, []);

  return (
    <div
      className="pointer-events-none select-none"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        background: "#FAF8F6", // Fallback luxury cream color
      }}
    >
      <video
        ref={videoRef}
        src="/Liquid_silk_flowing_light_pink_202606170231.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{
          opacity: 0.25,
          mixBlendMode: "normal",
        }}
      />
      {/* Light editorial ambient overlay to soften high-contrast spots if any */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(250,248,246,0.1) 0%, rgba(250,248,246,0.05) 100%)",
        }}
      />
    </div>
  );
}
