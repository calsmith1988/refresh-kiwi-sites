(function () {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      menuToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      nav.classList.toggle('open', !open);
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        nav.classList.remove('open');
      });
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.querySelectorAll('input, textarea, button').forEach(function (el) {
        el.disabled = true;
      });
      if (formSuccess) {
        formSuccess.hidden = false;
      }
    });
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      reveals.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      reveals.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }
})();
