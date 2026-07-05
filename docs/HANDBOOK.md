# GameFilmNow Handbook — How the Platform Works, Role by Role

This is the "how-to book" for every kind of person on GameFilmNow. Written so you can copy sections straight into support docs, onboarding emails, or walkthrough video scripts (scripts themselves: `VIDEO-WALKTHROUGH-SCRIPTS.md`).

---

## The three properties

| URL | Name | Job |
|---|---|---|
| start.mygamefilmnow.com | **The Front Door** | Explains GFN, routes fans / coaches / film-requests, captures leads |
| app.mygamefilmnow.com | **The Store** | Find team → buy stream/recording/pass → watch on the same page |
| team.mygamefilmnow.com | **The Film Room** | Play-by-play study, comments, tags, highlights (Player Pass required) |

One account works everywhere. Buy a Player Pass in the Store and the Film Room just opens.

---

## 1. Fan (the buyer — grandma-proof by design)

**Goal: from "found the team" to "watching" in 3 clicks, zero support tickets.**

1. **Find the team** — one search box on app.mygamefilmnow.com: team name, town, league, player name, or tournament. Filter chips narrow it down. Only teams actually on GFN appear.
2. **Pick the ticket** on the game page:
   - **Live Stream** — on sale until the game ends, then automatically gone.
   - **Recording** — on sale when editing is done (within 72h of the final whistle).
   - **Bundle** — stream + recording, discounted.
   - **Team Pass** — every game in the squad's season.
   - **Tournament Pass** — every game the squad plays in one tournament.
3. **Pay in the popup, watch on the same page.** No redirects. The game is saved forever in **My Games**, and the link is texted to them so they literally cannot lose it.

Extras:
- **Follow** any team or player → their games appear in **My Feed** labeled *"because you follow ___"*.
- **Family list** — search a relative, add them; they're notified and see you in their list. No size limit.
- Bought a stream for a game that got cancelled? **Refund arrives automatically** when staff cancels the game — no forms, no phone calls.

## 2. Parent

Everything a fan can do, plus:
- **Signs the consent form** when their kid gets a Player Pass (arrives by text + email at purchase). No consent, no film room.
- **Receives every notification meant for the kid** — texts and emails always go to the parent; the kid only sees in-app notifications.
- Gets their own login tied to the player's account; can watch everything the player can.
- Payments for kid-initiated purchases (like the $40 Highlight Mode) bill the parent's card.

## 3. Player (kid)

- Logs into the **Film Room** (team.mygamefilmnow.com). Sees: games on film, plays they're tagged in, view counts, coach questions, calendar.
- **Watches play-by-play** — click through every snap; team film is up within 24 hours.
- **❤ Like** a play or **⊕ add to My List** (two icons, like Instagram).
- **🏷️ Tag me on this play** — different from commenting. Tags build the player's personal reel and season archive that follows them team-to-team, year-to-year.
- **Comments** — ask coach about a play, @mention teammates (they get notified). No open chat anywhere — it's a study tool, not social media.
- **Profile** — photo or a 3-second video avatar, optional bio, optional stats, teams/games history.
- **Highlight Mode ($40 one-time)** — ZIP-download all tagged plays, build a highlight reel from up to 20 clips with provided music (or upload their own), and publish a public montage on their profile.
- **Fundraising Top-20** — each player lists the 20 people who'd actually watch. Those contacts get automatic game reminders and stream links (sent via the parent-approved GHL flow, from GFN — kids never text anyone from the platform).
- Sees **tickets sold** to their games and which family-list members bought. **Never sees dollar amounts.**

## 4. Coach / Team Manager

Two dashboards, one login:

**In the Store (app./coach.html):**
- **My Schedule grid** — same spreadsheet-style editor GFN admin uses, scoped to their squad: dates, times, opponents, stream windows, prices, scores. Edits go live instantly.
- **Team Page editor** — bio, sponsors (team keeps 100% of sponsor money), merch items, roster.
- **Revenue dashboard** — season revenue, tickets per game, pass counts.
- **Comms** — send texts/emails to boosters + fundraising contacts (300/season team quota; player Top-20s are separate and included with each Player Pass). Over quota bills afterward.
- **Invite players** — enter names + PARENT contacts; GFN sends Player Pass invite + consent form.

**In the Film Room (team./coach.html):**
- **Post film questions** pinned to specific plays ("What hole should we hit?") to the whole team, a position group, or one player.
- **Homework tracker** — see who watched, who answered, one-tap reminders (sent to parents).
- **Pin notes**, add calendar events (film sessions, practices, Zoom calls) — reminders go to parents.
- The **30-Minute Film Session** system: `COACHES-PLAYBOOK.md`.

## 5. GFN Admin (you)

- **Schedule Grid** — the whole platform in one Excel-style screen: every game as one row (team, event, date, time, opponent, stream ✓ + window + price, recording ✓ + price, score, crew). Inline edits; ✎ opens the full game editor (links, media, bracket photo). CSV import for whole seasons.
- **Streams manage themselves** — on sale at window start, off sale at window end, page forwards to the recording. Nobody takes products down manually anymore.
- **Teams & Squads** — create a team, add squads (10U/12U…), attach to seasons/tournaments — one screen, ~60 seconds. Invite the coach by email.
- **Tournaments** — create by rounds/days (never auto-brackets), upload a photo of the paper bracket, set per-squad tournament pass prices.
- **Orders & Refunds** — refund one purchase or an entire cancelled game in two clicks; buyers auto-notified.
- **Staff & Roles** — create any account: admin, editor, recorder, uploader, coach, scout. One person can hold multiple roles.
- **Sets the Player Pass price** ($75) platform-wide.

## 6. Editor (GFN staff)

- Queue of games awaiting edit, with SLA countdowns (**24h team film / 72h public recording**).
- Attaches the full recording to the game (auto-goes on sale) and uploads the play-by-play clip set to the Film Room (players auto-notified).
- Can fix any game data (scores, titles, thumbnails).

## 7. Recorder & Uploader (often the same person)

- **Recorder** sees their assigned schedule (games + venues + camera counts), marks "recorded ✓".
- **Uploader** uploads raw footage against the game row, marks "uploaded ✓" — which starts the editor SLA clock.
- Camera School certification is tracked on their account; setups (camera count) determine partner pricing.

## 8. Scout

- Verified by GFN staff before activation.
- Follows teams/players; new film and public reels collect on the Scout Desk.
- Sees profiles, stats (if the player shows them), and public montages.
- **Contact goes through the parent, always.** Scouts never see player contact info — GFN never even collects kids' contact info.

---

## Money map (who pays what, who gets what)

| Product | Buyer | Set by |
|---|---|---|
| Stream / Recording / Bundle | Fans | Coach (per game, in the grid) |
| Team Pass / Tournament Pass | Fans | Coach / set per-squad at event setup |
| Player Pass ($75) | Parents | **GFN admin** (platform-wide) |
| Highlight Mode ($40) | Parents | GFN admin |
| Sponsors & merch on team page | Local businesses / fans | Team keeps sponsor money; merch priced by team |
| Camera School + season fee | Partner teams | GFN, scales with camera count |

Revenue split between GFN and teams is configured per-team by admin (your current deal structure carries over — flag if you want this displayed differently).

## Safety model (the one-paragraph version for parents)

Kids' accounts exist only behind a signed parent consent. All outbound communication (texts/emails) goes to parents, never children. There is no open chat — only play-attached comments inside a private team space, visible to the team and coach. Scouts are staff-verified and can only reach a player through the parent. Player view counts are the only "social metric" shown, to keep kids focused on film, not fame.
