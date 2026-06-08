(function () {
  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  const setMenuOpen = (open) => {
    if (!menuBtn || !mobileNav) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    mobileNav.hidden = !open;
    document.body.classList.toggle("nav-open", open);
  };

  menuBtn?.addEventListener("click", () => {
    setMenuOpen(menuBtn.getAttribute("aria-expanded") !== "true");
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  document.querySelectorAll("[data-waitlist-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]');
      const note = form.parentElement?.querySelector(".form-feedback");
      if (!email?.value.trim()) return;

      const btn = form.querySelector("button[type='submit']");
      if (btn) {
        btn.disabled = true;
        btn.textContent = "You're on the list";
      }
      if (note) {
        note.textContent = "Thanks — we'll email you at launch. No spam, ever.";
        note.classList.add("is-success");
      }
      email.value = "";
    });
  });

  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-trigger");
    btn?.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });
})();
