import dynamic from "next/dynamic";

export const sectionComponents: Record<string, React.ComponentType<any>> = {
  "cinema-reel": dynamic(
    () => import("@/components/sections/cinema-reel/CinemaReel")
  ),
};
