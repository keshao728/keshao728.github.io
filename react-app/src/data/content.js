// All editable portfolio content lives here so components stay presentational.

export const profile = {
  name: 'Kelly Shao',
  tagline: 'Frontend Engineer & UI/UX Designer',
  // Rotating phrases for the hero typewriter effect.
  roles: [
    'Frontend Engineer',
    'UI/UX Designer',
    'SolidJS & TypeScript Developer',
    'Builder of delightful interfaces',
  ],
  email: 'kellyshao728@gmail.com',
  about:
    "I'm a frontend engineer and UI/UX designer at MagicDoor, where I've spent 3+ years crafting the interfaces of a cloud property-management platform - from polished, tenant-facing portals to the internal tooling and CMS that power them. My sweet spot is the place where design meets code: turning ambiguous product ideas into clean, fast, accessible UIs with SolidJS, React, TypeScript and TailwindCSS. I care deeply about the details that make software feel effortless - the micro-interactions, the loading states, the empty screens nobody else thinks about.\n\nWith a Google UX Design certification and a background in communications, I obsess over the user and how an interface feels, not just how it works. Outside work I volunteer as a software engineer with Code for America.",
  // Quick stats for the about counters
  stats: [
    { value: 3, suffix: '+', label: 'Years at MagicDoor' },
    { value: 6, suffix: '+', label: 'Products shipped' },
    { value: 15, suffix: '+', label: 'Technologies' },
    { value: 100, suffix: '%', label: 'Design-obsessed' },
  ],
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/keshao728', icon: 'fa-brands fa-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/keyingshao/', icon: 'fa-brands fa-linkedin-in' },
  { label: 'AngelList', href: 'https://angel.co/u/kelly_shao', icon: 'fa-brands fa-angellist' },
]

// Key skills highlighted as labeled nodes on the hero sphere.
export const sphereSkills = [
  'React',
  'SolidJS',
  'TypeScript',
  'TailwindCSS',
  'JavaScript',
  'UI/UX',
  'Figma',
  'CSS',
]

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#service' },
  { label: 'Projects', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

// `icon` is a Font Awesome / Devicon class name.
export const skills = [
  { name: 'Javascript', icon: 'fa-brands fa-square-js' },
  { name: 'Python', icon: 'fa-brands fa-python' },
  { name: 'React', icon: 'fa-brands fa-react' },
  { name: 'Redux', icon: 'devicon-redux-original' },
  { name: 'HTML', icon: 'devicon-html5-plain' },
  { name: 'CSS', icon: 'devicon-css3-plain' },
  { name: 'MySQL', icon: 'devicon-mysql-plain' },
  { name: 'Express', icon: 'devicon-express-original' },
  { name: 'Sequelize', icon: 'devicon-sequelize-plain' },
  { name: 'SQLAlchemy', icon: 'devicon-sqlalchemy-plain' },
  { name: 'SQLite', icon: 'devicon-sqlite-plain' },
  { name: 'Flask', icon: 'devicon-flask-original' },
  { name: 'jQuery', icon: 'devicon-jquery-plain' },
  { name: 'Postgres', icon: 'devicon-postgresql-plain' },
  { name: 'Docker', icon: 'devicon-docker-plain' },
]

// Professional / recent work. `image` is optional; when absent we render a
// placeholder card with an icon (matching the original placeholder-bg cards).
export const recentWork = [
  {
    title: 'MagicDoor - Official Website',
    tools: 'TailwindCSS, Astro, TypeScript',
    description:
      'MagicDoor is transforming property management with our Cloud Property Management Platform. Designed for property managers, our solution simplifies everything from rent collection, tenant screening, maintenance requests, accounting, rental applications, property listings, and much more.',
    image: 'images/work/magicdoor.gif',
    links: [{ href: 'https://www.magicdoor.com/', icon: 'fa-solid fa-link' }],
    wide: true,
  },
  {
    title: 'MagicDoor Property Management Portal',
    tools: 'SolidJS, TypeScript, TailwindCSS',
    description:
      'The core dashboard property managers live in all day - rent collection, accounting, tenant screening, maintenance, and listings in one fast SolidJS app. Built data-heavy tables, bulk actions, and real-time workflows that keep large portfolios manageable.',
    placeholderIcon: 'fa-solid fa-building-user',
  },
  {
    title: 'MagicDoor Tenant Portal',
    tools: 'SolidStart, TypeScript, TailwindCSS',
    description:
      'The tenant side of the platform: pay rent, view and sign leases, submit maintenance requests with photos, and message property managers - all in a mobile-first experience designed to make renting feel modern instead of bureaucratic.',
    placeholderIcon: 'fa-solid fa-house-user',
  },
  {
    title: 'MagicDoor White Label Website',
    tools: 'SolidStart, TypeScript, TailwindCSS',
    description:
      'A configurable, white-labeled site solution that lets property-management companies spin up a branded web presence with their own logo, colors, and live property listings - their brand, our engine.',
    placeholderIcon: 'fa-solid fa-globe',
  },
  {
    title: 'MagicDoor Internal Portal',
    tools: 'SolidJS, TypeScript, TailwindCSS',
    description:
      'The internal command center for the MagicDoor team - admin tooling, account management, and operational dashboards that let support and ops resolve issues quickly across every customer account.',
    placeholderIcon: 'fa-solid fa-lock',
  },
  {
    title: 'MagicDoor CMS',
    tools: 'SolidStart, TypeScript, TailwindCSS',
    description:
      'An internal content management system I helped build so the team can manage and publish updates to magicdoor.com without shipping code. Marketing pages, blog posts, and site content are all editable through a custom admin interface, turning what used to be engineering tickets into a few clicks.',
    placeholderIcon: 'fa-solid fa-pen-ruler',
  },
  {
    title: 'Unlocked Studios',
    tools: 'Contract work',
    description:
      'A marketing website I designed and built for Unlocked Studios, an independent game development studio - a bold, immersive landing experience to showcase their team and indie game projects.',
    placeholderIcon: 'fa-solid fa-gamepad',
    links: [{ href: 'https://www.unlockedstudios.net/', icon: 'fa-solid fa-link' }],
  },
  {
    title: 'MG Beauty',
    tools: 'Shopify - contract work',
    description:
      'A custom Shopify storefront I built for MG Hair & Beauty Salon, a local San Francisco shop - taking them from in-person-only to a polished online store with product listings, theming, and checkout.',
    image: 'images/work/w-4.png',
    wide: true,
  },
]

export const studentWork = [
  {
    title: 'Varorant',
    tools: 'Python, Javascript, CSS3, HTML5, Flask, React.js, Redux, SQLite, Postgres',
    description:
      'Inspired by the Valorant homepage, Varorant is a full-stack website that focuses on user experience where users may submit tickets or media in the community.',
    image: 'images/work/w-1.gif',
    links: [
      { href: 'https://github.com/keshao728/Varorant', icon: 'fa-brands fa-github' },
      { href: 'https://varorant.herokuapp.com/', icon: 'fa-solid fa-link' },
    ],
    wide: true,
  },
  {
    title: 'Meowbnb',
    tools: 'Javascript, CSS3, HTML5, React.js, Redux, Express.js, Sequelize, SQLite, Postgres',
    description:
      'Inspired by Airbnb, Meowbnb is a full-stack online booking platform that focuses on short-term homestays for cats.',
    image: 'images/work/w-3.png',
    links: [
      { href: 'https://github.com/keshao728/Meowbnb', icon: 'fa-brands fa-github' },
      { href: 'https://meow-bnb.herokuapp.com/', icon: 'fa-solid fa-link' },
    ],
  },
  {
    title: 'Ingenius',
    tools: 'Python, Javascript, CSS3, HTML5, Flask, React.js, Redux, SQLite, Postgres',
    description:
      'Inspired by Genius, Ingenius is a full-stack web application that allows users to provide annotations and interpretations of song lyrics.',
    image: 'images/work/w-2.png',
    links: [
      { href: 'https://github.com/keshao728/Ingenius', icon: 'fa-brands fa-github' },
      { href: 'https://geniuskelly-fries.onrender.com/', icon: 'fa-solid fa-link' },
    ],
  },
]
