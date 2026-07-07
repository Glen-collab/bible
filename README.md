# Footsteps

**Learn to write real code by building the stories you already know by heart.**

Footsteps is a series of tiny, self-contained coding workshops. Each one gives a
beginner a real JavaScript console and a scene to build — a familiar Bible story,
one line of code at a time. Type `place("donkey", 3, 4)` and the donkey appears on
the grid. **Ada the owl** 🦉 tutors gently: she catches typos, guesses what you
meant ("Did you mean `place("donkey", 3, 4)`?"), and never scolds.

> *Same Truth · New Scribes* — the oldest stories, retold in the newest hand.

## Why

It's built to **bridge the gap into new learning**: start from something already
known by heart (the manger scene) so all the beginner's attention can go to the
one new thing — the code. Real syntax, real errors, but with a soft net under
every mistake.

## Workshops

| # | Name | Teaches | Status |
|---|------|---------|--------|
| 01 | The Donkey | `place()`, `move()`, strings, grid coordinates | ✅ Ready |
| 02 | The Parting | loops & repetition | 🚧 Planned |

## Run it

No build step, no dependencies. Either:

- **Open directly** — double-click `index.html`, or
- **Serve locally** (recommended, so relative links work everywhere):

  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

Once deployed via GitHub Pages, it's a shareable link — anyone can open it in a
browser, phone included.

## Structure

```
bible/
├── index.html            # Footsteps home / workshop picker
├── workshops/
│   └── the-donkey.html   # Workshop 01 — a complete, standalone lesson
└── README.md
```

## Add a new workshop

1. Copy an existing file in `workshops/` as a starting point — each workshop is a
   single self-contained HTML file (styles + logic inline, no shared dependencies).
2. Define the scene: the `ITEMS` map (emoji palette), the grid size, and the
   `RUNGS` array (the guided steps, each with a `goal` and a `check`).
3. Add a card for it in `index.html`.

Keeping each workshop as one standalone file is deliberate: any lesson can be
opened, shared, or remixed on its own.
