/* ============================================================
   PRISM — scroll engine
   Multiple canvas frame-sequence scrub sections + scroll reveals + counters
   ============================================================ */
/* Pick the lightest frame set that still covers the canvas sharply.
   Sets are listed small → large; a set "fits" when it needs ≤ 15% upscaling
   (≤ 60% on Save-Data / slow connections). Portrait crop only for tall screens. */
function pickFrameSet(sets, canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = canvas.clientWidth * dpr, H = canvas.clientHeight * dpr;
  const conn = navigator.connection || {};
  const slow = conn.saveData || /(^|-)2g|3g/.test(conn.effectiveType || "");
  const tolerance = slow ? 1.6 : 1.15;
  const tall = canvas.clientWidth / canvas.clientHeight < 0.8;
  const pool = sets.filter((s) => tall || s.w >= s.h);
  for (const s of pool) {
    if (Math.max(W / s.w, H / s.h) <= tolerance) return s;
  }
  return pool[pool.length - 1];
}

/* Load order: a coarse pass first (every 16th frame), then refine.
   The scrub is usable within the first ~10 requests instead of all 145. */
function progressiveOrder(n) {
  const order = [], seen = new Set();
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < n; i += step) if (!seen.has(i)) { seen.add(i); order.push(i); }
  }
  if (!seen.has(n - 1)) order.push(n - 1);
  return order;
}

function initScrub(cfg) {
  const section = document.querySelector(cfg.section);
  const canvas  = section.querySelector("canvas");
  const ctx     = canvas.getContext("2d", { alpha: false });
  const lines   = [...section.querySelectorAll(".reveal-line")];
  const bgFill  = cfg.bg || "#0a0a12";
  const set = cfg.sets ? pickFrameSet(cfg.sets, canvas) : null;
  const pathFor = (i) => (set ? cfg.framePath(set.dir, i + 1) : cfg.framePath(i + 1));
  const images = new Array(cfg.frameCount);
  const loaded = new Array(cfg.frameCount).fill(false);
  let current = -1;   // frame the scroll position asks for
  let drawn = -1;     // frame actually painted (nearest loaded one)
  for (const i of progressiveOrder(cfg.frameCount)) {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      loaded[i] = true;
      const want = current < 0 ? 0 : current;
      if (drawn < 0 || Math.abs(i - want) < Math.abs(drawn - want)) draw(want);
    };
    img.src = pathFor(i);
    images[i] = img;
  }
  function nearestLoaded(index) {
    for (let d = 0; d < cfg.frameCount; d++) {
      if (index - d >= 0 && loaded[index - d]) return index - d;
      if (index + d < cfg.frameCount && loaded[index + d]) return index + d;
    }
    return -1;
  }
  function draw(index) {
    const at = nearestLoaded(index);
    if (at < 0) return;
    const img = images[at];
    drawn = at;
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const ir = img.naturalWidth / img.naturalHeight, cr = cw / ch;
    let dw, dh, dx, dy;
    if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
    else         { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
    ctx.fillStyle = bgFill; ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = canvas.clientWidth  * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(current < 0 ? 0 : current);
  }
  function update() {
    const rect = section.getBoundingClientRect();
    if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight) return;
    const scrollable = rect.height - window.innerHeight;
    const p = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    const idx = Math.min(cfg.frameCount - 1, Math.floor(p * (cfg.frameCount - 1)));
    if (idx !== current) { current = idx; draw(idx); }
    for (const el of lines) {
      const a = parseFloat(el.dataset.in), b = parseFloat(el.dataset.out);
      const mid = (a + b) / 2, half = (b - a) / 2;
      let o = 1 - Math.abs(p - mid) / half;
      o = Math.max(0, Math.min(1, o));
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translateY(${(1 - o) * 30}px)`;
    }
  }
  window.addEventListener("resize", resize);
  resize();
  return { update, resize };
}

function animateCount(el) {
  const target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || "";
  const dur = 1500, t0 = performance.now();
  function step(t) {
    const k = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - k, 3);
    el.textContent = (target % 1 === 0 ? Math.round(target*eased) : (target*eased).toFixed(1)) + suffix;
    if (k < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", () => {
  const scrubs = (window.SCRUB_SECTIONS || [])
    .filter(c => document.querySelector(c.section))
    .map(initScrub);

  let lenis = null;
  if (typeof Lenis !== "undefined") {
    try {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
      window.__lenis = lenis;
    } catch (e) { lenis = null; }
  }
  function raf(t) {
    if (lenis) lenis.raf(t);
    scrubs.forEach(s => s.update());
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      if (e.target.classList.contains("stat-num")) animateCount(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll(".reveal, .stat-num").forEach((el) => io.observe(el));

  function updateHint(y) {
    document.querySelectorAll(".scroll-hint").forEach(h => h.style.opacity = y > 60 ? "0" : "1");
  }
  if (lenis) {
    lenis.on("scroll", ({ scroll }) => updateHint(scroll));
  } else {
    window.addEventListener("scroll", () => updateHint(window.scrollY || window.pageYOffset), { passive: true });
  }
});
