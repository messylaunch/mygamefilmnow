# GameFilmNow — Master Game Plan

**Owner:** Michael Quinn · **Domain:** mygamefilmnow.com (SiteGround, WordPress on www)
**Rule #1: Nothing we build here touches the current live site.** Everything lives on new subdomains and only goes live when you say so.

---

## 1. The Big Picture

GameFilmNow sells three things:

1. **The moment** — live streams of Little League games for family who can't be there.
2. **The memory** — edited game recordings, available ~72 hours after the game.
3. **The improvement** — a film-study portal where teams review games play-by-play, like the pros do.

And wrapped around all three: **a fundraiser that actually works**, because you're selling the game itself, not candy.

## 2. The Three Properties (Subdomains)

| Subdomain | What it is | Who it's for |
|---|---|---|
| `start.mygamefilmnow.com` | Landing funnel. Explains GFN, routes 3 visitor types to the right place, captures leads. | New visitors: fans, coaches/teams, leagues wanting film |
| `app.mygamefilmnow.com` | The store. Find your team → buy stream/recording/pass → **watch on the same page**. Plus fan accounts, admin tools, coach tools. | Fans, parents, coaches, GFN staff |
| `team.mygamefilmnow.com` | The film room. Play-by-play study, comments, tags, highlights, notifications. Unlocked by the **Player Pass**. | Players, parents, coaches, scouts |

Your current `www.mygamefilmnow.com` stays exactly as it is until you're ready to point it at the new funnel (or keep WP for blog/SEO — your call later).

## 3. Roles (one login system, one account, many hats)

| Role | Can do |
|---|---|
| **GFN Admin** (you) | Everything. Create any account, set Player Pass pricing, refunds, all dashboards. |
| **Editor (GFN staff)** | Upload/attach recordings & play-by-play clips, edit game data, mark games delivered. |
| **Recorder** | Sees their assigned game schedule, marks games as recorded. |
| **Uploader** | Upload raw footage against a game, mark upload complete. (Often same person as Recorder — one account can hold both roles.) |
| **Coach / Team Manager** | Edits team page, schedule rows, prices, stream windows; sees revenue dashboard; posts film-room questions/notes; manages communication sends. |
| **Player (kid)** | Film room access, tag-myself, likes/favorites, own profile, highlight builder, sees tickets-sold count (never dollar revenue). Requires parent consent. |
| **Parent** | Everything a fan can do + linked to their kid(s), receives ALL notifications meant for the kid, signs consent. |
| **Fan** | Buys & watches, follows teams/players, "because you follow X" feed. |
| **Scout** | Follows teams/players, sees film + player profiles + stats, contact routed through parents only. |

## 4. Data Model (the fix for the season/tournament mess)

The old problem: seasons and tournaments were separate silos, teams appeared in both, and nothing linked. The fix — **one spine:**

```
Organization (league or independent program)
 └─ Team ("Lakeland Eagles")
     └─ Squad (division/age group: "10U", "12U", "Varsity")   ← players attach HERE, per season
         └─ participates in EVENTS:
             • Season (e.g. "Fall 2026 – Mid-Florida League")
             • Tournament (e.g. "Winter Haven Classic 2026") — organized by ROUNDS/DAYS, never auto-brackets
                 └─ optional bracket PHOTO upload (snap the paper bracket, done)
                     └─ Games always belong to ONE event, and link two squads (or a squad + "non-GFN opponent" free-text)
```

- A team's page shows **all** its events — season games and tournament games together, grouped by event. No more "where are my tournament games?"
- Only squads with a GFN account are clickable/purchasable; opponents without one show as plain text. That answers "which teams are actually on GFN?"
- Search is one box + filter chips: **Location · League · Team · Player · Tournament**. Five confusing queries become one.

### Products per game
| Product | Behavior |
|---|---|
| **Live Stream** | Has a start/end window. Auto-on-sale before/during, **auto-removed at end time** (no more manual takedowns). After end, page forwards buyers to the Recording. |
| **Recording** | On sale when Editor marks it delivered (~72h SLA). |
| **Stream + Recording Bundle** | Discounted combo, one click. |
| **Team Pass** | All games in one squad's season. |
| **Tournament Pass** | All of one squad's games in one tournament. Price set per-squad when the tournament is set up. |
| **Player Pass** ($75, GFN-set price) | Unlocks the film-study portal (team.) for one player + parent. Triggers consent flow. |

### The film room (team.)
- Play-by-play clips uploaded per game (team gets them in ~24h).
- Each play: **Like** ❤ and **Add to My List** ⊕ (two icons, Instagram-style).
- **Comments** with `@mentions` → notification to the tagged person.
- **Tag myself on this play** (different from commenting) → builds the player's personal reel.
- **Coach questions** pinned to plays → collected in the Notifications center.
- **Notifications center**: mentions, coach questions, new film posted, family-list adds, coach notes. (Notifications for kids go to the parent's phone/email; kids see them in-app only.)
- **Highlight Builder** ($40 one-time): unlocks (a) ZIP download of every tagged play, (b) pick up to 20 clips → auto-stitched highlight reel with a choice of 2–3 provided music tracks, (c) public montage on the player's profile.
- **Player profile**: photo or ≤3-sec video avatar, optional bio, optional stats, teams/games history, view counts on their plays (views only — keep the focus right).
- **Scout view**: follow players/teams, see film + profiles, request contact → goes to the parent.

### Family & following
- Fans follow teams AND people. Feed shows upcoming/purchased games with the reason: *"Friday: Lakeland vs Winter Haven — because you follow Zachary Riddle."*
- Anyone can search a relative and add them to their family list → the relative gets notified and sees you in their list. No cap on list size.

### Admin & coach editing (the fix for "posts everywhere")
One screen: the **Schedule Grid**. Excel-style rows — one row = one game: date, time, opponent, event, stream on/off ✓, stream window, recording on/off ✓, prices, score, links, photos. Click a row → modal with everything. Works on a phone. Coaches see the same grid scoped to their squad. No WordPress post-hopping, no connecting five pages per game.

### Money
- Stripe checkout **in a modal on the game page** — pay, and the video unlocks right there. No redirect maze. (That's the #1 UX failure of the old build.)
- Refunds: admin can refund one purchase or **refund an entire cancelled game** in two clicks.
- Coach dashboard shows squad revenue; player dashboard shows tickets sold + which family-list members bought (names only, no dollars).

### Communication quotas (GHL-powered later)
- Each Player Pass includes a **Top-20 contact list** — those 20 get the automated texts/emails (game reminders, stream links, "your purchase, here's the link again").
- Each team gets **+300 contacts** (boosters, car-wash signups, door-to-door leads). Beyond that, billed.
- New fan John Smith signs up → tagged with his nephew's player ID + the team ID → automations fire off those two tags. (Full map in `docs/GHL-INTEGRATION.md`.)

## 5. Build Phases

### ✅ Phase 0 — Templates (THIS session, in this repo)
Static, clickable, mobile-first HTML/CSS/JS templates for all three subdomains with realistic sample data. You can upload these to SiteGround subdomain folders **today** to click through and test the UX. No backend, no risk.

### Phase 1 — Make the store real (app.)
The store is the revenue engine; it goes first.
- Auth (one account system shared with team.), Stripe, video hosting (recommendation: **Bunny Stream** — cheap, has a player, signed URLs, live streaming; alt: Mux), Schedule Grid backed by a real database, purchases → instant watch, refunds, follows/feed.
- **Recommendation:** build as a proper web app (Next.js + Supabase/Postgres + Stripe + Bunny), hosted on Vercel/Railway, with the subdomain pointed via a DNS CNAME in SiteGround. SiteGround shared hosting is fine for the *static* start. page, but a real app with auth/payments/video does not belong on shared PHP hosting — and DNS pointing means SiteGround stays your registrar/host with zero disruption to www.
- Rebuilding in WordPress/Crocoblock again is possible but you already lived the pain: hand-built queries, post-hopping, fragile checkout. Not recommended.

### Phase 2 — The film room (team.)
Same stack, same accounts. Play-by-play upload tool for editors, film room, comments/mentions/notifications, tag-myself, player profiles, Player Pass + consent flow, highlight builder (clip-stitching runs as a background job — ffmpeg concat + music bed; very doable).

### Phase 3 — GHL + growth machine
Connect GoHighLevel (tags, automations, quotas), fundraising toolkit inside team., scout accounts, merch on team pages, podcast/Zoom/calendar extras.

### Phase 4 — Marketing engine
Runs in parallel from Phase 1. Full plan in `docs/MARKETING-PLAN.md`; your handouts in `docs/FUNDRAISING-LADDER.md` and `docs/COACHES-PLAYBOOK.md`; walkthrough-video scripts in `docs/VIDEO-WALKTHROUGH-SCRIPTS.md`.

## 6. What's in this repo

```
GAMEPLAN.md                      ← you are here
sites/start/                     ← start.mygamefilmnow.com template
sites/app/                       ← app.mygamefilmnow.com template
sites/team/                      ← team.mygamefilmnow.com template
docs/HANDBOOK.md                 ← how the platform works, role by role
docs/TODO-AFTER-BUILD.md         ← YOUR checklist, with copy-paste prompts
docs/SITEGROUND-DEPLOY.md        ← exact steps to put templates on subdomains
docs/GHL-INTEGRATION.md          ← every GoHighLevel connection point + templates
docs/MARKETING-PLAN.md           ← positioning, offers, channels, calendar
docs/FUNDRAISING-LADDER.md       ← the team handout (deliverable)
docs/COACHES-PLAYBOOK.md         ← 30-minute film review system (deliverable)
docs/VIDEO-WALKTHROUGH-SCRIPTS.md← screens + word-for-word scripts for your recordings
```

## 7. Decisions I made for you (flag anything you want changed)

1. **Static templates first, real app second** — you test UX before any money is spent on infrastructure.
2. **One account across app. and team.** — buy a Player Pass in the store, the film room just works.
3. **Squad = team + division + season** — the single fix for the team/division/league/tournament tangle.
4. **Rounds/days, never live brackets** — bracket photo upload instead, exactly as you described.
5. **Dark theme for the film room, light theme for the store** — film study happens on video; grandparents buy tickets. Different jobs, different UIs.
6. **Bunny Stream recommended for video** — order-of-magnitude cheaper than Vimeo/Mux at your volume; supports live + VOD + signed links.
7. **GHL is stubbed, not wired** — every place it connects is marked `GHL:` in the templates and mapped in the docs, per your instruction.
