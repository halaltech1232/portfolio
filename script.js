document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const btn = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');

  if (btn && links) {
    btn.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    links.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Fade-in on scroll observer
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((el) => reveal.observe(el));
  }

  // Scrollspy for active nav links
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = document.querySelectorAll('main section[id]');

  if (navLinks.length > 0 && sections.length > 0) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((s) => spy.observe(s));
  }

  // Contact form honeypot validation
  const contactForm = document.querySelector('form[action*="formspree.io"]');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const honeypot = contactForm.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value !== '') {
        // Silent drop for automated spam bots
        e.preventDefault();
      }
    });
  }
});