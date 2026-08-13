/* ============================================================
   Julius — main.js
   Vanilla JS: mobile nav, scroll reveal, active nav section,
   nav scroll state, back-to-top, dynamic year.
   ============================================================ */

(function () {
  'use strict';

  // Enable reveal styles only when JS is present (progressive enhancement:
  // without JS, all content is simply visible).
  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('nav');
  var toTop = document.getElementById('toTop');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  /* ---------- Mobile nav toggle ---------- */
  function setMenu(open) {
    if (!navToggle) return;
    navLinks.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close when a link inside the menu is chosen
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });

    // Close when clicking outside the nav
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('is-open') && !nav.contains(e.target)) {
        setMenu(false);
      }
    });
  }

  /* ---------- Smooth anchor scrolling (fixed-nav offset) ---------- */
  // Native `scroll-padding-top` on <html> already offsets for the fixed nav;
  // we scroll the section *heading* into view (not the section top) so the
  // heading lands just below the nav instead of below the section's large
  // internal top padding.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id.length < 2) return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;

      e.preventDefault();

      if (target.id === 'home') {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      } else {
        // Reveal the section's content first so the reveal transition doesn't
        // shift the layout mid-scroll and skew the landing position.
        target.querySelectorAll('.reveal').forEach(function (el) {
          el.style.transition = 'none';
          el.classList.add('is-visible');
          void el.offsetHeight;
          el.style.transition = '';
        });
        var heading = target.querySelector('.section__head') || target;
        heading.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }

      if (window.history && history.replaceState) {
        history.replaceState(null, '', id);
      }
    });
  });

  /* ---------- Nav scroll state ---------- */
  function onScroll() {
    var scrolled = window.scrollY > 8;
    nav.classList.toggle('is-scrolled', scrolled);
    toTop.classList.toggle('is-visible', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Back to top ---------- */
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // No observer (or reduced motion): show everything immediately
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var navLinkEls = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = navLinkEls
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function setActive(id) {
    navLinkEls.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      // Watch the horizontal band through the middle of the viewport
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------- Dynamic year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
