# Kelly Shao Portfolio — React rewrite

The portfolio rebuilt with **React + Vite + TailwindCSS**. This replaces the
original static `index.html` (Bootstrap + jQuery) at the repo root.

## Develop

```bash
cd react-app
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to ../docs
```

The build writes to `../docs` (gitignored) so GitHub Pages can serve the site
from the `/docs` folder once this branch is merged to `main` — set
**Settings → Pages → Source** to `main` / `/docs`.

## Editing content

All copy lives in [`src/data/content.js`](src/data/content.js) — profile, skills,
projects, and social links. Add a project by appending an object to `recentWork`
or `studentWork`; drop its image in `public/images/work/` and reference it as
`images/work/<file>`. Projects without an `image` render an icon-placeholder card.

## Structure

```
src/
  App.jsx            section layout
  data/content.js    all editable content
  components/        Navbar, Header, About, Skills, CallToAction,
                     Work, WorkCard, Contact, Footer, BackToTop
public/images/       carried over from the original site
```

Icons come from the Font Awesome kit and Devicon, loaded via CDN in `index.html`.
The contact form posts to the same Formspree endpoint as the original site.
