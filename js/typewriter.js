(function () {
  var root = document.querySelector(".section--about h2.section__heading--typewriter");
  if (!root) return;

  var el = root.querySelector(".typewriter");
  var cursor = root.querySelector(".typewriter__cursor");
  if (!el) return;

  var full = el.getAttribute("data-typewriter") || "";
  if (!full) return;

  var reduce = false;
  try {
    reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  var msType = 48;
  var msDel = 28;
  var pauseAfterType = 1600;
  var pauseBeforeRestart = 550;
  var loopTimer;

  function clearLoop() {
    if (loopTimer) {
      window.clearTimeout(loopTimer);
      loopTimer = 0;
    }
  }

  function done() {
    if (cursor) cursor.classList.add("typewriter__cursor--done");
  }

  function schedule(fn, delay) {
    clearLoop();
    loopTimer = window.setTimeout(fn, delay);
  }

  function runLoop() {
    var i = 0;

    function tickType() {
      if (i < full.length) {
        el.textContent = full.slice(0, i + 1);
        i += 1;
        schedule(tickType, msType);
      } else {
        schedule(tickDelete, pauseAfterType);
      }
    }

    function tickDelete() {
      if (i > 0) {
        i -= 1;
        el.textContent = full.slice(0, i);
        schedule(tickDelete, msDel);
      } else {
        el.textContent = "";
        schedule(function () {
          i = 0;
          tickType();
        }, pauseBeforeRestart);
      }
    }

    if (cursor) cursor.classList.remove("typewriter__cursor--done");
    tickType();
  }

  function run() {
    if (reduce) {
      el.textContent = full;
      done();
      return;
    }

    runLoop();
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(root);
  } else {
    run();
  }
})();
