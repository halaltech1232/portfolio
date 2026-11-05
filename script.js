document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const supportsIntersectionObserver = "IntersectionObserver" in window;

  const menuButton = document.querySelector(".menu-btn");
  const navigation = document.querySelector(".nav-links");

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  };

  if (menuButton && navigation) {
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu",
      );
    });

    navigation.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (
        navigation.classList.contains("open") &&
        event.target instanceof Node &&
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("open")) {
        closeMenu();
        menuButton.focus();
      }
    });
  }

  const revealElements = document.querySelectorAll(".reveal");
  if (reducedMotion || !supportsIntersectionObserver) {
    revealElements.forEach((element) => element.classList.add("in"));
  } else {
    document.querySelectorAll(".grid").forEach((grid) => {
      Array.from(grid.children).forEach((item, index) => {
        item.style.setProperty(
          "--reveal-delay",
          `${Math.min(index, 5) * 70}ms`,
        );
      });
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = document.querySelectorAll("main section[id]");

  if (supportsIntersectionObserver && navLinks.length && sections.length) {
    const activeSectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${sectionId}`,
              );
            });
          }
        });
      },
      { rootMargin: "-42% 0px -50% 0px" },
    );

    sections.forEach((section) => activeSectionObserver.observe(section));
  }

  const scrollProgress = document.querySelector(".scroll-progress");
  if (scrollProgress && !reducedMotion) {
    let scrollFrame = 0;
    const updateScrollProgress = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        document.documentElement.style.setProperty(
          "--scroll-progress",
          String(Math.min(1, Math.max(0, progress))),
        );
        scrollFrame = 0;
      });
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });
    updateScrollProgress();
  }

  if (
    !reducedMotion &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    document.querySelectorAll(".card").forEach((card) => {
      let pointerFrame = 0;
      let pointerX = 0;
      let pointerY = 0;

      card.addEventListener(
        "pointermove",
        (event) => {
          pointerX = event.clientX;
          pointerY = event.clientY;
          if (pointerFrame) return;

          pointerFrame = window.requestAnimationFrame(() => {
            const bounds = card.getBoundingClientRect();
            card.style.setProperty(
              "--spot-x",
              `${((pointerX - bounds.left) / bounds.width) * 100}%`,
            );
            card.style.setProperty(
              "--spot-y",
              `${((pointerY - bounds.top) / bounds.height) * 100}%`,
            );
            pointerFrame = 0;
          });
        },
        { passive: true },
      );

      card.addEventListener("pointerleave", () => {
        if (pointerFrame) {
          window.cancelAnimationFrame(pointerFrame);
          pointerFrame = 0;
        }
        card.style.removeProperty("--spot-x");
        card.style.removeProperty("--spot-y");
      });
    });
  }

  const contactForm = document.querySelector('form[action*="formspree.io"]');
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      const honeypot = contactForm.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value !== "") {
        event.preventDefault();
      }
    });
  }
});
