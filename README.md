# MyGameFilmNow

Live streams, game recordings, and play-by-play film study for youth sports — plus the fundraiser that actually works.

**Start here → [`GAMEPLAN.md`](GAMEPLAN.md)** — the master plan for the whole rebuild.

## What's in this repo

| Path | What it is |
|---|---|
| [`GAMEPLAN.md`](GAMEPLAN.md) | Master game plan: data model, phases, tech decisions |
| [`sites/start/`](sites/start/) | Landing funnel template → **start.mygamefilmnow.com** |
| [`sites/app/`](sites/app/) | Store template (buy & watch, admin grid, coach tools) → **app.mygamefilmnow.com** |
| [`sites/team/`](sites/team/) | Film room template (play-by-play, highlights, coach/scout) → **team.mygamefilmnow.com** |
| [`docs/HANDBOOK.md`](docs/HANDBOOK.md) | How the platform works, role by role |
| [`docs/TODO-AFTER-BUILD.md`](docs/TODO-AFTER-BUILD.md) | **Your execution checklist** with copy-paste prompts |
| [`docs/SITEGROUND-DEPLOY.md`](docs/SITEGROUND-DEPLOY.md) | Put the templates on your subdomains (test mode) |
| [`docs/GHL-INTEGRATION.md`](docs/GHL-INTEGRATION.md) | Every GoHighLevel connection point + message templates |
| [`docs/MARKETING-PLAN.md`](docs/MARKETING-PLAN.md) | Positioning, the ladder, offers, channels, calendar |
| [`docs/FUNDRAISING-LADDER.md`](docs/FUNDRAISING-LADDER.md) | Team handout deliverable (print it) |
| [`docs/COACHES-PLAYBOOK.md`](docs/COACHES-PLAYBOOK.md) | The 30-Minute Film Session deliverable (print it) |
| [`docs/VIDEO-WALKTHROUGH-SCRIPTS.md`](docs/VIDEO-WALKTHROUGH-SCRIPTS.md) | 9 walkthrough videos: screens + word-for-word scripts |

## Trying the templates locally

They're plain HTML/CSS/JS — open any `sites/*/index.html` in a browser, or:

```bash
cd sites/app && python3 -m http.server 8000
```

Demo checkout works everywhere (fake card, purchases persist in your browser's localStorage so buy → watch feels real). Yellow banners mark everything as a template; no real payments, no real data.
