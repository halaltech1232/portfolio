# Portfolio project
Personal portfolio site for a developer who is still learning and growing.
Files: index.html, style.css, script.js, photo.jpg, resume PDF. No build step.

## Goal
A premium, highly animated, memorable portfolio. It should feel like a
high-end agency site, not a template.

## Stack rules
- Plain HTML/CSS/JS. No framework unless I ask.
- Animation libraries are allowed via CDN (GSAP + ScrollTrigger preferred).
  Pin an exact version in the script URL.
- Never modify photo.jpg or the resume PDF. Use them as they are.

## Design direction
- Dark, refined theme with one accent color. Define all colors, spacing and
  font sizes as CSS variables in :root.
- Strong typography: pair a display font with a clean body font
  (Google Fonts), use large fluid sizes with clamp(), tight headings.
- Generous whitespace, clear hierarchy, subtle depth (soft glows, layered
  shadows, glass effects used sparingly).
- Avoid generic looks: no default blue/purple gradients, no cluttered
  sections, no stock icon overload.

## Animation rules
- Cinematic hero entrance, scroll-triggered reveals, smooth section
  transitions, hover micro-interactions, magnetic/custom cursor if it fits.
- Animate only transform and opacity for smoothness. Avoid animating
  width/height/top/left.
- Keep easing natural (ease-out, cubic-bezier). Stagger related elements.
- Always respect prefers-reduced-motion by turning animations off or
  reducing them.
- Animation must never block content: the site must be readable if
  JavaScript fails.

## Quality rules
- Fully responsive, mobile-first. Test layouts at 360px, 768px and 1280px+.
- Semantic HTML, alt text on images, visible focus states, good contrast.
- Keep performance in mind: lazy-load below-the-fold images, no huge files.

## How to work with me
- I'm learning, so explain what you changed and why, in simple words.
- Work one section at a time (hero, about, projects, contact) and ask
  before redesigning something big.
- Comment the tricky animation code so I can learn from it.
