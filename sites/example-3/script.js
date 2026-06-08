document.querySelectorAll(".cta").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.letterSpacing = "0.04em";
  });
  link.addEventListener("mouseleave", () => {
    link.style.letterSpacing = "";
  });
});
