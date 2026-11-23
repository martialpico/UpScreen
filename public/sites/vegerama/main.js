/* Vege Rama : interactions
   framer-motion (vendor/motion.min.js) anime le changement d'onglet du menu,
   Lenis pour le scroll doux, IntersectionObserver pour les apparitions,
   et l'heure de Brisbane pour afficher « ouvert / fermé » et surligner le jour. */

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

/* ---- Ouvert maintenant ? (heure de Brisbane, lun-ven 8h-18h) ---- */
const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Australia/Brisbane" }));
const day = now.getDay();
const mins = now.getHours() * 60 + now.getMinutes();
const isOpen = day >= 1 && day <= 5 && mins >= 480 && mins < 1080;
const status = document.querySelector("[data-open-status]");
if (status) {
  status.classList.toggle("is-open", isOpen);
  status.textContent = isOpen
    ? "Open now, until 6pm"
    : day >= 1 && day <= 5 && mins < 480
      ? "Opens today at 8am"
      : "Closed now. Open Monday to Friday, 8am to 6pm";
}
const today = document.querySelector(`.hours li[data-day="${day}"]`);
if (today) today.classList.add("is-today");

/* ---- Plats du jour : les vrais plats de leur carte, en rotation selon la date ---- */
const DISHES = {
  hot: [
    { id: "stroganoff", name: "Mushroom stroganoff", tags: ["V"], color: "#b58a63" },
    { id: "kofta", name: "Malai kofta", tags: ["V", "GF"], color: "#e08a3c" },
    { id: "dahl", name: "Sambar dahl", tags: ["V"], color: "#e3b23c" },
  ],
  salad: [
    { id: "padthai", name: "Raw pad thai", tags: ["V", "GF"], color: "#f08a4b" },
    { id: "pesto", name: "Chickpea pesto", tags: ["V", "GF"], color: "#6fa84a" },
    { id: "quinoa", name: "Quinoa salad", tags: ["V", "GF"], color: "#e2c77d" },
    { id: "dill", name: "Dill mustard", tags: ["V", "GF"], color: "#b9cf5a" },
    { id: "boost", name: "Veggie boost", tags: ["V", "GF"], color: "#2f8f62" },
    { id: "sesame", name: "Sesame BBQ", tags: ["V"], color: "#8e5a3c" },
    { id: "mideast", name: "Middle Eastern", tags: ["V", "GF"], color: "#b3486a" },
    { id: "medit", name: "Mediterranean", tags: ["V", "GF"], color: "#d4473d" },
  ],
  bake: [
    { id: "lasagna", name: "Lasagna", tags: ["V", "NF"] },
    { id: "frittata", name: "Frittata", tags: ["V", "NF"] },
    { id: "pies", name: "Pies", tags: ["V"] },
  ],
};

// Le week-end, on affiche le tableau du lundi suivant
const boardDate = new Date(now);
if (day === 6) boardDate.setDate(boardDate.getDate() + 2);
if (day === 0) boardDate.setDate(boardDate.getDate() + 1);
const dayIndex = Math.floor(boardDate.getTime() / 86400000);
const rotate = (list, n, step) => Array.from({ length: n }, (_, i) => list[(dayIndex * step + i) % list.length]);
const TODAY = {
  hot: DISHES.hot,
  salad: rotate(DISHES.salad, 5, 3),
  bake: rotate(DISHES.bake, 2, 1),
};

const tagsHtml = (tags) => tags.map((t) => `<span class="tag">${t}</span>`).join("");
const dateLabel = boardDate.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });
const dateEl = document.querySelector("[data-today-date]");
if (dateEl) dateEl.textContent = day === 0 || day === 6 ? `Back on ${dateLabel}, 8am` : dateLabel;
document.querySelectorAll("[data-board]").forEach((ul) => {
  ul.innerHTML = TODAY[ul.dataset.board].map((d) => `<li>${d.name} <span class="tags">${tagsHtml(d.tags)}</span></li>`).join("");
});

/* ---- Composeur de bol ---- */
const BOWLS = {
  hot: { label: "hot dishes and rice", pools: ["hot"], rice: true, noun: "dish", sizes: [["Small", 1, 13.9], ["Medium", 2, 15.9], ["Large", 3, 17.9]] },
  salad: { label: "salads", pools: ["salad"], rice: false, noun: "salad", sizes: [["Small", 3, 14.9], ["Medium", 3, 16.9], ["Large", 4, 18.9]] },
  combo: { label: "combo", pools: ["hot", "salad"], rice: false, noun: "choice", sizes: [["Small", 2, 14.9], ["Medium", 2, 16.9], ["Large", 3, 18.9]] },
};
const ALL = [...DISHES.hot, ...DISHES.salad];
const state = { type: "hot", size: 1, picks: [] };
let shown = [];

const $ = (s) => document.querySelector(s);
const price = (n) => `$${n.toFixed(2)}`;
const plural = (n, w) => `${n} ${w}${n > 1 ? (w === "dish" ? "es" : "s") : ""}`;

function wedge(a0, a1, r = 120, c = 160) {
  const p = (a) => [c + r * Math.cos(a), c + r * Math.sin(a)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${c},${c} L${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z`;
}

function renderBowl() {
  const g = $("[data-bowl]");
  const picks = state.picks.map((id) => ALL.find((d) => d.id === id));
  const parts = [];
  if (BOWLS[state.type].rice && picks.length) parts.push({ id: "rice", color: "url(#rice)", share: 0.34 });
  const rest = 1 - (parts[0] ? parts[0].share : 0);
  picks.forEach((d) => parts.push({ id: d.id, color: d.color, share: rest / picks.length }));
  let a = -Math.PI / 2;
  g.innerHTML = parts.map((p) => {
    const a0 = a;
    a += p.share * Math.PI * 2;
    return p.share >= 0.999
      ? `<circle class="seg-path" data-seg="${p.id}" cx="160" cy="160" r="120" fill="${p.color}" />`
      : `<path class="seg-path" data-seg="${p.id}" d="${wedge(a0, a)}" fill="${p.color}" />`;
  }).join("");
  $("[data-empty]").style.opacity = parts.length ? 0 : 1;
  $("[data-overlay]").style.opacity = parts.length ? 1 : 0;
  // anime uniquement les nouveaux ingrédients
  if (M && !reduce) {
    g.querySelectorAll("[data-seg]").forEach((el) => {
      if (shown.includes(el.dataset.seg)) return;
      M.animate(el, { opacity: [0, 1], transform: ["scale(0.82)", "scale(1)"] }, { duration: 0.45, ease: EASE });
    });
  }
  shown = parts.map((p) => p.id);
}

function render() {
  const bowl = BOWLS[state.type];
  const [sizeName, max, cost] = bowl.sizes[state.size];
  const pool = bowl.pools.flatMap((k) => TODAY[k].map((d) => ({ ...d, pool: k })));
  state.picks = state.picks.filter((id) => pool.some((d) => d.id === id)).slice(0, max);
  const full = state.picks.length >= max;

  document.querySelectorAll("[data-type]").forEach((b) => {
    const on = b.dataset.type === state.type;
    b.classList.toggle("is-on", on);
    b.setAttribute("aria-pressed", String(on));
  });
  $("[data-group=size]").innerHTML = bowl.sizes.map(([name, n, c], i) =>
    `<button type="button" class="size-btn${i === state.size ? " is-on" : ""}" aria-pressed="${i === state.size}" data-size="${i}"><b>${name}</b><span>${state.type === "hot" ? plural(n, "dish") + " + rice" : "up to " + plural(n, bowl.noun)}</span><strong>${price(c)}</strong></button>`
  ).join("");
  $("[data-chips]").innerHTML = bowl.pools.map((k) =>
    `<div class="chips-group">${bowl.pools.length > 1 ? `<p class="chips-label">${k === "hot" ? "Hot dishes" : "Salads"}</p>` : ""}<div class="chips-list">${
      TODAY[k].map((d) => {
        const on = state.picks.includes(d.id);
        return `<button type="button" class="chip${on ? " is-on" : ""}" style="--dot:${d.color}" aria-pressed="${on}" aria-disabled="${!on && full}" data-dish="${d.id}"><i></i>${d.name}</button>`;
      }).join("")
    }</div></div>`
  ).join("");
  $("[data-count]").textContent = `${state.picks.length} of ${max}`;

  const picked = state.picks.map((id) => ALL.find((d) => d.id === id));
  $("[data-list]").innerHTML = [
    ...(bowl.rice && picked.length ? [`<li style="--dot:#e2d7b8"><i></i>Steamed rice</li>`] : []),
    ...picked.map((d) => `<li style="--dot:${d.color}"><i></i>${d.name}</li>`),
  ].join("");
  $("[data-summary]").textContent = `${sizeName} ${bowl.label}`;
  $("[data-price]").textContent = price(cost);
  $("[data-hint]").textContent = !picked.length
    ? "Tap a dish to fill your bowl"
    : full ? "Your bowl is full. Tap a dish to swap it out." : `${plural(max - picked.length, bowl.noun)} left to choose`;
  $("[data-live]").textContent = `${sizeName} ${bowl.label}, ${picked.length} of ${max} chosen, ${price(cost)}`;
  renderBowl();
}

document.querySelector(".builder")?.addEventListener("click", (e) => {
  const t = e.target.closest("[data-type], [data-size], [data-dish]");
  if (!t) return;
  if (t.dataset.type) state.type = t.dataset.type;
  if (t.dataset.size) state.size = Number(t.dataset.size);
  if (t.dataset.dish) {
    const id = t.dataset.dish;
    if (state.picks.includes(id)) state.picks = state.picks.filter((p) => p !== id);
    else if (t.getAttribute("aria-disabled") !== "true") state.picks = [...state.picks, id];
  }
  const keep = t.dataset.dish || t.dataset.size;
  render();
  // garde le focus clavier sur le bouton recréé
  if (keep) document.querySelector(t.dataset.dish ? `[data-dish="${t.dataset.dish}"]` : `[data-size="${t.dataset.size}"]`)?.focus();
});
if (document.querySelector(".builder")) render();

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
    M.animate(panel.querySelectorAll(".dishes > li"), { opacity: [0, 1] }, { duration: 0.3, delay: M.stagger(0.03) });
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
