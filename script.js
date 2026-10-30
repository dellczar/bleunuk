// Hero image Ken Burns effect
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  if (heroImg.complete) heroImg.classList.add('loaded');
  else heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
}

// Hero video slow playback
const heroVid = document.querySelector('.hero-video');
if (heroVid) {
  heroVid.addEventListener('loadedmetadata', () => { heroVid.playbackRate = 0.6; });
  if (heroVid.readyState >= 1) heroVid.playbackRate = 0.6;
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

// Video error fallback
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.addEventListener('error', () => {
    const fallback = heroVideo.closest('.hero-media').querySelector('.hero-video-fallback');
    if (fallback) fallback.style.display = 'block';
  });
}
