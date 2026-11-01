// Hero image Ken Burns effect
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  if (heroImg.complete) heroImg.classList.add('loaded');
  else heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
}

// All videos — force autoplay, keep retrying until playing
const allVids = Array.from(document.querySelectorAll('video'));

function tryPlayAll() {
  allVids.forEach(v => { if (v.paused) v.play().catch(() => {}); });
}

// Retry every 800ms until every video is playing, then stop
const playRetry = setInterval(() => {
  const stillPaused = allVids.filter(v => v.paused);
  if (!stillPaused.length) { clearInterval(playRetry); return; }
  stillPaused.forEach(v => v.play().catch(() => {}));
}, 800);

// Also trigger on any user interaction in case browser needs a gesture
['touchstart', 'click', 'pointerdown', 'scroll'].forEach(evt => {
  document.addEventListener(evt, tryPlayAll, { passive: true });
});

// Hero video — slow playback
const heroVid = document.querySelector('.hero-video');
if (heroVid) {
  const setRate = () => { heroVid.playbackRate = 0.75; };
  heroVid.addEventListener('loadedmetadata', setRate);
  heroVid.addEventListener('playing', setRate);
  heroVid.play().then(setRate).catch(() => {});
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// Sticky nav shadow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) nav.style.boxShadow = '0 2px 24px rgba(0,0,0,.4)';
  else nav.style.boxShadow = 'none';
}, { passive: true });

// Booking form — Formspree AJAX
const bookForm = document.getElementById('bookForm');
const formSuccess = document.getElementById('formSuccess');

if (bookForm) {
  bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = bookForm.querySelector('.sub-btn');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try {
      const res = await fetch(bookForm.action, {
        method: 'POST',
        body: new FormData(bookForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        formSuccess.hidden = false;
        bookForm.reset();
        btn.textContent = 'Sent ✓';
      } else {
        btn.textContent = 'Error — try again';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error — try again';
      btn.disabled = false;
    }
  });
}

// Set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

// Lightbox for menu images
const lb = document.createElement('div');
lb.id = 'lightbox';
lb.innerHTML = '<div class="lb-backdrop"></div><img class="lb-img" alt=""><button class="lb-close" aria-label="Close">&times;</button>';
document.body.appendChild(lb);

const lbImg = lb.querySelector('.lb-img');

function openLightbox(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt;
  lb.classList.add('lb-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lb.classList.remove('lb-open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.mc-img:not(.mc-img-placeholder)').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

lb.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);
lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Video error fallback
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.addEventListener('error', () => {
    const fallback = heroVideo.closest('.hero-media').querySelector('.hero-video-fallback');
    if (fallback) fallback.style.display = 'block';
  });
}

// Gallery videos — autoplay immediately + resume on scroll into view
const galleryVids = document.querySelectorAll('.gv-item video');
if (galleryVids.length) {
  galleryVids.forEach(v => {
    v.play().catch(() => {});
    v.addEventListener('canplay', () => v.play().catch(() => {}), { once: true });
  });

  const vidObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.1 });
  galleryVids.forEach(v => vidObserver.observe(v));
}

// Gallery photos — lightbox support
document.querySelectorAll('.gp-img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});
