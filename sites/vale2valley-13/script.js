(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var panel = document.querySelector('.nav-panel');
  var links = panel ? panel.querySelectorAll('a') : [];

  function closeMenu() {
    if (!toggle || !panel) return;
    toggle.classList.remove('is-open');
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
  }

  function openMenu() {
    if (!toggle || !panel) return;
    toggle.classList.add('is-open');
    panel.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('nav-open');
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      if (panel.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    links.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    }, { passive: true });
  }

  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var shapes = document.querySelectorAll('[data-parallax]');
  if (shapes.length) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      shapes.forEach(function (shape) {
        var speed = parseFloat(shape.getAttribute('data-parallax')) || 0.08;
        shape.style.transform = 'translate3d(0,' + (y * speed) + 'px,0)';
      });
    }, { passive: true });
  }

  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.getAttribute('data-suffix') || '';
          var start = 0;
          var duration = 1400;
          var startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(start + (target - start) * eased) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }

          requestAnimationFrame(step);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) { countObserver.observe(el); });
  }
})();
