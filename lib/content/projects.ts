import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "genie-studios",
    title: "Genie Studios",
    year: 2025,
    category: "AI Product Engineering",
    tags: ["Next.js", "Go", "AI/ML", "Design Systems"],
    client: "Genie Studios",
    role: ["Senior Full-Stack Engineer"],
    url: "https://geniestudio.app/",
    summary:
      "An AI-driven image generation platform: a Next.js frontend paired with a Go backend built for real-time creative workflows.",
    body: [
      "Genie Studios needed a generation platform that felt instant even while heavy AI workloads ran behind it. I built the interactive frontend components that drive the creative workflow, alongside scalable backend APIs in Go to keep response times tight under load.",
      "A large part of the work was building a reusable design system: shared components that kept the UI consistent as new generation features shipped, while also cutting down on repeated styling work across the platform.",
      "Live at geniestudio.app.",
    ],
    cover: {
      accent: 3,
      image: {
        src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184858/Screenshot_2026-08-07_at_11.01.50_cfwx1k.png",
        alt: "Genie Studios homepage, desktop",
      },
    },
    gallery: [
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184858/Screenshot_2026-08-07_at_11.01.50_cfwx1k.png",
            alt: "Genie Studios homepage, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site: geniestudio.app",
      },
      {
        cover: {
          accent: 1,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184859/Screenshot_2026-08-07_at_11.03.36_syzxhc.png",
            alt: "Genie Studios, generation workflow",
          },
        },
        aspect: "landscape",
        caption: "Live site: generation workflow",
      },
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184857/geniestudio.app__iPhone_XR_tnr709.png",
            alt: "Genie Studios homepage, mobile",
          },
        },
        aspect: "portrait",
        caption: "Live site: mobile",
      },
    ],
    featured: true,
    order: 13,
  },
  {
    slug: "fcmb-group",
    title: "FCMB Group",
    year: 2026,
    category: "Corporate Site / Financial Services",
    tags: ["Web Design", "Corporate", "Investor Relations"],
    client: "FCMB Group Plc",
    role: ["Frontend Developer"],
    url: "https://fcmbgroup.com",
    summary:
      "The holding company site for FCMB Group Plc, a Nigerian financial services group, built around the line the business leads with: our businesses, one vision.",
    body: [
      "FCMB Group is a holding company, which is a harder brief than a bank\u2019s own site. There is no product to sell on the page. The audience is investors, analysts, regulators, journalists and prospective staff, and each of them arrives looking for a different document.",
      "So the structure is the design. Four top-level routes (About us, Investor relations, Media centre, Careers) each open into their own set: the group at a glance, subsidiaries, board of directors and sustainability under one; reports, share information, corporate governance, events and webcasts and investor contacts under another. Someone hunting a specific filing should reach it in two clicks without reading a word of marketing copy.",
      "The group\u2019s own framing, \u201cthe power of the group\u201d, carries the homepage: diverse expertise brought together to create lasting value for individuals, businesses and communities. Everything below it is evidence for that claim rather than a restatement of it.",
    ],
    challenges: [
      "Serving four audiences with incompatible goals from one navigation. An investor wants a PDF, a journalist wants a press release, a graduate wants to apply, and none of them should have to pass through the other three to get there.",
      "Presenting a licensed, regulated institution (Central Bank of Nigeria, Securities and Exchange Commission) with the seriousness that implies, without the page becoming a wall of compliance text.",
      "Making a holding company feel like one entity when its substance is a set of separate subsidiaries.",
    ],
    features: [
      {
        name: "Investor relations centre",
        description:
          "Reports, share information, corporate governance, events and webcasts, and investor contacts, each addressable on its own rather than buried in a single downloads page.",
      },
      {
        name: "Group and subsidiary structure",
        description:
          "The group at a glance, the subsidiaries beneath it, and the board of directors, presented so the shape of the organisation is legible before any of the detail is read.",
      },
      {
        name: "Media centre and careers",
        description:
          "Press releases and a gallery for the newsroom audience, and a careers route for candidates, kept out of the investor path so neither obstructs the other.",
      },
    ],
    cover: {
      accent: 3,
      image: {
        src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1788448269/Screenshot_2026-09-03_at_16.08.12_baudnl.png",
        alt: "FCMB Group homepage, desktop",
      },
    },
    gallery: [
      {
        cover: {
          accent: 1,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1788448269/Screenshot_2026-09-03_at_16.08.12_baudnl.png",
            alt: "FCMB Group homepage, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site: fcmbgroup.com",
      },
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1788448266/Screenshot_2026-09-03_at_16.09.23_o1s3by.png",
            alt: "FCMB Careers, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site: fcmbgroup.com",
      },

      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1788448278/careers_iPhone_XR_zwszd4.png",
            alt: "FCMB Group homepage, mobile",
          },
        },
        aspect: "portrait",
        caption: "Live site: fcmbgroup.com",
      },
    ],
    featured: true,
    order: 15,
  },
  {
    slug: "fcmb-self-service",
    title: "FCMB Self Service",
    year: 2026,
    category: "Product / Banking Self-Service",
    tags: ["Product Engineering", "Banking", "Self-Service"],
    client: "FCMB",
    role: ["Frontend Developer"],
    url: "https://selfservice.fcmb.com",
    summary:
      "A self-service portal for FCMB customers: the account journeys that normally mean a branch visit or a call centre queue, handled directly.",
    body: [
      "Every task on this portal is one a customer previously had to phone in or walk into a branch for. Blocking a compromised account, upgrading a tier, checking whether a transfer actually landed, pulling a statement, disputing a transaction. The portal\u2019s own promise is a one-stop hub for quick fixes and easy access, and the work was making that true rather than aspirational.",
      "The journeys are not equal, and the interface says so. Blocking an account is the one someone reaches in a panic, on a phone, possibly while a fraudulent transaction is still running, so it is stated first and in the plainest language on the page: suspect unauthorised activity, block your account now.",
      "The rest are ordinary maintenance. Upgrade an account, check a NIP transfer status, request a statement, log a dispute. Each is a self-contained flow that ends in a confirmation the customer can act on, rather than a form that submits into silence.",
    ],
    challenges: [
      "One of these journeys is an emergency and the others are errands. Giving the urgent one the prominence it needs without making the routine ones feel like alarms.",
      "Writing banking copy that a customer under stress can follow. The account-blocking flow in particular had to read as instructions, not as terms and conditions.",
      "Every flow touches money or identity, so each one needed a clear confirmation state. A self-service tool that leaves the customer unsure whether it worked has sent them back to the call centre anyway.",
    ],
    features: [
      {
        name: "Block my account",
        description:
          "The emergency path, stated first: suspected unauthorised activity, blocked immediately, without waiting on a call centre queue.",
      },
      {
        name: "NIP transfer status",
        description:
          "A direct answer to the most common support question in Nigerian retail banking, whether an interbank transfer has actually gone through.",
      },
      {
        name: "Statements, upgrades and disputes",
        description:
          "Account statement requests, tier upgrades, and dispute logging, each a self-contained flow ending in a confirmation rather than a submitted form.",
      },
    ],
    cover: {
      accent: 3,
      image: {
        src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1788447753/Screenshot_2026-09-03_at_15.24.38_h3opr8.png",
        alt: "FCMB Self-service homepage, desktop",
      },
    },
    gallery: [
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1788447753/Screenshot_2026-09-03_at_15.24.38_h3opr8.png",
            alt: "FCMB Self-service homepage, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site: selfservice.fcmb.com",
      },
      {
        cover: {
          accent: 1,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1788447792/Screenshot_2026-09-03_at_16.02.49_k8grgf.png",
            alt: "FCMB Self-service block my account, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site: selfservice.fcmb.com",
      },
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1788447740/iPhone_XR_2_vfk97c.png",
            alt: "FCMB Self-service homepage, mobile",
          },
        },
        aspect: "portrait",
        caption: "Live site: selfservice.fcmb.com",
      },
    ],
    featured: false,
    order: 14,
  },

  {
    slug: "bookmolly",
    title: "Bookmolly",
    year: 2025,
    category: "Product Engineering",
    tags: ["Next.js", "Payments", "Caching"],
    client: "Bookmolly",
    role: ["Senior Full-Stack Engineer (Contract)"],
    timeline: "3 months",
    url: "https://www.bookmolly.com/",
    summary:
      "A Next.js booking platform serving 500+ businesses, with real-time scheduling and secure payments.",
    body: [
      "Bookmolly needed a booking platform that could handle real-time scheduling, service filtering, and payments without falling over under demand from hundreds of businesses.",
      "I built the platform in Next.js and improved booking reliability by 25% through caching strategies and backend enhancements, while also leading frontend performance audits to keep the experience consistent across every page.",
      "Live at bookmolly.com.",
    ],
    challenges: [
      "Simplifying the process of discovering and booking beauty and lifestyle services by providing a centralized, easy-to-navigate platform.",
      "Addressing the challenge of real-time scheduling and availability for multiple service providers to prevent double bookings and improve user trust.",
      "Ensuring secure and smooth payment transactions within the platform to build confidence and reduce friction for users.",
      "Delivering a responsive and accessible user experience that meets the needs of diverse users across devices and locations.",
    ],
    features: [
      {
        name: "Seamless Service Booking",
        description:
          "Enable users to easily browse and book beauty and lifestyle services with real-time availability and scheduling.",
      },
      {
        name: "Advanced Service Filtering",
        description:
          "Allow users to filter services by category, price, rating, and location, making it simple to find exactly what they need.",
      },
      {
        name: "Secure Payment Processing",
        description:
          "Integrate trusted payment gateways to handle transactions securely and efficiently, giving users confidence in the platform.",
      },
      {
        name: "User Account Management",
        description:
          "Provide customers and service providers with personalized dashboards to manage bookings, profiles, and reviews.",
      },
      {
        name: "Responsive and Intuitive UI",
        description:
          "Deliver a mobile-friendly, visually appealing interface that ensures a smooth and engaging user experience across devices.",
      },
      {
        name: "Service Provider Profiles",
        description:
          "Show detailed profiles including service descriptions, pricing, ratings, and reviews to help users make informed decisions.",
      },
      {
        name: "Performance Optimization",
        description:
          "Ensure fast load times and efficient interactions through optimized frontend and backend architecture.",
      },
    ],
    cover: {
      accent: 4,
      image: {
        src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184761/Screenshot_2026-08-07_at_11.06.14_dfinkm.png",
        alt: "Bookmolly homepage, desktop",
      },
    },
    gallery: [
      {
        cover: {
          accent: 4,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184761/Screenshot_2026-08-07_at_11.06.14_dfinkm.png",
            alt: "Bookmolly homepage, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site: bookmolly.com",
      },
      {
        cover: {
          accent: 4,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184762/Screenshot_2026-08-07_at_11.08.50_npgymj.png",
            alt: "Bookmolly, dashboard preview",
          },
        },
        aspect: "landscape",
        caption: "Live site: dashboard preview",
      },
      {
        cover: {
          accent: 4,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184763/www.bookmolly.com__iPhone_XR_gcwwpi.png",
            alt: "Bookmolly homepage, mobile",
          },
        },
        aspect: "portrait",
        caption: "Live site: mobile",
      },
    ],
    featured: true,
    order: 12,
  },
  {
    slug: "alpha-and-jam",
    title: "Alpha and Jam",
    year: 2023,
    category: "Marketing / Landing Page",
    tags: ["Landing Page", "Marketing", "Branding"],
    client: "Alpha and Jam",
    role: ["Frontend Developer"],
    timeline: "1 month",
    url: "https://alphaandjamafrica.com",
    summary:
      "Landing page for a dynamic media advertising company, built to communicate its services and value proposition clearly.",
    body: [
      "As the Frontend Developer for the landing page of Alpha and Jam, a dynamic media advertising company, my role involved crafting a captivating online presence that effectively communicated the essence and offerings of the company. The landing page served as an informative gateway, providing visitors with a comprehensive overview of Alpha and Jam's media advertising services, strengths, and unique value propositions.",
      "Through strategic design choices, engaging content, and user-friendly navigation, the landing page aimed to leave a lasting impression on potential clients and partners, ensuring visitors could easily grasp the company's expertise and offerings.",
    ],
    challenges: [
      "Limited showcase of success stories.",
      "Alpha and Jam had limited online visibility, hindering their ability to reach a broader audience and potential clients.",
      "Lack of information accessibility.",
      "Outdated design and branding.",
    ],
    features: [
      {
        name: "Strategic Messaging and Branding",
        description:
          "Compelling and concise messaging that communicates Alpha and Jam's core values, expertise, and unique selling propositions, with consistent branding to reinforce the company's identity.",
      },
      {
        name: "Interactive Visual Content",
        description:
          "Visually appealing graphics, videos, and animations to capture visitors' attention and communicate key aspects of Alpha and Jam's services.",
      },
      {
        name: "Service Showcase",
        description:
          "Dedicated sections showcasing the range of media advertising services offered by Alpha and Jam, highlighting case studies and past campaigns.",
      },
    ],
    cover: {
      accent: 5,
      image: {
        src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703853249/Screenshot_2023-12-29_at_13.32.38_ae3xej.png",
        alt: "Alpha and Jam, screenshot 1",
      },
    },
    gallery: [
      {
        cover: {
          accent: 5,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703853249/Screenshot_2023-12-29_at_13.32.38_ae3xej.png",
            alt: "Alpha and Jam, screenshot 1",
          },
        },
        aspect: "landscape",
        caption: "Alpha and Jam, screenshot 1",
      },
      {
        cover: {
          accent: 1,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703853290/Screenshot_2023-12-29_at_13.32.58_dblh7i.png",
            alt: "Alpha and Jam, screenshot 2",
          },
        },
        aspect: "landscape",
        caption: "Alpha and Jam, screenshot 2",
      },
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703853277/Screenshot_2023-12-29_at_13.33.14_sbjx2n.png",
            alt: "Alpha and Jam, screenshot 3",
          },
        },
        aspect: "landscape",
        caption: "Alpha and Jam, screenshot 3",
      },
    ],
    featured: true,
    order: 11,
  },
  {
    slug: "aiesec-nigeria",
    title: "AIESEC Nigeria",
    year: 2023,
    category: "Web Design & Development",
    tags: ["Web Design", "Cross-browser", "Performance"],
    client: "AIESEC Nigeria",
    role: ["Full-Stack Engineer"],
    timeline: "3 months",
    url: "https://aiesec.ng",
    summary:
      "The official website for AIESEC in Nigeria, built for responsiveness and cross-browser reliability.",
    body: [
      "Designed and developed aiesec.ng end to end, working with stakeholders to structure content and modernize the UI across the organization's digital presence.",
      "Focus areas were performance and cross-browser compatibility, making sure the site held up across the wide range of devices AIESEC's members and partners actually use.",
      "Live at aiesec.ng.",
    ],
    challenges: [
      "The previous setup resulted in scattered or fragmented information about AIESEC in Nigeria, making it challenging for visitors to find comprehensive details about events, local committees, and necessary information.",
      "Inconsistent branding.",
      "Limited interactivity.",
    ],
    features: [
      {
        name: "Local Committee Portals",
        description:
          "Dedicated sections for local committees showcase essential information about each committee, including their projects, initiatives, and team members.",
      },
      {
        name: "Event Information Hub",
        description:
          "A central hub for information related to the AIESEC International Entrepreneurship Development Congress (AIEDC) in Nigeria, including schedule, speakers, and how to get involved.",
      },
      {
        name: "Interactive Content and Engagement",
        description:
          "Interactive elements such as multimedia content and social media integration create a dynamic online environment and encourage interaction among members and the wider community.",
      },
    ],
    cover: {
      accent: 2,
      image: {
        src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184509/Screenshot_2026-08-08_at_07.01.08_xa7zbo.png",
        alt: "AIESEC Nigeria homepage, desktop",
      },
    },
    gallery: [
      {
        cover: {
          accent: 2,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184509/Screenshot_2026-08-08_at_07.01.08_xa7zbo.png",
            alt: "AIESEC Nigeria homepage, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site: aiesec.ng",
      },
      {
        cover: {
          accent: 2,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184509/Screenshot_2026-08-08_at_07.02.33_v9yyjm.png",
            alt: "AIESEC Nigeria, local committees",
          },
        },
        aspect: "landscape",
        caption: "Live site: local committees",
      },
      {
        cover: {
          accent: 2,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184509/aiesec.ng__iPhone_XR_imoxqq.png",
            alt: "AIESEC Nigeria homepage, mobile",
          },
        },
        aspect: "portrait",
        caption: "Live site: mobile",
      },
    ],
    featured: true,
    order: 10,
  },
  {
    slug: "your-study-path",
    title: "Your Study Path",
    year: 2023,
    category: "EdTech",
    tags: ["EdTech", "React", "Video"],
    client: "Your Study Path",
    role: ["Lead Frontend Developer"],
    timeline: "17 months",
    url: "https://yourstudypath.com",
    summary:
      "Led frontend on an EdTech platform in ReactJS, covering mock exams, live and recorded classes, and a class scheduling system.",
    body: [
      "As the Lead Frontend Developer at Your Study Path, I spearheaded the development of an innovative EdTech platform using ReactJS. In this pivotal role, I played a key part in crafting a dynamic and user-friendly interface for the platform, ensuring an optimal user experience for students and educators alike.",
      "My foremost initiative was to elevate the user experience and interface of the platform. Utilizing ReactJS, I led a comprehensive redesign that not only enhanced the platform's aesthetics but also greatly improved navigation, accessibility, and overall visual appeal. This transformative effort culminated in a more engaging and satisfying experience for both students and educators.",
      "Addressing a critical need for effective exam preparation, I directed the development and integration of a robust mock exam feature, offering a realistic simulation of exam scenarios for self-assessment. I also responded to scattered educational resources by creating a centralized repository for notes and materials, and solved coordination challenges by orchestrating a user-friendly class scheduling system between students and tutors, plus both recorded and live video functionalities to accommodate different learning styles.",
    ],
    features: [
      {
        name: "Mock Exam",
        description:
          "A robust mock exam feature that provided students with a realistic simulation of exam scenarios, helping them prepare effectively for actual exams.",
      },
      {
        name: "Educational Resources Repository",
        description:
          "A comprehensive repository for educational resources, including notes and materials, facilitating easy access to learning materials.",
      },
      {
        name: "Class Scheduling System",
        description:
          "A user-friendly class scheduling system enabling seamless coordination between students and tutors.",
      },
      {
        name: "Recorded Video Courses",
        description:
          "Access to pre-recorded courses at each student's own pace, reinforcing key concepts on demand.",
      },
      {
        name: "Live Video Classes",
        description:
          "Live video classes creating an interactive and engaging learning environment, fostering a sense of community.",
      },
    ],
    achievements: [
      {
        name: "Staff of the Quarter Recognition",
        description:
          "Acknowledged as Staff of the Quarter for outstanding contributions to the company.",
      },
      {
        name: "Optimized Platform Performance",
        description:
          "Achieved notable improvements in platform performance through strategic optimizations, resulting in faster load times and enhanced responsiveness.",
      },
      {
        name: "Scalable and Efficient Codebase",
        description:
          "Developed a scalable and efficient codebase, ensuring the application could handle increased user traffic and data without compromising performance.",
      },
      {
        name: "Continuous Learning and Skill Development",
        description:
          "Stayed current with the latest technologies and best practices in frontend development to bring cutting-edge solutions to the platform.",
      },
    ],
    cover: {
      accent: 1,
      image: {
        src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184665/Screenshot_2026-08-08_at_07.05.31_svomdt.png",
        alt: "Your Study Path homepage, desktop",
      },
    },
    gallery: [
      {
        cover: {
          accent: 1,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184665/Screenshot_2026-08-08_at_07.05.31_svomdt.png",
            alt: "Your Study Path homepage, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site: yourstudypath.com",
      },
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184665/Screenshot_2026-08-08_at_07.07.40_dyyqgb.png",
            alt: "Your Study Path, course view",
          },
        },
        aspect: "landscape",
        caption: "Live site: course view",
      },
      {
        cover: {
          accent: 5,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184665/www.yourstudypath.com__iPhone_XR_qkjqqm.png",
            alt: "Your Study Path homepage, mobile",
          },
        },
        aspect: "portrait",
        caption: "Live site: mobile",
      },
    ],
    featured: true,
    order: 9,
  },
  {
    slug: "anafad",
    title: "Anafad",
    year: 2025,
    category: "Corporate Site / Global Trade",
    tags: ["Web Design", "Corporate", "Trade & Finance"],
    client: "Anafad Limited",
    role: ["Frontend Developer"],
    timeline: "Nov to Dec 2025",
    url: "https://anafad.com",
    summary:
      "The site for Anafad, a global trade and investment platform connecting emerging markets with structured capital, logistics, and consultancy services.",
    body: [
      "Anafad positions itself around one idea: that high-level advisory and hands-on operational execution should be one integrated service, not two separate vendors. The site had to carry that across three genuinely different service lines (HR and corporate consultancy, trade and logistics, capital structuring) without reading as three unrelated businesses sharing a homepage.",
      "I built the site around a clear service-pillar structure: Strategic Business Solutions & HR Consultancy, Trade Support & Global Logistics, and Capital Structuring & Financial Intelligence, each stated in its own terms, then tied back together under a single 'full spectrum' section (trade exchange brokerage, bespoke procurement, business consulting, project management) so the breadth reads as range, not sprawl.",
      "Live at anafad.com.",
    ],
    challenges: [
      "Keeping three distinct service pillars (consultancy, trade/logistics, capital) legible as one integrated firm rather than three loosely related offerings on the same page.",
      "Writing for a B2B audience (investors, partners, corporates) that needs to feel institutional confidence from the first screen, without the copy tipping into vague jargon.",
      "Structuring a lean marketing site (home, about, contact) so it still feels substantial for a firm operating across multiple jurisdictions.",
    ],
    features: [
      {
        name: "Three-pillar service structure",
        description:
          "Strategic Business Solutions & HR Consultancy, Trade Support & Global Logistics, and Capital Structuring & Financial Intelligence, each given its own dedicated section with its own argument.",
      },
      {
        name: "Full spectrum of services",
        description:
          "A secondary section (trade exchange brokerage, bespoke procurement, business consulting, project management) that extends the three pillars into concrete, named services.",
      },
      {
        name: "Institutional visual language",
        description:
          "Navy-and-crest branding and a restrained layout built to read as an established international trade and advisory firm.",
      },
    ],
    cover: {
      accent: 3,
      image: {
        src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184721/Screenshot_2026-08-07_at_10.56.07_zhkynp.png",
        alt: "Anafad homepage, desktop",
      },
    },
    gallery: [
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184721/Screenshot_2026-08-07_at_10.56.07_zhkynp.png",
            alt: "Anafad homepage, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site: anafad.com",
      },
      {
        cover: {
          accent: 4,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184721/Screenshot_2026-08-07_at_10.56.20_tujece.png",
            alt: "Anafad, services detail",
          },
        },
        aspect: "landscape",
        caption: "Live site: services",
      },
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184722/www.anafad.com__iPhone_XR_gqgua5.png",
            alt: "Anafad homepage, mobile",
          },
        },
        aspect: "portrait",
        caption: "Live site: mobile",
      },
    ],
    featured: true,
    order: 8,
  },
  {
    slug: "strathmore-energy",
    title: "Strathmore Energy",
    year: 2025,
    category: "Corporate Site / Energy Advisory",
    tags: ["Next.js", "Corporate", "Energy"],
    client: "Strathmore Energy Limited",
    role: ["Frontend Developer"],
    timeline: "Nov to Dec 2025",
    url: "https://www.strathmoreservice.com/",
    summary:
      "The site for Strathmore Energy, a strategic advisory and execution firm working to de-risk capital and improve project certainty across Africa's energy sector.",
    body: [
      "Strathmore's whole pitch is that capital de-risking, technical execution, and local operational excellence shouldn't be managed in isolation. They should be integrated into one path from funding to first oil. The site needed a way to make that path itself visible, not just described.",
      "The centerpiece is a capital-stack progression (Feasibility, Structuring, Execution, First Oil) laid over real project imagery, so a visitor can see where in that stack Strathmore actually operates before reading a single paragraph of copy. Built and shipped on Next.js.",
      "Live at strathmoreservice.com.",
    ],
    challenges: [
      "Communicating a technical, capital-markets-adjacent pitch (de-risking, capital structuring, project execution) to a sophisticated investor/operator audience without losing clarity to jargon.",
      "Making the 'integrated' positioning (technical, financial, and operational expertise as one offer) visible in the structure of the page itself, not just asserted in the copy.",
    ],
    features: [
      {
        name: "The capital stack",
        description:
          "A four-stage progression (Feasibility, Structuring, Execution, First Oil) that frames every other section of the site in terms of where it sits on the path to a funded, running project.",
      },
      {
        name: "Mission and sector framing",
        description:
          "A clear statement of Strathmore's role as a trusted partner across Africa's energy sector, backing the capital stack with the firm's actual mandate.",
      },
    ],
    cover: {
      accent: 5,
      image: {
        src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786185013/Screenshot_2026-08-07_at_10.58.36_maxveq.png",
        alt: "Strathmore Energy homepage, desktop",
      },
    },
    gallery: [
      {
        cover: {
          accent: 5,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786185013/Screenshot_2026-08-07_at_10.58.36_maxveq.png",
            alt: "Strathmore Energy homepage, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site: strathmoreservice.com",
      },
      {
        cover: {
          accent: 1,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786185014/Screenshot_2026-08-07_at_10.58.51_iwhqln.png",
            alt: "Strathmore Energy, services detail",
          },
        },
        aspect: "landscape",
        caption: "Live site: services",
      },
      {
        cover: {
          accent: 5,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786185016/www.strathmoreservice.com_services_iPhone_XR_yy6cur.png",
            alt: "Strathmore Energy homepage, mobile",
          },
        },
        aspect: "portrait",
        caption: "Live site: mobile",
      },
    ],
    featured: false,
    order: 7,
  },
  {
    slug: "one-click-africa",
    title: "One Click Africa",
    year: 2025,
    category: "Media / News Aggregation",
    tags: ["Full-Stack", "News Aggregation", "Performance"],
    client: "One Click Africa",
    role: ["Full-Stack Developer"],
    timeline: "1 month",
    url: "https://www.oneclickafrica.com/",
    summary:
      "One of Africa's leading news aggregator platforms, a centralized hub consolidating news from diverse African sources.",
    body: [
      "As a Full-Stack Developer for One Click Africa, I helped build and maintain one of Africa's leading news aggregator platforms. The website consolidates news from diverse African sources, providing users with a centralized, easy-to-navigate hub for timely and relevant news updates.",
      "I focused on delivering a fast, responsive interface and efficient backend architecture to handle large volumes of data and frequent updates.",
    ],
    challenges: [
      "Centralizing news content from diverse African sources to provide users with a single, trusted platform for current events.",
      "Handling the large volume and frequency of news updates efficiently while maintaining fast load times.",
      "Ensuring accessibility and usability across devices to reach a wide audience with varying internet capabilities.",
      "Providing personalized content options to enhance user engagement and satisfaction.",
    ],
    features: [
      {
        name: "Comprehensive News Aggregation",
        description:
          "Aggregate news articles from multiple trusted African news sources to provide users with diverse perspectives and up-to-date information.",
      },
      {
        name: "Real-Time Updates",
        description:
          "Ensure the platform refreshes content regularly to deliver the latest news as it happens.",
      },
      {
        name: "User-Friendly Navigation",
        description:
          "Offer intuitive categorization and search features so users can quickly find news by topic, region, or source.",
      },
      {
        name: "Responsive Design",
        description:
          "Deliver a seamless experience across devices, allowing users to stay informed whether on desktop or mobile.",
      },
      {
        name: "Performance Optimization",
        description:
          "Optimize backend and frontend performance to handle high traffic and large datasets efficiently.",
      },
      {
        name: "Customizable News Feed",
        description:
          "Allow users to personalize their news feed based on interests and preferred news categories.",
      },
      {
        name: "Social Sharing",
        description:
          "Enable easy sharing of news articles across social media platforms to increase engagement and reach.",
      },
    ],
    cover: {
      accent: 2,
      image: {
        src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184952/Screenshot_2026-08-07_at_11.15.20_qe5rjz.png",
        alt: "One Click Africa homepage, desktop",
      },
    },
    gallery: [
      {
        cover: {
          accent: 2,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184952/Screenshot_2026-08-07_at_11.15.20_qe5rjz.png",
            alt: "One Click Africa homepage, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site: oneclickafrica.com",
      },
      {
        cover: {
          accent: 4,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184953/Screenshot_2026-08-07_at_11.16.28_sisclw.png",
            alt: "One Click Africa, article view",
          },
        },
        aspect: "landscape",
        caption: "Live site: article view",
      },
      {
        cover: {
          accent: 5,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184950/oneclickafrica.com__iPhone_XR_fuwkno.png",
            alt: "One Click Africa homepage, mobile",
          },
        },
        aspect: "portrait",
        caption: "Live site: mobile",
      },
    ],
    featured: false,
    order: 6,
  },
  {
    slug: "aiesec-international-youth-day",
    title: "AIESEC in Nigeria International Youth Day",
    year: 2023,
    category: "Event Landing Page",
    tags: ["Landing Page", "Nonprofit", "Event"],
    client: "AIESEC in Nigeria",
    role: ["Frontend Developer"],
    timeline: "2 weeks",
    url: "https://ainiyd2023.netlify.app",
    summary:
      "A landing page for AIESEC in Nigeria's International Youth Day event, built to drive signups.",
    body: [
      "As the Frontend Developer for the AIESEC in Nigeria International Youth Day landing page, I spearheaded the creation of a visually engaging and user-friendly web experience. Responsible for designing and implementing the frontend components, I crafted a compelling landing page that effectively communicated the significance of International Youth Day and seamlessly guided visitors to the signup process.",
      "Through strategic design choices and optimization for various devices, I ensured a cohesive and positive user experience, contributing to a visually striking landing page that captured the spirit of the initiative and successfully facilitated user engagement and signups for the event.",
    ],
    challenges: [
      "Limited social media sharing.",
      "User engagement challenges.",
    ],
    features: [
      {
        name: "Clear Call-to-Action (CTA)",
        description:
          "A prominent and clear call-to-action, encouraging visitors to sign up for the event, strategically placed to maximize visibility and drive engagement.",
      },
      {
        name: "Brand Consistency",
        description:
          "Visual elements and design choices aligned with AIESEC's branding guidelines, reinforcing a cohesive and professional image for the initiative.",
      },
    ],
    cover: {
      accent: 3,
      image: {
        src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184618/Screenshot_2026-08-08_at_07.09.04_n70kh6.png",
        alt: "AIESEC International Youth Day homepage, desktop",
      },
    },
    gallery: [
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184618/Screenshot_2026-08-08_at_07.09.04_n70kh6.png",
            alt: "AIESEC International Youth Day homepage, desktop",
          },
        },
        aspect: "landscape",
        caption: "Live site: ainiyd2023.netlify.app",
      },
      {
        cover: {
          accent: 2,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184618/Screenshot_2026-08-08_at_07.08.49_hzhcg2.png",
            alt: "AIESEC International Youth Day, signup section",
          },
        },
        aspect: "landscape",
        caption: "Live site: signup section",
      },
      {
        cover: {
          accent: 4,
          image: {
            src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1786184617/ainiyd2023.netlify.app__iPhone_XR_joaa7b.png",
            alt: "AIESEC International Youth Day homepage, mobile",
          },
        },
        aspect: "portrait",
        caption: "Live site: mobile",
      },
    ],
    featured: false,
    order: 5,
  },
  {
    slug: "scorenownow",
    title: "ScoreNowNow",
    year: 2023,
    category: "Sports Media",
    tags: ["Real-Time Data", "Sports", "Lead Frontend"],
    client: "ScoreNowNow",
    role: ["Lead Frontend Developer"],
    timeline: "12 months",
    url: "https://scorenownow.com",
    live: false,
    summary:
      "A football live-score platform delivering real-time match updates, fixtures, and historical archives.",
    body: [
      "As the Frontend Developer for ScoreNowNow, I led the development of a cutting-edge football live score website that offers users a comprehensive and real-time experience of football events. The platform provides live updates for ongoing matches, detailing key events such as goals, assists, and cards, ensuring fans stay instantly informed.",
      "The user interface is designed for intuitive navigation, allowing users to seamlessly explore past match results and preview upcoming fixtures, with a focus on responsive design so the site holds up across devices for football enthusiasts passionate about staying connected in real-time.",
    ],
    challenges: [
      "Delayed or inaccurate updates.",
      "Lack of fixture planning.",
      "Limited historical data exploration.",
      "Fragmented team and player information.",
    ],
    features: [
      {
        name: "Real-Time Match Updates",
        description:
          "Live and instantaneous updates for ongoing football matches, including scores, goals, assists, cards, and other crucial events.",
      },
      {
        name: "Comprehensive Match Information",
        description:
          "Detailed match information, including team line-ups, formations, and statistics.",
      },
      {
        name: "Fixture Calendar",
        description:
          "A fixture calendar showcasing past, present, and upcoming matches, allowing users to plan their engagement on a daily, weekly, or monthly basis.",
      },
      {
        name: "Multi-League Coverage",
        description:
          "Coverage of multiple football leagues, ensuring users can follow their favorite teams and players across various competitions globally.",
      },
      {
        name: "Historical Match Archives",
        description:
          "Access to historical match archives, allowing users to explore past results, statistics, and memorable moments from previous seasons.",
      },
      {
        name: "Team and Player Profiles",
        description:
          "Dedicated sections for team and player profiles, offering in-depth information, statistics, and performance histories.",
      },
    ],
    cover: {
      accent: 3,
      image: {
        src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703853963/Screenshot_2023-12-29_at_13.45.13_aqzgjl.png",
        alt: "ScoreNowNow, screenshot 1",
      },
    },
    gallery: [
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703853963/Screenshot_2023-12-29_at_13.45.13_aqzgjl.png",
            alt: "ScoreNowNow, screenshot 1",
          },
        },
        aspect: "landscape",
        caption: "ScoreNowNow, screenshot 1",
      },
      {
        cover: {
          accent: 1,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703853964/Screenshot_2023-12-29_at_13.43.05_dljitm.png",
            alt: "ScoreNowNow, screenshot 2",
          },
        },
        aspect: "landscape",
        caption: "ScoreNowNow, screenshot 2",
      },
      {
        cover: {
          accent: 4,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703853967/Screenshot_2023-12-29_at_13.44.18_gdtvrh.png",
            alt: "ScoreNowNow, screenshot 3",
          },
        },
        aspect: "landscape",
        caption: "ScoreNowNow, screenshot 3",
      },
    ],
    featured: false,
    order: 4,
  },
  {
    slug: "sportdm",
    title: "SportDm",
    year: 2023,
    category: "Sports Media",
    tags: ["Content", "Sports", "Lead Frontend"],
    client: "SportDm",
    role: ["Lead Frontend Developer"],
    timeline: "12 months",
    url: "https://sportdm.com",
    live: false,
    summary:
      "A sports news platform delivering real-time news, highlights, and analysis, built in tandem with ScoreNowNow.",
    body: [
      "As the Frontend Developer for SportDM, a sports news update platform that collaborates closely with ScoreNowNow, I spearheaded the development of an immersive and dynamic website dedicated to delivering real-time sports news and updates. SportDM serves as a go-to source for enthusiasts seeking the latest information, highlights, and insights across a spectrum of sports.",
      "The collaboration between SportDM and ScoreNowNow ensures users have a complete and enriching sports experience, combining live scores with the latest news for a holistic view of the sports world.",
    ],
    challenges: [
      "Ineffective content discovery.",
      "Information overload.",
      "Lack of real-time updates.",
    ],
    features: [
      {
        name: "Real-Time News Updates",
        description:
          "Instantaneous delivery of breaking news, match highlights, and in-depth analyses across a variety of sports.",
      },
      {
        name: "Rich Media Content",
        description:
          "Integration of rich media content, including images, videos, and interactive graphics, to enhance the storytelling experience.",
      },
      {
        name: "Search and Explore Features",
        description:
          "Robust search and explore functionalities that allow users to find specific news articles and quickly access the information they're looking for.",
      },
      {
        name: "Collaboration with ScoreNowNow",
        description:
          "Seamless collaboration where users can transition from live scores on ScoreNowNow to in-depth news and analyses on SportDM.",
      },
    ],
    cover: {
      accent: 2,
      image: {
        src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703854323/Screenshot_2023-12-29_at_13.50.33_bmoot5.png",
        alt: "SportDm, screenshot 1",
      },
    },
    gallery: [
      {
        cover: {
          accent: 2,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703854323/Screenshot_2023-12-29_at_13.50.33_bmoot5.png",
            alt: "SportDm, screenshot 1",
          },
        },
        aspect: "landscape",
        caption: "SportDm, screenshot 1",
      },
      {
        cover: {
          accent: 5,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703854323/Screenshot_2023-12-29_at_13.51.21_d6zbr1.png",
            alt: "SportDm, screenshot 2",
          },
        },
        aspect: "landscape",
        caption: "SportDm, screenshot 2",
      },
      {
        cover: {
          accent: 3,
          image: {
            src: "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703854325/Screenshot_2023-12-29_at_13.50.51_cyj7qx.png",
            alt: "SportDm, screenshot 3",
          },
        },
        aspect: "landscape",
        caption: "SportDm, screenshot 3",
      },
    ],
    featured: false,
    order: 3,
  },
  {
    slug: "criterion-homes",
    title: "Criterion Homes",
    year: 2024,
    category: "Real Estate / Frontend",
    tags: ["React", "UI", "Performance"],
    client: "Criterion Homes",
    role: ["Frontend Engineer (Contract)"],
    timeline: "1 month",
    url: "https://criterionhomesltd.com/",
    live: true,
    summary:
      "Frontend for a real estate platform with dynamic property search and listing interfaces.",
    body: [
      "Built dynamic property search, filtering, and listing interfaces in React, tailored to diverse housing needs.",
      "Focused on responsive components and rendering performance to keep browsing smooth across devices.",
    ],
    challenges: [
      "Simplifying the process for users to find properties that meet their specific criteria (location, price, size, etc.) with advanced search filters and a user-friendly interface.",
      "Providing users with detailed profiles and reviews of real estate agents to foster trust and transparency in agent-client interactions.",
      "Digitizing and automating property transactions and communication to reduce delays, paperwork, and human error, improving the speed and efficiency of buying/selling properties.",
      "Addressing concerns around data security and transaction safety by ensuring a secure platform, minimizing the risks of fraud.",
    ],
    features: [
      {
        name: "User-Friendly Property Search",
        description:
          "Implement advanced search filters and intuitive navigation, allowing users to easily find properties based on location, price range, and preferences.",
      },
      {
        name: "Agent Transparency",
        description:
          "Provide detailed agent profiles, including reviews and ratings, to build trust and improve client-agent interactions.",
      },
      {
        name: "Real-Time Property Listings",
        description:
          "Offer up-to-date property information with real-time updates on availability, pricing, and status changes to eliminate outdated listings.",
      },
      {
        name: "Secure Payment Gateway Integration",
        description:
          "Integrate reliable and secure payment gateways to allow seamless online transactions for property purchases or deposits.",
      },
      {
        name: "Property Comparison Tool",
        description:
          "Enable users to compare multiple properties side-by-side to make well-informed decisions quickly and efficiently.",
      },
      {
        name: "Automated Communication and Scheduling",
        description:
          "Simplify agent-client interactions with automated scheduling tools and messaging systems for property viewings and negotiations.",
      },
      {
        name: "Secure Data Handling",
        description:
          "Ensure robust security measures for data protection and secure transactions to enhance user trust and minimize fraud risk.",
      },
    ],
    cover: { accent: 3 },
    gallery: [
      {
        cover: { accent: 3 },
        aspect: "portrait",
        caption: "Property search & filtering",
      },
    ],
    featured: false,
    order: 2,
  },
  {
    slug: "ise-school",
    title: "Ise School",
    year: 2024,
    category: "EdTech",
    tags: ["Gamification", "Caching", "Leadership"],
    client: "Ise School",
    role: ["Technical Lead / Software Engineer"],
    timeline: "1 year",
    url: "https://iseschool.co/",
    live: false,
    summary:
      "Technical lead on an EdTech platform giving students a launchpad into technical careers.",
    body: [
      "As technical lead, I introduced gamified learning flows that drove a 10% spike in user interest, and optimized overall platform efficiency by 20% through caching and reusable components.",
      "Led engineering end-to-end on a platform built for students just starting out in tech.",
    ],
    features: [
      {
        name: "Recorded Classes",
        description:
          "Students could access previously recorded classes, allowing them to review course material at their own pace or catch up on missed lectures.",
      },
      {
        name: "Quizzes",
        description:
          "The platform offered interactive quizzes to assess students' understanding of course topics and track their progress.",
      },
      {
        name: "Resources",
        description:
          "A repository of educational materials, including lecture notes, study guides, and supplementary resources, provided students with additional support for their studies.",
      },
      {
        name: "Tutor Support",
        description:
          "Students had access to tutoring services, enabling them to seek assistance from qualified tutors for personalized academic guidance and clarification on complex topics.",
      },
      {
        name: "Collaboration Hub",
        description:
          "The collaboration hub facilitated communication and collaboration among students, teachers, and peers, fostering a dynamic learning environment through discussions, group projects, and shared resources.",
      },
      {
        name: "Referrals",
        description:
          "The referral feature allowed students to refer friends or colleagues to the platform, potentially earning rewards or incentives for successful referrals and contributing to the growth of the user community.",
      },
    ],
    achievements: [
      {
        name: "Problem Solver for 2023",
        description: "Won the problem solver award for 2023.",
      },
      {
        name: "Zen Master (Engineering)",
        description: "Won the best tech team member award for 2023.",
      },
    ],
    cover: { accent: 5 },
    gallery: [
      {
        cover: { accent: 5 },
        aspect: "square",
        caption: "Gamified learning flow",
      },
      { cover: { accent: 3 }, aspect: "wide", caption: "Student dashboard" },
    ],
    featured: false,
    order: 1,
  },
];
