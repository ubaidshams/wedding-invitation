const introOverlay = document.getElementById('introOverlay');
const scrollBar = document.getElementById('scrollProgressBar');
const soundToggle = document.getElementById('soundToggle');
const sliderKnob = document.getElementById('sliderKnob');
const rsvpForm = document.getElementById('rsvpForm');
const rsvpMessage = document.getElementById('rsvpMessage');

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');

const eventDate = new Date('2026-04-11T20:00:00+05:30').getTime();

function startIntro() {
  setTimeout(() => {
    introOverlay.classList.add('mist');
  }, 2800);

  setTimeout(() => {
    introOverlay.classList.add('done');
    document.body.classList.remove('intro-active');
  }, 5200);
}

function updateCountdown() {
  const now = Date.now();
  const diff = Math.max(eventDate - now, 0);

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
}

function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  scrollBar.style.height = `${Math.min(100, Math.max(0, value))}%`;
}

function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function animateGalleryKnob() {
  let atStart = true;
  setInterval(() => {
    sliderKnob.style.left = atStart ? '100%' : '0%';
    atStart = !atStart;
  }, 2100);
}

soundToggle.addEventListener('click', () => {
  soundToggle.classList.toggle('is-muted');
  soundToggle.textContent = soundToggle.classList.contains('is-muted') ? 'OFF' : 'ON';
});

rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  rsvpMessage.textContent = 'Thank you. Your RSVP has been received.';
  rsvpForm.reset();
});

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);

startIntro();
updateCountdown();
setInterval(updateCountdown, 30000);
updateScrollProgress();
initRevealOnScroll();
animateGalleryKnob();
