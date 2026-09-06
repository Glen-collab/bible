# App Review notes — Footsteps of the Teacher

Paste the block below into **App Review Information → Notes** on every version.

It answers the four Kids-Category questions **before** they are asked. Apple asked them
against 1.0 on 2026-08-06 and will ask again on each version; `KIDS-CATEGORY-ANSWERS.md`
holds the re-runnable verification behind each claim. Re-run that verification before
pasting this, so the answers are true of the build being submitted rather than of a build
from two months ago.

---

```
Footsteps of the Teacher has no accounts and no login, so no demo account is needed.
Nothing in the app is gated or purchasable.

WHAT IT IS
A faith-based app for children, in two halves that run back to back.

First, a deduction case. The child walks a Bible figure's journey, investigates the
places along it, weighs the clues they find, and decides where the trail leads next.
A wrong choice is not a failure — it becomes a short "detour" with a lesson attached,
and no progress is lost. They earn Wisdom (a reward track, never a currency) and badges.

Then, a coding workshop for that same story. The child types real JavaScript into a
console — place("donkey", 3, 4) — and the piece appears on a grid over the story's
artwork. An owl named Ada tutors gently and reads intent, so a near-miss gets "did you
mean...?" rather than an error. Between the two sits a Round Table: a short parent-and-
child discussion of the theme.

HOW TO SEE IT WORK
1. Open the app and tap any case on the home screen — "The Long-Awaited One" is the
   shortest.
2. Tap the spots at each location to gather clues, then answer the question. Answering
   wrongly on purpose is worth doing: it shows the detour, which is the heart of the
   design.
3. Finish the case to reach the win screen with Wisdom, rank and badges.
4. Continue into the coding workshop. Type the command Ada suggests and press Run.
5. In the workshop, tap any placed piece to select it. The arrows nudge it a quarter of
   a square; "Print Coloring Page" opens the system print sheet.

KIDS CATEGORY — THE FOUR STANDING ANSWERS
1. Third-party analytics: NO.
2. Third-party advertising: NO.
3. Data shared with third parties: NO.
4. Any other user or device data collected: NO.

The app is entirely offline and makes no network requests at all. There is no fetch,
XMLHttpRequest, WebSocket or sendBeacon anywhere in the shipped code, and no analytics
or advertising SDK is linked. It stores nothing: no localStorage, no sessionStorage, no
IndexedDB, no cookies — no progress or state persists between launches. It requests no
permissions; the Info.plist contains no usage-description keys at all. Fonts are bundled
rather than fetched, so no request leaves the device for them either. There are no links
out of the app, so no parental gate is required because there is nothing to gate.

This matches our App Privacy declaration of Data Not Collected.

The only native functionality beyond drawing the screen is AirPrint, used by the "Print
Coloring Page" button. It presents the system print sheet through
UIPrintInteractionController and needs no permission and no photo-library access.

ON THE AGE RATING
Rated 9+ and placed in the 9-11 Kids band. The app references Bible narrative that
includes conflict — David and Goliath, the plagues, the crucifixion — but never depicts
violence: there is no violent imagery, and no violent action the child performs. The
framing is consistently the opposite; the David case turns on him choosing NOT to strike
the king who hunted him, and one chapter is titled "Not by Sword or Spear". The 9-11 band
also matches the actual audience, since the workshops have children typing real
JavaScript.

WHAT CHANGED IN 1.1
The Empty Tomb workshop's piece coordinates were retuned to match its artwork. The nudge
arrows now move a piece a quarter of a grid square instead of a whole one. Badges that
have not been earned yet now show what they are for instead of the word "Locked", and
finishing a case one badge short names the one still outstanding.

DEVICES TESTED
iPhone 17 Pro and iPhone 14, both iOS 26.6, physical devices. iPhone only —
TARGETED_DEVICE_FAMILY is 1.

EXTERNAL SERVICES
None. No backend of ours, no analytics, no advertising, no third-party SDKs, no AI
services. The app works with the device in airplane mode.

DATA DELETION
There is no account to delete and nothing is stored. Deleting the app removes it
entirely.
```
