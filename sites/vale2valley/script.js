(function () {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const reviews = document.querySelectorAll('.review');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.review-btn--prev');
  const nextBtn = document.querySelector('.review-btn--next');
  let reviewIndex = 0;

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }

  function toggleMenu() {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function showReview(index) {
    reviewIndex = (index + reviews.length) % reviews.length;
    reviews.forEach((r, i) => r.classList.toggle('active', i === reviewIndex));
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === reviewIndex);
      d.setAttribute('aria-selected', i === reviewIndex);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuToggle?.addEventListener('click', toggleMenu);
  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) toggleMenu();
    });
  });

  prevBtn?.addEventListener('click', () => showReview(reviewIndex - 1));
  nextBtn?.addEventListener('click', () => showReview(reviewIndex + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showReview(i)));

  let autoReview = setInterval(() => showReview(reviewIndex + 1), 7000);
  document.querySelector('.reviews-slider')?.addEventListener('mouseenter', () => clearInterval(autoReview));
})();
