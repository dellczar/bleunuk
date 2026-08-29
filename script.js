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
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// Sticky nav shadow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10 ? '0 4px 24px rgba(0,0,0,.35)' : '';
}, { passive: true });

// Booking form — Formspree AJAX submission
document.getElementById('bookForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('formSuccess');

  // Client-side required check
  const required = form.querySelectorAll('[required]');
  let valid = true;
  required.forEach(el => {
    el.style.borderColor = '';
    if (!el.value.trim()) {
      el.style.borderColor = '#e53935';
      valid = false;
    }
  });
  if (!valid) return;

  const btn = form.querySelector('.sub-btn');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      form.reset();
      success.hidden = false;
      setTimeout(() => { success.hidden = true; }, 6000);
    } else {
      success.textContent = 'Something went wrong — please call us at (718) 210-2529.';
      success.style.background = '#fdecea';
      success.style.color = '#c62828';
      success.hidden = false;
    }
  } catch {
    success.textContent = 'Network error — please call us at (718) 210-2529.';
    success.style.background = '#fdecea';
    success.style.color = '#c62828';
    success.hidden = false;
  }

  btn.textContent = 'Send Request';
  btn.disabled = false;
});

// Set date input min to today
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

// Graceful video hero — hide video element if file doesn't load
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.addEventListener('error', () => {
    heroVideo.style.display = 'none';
  });
}
