"use client";

import { Pause, Play } from "lucide-react";
import { memo, useEffect, useMemo, useState, type PointerEvent } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import atlas from "@/lib/content/nigeria-atlas-data.json";
import { cn } from "@/lib/utils";

import { AS_OF, ChartTip, Pills, RISK_RAMP, fmtMonth, pct } from "./shared";

type Lisa = "HH" | "LL" | "LH" | "HL" | "NS";
type View = "month" | "y2027" | "y2026" | "history" | "hotspots";

interface Lga {
  id: number;
  n: string;
  s: string;
  ev: number;
  li: Lisa;
  p: number[];
  m: number[];
  p27: number;
  m27: number;
  o26: number;
  o26a: number;
  f26: number;
  d: string;
}

interface MapData {
  w: number;
  h: number;
  lgas: Lga[];
  states: string[];
  boxes: Record<string, [number, number, number, number]>;
}

const VIEWS: { value: View; label: string }[] = [
  { value: "month", label: "Risk by month" },
  { value: "y2027", label: "All of 2027" },
  { value: "y2026", label: "2026 so far" },
  { value: "history", label: "2010–2025 events" },
  { value: "hotspots", label: "Hotspots" },
];

const LISA: Record<Lisa, { color: string; label: string }> = {
  HH: { color: "#b5654a", label: "Hotspot" },
  LL: { color: "#3a4fa0", label: "Coldspot" },
  LH: { color: "#b98a34", label: "Low, high neighbours" },
  HL: { color: "#86427a", label: "High, low neighbours" },
  NS: { color: "#e7e7e1", label: "Not significant" },
};

const SCALES = {
  month: {
    breaks: [0.02, 0.05, 0.1, 0.2, 0.4, 0.6],
    labels: ["0", "2", "5", "10", "20", "40", "60%"],
    title: "chance of at least one fatal event",
  },
  y2027: {
    breaks: [0.1, 0.25, 0.5, 0.75, 0.9, 0.99],
    labels: ["0", "10", "25", "50", "75", "90", "99%"],
    title: "chance of at least one event in 2027",
  },
  y2026: {
    breaks: [1, 2, 5, 10, 20, 50],
    labels: ["0", "1", "2", "5", "10", "20", "50+"],
    title: "events with identified actors, jan – sep 2026",
  },
  history: {
    breaks: [1, 3, 10, 30, 100, 300, 1000],
    labels: ["0", "1", "3", "10", "30", "100", "300", "1k"],
    title: "fatal events, 2010–2025",
  },
};

const shade = (value: number, breaks: number[]) => {
  const step = breaks.findIndex((b) => value < b);
  return RISK_RAMP[step === -1 ? breaks.length : step];
};

const months = atlas.months;

/** Memoised so hovering, which only moves the outline, never re-renders 774 paths. */
const LgaPaths = memo(function LgaPaths({
  lgas,
  fills,
}: {
  lgas: Lga[];
  fills: string[];
}) {
  return lgas.map((lga, i) => (
    <path
      key={lga.id}
      data-i={i}
      d={lga.d}
      fill={fills[i]}
      stroke="var(--background)"
      strokeWidth={0.35}
      vectorEffect="non-scaling-stroke"
      className="cursor-pointer"
    />
  ));
});

function Sparkline({ lga, month }: { lga: Lga; month: number }) {
  const w = 260;
  const h = 44;
  const max = Math.max(...lga.p, 0.01);
  const x = (i: number) => 2 + (i / (lga.p.length - 1)) * (w - 4);
  const y = (v: number) => h - 3 - (v / max) * (h - 8);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 w-full" aria-hidden="true">
      <path
        d={lga.p.map((v, i) => `${i ? "L" : "M"}${x(i)} ${y(v)}`).join("")}
        fill="none"
        stroke="var(--cta)"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <circle cx={x(month)} cy={y(lga.p[month])} r={4} fill="var(--cta)" stroke="var(--card)" strokeWidth={2} />
    </svg>
  );
}

export default function AtlasMap() {
  const [data, setData] = useState<MapData | null>(null);
  const [failed, setFailed] = useState(false);
  const [view, setView] = useState<View>("month");
  const [month, setMonth] = useState(months.indexOf(AS_OF));
  const [playing, setPlaying] = useState(false);
  const [state, setState] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);
  const [boxWidth, setBoxWidth] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let alive = true;
    fetch("/data/nigeria-atlas/map.json")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((json: MapData) => alive && setData(json))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setMonth((m) => (m + 1) % months.length), 700);
    return () => clearInterval(timer);
  }, [playing]);

  const lgas = data?.lgas;

  const fills = useMemo(() => {
    if (!lgas) return [];
    return lgas.map((l) => {
      if (view === "month") return shade(l.p[month], SCALES.month.breaks);
      if (view === "y2027") return shade(l.p27, SCALES.y2027.breaks);
      if (view === "y2026") return shade(l.o26, SCALES.y2026.breaks);
      if (view === "history") return shade(l.ev, SCALES.history.breaks);
      return LISA[l.li].color;
    });
  }, [lgas, view, month]);

  const list = useMemo(() => {
    if (!lgas) return { rows: [] as Lga[], title: "", value: () => "" };
    const pool = lgas.filter(
      (l) => (!state || l.s === state) && (view !== "hotspots" || l.li === "HH"),
    );
    const sort = (key: (l: Lga) => number) =>
      [...pool].sort((a, b) => key(b) - key(a)).slice(0, state ? undefined : 12);
    const place = state || "Nigeria";
    if (view === "month")
      return {
        rows: sort((l) => l.p[month]),
        title: `Highest risk in ${place}, ${fmtMonth(months[month], "short")}`,
        value: (l: Lga) => pct(l.p[month]),
      };
    if (view === "y2027")
      return {
        rows: sort((l) => l.m27),
        title: `Most events expected in ${place}, 2027`,
        value: (l: Lga) => l.m27.toFixed(1),
      };
    if (view === "y2026")
      return {
        rows: sort((l) => l.o26),
        title: `Most recorded events in ${place}, Jan–Sep 2026`,
        value: (l: Lga) => String(l.o26),
      };
    return {
      rows: sort((l) => l.ev),
      title:
        view === "history"
          ? `Most events in ${place}, 2010–2025`
          : `Hotspot LGAs in ${place}, by events`,
      value: (l: Lga) => l.ev.toLocaleString("en-GB"),
    };
  }, [lgas, view, month, state]);

  if (failed) {
    return (
      <p className="rounded-md border border-border p-6 text-sm text-muted-foreground">
        The map couldn’t load. Reload the page to try again.
      </p>
    );
  }
  if (!data || !lgas) {
    return <div className="aspect-[6/5] w-full animate-pulse rounded-md bg-muted" />;
  }

  const stateNames = Object.keys(data.boxes).sort();
  let viewBox = `0 0 ${data.w} ${data.h}`;
  if (state) {
    const [x0, y0, x1, y1] = data.boxes[state];
    const pad = Math.max(x1 - x0, y1 - y0) * 0.08;
    viewBox = `${x0 - pad} ${y0 - pad} ${x1 - x0 + 2 * pad} ${y1 - y0 + 2 * pad}`;
  }

  const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType !== "mouse") return;
    const raw = (e.target as SVGElement).dataset?.i;
    if (raw === undefined) return setHover(null);
    const box = e.currentTarget.parentElement!.getBoundingClientRect();
    setBoxWidth(box.width);
    setHover({ i: Number(raw), x: e.clientX - box.left, y: e.clientY - box.top });
  };

  const hovered = hover ? lgas[hover.i] : null;
  const active = lgas.find((l) => l.id === selected) ?? null;
  const scale = view === "hotspots" ? null : SCALES[view];

  const changeView = (next: View) => {
    setView(next);
    setPlaying(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Pills label="Map view" options={VIEWS} value={view} onChange={changeView} />
        <label className="flex items-center gap-2 text-xs text-muted-foreground lowercase">
          State
          <select
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setSelected(null);
            }}
            className="min-h-9 rounded-md border border-border bg-background px-2 text-base text-foreground normal-case sm:text-sm"
          >
            <option value="">All of Nigeria</option>
            {stateNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {view === "month" ? (
        <div className="mt-4 flex items-center gap-3">
          {reducedMotion ? null : (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause" : "Play through the months"}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-border transition-colors hover:border-foreground/40"
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
          )}
          <input
            type="range"
            min={0}
            max={months.length - 1}
            value={month}
            aria-label="Forecast month"
            aria-valuetext={fmtMonth(months[month])}
            onChange={(e) => {
              setPlaying(false);
              setMonth(Number(e.target.value));
            }}
            className="h-9 min-w-0 flex-1 accent-cta"
          />
          <span className="w-32 shrink-0 text-right text-sm tabular-nums">
            {fmtMonth(months[month], "short")}
            {months[month] === AS_OF ? (
              <span className="text-muted-foreground"> · now</span>
            ) : null}
          </span>
        </div>
      ) : null}

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div>
          <div className="relative">
            <svg
              viewBox={viewBox}
              role="img"
              aria-label={`Map of ${state || "Nigeria"} by local government area. The list beside it ranks the same values.`}
              className="block w-full touch-pan-y"
              onPointerMove={onPointerMove}
              onPointerLeave={() => setHover(null)}
              onClick={(e) => {
                const raw = (e.target as SVGElement).dataset?.i;
                setSelected(raw === undefined ? null : lgas[Number(raw)].id);
              }}
            >
              <g>
                <LgaPaths lgas={lgas} fills={fills} />
              </g>
              <g fill="none" pointerEvents="none" stroke="var(--foreground)" strokeOpacity={0.35}>
                {data.states.map((d, i) => (
                  <path key={i} d={d} strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
                ))}
              </g>
              <g fill="none" pointerEvents="none">
                {active ? (
                  <path d={active.d} stroke="var(--foreground)" strokeWidth={2.25} vectorEffect="non-scaling-stroke" />
                ) : null}
                {hovered ? (
                  <path d={hovered.d} stroke="var(--foreground)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                ) : null}
              </g>
            </svg>
            {hovered && hover ? (
              <ChartTip x={hover.x} y={hover.y} width={boxWidth}>
                <span className="font-medium">{hovered.n}</span>, {hovered.s}
                <br />
                {view === "month" ? `${pct(hovered.p[month])} chance` : null}
                {view === "y2027" ? `${hovered.m27.toFixed(1)} expected events in 2027` : null}
                {view === "y2026" ? `${hovered.o26} recorded, ${hovered.o26a} incl. unconfirmed` : null}
                {view === "history" ? `${hovered.ev.toLocaleString("en-GB")} events` : null}
                {view === "hotspots" ? LISA[hovered.li].label : null}
              </ChartTip>
            ) : null}
          </div>

          <div className="mt-4">
            {scale ? (
              <div className="max-w-sm">
                <p className="text-xs text-muted-foreground lowercase">{scale.title}</p>
                <div className="mt-1.5 flex gap-px">
                  {scale.labels.map((label, i) => (
                    <div key={label} className="flex-1">
                      <div className="h-2.5" style={{ background: RISK_RAMP[i] }} />
                      <span className="text-[11px] text-muted-foreground tabular-nums">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {(Object.keys(LISA) as Lisa[]).map((key) => (
                  <li key={key} className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-xs" style={{ background: LISA[key].color }} />
                    {LISA[key].label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-md border border-border bg-card p-4">
            {active ? (
              <>
                <p className="font-heading text-lg leading-tight">{active.n}</p>
                <p className="text-sm text-muted-foreground">{active.s}</p>
                <dl className="mt-3 grid grid-cols-[1fr_auto] gap-y-1 text-sm tabular-nums">
                  <dt className="text-muted-foreground">{fmtMonth(months[month], "short")} risk</dt>
                  <dd>{pct(active.p[month])}</dd>
                  <dt className="text-muted-foreground">All of 2027</dt>
                  <dd>{pct(active.p27)}</dd>
                  <dt className="text-muted-foreground">Recorded, Jan–Sep 2026</dt>
                  <dd>{active.o26}</dd>
                  <dt className="text-muted-foreground">Incl. unconfirmed</dt>
                  <dd>{active.o26a}</dd>
                  <dt className="text-muted-foreground">Events, 2010–2025</dt>
                  <dd>{active.ev.toLocaleString("en-GB")}</dd>
                </dl>
                <Sparkline lga={active} month={month} />
                <p className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                  <span>Oct 2026</span>
                  <span>Dec 2027</span>
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Pick a local government on the map or in the list to see its outlook through 2027.
              </p>
            )}
          </div>

          <div>
            <h3 className="text-xs text-muted-foreground lowercase">{list.title}</h3>
            {list.rows.length ? (
              <ol
                data-lenis-prevent
                className={cn("mt-2 divide-y divide-border", state && "max-h-96 overflow-y-auto pr-2")}
              >
                {list.rows.map((lga) => (
                  <li key={lga.id}>
                    <button
                      type="button"
                      aria-pressed={lga.id === selected}
                      onClick={() => setSelected(lga.id)}
                      className="flex min-h-10 w-full items-center justify-between gap-3 py-1.5 text-left text-sm transition-colors hover:text-cta aria-pressed:text-cta"
                    >
                      <span>
                        {lga.n}
                        {state ? null : <span className="text-muted-foreground"> {lga.s}</span>}
                      </span>
                      <span className="tabular-nums">{list.value(lga)}</span>
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                No statistically significant hotspots in {state}.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
