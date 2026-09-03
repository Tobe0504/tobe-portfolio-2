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

  // Bare text, no box: this is the live line of the hero's bottom strip (the
  // slot the reference fills with the currently-playing track), stacked under
  // a dimmer role label, so size, colour and spacing all belong to that strip
  // rather than to this component.
  return (
    <span>
      {siteConfig.location}
      {time ? ` · ${time}` : ""}
    </span>
  );
}

export default StatusBadges;
