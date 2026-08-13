import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Outfit } from "next/font/google";
import { MotionConfig } from "motion/react";

import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/content";
import { Header } from "@/components/chrome/Header";
import { CookieNotice } from "@/components/chrome/CookieNotice";
import { DarkSectionProvider } from "@/components/chrome/DarkSectionProvider";
import { Footer } from "@/components/chrome/Footer";
import { GoogleTranslateWidget } from "@/components/chrome/GoogleTranslateWidget";
import { PageTransition } from "@/components/chrome/PageTransition";
import { Preloader } from "@/components/chrome/Preloader";
import { SmoothScrollProvider } from "@/components/chrome/SmoothScrollProvider";
import CustomCursor from "@/components/work-detail/CustomCursor";

// Base typeface — a geometric sans, used for both display and body text
// (see globals.css: --font-heading and --font-sans both resolve to this).
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Second display face, reserved for the lifestyle sections only (the
// pinned signature sequence) — never merged into --font-heading, which
// stays Outfit for every existing portfolio surface.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-serif",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        outfit.variable,
        instrumentSerif.variable,
      )}
    >
      <body className="min-h-full">
        <GoogleTranslateWidget />
        <Preloader />
        <MotionConfig reducedMotion="user">
          <SmoothScrollProvider>
            <DarkSectionProvider>
              <Header />
              <CustomCursor />
              <main className="relative z-10 min-h-dvh bg-inherit pt-16">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <CookieNotice />
            </DarkSectionProvider>
          </SmoothScrollProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
