import type { Metadata } from "next";
import { Geist, Geist_Mono, GFS_Didot, Great_Vibes } from "next/font/google";
import "./globals.css";
import GlobalBackground from "@/components/GlobalBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gfsDidot = GFS_Didot({
  variable: "--font-gfs-didot",
  subsets: ["greek"],
  weight: "400",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Studio Exquis — Luxury Editorial",
  description:
    "Studio Exquis — a luxury editorial brand built on silk, dusty rose, and timeless elegance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${gfsDidot.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-transparent relative">
        <GlobalBackground />
        {children}
      </body>
    </html>
  );
}
