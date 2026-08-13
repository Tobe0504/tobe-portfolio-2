import type { PersonalProject } from "./types";

/**
 * Every entry gets an internal /playground/[slug] page — PlaygroundListing
 * links there directly rather than out to `liveUrl`, so the live product
 * (when there is one) is always reached through the write-up first.
 */
export const personalProjects: PersonalProject[] = [
  {
    slug: "vera",
    title: "Vera",
    status: "shipped",
    summary:
      "An events and ticketing app built around the parts group chats and screenshots always lose — a real feed of what actually happened, not just a QR code.",
    tags: ["Next.js", "Events", "Mobile"],
    liveUrl: "https://web-indol-iota-53.vercel.app/",
    cover: {
      accent: 4,
      image: {
        src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1785835676/Vera_zthhg9.png",
        alt: "Vera homepage, mobile",
      },
    },
    problem: [
      "Finding out about events and actually going still runs through group chats and screenshots — the flyer gets buried, screenshots get faked, and by the time you're at the door a scalper has doubled the price. None of that is a technology problem exactly, but all of it is friction a product can remove.",
      "The other half: once the event happens, it's gone. A photo dump in someone's camera roll, maybe a story that expires in a day. There's no real record of what a night was actually like, from the people who were actually there.",
    ],
    approach: [
      "Tickets are capped on resale at face value instead of left open to scalping, and check-in is a single QR scan designed to resolve in under half a second at the door — the two moments (buying, getting in) that cause the most real-world friction got the most direct fixes.",
      "The feed is follow-based, not algorithmic — you see moments from events your circle actually went to, not a ranked-for-engagement timeline. Every post carries real comments, not just a like count, so the after-event record reads like people talking, not stats.",
      "Organizers get verification, one-tap check-in, and event features built to keep 100% of face value on ticket sales, funded by a small transparent fee at checkout rather than a markup baked into the ticket price.",
    ],
    gallery: [
      {
        cover: {
          accent: 4,
          image: {
            src: "/projects/vera/desktop-1.jpg",
            alt: "Vera homepage, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site — desktop",
      },
      {
        cover: {
          accent: 2,
          image: {
            src: "/projects/vera/mobile-1.jpg",
            alt: "Vera homepage, mobile",
          },
        },
        aspect: "portrait",
        caption: "Live site — mobile",
      },
    ],
  },
  {
    slug: "squircle",
    title: "Squircle",
    status: "shipped",
    summary:
      "An AI-assisted project management workspace built around one idea: alignment and execution shouldn't live in different tools.",
    tags: ["Product Design", "SaaS", "AI"],
    liveUrl: "https://squircle.live",
    cover: {
      accent: 1,
      image: {
        src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1785835676/squircle_g5uw8a.png",
        alt: "Squircle homepage, mobile",
      },
    },
    problem: [
      "Most project tools split a team's day into two different apps — one for talking about the work (chat, standups, status updates) and one for doing it (tasks, docs, tracking). The context-switching between them is where actual momentum dies: you close the loop in one tool and lose it reopening the other.",
      "Squircle starts from a piece of workplace slang — 'to quickly square up a task, then circle back with updates' — because that loop, alignment and execution in one motion, is the actual behavior teams already default to. The product just needed to stop fighting it.",
    ],
    approach: [
      "Projects, workflows, docs, and spaces (chat) live in one workspace instead of stitched together across tools, so the 'square up, circle back' loop is one flow, not a handoff between apps.",
      "An AI agent sits inside that same workspace at the higher tiers — surfaced as part of the plan structure (Starter through Enterprise) rather than a bolted-on add-on — for the parts of planning and status-tracking that are genuinely repetitive.",
      "Plans are scoped to team shape, not just seat count: an individual or small team starts on core workflows alone, and only grows into automation, advanced permissions, and audit logs when the team's actual size and governance needs call for them.",
    ],
    gallery: [
      {
        cover: {
          accent: 1,
          image: {
            src: "/projects/squircle/desktop-1.jpg",
            alt: "Squircle homepage, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site — desktop",
      },
      {
        cover: {
          accent: 5,
          image: {
            src: "/projects/squircle/mobile-1.jpg",
            alt: "Squircle homepage, mobile",
          },
        },
        aspect: "portrait",
        caption: "Live site — mobile",
      },
    ],
  },
  {
    slug: "zync",
    title: "Zync",
    status: "shipped",
    summary:
      "A video-conferencing platform built in three days — real-time video, chat, and scheduling, with the parts most clones skip (waiting rooms, multiple view modes) actually built in.",
    tags: ["React", "Real-Time UI"],
    timeline: "3 days",
    liveUrl: "https://tobe0504.github.io/Zync-Web-Video-Conferencing/",
    cover: {
      accent: 1,
      image: {
        src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1732259773/Screenshot_2024-11-22_at_07.44.40_vp8m99.png",
        alt: "Zync — screenshot 1",
      },
    },
    problem: [
      "Most video-call clones stop at 'the video works' and skip the parts that actually make a meeting usable — a lobby so uninvited people can't just walk in, more than one way to look at a call instead of one fixed layout, and screen sharing that survives a bad connection instead of falling over.",
    ],
    approach: [
      "Built the full loop in three days: real-time video and chat, a lobby/waiting-room step before anyone's admitted, screen sharing, and three switchable views — gallery, speaker, pinned — instead of one layout for every kind of call. Cross-platform from the same codebase: desktop, mobile, and web.",
    ],
    gallery: [
      {
        cover: {
          accent: 1,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1732259773/Screenshot_2024-11-22_at_07.44.40_vp8m99.png",
            alt: "Zync — screenshot 1",
          },
        },
        aspect: "landscape",
        caption: "Zync — screenshot 1",
      },
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1732259773/Screenshot_2024-11-22_at_08.15.22_rre8pb.png",
            alt: "Zync — screenshot 2",
          },
        },
        aspect: "landscape",
        caption: "Zync — screenshot 2",
      },
      {
        cover: {
          accent: 5,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1732259773/Screenshot_2024-11-22_at_08.15.36_zsxgpd.png",
            alt: "Zync — screenshot 3",
          },
        },
        aspect: "landscape",
        caption: "Zync — screenshot 3",
      },
    ],
  },
  {
    slug: "do",
    title: "Do",
    status: "shipped",
    summary:
      "An offline-first task manager — every task lives on the device first, with a barcode scan as the way to move a task to another device without needing a network at all.",
    tags: ["Offline-First", "PWA"],
    timeline: "1 month",
    liveUrl: "https://do-tobe.vercel.app",
    cover: {
      accent: 4,
      image: {
        src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1732260349/Screenshot_2024-11-22_at_08.25.29_tn5uiw.png",
        alt: "Do — screenshot 1",
      },
    },
    problem: [
      "Task apps assume a connection. Lose it and most of them either stop working outright or quietly stop syncing until something's missing later — and sharing a task to someone else's device almost always routes through an online account, even when both devices are sitting on the same table.",
    ],
    approach: [
      "Every task is created, edited, and stored locally first, so the app works identically with no connection at all. Moving a task to another device is a barcode scan, not a login — sync to the cloud is there for when you're back online, but it's optional, never the thing the app depends on to function.",
    ],
    gallery: [
      {
        cover: {
          accent: 4,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1732260349/Screenshot_2024-11-22_at_08.25.29_tn5uiw.png",
            alt: "Do — screenshot 1",
          },
        },
        aspect: "landscape",
        caption: "Do — screenshot 1",
      },
      {
        cover: {
          accent: 2,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1732260346/Screenshot_2024-11-22_at_08.25.14_hp24vu.png",
            alt: "Do — screenshot 2",
          },
        },
        aspect: "landscape",
        caption: "Do — screenshot 2",
      },
    ],
  },
  {
    slug: "bug-squash",
    title: "Bug Squash",
    status: "shipped",
    summary: "A tiny game about squashing bugs. Literally, this time.",
    tags: ["Game", "For fun"],
    cover: { accent: 2 },
  },
];
