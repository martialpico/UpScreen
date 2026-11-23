/* Sparrow & Finch : interactions
   framer-motion (vendor/motion.min.js) déplace l'oiseau le long de la frise de la journée,
   Lenis pour le scroll doux, IntersectionObserver pour les apparitions,
   et l'heure de Brisbane pour « ouvert / fermé », le moment en cours et le jour du jour. */

const M = window.Motion || null;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE = [0.22, 1, 0.36, 1];
document.documentElement.classList.add("js");

let lenis = null;
if (!reduce && typeof Lenis !== "undefined") {
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -90 });
    else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  });
});

requestAnimationFrame(() => document.documentElement.classList.add("hero-in"));

/* ---- Heure de Brisbane : ouvert lun-ven 6h-14h30 ---- */
const OPEN = 360;
const CLOSE = 870;
const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Australia/Brisbane" }));
const day = now.getDay();
const mins = now.getHours() * 60 + now.getMinutes();
const weekday = day >= 1 && day <= 5;
const isOpen = weekday && mins >= OPEN && mins < CLOSE;
const nextOpen = day === 5 || day === 6 ? "Monday" : day === 0 ? "tomorrow" : "tomorrow";

const kicker = document.querySelector("[data-open-status]");
if (kicker) {
  kicker.classList.toggle("is-open", isOpen);
  kicker.textContent = isOpen ? "Open now, until 2:30pm"
    : weekday && mins < OPEN ? "Opens today at 6am"
    : `Closed now. Back ${nextOpen} at 6am`;
}
document.querySelector(`.hours li[data-day="${day}"]`)?.classList.add("is-today");

/* ---- Frise de la journée ---- */
const moments = [...document.querySelectorAll(".moments li")];
const current = isOpen ? moments.find((li) => mins >= +li.dataset.from && mins < +li.dataset.to) : null;
current?.classList.add("is-now");

const nowEl = document.querySelector("[data-now]");
if (nowEl) {
  nowEl.classList.toggle("is-open", isOpen);
  nowEl.textContent = current
    ? `Right now: ${current.querySelector("h3").textContent.toLowerCase()}`
    : weekday && mins < OPEN ? "Doors open at 6am" : `Closed now, back ${nextOpen} at 6am`;
}

// Position de l'oiseau sur la frise : de 6h (0 %) à 14h30 (100 %)
const progress = isOpen ? (mins - OPEN) / (CLOSE - OPEN) : weekday && mins < OPEN ? 0 : 1;
const marker = document.querySelector("[data-marker]");
const fill = document.querySelector("[data-fill]");
const timeline = document.querySelector("[data-timeline]");
const place = (p) => {
  marker.style.left = `${p * 100}%`;
  fill.style.width = `${p * 100}%`;
};
if (timeline && marker && fill) {
  if (!M || reduce) place(progress);
  else {
    place(0);
    const io2 = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      M.animate(0, progress, { duration: 1.6, ease: EASE, onUpdate: place });
      io2.disconnect();
    }, { threshold: 0.4 });
    io2.observe(timeline);
  }
}

/* ---- Oiseau mascotte : se pose au bout de chaque grand titre et vole de l'un à l'autre au scroll ---- */
const mascot = document.querySelector("[data-mascot]");
const PERCHES = [".hero-title", "#day-title", "#menu .section-title", "#space .section-title", "#catering .section-title", "#visit .section-title"];
let perches = [];
let lastIndex = -1;

function measurePerches() {
  const vw = document.documentElement.clientWidth;
  perches = PERCHES.map((sel) => document.querySelector(sel)).filter(Boolean).map((el) => {
    // bout de la dernière ligne du titre
    const range = document.createRange();
    range.selectNodeContents(el);
    const rects = [...range.getClientRects()];
    const last = rects[rects.length - 1] || el.getBoundingClientRect();
    const x = Math.min(last.right + 12, vw - 56);
    // les titres pas encore apparus sont décalés de 22px vers le bas (classe .reveal)
    const pending = el.closest(".reveal:not(.in)") ? 22 : 0;
    // posé à droite de la dernière ligne, les pattes au niveau de la ligne de base
    const y = last.bottom + scrollY - 58 - pending;
    return { x, y, trigger: y - innerHeight * 0.38 };
  });
  // le dernier titre doit rester atteignable même tout en bas de la page
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  for (let k = perches.length - 1; k >= 0; k--) {
    const cap = k === perches.length - 1 ? maxScroll - 40 : perches[k + 1].trigger - 160;
    perches[k].trigger = Math.min(perches[k].trigger, cap);
  }
  const box = document.querySelector(".catering")?.getBoundingClientRect();
  yellowZone = box ? { top: box.top + scrollY, bottom: box.bottom + scrollY, left: box.left, right: box.right } : null;
}
let yellowZone = null;
const DWELL = 160; // pixels de scroll pendant lesquels l'oiseau reste posé

function placeMascot() {
  if (!perches.length) return;
  const s = scrollY;
  let i = perches.findIndex((p, k) => k === perches.length - 1 || s < perches[k + 1].trigger);
  i = Math.max(0, i);
  const a = perches[i];
  const b = perches[Math.min(i + 1, perches.length - 1)];
  const span = b.trigger - a.trigger;
  const dwell = Math.min(DWELL, span * 0.4);
  const t = span > 0 ? Math.min(1, Math.max(0, (s - a.trigger - dwell) / (span - dwell))) : 0;
  // vol : départ et arrivée en douceur, arc vers le haut au milieu du trajet
  const e = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
  const x = a.x + (b.x - a.x) * e;
  const y = a.y + (b.y - a.y) * e - Math.sin(Math.PI * t) * 90;
  const flying = t > 0.04 && t < 0.96;
  const dx = b.x - a.x;
  const tilt = flying ? Math.max(-18, Math.min(18, dx / 40)) : 0;
  const flip = flying && dx < -4 ? -1 : 1;
  mascot.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${tilt}deg) scaleX(${flip})`;
  mascot.classList.toggle("is-flying", flying);
  const landedOn = t <= 0.04 ? i : t >= 0.96 ? Math.min(i + 1, perches.length - 1) : -1;
  // l'oiseau passe en noir quand il survole le bloc jaune du traiteur
  const cx = x + 23;
  const cy = y + 28;
  mascot.classList.toggle("on-yellow", !!yellowZone && cy > yellowZone.top && cy < yellowZone.bottom && cx > yellowZone.left && cx < yellowZone.right);
  // petit sautillement à l'atterrissage
  if (landedOn >= 0 && landedOn !== lastIndex) {
    if (lastIndex !== -1 && M) {
      M.animate(mascot.querySelector("img"), { transform: ["translateY(-6px) scale(1, 1)", "translateY(2px) scale(1.12, 0.86)", "translateY(0) scale(1, 1)"] }, { duration: 0.45, ease: EASE });
    }
    lastIndex = landedOn;
  }
}

if (mascot && !reduce) {
  const setup = () => { measurePerches(); placeMascot(); mascot.classList.add("is-ready"); };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(setup));
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { placeMascot(); ticking = false; });
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", () => { measurePerches(); placeMascot(); });
  // les images chargées plus tard décalent les titres : on remesure
  addEventListener("load", () => { measurePerches(); placeMascot(); });
  setTimeout(() => { measurePerches(); placeMascot(); }, 1200);
}

/* ---- Apparitions au scroll ---- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in");
    io.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
