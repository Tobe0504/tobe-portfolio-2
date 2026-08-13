import type { JournalPost } from "./types";

// coverImage below is a placeholder — reusing existing gallery photos so the
// /journal grid has something real to lay out while the page gets built.
// Swap each one for a real cover shot per entry whenever they're ready.
export const journalPosts: JournalPost[] = [
  {
    slug: "constraints-are-a-gift",
    title: "Constraints are a gift, not an obstacle",
    date: "2026-06-27",
    excerpt: "The brief that scares you a little is usually the good one.",
    coverImage: {
      src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1785930852/aiart___%D0%B8%D1%81%D0%BA%D1%83%D1%81%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%D0%B8%D0%BD%D1%82%D0%B5%D0%BB%D0%BB%D0%B5%D0%BA%D1%82___%D0%B8%D1%81%D0%BA%D1%83%D1%81%D1%81%D1%82%D0%B2%D0%BE%D0%B8%D0%B8___%D0%BD%D0%B5%D0%B8%CC%86%D1%80%D0%BE%D0%B0%D1%80%D1%82___aiartwork___digitalart___aiartist___%D0%BD%D0%B5%D0%B8%CC%86%D1%80%D0%BE%D1%81%D0%B5%D1%82%D1%8C___%D0%BD%D0%B5%D0%B8%CC%86%D1%80%D0%BE%D1%81%D0%B5%D1%82%D0%B8___%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5%D0%B8%D1%81%D0%BA%D1%83%D1%81%D1%81%D1%82%D0%B2%D0%BE___artificialintell_lnhsam.jpg",
      alt: "AI-generated artwork",
    },
    tags: ["Process"],
    readingTime: 4,
    body: [
      {
        type: "paragraph",
        text: "The briefs I turn down aren't the hard ones. They're the open ones — \"do whatever you think is best,\" no budget ceiling, no launch date. Without a wall to push against there's nothing to push against, and the work drifts for weeks before it finds a shape.",
      },
      {
        type: "paragraph",
        text: "A real constraint does the opposite. Three colors, one typeface, a launch date that can't move — every option that isn't survivable gets deleted before you've wasted a day on it. What's left is smaller, and it's almost always better than what six unconstrained weeks would have produced.",
      },
      {
        type: "quote",
        text: "Give me a blank page and I'll stall. Give me a blank page and a deadline and I'll ship.",
      },
    ],
  },
  {
    slug: "on-restraint",
    title: "On restraint",
    date: "2026-05-14",
    excerpt: "Most interfaces don't fail from doing too little.",
    coverImage: {
      src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1785930853/Wallpaper_wulsny.jpg",
      alt: "A saved wallpaper",
    },
    tags: ["Process"],
    readingTime: 4,
    body: [
      {
        type: "paragraph",
        text: "Every critique I've sat through where a screen felt \"unfinished\" turned out, on closer look, to be a screen that was actually just quiet. Quiet gets mistaken for incomplete constantly, and the fix people reach for is always the same: add a badge, add a gradient, add a card around the thing that was already fine on its own.",
      },
      {
        type: "paragraph",
        text: "The restraint isn't the absence of a decision. It's a decision, made early, to spend the page's attention on one thing instead of six. You can tell within the first five minutes of a review whether a team made that decision on purpose or arrived at it by running out of time.",
      },
      {
        type: "quote",
        text: "What is this competing with? If the honest answer is \"the thing I actually want someone to look at,\" it doesn't go in.",
      },
    ],
  },
  {
    slug: "type-pairing-notes",
    title: "Notes on pairing a serif with a mono",
    date: "2026-03-02",
    excerpt:
      "A serif carries the voice. A mono carries the facts. Nothing else needs to be in the room.",
    coverImage: {
      src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1785930851/__35_kszjuc.jpg",
      alt: "Pop-art sculpture illustration with \"He ART\" text",
    },
    tags: ["Typography"],
    readingTime: 6,
    body: [
      {
        type: "paragraph",
        text: "The pairing I keep coming back to isn't serif-plus-sans, it's serif-plus-mono. A sans body face tries to be neutral and mostly reads as a compromise between the display face and nothing. A mono doesn't compete with the serif at all — it's doing an entirely different job: dates, credits, coordinates, the parts of a page that are true rather than felt.",
      },
      {
        type: "paragraph",
        text: "The trap is using the mono everywhere technical shows up, out of habit, instead of asking whether that particular fact wants to feel precise or wants to feel human. A byline in mono reads like a database record. A byline in the body serif reads like it was written by a person. Most of the time I want the second one.",
      },
    ],
  },
  {
    slug: "designing-for-scroll",
    title: "Designing for scroll, not for screens",
    date: "2026-01-19",
    excerpt: "A page isn't a canvas you fill. It's a sequence you spend.",
    coverImage: {
      src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1785930851/__31_x8dsdg.jpg",
      alt: "Abstract textured portrait in paint",
    },
    tags: ["Motion", "Process"],
    readingTime: 5,
    body: [
      {
        type: "paragraph",
        text: "I used to design pages the way you'd lay out a poster — figure out the composition, then figure out how it breaks across a viewport. That produces pages that look considered in a screenshot and feel arbitrary in a browser, because the screenshot was never the medium.",
      },
      {
        type: "paragraph",
        text: "Scroll has a rhythm the way music does: a held beat, a release, a pause before the next idea. Once I started storyboarding sections as beats instead of blocks, the transitions stopped needing to be clever — most of them could just be a fade and a bit of patience, because the sequence itself was doing the work.",
      },
    ],
  },
  {
    slug: "boring-technology",
    title: "The case for boring technology",
    date: "2025-10-05",
    excerpt: "Save the novelty budget for the one thing the project is actually about.",
    coverImage: {
      src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1785930852/Alma-Tameda_1_ygbz5z.jpg",
      alt: "Alma Tameda, part 1",
    },
    tags: ["Studio"],
    readingTime: 3,
    body: [
      {
        type: "paragraph",
        text: "Every stack has a novelty budget, whether anyone names it or not — a limited amount of \"let's try the new thing\" the project can absorb before the risk stops being interesting and starts being a liability. Spend it on the part of the product that's actually new. Everywhere else, pick the boring option and move on.",
      },
      {
        type: "paragraph",
        text: "Boring means documented, means the error messages are googleable, means the person debugging it at 11pm six months from now — probably me — isn't also relearning a framework. None of that is glamorous. All of it is why the interesting part of the project got built at all.",
      },
    ],
  },
  {
    slug: "a-year-of-client-work",
    title: "A year of client work, in six numbers",
    date: "2025-11-08",
    excerpt: "The studio's first full year, accounted for honestly.",
    coverImage: {
      src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1785930851/__29_sgsxhc.jpg",
      alt: "Expressionist skull-figure painting with numbers and sketches",
    },
    tags: ["Studio"],
    readingTime: 3,
    body: [
      {
        type: "paragraph",
        text: "Six projects shipped, one turned down after a week of discovery once it became clear the brief and the budget weren't describing the same project, and exactly zero all-nighters — which I'm more proud of than any single deliverable this year.",
      },
      {
        type: "list",
        items: [
          "Smaller scopes",
          "Longer runways",
          "Fewer simultaneous clients",
        ],
      },
      {
        type: "paragraph",
        text: "Everything good this year came from having enough time to throw away the first version.",
      },
    ],
  },
  {
    slug: "good-crit",
    title: "What a good critique actually sounds like",
    date: "2025-08-01",
    excerpt: "Not \"I don't love it.\" Something you can act on before lunch.",
    coverImage: {
      src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1785930851/__30_ylujkt.jpg",
      alt: "High-contrast illustration of a laughing figure",
    },
    tags: ["Process"],
    readingTime: 4,
    body: [
      {
        type: "paragraph",
        text: "\"I don't love it\" has never once told me what to change. It's a real reaction, but it's the reviewer's job to keep going past it — what specifically isn't landing, and what would landing look like. Stopping at the feeling is the critique equivalent of a bug report that just says \"it's broken.\"",
      },
      {
        type: "paragraph",
        text: "The best reviewers I've worked with point at a specific element and say what they'd try instead, even a rough guess. It's easier to react to a wrong suggestion than to an open-ended feeling, and a wrong suggestion still moves the work forward — you find out why it's wrong, which is information you didn't have before.",
      },
      {
        type: "list",
        items: [
          "Name the specific element, not the whole screen",
          "Say what you'd try, even if it's wrong",
          "End with something actionable before the meeting ends",
        ],
      },
    ],
  },
  {
    slug: "why-i-still-sketch",
    title: "Why I still sketch on paper first",
    date: "2025-09-22",
    excerpt: "Not for the aesthetic. For the friction.",
    coverImage: {
      src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1785930852/__33_lezxqz.jpg",
      alt: "Artistic mood-board wallpaper with paintbrushes and art supplies",
    },
    tags: ["Process"],
    readingTime: 4,
    body: [
      {
        type: "paragraph",
        text: "Paper is slow in exactly the way that's useful early on — you can't drag a component from a library, so you're forced to decide what the thing actually is before you decide what it looks like. Every idea I've had that survived to production started as a bad drawing I was a little embarrassed to show anyone.",
      },
      {
        type: "paragraph",
        text: "The tools come back in once the shape is right. But the shape has to be right first, and software is too accommodating to tell you when it isn't.",
      },
    ],
  },
  {
    slug: "naming-things",
    title: "Naming things is a design problem",
    date: "2025-07-10",
    excerpt: "A wrong name costs more than a wrong color ever will.",
    coverImage: {
      src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1785930853/Stories_worth_letting_the_lights_shine_through_mpnmzo.jpg",
      alt: "Stories worth letting the lights shine through",
    },
    tags: ["Typography"],
    readingTime: 3,
    body: [
      {
        type: "paragraph",
        text: "A wrong color gets fixed in an afternoon and nobody remembers it happened. A wrong name for a button, a state, a section of navigation gets typed into commit messages, ticket titles, and Slack threads for years, and every one of those instances is a small tax on whoever reads it next.",
      },
      {
        type: "paragraph",
        text: "The naming pass I trust least is the one done alone at the end, once the feature already works and shipping is the only thing left. Naming wants to happen earlier, out loud, with someone who'll say \"wait, what does that actually mean\" before it's load-bearing in forty files.",
      },
    ],
  },
];
