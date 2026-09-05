import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/lib/content";

/**
 * The resume and portfolio PDF, offered as their own block rather than folded
 * into the social row.
 *
 * These are the two things a recruiter or a prospective client comes looking
 * for, and until now the only way to get either was to email and ask. The
 * social links are for finding out more about someone; these are for deciding
 * about them, which is a different job and deserves its own weight on the page.
 *
 * Both open in a new tab: they are hosted on Drive, so a same-tab navigation
 * drops the visitor out of the site entirely and onto a Google viewer, with
 * only the back button to return.
 */
export function DocumentLinks() {
  if (!siteConfig.documents.length) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {siteConfig.documents.map((doc) => (
        <a
          key={doc.href}
          href={doc.href}
          target="_blank"
          rel="noreferrer"
          data-cursor-label={`Open ${doc.label.toLowerCase()}`}
          className="group flex min-h-11 items-start justify-between gap-6 border-t border-border pt-5 transition-colors hover:border-cta"
        >
          <span className="flex flex-col gap-1">
            <span className="font-heading text-2xl tracking-tight transition-colors group-hover:text-cta md:text-3xl">
              {doc.label}
            </span>
            <span className="text-sm text-muted-foreground">
              {doc.description}
            </span>
          </span>
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cta" />
        </a>
      ))}
    </div>
  );
}

export default DocumentLinks;
