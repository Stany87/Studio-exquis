import { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About — Studio Exquis",
  description: "The story behind Studio Exquis. Luxury interior design born from obsession with craft, materials, and the spaces that shape our lives.",
};

export default function Page() {
  return <AboutPage />;
}
