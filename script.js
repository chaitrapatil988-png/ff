/* ============================================================
   STACKLY FARM — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── LOADER ───────────────────────────────────────────── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
    }, 1900);
  });

  /* ── PARTICLES ────────────────────────────────────────── */
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    const colors = ['#8dd87a', '#6abf5e', '#b5e853', '#4a9e4a', '#2d6a2d'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left:${Math.random() * 100}%;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        width:${Math.random() * 6 + 3}px;
        height:${Math.random() * 6 + 3}px;
        animation-duration:${Math.random() * 14 + 10}s;
        animation-delay:${Math.random() * 10}s;
      `;
      particleContainer.appendChild(p);
    }
  }

  /* ── NAVBAR ───────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.querySelector('.hamburger');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }
  if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('open');
      document.body.style.overflow = navbar.classList.contains('open') ? 'hidden' : '';
    });
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Nav & Footer logo refresh logic
  document.querySelectorAll('.nav-logo, .footer-logo').forEach(logo => {
    logo.addEventListener('click', function (e) {
      const path = window.location.pathname;
      const isHomePage = path.endsWith('index.html') || path === '/' || path.endsWith('/') || path === '';
      if (isHomePage) {
        e.preventDefault();
        window.scrollTo(0, 0); // Ensure scroll position is reset
        window.location.href = 'index.html'; // Force navigation to top of home
      }
    });
  });

  // Session navigation update
  try {
    const sessionUser = localStorage.getItem('stackly_user');
    if (sessionUser) {
      const navActions = document.querySelectorAll('.nav-actions');
      navActions.forEach(el => {
        el.innerHTML = `
          <a href="auth.html?mode=login" class="btn btn-ghost ripple-btn" style="padding:10px 20px">Sign In</a>
          <button class="btn btn-solid ripple-btn" style="padding:10px 18px; font-size:13px;" onclick="localStorage.removeItem('stackly_user'); window.location.href='index.html';">Logout</button>
        `;
      });
    }
  } catch (e) {
    console.warn('Session check failed', e);
  }
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── SCROLL ANIMATIONS ────────────────────────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up, .zoom-in').forEach(el => observer.observe(el));

  /* ── HERO TYPEWRITER ──────────────────────────────────── */
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    const lines = ['Grow Smarter,\nHarvest Better.', 'AI-Powered\nFarm Solutions.', 'Organic Farming\nReimagined.'];
    let li = 0, ci = 0, deleting = false;
    heroTitle.innerHTML = '<span class="cursor-blink"></span>';

    function type() {
      const current = lines[li];
      const displayed = current.substring(0, ci).replace(/\n/g, '<br>');
      heroTitle.innerHTML = displayed + '<span class="cursor-blink"></span>';
      if (!deleting) {
        ci++;
        if (ci > current.length) { deleting = true; setTimeout(type, 2000); return; }
        setTimeout(type, 60);
      } else {
        ci--;
        if (ci < 0) { deleting = false; li = (li + 1) % lines.length; ci = 0; }
        setTimeout(type, deleting ? 30 : 60);
      }
    }
    setTimeout(type, 2000);
  }

  /* ── COUNTER ANIMATION ────────────────────────────────── */
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      if (id === 'c1') animateCounter(e.target, 12000, '+');
      if (id === 'c2') animateCounter(e.target, 240, '+');
      if (id === 'c3') animateCounter(e.target, 24, '+');
      if (id === 'ws1') animateCounter(e.target, 850, '+');
      if (id === 'ws2') animateCounter(e.target, 12, 'K+');
      if (id === 'ws3') animateCounter(e.target, 98, '%');
      if (id === 'ws4') animateCounter(e.target, 40, '+');
      counterObserver.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  ['c1','c2','c3','ws1','ws2','ws3','ws4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) counterObserver.observe(el);
  });

  /* ── PROCESS LINE ─────────────────────────────────────── */
  const processFill = document.getElementById('processLineFill');
  if (processFill) {
    const lineObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { processFill.style.width = '100%'; lineObs.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    lineObs.observe(processFill.parentElement);
  }

  /* ── NEWSLETTER ───────────────────────────────────────── */
  window.subscribe = function () {
    const input = document.getElementById('nl-email');
    const msg = document.getElementById('nl-msg');
    if (!input) return;
    const val = input.value.trim();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      input.style.borderColor = '#e74c3c';
      setTimeout(() => input.style.borderColor = '', 1500);
      return;
    }
    if (msg) { msg.textContent = '🎉 You\'re subscribed! Welcome to the Stackly family.'; msg.style.color = '#6abf5e'; }
    input.value = '';
  };

  /* ── CONTACT FORM ─────────────────────────────────────── */
  window.submitContact = function (e) {
    e && e.preventDefault();
    
    const success = document.getElementById('formSuccess');
    const error = document.getElementById('formError');
    if (success) success.style.display = 'none';
    if (error) error.style.display = 'none';

    const firstNameEl = document.getElementById('cFirstName');
    const lastNameEl = document.getElementById('cLastName');
    const emailEl = document.getElementById('cEmail');
    const phoneEl = document.getElementById('cPhone');
    const messageEl = document.getElementById('cMessage');

    const firstName = firstNameEl ? firstNameEl.value.trim() : '';
    const lastName = lastNameEl ? lastNameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const message = messageEl ? messageEl.value.trim() : '';

    // 0. Required fields check
    if (!firstName || !lastName || !email || !phone || !message) {
      showFormError('Please fill in all required fields.');
      return;
    }

    // 1. Name validation (letters and spaces only)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(firstName)) {
      showFormError('First Name should contain only letters and spaces.');
      if (firstNameEl) firstNameEl.focus();
      return;
    }
    if (!nameRegex.test(lastName)) {
      showFormError('Last Name should contain only letters and spaces.');
      if (lastNameEl) lastNameEl.focus();
      return;
    }

    // 2. Email validation (ending with @gmail.com)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[gG][mM][aA][iI][lL]\.[cC][oOMm]{2,3}$/;
    if (!emailRegex.test(email)) {
      showFormError('Please enter a valid Gmail address (ending in @gmail.com).');
      if (emailEl) emailEl.focus();
      return;
    }

    // 3. Phone validation (required, must be exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      showFormError('Phone number must be exactly 10 digits.');
      if (phoneEl) phoneEl.focus();
      return;
    }

    // Clear any previous error and show success
    if (error) error.style.display = 'none';
    if (success) { success.style.display = 'block'; }
    const form = document.getElementById('contactForm');
    if (form) form.reset();

    function showFormError(msg) {
      if (error) {
        error.textContent = '⚠️ ' + msg;
        error.style.display = 'block';
      } else {
        alert(msg);
      }
    }
  };

  /* ── AUTH TABS ────────────────────────────────────────── */
  window.switchTab = function (tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === tab));
    document.querySelectorAll('.auth-panel').forEach(p => p.style.display = p.id === tab + 'Panel' ? 'block' : 'none');
  };

  /* ── AUTH FORM ────────────────────────────────────────── */
  window.handleAuth = function (type) {
    const btn = document.querySelector('.auth-submit');
    if (btn) { btn.textContent = 'Processing...'; btn.disabled = true; }
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  };

  /* ── RIPPLE ───────────────────────────────────────────── */
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      r.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;background:rgba(255,255,255,.2);border-radius:50%;transform:scale(0);animation:rippleAnim 0.6s ease;pointer-events:none`;
      this.appendChild(r);
      setTimeout(() => r.remove(), 700);
    });
  });
  const style = document.createElement('style');
  style.textContent = '@keyframes rippleAnim{to{transform:scale(1);opacity:0}}';
  document.head.appendChild(style);

})();