import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Outfit } from "next/font/google";
import { MotionConfig } from "motion/react";

import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";
import { Header } from "@/components/chrome/Header";
import { CookieNotice } from "@/components/chrome/CookieNotice";
import { DarkSectionProvider } from "@/components/chrome/DarkSectionProvider";
import { Footer } from "@/components/chrome/Footer";
import { GoogleTranslateWidget } from "@/components/chrome/GoogleTranslateWidget";
import { PageTransition } from "@/components/chrome/PageTransition";
import { StructuredData } from "@/components/chrome/StructuredData";
import { SmoothScrollProvider } from "@/components/chrome/SmoothScrollProvider";
import { CanvasCursor } from "@/components/chrome/CanvasCursor";

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

/** X handle for `twitter:creator`, derived from the profile URL already in
 * siteConfig rather than duplicated, so changing the link changes both. */
const xHandle = (() => {
  const url = siteConfig.social.find((s) => s.label === "X")?.href;
  const user = url?.split("/").filter(Boolean).pop();
  return user ? `@${user}` : undefined;
})();

export const metadata: Metadata = {
  // Required before any relative URL below resolves. Without it Next throws at
  // build time on `openGraph.images: "/..."`, and canonicals cannot be formed
  // at all. See lib/site-url.ts for how the origin is worked out.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.name} · ${siteConfig.role}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: `${siteConfig.name} Ezimorah`, url: SITE_URL }],
  creator: `${siteConfig.name} Ezimorah`,
  publisher: `${siteConfig.name} Ezimorah`,
  keywords: [
    "product engineer",
    "frontend developer",
    "full-stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "web design",
    "Lagos",
    "Nigeria",
  ],
  // Every page states its own canonical relative to metadataBase. Set here so a
  // route that forgets still resolves to itself rather than to nothing.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.role}`,
    description: siteConfig.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.role}`,
    description: siteConfig.description,
    creator: xHandle,
  },
  // `googleBot` is spelled out separately because Google honours the extra
  // preview limits only from its own directive, not the generic one.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
  category: "technology",
};

/** Drives the browser UI colour on mobile, and is separate from `metadata`
 * because Next treats the viewport as its own export. The two values match the
 * light and dark page backgrounds so the browser chrome blends into the page
 * rather than banding against it. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
  colorScheme: "light dark",
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
        <StructuredData />
        <GoogleTranslateWidget />
        <MotionConfig reducedMotion="user">
          <SmoothScrollProvider>
            <DarkSectionProvider>
              <Header />
              <CanvasCursor />
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
