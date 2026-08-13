import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/lib/content";

export function SocialLinks() {
  return (
    <div className="border-t border-border">
      {siteConfig.social.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="group flex items-center justify-between border-b border-border py-6 transition-colors hover:text-cta"
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
        >
          <span className="font-heading text-2xl lowercase md:text-3xl">
            {item.label}
          </span>
          <ArrowUpRight className="size-5 shrink-0 -translate-y-0.5 translate-x-0.5 opacity-40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 md:size-6" />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
