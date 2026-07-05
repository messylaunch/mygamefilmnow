# Your To-Do List (After the Templates)

Everything YOU need to do, in order, with copy-paste prompts where a prompt helps. Work top to bottom; don't skip the test phase.

---

## Phase A — Test the templates (this week, ~2 hours)

- [ ] **A1.** Put the templates on the subdomains — follow `SITEGROUND-DEPLOY.md` step by step.
- [ ] **A2.** Click through everything on desktop AND phone. Use the fake checkout. Try to break it.
- [ ] **A3.** Show it to 3 people: one grandparent-age fan, one coach, one player. Watch them use it silently — write down every place they hesitate. (This is the exact data the old checkout never got.)
- [ ] **A4.** Collect your change list, then come back to Claude Code in this repo and paste:

> **PROMPT A4:** "I tested the GameFilmNow templates with real users. Here's my feedback list: [paste notes]. Update the templates in sites/ to fix these, keeping the same structure and design system, and push to the same branch."

## Phase B — Content & branding pass (~1 evening)

- [ ] **B1.** Replace my guessed content: real testimonials, real pricing for streams/recordings/passes, real Camera School pricing, your logo/colors if different.

> **PROMPT B1:** "Here are the real details for GameFilmNow: pricing [list], testimonials [paste], brand colors [hex codes], logo file [attach/commit it]. Update all three sites in sites/ to use these."

- [ ] **B2.** Decide the www question: keep WordPress at www and link "Home" to start., or eventually point www at the new landing. (No action needed now — just decide.)

## Phase C — Build the real store (Phase 1 of the game plan)

This is the big one. The store (app.) becomes a real product with accounts, Stripe, and video.

- [ ] **C1.** Create accounts (all free to start): **Stripe** (payments), **Bunny.net** (video streaming — Stream product), **Supabase** (database + auth), **Vercel** (hosting). Keep the logins in your password manager.
- [ ] **C2.** Start a fresh Claude Code session on this repo and paste:

> **PROMPT C2:** "Read GAMEPLAN.md and docs/HANDBOOK.md in this repo. Build Phase 1: convert sites/app/ into a production Next.js app in a new /app directory. Stack: Next.js + Supabase (Postgres + auth) + Stripe Checkout (embedded, modal-style so buyers never leave the game page) + Bunny Stream for video. Implement: the data model from GAMEPLAN.md section 4 (Org → Team → Squad → Event → Game, products per game with stream time-windows that auto-toggle sale state), fan accounts with My Games / follows / feed, the admin Schedule Grid with inline editing and CSV import, coach-scoped editing, and one-click refunds (single order + whole-game batch). Match the UX and visual design of the sites/app templates exactly. Include seed data and a local dev setup I can run."

- [ ] **C3.** When it's ready, test with Stripe test cards, then point the `app` subdomain's DNS at the deployment (per `SITEGROUND-DEPLOY.md` last section).
- [ ] **C4.** Film one real game, run it through the whole pipeline (upload → edit → on sale → purchase → watch) before onboarding any team.

## Phase D — Build the film room (Phase 2)

> **PROMPT D1:** "Phase 1 (the store in /app) is live. Now build Phase 2 per GAMEPLAN.md: the film room at team.mygamefilmnow.com as part of the same Next.js app (shared auth), matching the sites/team templates: play-by-play viewer, likes/lists/tag-myself, comments with @mentions and notifications (in-app for kids, email/SMS to parents), coach questions + homework tracker, player profiles with 3-second video avatars, the $40 Highlight Mode (ZIP export + ffmpeg clip stitching with music beds as a background job), Player Pass purchase → parent consent flow (e-signature) → account activation, and the scout role with parent-brokered contact."

## Phase E — Connect GoHighLevel (Phase 3)

- [ ] **E1.** Work through the checklist at the bottom of `GHL-INTEGRATION.md` (start the A2P number registration NOW — it takes days).
- [ ] **E2.** Build automations A and B first (receipt links + game-week reminders) — they kill your two biggest old support problems.

> **PROMPT E2:** "Wire the platform to GoHighLevel per docs/GHL-INTEGRATION.md: purchase webhooks that upsert contacts with the player-{id}/team-{id} tag scheme, the Player Pass consent flow trigger, and the coach send-to-list endpoint with the 20/300 quota enforcement. Here are my GHL API credentials: [use environment variables]."

## Phase F — Marketing engine (runs alongside C–E)

- [ ] **F1.** Read `MARKETING-PLAN.md` — pick your first 3 target teams.
- [ ] **F2.** Print `FUNDRAISING-LADDER.md` and `COACHES-PLAYBOOK.md` as your two leave-behind deliverables (export to PDF; ask Claude to make branded PDF versions when ready).
- [ ] **F3.** Record the walkthrough videos using `VIDEO-WALKTHROUGH-SCRIPTS.md` — the screens and word-for-word scripts are done. (You mentioned a guided-walkthrough tool — you're thinking of **Arcade**, **Storylane**, or **Supademo**; any of them can import the same script.)

## Ongoing decisions parking lot

- Revenue split display for teams (show % or just dollars?)
- Whether coaches can set Player Pass price per team or it stays GFN-global ($75)
- Merch fulfillment: teams handle their own shipping vs. print-on-demand integration
- Podcast/Zoom features for teams (Phase 3+): simplest v1 = calendar events with Zoom links, which is already in the coach template
