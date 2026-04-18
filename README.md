# hari-varshan/portfolio

> yes, I built my own portfolio. no, I will not be taking questions.

This is my personal portfolio site — the one you land on when you Google me, judge me in 4 seconds, and either close the tab or reach out. Built to make those 4 seconds count.

Live at → **[harivarshan.dev](https://harivarshan.dev)** *(or wherever I eventually deploy this)*

---

## what's in here

A single-page portfolio for **Hari Varshan** — AI Engineer, multi-agent systems nerd, and someone who spent way too much time perfecting a scroll progress bar.

- **Hero** — big name, bigger font (Fraunces, obviously), spring-animated letters that bounce on load and wave when you hover them. yes, I was bored.
- **Selected Work** — actual things I built at work. 3D tilt on hover because flat cards are a crime.
- **Experience** — where I've worked, what I shipped, timeline with glowing cyan dots.
- **Contact** — cards that bounce off the screen at you when hovered. you're welcome.
- **Dark mode** — because I couldn't choose between the cream warmth and the deep navy-black with neon cyan and decided you should have both.

---

## stack

```
Next.js 16   Tailwind CSS v4   Framer Motion   TypeScript
```

Fonts: **Fraunces** (the name, for drama) · **Geist** (headings) · **DM Sans** (body)

---

## running it locally

```bash
npm install
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

**if you changed the profile photo and it still shows the old one:**

```powershell
# stop the server first, then:
Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
npm run dev
# then F12 → right-click refresh → "Empty Cache and Hard Reload"
```

Next.js image caching is aggressive and personal.

---

## editing content

Everything is in `src/data/`. JSON files. No code needed.

| file | controls |
|---|---|
| `hero.json` | name, role, tagline, P.S. note, skills |
| `projects.json` | project cards in Selected Work |
| `experience.json` | companies and what I built there |
| `contact.json` | email, phone, GitHub, LinkedIn |

Profile photo → `public/profile.jpg` (replace + clear cache as above)

See `customization.md` for the full guide *(gitignored, lives locally)*.

---

## deploying

Works out of the box on **Vercel**. Connect the repo, it detects Next.js, done.

```bash
npm run build   # verify before pushing
```

---

## why did you build this yourself

because I wanted to. also because every template looked like every other template and I have opinions.

---

*— Hari Varshan, probably debugging at 11pm*
