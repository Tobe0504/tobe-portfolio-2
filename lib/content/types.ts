export type CoverAccent = 1 | 2 | 3 | 4 | 5;

export interface CoverArtSpec {
  /** Deterministic seed for the generated art. Falls back to the parent record's slug. */
  seed?: string;
  /** Which --cover-N token drives the palette. Still used as the loading-state color even when `image` is set. */
  accent: CoverAccent;
  /** A real screenshot, when one exists — takes over from the generated art entirely. Path is relative to /public. */
  image?: { src: string; alt: string };
}

export type GalleryAspect = "portrait" | "landscape" | "square" | "wide";

export interface GalleryPiece {
  cover: CoverArtSpec;
  aspect: GalleryAspect;
  caption?: string;
}

export interface ProjectFeature {
  name: string;
  description: string;
}

export interface ProjectAchievement {
  name: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  year: number;
  category: string;
  tags?: string[];
  client: string;
  role: string[];
  /** e.g. "3 months" — how long the engagement ran. */
  timeline?: string;
  /** Live URL, when the project is publicly reachable. Kept even for
   * offline projects (see `live`) as a historical reference — just not
   * rendered as a clickable link, since the domain may since be dead,
   * parked, or repurposed. */
  url?: string;
  /** False when the site is no longer publicly reachable — the work still
   * shows in full (images, case study, everything), but the UI says so
   * instead of linking out to a dead URL. Defaults to true (live) when
   * omitted, so this only needs to be set on the exceptions. */
  live?: boolean;
  summary: string;
  body: string[];
  /** What made the project hard, stated plainly — not spun into a "solution" narrative. */
  challenges?: string[];
  features?: ProjectFeature[];
  achievements?: ProjectAchievement[];
  cover: CoverArtSpec;
  gallery: GalleryPiece[];
  featured?: boolean;
  order?: number;
}

export type JournalBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  | {
      type: "figure";
      figure: JournalFigureId;
      caption?: string;
      /** Breaks out of the reading column for figures that need the room. */
      wide?: boolean;
    };

/** Interactive pieces a journal entry can embed. */
export type JournalFigureId =
  | "atlas-stats"
  | "atlas-scorecard"
  | "atlas-scorecard-tables"
  | "atlas-outlook"
  | "atlas-map"
  | "atlas-national"
  | "atlas-horizon"
  | "atlas-models"
  | "atlas-drivers"
  | "atlas-contagion";

export interface JournalPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: JournalBlock[];
  /** Drives the /journal grid — every post needs one now that the listing
   * is image-led rather than a plain text index. */
  coverImage: { src: string; alt: string };
  tags?: string[];
  readingTime?: number;
}

export type PersonalProjectStatus = "in progress" | "shipped" | "paused";

export interface PersonalProject {
  slug: string;
  title: string;
  status: PersonalProjectStatus;
  summary: string;
  tags?: string[];
  /** External live product, when there is one — shown as "Visit site" on the detail page. Every project gets an internal /playground/[slug] page regardless. */
  liveUrl?: string;
  /** e.g. "6 weeks, solo" — how long it took and who was involved. */
  timeline?: string;
  cover: CoverArtSpec;
  /** What led to building it — the real gap or friction, stated plainly. */
  problem?: string[];
  /** How it actually got built — the concrete decisions, not a highlight reel. */
  approach?: string[];
  gallery?: GalleryPiece[];
}

export type GallerySpan = "s" | "m" | "l";

export interface GalleryItem {
  id: string;
  accent: CoverAccent;
  span: GallerySpan;
  image?: { src: string; alt: string };
  /** Pulled into the Home page's Moodboard section — a small curated glimpse, distinct from the full /gallery archive. */
  featured?: boolean;
  /** Shown in the lightbox when set; omitted entirely otherwise. */
  caption?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

/** A downloadable document offered to visitors (resume, portfolio PDF). */
export interface SiteDocument {
  label: string;
  /** One line saying what it is, shown beside the link on /contact. */
  description: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  nav: NavItem[];
  social: SocialLink[];
  documents: SiteDocument[];
}
