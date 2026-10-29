// Mobile menu
const btn = document.querySelector('.menu-btn');
const links = document.querySelector('.nav-links');
btn.addEventListener('click', () => {
  btn.setAttribute('aria-expanded', links.classList.toggle('open'));
});
links.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
});

// Fade in on scroll
const reveal = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      reveal.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));

// Highlight the nav link for the section on screen
const navLinks = [...document.querySelectorAll('.nav-links a')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));