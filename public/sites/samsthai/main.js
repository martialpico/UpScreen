/* Sam's Thai Kitchen : interactions
   framer-motion (vendor/motion.min.js) anime le changement d'onglet du menu,
   Lenis pour le scroll doux, IntersectionObserver pour les apparitions. */

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

/* ---- Onglets du menu (ARIA : clic, flèches gauche/droite) ---- */
const tabs = [...document.querySelectorAll(".tab")];

function activate(tab, focus) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.classList.toggle("is-active", on);
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.dataset.panel).hidden = !on;
  });
  if (focus) tab.focus();
  const panel = document.getElementById(tab.dataset.panel);
  if (M && !reduce) {
    M.animate(panel, { opacity: [0, 1], transform: ["translateY(10px)", "translateY(0)"] }, { duration: 0.4, ease: EASE });
    M.animate(panel.querySelectorAll(".dishes > div"), { opacity: [0, 1] }, { duration: 0.3, delay: M.stagger(0.03) });
  }
}
tabs.forEach((t, i) => {
  t.addEventListener("click", () => activate(t));
  t.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    activate(next, true);
  });
});

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in");
    io.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
