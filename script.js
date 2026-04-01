
/* ============================================================
   RAFSAN ISDANI — Portfolio JavaScript
   ============================================================
   Features:
     1. Circuit-board canvas animation (hero background)
     2. Mobile nav toggle
     3. Navbar scroll effect & active section highlighting
     4. Smooth scroll
     5. Scroll-triggered reveal animations (IntersectionObserver)
     6. Skill bar fill animation
     7. Contact form validation & thank-you
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     1. CIRCUIT CANVAS — animated tech-grid background
     ────────────────────────────────────────────────────────── */
  const canvas = document.getElementById('circuitCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, nodes = [], edges = [];

    function resize() {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      generateGrid();
    }

    function generateGrid() {
      nodes = [];
      edges = [];
      const spacing = 80;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.45) {
            nodes.push({
              x: c * spacing + (Math.random() - 0.5) * 20,
              y: r * spacing + (Math.random() - 0.5) * 20,
              r: Math.random() * 2 + 1,
              pulse: Math.random() * Math.PI * 2,
              speed: 0.01 + Math.random() * 0.02
            });
          }
        }
      }

      // Connect close nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < spacing * 1.5 && Math.random() > 0.6) {
            edges.push([i, j]);
          }
        }
      }
    }

    let animId;
    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Draw edges
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.07)';
      ctx.lineWidth = 1;
      edges.forEach(([a, b]) => {
        ctx.beginPath();
        // Draw right-angle paths (circuit style)
        const midX = nodes[a].x;
        const midY = nodes[b].y;
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(midX, midY);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(n => {
        n.pulse += n.speed;
        const alpha = 0.15 + Math.sin(n.pulse) * 0.1;
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animId);
      resize();
      draw();
    });
  }

  /* ──────────────────────────────────────────────────────────
     2. MOBILE NAV TOGGLE
     ────────────────────────────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ──────────────────────────────────────────────────────────
     3. NAVBAR — shrink on scroll + active section
     ────────────────────────────────────────────────────────── */
  const navbar   = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    if (navLinks) {
      navLinks.querySelectorAll('a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
      });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ──────────────────────────────────────────────────────────
     4. SMOOTH SCROLL
     ────────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ──────────────────────────────────────────────────────────
     5. SCROLL-TRIGGERED REVEALS
     ────────────────────────────────────────────────────────── */
  const animEls = document.querySelectorAll('[data-anim]');

  if ('IntersectionObserver' in window) {
    let idx = 0;
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger effect
          setTimeout(() => entry.target.classList.add('visible'), idx * 80);
          idx++;
          revealObserver.unobserve(entry.target);
          // Reset counter when batch done
          setTimeout(() => { idx = 0; }, 600);
        }
      });
    }, { threshold: 0.12 });

    animEls.forEach(el => revealObserver.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('visible'));
  }

  /* ──────────────────────────────────────────────────────────
     6. SKILL BAR FILL
     ────────────────────────────────────────────────────────── */
  const bars = document.querySelectorAll('.sk-bar-fill');

  if ('IntersectionObserver' in window) {
    const barObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = `${entry.target.dataset.level}%`;
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    bars.forEach(bar => barObserver.observe(bar));
  } else {
    bars.forEach(bar => { bar.style.width = `${bar.dataset.level}%`; });
  }

  /* ──────────────────────────────────────────────────────────
     7. CONTACT FORM — Validation & Thank-You
     ────────────────────────────────────────────────────────── */
  const form       = document.getElementById('contactForm');
  const nameInput  = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const msgInput   = document.getElementById('message');
  const nameError  = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const msgError   = document.getElementById('messageError');
  const successBox = document.getElementById('formSuccess');
  const submitBtn  = form ? form.querySelector('.btn-submit') : null;

  function isValidEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }

  function clearErrors() {
    if (nameError)  nameError.textContent  = '';
    if (emailError) emailError.textContent = '';
    if (msgError)   msgError.textContent   = '';
  }

  function validateForm() {
    let valid = true;
    clearErrors();

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    }
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email.';
      valid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    }
    if (!msgInput.value.trim()) {
      msgError.textContent = 'Please enter a message.';
      valid = false;
    } else if (msgInput.value.trim().length < 10) {
      msgError.textContent = 'Message should be at least 10 characters.';
      valid = false;
    }
    return valid;
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm()) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      /* ─── Simulated send — replace with real fetch() ─── */
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        form.reset();
        successBox.classList.add('show');
        setTimeout(() => successBox.classList.remove('show'), 6000);
      }, 1200);

      /*
       * ─── CONNECT A REAL BACKEND ───
       * Replace setTimeout above with:
       *
       * fetch('https://your-api.com/contact', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({
       *     name:    nameInput.value.trim(),
       *     email:   emailInput.value.trim(),
       *     message: msgInput.value.trim(),
       *   }),
       * })
       * .then(res => { ... show success ... })
       * .catch(err => { ... show error ... });
       */
    });

    // Clear individual errors on input
    nameInput.addEventListener('input',  () => { nameError.textContent = ''; });
    emailInput.addEventListener('input', () => { emailError.textContent = ''; });
    msgInput.addEventListener('input',   () => { msgError.textContent = ''; });
  }

}); // end DOMContentLoaded
