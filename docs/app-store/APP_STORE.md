# Footsteps of the Teacher — App Store submission

Working notes for the iOS 1.0 submission. Build steps live in `../../MAC_SETUP.md`.

## Decisions (2026-07-28)

| | |
|---|---|
| Bundle id | `com.bestrongagain.footsteps` |
| Team | `M7A7RJL78X` (Individual, Apple ID big_g_rogers@yahoo.com) |
| Devices | **iPhone only** (`TARGETED_DEVICE_FAMILY = 1`) — iPad layout is untested; ship it as 1.1 |
| Category | **Kids, Ages 9–11** |
| Price | **$4.99** |
| Privacy policy | https://glen-collab.github.io/bible/privacy.html (live) |

## Status

- [x] Xcode project committed, signs automatically
- [x] Runs in simulator; signed Release build for device verified
- [x] App icon (1024², real artwork) + splash generated
- [x] `ITSAppUsesNonExemptEncryption = false` in Info.plist
- [x] Screenshots captured, 1320×2868 (6.9")
- [ ] **App Store Connect record created** ← blocks the upload
- [ ] Archive → export → validate → upload
- [ ] Listing filled in, submitted

## Screenshots

In `screenshots/`, all 1320×2868 (Apple's 6.9" slot — an iPhone-only app needs
only this size). Suggested upload order, strongest first:

1. `04-workshop.png` — the differentiator: real JS console + grid + the Elah artwork
2. `03-investigate.png` — deduction loop, clue choices, Wisdom + badge
3. `01-home.png` — case picker, sets the tone
4. `06-roundtable.png` — the parent/child discussion beat
5. `05-finale.png` — "bring the scene to life", code streaming
6. `02-case-intro.png` — case framing (weakest; lots of empty space)

Captured by patching `index.html` inside the installed simulator bundle to
auto-run `FootstepsApp.*` calls, then `xcrun simctl io … screenshot`. Two traps:
the simulator's keyboard tutorial overlay covers the lower half unless the
command input is `.blur()`ed, and the page must be `window.scrollTo(0,0)`ed
after driving it or the header is cut off.

## Listing copy (draft)

**Name:** Footsteps of the Teacher
*(check availability — "Week Ender" was taken and needed a suffix)*

**Subtitle (30 char max):** `Bible stories, real code`  — 24

**Promotional text:** Eleven Bible stories to investigate, and eleven scenes to
build with real JavaScript. No ads, no accounts, works with no signal.

**Description:**

> Footsteps of the Teacher is a deduction-and-discovery game that walks kids
> through eleven Bible stories — and then hands them the scribe's pen to build
> each scene in real code.
>
> **Investigate the story.** Each case follows a real journey across real
> places. Gather clues, weigh what you found, and choose where the trail
> leads. Wrong answers aren't punished — they're gentle detours, and nothing
> is ever lost. Earn Wisdom and collect badges along the way.
>
> **Then build it yourself.** Finish a case and its Workshop unlocks, where
> kids type actual JavaScript — `place("david", 1, 3)` — to set the scene.
> Ada, an owl who reads what you meant, helps when a command doesn't land.
> Tap a piece to move, resize, rotate, or flip it, and watch the code update
> as you go. When the scene is ready, bring it to life and watch the code run.
>
> **The Round Table.** Between the story and the workshop there's an optional
> table for a grown-up and a child to talk it over. The questions change every
> visit, so you can come back to it again and again.
>
> Eleven cases: the Long-Awaited One, the Shepherd Who Became King, the Long
> Road to Freedom, the Barley Field, the Damascus Road, the Ark and the
> Promise, the Lions' Den, the Empty Tomb, the Loaves and Fishes, the Garden,
> and the Sermon on the Mount.
>
> Scripture is always paraphrased in kid-friendly language, never quoted
> verbatim. Wisdom is a reward to collect, never a currency to spend.
>
> No ads. No accounts. No analytics. Nothing is collected, and the whole game
> works with no signal at all.

**Keywords (100 char):**
`bible,kids,christian,coding,javascript,learn,faith,sunday school,stories,game,education,scripture`

**Support URL:** https://glen-collab.github.io/bible/
**Marketing URL:** https://glen-collab.github.io/bible/

## Privacy answers (derived from the code, not guessed)

**Data collected: NONE.** Verified — `ios/App/App/public/` contains zero
external URLs. No analytics SDK, no ad SDK, no accounts, no network calls of
any kind. (The `fonts.googleapis.com` references in the repo are only in
`workshops/the-donkey.html`, `tools/`, and `prototypes/`, none of which
`scripts/build-web.js` copies into `www/`. Fonts ship self-hosted from
`assets/fonts/`.) Answer "No" to every data-collection question and
"No" to tracking.

## Kids Category compliance

The Kids category is stricter, and this app clears it cleanly:

- **No third-party analytics or advertising** — verified, no SDKs at all.
- **No data collected from anyone**, so nothing can leave the device.
- **No links out of the app**, so no parental gate is required. *If a link is
  ever added (a website, a donation, anything), a parental gate becomes
  mandatory — this is the single easiest way to break Kids-category
  compliance later.*
- **Privacy policy URL is required** for Kids and is live.

## Age rating questionnaire — answer honestly

The stories include armies, a giant, and a lions' den. Expect to declare
**Cartoon or Fantasy Violence: Infrequent/Mild**. Everything else is None.
Unrestricted Web Access: **No**.

## Upload workflow (reused from Week Ender, no Xcode UI)

App Store Connect API key `P4QNC2CX4T`, issuer
`3bed938b-80ba-4f75-a6ef-8199ac4c4ef2`, `.p8` at
`~/.appstoreconnect/private_keys/AuthKey_P4QNC2CX4T.p8` (chmod 600, kept
outside the repo — Apple only lets you download it once).

```bash
cd ~/bible && npm run build:web && npx cap sync ios
cd ios/App
xcodebuild -workspace App.xcworkspace -scheme App -configuration Release \
  -destination 'generic/platform=iOS' -archivePath <S>/Footsteps.xcarchive \
  -allowProvisioningUpdates archive
xcodebuild -exportArchive -archivePath <S>/Footsteps.xcarchive \
  -exportOptionsPlist <S>/ExportOptions.plist -exportPath <S>/export \
  -allowProvisioningUpdates
xcrun altool --validate-app -f <S>/export/App.ipa -t ios \
  --apiKey P4QNC2CX4T --apiIssuer 3bed938b-80ba-4f75-a6ef-8199ac4c4ef2
xcrun altool --upload-app -f <S>/export/App.ipa -t ios \
  --apiKey P4QNC2CX4T --apiIssuer 3bed938b-80ba-4f75-a6ef-8199ac4c4ef2
```

ExportOptions.plist: `method=app-store-connect`, `teamID=M7A7RJL78X`,
`signingStyle=automatic`, `uploadSymbols=true`.

**Gotcha carried over from Week Ender:** `archive` signs with the
*development* identity and needs a **registered device** on the account even
though it's a store build (Glen's iPhone 17 Pro already is). Distribution
signing happens later at `-exportArchive`, using the Cloud Managed Apple
Distribution cert — which is why `security find-identity` shows no
distribution cert. Verify with `codesign -dvvv` on the exported app instead.

## Review notes

Nothing to write about sign-in — there are no accounts and no login. Worth
telling the reviewer the app is fully offline so they don't look for network
behaviour that isn't there.

## After any web change

```bash
npm run build:web && npx cap sync ios
```
then re-archive. Bump `MARKETING_VERSION` / `CURRENT_PROJECT_VERSION` in the
pbxproj before each upload — App Store Connect rejects a duplicate build
number.
