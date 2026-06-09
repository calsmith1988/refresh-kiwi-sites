(function () {
  const menuBtn = document.querySelector(".menu-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const header = document.querySelector(".site-header");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const open = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!open));
      menuBtn.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      mobileNav.hidden = open;
      document.body.classList.toggle("nav-open", !open);
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
        mobileNav.hidden = true;
        document.body.classList.remove("nav-open");
      });
    });
  }

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    if (!btn || !panel) return;

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      faqItems.forEach((other) => {
        const otherBtn = other.querySelector(".faq-q");
        const otherPanel = other.querySelector(".faq-a");
        if (otherBtn && otherPanel) {
          otherBtn.setAttribute("aria-expanded", "false");
          otherPanel.hidden = true;
        }
      });
      if (!expanded) {
        btn.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
  });

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
