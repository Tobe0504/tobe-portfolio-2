import { siteConfig } from "@/lib/content";

const FACTS = [
  { label: "Location", value: siteConfig.location, dot: false },
  { label: "Response time", value: "Within 24 hours", dot: false },
  { label: "Availability", value: "Open to new projects", dot: true },
];

export function QuickFacts() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 border-t border-border pt-10 sm:grid-cols-3">
      {FACTS.map((fact) => (
        <div key={fact.label}>
          <p className="text-xs tracking-normal text-muted-foreground lowercase">
            {fact.label}
          </p>
          <p className="mt-2 flex items-center gap-2 font-heading text-xl">
            {fact.dot ? (
              <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
            ) : null}
            {fact.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default QuickFacts;
