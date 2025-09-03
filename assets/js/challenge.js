/*
CTF Challenge: Web Warmup — Information Disclosure (hardened)

The bug: Clues are scattered across multiple shipped assets (JS/CSS),
sometimes encoded or embedded in non-obvious places. Gather and decode.

Note for players: Use your browser devtools (Network/Sources) and read assets.
No brute force or scanners. Focus on what the app ships.

— Falcons CIC
*/

// app bootstrap (harmless)
(function () {
  const el = document.createElement('div');
  el.className = 'sr-only';
  el.setAttribute('aria-hidden', 'true');
  el.textContent = 'Web Warmup active';
  document.body.appendChild(el);
})();

// No debug notes should ship; keep looking elsewhere.
