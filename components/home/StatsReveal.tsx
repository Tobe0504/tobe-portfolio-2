"use client";

import { ScrollArrest } from "@/components/shared/ScrollArrest";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { SiteStats } from "@/lib/content";
import { cn } from "@/lib/utils";

interface StatsRevealProps {
  stats: SiteStats;
}

function buildItems(stats: SiteStats) {
  return [
    { value: stats.projectCount, label: "projects shipped" },
    { value: stats.clientCount, label: "clients & collaborators" },
    { value: stats.yearsActive, label: "years shipping code" },
  ];
}

/**
 * A second, structurally different arrest moment (count-up numbers, not
 * text crossfade) — real counts computed from the project data, not
 * decorative round numbers.
 */
export function StatsReveal({ stats }: StatsRevealProps) {
  const reducedMotion = useReducedMotion();
  const items = buildItems(stats);

  return (
    <ScrollArrest
      duration={1.3}
      className={cn(
        "relative z-51 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-(--scroll-fg)",
        // ScrollTheme drives the body background AND --scroll-fg text color
        // continuously as the page approaches/leaves this pin, so this
        // stays transparent and lets it show through — one continuous
        // darkening, not a hard cut to a second, unrelated black. Reduced-
        // motion users get no ScrollTheme (it's a scroll-scrub effect), so
        // they need their own opaque dark background here — ScrollTheme
        // forces --scroll-fg light for them to match.
        reducedMotion && "bg-foreground",
      )}
      coverHeader
      animate={({ timeline, root }) => {
        const numbers = Array.from(
          root.querySelectorAll<HTMLElement>("[data-stat-value]"),
        );
        numbers.forEach((el, i) => {
          const target = items[i]?.value ?? 0;
          const counter = { v: 0 };
          timeline.to(
            counter,
            {
              v: target,
              duration: 1,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(counter.v));
              },
            },
            0.1,
          );
        });
      }}
    >
      <p className="text-xs tracking-normal opacity-50 lowercase">
        By the numbers
      </p>

      <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-16">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-heading text-6xl text-lemon md:text-7xl">
              {reducedMotion ? item.value : <span data-stat-value>0</span>}
            </p>
            <p className="mt-3 text-xs tracking-normal opacity-60 lowercase">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </ScrollArrest>
  );
}

export default StatsReveal;
