/* ═══════════════════════════════════════════
   Meridian — main.js
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── NAV: shadow on scroll ── */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── NAV: hamburger / mobile menu ── */
  const burger   = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('nav-mobile');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* close on link click */
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    /* close on ESC */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && burger.classList.contains('is-open')) {
        burger.click();
      }
    });
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Blog TOC highlight on scroll ── */
  const tocItems  = document.querySelectorAll('.toc-item');
  const headings  = document.querySelectorAll('.post-content h2, .post-content h3');

  if (tocItems.length && headings.length) {
    const onScrollToc = () => {
      let current = '';
      headings.forEach(h => {
        if (window.scrollY >= h.offsetTop - 130) current = h.id;
      });
      tocItems.forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === '#' + current) {
          item.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', onScrollToc, { passive: true });
  }

  /* ── Contact form ── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      const nome     = contactForm.querySelector('#nome')?.value.trim();
      const email    = contactForm.querySelector('#email')?.value.trim();
      const mensagem = contactForm.querySelector('#mensagem')?.value.trim();

      if (!nome || !email || !mensagem) {
        e.preventDefault();
        alert('Por favor preencha nome, e-mail e mensagem.');
        return;
      }
      // valid — let the mailto: action submit naturally
    });
  }

  /* ── Newsletter form ── */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]')?.value.trim();
      if (!email) return;
      /* TODO: integrar com Mailchimp, ConvertKit, etc. */
      const btn = newsletterForm.querySelector('button');
      if (btn) btn.textContent = 'Inscrito ✓';
    });
  }

})();
