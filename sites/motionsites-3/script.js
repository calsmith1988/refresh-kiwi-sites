(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

  const onScroll = () => {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  const filmstrip = document.querySelector(".filmstrip-track");
  if (filmstrip && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    const clone = filmstrip.cloneNode(true);
    filmstrip.parentElement.appendChild(clone);
  }

  document.querySelectorAll(".video-panel video").forEach((video) => {
    const panel = video.closest(".video-panel");
    if (!panel) return;

    panel.addEventListener("mouseenter", () => {
      video.play().catch(() => {});
    });

    panel.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
})();
