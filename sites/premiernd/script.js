(function () {
  var header = document.querySelector('.site-header');
  var menuToggle = document.querySelector('.menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileClose = document.querySelector('.mobile-close');

  function closeMenu() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  function openMenu() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      if (mobileNav.hidden) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMenu);
  }

  var onScroll = function () {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
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
    revealItems.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealItems.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
