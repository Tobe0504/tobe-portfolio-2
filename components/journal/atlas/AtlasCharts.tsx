"use client";

import { useState, type PointerEvent } from "react";

import atlas from "@/lib/content/nigeria-atlas-data.json";

import { AS_OF, ChartTip, LegendKey, fmtMonth, useChartWidth } from "./shared";

const monthIndex = (m: string) => {
  const [y, mo] = m.split("-").map(Number);
  return (y - 2010) * 12 + mo - 1;
};
const line = (points: [number, number][]) =>
  points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");

const axisText = "fill-muted-foreground text-[11px] tabular-nums";
/** Keeps labels legible where they cross a grid line. */
const labelHalo = {
  stroke: "var(--background)",
  strokeWidth: 4,
  paintOrder: "stroke",
  strokeLinejoin: "round",
} as const;
const lineSwatch = (color: string, dashed = false) => (
  <span
    className="inline-block w-4 border-t-2"
    style={{ borderColor: color, borderTopStyle: dashed ? "dashed" : "solid" }}
  />
);
const areaSwatch = (opacity: number) => (
  <span className="inline-block h-2.5 w-4 rounded-xs bg-cta" style={{ opacity }} />
);

type Pointer = { x: number; y: number };
const pointerIn = (e: PointerEvent<SVGElement>): Pointer => {
  const box = e.currentTarget.getBoundingClientRect();
  return { x: e.clientX - box.left, y: e.clientY - box.top };
};

/* ─── Stats ──────────────────────────────────────────────────────────── */

export function AtlasStats() {
  const i = atlas.nat.month.indexOf(AS_OF);
  const { score } = atlas;
  const stats = [
    [
      String(Math.round(atlas.nat.central[i])),
      `fatal incidents expected across Nigeria in ${fmtMonth(AS_OF)} (80% range ${Math.round(atlas.nat.lo_10[i])}–${Math.round(atlas.nat.hi_90[i])})`,
    ],
    [
      score.obs.toLocaleString("en-GB"),
      `incidents recorded January–September 2026, against ${score.fc} forecast`,
    ],
    [
      `${Math.round(score.top10 * 100)}%`,
      `of them fell in the 10% of LGAs the forecast flagged, up from ${Math.round(score.top10_old * 100)}% for the first model`,
    ],
    ["57%", "of 2026’s incidents have unknown attackers, which UCDP’s final data leaves out"],
  ];
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-border py-8 md:grid-cols-4">
      {stats.map(([value, label]) => (
        <div key={label} className="flex flex-col-reverse justify-end gap-2">
          <dt className="text-sm leading-snug text-muted-foreground">{label}</dt>
          <dd className="font-heading text-4xl font-light tabular-nums">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ─── 2026 scorecard ────────────────────────────────────────────────── */

export function ScorecardChart() {
  const [ref, w] = useChartWidth();
  const [tip, setTip] = useState<(Pointer & { i: number }) | null>(null);
  const h = 300;
  const m = { l: 34, r: 12, t: 12, b: 28 };
  const sc = atlas.score_monthly;
  const last = sc.month.length - 1;
  const top = 175;
  const x = (i: number) => m.l + (i / last) * (w - m.l - m.r);
  const y = (v: number) => h - m.b - (v / top) * (h - m.t - m.b);
  const band = `${line(sc.hi_90.map((v, i) => [x(i), y(v)]))}${[...sc.lo_10]
    .map((v, i) => [x(i), y(v)] as const)
    .reverse()
    .map(([px, py]) => `L${px.toFixed(1)} ${py.toFixed(1)}`)
    .join("")}Z`;

  return (
    <div>
      <LegendKey
        items={[
          { label: "Forecast from Dec 2025", swatch: lineSwatch("var(--cta)") },
          { label: "80% range", swatch: areaSwatch(0.28) },
          { label: "Recorded", swatch: lineSwatch("var(--foreground)") },
          { label: "First model, without unknown gunmen", swatch: lineSwatch("var(--muted-foreground)", true) },
        ]}
      />
      <div ref={ref} className="relative mt-4" style={{ height: h }}>
        {w > 0 ? (
          <svg
            width={w}
            height={h}
            role="img"
            aria-label="January to September 2026: the forecast expected incidents to ease, but they rose from April, landing inside its 80% range in 4 of 9 months. The first model, without unknown gunmen, sat far below."
            className="block touch-pan-y"
            onPointerMove={(e) => {
              const p = pointerIn(e);
              const raw = Math.round(((p.x - m.l) / (w - m.l - m.r)) * last);
              setTip({ ...p, i: Math.max(0, Math.min(last, raw)) });
            }}
            onPointerLeave={() => setTip(null)}
          >
            {[0, 50, 100, 150].map((t) => (
              <g key={t}>
                <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke="var(--border)" />
                <text x={m.l - 8} y={y(t) + 4} textAnchor="end" className={axisText}>
                  {t}
                </text>
              </g>
            ))}
            {sc.month.map((month, i) =>
              w < 480 && i % 2 ? null : (
                <text key={month} x={x(i)} y={h - 8} textAnchor={i === 0 ? "start" : i === last ? "end" : "middle"} className={axisText}>
                  {fmtMonth(month, "short").slice(0, 3)}
                </text>
              ),
            )}
            <path d={band} fill="var(--cta)" fillOpacity={0.24} />
            <path d={line(sc.old.map((v, i) => [x(i), y(v)]))} fill="none" stroke="var(--muted-foreground)" strokeDasharray="4 3" strokeWidth={1.5} />
            <path d={line(sc.central.map((v, i) => [x(i), y(v)]))} fill="none" stroke="var(--cta)" strokeWidth={2} />
            <path d={line(sc.obs.map((v, i) => [x(i), y(v)]))} fill="none" stroke="var(--foreground)" strokeWidth={2} />
            {tip ? (
              <g pointerEvents="none">
                <line x1={x(tip.i)} x2={x(tip.i)} y1={m.t} y2={h - m.b} stroke="var(--foreground)" strokeOpacity={0.35} />
                <circle cx={x(tip.i)} cy={y(sc.obs[tip.i])} r={4.5} fill="var(--background)" stroke="var(--foreground)" strokeWidth={2} />
              </g>
            ) : null}
          </svg>
        ) : null}
        {tip ? (
          <ChartTip x={tip.x} y={tip.y} width={w}>
            <span className="font-medium">{fmtMonth(sc.month[tip.i])}</span>
            <br />
            Forecast {Math.round(sc.central[tip.i])} ({Math.round(sc.lo_10[tip.i])}–{Math.round(sc.hi_90[tip.i])})
            <br />
            Recorded {sc.obs[tip.i]}
            <br />
            First model {Math.round(sc.old[tip.i])}
          </ChartTip>
        ) : null}
      </div>
    </div>
  );
}

export function ScorecardTables() {
  const th = "pb-2 text-left text-xs font-normal text-muted-foreground lowercase";
  const num = "py-1.5 text-right tabular-nums";
  const states = atlas.score_states;
  const tables = [
    {
      caption: "By state, January–September 2026",
      headers: ["State", "Forecast", "Recorded", "First model"],
      rows: states.state.map((name, i) => [
        name,
        states.fc[i].toFixed(0),
        String(states.obs[i]),
        states.fc_old[i].toFixed(0),
      ]),
    },
    {
      caption: "What the forecast missed most",
      headers: ["LGA", "Forecast", "Recorded"],
      rows: atlas.surprises.map((s) => [`${s.lga}, ${s.state}`, s.fc.toFixed(1), String(s.obs)]),
    },
  ];
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {tables.map((table) => (
        <table key={table.caption} className="w-full self-start text-sm">
          <caption className="pb-3 text-left font-heading text-lg">{table.caption}</caption>
          <thead>
            <tr className="border-b border-border">
              {table.headers.map((header, i) => (
                <th key={header} scope="col" className={i ? `${th} pl-3 text-right` : th}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {table.rows.map(([name, ...values]) => (
              <tr key={name}>
                <th scope="row" className="py-1.5 pr-2 text-left font-normal">{name}</th>
                {values.map((value, i) => (
                  <td key={i} className={i === 2 ? `${num} text-muted-foreground` : num}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}

/* ─── Yearly outlook ────────────────────────────────────────────────── */

export function OutlookChart() {
  const [ref, w] = useChartWidth();
  const [tip, setTip] = useState<(Pointer & { key: number }) | null>(null);
  const h = 320;
  const m = { l: 44, r: 8, t: 12, b: 28 };
  const { outlook, q4 } = atlas;
  const recorded = Object.entries(atlas.years).map(([year, total]) => ({ year: Number(year), total }));
  const allYears = [...recorded.map((r) => r.year), ...outlook.year];
  const top = Math.ceil(Math.max(...outlook.hi80) / 500) * 500;
  const ticks = Array.from({ length: top / 500 + 1 }, (_, i) => i * 500);
  const slot = (w - m.l - m.r) / allYears.length;
  const bar = Math.min(slot - 4, 40);
  const cx = (year: number) => m.l + slot * (allYears.indexOf(year) + 0.5);
  const y = (v: number) => h - m.b - (Math.min(v, top) / top) * (h - m.t - m.b);
  const column = (year: number, lo: number, hi: number, fill: string, opacity = 1) => (
    <rect x={cx(year) - bar / 2} y={y(hi)} width={bar} height={Math.max(0, y(lo) - y(hi) - 1)} rx={Math.min(3, bar / 3)} fill={fill} fillOpacity={opacity} />
  );
  const hoverYear = tip ? allYears[tip.key] : null;
  const fIdx = hoverYear ? outlook.year.indexOf(hoverYear) : -1;
  const rec = recorded.find((r) => r.year === hoverYear);

  return (
    <div>
      <LegendKey
        items={[
          { label: "Recorded", swatch: <span className="inline-block size-2.5 rounded-xs bg-muted-foreground" /> },
          { label: "Forecast", swatch: <span className="inline-block size-2.5 rounded-xs bg-cta" /> },
          { label: "80% range", swatch: lineSwatch("var(--foreground)") },
        ]}
      />
      <div ref={ref} className="relative mt-4" style={{ height: h }}>
        {w > 0 ? (
          <svg
            width={w}
            height={h}
            role="img"
            aria-label="Yearly fatal incidents including unknown gunmen from 2020: about 1,700 expected in 2026, 1,650 in 2027, then about 1,200 a year to 2030, with wide ranges."
            className="block touch-pan-y"
            onPointerMove={(e) => {
              const p = pointerIn(e);
              setTip({ ...p, key: Math.max(0, Math.min(allYears.length - 1, Math.floor((p.x - m.l) / slot))) });
            }}
            onPointerLeave={() => setTip(null)}
          >
            {ticks.map((t) => (
              <g key={t}>
                <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke="var(--border)" />
                <text x={m.l - 8} y={y(t) + 4} textAnchor="end" className={axisText}>
                  {t.toLocaleString("en-GB")}
                </text>
              </g>
            ))}
            {allYears.map((year, i) =>
              w < 420 && i % 2 ? null : (
                <text key={year} x={cx(year)} y={h - 8} textAnchor="middle" className={axisText}>
                  {year}
                </text>
              ),
            )}
            {recorded.map((r) => (
              <g key={r.year}>{column(r.year, 0, r.total, "var(--muted-foreground)")}</g>
            ))}
            {column(2026, atlas.years["2026"], atlas.years["2026"] + q4, "var(--cta)", 0.55)}
            {outlook.year.map((year, i) => (
              <g key={year}>
                {column(year, 0, outlook.central[i], "var(--cta)")}
                <line x1={cx(year)} x2={cx(year)} y1={y(outlook.lo80[i])} y2={y(outlook.hi80[i])} stroke="var(--foreground)" strokeWidth={3} strokeLinecap="round" />
              </g>
            ))}
          </svg>
        ) : null}
        {tip && hoverYear ? (
          <ChartTip x={tip.x} y={tip.y} width={w}>
            <span className="font-medium">{hoverYear}</span>
            <br />
            {hoverYear === 2026 ? (
              <>
                {rec?.total.toLocaleString("en-GB")} recorded through September
                <br />+{q4} forecast for Oct–Dec
              </>
            ) : rec ? (
              `${rec.total.toLocaleString("en-GB")} recorded incidents`
            ) : null}
            {fIdx >= 0 ? (
              <>
                {Math.round(outlook.central[fIdx]).toLocaleString("en-GB")} forecast incidents
                <br />
                80% range {Math.round(outlook.lo80[fIdx]).toLocaleString("en-GB")}–{Math.round(outlook.hi80[fIdx]).toLocaleString("en-GB")}
                <br />
                95% range {Math.round(outlook.lo95[fIdx]).toLocaleString("en-GB")}–{Math.round(outlook.hi95[fIdx]).toLocaleString("en-GB")}
              </>
            ) : null}
          </ChartTip>
        ) : null}
      </div>
    </div>
  );
}

/* ─── National history and forecast ─────────────────────────────────── */

export function NationalChart() {
  const [ref, w] = useChartWidth();
  const [tip, setTip] = useState<(Pointer & { key: number }) | null>(null);

  const h = 340;
  const m = { l: 34, r: 8, t: 26, b: 28 };
  const first = monthIndex(atlas.hist.month[0]);
  const last = monthIndex("2027-12");
  const x = (i: number) => m.l + ((i - first) / (last - first)) * (w - m.l - m.r);

  const hist = atlas.hist.month.map((month, i) => ({ i: monthIndex(month), month, y: atlas.hist.y[i] }));
  const nat = atlas.nat;
  const forecast = nat.month.map((month, i) => ({
    i: monthIndex(month),
    month,
    c: nat.central[i],
    lo10: nat.lo_10[i],
    hi90: nat.hi_90[i],
    lo025: nat.lo_025[i],
    hi975: nat.hi_975[i],
  }));
  const end = hist[hist.length - 1];
  const anchor = { i: end.i, month: end.month, c: end.y, lo10: end.y, hi90: end.y, lo025: end.y, hi975: end.y };
  const joined = [anchor, ...forecast];

  const top = Math.ceil(Math.max(...hist.map((d) => d.y), ...nat.hi_975) / 50) * 50;
  const y = (v: number) => h - m.b - (v / top) * (h - m.t - m.b);
  const yTicks = Array.from({ length: top / 50 + 1 }, (_, i) => i * 50);

  const firstYear = Number(atlas.hist.month[0].slice(0, 4));
  const years = Array.from({ length: 2027 - firstYear + 1 }, (_, i) => firstYear + i).filter(
    (year) => w >= 480 || (year - firstYear) % 2 === 0,
  );

  const band = (lo: "lo10" | "lo025", hi: "hi90" | "hi975") =>
    `${line(joined.map((d) => [x(d.i), y(d[hi])]))}${joined
      .slice()
      .reverse()
      .map((d) => `L${x(d.i).toFixed(1)} ${y(d[lo]).toFixed(1)}`)
      .join("")}Z`;

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const p = pointerIn(e);
    const raw = first + ((p.x - m.l) / (w - m.l - m.r)) * (last - first);
    setTip({ ...p, key: Math.max(first, Math.min(last, Math.round(raw))) });
  };
  const hoveredHist = tip ? hist.find((d) => d.i === tip.key) : undefined;
  const hoveredFc = tip ? forecast.find((d) => d.i === tip.key) : undefined;

  const marks = [
    { i: end.i, label: "data ends", anchor: "end" as const, dx: -5 },
    { i: monthIndex(AS_OF), label: "now", anchor: "start" as const, dx: 5 },
  ];

  return (
    <div>
      <LegendKey
        items={[
          { label: "Recorded", swatch: lineSwatch("var(--muted-foreground)") },
          { label: "Forecast", swatch: lineSwatch("var(--cta)") },
          { label: "80% range", swatch: areaSwatch(0.32) },
          { label: "95% range", swatch: areaSwatch(0.14) },
        ]}
      />
      <div ref={ref} className="relative mt-4" style={{ height: h }}>
        {w > 0 ? (
          <svg
            width={w}
            height={h}
            role="img"
            aria-label="Monthly fatal incidents in Nigeria including unknown gunmen, recorded from 2020 through September 2026 and forecast through December 2027 with 80% and 95% ranges."
            className="block touch-pan-y"
            onPointerMove={onMove}
            onPointerLeave={() => setTip(null)}
          >
            {yTicks.map((t) => (
              <g key={t}>
                <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke="var(--border)" />
                <text x={m.l - 8} y={y(t) + 4} textAnchor="end" className={axisText}>
                  {t}
                </text>
              </g>
            ))}
            {years.map((year) => (
              <text key={year} x={x(monthIndex(`${year}-01`))} y={h - 8} textAnchor="start" className={axisText}>
                {year}
              </text>
            ))}
            <path d={band("lo025", "hi975")} fill="var(--cta)" fillOpacity={0.14} />
            <path d={band("lo10", "hi90")} fill="var(--cta)" fillOpacity={0.24} />
            <path
              d={line(hist.map((d) => [x(d.i), y(d.y)]))}
              fill="none"
              stroke="var(--muted-foreground)"
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
            <path
              d={line(joined.map((d) => [x(d.i), y(d.c)]))}
              fill="none"
              stroke="var(--cta)"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {marks.map((mark) => (
              <g key={mark.label}>
                <line x1={x(mark.i)} x2={x(mark.i)} y1={m.t - 12} y2={h - m.b} stroke="var(--muted-foreground)" strokeDasharray="3 3" />
                <text x={x(mark.i) + mark.dx} y={m.t - 4} textAnchor={mark.anchor} className={axisText}>
                  {mark.label}
                </text>
              </g>
            ))}
            {tip ? (
              <g pointerEvents="none">
                <line x1={x(tip.key)} x2={x(tip.key)} y1={m.t} y2={h - m.b} stroke="var(--foreground)" strokeOpacity={0.35} />
                <circle
                  cx={x(tip.key)}
                  cy={y(hoveredHist ? hoveredHist.y : (hoveredFc?.c ?? 0))}
                  r={4.5}
                  fill="var(--background)"
                  stroke={hoveredHist ? "var(--muted-foreground)" : "var(--cta)"}
                  strokeWidth={2}
                />
              </g>
            ) : null}
          </svg>
        ) : null}
        {tip && hoveredHist ? (
          <ChartTip x={tip.x} y={tip.y} width={w}>
            <span className="font-medium">{fmtMonth(hoveredHist.month)}</span>
            <br />
            {hoveredHist.y} recorded incidents
          </ChartTip>
        ) : null}
        {tip && hoveredFc ? (
          <ChartTip x={tip.x} y={tip.y} width={w}>
            <span className="font-medium">{fmtMonth(hoveredFc.month)}</span>
            <br />
            {Math.round(hoveredFc.c)} forecast incidents
            <br />
            80% range {Math.round(hoveredFc.lo10)}–{Math.round(hoveredFc.hi90)}
          </ChartTip>
        ) : null}
      </div>
    </div>
  );
}

/* ─── Skill by lead time ────────────────────────────────────────────── */

export function HorizonChart() {
  const [ref, w] = useChartWidth();
  const [tip, setTip] = useState<(Pointer & { i: number }) | null>(null);
  const h = 300;
  const m = { l: 34, r: 12, t: 12, b: 42 };
  const x = (lead: number) => m.l + ((lead - 1) / 23) * (w - m.l - m.r);
  const y = (v: number) => h - m.b - (v / 0.45) * (h - m.t - m.b);
  const hz = atlas.hz;
  const series = (values: number[]) => line(hz.h.map((lead, i) => [x(lead), y(values[i])]));

  return (
    <div>
      <LegendKey
        items={[
          { label: "Model", swatch: lineSwatch("var(--cta)") },
          { label: "Carrying last year’s average forward", swatch: lineSwatch("var(--muted-foreground)") },
          { label: "No skill", swatch: lineSwatch("var(--muted-foreground)", true) },
        ]}
      />
      <div ref={ref} className="relative mt-4" style={{ height: h }}>
        {w > 0 ? (
          <svg
            width={w}
            height={h}
            role="img"
            aria-label="Forecast skill, measured as PR-AUC, from 1 to 24 months ahead. The model stays well above no skill and slowly converges with last year's average."
            className="block touch-pan-y"
            onPointerMove={(e) => {
              const p = pointerIn(e);
              const lead = Math.round(1 + ((p.x - m.l) / (w - m.l - m.r)) * 23);
              setTip({ ...p, i: Math.max(0, Math.min(23, lead - 1)) });
            }}
            onPointerLeave={() => setTip(null)}
          >
            {[0, 0.1, 0.2, 0.3, 0.4].map((t) => (
              <g key={t}>
                <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke="var(--border)" />
                <text x={m.l - 8} y={y(t) + 4} textAnchor="end" className={axisText}>
                  {t.toFixed(1)}
                </text>
              </g>
            ))}
            {[1, 6, 12, 18, 24].map((t) => (
              <text key={t} x={x(t)} y={h - 24} textAnchor="middle" className={axisText}>
                {t}
              </text>
            ))}
            <text x={w - m.r} y={h - 6} textAnchor="end" className={axisText}>
              months ahead
            </text>
            <path d={series(hz.base_rate)} fill="none" stroke="var(--muted-foreground)" strokeDasharray="4 3" strokeWidth={1.5} />
            <path d={series(hz.pr_auc_avg12)} fill="none" stroke="var(--muted-foreground)" strokeWidth={1.5} />
            <path d={series(hz.pr_auc)} fill="none" stroke="var(--cta)" strokeWidth={2} />
            {tip ? (
              <g pointerEvents="none">
                <line x1={x(hz.h[tip.i])} x2={x(hz.h[tip.i])} y1={m.t} y2={h - m.b} stroke="var(--foreground)" strokeOpacity={0.35} />
                <circle cx={x(hz.h[tip.i])} cy={y(hz.pr_auc[tip.i])} r={4.5} fill="var(--background)" stroke="var(--cta)" strokeWidth={2} />
              </g>
            ) : null}
          </svg>
        ) : null}
        {tip ? (
          <ChartTip x={tip.x} y={tip.y} width={w}>
            <span className="font-medium">
              {hz.h[tip.i]} month{hz.h[tip.i] > 1 ? "s" : ""} ahead
            </span>
            <br />
            Model {hz.pr_auc[tip.i].toFixed(3)}
            <br />
            Last year’s average {hz.pr_auc_avg12[tip.i].toFixed(3)}
            <br />
            Top 5% hold {Math.round(hz.capture[tip.i] * 100)}% of events
          </ChartTip>
        ) : null}
      </div>
    </div>
  );
}

/* ─── Dot-and-whisker rows ──────────────────────────────────────────── */

interface DotRow {
  label: string;
  v: number;
  lo: number;
  hi: number;
  strong: boolean;
  note: string;
}

function DotRows({
  rows,
  ticks,
  scale,
  formatTick,
  formatValue,
  reference,
  ariaLabel,
}: {
  rows: DotRow[];
  ticks: number[];
  /** Maps a value to 0–1 along the axis. */
  scale: (v: number) => number;
  formatTick: (v: number) => string;
  formatValue: (v: number) => string;
  reference: number;
  ariaLabel: string;
}) {
  const [ref, w] = useChartWidth();
  const [tip, setTip] = useState<(Pointer & { row: DotRow }) | null>(null);
  const stacked = w < 540;
  const rowH = stacked ? 52 : 36;
  const left = stacked ? 8 : 236;
  const right = 52;
  const h = 8 + rows.length * rowH + 24;
  const x = (v: number) => left + scale(v) * (w - left - right);

  return (
    <div ref={ref} className="relative" style={{ height: h }}>
      {w > 0 ? (
        <svg width={w} height={h} role="img" aria-label={ariaLabel} className="block touch-pan-y">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={4} y2={h - 24} stroke="var(--border)" />
              <text x={x(t)} y={h - 6} textAnchor="middle" className={axisText}>
                {formatTick(t)}
              </text>
            </g>
          ))}
          <line x1={x(reference)} x2={x(reference)} y1={4} y2={h - 24} stroke="var(--muted-foreground)" strokeDasharray="4 3" />
          {rows.map((row, i) => {
            const cy = 8 + i * rowH + rowH - (stacked ? 14 : 18);
            const color = row.strong ? "var(--cta)" : "var(--muted-foreground)";
            return (
              <g
                key={row.label}
                onPointerMove={(e) => {
                  const box = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
                  setTip({ x: e.clientX - box.left, y: e.clientY - box.top, row });
                }}
                onPointerLeave={() => setTip(null)}
              >
                <rect x={0} y={cy - rowH / 2 - (stacked ? 8 : 0)} width={w} height={rowH} fill="transparent" />
                <text
                  x={stacked ? left : left - 12}
                  y={stacked ? cy - 13 : cy + 4}
                  textAnchor={stacked ? "start" : "end"}
                  className={row.strong ? "fill-foreground text-[13px]" : "fill-muted-foreground text-[13px]"}
                  {...labelHalo}
                >
                  {row.label}
                </text>
                <line x1={x(row.lo)} x2={x(row.hi)} y1={cy} y2={cy} stroke={color} strokeWidth={2} strokeLinecap="round" />
                <circle cx={x(row.v)} cy={cy} r={5} fill={color} stroke="var(--background)" strokeWidth={2} />
                <text x={x(row.hi) + 8} y={cy + 4} className={axisText} {...labelHalo}>
                  {formatValue(row.v)}
                </text>
              </g>
            );
          })}
        </svg>
      ) : null}
      {tip ? (
        <ChartTip x={tip.x} y={tip.y} width={w}>
          <span className="font-medium">{tip.row.label}</span>
          <br />
          {tip.row.note}
        </ChartTip>
      ) : null}
    </div>
  );
}

const MODEL_NAMES: Record<string, string> = {
  Ensemble: "Ensemble (NB + Hawkes)",
  Hawkes: "Hawkes process",
  NB_full: "Negative binomial",
  MovingAvg12: "12-month average",
  SpatialMarkov: "Spatial Markov chain",
  NB_geography_only: "Geography only",
  Persistence: "Last month repeats",
};

export function ModelsChart() {
  const rows: DotRow[] = [...atlas.models]
    .sort((a, b) => b.pr - a.pr)
    .map((model) => ({
      label: MODEL_NAMES[model.k],
      v: model.pr,
      lo: model.lo,
      hi: model.hi,
      strong: model.k === "Ensemble",
      note: `PR-AUC ${model.pr.toFixed(3)} (${model.lo.toFixed(3)}–${model.hi.toFixed(3)}). Top 5% hold ${Math.round(model.cap * 100)}% of events.`,
    }));
  return (
    <DotRows
      rows={rows}
      ticks={[0, 0.1, 0.2, 0.3, 0.4]}
      scale={(v) => v / 0.45}
      formatTick={(v) => v.toFixed(1)}
      formatValue={(v) => v.toFixed(2)}
      reference={atlas.base_rate}
      ariaLabel="PR-AUC by model on 2022 to 2025. The ensemble scores highest at 0.39, and last month repeats scores lowest at 0.13."
    />
  );
}

export function DriversChart() {
  const lake = atlas.irr.l_lake;
  // l_lake is per log unit, so doubling the distance multiplies by 2^ln(IRR).
  const doubled = (v: number) => Math.pow(2, Math.log(v));
  const irr: [string, number[]][] = [
    ["Own event, 2–12 months ago", atlas.irr.a_own_2_12],
    ["Own event, last month", atlas.irr.a_own_1],
    ["Own event, 13–24 months ago", atlas.irr.a_own_13_24],
    ["Neighbour event, 2–12 months ago", atlas.irr.a_nb_2_12],
    ["Neighbour event, last month", atlas.irr.a_nb_1],
    ["Rainy season (May–Oct)", atlas.irr.wet],
    ["All past events jihadist (vs none)", atlas.irr.jih_share],
    ["Twice as far from Lake Chad", lake.map(doubled)],
  ];
  const rows: DotRow[] = irr.map(([label, [v, lo, hi]]) => ({
    label,
    v,
    lo,
    hi,
    strong: v > 1,
    note: `${v.toFixed(2)}× expected events (95% CI ${lo.toFixed(2)}–${hi.toFixed(2)})`,
  }));
  const min = Math.log(0.5);
  const span = Math.log(5) - min;
  return (
    <DotRows
      rows={rows}
      ticks={[0.5, 1, 2, 4]}
      scale={(v) => (Math.log(v) - min) / span}
      formatTick={(v) => `${v}×`}
      formatValue={(v) => `${v.toFixed(2)}×`}
      reference={1}
      ariaLabel="Rate ratios from the negative binomial model. Recent violence in an area and in its neighbours raises expected events; the rainy season and distance from Lake Chad lower them."
    />
  );
}

/* ─── Contagion tiles ───────────────────────────────────────────────── */

export function ContagionTiles() {
  const tiles = [
    ["Quiet neighbours", atlas.markov["0"], atlas.markov_wait["0"]],
    ["Some neighbour violence", atlas.markov["1"], atlas.markov_wait["1"]],
    ["Heavy neighbour violence", atlas.markov["2"], atlas.markov_wait["2"]],
  ] as const;
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {tiles.map(([label, chance, wait]) => (
        <div key={label} className="rounded-md border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 font-heading text-4xl font-light tabular-nums">
            {(chance * 100).toFixed(1)}%
          </p>
          <div className="mt-3 h-1 rounded-full bg-muted">
            <div className="h-full rounded-full bg-cta" style={{ width: `${(chance / 0.3) * 100}%` }} />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Typical wait: {wait < 20 ? wait.toFixed(1) : Math.round(wait)} months
          </p>
        </div>
      ))}
    </div>
  );
}
