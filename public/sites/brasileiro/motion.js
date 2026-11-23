/* ============================================================
   O Brasileiro — interactions
   Reveals via IntersectionObserver + CSS (reliable with Lenis smooth scroll).
   framer-motion ("motion", vendored in vendor/motion.min.js) drives the menu-panel,
   mobile-menu and dish-viewer transitions; CSS fallbacks if it is missing.
   Animations use the CSS `translate` property so they never fight hover transforms.
   Interactivity (tabs/nav) is attached first and unconditionally.
   ============================================================ */

const M = window.Motion || null;               // vendor/motion.min.js (framer-motion engine)
const EASE_OUT = [0.22, 1, 0.36, 1];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (M) document.documentElement.classList.add("has-motion");
const lenisStop = () => window.__lenis && window.__lenis.stop();
const lenisStart = () => window.__lenis && window.__lenis.start();

/* ---- Menu tabs (ARIA tabs: click, ←/→, Home/End) ---- */
const tabs = [...document.querySelectorAll(".menu-tab, .tab")];
const panels = document.querySelectorAll(".menu-panel");

function animatePanel(p) {
  if (M && !reduceMotion) {
    M.animate(p, { opacity: [0, 1], translate: ["0 14px", "0 0"] }, { duration: 0.45, ease: EASE_OUT });
    const items = p.querySelectorAll(".menu-group li");
    M.animate(items, { opacity: [0, 1], translate: ["0 8px", "0 0"] },
      { duration: 0.35, delay: M.stagger(0.025), ease: EASE_OUT });
    return;
  }
  // fallback: retrigger the CSS entrance animation
  p.classList.remove("just-in");
  void p.offsetWidth;
  p.classList.add("just-in");
}

function activate(name, focus) {
  tabs.forEach((t) => {
    const on = t.dataset.tab === name;
    t.classList.toggle("is-active", on);
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    if (on && focus) t.focus();
  });
  panels.forEach((p) => {
    const on = p.dataset.panel === name;
    p.classList.toggle("is-active", on);
    if (on) animatePanel(p);
  });
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => activate(tab.dataset.tab));
  tab.addEventListener("keydown", (e) => {
    const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = tabs[(map[e.key] + tabs.length) % tabs.length];
    activate(next.dataset.tab, true);
  });
});

/* ---- Mobile menu (burger) ---- */
const burger = document.querySelector(".nav-burger");
const mobileMenu = document.getElementById("mobile-menu");

function setMenu(open) {
  if (!burger || !mobileMenu) return;
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", window.OB_I18N ? OB_I18N.t(open ? "closeMenu" : "openMenu") : (open ? "Close menu" : "Open menu"));
  document.documentElement.classList.toggle("menu-open", open);
  if (open) {
    mobileMenu.hidden = false;
    lenisStop();
    if (M && !reduceMotion) {
      M.animate(mobileMenu, { opacity: [0, 1] }, { duration: 0.25 });
      M.animate(mobileMenu.querySelectorAll(".mm-links a, .mm-cta .btn, .open-status"),
        { opacity: [0, 1], translate: ["0 16px", "0 0"] },
        { duration: 0.4, delay: M.stagger(0.045, { startDelay: 0.05 }), ease: EASE_OUT });
    }
  } else {
    mobileMenu.hidden = true;
    lenisStart();
  }
}

if (burger && mobileMenu) {
  burger.addEventListener("click", () => setMenu(mobileMenu.hidden));
  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !mobileMenu.hidden) { setMenu(false); burger.focus(); } });
  window.matchMedia("(min-width: 881px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });
}

/* ---- Dish viewer: tap / click / Enter on a menu item opens the photo in large ---- */
const dialog = document.getElementById("dish-dialog");

function openDish(item) {
  const thumb = item.querySelector(".m-thumb");
  if (!dialog || !thumb) return;
  const img = document.getElementById("dd-img");
  img.src = thumb.getAttribute("src").replace("assets/thumbs/", "assets/").replace(".webp", ".jpg");
  img.alt = thumb.alt;
  document.getElementById("dd-name").textContent = item.querySelector("b").textContent;
  const desc = item.querySelector("i");
  document.getElementById("dd-desc").textContent = desc ? desc.textContent : "";
  document.getElementById("dd-price").textContent = item.querySelector(":scope > span").textContent;
  dialog.querySelector(".dd-close").setAttribute("aria-label", window.OB_I18N ? OB_I18N.t("close") : "Close");
  dialog.showModal();
  lenisStop();
  if (M && !reduceMotion) {
    M.animate(dialog.querySelector(".dd-card"), { opacity: [0, 1], transform: ["translateY(24px) scale(.96)", "translateY(0px) scale(1)"] },
      { duration: 0.42, ease: EASE_OUT });
  }
}

if (dialog) {
  document.querySelectorAll(".menu-group li.m-item").forEach((item) => {
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-haspopup", "dialog");
    item.addEventListener("click", () => openDish(item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDish(item); }
    });
  });
  dialog.querySelector(".dd-close").addEventListener("click", () => dialog.close());
  // click on the dimmed backdrop (outside the card) closes
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("close", lenisStart);
}

/* ---- "Open now" badge — computed live in Brisbane time ---- */
// [open, close] in decimal hours, index 0 = Sunday
const HOURS = [
  [[11, 15]],
  [[7, 15]], [[7, 15]], [[7, 15]], [[7, 15]],
  [[7, 15], [17.5, 21.5]],
  [[11, 15], [17.5, 21.5]]
];

function brisbaneNow() {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Brisbane", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23"
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, h: parseInt(get("hour"), 10) + parseInt(get("minute"), 10) / 60 };
}

function fmtTime(h, lang) {
  const hh = Math.floor(h), mm = Math.round((h - hh) * 60);
  if (lang === "pt") return `${hh}h${mm ? String(mm).padStart(2, "0") : ""}`;
  const h12 = hh % 12 || 12;
  return `${h12}${mm ? ":" + String(mm).padStart(2, "0") : ""}${hh < 12 ? "am" : "pm"}`;
}

function openStatus() {
  const lang = window.OB_I18N ? OB_I18N.lang : "en";
  const t = (k) => (window.OB_I18N ? OB_I18N.t(k) : k);
  const { day, h } = brisbaneNow();
  const fill = (s, time, d) => s.replace("{t}", time).replace("{d}", d || "");
  for (const [o, c] of HOURS[day]) {
    if (h >= o && h < c) return { state: c - h <= 0.5 ? "soon" : "open", text: fill(t(c - h <= 0.5 ? "soon" : "open"), fmtTime(c, lang)) };
  }
  const later = HOURS[day].find(([o]) => o > h);
  if (later) return { state: "closed", text: fill(t("opensToday"), fmtTime(later[0], lang)) };
  for (let k = 1; k <= 7; k++) {
    const d = (day + k) % 7;
    if (HOURS[d].length) {
      const key = k === 1 ? "opensTomorrow" : "opensDay";
      return { state: "closed", text: fill(t(key), fmtTime(HOURS[d][0][0], lang), t("days")[d]) };
    }
  }
  return { state: "closed", text: "" };
}

function renderOpenStatus() {
  const { state, text } = openStatus();
  document.querySelectorAll("[data-open-status]").forEach((el) => {
    el.dataset.state = state;
    el.textContent = text;
  });
  const today = brisbaneNow().day;
  document.querySelectorAll(".hours li[data-days]").forEach((li) => {
    li.classList.toggle("is-today", li.dataset.days.split(",").map(Number).includes(today));
  });
}
renderOpenStatus();
setInterval(renderOpenStatus, 60 * 1000);
document.addEventListener("ob:langchange", () => {
  renderOpenStatus();
  if (burger) burger.setAttribute("aria-label", OB_I18N.t(mobileMenu && !mobileMenu.hidden ? "closeMenu" : "openMenu"));
});

/* ---- Pause the spinning doodles & neon of sections that are off-screen ---- */
if ("IntersectionObserver" in window) {
  const sectionIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle("is-offscreen", !e.isIntersecting));
  }, { rootMargin: "200px 0px" });
  document.querySelectorAll(".story, .signatures, .menu, .gallery, .visit, .reviews").forEach((s) => sectionIO.observe(s));
}

/* ---- Nav scrolled state + active link ---- */
const nav = document.getElementById("nav");
const sections = [...document.querySelectorAll("section[id], header[id]")];
const navLinks = [...document.querySelectorAll(".nav-links a")];

function onScroll() {
  const y = window.scrollY || window.pageYOffset;
  if (nav) nav.classList.toggle("scrolled", y > 60);

  let currentId = "";
  for (const sec of sections) {
    if (sec.offsetTop - 140 <= y) currentId = sec.id;
  }
  navLinks.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + currentId)
  );
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---- Scroll reveals ----
   Driven by scroll + rAF rather than IntersectionObserver: works reliably
   with Lenis smooth scroll, over file:// (double-click), and in every
   browser, with no dependency on IO firing in hijacked-scroll contexts. */
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = [...document.querySelectorAll(".fm-reveal")];

if (prefersReduced) {
  revealEls.forEach((el) => el.classList.add("in-view"));
} else {
  function checkReveals() {
    const vh = window.innerHeight;
    for (let i = revealEls.length - 1; i >= 0; i--) {
      const el = revealEls[i];
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.88 && r.bottom > 0) {
        const group = el.closest(".sig-grid, .story-stats");
        if (group) {
          const sibs = [...group.querySelectorAll(".fm-reveal")];
          el.style.transitionDelay = `${sibs.indexOf(el) * 0.09}s`;
        }
        el.classList.add("in-view");
        revealEls.splice(i, 1);
      }
    }
  }
  window.addEventListener("scroll", checkReveals, { passive: true });
  window.addEventListener("resize", checkReveals);
  (function loop() {
    checkReveals();
    if (revealEls.length) requestAnimationFrame(loop);
  })();

  /* ---- Festive deco reveals (background pineapples) ---- */
  const decoEls = [...document.querySelectorAll(".deco-reveal, .deco-vine")];
  function checkDeco() {
    const vh = window.innerHeight;
    decoEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      el.classList.toggle("is-shown", r.top < vh * 0.82 && r.bottom > vh * 0.05);
    });
  }
  window.addEventListener("scroll", checkDeco, { passive: true });
  window.addEventListener("resize", checkDeco);
  checkDeco();
}
