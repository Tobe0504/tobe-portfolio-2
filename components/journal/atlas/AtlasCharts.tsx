"use client";

import { useState, type PointerEvent } from "react";

import atlas from "@/lib/content/nigeria-atlas-data.json";

import { AS_OF, ChartTip, LegendKey, Pills, fmtMonth, useChartWidth } from "./shared";

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
  const { jan_sep: janSep } = atlas.score;
  const stats = [
    [
      String(Math.round(atlas.nat.central[i])),
      `fatal events expected across Nigeria in ${fmtMonth(AS_OF)} (80% range ${Math.round(atlas.nat.lo_10[i])}–${Math.round(atlas.nat.hi_90[i])})`,
    ],
    [
      `${janSep.months_inside80} of 9`,
      "months of 2026 landed inside the forecast’s 80% range, for events with identified actors",
    ],
    [
      `${Math.round(atlas.score.share_events_in_top10pct_forecast_lgas * 100)}%`,
      "of those 2026 events fell in the 10% of LGAs the forecast flagged",
    ],
    [
      `${Math.round((1 - janSep.observed_identified / janSep.observed_all) * 100)}%`,
      "of 2026’s preliminary events have unidentified attackers, and the model can’t see them",
    ],
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
  const iss = atlas.issued;
  const obs = iss.month.map((month) => atlas.hist.y[atlas.hist.month.indexOf(month)]);
  const all = atlas.hist_all26.y;
  const top = 175;
  const x = (i: number) => m.l + (i / 8) * (w - m.l - m.r);
  const y = (v: number) => h - m.b - (v / top) * (h - m.t - m.b);
  const band = `${line(iss.hi_90.map((v, i) => [x(i), y(v)]))}${[...iss.lo_10]
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
          { label: "Recorded, identified actors", swatch: lineSwatch("var(--foreground)") },
          { label: "Incl. unconfirmed", swatch: lineSwatch("var(--muted-foreground)", true) },
        ]}
      />
      <div ref={ref} className="relative mt-4" style={{ height: h }}>
        {w > 0 ? (
          <svg
            width={w}
            height={h}
            role="img"
            aria-label="January to September 2026: recorded events with identified actors stayed inside the forecast's 80% range every month, while all preliminary events ran far above it."
            className="block touch-pan-y"
            onPointerMove={(e) => {
              const p = pointerIn(e);
              const raw = Math.round(((p.x - m.l) / (w - m.l - m.r)) * 8);
              setTip({ ...p, i: Math.max(0, Math.min(8, raw)) });
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
            {iss.month.map((month, i) =>
              w < 480 && i % 2 ? null : (
                <text key={month} x={x(i)} y={h - 8} textAnchor={i === 0 ? "start" : i === 8 ? "end" : "middle"} className={axisText}>
                  {fmtMonth(month, "short").slice(0, 3)}
                </text>
              ),
            )}
            <path d={band} fill="var(--cta)" fillOpacity={0.24} />
            <path d={line(all.map((v, i) => [x(i), y(v)]))} fill="none" stroke="var(--muted-foreground)" strokeDasharray="4 3" strokeWidth={1.5} />
            <path d={line(iss.central.map((v, i) => [x(i), y(v)]))} fill="none" stroke="var(--cta)" strokeWidth={2} />
            <path d={line(obs.map((v, i) => [x(i), y(v)]))} fill="none" stroke="var(--foreground)" strokeWidth={2} />
            {tip ? (
              <g pointerEvents="none">
                <line x1={x(tip.i)} x2={x(tip.i)} y1={m.t} y2={h - m.b} stroke="var(--foreground)" strokeOpacity={0.35} />
                <circle cx={x(tip.i)} cy={y(obs[tip.i])} r={4.5} fill="var(--background)" stroke="var(--foreground)" strokeWidth={2} />
              </g>
            ) : null}
          </svg>
        ) : null}
        {tip ? (
          <ChartTip x={tip.x} y={tip.y} width={w}>
            <span className="font-medium">{fmtMonth(iss.month[tip.i])}</span>
            <br />
            Forecast {Math.round(iss.central[tip.i])} ({Math.round(iss.lo_10[tip.i])}–{Math.round(iss.hi_90[tip.i])})
            <br />
            Recorded {obs[tip.i]}
            <br />
            Incl. unconfirmed {all[tip.i]}
          </ChartTip>
        ) : null}
      </div>
    </div>
  );
}

export function ScorecardTables() {
  const th = "pb-2 text-left text-xs font-normal text-muted-foreground lowercase";
  const num = "py-1.5 text-right tabular-nums";
  const headers = ["Forecast", "Recorded", "Incl. unconfirmed"];
  const states = atlas.score_states;
  const tables = [
    {
      caption: "By state, January–September 2026",
      first: "State",
      rows: states.state.map((name, i) => [name, states.fc[i].toFixed(0), states.obs[i], states.obs_all[i]] as const),
    },
    {
      caption: "What the forecast missed most",
      first: "LGA",
      rows: atlas.surprises.map((s) => [`${s.lga}, ${s.state}`, s.fc.toFixed(1), s.obs, s.obs_all] as const),
    },
  ];
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {tables.map((table) => (
        <table key={table.first} className="w-full text-sm">
          <caption className="pb-3 text-left font-heading text-lg">{table.caption}</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className={th}>{table.first}</th>
              {headers.map((header) => (
                <th key={header} scope="col" className={`${th} pl-3 text-right`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {table.rows.map(([name, fc, obs, all]) => (
              <tr key={name}>
                <th scope="row" className="py-1.5 pr-2 text-left font-normal">{name}</th>
                <td className={num}>{fc}</td>
                <td className={num}>{obs}</td>
                <td className={`${num} text-muted-foreground`}>{all}</td>
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
  const m = { l: 40, r: 8, t: 12, b: 28 };
  const { years, y2026, outlook } = atlas;
  const allYears = [...years.year, 2026, ...outlook.year];
  const top = 1000;
  const slot = (w - m.l - m.r) / allYears.length;
  const bar = Math.min(slot - 2, 36);
  const cx = (year: number) => m.l + slot * (allYears.indexOf(year) + 0.5);
  const y = (v: number) => h - m.b - (v / top) * (h - m.t - m.b);
  const column = (year: number, lo: number, hi: number, fill: string, opacity = 1) => (
    <rect x={cx(year) - bar / 2} y={y(hi)} width={bar} height={Math.max(0, y(lo) - y(hi) - 1)} rx={Math.min(3, bar / 3)} fill={fill} fillOpacity={opacity} />
  );
  const step = w < 480 ? 3 : w < 760 ? 2 : 1;
  const est2026 = y2026.recorded + y2026.q4;
  const hoverYear = tip ? allYears[tip.key] : null;
  const fIdx = hoverYear ? outlook.year.indexOf(hoverYear) : -1;
  const yIdx = hoverYear ? years.year.indexOf(hoverYear) : -1;

  return (
    <div>
      <LegendKey
        items={[
          { label: "Recorded", swatch: <span className="inline-block size-2.5 rounded-xs bg-muted-foreground" /> },
          { label: "Forecast", swatch: <span className="inline-block size-2.5 rounded-xs bg-cta" /> },
          { label: "80% and 95% range", swatch: lineSwatch("var(--foreground)") },
        ]}
      />
      <div ref={ref} className="relative mt-4" style={{ height: h }}>
        {w > 0 ? (
          <svg
            width={w}
            height={h}
            role="img"
            aria-label="Yearly fatal events from 2012, with an outlook of roughly 650 to 690 events a year from 2027 to 2030 and wide uncertainty ranges."
            className="block touch-pan-y"
            onPointerMove={(e) => {
              const p = pointerIn(e);
              setTip({ ...p, key: Math.max(0, Math.min(allYears.length - 1, Math.floor((p.x - m.l) / slot))) });
            }}
            onPointerLeave={() => setTip(null)}
          >
            {[0, 250, 500, 750, 1000].map((t) => (
              <g key={t}>
                <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke="var(--border)" />
                <text x={m.l - 8} y={y(t) + 4} textAnchor="end" className={axisText}>
                  {t}
                </text>
              </g>
            ))}
            {allYears.map((year, i) =>
              (allYears.length - 1 - i) % step ? null : (
                <text key={year} x={cx(year)} y={h - 8} textAnchor="middle" className={axisText}>
                  {year}
                </text>
              ),
            )}
            {years.year.map((year, i) => (
              <g key={year}>{column(year, 0, years.y[i], "var(--muted-foreground)")}</g>
            ))}
            {column(2026, 0, y2026.recorded, "var(--muted-foreground)")}
            {column(2026, y2026.recorded, est2026, "var(--cta)", 0.55)}
            {outlook.year.map((year, i) => (
              <g key={year}>
                {column(year, 0, outlook.central[i], "var(--cta)")}
                <line x1={cx(year)} x2={cx(year)} y1={y(outlook.lo95[i])} y2={y(outlook.hi95[i])} stroke="var(--foreground)" />
                <line x1={cx(year)} x2={cx(year)} y1={y(outlook.lo80[i])} y2={y(outlook.hi80[i])} stroke="var(--foreground)" strokeWidth={3} />
              </g>
            ))}
          </svg>
        ) : null}
        {tip && hoverYear ? (
          <ChartTip x={tip.x} y={tip.y} width={w}>
            <span className="font-medium">{hoverYear}</span>
            <br />
            {yIdx >= 0 ? `${years.y[yIdx]} recorded events` : null}
            {hoverYear === 2026 ? (
              <>
                {y2026.recorded} recorded through September
                <br />+{Math.round(y2026.q4)} forecast for Oct–Dec
              </>
            ) : null}
            {fIdx >= 0 ? (
              <>
                {Math.round(outlook.central[fIdx])} forecast events
                <br />
                80% range {Math.round(outlook.lo80[fIdx])}–{Math.round(outlook.hi80[fIdx])}
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
  const [range, setRange] = useState<"2018" | "2010">("2018");
  const [tip, setTip] = useState<(Pointer & { key: number }) | null>(null);

  const h = 340;
  const m = { l: 34, r: 8, t: 26, b: 28 };
  const first = monthIndex(`${range}-01`);
  const last = monthIndex("2027-12");
  const x = (i: number) => m.l + ((i - first) / (last - first)) * (w - m.l - m.r);

  const hist = atlas.hist.month
    .map((month, i) => ({ i: monthIndex(month), month, y: atlas.hist.y[i] }))
    .filter((d) => d.i >= first);
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

  const unconfirmed = atlas.hist_all26.month.map((month, i) => ({ i: monthIndex(month), y: atlas.hist_all26.y[i] }));

  const top = Math.ceil(Math.max(...hist.map((d) => d.y), ...nat.hi_975, ...unconfirmed.map((d) => d.y)) / 25) * 25;
  const y = (v: number) => h - m.b - (v / top) * (h - m.t - m.b);
  const yTicks = Array.from({ length: Math.floor(top / 25) + 1 }, (_, i) => i * 25);

  const yearStep = w < 480 ? (range === "2010" ? 4 : 2) : range === "2010" ? 2 : 1;
  const years = Array.from({ length: 2027 - Number(range) + 1 }, (_, i) => Number(range) + i).filter(
    (year) => (year - Number(range)) % yearStep === 0,
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <LegendKey
          items={[
            { label: "Recorded", swatch: lineSwatch("var(--muted-foreground)") },
            { label: "Incl. unconfirmed", swatch: lineSwatch("var(--muted-foreground)", true) },
            { label: "Forecast", swatch: lineSwatch("var(--cta)") },
            { label: "80% range", swatch: areaSwatch(0.32) },
            { label: "95% range", swatch: areaSwatch(0.14) },
          ]}
        />
        <Pills
          label="Time range"
          value={range}
          onChange={setRange}
          options={[
            { value: "2018", label: "Since 2018" },
            { value: "2010", label: "Since 2010" },
          ]}
        />
      </div>
      <div ref={ref} className="relative mt-4" style={{ height: h }}>
        {w > 0 ? (
          <svg
            width={w}
            height={h}
            role="img"
            aria-label="Monthly fatal events in Nigeria, recorded through September 2026 and forecast through December 2027 with 80% and 95% ranges."
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
              <text
                key={year}
                x={x(monthIndex(`${year}-01`))}
                y={h - 8}
                textAnchor="start"
                className={axisText}
              >
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
              d={line(unconfirmed.map((d) => [x(d.i), y(d.y)]))}
              fill="none"
              stroke="var(--muted-foreground)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
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
                <line
                  x1={x(mark.i)}
                  x2={x(mark.i)}
                  y1={m.t - 12}
                  y2={h - m.b}
                  stroke="var(--muted-foreground)"
                  strokeDasharray="3 3"
                />
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
            {hoveredHist.y} recorded events
            {unconfirmed.some((d) => d.i === hoveredHist.i) ? (
              <>
                <br />
                {unconfirmed.find((d) => d.i === hoveredHist.i)?.y} incl. unconfirmed
              </>
            ) : null}
          </ChartTip>
        ) : null}
        {tip && hoveredFc ? (
          <ChartTip x={tip.x} y={tip.y} width={w}>
            <span className="font-medium">{fmtMonth(hoveredFc.month)}</span>
            <br />
            {Math.round(hoveredFc.c)} forecast events
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
