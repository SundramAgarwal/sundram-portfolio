/* ============================================================
   SUNDRAM AGARWAL — PORTFOLIO SCRIPT  (Professional Edition)
   ============================================================ */

// ── Navbar scroll ────────────────────────────────────────────
window.addEventListener('scroll', function () {
  document.getElementById('navbar').classList.toggle('fixed', window.scrollY > 60);
}, { passive: true });

// ── Custom Cursor (desktop only) ─────────────────────────────
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = Object.assign(document.createElement('div'), { className: 'cur-dot'  });
  const ring = Object.assign(document.createElement('div'), { className: 'cur-ring' });
  document.body.append(dot, ring);

  let mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseleave', () => { dot.style.opacity = ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = ring.style.opacity = '1'; });

  const interactors = 'a, button, .filter-item, .gallery-item-inner, input, textarea';
  document.querySelectorAll(interactors).forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = ring.style.height = '48px';
      ring.style.borderColor = 'rgba(201,169,110,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = ring.style.height = '30px';
      ring.style.borderColor = 'rgba(201,169,110,0.3)';
    });
  });

  (function frame() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    rx += (mx - rx) * 0.10;
    ry += (my - ry) * 0.10;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(frame);
  })();
})();

// ── Active nav on scroll ─────────────────────────────────────
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('#navbar .nav-items li a');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.remove('active'));
      const match = document.querySelector(`#navbar a[href="#${e.target.id}"]`);
      if (match) match.classList.add('active');
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();

// ── Skills bar animation (trigger on scroll) ─────────────────
(function () {
  const bars = document.querySelectorAll('.progress-line');
  if (!bars.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animated');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => io.observe(b));
})();

// ── Resume stagger reveal ─────────────────────────────────────
(function () {
  const items = document.querySelectorAll('.resume-item');
  if (!items.length) return;

  items.forEach(item => {
    item.style.opacity   = '0';
    item.style.transform = 'translateX(-14px)';
    item.style.transition = 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1), background 0.35s, border-left-color 0.35s';
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity   = '1';
          e.target.style.transform = 'translateX(0)';
        }, 55 * (Array.from(items).indexOf(e.target) % 5));
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  items.forEach(i => io.observe(i));
})();

// ── Gallery filter ────────────────────────────────────────────
(function () {
  const filterContainer = document.querySelector('.gallery-filter');
  const galleryItems    = document.querySelectorAll('.gallery-item');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('filter-item')) return;
    filterContainer.querySelector('.active')?.classList.remove('active');
    e.target.classList.add('active');
    const val = e.target.dataset.filter;
    galleryItems.forEach(item => {
      const show = item.classList.contains(val) || val === 'all';
      item.classList.toggle('hide', !show);
      item.classList.toggle('show', show);
    });
  });
})();

// ── Mobile nav: close on link click ──────────────────────────
(function () {
  const cb = document.querySelector('#navbar .checkbox');
  if (!cb) return;
  document.querySelectorAll('#navbar .nav-items li a').forEach(l => {
    l.addEventListener('click', () => { cb.checked = false; });
  });
})();

// ── Parallax on hero bg ───────────────────────────────────────
(function () {
  const home = document.getElementById('home');
  if (!home) return;
  window.addEventListener('scroll', () => {
    home.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.22}px)`;
  }, { passive: true });
})();

// ── Owl Carousel ──────────────────────────────────────────────
if (typeof $ !== 'undefined' && $.fn && $.fn.owlCarousel) {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1200: { items: 2 } }
  });
}

// ── AOS init ──────────────────────────────────────────────────
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 950, easing: 'cubic-bezier(0.16,1,0.3,1)', once: true, offset: 50 });
}

// ── Page load fade ────────────────────────────────────────────
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.55s ease';
window.addEventListener('load', () => { document.body.style.opacity = '1'; });