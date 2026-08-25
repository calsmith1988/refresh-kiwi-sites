(function () {
  const header = document.getElementById("header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const contactForm = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      mobileNav.hidden = expanded;
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  const statEls = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = (target * eased).toFixed(suffix === "%" ? 1 : 0);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window && statEls.length) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statEls.forEach((el) => statObserver.observe(el));
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const brand = document.getElementById("brand").value.trim();
      const role = document.getElementById("role").value;
      const subject = encodeURIComponent("Amazon Ads Strategy Call — " + brand);
      const body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\nBrand: " + brand + "\nRole: " + role
      );
      window.location.href =
        "mailto:team@amzppcmanagement.com?subject=" + subject + "&body=" + body;
      if (formNote) {
        formNote.textContent = "Opening your email client…";
      }
    });
  }
})();
