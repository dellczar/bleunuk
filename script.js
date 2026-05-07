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

// Booking form — basic submit handler
document.getElementById('bookForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('formSuccess');

  // Simple client-side required check
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

  // Disable button while "sending"
  const btn = form.querySelector('.sub-btn');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Send Request';
    btn.disabled = false;
    form.reset();
    success.hidden = false;
    setTimeout(() => { success.hidden = true; }, 5000);
  }, 900);
});

// Set date input min to today
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}
