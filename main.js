(function () {
  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (prefersReduced || !window.IntersectionObserver) {
    nodes.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  document.documentElement.classList.add("js-reveal");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
  );

  nodes.forEach(function (el) {
    observer.observe(el);
  });
})();
