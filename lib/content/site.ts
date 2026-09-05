import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Tobe.",
  initials: "TE",
  role: "Product Engineer",
  tagline: "Building software people actually enjoy using.",
  description:
    "I'm Tobe, a product engineer who designs, builds, and ships thoughtful digital experiences. From frontend architecture to backend systems, I enjoy turning ambitious ideas into reliable products that feel effortless to use.",
  email: "ezimorahtobenna@gmail.com",
  location: "Lagos, Nigeria, working remotely",
  nav: [
    { label: "Work", href: "/work" },
    { label: "Manifest", href: "/manifest" },
    { label: "Playground", href: "/playground" },
    { label: "Journal", href: "/journal" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  social: [
    { label: "Email", href: "mailto:ezimorahtobenna@gmail.com" },
    { label: "GitHub", href: "https://github.com/tobe0504" },
    { label: "LinkedIn", href: "https://linkedin.com/in/tobenna-ezimorah" },
    { label: "X", href: "https://x.com/volfgng" },
  ],
  // Hosted on Google Drive. These MUST be shared as "Anyone with the link ->
  // Viewer"; on a restricted file Drive serves a Google sign-in page instead
  // of the document, so a visitor with no Google account sees a login wall
  // where the resume should be, and it fails silently from this side.
  documents: [
    {
      label: "Resume",
      description: "One page. Roles, stack, and what each one shipped.",
      href: "/resume.pdf",
    },
    {
      label: "Portfolio",
      description: "Seven pages. Case studies, personal projects, contact.",
      href: "/portfolio.pdf",
    },
  ],
};
