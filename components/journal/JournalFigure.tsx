"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import type { JournalFigureId } from "@/lib/content";

const charts = () => import("./atlas/AtlasCharts");

function placeholder(height: string) {
  function Placeholder() {
    return <div className={`${height} w-full animate-pulse rounded-md bg-muted`} />;
  }
  return Placeholder;
}

// In a Client Component so these split out of the bundle: entries without
// figures download none of the chart code or data.
const FIGURES: Record<JournalFigureId, ComponentType> = {
  "atlas-stats": dynamic(() => charts().then((m) => m.AtlasStats), {
    ssr: false,
    loading: placeholder("h-40"),
  }),
  "atlas-scorecard": dynamic(() => charts().then((m) => m.ScorecardChart), {
    ssr: false,
    loading: placeholder("h-80"),
  }),
  "atlas-scorecard-tables": dynamic(() => charts().then((m) => m.ScorecardTables), {
    ssr: false,
    loading: placeholder("h-96"),
  }),
  "atlas-outlook": dynamic(() => charts().then((m) => m.OutlookChart), {
    ssr: false,
    loading: placeholder("h-96"),
  }),
  "atlas-map": dynamic(() => import("./atlas/AtlasMap"), {
    ssr: false,
    loading: placeholder("h-[36rem]"),
  }),
  "atlas-national": dynamic(() => charts().then((m) => m.NationalChart), {
    ssr: false,
    loading: placeholder("h-96"),
  }),
  "atlas-horizon": dynamic(() => charts().then((m) => m.HorizonChart), {
    ssr: false,
    loading: placeholder("h-80"),
  }),
  "atlas-models": dynamic(() => charts().then((m) => m.ModelsChart), {
    ssr: false,
    loading: placeholder("h-72"),
  }),
  "atlas-drivers": dynamic(() => charts().then((m) => m.DriversChart), {
    ssr: false,
    loading: placeholder("h-80"),
  }),
  "atlas-contagion": dynamic(() => charts().then((m) => m.ContagionTiles), {
    ssr: false,
    loading: placeholder("h-44"),
  }),
};

export function JournalFigure({ id }: { id: JournalFigureId }) {
  const Figure = FIGURES[id];
  return <Figure />;
}
