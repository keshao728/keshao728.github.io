// All editable portfolio content lives here so components stay presentational.

export const profile = {
  name: 'Kelly Shao',
  tagline: 'A Full Stack Web Developer / Software Engineer',
  email: 'kellyshao728@gmail.com',
  phone: '+1-415-613-2047',
  about:
    "I am a full-stack software engineer with prior communications experience, currently absorbing as much knowledge as I can to perfect my craft in software development. My specialties include quickly learning new technologies and languages, problem-solving, communication and website optimization.",
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/keshao728', icon: 'fa-brands fa-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/keyingshao/', icon: 'lni-linkedin-original' },
  { label: 'AngelList', href: 'https://angel.co/u/kelly_shao', icon: 'fa-brands fa-angellist' },
]

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#service' },
  { label: 'Projects', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

// Floating hero shapes (ported from the original parallax layers). `depth`
// drives how far each shape moves with the mouse — bigger = more movement.
// `style` positions the shape; `width` matches the original responsive sizing.
export const heroShapes = [
  { src: 'images/banner/shape/shape-1.png', depth: 0.1, style: { top: 0, left: 0 } },
  { src: 'images/banner/shape/shape-2.png', depth: 0.3, style: { top: -18, left: '20%' } },
  { src: 'images/banner/shape/shape-3.png', depth: 0.4, style: { top: 0, left: '40%' } },
  { src: 'images/banner/shape/shape-2.png', depth: 0.6, style: { top: 28, right: '7.6%' } },
  { src: 'images/banner/shape/shape-1.png', depth: 0.2, style: { right: 30, bottom: '35%' } },
  { src: 'images/banner/shape/shape-4.png', depth: 0.15, style: { top: '44%', left: '13%' } },
  { src: 'images/banner/shape/shape-5.png', depth: 0.5, style: { left: 30, bottom: 50 } },
  { src: 'images/banner/shape/shape-3.png', depth: 0.4, style: { left: 90, bottom: 140 } },
  { src: 'images/banner/shape/shape-6.png', depth: 0.2, style: { left: '50%', bottom: 28 } },
  { src: 'images/banner/shape/shape-3.png', depth: 0.3, style: { right: 30, bottom: 5 } },
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
    links: [{ href: 'https://www.magicdoor.com/', icon: 'lni-link' }],
    wide: true,
  },
  {
    title: 'MagicDoor Property Management Portal',
    tools: 'SolidJS, TypeScript, TailwindCSS',
    description:
      'A cloud-based property management platform designed to streamline operations for property managers.',
    placeholderIcon: 'fa-solid fa-building-user',
  },
  {
    title: 'MagicDoor Tenant Portal',
    tools: 'SolidStart, TypeScript, TailwindCSS',
    description:
      'A comprehensive platform enabling tenants to seamlessly view leases, pay rent, submit maintenance requests, and communicate with property managers.',
    placeholderIcon: 'fa-solid fa-house-user',
  },
  {
    title: 'MagicDoor White Label Company Website',
    tools: 'SolidStart, TypeScript, TailwindCSS',
    description:
      'A customizable, white-labeled website solution for property management companies to showcase their brand and property listings.',
    placeholderIcon: 'fa-solid fa-globe',
  },
  {
    title: 'MagicDoor Internal Portal',
    tools: 'SolidJS, TypeScript, TailwindCSS',
    description: 'Internal portal for MagicDoor team members.',
    placeholderIcon: 'fa-solid fa-lock',
  },
  {
    title: 'MG Beauty',
    tools: 'Shopify - contract work',
    description:
      'An online e-commerce store for a local San Francisco shop called MG Hair & Beauty Salon.',
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
      { href: 'https://varorant.herokuapp.com/', icon: 'lni-link' },
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
      { href: 'https://meow-bnb.herokuapp.com/', icon: 'lni-link' },
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
      { href: 'https://geniuskelly-fries.onrender.com/', icon: 'lni-link' },
    ],
  },
]
