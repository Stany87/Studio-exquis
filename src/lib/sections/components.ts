import dynamic from "next/dynamic";

export const sectionComponents: Record<string, ReturnType<typeof dynamic>> = {
  "cinema-reel": dynamic(
    () => import("@/components/sections/cinema-reel/CinemaReel")
  ),
};
