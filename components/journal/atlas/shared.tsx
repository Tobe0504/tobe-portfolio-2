"use client";

import { useCallback, useState, type ReactNode } from "react";

import atlas from "@/lib/content/nigeria-atlas-data.json";

/** The month the data was published; the model saw events through `dataEnd`. */
export const AS_OF = atlas.today;

export const RISK_RAMP = [
  "#eef0e8",
  "#dde7b8",
  "#c4d98a",
  "#a2bf55",
  "#7d9e2b",
  "#5c7e14",
  "#41600f",
  "#2a440d",
];

export const fmtMonth = (m: string, style: "long" | "short" = "long") => {
  const [y, mo] = m.split("-").map(Number);
  return new Date(y, mo - 1, 1).toLocaleString("en-GB", {
    month: style,
    year: "numeric",
  });
};

export const pct = (v: number) =>
  `${v >= 0.995 ? ">99" : v < 0.005 ? "<1" : Math.round(v * 100)}%`;

/** Measured rather than scaled: a viewBox would shrink chart labels to an
 * unreadable size at phone widths. Starts at 0, and charts render once known. */
export function useChartWidth() {
  const [width, setWidth] = useState(0);
  const ref = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.round(entry.contentRect.width)),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

export function ChartTip({
  x,
  y,
  width,
  children,
}: {
  x: number;
  y: number;
  width: number;
  children: ReactNode;
}) {
  const TIP_WIDTH = 200;
  const left = x + 14 + TIP_WIDTH > width ? Math.max(0, x - TIP_WIDTH - 14) : x + 14;
  return (
    <div
      className="pointer-events-none absolute z-10 rounded-md border border-border bg-popover px-3 py-2 text-xs leading-relaxed text-popover-foreground tabular-nums shadow-md"
      style={{ left, top: y + 12, width: TIP_WIDTH }}
    >
      {children}
    </div>
  );
}

export function Pills<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
          className="min-h-9 rounded-full border border-border px-3.5 text-sm transition-colors hover:border-foreground/40 aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function LegendKey({
  items,
}: {
  items: { label: string; swatch: ReactNode }[];
}) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          {item.swatch}
          {item.label}
        </li>
      ))}
    </ul>
  );
}
