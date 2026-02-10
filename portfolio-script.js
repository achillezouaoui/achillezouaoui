gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

let currentIndex = 0;
let isAnimating = false;

document.addEventListener("DOMContentLoaded", () => {
  // Initialiser les positions des navs au chargement
  updateNavPositions();

  Observer.create({
    type: "wheel, touch, pointer",
    onUp: () => {
      if (isAnimating) return;
      if (currentIndex > 0) {
        currentIndex -= 1;
        scrollToSection(currentIndex);
      }
    },
    onDown: () => {
      if (isAnimating) return;
      const sections = gsap.utils.toArray(".section");
      if (currentIndex < sections.length - 1) {
        currentIndex += 1;
        scrollToSection(currentIndex);
      }
    },
    onLeft: () => {
      if (isAnimating) return;
      const sections = gsap.utils.toArray(".section");
      if (currentIndex < sections.length - 1) {
        currentIndex += 1;
        scrollToSection(currentIndex);
      }
    },
    onRight: () => {
      if (isAnimating) return;
      if (currentIndex > 0) {
        currentIndex -= 1;
        scrollToSection(currentIndex);
      }
    },
    tolerance: 10,
    preventDefault: true
  });

  window.addEventListener("keydown", handleTyping);
});

function scrollToSection(index, duration = 1.2) {
  const sections = gsap.utils.toArray(".section");
  isAnimating = true;
  currentIndex = index;

  gsap.to(sections, {
    xPercent: -100 * index,
    ease: "power2.inOut",
    duration: duration,
    onUpdate: updateNavPositions,
    onComplete: () => (isAnimating = false)
  });
}

function updateNavPositions() {
  const container = document.getElementById("page-wrapper");
  const navs = container.querySelectorAll(".nav");
  const sections = container.querySelectorAll(".section");
  const length = Math.min(navs.length, sections.length);

  // Commencer à 0 au lieu de 1 pour traiter toutes les navs
  for (let index = 0; index < length; index++) {
    const nav = navs[index];
    const section = sections[index];
    const left = section.getBoundingClientRect().left;

    if (left <= nav.offsetWidth * index) {
      nav.style.left = `${nav.offsetWidth * index}px`;
    } else if (
      left >=
      window.innerWidth - nav.offsetWidth * (sections.length - index)
    ) {
      nav.style.left = ``;
    } else {
      nav.style.left = `${left}px`;
    }
  }
}

function handleTyping(e) {
  const target = e.target;
  const sections = gsap.utils.toArray(".section");

  if (
    target &&
    (target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable)
  ) {
    return;
  }

  if (e.key.length === 1 && /[0-9]/.test(e.key)) {
    const index = Number(e.key);
    if (index > 0 && index <= sections.length) scrollToSection(index - 1);
  }

  if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key) && currentIndex > 0) {
    currentIndex -= 1;
    scrollToSection(currentIndex);
  }

  if (
    ["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key) &&
    currentIndex < sections.length - 1
  ) {
    currentIndex += 1;
    scrollToSection(currentIndex);
  }

  if (e.key === "Home") {
    scrollToSection(0);
  }

  if (e.key === "End") {
    scrollToSection(sections.length - 1);
  }
}