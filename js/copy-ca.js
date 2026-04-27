(function () {
  const btn = document.getElementById("copy-ca-btn");
  const addrEl = document.getElementById("contract-address");
  if (!btn || !addrEl) return;

  const originalLabel = btn.textContent.trim();
  let resetTimer;

  async function copyAddress() {
    const text = addrEl.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      flashCopied();
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        flashCopied();
      } finally {
        document.body.removeChild(ta);
      }
    }
  }

  function flashCopied() {
    clearTimeout(resetTimer);
    btn.textContent = "Copied!";
    btn.classList.add("is-copied");
    resetTimer = window.setTimeout(function () {
      btn.textContent = originalLabel;
      btn.classList.remove("is-copied");
    }, 2000);
  }

  btn.addEventListener("click", copyAddress);
})();
