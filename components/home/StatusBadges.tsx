"use client";

import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/content";

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function StatusBadges() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime(new Date()));
    const id = setInterval(() => setTime(formatTime(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-10 flex items-center justify-between pt-5 text-[11px] tracking-normal text-muted-foreground lowercase">
      <span>
        {siteConfig.location}
        {time ? ` — ${time}` : ""}
      </span>
    </div>
  );
}

export default StatusBadges;
