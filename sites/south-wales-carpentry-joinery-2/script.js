(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.mobile-nav');
  var closeBtn = document.querySelector('.mobile-nav-close');

  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    nav.hidden = true;
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    if (!nav || !toggle) return;
    nav.hidden = false;
    nav.classList.add('open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('menu-open');
  }

  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  document.querySelectorAll('.tilt').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(800px) rotateY(' + (x * 4) + 'deg) rotateX(' + (-y * 4) + 'deg) translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();
