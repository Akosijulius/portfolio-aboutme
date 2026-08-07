# Julius — About Me Portfolio

A modern, dark, glassmorphism personal portfolio for **Julius — Aspiring AI Full Stack Developer**. Built with plain **HTML, CSS & JavaScript** — no frameworks, no build step, zero dependencies.

![Theme](https://img.shields.io/badge/theme-dark-0b1120) ![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-3b82f6) ![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

- **Single-page layout** — Hero, About, Skills, Projects, Experience, Certificates, Resume, Contact, Footer
- **Dark + glassmorphism design** with a blue accent and subtle animated glow orbs
- **Fully responsive** — desktop, tablet, and mobile (hamburger menu)
- **Scroll-reveal animations** (respects `prefers-reduced-motion`)
- **Recruiter-friendly** — semantic HTML, accessible, SEO + Open Graph meta tags
- **Instant load** — no dependencies, no build step

## 📁 Project structure

```
aboutme/
├── index.html            # All page content (edit your details here)
├── css/
│   └── style.css         # Design system + all styling + responsive breakpoints
├── js/
│   └── main.js           # Nav toggle, scroll reveal, active section, back-to-top
└── assets/
    ├── images/
    │   ├── IDpic.jpg     # Your photo (currently empty — drop your real photo here)
    │   └── profile.svg   # Fallback avatar (used if IDpic.jpg is missing)
    └── Julius_Montillano_resume.pdf  # Your resume
```

## 🚀 Run locally

No install needed. Either:

1. **Double-click `index.html`** to open it directly in your browser, or
2. Run a local server (recommended, so the resume download has a real origin):

   ```bash
   # Python
   python -m http.server 8000
   # or Node
   npx serve .
   ```

   Then open `http://localhost:8000`.

## ✏️ Customize

Everything is plain HTML/CSS — find each item by its `EDIT:` comment.

| What | Where |
| --- | --- |
| **Photo** | Your hero `<img>` already points at `assets/images/IDpic.jpg` — drop your real photo into that file (it's currently empty) |
| **Resume** | Replace `assets/Julius_Montillano_resume.pdf` with your latest resume |
| **Bio / intro** | `#about` section and the Hero intro paragraph in `index.html` |
| **Socials + email** | Hero social links and the Contact section (search for `your-username`) |
| **Skills** | Skill categories & chips in `#skills` |
| **Projects** | Project cards in `#projects` (swap the gradient thumbnails for screenshots if you like) |
| **Experience** | Timeline entries in `#experience` |
| **Certificates** | Cards in `#certificates` |
| **Colors / fonts / radius** | CSS custom properties in `:root` at the top of `css/style.css` |
| **Section order** | Rearrange the `<section>` blocks in `index.html` |

### Swap the colors

Edit the tokens in `css/style.css` → `:root`:

```css
--accent: #3b82f6;      /* primary blue */
--accent-2: #60a5fa;    /* lighter blue */
--bg: #070b14;          /* page background */
```

## ☁️ Deploy

Because it's pure static files, deploy anywhere:

- **GitHub Pages** — push the repo, enable Pages on `main`/`/docs`
- **Netlify** — drag-and-drop the folder at app.netlify.com/drop
- **Vercel** — import the project, it auto-detects a static site

## ♿ Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`)
- Keyboard-navigable with visible focus rings (`:focus-visible`)
- Screen-reader labels on icon-only links
- `prefers-reduced-motion` disables animations
- Content stays visible if JavaScript is disabled (progressive enhancement)

## 📄 License

MIT — free to use, modify, and share.
