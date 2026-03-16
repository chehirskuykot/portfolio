/**
 * Scroll reveal with IntersectionObserver.
 * Blocks appear from below with subtle stagger.
 */

const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initReveal() {
  const nodes = Array.from(document.querySelectorAll(".js-reveal"));
  if (nodes.length === 0) return;

  nodes.forEach((el, idx) => {
    el.classList.add("reveal-item");
    el.style.setProperty("--reveal-delay", `${Math.min(idx * 70, 420)}ms`);
  });

  if (prefersReducedMotion) {
    nodes.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "8px", threshold: 0.08 }
  );

  nodes.forEach((el) => observer.observe(el));
}

initReveal();

