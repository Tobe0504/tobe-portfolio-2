import type { JournalPost } from "./types";

// A personal notebook rather than a publishing schedule. The numbers in the
// Nigeria entry come from its forecast outputs: if those are re-run, update
// the prose alongside the data files.
export const journalPosts: JournalPost[] = [
  {
    slug: "where-violence-comes-next",
    title: "Where violence comes next",
    date: "2026-11-09",
    excerpt:
      "I rebuilt my statistics project into a forecast of fatal violence across Nigeria’s 774 local governments, marked it against 2026, and looked ahead to 2030.",
    coverImage: {
      src: "/journal/where-violence-comes-next.jpg",
      alt: "Map of Nigeria’s local government areas shaded by forecast risk for 2027, darkest in the north-east",
    },
    tags: ["Data", "Nigeria"],
    readingTime: 8,
    body: [
      {
        type: "paragraph",
        text: "This started as my BSc project in statistics at the University of Lagos. I recently went back and redid it properly, for all 774 local government areas, month by month, with one plain question: given where people have been killed so far, can we say where it is likely to happen next?",
      },
      {
        type: "paragraph",
        text: "I’ve been calling it my terrorism project, but political violence is the honest term. The data is the Uppsala Conflict Data Program’s event record, and it counts every clash with at least one death involving the state, an armed group or a communal militia, plus attacks on civilians. Boko Haram is in there. So are farmer–herder killings and fights between communities.",
      },
      {
        type: "paragraph",
        text: "It is easy to forget what the unit of measurement is on charts like these. Every event below is at least one person who didn’t come home. UCDP’s best estimate for Nigeria between 2010 and 2025 is about 61,800 deaths.",
      },
      {
        type: "figure",
        figure: "atlas-stats",
        wide: true,
      },
      { type: "heading", text: "Checking my own forecast" },
      {
        type: "paragraph",
        text: "A forecast is only worth something if you go back and mark it. In December 2025 the model forecast 454 fatal events for January to September 2026. UCDP has since recorded 493 with identified actors, 9% more, and every one of the nine months landed inside the forecast’s 80% range. Location held up too: the 10% of local governments it flagged held 63% of those events.",
      },
      {
        type: "figure",
        figure: "atlas-scorecard",
        caption: "Final 2026 figures should land between the solid and dashed lines once UCDP finishes checking its preliminary data.",
      },
      {
        type: "paragraph",
        text: "Then there is the part it got wrong. Including events UCDP is still checking, mostly attacks by unidentified gunmen, the preliminary total is 1,155. Those attacks surged in the north-west and Plateau, exactly where the model was weakest. Plateau was forecast 33 events and has 193 once unconfirmed ones are counted. Zamfara was forecast 5 and has 100. And while the model beat simply carrying last year forward on overall ranking, its top 5% caught 54% of events against 53% for that naive approach, which is close to a tie.",
      },
      {
        type: "figure",
        figure: "atlas-scorecard-tables",
        wide: true,
        caption: "Forecast from december 2025. Recorded counts identified actors; the last column adds preliminary events still being checked.",
      },
      { type: "heading", text: "The map" },
      {
        type: "paragraph",
        text: "Each local government is shaded by its forecast chance of at least one fatal event. Drag the slider from October 2026 through December 2027, switch to what has actually happened in 2026, or pick a state to zoom in.",
      },
      {
        type: "figure",
        figure: "atlas-map",
        wide: true,
        caption: "Forecasts use events through september 2026. Local expected counts ran about 15% high in testing, so read them as a ranking.",
      },
      {
        type: "paragraph",
        text: "For 2027, 11 of the 15 local governments with the most expected events are in Borno, led by Gwoza, Bama and Konduga. Outside the north-east, Plateau’s Barkin Ladi and Mangu lead.",
      },
      {
        type: "paragraph",
        text: "One warning before you read too much into the pale parts of the map. The north-west looks calm, and it isn’t. Banditry there is barely captured by this dataset: Zamfara has 26 recorded events in 16 years. Low risk on this map can simply mean no data.",
      },
      { type: "heading", text: "About 615 events in 2027, month by month" },
      {
        type: "paragraph",
        text: "The monthly model expects violence to hold near today’s level: about 47 events with identified actors in November 2026, with an 80% range of 35 to 61, and 615 across 2027. If UCDP confirms many of 2026’s unidentified-attacker events, the true level, and these forecasts once refitted, will be higher.",
      },
      {
        type: "figure",
        figure: "atlas-national",
        wide: true,
        caption: "Monthly events with at least one death, located to a local government. The forecast is recalibrated by its 2022–2025 record; ranges show where past errors at the same lead time fell.",
      },
      { type: "heading", text: "2027 to 2030" },
      {
        type: "paragraph",
        text: "Past 2027 the question changes from where to how much, so I switched methods. For national totals, the rule that forecast past years best was the plainest one: the average of the last three years, corrected for its habit of running low. In backtests it missed by 14–18% on average, one to four years ahead.",
      },
      {
        type: "paragraph",
        text: "That rule puts 2027 at about 650 events, with an 80% range of 500 to 850, a little above the monthly model’s 615 because the two are built differently. From 2028 to 2030 it stays between roughly 650 and 690. For comparison, 2026 is on course for about 625: 493 recorded through September plus 132 forecast for the last quarter.",
      },
      {
        type: "paragraph",
        text: "Read that flat line carefully. It doesn’t mean things will stay the same. It means nothing I tested could see turning points years ahead, which is why the ranges stay this wide.",
      },
      {
        type: "figure",
        figure: "atlas-outlook",
        wide: true,
        caption: "Identified-actor events. The 2026 bar adds the october–december forecast; 2027–2030 use the bias-corrected three-year average.",
      },
      { type: "heading", text: "How far ahead can you see?" },
      {
        type: "paragraph",
        text: "At the level of individual places, further than I expected. One month out, the 39 local governments the model ranks highest hold 64% of the next month’s events. A year out they still hold 59%, and two years out 57%. The model beats simply carrying last year’s average forward up to about 18 months, and after that the gap closes.",
      },
      {
        type: "figure",
        figure: "atlas-horizon",
        caption: "PR-AUC on 2022–2025, pooled over 25 forecast origins per lead time. Higher is better.",
      },
      {
        type: "paragraph",
        text: "I tried several models, fitted on 2012–2021 and judged on 2022–2025, four years they never saw. That is 37,152 local-government-months. Averaging a negative binomial regression with a Hawkes process ranked them best. The Markov chain is the easiest to explain and it trails, and assuming last month repeats is the worst of the lot.",
      },
      {
        type: "figure",
        figure: "atlas-models",
        caption: "One-month-ahead PR-AUC with 95% bootstrap intervals. The dashed line is a forecaster with no skill.",
      },
      { type: "heading", text: "Violence spreads" },
      {
        type: "paragraph",
        text: "The strongest thing in the data is also the bleakest. A quiet local government is 26 times more likely to turn violent next month if its neighbours were heavily active last month.",
      },
      {
        type: "figure",
        figure: "atlas-contagion",
        caption: "Chance a quiet local government turns violent next month, by what its neighbours did. Spatial Markov chain, 2012–2021.",
      },
      {
        type: "paragraph",
        text: "The Hawkes process puts a number on that contagion. Each event sets off about 0.69 further events, so roughly 68% of all events trace back to an earlier one. The extra risk sits within a few kilometres and halves after about 48 days. Because each event triggers fewer than one more, outbreaks burn out on their own unless new violence keeps feeding them.",
      },
      {
        type: "figure",
        figure: "atlas-drivers",
        caption: "Rate ratios from the negative binomial model, 2012–2021. A value of 2× doubles expected events, holding everything else fixed.",
      },
      { type: "heading", text: "Read with care" },
      {
        type: "list",
        items: [
          "2026 is preliminary. UCDP revises its candidate data before the final release. 57% of Nigeria’s 2026 events so far have unidentified attackers, and because final UCDP data has never kept such events, the model uses identified actors only and treats the rest as an upper bound.",
          "Fatal events only. Kidnappings and non-lethal attacks are missing.",
          "Patterns, not causes. The model knows where violence has been, not why. Poverty, population and displacement aren’t in it yet.",
          "New violence is hard. 18% of test-period events struck places that had been quiet for the previous year, and the forecasts help only a little there.",
          "Local counts are a ranking. Per-area expected counts ran about 15% high in testing. Only the national totals are recalibrated."
        ],
      },
      { type: "heading", text: "How it was built" },
      {
        type: "paragraph",
        text: "I used 7,015 events from 2010–2025 that could be placed in a specific local government, 91% of all Nigerian events in UCDP’s GED v26.1, joined to geoBoundaries’ 774 areas, then added UCDP’s preliminary events for January to September 2026. The main model regresses next month’s events on each area’s recent violence, its neighbours’ violence, the jihadist share of past events, distance to Lake Chad and the land border, area and the rainy season. Forecasts beyond one month use a separate model for each lead time, refitted on data through September 2026.",
      },
      {
        type: "paragraph",
        text: "Data: UCDP GED v26.1 and Candidate v26.01.26.09 (Sundberg & Melander, 2013; Hegre et al., 2020). Boundaries: geoBoundaries (CC BY 4.0).",
      },
    ],
  },
  {
    slug: "the-bar-might-be-in-hell",
    title: "The bar might be in hell",
    date: "2026-09-03",
    excerpt:
      "Somewhere between then and now, the bar fell. Nobody announced it.",
    coverImage: {
      src: "https://res.cloudinary.com/dryjxk5jw/image/upload/v1788434897/__27_k0xmzs.jpg",
      alt: "Illustrated portrait of friends laughing together",
    },
    tags: ["Life"],
    readingTime: 5,
    body: [
      {
        type: "paragraph",
        text: "I was reading about ordinary life recently. Not history history. Just people. The boring parts. How they married. How they raised children. How friendships lasted. The things nobody writes movies about because they're too ordinary.",
      },
      {
        type: "paragraph",
        text: "Somewhere in the middle of all that, I started laughing. Not because life back then was better. I'm sure it wasn't. Every generation gets its own premium package of problems. It was because I kept stumbling on things that used to be normal and reading them like plot twists.",
      },
      {
        type: "paragraph",
        text: "People stayed married. Neighbours knew your name. Friendships somehow survived not speaking every day.",
      },
      {
        type: "paragraph",
        text: "Imagine.",
      },
      {
        type: "paragraph",
        text: "Mind you, I am very much part of these issues. This is probably rage bait. A report card for how well we the destroyers of societal morals have done so far.",
      },
      {
        type: "paragraph",
        text: "Somewhere between then and now, the bar fell. Nobody announced it. One day we all just looked down and thought, “Fair enough.”",
      },
      {
        type: "paragraph",
        text: "Now everything feels negotiable. Love is negotiable. Friendships, negotiable. Showing up is negotiable. Replying to messages? That's practically an act of charity.",
      },
      {
        type: "paragraph",
        text: "We've become very good at almost. Almost committing. Almost calling. Almost visiting. It's like we're all permanently buffering.",
      },
      {
        type: "paragraph",
        text: "Situationships, whoever came up with it is just great. It's a relationship that refuses to admit it's a relationship.",
      },
      {
        type: "paragraph",
        text: "Like somebody filled out all the forms but refused to sign at the bottom.",
      },
      {
        type: "paragraph",
        text: "“We're just seeing where it goes.” Fair enough.",
      },
      {
        type: "paragraph",
        text: "But it's been going for nine months now. At this point it should've arrived somewhere.",
      },
      {
        type: "paragraph",
        text: "I understand why, though. Love has become expensive. Not financially. Emotionally.",
      },
      {
        type: "paragraph",
        text: "Everybody knows somebody who gave everything they had to one person and got a motivational quote in return. So now we negotiate with our hearts. No labels. No expectations. No pressure. If anything goes wrong, everybody can pretend nobody was really there. The bar quietly moves again.",
      },
      {
        type: "paragraph",
        text: "And friendship. Friendship is interesting.",
      },
      {
        type: "paragraph",
        text: "I miss when friends just existed. Nobody had to schedule a phone call three weeks in advance. You'd knock on someone's gate. If they were home, fantastic. If they weren't, you came back later. Simple.",
      },
      {
        type: "paragraph",
        text: "Now I sometimes have to text people before I call them. To ask if I can call them. To ask if they're free to answer the call I'm asking permission to make. Communication has somehow developed a prequel.",
      },
      {
        type: "paragraph",
        text: "Then there's social media. I have a complicated relationship with it because, honestly, I enjoy it. I've laughed too much online to become one of those “delete Instagram and go outside” people. Besides, half of us met genuinely wonderful people because of the internet.",
      },
      {
        type: "paragraph",
        text: "The internet isn't the villain. It's just loud.",
      },
      {
        type: "paragraph",
        text: "Everybody is performing a version of themselves. Some are performing not caring. The funny thing about performing not caring is that it usually requires an audience.",
      },
      {
        type: "paragraph",
        text: "Whatever happened to just being quiet?",
      },
      {
        type: "paragraph",
        text: "The phone itself is a miracle. A ridiculous miracle. I can transfer money while standing in traffic. Watch a football match from another continent. Order food. Read a book. Argue with strangers about whether jollof should have green peas (I still think it shouldn't).",
      },
      {
        type: "paragraph",
        text: "If you explained smartphones to someone in 1987, they'd assume you were either a prophet or a scammer.",
      },
      {
        type: "paragraph",
        text: "But most miracles ask for something in return. This one asked for our attention. Every app believes it's the main character. Every notification believes it deserves urgency. Every vibration says, “Look at me.”",
      },
      {
        type: "paragraph",
        text: "No wonder silence feels unfamiliar now.",
      },
      {
        type: "paragraph",
        text: "We've outsourced boredom. And I think boredom was doing more work than we gave it credit for. Bored people started hobbies. Bored people learnt instruments. Bored people stared out of windows long enough to have ideas. Now boredom lasts about six seconds before somebody sends you a reel.",
      },
      {
        type: "paragraph",
        text: "I also think we've become strangely afraid of looking eager. Nobody wants to reply too quickly. Nobody wants to text first. Nobody wants to say, “I miss you.” Everybody wants to be desired. Nobody wants to look like they're doing the desiring.",
      },
      {
        type: "paragraph",
        text: "It's a strange game. One where everybody loses by trying not to lose.",
      },
      {
        type: "paragraph",
        text: "Maybe that's why “nonchalant” became a compliment. Imagine telling our grandparents you met somebody wonderful but you're intentionally acting uninterested. They'd probably ask if you were feeling alright.",
      },
      {
        type: "paragraph",
        text: "The funny thing is, I don't think we're becoming colder. I think we're becoming more careful.",
      },
      {
        type: "paragraph",
        text: "There's a difference.",
      },
      {
        type: "paragraph",
        text: "Careful people double-check doors before sleeping. Careful people save receipts. Careful people don't jump into deep water. Somewhere along the line we started treating love the same way. We wear emotional helmets, reflective jackets.",
      },
      {
        type: "paragraph",
        text: "Which makes sense. Life has a way of teaching caution.",
      },
      {
        type: "paragraph",
        text: "But it also means some of us haven't felt the wind in years.",
      },
      {
        type: "paragraph",
        text: "Especially here. We're Nigerians. We've made an art form out of adjusting. Power goes out? We adjust. Fuel price goes up? We adjust. Rain starts in the middle of traffic? We adjust. Somebody says, “I'm five minutes away,” and they've just entered the bathroom? We somehow adjust.",
      },
      {
        type: "paragraph",
        text: "It's one of our greatest strengths. It's also why we have to be careful. Because if you adjust long enough, you stop asking whether something is good. You only ask whether it's normal.",
      },
      {
        type: "quote",
        text: "Those aren't the same thing. Common isn't the same as normal. It never was.",
      },
      {
        type: "paragraph",
        text: "Anyways please listen to me.",
      },
      {
        type: "paragraph",
        text: "Maybe nothing changes after this. Maybe we all wake up tomorrow and continue buffering through life. Or maybe one person replies to the message they've been leaving unopened. Maybe someone visits instead of saying, “We should link up soon.” Maybe someone says exactly what they mean instead of hoping the other person guesses.",
      },
      {
        type: "paragraph",
        text: "Small things. That's usually how life changes anyway. Not all at once. Just one ordinary decision at a time.",
      },
      {
        type: "paragraph",
        text: "The bar might be in hell. I still believe that.",
      },
      {
        type: "paragraph",
        text: "But maybe it doesn't get raised by grand speeches or perfect people. Maybe it comes back up every time someone chooses sincerity over strategy. Every time someone stays. Every time someone forgives. Every time someone loves without trying to look cool while doing it.",
      },
      {
        type: "paragraph",
        text: "I'm probably overthinking it.",
      },
      {
        type: "paragraph",
        text: "Goodnight. Or good morning. Whichever one finds you first.",
      },
    ],
  },
];
