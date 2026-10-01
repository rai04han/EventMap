# CampusPulse (placeholder name) – PRD v2 (laptop demo)

> Token tip: paste only sections 1–6 into AI chats. Sections 7–10 are for the team.

## 1. One-liner
A desktop-first web app where students see what is happening on campus now and next, and freshers can find the exact venue.

## 2. Problem (LOCKED, do not change)
Students learn about campus events only after they have happened. Freshers cannot find the exact venue of an event.

## 3. Users
- **Student / fresher:** browses events, finds venues, saves events.
- **Organizer (club, dept rep):** posts events in under 30 seconds.

## 4. Scope
**P0 (must work)**
1. **Event feed:** cards with status badge (Live Now / Today / Upcoming / Ended), live countdown ("Starts in 40 min"), category filter chips in a left sidebar. Ended events greyed out and sorted last. Status refreshes every 30 s.
2. **Venue finder:** real venues with building, floor, landmark, text directions from main gate. Schematic SVG campus map with a highlighted pin. Every event card has a **"How to reach"** button that opens a **right-hand side panel** (venue details + map + pin) without leaving the feed.
3. **Organizer panel:** PIN-gated (hardcoded `1234`). Form: title, category, venue (dropdown from venues), start, end, organizer, description. New event shows in the feed instantly. Hidden **"Reset demo data"** button.

**P1:** "Save" button on cards + **My Events** tab.

**Stretch (only if P0 is deployed by 1:30 PM):** paste a WhatsApp message and auto-fill the form with AI.

**Non-goals:** real login, backend/database, push notifications, mobile polish, admin approval, IoT.

## 5. Tech stack
React + Vite, plain CSS, no router library (tab state in `App.jsx`), data in `localStorage` behind `lib/storage.js`. Desktop-first, min width 1280px, designed for 1366×768. No API keys in P0.

## 6. Data contracts (frozen)
```js
// times are epoch milliseconds
Event = { id, title, category, venueId, start, end, organizer, description }
// categories: "Tech" | "Cultural" | "Sports" | "Workshop" | "Seminar" | "Other"

Venue = { id, name, building, floor, landmark, directions, mapX, mapY }

// seedEvents.js builds times relative to now so Live / Starts-in always works:
// start: inMinutes(-20), end: inMinutes(40)

// storage.js exports: getEvents(), addEvent(e), getSaved(), toggleSaved(id), resetDemo()
// time.js exports: getStatus(event, now) -> "live" | "upcoming" | "ended", countdown(event, now)
// App.jsx exports navigate(tab, venueId?) passed to pages as onNavigate
```

## 7. Folder structure and ownership
```
campus-pulse/
├── PROJECT.md
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── src/
    ├── main.jsx
    ├── App.jsx              # top nav, tab state, 30 s tick, navigate()   [A only]
    ├── index.css            # colour tokens, layout                       [A]
    ├── data/
    │   ├── venues.js        # real Christ Nagar venues                    [C]
    │   └── seedEvents.js    # 8-10 events, relative times                 [C]
    ├── lib/
    │   ├── storage.js       #                                             [A]
    │   └── time.js          #                                             [A]
    ├── components/
    │   ├── TopNav.jsx       #                                             [A]
    │   ├── EventCard.jsx    #                                             [A]
    │   ├── FilterChips.jsx  #                                             [A]
    │   ├── VenueCard.jsx    #                                             [B]
    │   ├── CampusMap.jsx    # SVG map + pin                               [B]
    │   ├── VenuePanel.jsx   # right-hand side panel                       [B]
    │   └── EventForm.jsx    #                                             [C]
    └── pages/
        ├── Feed.jsx         # mounts VenuePanel                           [A]
        ├── Venues.jsx       #                                             [B]
        ├── Organizer.jsx    # PIN gate + form + reset                     [C]
        └── Saved.jsx        #                                             [C]
```

## 8. Work split and timeline
| Who | Owns | Milestones |
|---|---|---|
| **A** | Scaffold, App, lib, Feed, EventCard, filters, final build | Repo pushed 11:35; Feed working 12:30 |
| **B** | Venues page, VenuePanel, CampusMap | UI with 3 dummy venues 12:15; real data 1:15 |
| **C** | Real venues, seed events, Organizer, Saved, poll, slides, demo script | Venue data 11:50; form 12:45 |

- 11:15–11:35 setup (A scaffolds and pushes; B, C clone and run `npm run dev`; C walks campus for venues)
- 11:35–12:45 parallel build, one branch per person
- 12:45–1:30 merge to `main`, integrate (A leads)
- 1:30–2:00 laptop rehearsal on the real demo laptop, fix top 3 bugs only
- 2:00–2:30 feature freeze, 1-min backup screen recording

**Rules:** 20 min per bug; after 2 failed AI fixes `git checkout .` and switch model, else cut or hardcode. Only A edits `App.jsx`. Merge to `main` every 45 min. New AI chat per feature.

## 9. Acceptance criteria
- Runs from `npm run build && npm run preview` on the demo laptop with Wi-Fi off.
- Readable at browser zoom 100–110% from 2 m.
- Feed shows at least 1 Live and 3 Upcoming events at demo time.
- "How to reach" opens the correct venue with the pin on the map.
- An event posted in Organizer appears in the feed with no reload.
- Full demo path runs 3 times in a row without errors; "Reset demo data" restores a clean state.

## 10. Demo (3 min, one laptop, one browser window at one URL)
1. Open with the poll number ("X of 10 students missed an event last month").
2. Feed: show a Live Now event and a countdown.
3. Click **How to reach**: side panel shows floor, landmark, directions, map pin.
4. Organizer tab: enter PIN, post an event.
5. Back to feed: new event is there with a countdown. Save it, open My Events.

**Likely judge questions**
- *"WhatsApp already does this."* It cannot show "happening now", countdowns, or venue directions in one place.
- *"Who posts events?"* Dept reps and clubs through the Organizer panel; QR codes on notice boards bring students in.
- *"No backend?"* Prototype choice. Next step is Firebase with college-email login so events are shared across devices.
