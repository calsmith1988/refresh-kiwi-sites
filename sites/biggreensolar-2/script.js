const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

document.querySelector(".quote-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const btn = event.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = "Thank you — we'll be in touch";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
    event.target.reset();
  }, 3000);
});
