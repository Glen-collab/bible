# Footsteps of the Teacher — iOS App (Capacitor) build guide

The web app is unchanged and still lives at the repo root (GitHub Pages keeps
working). Capacitor bundles those same files into a native iOS app that runs
**fully offline**. Everything below runs **on a Mac with Xcode installed**.

> One-time before you start: an **Apple Developer account** ($99/yr) and, for
> the App Store listing, a short **privacy policy URL** (this app collects no
> data — a one-paragraph page is enough; ask Claude to write it).

---

## What's already set up (done on Windows)

- **Fonts self-hosted** in `assets/fonts/` — no internet needed for the app to
  look right.
- **`package.json`** — Capacitor dependencies + helper scripts.
- **`capacitor.config.json`** — app name, id, colors, splash.
- **`scripts/build-web.js`** — copies the web app into a clean `www/` folder
  (what Capacitor bundles). Run via `npm run build:web`.
- **`resources/icon.png`** (1024×1024) and **`resources/splash.png`** (2732×2732)
  — placeholder art you can replace with your own, then re-run `npm run icons`.
- **iOS meta tags + safe-area CSS** so it fits the notch and home indicator.

**Check `appId` first:** it's currently `com.bestrongagain.footsteps` in
`capacitor.config.json`. Change it if you want a different bundle id — it must be
unique and match what you register in your Apple Developer account.

---

## Status: already done on the Mac (2026-07-28)

The iOS project is **built, signed, and committed**. `ios/` is in the repo, the
signing team is set (`DEVELOPMENT_TEAM = M7A7RJL78X`, automatic signing), and
the app has been verified running in the iPhone 17 simulator and building a
signed Release for a real device. You can skip straight to **Archive** below.

Two setup gotchas that were hit and fixed, for reference:

- **CocoaPods was not installed.** No Homebrew on this Mac, and macOS ships
  Ruby 2.6, so a plain `gem install cocoapods` fails on modern dependencies.
  What worked (no sudo):
  ```bash
  gem install --user-install ffi -v 1.15.5
  gem install --user-install zeitwerk -v 2.6.18
  gem install --user-install i18n -v 1.14.8
  gem install --user-install --conservative activesupport -v 6.1.7.10
  gem install --user-install --conservative cocoapods -v 1.12.1
  ```
  `~/.gem/ruby/2.6.0/bin` was added to `PATH` in `~/.zshrc`.
- **`npm run icons` pointed at the wrong folder** — it defaulted to `assets/`
  (the game art) instead of `resources/`. The script now passes
  `--assetPath resources`.
- npm 11 blocks package install scripts; `npm approve-scripts sharp` is needed
  once before `npm run icons` will work.

---

## First-time build (run in the repo folder on your Mac)

```bash
# 1. install dependencies
npm install

# 2. build the web bundle into www/
npm run build:web

# 3. add the iOS platform (creates the ios/ folder + Xcode project)
npx cap add ios

# 4. generate all icon + splash sizes from resources/
npm run icons

# 5. copy the web bundle + config into the iOS project
npx cap sync ios

# 6. open the project in Xcode
npx cap open ios
```

## In Xcode (no coding — just clicks)

1. Select the **App** target → **Signing & Capabilities** tab.
2. Check **Automatically manage signing**, pick your **Team** (your Apple
   Developer account). Xcode fills in the provisioning profile.
3. Set a **Display Name** ("Footsteps of the Teacher") and confirm the
   **Bundle Identifier** matches `appId`.
4. Pick a real iPhone (or a simulator) at the top and press **▶ Run** to test.
5. To submit: choose **Any iOS Device (arm64)** as the target →
   **Product ▸ Archive** → when the Organizer opens, **Distribute App ▸
   App Store Connect ▸ Upload**.
6. Finish the listing (screenshots, description, privacy) at
   [App Store Connect](https://appstoreconnect.apple.com) → submit for review.

---

## After you change the web app later

Any time you edit the game (new scenes, tweaks) and want it in the app:

```bash
npm run build:web && npx cap sync ios
```

Then re-open Xcode and Archive again. That's it.

## Replacing the icon / splash with your own art

Drop your own `resources/icon.png` (1024×1024) and `resources/splash.png`
(2732×2732, keep the important art centered), then:

```bash
npm run icons && npx cap sync ios
```

---

## Notes / gotchas

- **Xcode version:** if `npx cap add ios` complains about a Capacitor/Xcode
  version mismatch, run
  `npm install @capacitor/core@latest @capacitor/cli@latest @capacitor/ios@latest`
  and try again.
- **Kids app:** the app has no ads, no analytics, and collects no data, which
  keeps it clean for Apple's Kids-category rules. You'll still declare
  "no data collected" in App Store Connect's privacy section.
- **Offline:** the app is fully self-contained — no server, no network calls —
  so it works with no signal. That's a strong point for App Store review
  (it's a real app, not a wrapped website).
- `www/`, `node_modules/`, and iOS build artifacts are git-ignored, so they
  won't clutter the repo or the GitHub Pages site.
