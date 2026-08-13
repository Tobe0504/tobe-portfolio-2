"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HoverDimListItem {
  key: string;
}

interface HoverDimListProps<T extends HoverDimListItem> {
  items: T[];
  hoveredKey: string | null;
  onHover: (key: string | null) => void;
  interactive: boolean;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
}

/**
 * Shared dim/hover list primitive — k95.it's pattern of dimming every row
 * but the hovered one. Used by both the Work listing and the Manifest
 * page's focus list, rather than duplicating the interaction twice.
 */
export function HoverDimList<T extends HoverDimListItem>({
  items,
  hoveredKey,
  onHover,
  interactive,
  renderItem,
  className,
}: HoverDimListProps<T>) {
  return (
    <ul className={cn("divide-y divide-border border-t border-border", className)}>
      {items.map((item, index) => {
        const dimmed = interactive && hoveredKey !== null && hoveredKey !== item.key;
        return (
          <li
            key={item.key}
            onMouseEnter={() => interactive && onHover(item.key)}
            onFocus={() => interactive && onHover(item.key)}
            className={cn("transition-opacity duration-300", dimmed ? "opacity-30" : "opacity-100")}
          >
            {renderItem(item, index)}
          </li>
        );
      })}
    </ul>
  );
}

export default HoverDimList;
