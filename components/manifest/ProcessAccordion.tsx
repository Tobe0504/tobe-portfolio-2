import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    body: "A week or two spent with the actual constraints — the existing codebase, the timeline, the traffic it needs to survive. Most bad scopes get fixed here, before anything gets built.",
  },
  {
    number: "02",
    title: "Architecture",
    body: "One approach, thought through properly, rather than three options sketched thinly. Data model, API shape, and the trade-offs, decided before the first line of feature code.",
  },
  {
    number: "03",
    title: "Build",
    body: "The system gets built out across every surface it actually needs to hold up on — frontend, backend, and the edge cases in between, not just the happy path.",
  },
  {
    number: "04",
    title: "Handoff",
    body: "Documentation a team can run without me in the room, and a couple of weeks on call once it ships, for the problems that only show up in production.",
  },
];

/** The one place a numbered sequence is used — this is a real, ordered process, not decoration. */
export function ProcessAccordion() {
  return (
    <section className="border-b border-border px-6 py-24 md:px-10">
      <div className="mx-auto max-w-400">
        <p className="text-xs tracking-normal text-muted-foreground lowercase">
          How I work
        </p>
        <Accordion type="single" collapsible defaultValue="01" className="mt-8">
          {STEPS.map((step) => (
            <AccordionItem key={step.number} value={step.number} className="border-border">
              <AccordionTrigger className="py-8 hover:no-underline">
                <span className="flex items-baseline gap-6">
                  <span className="text-sm text-muted-foreground">{step.number}</span>
                  <span className="font-heading text-3xl font-normal md:text-4xl">{step.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="max-w-2xl pl-13 text-base text-muted-foreground md:pl-16">
                  {step.body}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default ProcessAccordion;
