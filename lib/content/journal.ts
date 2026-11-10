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
      "I built a forecast of fatal violence across Nigeria’s 774 local governments, watched it miss 2026 badly, found out why, and rebuilt it. Here is where it now sees risk through 2030.",
    coverImage: {
      src: "/journal/where-violence-comes-next.jpg",
      alt: "Map of Nigeria’s local government areas shaded by forecast risk for 2027, darkest in the north-east and Plateau",
    },
    tags: ["Data", "Nigeria"],
    readingTime: 9,
    body: [
      {
        type: "paragraph",
        text: "This started as my BSc project in statistics at the University of Lagos. I recently went back and redid it properly, for all 774 local government areas, month by month, with one plain question: given where people have been killed so far, can we say where it is likely to happen next?",
      },
      {
        type: "paragraph",
        text: "I’ve been calling it my terrorism project, but political violence is the honest term. The data is the Uppsala Conflict Data Program’s event record, and it counts every clash with at least one death involving the state, an armed group or a communal militia, plus attacks on civilians. Boko Haram is in there. So are farmer–herder killings, banditry and fights between communities.",
      },
      {
        type: "paragraph",
        text: "It is easy to forget what the unit of measurement is on charts like these. Every incident below is at least one person who didn’t come home. Even UCDP’s final data, which leaves many attacks out, puts deaths in Nigeria between 2010 and 2025 at about 61,800.",
      },
      {
        type: "figure",
        figure: "atlas-stats",
        wide: true,
      },
      { type: "heading", text: "The forecast that taught me something" },
      {
        type: "paragraph",
        text: "My first model forecast 454 fatal events for January to September 2026. When UCDP’s preliminary 2026 data came in, it recorded 1,155. The gap wasn’t mostly the model. It was the data I had trained it on.",
      },
      {
        type: "paragraph",
        text: "UCDP’s final releases drop incidents when it can’t identify the attackers. In Nigeria that is anywhere from 10% to 57% of incidents a year, and in 2026 it is 57%. Unknown gunmen are a large part of what violence here actually looks like, especially banditry in the north-west and the killings in Plateau. A model trained without them was forecasting a quieter country than the real one.",
      },
      {
        type: "paragraph",
        text: "So I rebuilt it on UCDP’s preliminary releases, which keep those incidents, for 2020 to 2026, with final data for 2010 to 2019 and a term in the model for the switch. Trained only on data to December 2025, the rebuilt model forecast 948 incidents for January to September 2026. That is still 22% short of what happened, but far closer, and it placed violence better: the 10% of local governments it flagged held 59% of incidents, against 48% for the first model.",
      },
      {
        type: "paragraph",
        text: "What it missed was timing. It expected violence to ease through 2026, as it had after earlier spikes. Instead it rose from April, so only 4 of the 9 months landed inside its 80% range. Plateau and the north-west banditry belt drove most of the gap.",
      },
      {
        type: "figure",
        figure: "atlas-scorecard",
        caption: "Fatal incidents located to a local government, including unknown gunmen (UCDP preliminary data). Both forecasts were made with data to december 2025.",
      },
      {
        type: "figure",
        figure: "atlas-scorecard-tables",
        wide: true,
        caption: "Forecast from december 2025. The first model was trained on final UCDP data without unknown gunmen; the missed places are local governments outside the forecast’s top 10%.",
      },
      { type: "heading", text: "The map" },
      {
        type: "paragraph",
        text: "Each local government is shaded by its forecast chance of at least one fatal incident. Drag the slider from October 2026 through December 2027, switch to what has actually happened in 2026, or pick a state to zoom in.",
      },
      {
        type: "figure",
        figure: "atlas-map",
        wide: true,
        caption: "Forecasts use incidents through september 2026, including unknown gunmen. The 2010–2025 view uses ucdp’s final data, which leaves them out.",
      },
      {
        type: "paragraph",
        text: "For 2027, the single highest-risk local government is Barkin Ladi in Plateau. Seven of the 15 with the most expected incidents are in Borno, led by Gwoza, Bama and Konduga, and five are in Plateau. The rest sit in the north-west banditry belt: Borgu and Mariga in Niger, and Tsafe in Zamfara.",
      },
      {
        type: "paragraph",
        text: "Counting unknown gunmen changed this map more than anything else I did. Under the first model, the north-west looked almost calm, because before 2020 the data barely records banditry. It still under-represents the region’s longer history, so pale areas there deserve some suspicion.",
      },
      { type: "heading", text: "About 1,700 incidents in 2026" },
      {
        type: "paragraph",
        text: "Counting unknown gunmen, Nigeria recorded 1,155 fatal incidents in 2025 and is on course for about 1,700 in 2026. The model expects about 188 in November 2026, with an 80% range of 143 to 245, then a gradual easing through 2027 as the 2026 surge fades, the pattern seen after the 2021 and 2023 spikes. It under-called a rising trend this year, so I’d treat that easing with caution.",
      },
      {
        type: "figure",
        figure: "atlas-national",
        wide: true,
        caption: "Monthly fatal incidents including unknown gunmen, located to a local government. Bands show where 80% and 95% of past forecast errors at the same lead time fell.",
      },
      { type: "heading", text: "2027 to 2030" },
      {
        type: "paragraph",
        text: "2027 is the main forecast year: about 1,650 incidents, with an 80% range of roughly 1,000 to 2,850, close to 2026’s pace. That figure is the sum of the monthly model.",
      },
      {
        type: "paragraph",
        text: "Beyond that, the model can’t see, so I use a plainer rule: the average of the last three years, corrected for its habit of running low. It puts 2028 to 2030 at about 1,200 incidents a year, with an 80% range of 700 to 2,050. That assumes violence partly settles back, as it did after earlier spikes. Yearly totals here have swung by up to half from one year to the next, and the rule has only a few years of this data to learn from, so treat those ranges as rough.",
      },
      {
        type: "figure",
        figure: "atlas-outlook",
        wide: true,
        caption: "Fatal incidents including unknown gunmen. The 2026 bar adds the october–december forecast to what was recorded through september.",
      },
      { type: "heading", text: "How far ahead can you see?" },
      {
        type: "paragraph",
        text: "The next few sections come from the original analysis on UCDP’s final data, 2010–2025. At the level of individual places, the model sees further than I expected. One month out, the 39 local governments it ranks highest hold 64% of the next month’s events. A year out they still hold 59%, and two years out 57%. It beats simply carrying last year’s average forward up to about 18 months, and after that the gap closes.",
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
          "Unknown gunmen are counted. UCDP’s final releases drop incidents whose attackers it can’t identify. This forecast uses its preliminary releases, which keep them, for 2020–2026, and preliminary data is revised before final release.",
          "Fatal incidents only. Kidnappings and non-lethal attacks are missing.",
          "Before 2020 the data comes from final releases without unknown gunmen, so banditry is under-represented in the model’s long history.",
          "Patterns, not causes. The model knows where violence has been, not why. Poverty, population and displacement aren’t in it yet.",
          "Turning points are hard. In 2026 the model expected an easing that never came. It forecasts levels well and sees sudden surges late.",
        ],
      },
      { type: "heading", text: "How it was built" },
      {
        type: "paragraph",
        text: "Incidents come from UCDP: its final Georeferenced Event Dataset (v26.1) for 2010–2019 and its preliminary Candidate releases for 2020–2026, placed in geoBoundaries’ 774 local government areas and counted by month. The main model regresses each month’s incidents on an area’s own recent violence, its neighbours’ violence, the jihadist share of past events, distance to Lake Chad and the land border, area and the rainy season, with a separate model for each lead time. It was trained to December 2025 and judged on January–September 2026, then refitted on everything to September 2026 for the forecasts here.",
      },
      {
        type: "paragraph",
        text: "Data: UCDP GED v26.1 and Candidate releases 2020–2026 (Sundberg & Melander, 2013; Hegre et al., 2020). Boundaries: geoBoundaries (CC BY 4.0).",
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
