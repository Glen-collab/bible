# Kids Category (Guideline 1.3) — standing answers

Apple's App Review asks the same four Kids-Category questions on **every version**.
This file is the reusable answer, with the verification behind each claim so it can be
re-run rather than re-remembered.

**First asked:** 2026-08-06, against version 1.0 / build 1.0 (2).
**Answered:** yes — Glen replied in Resolution Center. This file is the record, not a
draft to send. Re-verify and reuse it for 1.1 and every version after.

**Note:** the app IS treated as Kids Category. Apple's own message says *"The app has
been submitted for the Kids Category."* An earlier note in `APP_STORE.md` concluded the
opposite from the category dropdown — that was wrong. Kids rules bind this app.

---

## The four questions and the answers

| # | Question | Answer |
|---|----------|--------|
| 1 | Does the app include third-party **analytics**? | **No** |
| 2 | Does the app include third-party **advertising**? | **No** |
| 3 | Is data **shared with third parties**? | **No** |
| 4 | Any other **user or device data collected**? | **No** |

Consistent with the published App Privacy declaration: **Data Not Collected**.

## Suggested wording

> Footsteps of the Teacher does not include any third-party analytics and does not
> include any third-party advertising. No data is shared with third parties, and the
> app collects no user or device data of any kind.
>
> The app is entirely offline. It makes no network requests at all — there is no
> `fetch`, `XMLHttpRequest`, `WebSocket`, or `sendBeacon` anywhere in the shipped code,
> and no analytics or advertising SDK is linked. It stores nothing: no `localStorage`,
> no cookies, no IndexedDB — no progress or state persists between launches. It requests
> no permissions; the Info.plist contains no usage-description keys. Fonts are bundled
> with the app rather than loaded from a font CDN, so no request leaves the device for
> them either. There are no links out of the app.
>
> The only native functionality beyond drawing the screen is AirPrint, used for the
> "Print Coloring Page" button. It presents the system print sheet via
> `UIPrintInteractionController` and needs no permission and no photo-library access.
>
> This matches our App Privacy declaration of Data Not Collected.

---

## How each claim was verified (re-runnable)

Run against the **shipped** file set only. `scripts/build-web.js` copies exactly
`index.html`, `styles`, `data`, `src`, `assets` into `www/` — nothing else reaches the
binary. To check precisely what a given build shipped, extract that commit first:

```bash
git archive <commit> index.html styles data src assets | tar -x -C /tmp/shipcheck
cd /tmp/shipcheck
```

> **Trap:** run these in bash, or quote the flags. In zsh an unquoted variable holding
> `--include=*.js --include=*.css` does **not** word-split, so grep sees one bogus
> pattern and every check silently returns zero. Always confirm the sanity line below
> is non-zero before trusting a zero anywhere else.

```bash
# sanity — MUST be non-zero, else your greps are broken and the zeros mean nothing
grep -rn "font-face" --include="*.css" . | wc -l

grep -rnE 'fetch\(|XMLHttpRequest|WebSocket|sendBeacon|EventSource|importScripts' \
     --include="*.js" --include="*.html" . | wc -l          # network        -> 0
grep -rhoE 'https?://[a-zA-Z0-9._/-]+' \
     --include="*.js" --include="*.html" --include="*.css" . | sort -u        # urls
grep -rnE 'localStorage|sessionStorage|indexedDB|document\.cookie|caches\.' \
     --include="*.js" --include="*.html" . | wc -l          # storage        -> 0
grep -rnE 'window\.open|_blank' --include="*.js" --include="*.html" . | wc -l # links   -> 0
grep -rnE '@import|googleapis|gstatic' \
     --include="*.css" --include="*.html" . | wc -l         # remote fonts   -> 0
```

Native side:

```bash
grep -cE "UsageDescription" ios/App/App/Info.plist   # permissions -> 0
grep -E '"@capacitor/' package.json                  # SDKs: core, ios, splash-screen, status-bar
ls ios/App/App/*.swift                               # AppDelegate, MainViewController, FootstepsPrintPlugin
```

### Results — build 1.0 (2) (commit `7233e8e`) and current `main`, both verified 2026-08-09

| Check | Result |
|---|---|
| Network calls | **0** |
| External URLs | **1** — `http://www.w3.org/2000/svg`, an XML namespace identifier. Never fetched; it is how SVG elements are created. Worth knowing about in case a string scan surfaces it. |
| Storage APIs | **0** |
| Outbound links | **0** |
| Remote font refs | **0** — fonts self-hosted, `@font-face … src: url(../assets/fonts/*.woff2)` |
| Info.plist usage keys | **0** |
| Third-party SDKs | **none** — only `@capacitor/core`, `/ios`, `/splash-screen`, `/status-bar` |
| Native code | `AppDelegate`, `MainViewController`, `FootstepsPrintPlugin` (AirPrint only) |

---

## What would make these answers false

Check this list before every submission — each of these silently breaks a "no":

- **Any outbound link.** Kids Category requires a **parental gate** on anything leaving
  the app (a website, a donation, a social link, a "Why We Made This" page). The app is
  compliant today only because it has zero links.
- **Growing the `INCLUDE` list in `scripts/build-web.js`.** `prototypes/`, `tools/`, and
  `workshops/` still contain a Google Fonts `@import`. Shipping one would send the
  child's IP to Google and make "no data shared with third parties" untrue.
- **A live model call in the workshop.** `inferIntent` in `src/workshop.js` carries a
  comment about being swappable for a Claude API call. Doing that would break both the
  offline promise and the Data Not Collected declaration.
- **Adding persistence** (the Preferences plugin, a saved-progress feature) — re-answer
  question 4 honestly if so; on-device-only storage is still worth declaring carefully.
- **Any `*UsageDescription` key** appearing in Info.plist.
