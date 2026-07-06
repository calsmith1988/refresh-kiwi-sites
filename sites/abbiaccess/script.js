(function () {
  const siteChrome = document.getElementById('site-chrome');
  const header = document.getElementById('site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const dropdownItem = document.querySelector('.nav-item.has-dropdown');
  const dropdownToggle = document.querySelector('.nav-dropdown-toggle');

  function setChromeHeight() {
    if (!siteChrome) return;
    document.documentElement.style.setProperty('--site-offset', siteChrome.offsetHeight + 'px');
  }

  function onScroll() {
    if (!siteChrome || !header) return;
    const scrolled = window.scrollY > 60;
    siteChrome.classList.toggle('is-scrolled', scrolled);
    header.classList.toggle('is-scrolled', scrolled);
    setChromeHeight();
  }

  function setMenuOpen(open) {
    if (!menuToggle || !mobileNav || !header) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.hidden = !open;
    header.classList.toggle('is-menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  setChromeHeight();
  if (siteChrome && 'ResizeObserver' in window) {
    new ResizeObserver(setChromeHeight).observe(siteChrome);
  } else {
    window.addEventListener('resize', setChromeHeight);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });
  }

  if (dropdownItem && dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const open = dropdownItem.classList.toggle('is-open');
      dropdownToggle.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', function () {
      dropdownItem.classList.remove('is-open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    });
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      reveals.forEach(function (el) { observer.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
