(function () {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  function onScroll() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      mobileMenu.hidden = open;
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
      });
    });
  }

  const reveals = document.querySelectorAll("[data-reveal]");
  if (reveals.length && "IntersectionObserver" in window) {
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
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
})();
