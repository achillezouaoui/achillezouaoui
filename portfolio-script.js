gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let currentIndex = 0;
let isAnimating = false;

const SECTION_NAMES = ['Home Portfolio', 'WOOP', 'Oney Bank', 'BRED Bank', 'APRIL Assurance'];

// ─── DOM refs ───────────────────────────────────────────
const btnPrev      = document.getElementById('btn-prev');
const btnNext      = document.getElementById('btn-next');
const dots         = document.querySelectorAll('.indicator-dot');
const sectionName  = document.getElementById('section-name');
const sectionCount = document.getElementById('section-counter');

// ─── Indicator & label ──────────────────────────────────
function updateIndicator(index) {
  const total = gsap.utils.toArray('.section').length;

  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

  // Fade the label during update for polish
  sectionName.style.opacity = '0';
  setTimeout(() => {
    sectionCount.textContent  = String(index + 1).padStart(2, '0');
    sectionName.textContent   = SECTION_NAMES[index] ?? '';
    sectionName.style.opacity = '1';
  }, 140);

  btnPrev.disabled = index === 0;
  btnNext.disabled = index === total - 1;

  // Show scroll hint only on section-0
  const hint = document.getElementById('scroll-hint');
  if (hint) hint.style.opacity = index === 0 ? '1' : '0';
}

// ─── Section navigation ─────────────────────────────────
function scrollToSection(index, duration = 1.2) {
  const sections = gsap.utils.toArray('.section');
  isAnimating = true;
  currentIndex = index;

  updateIndicator(index);

  gsap.to(sections, {
    xPercent: -100 * index,
    ease: 'power2.inOut',
    duration: duration,
    onUpdate: updateNavPositions,
    onComplete: () => { isAnimating = false; }
  });
}

function updateNavPositions() {
  const wrapper  = document.getElementById('page-wrapper');
  const navs     = wrapper.querySelectorAll('.nav');
  const sections = wrapper.querySelectorAll('.section');
  const length   = Math.min(navs.length, sections.length);

  for (let i = 0; i < length; i++) {
    const nav     = navs[i];
    const section = sections[i];
    const left    = section.getBoundingClientRect().left;

    if (left <= nav.offsetWidth * i) {
      nav.style.left = `${nav.offsetWidth * i}px`;
    } else if (left >= window.innerWidth - nav.offsetWidth * (sections.length - i)) {
      nav.style.left = '';
    } else {
      nav.style.left = `${left}px`;
    }
  }
}

// ─── Keyboard navigation ────────────────────────────────
function handleTyping(e) {
  const target   = e.target;
  const sections = gsap.utils.toArray('.section');

  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;

  if (e.key.length === 1 && /[0-9]/.test(e.key)) {
    const index = Number(e.key);
    if (index > 0 && index <= sections.length) scrollToSection(index - 1);
  }

  if (['ArrowLeft', 'PageUp'].includes(e.key) && currentIndex > 0) scrollToSection(--currentIndex);
  if (['ArrowRight', 'PageDown'].includes(e.key) && currentIndex < sections.length - 1) scrollToSection(++currentIndex);
  if (e.key === 'Home') scrollToSection(0);
  if (e.key === 'End')  scrollToSection(sections.length - 1);
}

// ─── Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateNavPositions();
  updateIndicator(0);

  btnPrev.addEventListener('click', () => {
    if (!isAnimating && currentIndex > 0) scrollToSection(--currentIndex);
  });

  btnNext.addEventListener('click', () => {
    const total = gsap.utils.toArray('.section').length;
    if (!isAnimating && currentIndex < total - 1) scrollToSection(++currentIndex);
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index);
      if (!isAnimating) scrollToSection(idx);
    });
  });

  window.addEventListener('keydown', handleTyping);
});
