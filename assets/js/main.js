(function () {
  "use strict";

  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const revealItems = document.querySelectorAll("[data-reveal]");
  const heroGrid = document.querySelector(".hero-grid");
  const interactiveSurfaces = document.querySelectorAll(".interactive-surface");

  if (navToggle && nav) {
    const setNavState = (open) => {
      body.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    };

    navToggle.addEventListener("click", () => {
      const next = !body.classList.contains("nav-open");
      setNavState(next);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => setNavState(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setNavState(false);
      }
    });
  }

  if (heroGrid && window.matchMedia("(pointer: fine)").matches) {
    const updateHeroMotion = (event) => {
      const rect = heroGrid.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      heroGrid.style.setProperty("--mx", `${x * 0.08}px`);
      heroGrid.style.setProperty("--my", `${y * 0.08}px`);
    };

    const resetHeroMotion = () => {
      heroGrid.style.setProperty("--mx", "0px");
      heroGrid.style.setProperty("--my", "0px");
    };

    heroGrid.addEventListener("pointermove", updateHeroMotion);
    heroGrid.addEventListener("pointerleave", resetHeroMotion);
  }

  if (interactiveSurfaces.length > 0 && window.matchMedia("(pointer: fine)").matches) {
    interactiveSurfaces.forEach((surface) => {
      const updateSurface = (event) => {
        const rect = surface.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        surface.style.setProperty("--sx", `${x}%`);
        surface.style.setProperty("--sy", `${y}%`);
      };

      const resetSurface = () => {
        surface.style.setProperty("--sx", "50%");
        surface.style.setProperty("--sy", "50%");
      };

      surface.addEventListener("pointermove", updateSurface);
      surface.addEventListener("pointerleave", resetSurface);
    });
  }

  if ("IntersectionObserver" in window && revealItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
})();
