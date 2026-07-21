(function () {
  var menuToggle = document.querySelector('.menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var header = document.querySelector('.site-header');

  function setMenuOpen(open) {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) {
        setMenuOpen(false);
      }
    });
  }

  function setHeaderOffset() {
    if (!header) return;
    document.documentElement.style.setProperty(
      '--header-h',
      header.offsetHeight + 'px'
    );
  }

  setHeaderOffset();
  window.addEventListener('resize', setHeaderOffset);

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });

    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseFloat(el.dataset.count);
          var suffix = el.dataset.suffix || '';
          var prefix = el.dataset.prefix || '';
          var decimals = parseInt(el.dataset.decimals || '0', 10);
          var duration = 1400;
          var start = performance.now();

          function tick(now) {
            var progress = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var value = target * eased;
            el.textContent =
              prefix +
              (decimals
                ? value.toFixed(decimals)
                : Math.round(value).toString()) +
              suffix;
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          }

          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    document.querySelectorAll('[data-count]').forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseFloat(el.dataset.count);
      var suffix = el.dataset.suffix || '';
      var prefix = el.dataset.prefix || '';
      var decimals = parseInt(el.dataset.decimals || '0', 10);
      el.textContent =
        prefix +
        (decimals ? target.toFixed(decimals) : String(Math.round(target))) +
        suffix;
    });
  }
})();
