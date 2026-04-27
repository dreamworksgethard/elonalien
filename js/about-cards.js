(function () {
  var cards = document.querySelectorAll(".section--about .card--reveal");
  if (!cards.length) return;

  function reveal(el) {
    el.classList.add("is-visible");
  }

  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach(reveal);
      return;
    }
  } catch (e) {}

  if (!("IntersectionObserver" in window)) {
    cards.forEach(reveal);
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  cards.forEach(function (card) {
    io.observe(card);
  });
})();
