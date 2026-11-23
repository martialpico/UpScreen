/* 5 Dogs : interactions
   framer-motion (vendor/motion.min.js) anime les plats quand on change d'onglet,
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

/* ---- Onglets du menu : filtre + entrée décalée des plats ---- */
const tabs = [...document.querySelectorAll(".tab")];
const dishes = [...document.querySelectorAll(".dish")];
const track = document.querySelector("[data-track]");

function filterMenu(cat) {
  tabs.forEach((t) => {
    const on = t.dataset.filter === cat;
    t.classList.toggle("is-active", on);
    t.setAttribute("aria-selected", String(on));
  });
  const shown = dishes.filter((d) => {
    const visible = cat === "all" || d.dataset.cat === cat;
    d.hidden = !visible;
    return visible;
  });
  track.scrollTo({ left: 0 });
  if (M && !reduce) {
    M.animate(shown, { opacity: [0, 1], transform: ["translateY(14px)", "translateY(0)"] },
      { duration: 0.45, delay: M.stagger(0.05), ease: EASE });
  }
}
tabs.forEach((t) => t.addEventListener("click", () => filterMenu(t.dataset.filter)));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in");
    io.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
