# Putting the Templates on Your SiteGround Subdomains (Test Mode)

Goal: get `start.` / `app.` / `team.` live for **your eyes only** to click through on desktop and phone. **Nothing here touches www.mygamefilmnow.com.**

Time: ~20 minutes total.

## Step 1 — Create the three subdomains

1. Log in at **my.siteground.com** → **Websites** → your mygamefilmnow.com site → **Site Tools**.
2. Go to **Domain → Subdomains**.
3. In "Create New Subdomain" type `start` → **Create**. Repeat for `app` and `team`.
4. SiteGround auto-creates folders like `mygamefilmnow.com/start/public_html` (path shown next to each subdomain — note them).

DNS is automatic when the domain's nameservers are on SiteGround (yours are, since WP is hosted there). Give it up to 30 minutes the first time.

## Step 2 — Upload the template files

For each subdomain, upload the matching folder **contents** from this repo:

| Repo folder | Upload contents into |
|---|---|
| `sites/start/` | the `start` subdomain's `public_html` |
| `sites/app/`   | the `app` subdomain's `public_html` |
| `sites/team/`  | the `team` subdomain's `public_html` |

How: **Site Tools → Site → File Manager** → open the subdomain's `public_html` → **Upload** → select all files/folders inside `sites/start/` (i.e. `index.html`, `request-film.html`, `assets/`). Repeat for app and team.

(Faster alternative: zip each folder, upload the zip, right-click → Extract, then move contents up if extraction created a subfolder.)

## Step 3 — Turn on HTTPS

**Site Tools → Security → SSL Manager** → for each new subdomain select **Let's Encrypt** → Get. Then **HTTPS Enforce → on**. (If the subdomains were included in a wildcard cert already, this is instant.)

## Step 4 — Test

- Visit https://start.mygamefilmnow.com — landing page, click all three path cards.
- Visit https://app.mygamefilmnow.com — search "Eagles", open the team, open the Friday game, **buy the stream with the fake checkout** (any numbers work), confirm the page unlocks and the purchase shows in **My Games**.
- Visit https://team.mygamefilmnow.com — click through the Film Room, tag yourself on a play, unlock Highlight Mode with the fake checkout.
- **Do all of it again on your phone.**

## Step 5 — Keep testers out (optional but smart)

While it's demo-only, either:
- Leave it — pages carry a yellow "DEMO TEMPLATE" banner and there's nothing real to buy; or
- Password-protect: **Site Tools → Security → Protected URLs** → protect `/` on each subdomain with a simple user/pass you share with your partner.

## When we go real (Phase 1) — what changes

- `start.` can **stay on SiteGround forever** — it's a static page; just swap the form for your GHL embed.
- `app.` and `team.` become real web apps (auth, Stripe, video). Those get hosted on an app platform (e.g. Vercel), and in SiteGround you just change each subdomain's **DNS record** (Site Tools → Domain → DNS Zone Editor → edit the `app` and `team` A/CNAME records to point at the new host). www and your WordPress stay untouched.
- Nothing about your current WP site changes at any point unless you later decide to point www at the new funnel.
