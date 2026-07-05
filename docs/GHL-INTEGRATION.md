# GoHighLevel Integration Map

Per your instruction, **nothing is wired to GHL yet** — the templates mark every connection point. This doc is the full map plus ready-to-paste message templates, so hooking it up later is checkbox work.

## 1. The tag system (the heart of it)

Every contact in GHL carries identifier tags:

- **Player tag** — e.g. `player-1000` (Zach Riddle)
- **Team tag** — e.g. `team-500` (Eagles 12U)
- Type tags — `fan`, `parent`, `coach`, `lead`, plus the "I am a…" value from the start. form (`coach` / `league` / `parent` / `camera-school`)

When John Smith signs up because of his nephew, he gets `player-1000` + `team-500`. From then on, every automation keyed to those tags reaches him automatically.

**Where tags get applied (platform → GHL):**
| Event on the platform | Tags applied |
|---|---|
| Fan follows a player/team | that player/team tag |
| Fan buys any product for a game | the home squad's team tag |
| Parent completes Player Pass consent | `parent` + player tag + team tag |
| A player's Top-20 contact is added | `top20` + player tag + team tag |
| Team fundraising contact added (car wash, boosters…) | `booster` + team tag |
| start. form submitted | `lead` + contact type |

## 2. Connection points in the templates

| # | Template location | What to wire |
|---|---|---|
| 1 | `sites/start/request-film.html` form | Replace with GHL form embed or point at an inbound webhook → creates contact, tags `lead` + type, drops into **Film Requests** pipeline |
| 2 | Store signup/purchase (Phase 1 backend) | Webhook per purchase → upsert contact, apply tags, fire **Purchase Receipt** automation |
| 3 | Player Pass purchase | Fires **Consent Flow**: text + email to parent with consent form link; account activates on signature (use GHL documents/forms for the signature) |
| 4 | Coach dashboard → "Send to your list" | Triggers a GHL campaign against the team tag audience; decrement the 300/season quota per contact |
| 5 | Player Top-20 list (Film Room) | Player (via parent consent) enters up to 20 contacts → GHL contacts with `top20` + tags; joins **Game Week** automation |
| 6 | Game rows in schedule grid | Game date/time drive **Game Week** and **Stream Link Delivery** automations (via workflow trigger from the platform, or a synced calendar/custom values) |
| 7 | Fan referral ("want to see Antoine play?") | See referral flow below |

## 3. Automations to build in GHL (in order of value)

### A. Purchase Receipt & Link Delivery (build first — kills the #1 old support problem)
Trigger: purchase webhook.
> **Text:** "🎟️ You're in! {{contact.first_name}}, here's your GameFilmNow link for {{custom.game_title}} — watch anytime: {{custom.game_link}}. Save this text!"

### B. Game Week Reminders
Trigger: contact has team/player tag matching a game in the next 7 days. Sends Tue + game-day −2h.
> **Tue text:** "🏈 {{custom.team_name}} plays {{custom.opponent}} this {{custom.game_day}} at {{custom.game_time}}! Can't be there? Watch live: {{custom.game_link}} — because you follow {{custom.reason_name}}."
> **Game-day text:** "📺 Kickoff in 2 hours! {{custom.team_name}} vs {{custom.opponent}}. Your stream: {{custom.game_link}}"

### C. Recording-Ready
Trigger: platform marks recording published.
> "🎬 The {{custom.team_name}} vs {{custom.opponent}} game film is ready ({{custom.score}})! Own it forever: {{custom.game_link}}"

### D. Parent Consent Flow
Trigger: Player Pass purchase. Text + email with consent form; 48h reminder; on-sign → tag `consent-signed`, platform activates accounts, welcome email with both logins.

### E. Referral / Family Signup (the "text YES" flow)
Trigger: contact added to a player's Top-20.
> "Hey! {{custom.player_first}} plays for {{custom.team_name}} and their games are on GameFilmNow 🏈 Want to catch {{custom.player_first}}'s games this season? Reply YES."
> On YES → "Awesome! What's your email?" → create/verify contact, send temp-password signup link, tag with player+team, auto-add to the player's family list, route them to the family page on first login.

### F. Lead Nurture (start. form)
Pipeline: New → Contacted → Quoted → Scheduled → Won. Auto-reply text on submit; task for you; 3-touch email sequence selling the fundraiser angle (pull copy from `MARKETING-PLAN.md`).

## 4. Quotas (enforced platform-side, sent GHL-side)

- **Player Top-20**: max 20 contacts per Player Pass; included in the pass price.
- **Team**: 300 extra contacts/season (boosters, fundraising leads). Beyond 300 → billed afterward.
- Implementation: the platform counts sends before calling GHL; GHL just delivers.

## 5. Setup checklist (when you're ready)

- [ ] GHL sub-account for GameFilmNow; buy 1–2 local numbers (A2P 10DLC registration — start it early, takes days)
- [ ] Custom fields: `game_title`, `game_link`, `game_day`, `game_time`, `team_name`, `opponent`, `score`, `player_first`, `reason_name`
- [ ] Tag conventions: `player-{id}`, `team-{id}`, `top20`, `booster`, `lead`, `parent`, `consent-signed`
- [ ] Build automations A→F above (A and B first)
- [ ] Embed/point the start. form (template marker #1)
- [ ] Compliance: every text ends with "Reply STOP to opt out" the first time; consent language on all capture forms; **never message minors** — the platform only ever hands GHL parent/adult contacts
