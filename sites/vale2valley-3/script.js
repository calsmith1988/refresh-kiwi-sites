(function () {
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealEls = document.querySelectorAll(
    '.service-card, .why-card, .review-card, .process-steps li, .work-item, .stat'
  );
  revealEls.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));

  const stats = document.querySelectorAll('.stat strong[data-target]');
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.textContent.includes('+') ? '+' : '';
        let current = 0;
        const step = Math.ceil(target / 40);
        const tick = () => {
          current += step;
          if (current >= target) {
            el.textContent = target + suffix;
            return;
          }
          el.textContent = current + suffix;
          requestAnimationFrame(tick);
        };
        tick();
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  stats.forEach((el) => countObserver.observe(el));
})();
