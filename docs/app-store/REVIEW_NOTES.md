# App Review notes — Footsteps of the Teacher

Paste the block below into **App Review Information → Notes** on every version.

It answers the four Kids-Category questions **before** they are asked. Apple asked them
against 1.0 on 2026-08-06 and will ask again on each version; `KIDS-CATEGORY-ANSWERS.md`
holds the re-runnable verification behind each claim. Re-run that verification before
pasting this, so the answers are true of the build being submitted rather than of a build
from two months ago.

---

```
Footsteps of the Teacher has no accounts and no login, so no demo account is
needed. Nothing is gated or purchasable.

WHAT IT IS
A Bible app for children in two halves. First a detective-style case: the child
walks a Bible figure's journey, gathers clues at each place, and decides where the
trail leads. A wrong answer is not a failure — it becomes a short "detour" with a
lesson, and no progress is lost. Then a coding workshop for that same story, where
the child types real JavaScript — place("donkey", 3, 4) — and the piece appears on
the artwork. An owl named Ada tutors them.

HOW TO SEE IT WORK
1. Tap any case on the home screen. "The Long-Awaited One" is the shortest.
2. Tap the spots to gather clues, then answer the question.
3. Answer wrongly once on purpose — the detour is the heart of the design and you
   will not see it otherwise.
4. Finish the case, then continue into the coding workshop and type the command
   Ada suggests.
5. In the workshop, tap a placed piece to select it. The arrows nudge it a quarter
   of a square.

KIDS CATEGORY — THE FOUR ANSWERS
1. Third-party analytics: NO.
2. Third-party advertising: NO.
3. Data shared with third parties: NO.
4. Any other user or device data collected: NO.

The app runs entirely offline — it works in airplane mode and makes no network
requests at all. It saves nothing: no progress or settings persist between
launches. It asks for no permissions of any kind. There are no links out of the
app, so there is nothing a parental gate would protect. This matches our App
Privacy declaration of Data Not Collected.

The only system feature it uses is AirPrint, for the "Print Coloring Page" button.

AGE RATING
Rated 9+, in the 9-11 Kids band. The stories reference conflict — David and
Goliath, the plagues, the crucifixion — but nothing violent is ever shown, and the
child never performs a violent action. The framing runs the other way: the David
case turns on him choosing not to strike the king hunting him, and a chapter is
titled "Not by Sword or Spear". The 9-11 band also fits an audience old enough to
type JavaScript.

WHAT CHANGED IN 1.1
The Empty Tomb workshop now lines up with its artwork. The nudge arrows move a
piece a quarter of a square instead of a whole one. Badges not yet earned show
what they are for instead of saying "Locked", and finishing a case one badge short
names the one still missing.

Tested on iPhone 17 Pro and iPhone 14, iOS 26.6. iPhone only.
```

---

## Why this is shorter than it was

The first draft ran to 673 words and named APIs — `fetch`, `sendBeacon`,
`UIPrintInteractionController`, `TARGETED_DEVICE_FAMILY`. All true, and all of it buried
the four answers a Kids-Category reviewer is actually looking for. A reviewer skims. The
claims are unchanged, just said in plain words: "works in airplane mode" is the same fact
as "no fetch, XMLHttpRequest, WebSocket or sendBeacon", and easier to check.

The technical evidence still exists, in `KIDS-CATEGORY-ANSWERS.md`, with the commands to
re-run it. That is the right place for it — send it **if** they ask a follow-up, rather
than opening with it.
