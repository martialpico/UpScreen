// Illustrations HTML/CSS des cartes « Menu digital ».
// Unité : 1em = largeur de la carte / 32 (voir .mv-in dans index.css).
import type { ComponentChildren } from "preact";

type S = Record<string, string | number>;
const IMG = (k: string) => `url(/menu/${k}.webp)`;
const RED = "#e94445";

/* ---------- briques ---------- */

function QR({ seed = 7, color = "#111" }: { seed?: number; color?: string }) {
  const n = 25;
  let x = seed * 7919 + 104729;
  const rnd = () => ((x = (x * 16807) % 2147483647) / 2147483647);
  const inFinder = (r: number, c: number) =>
    [[0, 0], [0, n - 7], [n - 7, 0]].some(([fr, fc]) => r >= fr - 1 && r < fr + 8 && c >= fc - 1 && c < fc + 8);
  let d = "";
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) {
      if (inFinder(r, c)) continue;
      if (r >= 16 && r <= 20 && c >= 16 && c <= 20) continue;
      if (rnd() > 0.5) d += `M${c} ${r}h1v1h-1z`;
    }
  const f = (r: number, c: number) => `M${c} ${r}h7v7h-7zM${c + 1} ${r + 1}v5h5v-5zM${c + 2} ${r + 2}h3v3h-3z`;
  return (
    <svg className="mv-qr" viewBox="-2 -2 29 29" shapeRendering="crispEdges">
      <rect x="-2" y="-2" width="29" height="29" fill="#fff" />
      <path d={f(0, 0) + f(0, n - 7) + f(n - 7, 0) + "M16 16h5v5h-5zM17 17v3h3v-3zM18 18h1v1h-1z"} fill={color} fillRule="evenodd" />
      <path d={d} fill={color} />
    </svg>
  );
}

function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "#fff" : "#000";
  return (
    <div className="mv-statusbar" style={{ color: c }}>
      <span>9:41</span>
      <span className="mv-row" style={{ gap: "0.35em" }}>
        <svg width="1.5em" height="0.95em" viewBox="0 0 18 12" fill={c}><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg width="1.35em" height="0.95em" viewBox="0 0 16 12" fill={c}><path d="M8 2.6c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .8C5.2.8 2.7 1.9.8 3.7L2 5c1.6-1.5 3.7-2.4 6-2.4Zm0 3.6c1.4 0 2.6.5 3.5 1.4l1.2-1.3A6.8 6.8 0 0 0 8 4.4c-1.8 0-3.5.7-4.7 1.9l1.2 1.3c.9-.9 2.1-1.4 3.5-1.4Zm0 3.5c-.6 0-1.1.2-1.4.6L8 11.8l1.4-1.5c-.3-.4-.8-.6-1.4-.6Z" /></svg>
        <svg width="2.1em" height="0.95em" viewBox="0 0 27 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3.2" fill="none" stroke={c} strokeOpacity="0.4" /><rect x="2" y="2" width="17" height="8" rx="2" fill={c} /><path d="M24 4v4c.8-.3 1.4-1 1.4-2s-.6-1.7-1.4-2Z" fill={c} fillOpacity="0.45" /></svg>
      </span>
    </div>
  );
}

function Phone({ style, children, dark = false, bg }: { style: S; children: ComponentChildren; dark?: boolean; bg?: string }) {
  return (
    <div className="mv-phone" style={style}>
      <span className="mv-btn-side" style={{ left: "-0.12em", top: "4.2em", height: "1.4em" }} />
      <span className="mv-btn-side" style={{ left: "-0.12em", top: "6.4em", height: "2.3em" }} />
      <span className="mv-btn-side" style={{ right: "-0.12em", top: "6em", height: "3.4em" }} />
      <div className="mv-screen" style={bg ? { background: bg } : undefined}>
        <div className="mv-island" />
        <StatusBar dark={dark} />
        {children}
        <div className="mv-home" style={dark ? { background: "rgba(255,255,255,0.8)" } : undefined} />
      </div>
    </div>
  );
}

function Logo({ size = 1.7, radius = 0.5 }: { size?: number; radius?: number }) {
  return (
    <div style={{ width: `${size}em`, height: `${size}em`, borderRadius: `${radius}em`, background: `linear-gradient(145deg,#f26a5c,${RED} 55%,#b8302f)`, display: "grid", placeItems: "center", color: "#fff", fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 700, boxShadow: "0 0.15em 0.4em rgba(233,68,69,0.35)", flex: "none" }}>
      <span style={{ fontSize: `${size * 0.55}em` }}>B</span>
    </div>
  );
}

const DISHES = {
  salmon: { name: "Pavé de saumon", desc: "Purée maison, asperges", price: "14,50 €" },
  salad: { name: "Salade du marché", desc: "Feta, tomates, noix", price: "11,00 €" },
  steak: { name: "Bavette grillée", desc: "Frites fraîches, sauce échalote", price: "18,00 €" },
  pasta: { name: "Linguine aux cèpes", desc: "Parmesan 24 mois", price: "15,00 €" },
  burger: { name: "Burger Bellevue", desc: "Cheddar affiné, oignons confits", price: "16,00 €" },
  cake: { name: "Fondant chocolat", desc: "Framboises fraîches", price: "7,50 €" },
} as const;
type DishKey = keyof typeof DISHES;

function Dish({ k, tag, hl, price }: { k: DishKey; tag?: string; hl?: boolean; price?: string }) {
  const d = DISHES[k];
  return (
    <div className="mv-row" style={{ padding: "0.5em 0.55em", gap: "0.6em", background: hl ? "#fff4f3" : "transparent" }}>
      <div className="mv-photo" style={{ width: "2.7em", height: "2.7em", backgroundImage: IMG(k) }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="mv-h" style={{ fontSize: "0.6em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</div>
        <div className="mv-sub" style={{ fontSize: "0.47em", marginTop: "0.25em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.desc}</div>
        {tag && <span className="mv-chip" style={{ fontSize: "0.4em", marginTop: "0.45em", padding: "0.2em 0.6em", background: "#e8f6ea", color: "#1f8a3b" }}>{tag}</span>}
      </div>
      <div className="mv-h" style={{ fontSize: "0.56em", color: hl ? RED : "#111", whiteSpace: "nowrap" }}>{price ?? d.price}</div>
    </div>
  );
}

function MenuApp({ list = ["salmon", "salad", "steak", "pasta"] as DishKey[], hl, accent = RED, serif = false, priceOverride }: { list?: DishKey[]; hl?: DishKey; accent?: string; serif?: boolean; priceOverride?: Partial<Record<DishKey, string>> }) {
  return (
    <div style={{ padding: "0.3em 0.7em 0" }}>
      <div className="mv-row" style={{ gap: "0.5em" }}>
        <Logo size={1.9} />
        <div style={{ minWidth: 0 }}>
          <div className="mv-h" style={{ fontSize: "0.82em", fontFamily: serif ? "Georgia, serif" : undefined }}>Bistrot Bellevue</div>
          <div className="mv-row" style={{ gap: "0.3em", fontSize: "0.46em", marginTop: "0.25em", color: "#1f8a3b", fontWeight: 600 }}>
            <span style={{ width: "0.6em", height: "0.6em", borderRadius: "50%", background: "#34c759" }} /> Ouvert · jusqu'à 23 h
          </div>
        </div>
      </div>
      <div className="mv-row" style={{ gap: "0.35em", marginTop: "0.75em", fontSize: "0.5em" }}>
        <span className="mv-chip" style={{ background: accent, color: "#fff" }}>Plats</span>
        <span className="mv-chip" style={{ background: "#fff", color: "#333" }}>Entrées</span>
        <span className="mv-chip" style={{ background: "#fff", color: "#333" }}>Desserts</span>
        <span className="mv-chip" style={{ background: "#fff", color: "#333" }}>Vins</span>
      </div>
      <div className="mv-group" style={{ marginTop: "0.65em" }}>
        {list.map((k, i) => (
          <div key={k}>
            {i > 0 && <div className="mv-sep" style={{ marginLeft: "3.85em" }} />}
            <Dish k={k} hl={hl === k} tag={k === "salad" ? "Végétarien" : undefined} price={priceOverride?.[k]} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Visuels minimalistes : un seul élément, grand, centré dans la carte. */
const card: S = { position: "relative", background: "#fff", borderRadius: "1.4em", boxShadow: "0 0.3em 0.8em rgba(0,0,0,0.25), 0 2em 4em rgba(0,0,0,0.55)" };
const check = (c = "#fff") => (
  <svg width="55%" height="55%" viewBox="0 0 12 12"><path d="M2.5 6.2 5 8.6l4.6-5" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* 0 — À votre image */
function V0() {
  const colors = ["#e94445", "#1f3a2e", "#c8873a", "#2b2b2e"];
  const fonts = ["Georgia, serif", "inherit", "'Courier New', monospace"];
  return (
    <div style={{ ...card, width: "25em", padding: "1.8em 2em" }}>
      <div className="mv-row" style={{ justifyContent: "space-between" }}>
        {colors.map((c, i) => (
          <span key={c} style={{ width: "3.8em", height: "3.8em", borderRadius: "50%", background: c, display: "grid", placeItems: "center", boxShadow: i === 0 ? `0 0 0 0.25em #fff, 0 0 0 0.5em ${c}` : undefined }}>{i === 0 && check()}</span>
        ))}
      </div>
      <div className="mv-row" style={{ gap: "0.7em", marginTop: "1.5em" }}>
        {fonts.map((f, i) => (
          <span key={f} style={{ flex: 1, padding: "0.4em 0", textAlign: "center", borderRadius: "0.6em", fontSize: "1.6em", fontWeight: 700, fontFamily: f, background: i === 0 ? "#111" : "#f2f2f7", color: i === 0 ? "#fff" : "#111" }}>Aa</span>
        ))}
      </div>
    </div>
  );
}

/* 1 — Modifiable à tout moment */
function V1() {
  return (
    <div className="mv-row" style={{ ...card, width: "27em", padding: "1.2em", gap: "1.1em" }}>
      <div className="mv-photo" style={{ width: "6.6em", height: "6.6em", borderRadius: "1em", backgroundImage: IMG("salmon") }} />
      <div style={{ flex: 1 }}>
        <div className="mv-h" style={{ fontSize: "1.15em" }}>Pavé de saumon</div>
        <div className="mv-sub" style={{ fontSize: "0.95em", textDecoration: "line-through", marginTop: "0.5em" }}>14,50 €</div>
        <div className="mv-h" style={{ fontSize: "1.5em", color: RED, marginTop: "0.1em" }}>15,50 €</div>
      </div>
      <span className="mv-toggle" style={{ fontSize: "1.4em", alignSelf: "center" }} />
    </div>
  );
}

/* 2 — Sans réimpression */
function V2() {
  const badge = (ok: boolean) => (
    <span style={{ position: "absolute", right: "-0.9em", top: "-0.9em", width: "2.6em", height: "2.6em", borderRadius: "50%", background: ok ? "#34c759" : RED, display: "grid", placeItems: "center", boxShadow: "0 0.3em 0.8em rgba(0,0,0,0.35)" }}>
      {ok ? check() : <svg width="45%" height="45%" viewBox="0 0 12 12"><path d="M3 3l6 6M9 3l-6 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></svg>}
    </span>
  );
  return (
    <div className="mv-row" style={{ gap: "2em" }}>
      <div style={{ ...card, width: "9.6em", height: "13em", borderRadius: "0.5em", background: "#f3ede2", padding: "1.4em 1.1em" }}>
        {[70, 100, 85, 100, 60, 90].map((w, i) => <div key={i} style={{ height: "0.5em", width: `${w}%`, background: "#d6cbb8", borderRadius: "1em", marginTop: i ? "1em" : 0 }} />)}
        {badge(false)}
      </div>
      <svg style={{ width: "3.2em", height: "2em", flex: "none" }} viewBox="0 0 34 20"><path d="M2 10h26M21 3l8 7-8 7" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div style={{ position: "relative", width: "8.6em", height: "15.4em", borderRadius: "1.5em", background: "#111", padding: "0.3em", boxShadow: "0 2em 4em rgba(0,0,0,0.55), inset 0 0 0 0.12em #555" }}>
        <div style={{ height: "100%", borderRadius: "1.25em", background: "#fff", padding: "1.7em 0.8em 0" }}>
          {["salmon", "steak", "salad", "pasta"].map((k) => (
            <div key={k} className="mv-row" style={{ marginBottom: "0.75em", gap: "0.45em" }}>
              <div className="mv-photo" style={{ width: "2.1em", height: "2.1em", borderRadius: "0.5em", backgroundImage: IMG(k) }} />
              <div style={{ flex: 1, height: "0.45em", background: "#e6e6ea", borderRadius: "1em" }} />
            </div>
          ))}
        </div>
        {badge(true)}
      </div>
    </div>
  );
}

/* 3 — QR code d'avis Google */
function V3() {
  return (
    <div className="mv-row" style={{ ...card, width: "26em", padding: "1.5em 1.6em", gap: "1.4em" }}>
      <div style={{ flex: 1 }}>
        <div className="mv-row" style={{ gap: "0.35em", alignItems: "baseline" }}>
          <span className="mv-h" style={{ fontSize: "3em" }}>4,9</span>
          <span className="mv-sub" style={{ fontSize: "0.9em" }}>/ 5</span>
        </div>
        <div className="mv-star" style={{ fontSize: "1.55em", letterSpacing: "0.04em", marginTop: "0.1em" }}>★★★★★</div>
        <div className="mv-sub" style={{ fontSize: "0.85em", marginTop: "0.35em" }}>128 avis Google</div>
      </div>
      <div style={{ width: "8.4em", height: "8.4em", flex: "none" }}><QR seed={3} /></div>
    </div>
  );
}

/* 4 — Carte de fidélité digitale */
function V4() {
  return (
    <div style={{ ...card, width: "26em", padding: "1.5em 1.7em", background: `linear-gradient(140deg,#f0595a,${RED} 50%,#b52a2c)`, color: "#fff" }}>
      <div className="mv-row" style={{ justifyContent: "space-between" }}>
        <span className="mv-h" style={{ fontSize: "1.15em" }}>Carte fidélité</span>
        <span className="mv-h" style={{ fontSize: "1.4em" }}>7/10</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "0.9em", marginTop: "1.2em" }}>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} style={{ aspectRatio: "1", borderRadius: "50%", background: i < 7 ? "#fff" : "transparent", border: i < 7 ? "none" : "0.14em dashed rgba(255,255,255,0.75)", display: "grid", placeItems: "center" }}>
            {i < 7 && check(RED)}
          </span>
        ))}
      </div>
    </div>
  );
}

/* 5 — QR codes pour vos supports */
function V5() {
  return (
    <div style={{ position: "relative", paddingBottom: "1em" }}>
      <div style={{ ...card, width: "13em", borderRadius: "0.6em", padding: "1.5em 1.6em 1.3em", textAlign: "center" }}>
        <div style={{ width: "9.8em", height: "9.8em" }}><QR seed={11} /></div>
        <div className="mv-h" style={{ fontSize: "1em", marginTop: "0.9em" }}>Scannez la carte</div>
      </div>
      <div style={{ position: "absolute", left: "-1.2em", right: "-1.2em", bottom: 0, height: "1.3em", borderRadius: "0.4em", background: "linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0.18))" }} />
    </div>
  );
}

/* 6 — Sans application */
function V6() {
  const corner = (st: S) => <span className="mv-a" style={{ width: "2.4em", height: "2.4em", borderColor: "#ffd60a", borderStyle: "solid", borderWidth: 0, ...st }} />;
  const w = "0.34em";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.3em" }}>
      <div style={{ position: "relative", width: "12em", height: "12em" }}>
        <div className="mv-a" style={{ inset: "1.1em", borderRadius: "0.5em", overflow: "hidden" }}><QR seed={13} /></div>
        {corner({ left: 0, top: 0, borderLeftWidth: w, borderTopWidth: w, borderTopLeftRadius: "0.9em" })}
        {corner({ right: 0, top: 0, borderRightWidth: w, borderTopWidth: w, borderTopRightRadius: "0.9em" })}
        {corner({ left: 0, bottom: 0, borderLeftWidth: w, borderBottomWidth: w, borderBottomLeftRadius: "0.9em" })}
        {corner({ right: 0, bottom: 0, borderRightWidth: w, borderBottomWidth: w, borderBottomRightRadius: "0.9em" })}
      </div>
      <div className="mv-row" style={{ padding: "0.6em 1.3em", borderRadius: "99em", background: "#ffd60a", color: "#000", fontWeight: 700, fontSize: "1.05em", whiteSpace: "nowrap", gap: "0.5em", boxShadow: "0 0.8em 1.8em rgba(0,0,0,0.45)" }}>
        Ouvrir la carte <span style={{ fontSize: "1.1em" }}>›</span>
      </div>
    </div>
  );
}

/* ---------- 7 — Votre carte en ligne (grande carte) ---------- */
function V7() {
  return (
    <>
      <Phone style={{ left: "50%", top: "3em", width: "19em", height: "40em", marginLeft: "-9.5em" }}>
        <div style={{ fontSize: "1.3em" }}>
          <MenuApp list={["salmon", "salad", "steak", "pasta", "cake"]} />
        </div>
      </Phone>
      <div className="mv-sheet" style={{ left: "50%", marginLeft: "6.6em", top: "11.4em", width: "11.6em", padding: "0.6em" }}>
        <div className="mv-photo" style={{ width: "100%", height: "6.2em", borderRadius: "0.8em", backgroundImage: IMG("burger") }} />
        <div className="mv-h" style={{ fontSize: "0.7em", marginTop: "0.55em" }}>Burger Bellevue</div>
        <div className="mv-sub" style={{ fontSize: "0.48em", marginTop: "0.25em" }}>Bœuf charolais, cheddar affiné, oignons confits</div>
        <div className="mv-row" style={{ gap: "0.3em", marginTop: "0.55em", fontSize: "0.42em", flexWrap: "wrap" }}>
          <span className="mv-chip" style={{ background: "#fff1e0", color: "#a35a00" }}>Gluten</span>
          <span className="mv-chip" style={{ background: "#eaf2ff", color: "#2457c5" }}>Lait</span>
          <span className="mv-chip" style={{ background: "#f2f2f7", color: "#333" }}>Moutarde</span>
        </div>
        <div className="mv-row" style={{ justifyContent: "space-between", marginTop: "0.6em" }}>
          <span className="mv-h" style={{ fontSize: "0.7em" }}>16,00 €</span>
          <span className="mv-chip" style={{ fontSize: "0.46em", background: RED, color: "#fff" }}>Plat du jour</span>
        </div>
      </div>
    </>
  );
}

/* =================== WEB APP SUR MESURE =================== */
const GREEN = "#1f9d55";
const tile = (bg: string, icon: ComponentChildren, label: string) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ width: "3.6em", height: "3.6em", margin: "0 auto", borderRadius: "1em", background: bg, display: "grid", placeItems: "center", color: "#fff", boxShadow: "0 0.3em 0.7em rgba(0,0,0,0.18)" }}>{icon}</div>
    <div style={{ fontSize: "0.72em", fontWeight: 600, marginTop: "0.5em", color: "#333" }}>{label}</div>
  </div>
);
const ic = (d: string) => <svg width="1.7em" height="1.7em" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
const ICONS = {
  cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  box: "M3 8l9-5 9 5-9 5-9-5zM3 8v8l9 5 9-5V8M12 13v8",
  doc: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
  cash: "M3 7h18v10H3zM12 12m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a3 3 0 1 0 0-6M21 20c0-2.6-1.6-4.8-4-5.6",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  bank: "M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18",
};

/* W0 — Tout au même endroit */
function W0() {
  return (
    <div style={{ ...card, width: "25em", padding: "1.5em 1.6em" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", rowGap: "1.1em" }}>
        {tile(RED, ic(ICONS.cal), "Agenda")}
        {tile("#2b2b2e", ic(ICONS.box), "Stocks")}
        {tile("#3b6fd8", ic(ICONS.doc), "Devis")}
        {tile(GREEN, ic(ICONS.cash), "Caisse")}
        {tile("#c8873a", ic(ICONS.users), "Clients")}
        {tile("#7a4bd6", ic(ICONS.chart), "Chiffres")}
      </div>
    </div>
  );
}

/* W1 — Reliée à vos logiciels */
function W1() {
  const node = (x: string, y: string, bg: string, d: string, label: string) => (
    <div className="mv-a" style={{ left: x, top: y, transform: "translate(-50%,-50%)", textAlign: "center" }}>
      <div style={{ width: "3.4em", height: "3.4em", borderRadius: "0.95em", background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 0.3em 0.8em rgba(0,0,0,0.3), 0 1.4em 2.6em rgba(0,0,0,0.4)" }}>
        <svg width="1.6em" height="1.6em" viewBox="0 0 24 24" fill="none" stroke={bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
      </div>
      <div style={{ fontSize: "0.7em", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginTop: "0.45em" }}>{label}</div>
    </div>
  );
  return (
    <div style={{ position: "relative", width: "28em", height: "17em" }}>
      <svg className="mv-a" style={{ inset: 0, width: "100%", height: "100%" }} viewBox="0 0 280 170">
        {[[40, 40], [240, 40], [40, 130], [240, 130]].map(([x, y], i) => (
          <path key={i} d={`M140 85 L${x} ${y}`} stroke="rgba(255,255,255,0.45)" strokeWidth="1.6" strokeDasharray="4 5" />
        ))}
      </svg>
      {node("14%", "23%", RED, ICONS.cal, "Agenda")}
      {node("86%", "23%", GREEN, ICONS.doc, "Tableur")}
      {node("14%", "72%", "#2b2b2e", ICONS.cash, "Caisse")}
      {node("86%", "72%", "#3b6fd8", ICONS.bank, "Banque")}
      <div className="mv-a" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "5.6em", height: "5.6em", borderRadius: "1.5em", background: `linear-gradient(140deg,#f0595a,${RED} 50%,#b52a2c)`, display: "grid", placeItems: "center", boxShadow: "0 0 0 0.6em rgba(233,68,69,0.18), 0 1.6em 3em rgba(0,0,0,0.5)" }}>
        <svg width="2.4em" height="2.4em" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></svg>
      </div>
    </div>
  );
}

/* mini tableau de bord réutilisé */
function MiniDash({ compact = false }: { compact?: boolean }) {
  const bars = [40, 62, 48, 75, 58, 90, 70];
  return (
    <div style={{ height: "100%", background: "#f6f6f8", padding: compact ? "0.7em" : "0.9em", display: "flex", flexDirection: "column", gap: "0.6em" }}>
      <div className="mv-row" style={{ gap: "0.5em" }}>
        <div style={{ flex: 1, background: "#fff", borderRadius: "0.6em", padding: "0.55em 0.65em" }}>
          <div className="mv-sub" style={{ fontSize: "0.5em" }}>Ventes</div>
          <div className="mv-h" style={{ fontSize: "0.85em", marginTop: "0.15em" }}>3 240 €</div>
        </div>
        {!compact && (
          <div style={{ flex: 1, background: "#fff", borderRadius: "0.6em", padding: "0.55em 0.65em" }}>
            <div className="mv-sub" style={{ fontSize: "0.5em" }}>Commandes</div>
            <div className="mv-h" style={{ fontSize: "0.85em", marginTop: "0.15em" }}>48</div>
          </div>
        )}
      </div>
      <div style={{ flex: 1, background: "#fff", borderRadius: "0.6em", padding: "0.6em", display: "flex", alignItems: "flex-end", gap: "0.35em" }}>
        {bars.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "0.25em", background: i === 5 ? RED : "#e4e4ea" }} />)}
      </div>
    </div>
  );
}

/* W2 — Sur ordinateur et téléphone */
function W2() {
  return (
    <div style={{ position: "relative", width: "26em", height: "15.5em" }}>
      <div className="mv-a" style={{ left: 0, top: 0, width: "21em", height: "13.4em", borderRadius: "0.9em", background: "#1a1a1c", padding: "0.45em", boxShadow: "0 2em 4em rgba(0,0,0,0.55), inset 0 0 0 0.1em #444" }}>
        <div style={{ height: "100%", borderRadius: "0.5em", overflow: "hidden" }}><MiniDash /></div>
      </div>
      <div className="mv-a" style={{ left: "-1.2em", top: "13.2em", width: "23.4em", height: "0.8em", borderRadius: "0 0 0.8em 0.8em", background: "linear-gradient(180deg,#d7d7dc,#9a9aa0)" }} />
      <div className="mv-a" style={{ right: 0, top: "3.6em", width: "6.4em", height: "11.8em", borderRadius: "1.1em", background: "#111", padding: "0.25em", boxShadow: "0 1.6em 3em rgba(0,0,0,0.6), inset 0 0 0 0.1em #555" }}>
        <div style={{ height: "100%", borderRadius: "0.9em", overflow: "hidden", fontSize: "0.82em", paddingTop: "0.6em", background: "#f6f6f8" }}><MiniDash compact /></div>
      </div>
    </div>
  );
}

/* W3 — Vos chiffres en clair */
function W3() {
  const pts = [62, 55, 58, 44, 47, 33, 36, 22, 14];
  const d = pts.map((y, i) => `${i ? "L" : "M"}${i * 25} ${y}`).join(" ");
  return (
    <div style={{ ...card, width: "25em", padding: "1.4em 1.6em" }}>
      <div className="mv-sub" style={{ fontSize: "0.8em" }}>Chiffre d'affaires du mois</div>
      <div className="mv-row" style={{ gap: "0.6em", marginTop: "0.25em", alignItems: "baseline" }}>
        <span className="mv-h" style={{ fontSize: "2.3em" }}>12 480 €</span>
        <span className="mv-chip" style={{ fontSize: "0.75em", background: "#e6f6ec", color: GREEN }}>+18 %</span>
      </div>
      <svg style={{ display: "block", width: "100%", height: "5em", marginTop: "0.9em" }} viewBox="0 0 200 70" preserveAspectRatio="none">
        <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={RED} stopOpacity="0.25" /><stop offset="1" stopColor={RED} stopOpacity="0" /></linearGradient></defs>
        <path d={`${d} L200 70 L0 70Z`} fill="url(#wg)" />
        <path d={d} fill="none" stroke={RED} strokeWidth="2.4" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

/* W4 — Devis et factures */
function W4() {
  const row = (l: string, r: string) => (
    <div className="mv-row" style={{ justifyContent: "space-between", fontSize: "0.82em", marginTop: "0.55em" }}><span style={{ color: "#555" }}>{l}</span><span style={{ fontWeight: 600 }}>{r}</span></div>
  );
  return (
    <div style={{ ...card, width: "22em", padding: "1.4em 1.5em" }}>
      <div className="mv-row" style={{ justifyContent: "space-between" }}>
        <span className="mv-h" style={{ fontSize: "1.1em" }}>Devis n° 0142</span>
        <span className="mv-chip" style={{ fontSize: "0.68em", background: "#e6f6ec", color: GREEN }}>✓ Envoyé</span>
      </div>
      {row("Pose cuisine", "980 €")}
      {row("Fournitures", "260 €")}
      <div style={{ height: "0.06em", background: "#e5e5ea", margin: "0.8em 0 0.2em" }} />
      <div className="mv-row" style={{ justifyContent: "space-between" }}>
        <span className="mv-h" style={{ fontSize: "0.95em" }}>Total</span>
        <span className="mv-h" style={{ fontSize: "1.45em" }}>1 240 €</span>
      </div>
    </div>
  );
}

/* W5 — Stocks et commandes */
function W5() {
  const item = (name: string, pct: number, low: boolean) => (
    <div style={{ marginTop: "0.9em" }}>
      <div className="mv-row" style={{ justifyContent: "space-between", fontSize: "0.85em" }}>
        <span style={{ fontWeight: 600 }}>{name}</span>
        <span style={{ fontWeight: 700, color: low ? RED : GREEN }}>{low ? "Stock bas" : `${pct} %`}</span>
      </div>
      <div style={{ height: "0.55em", borderRadius: "1em", background: "#eeeef2", marginTop: "0.4em" }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: "1em", background: low ? RED : GREEN }} />
      </div>
    </div>
  );
  return (
    <div style={{ ...card, width: "24em", padding: "1.2em 1.5em 1.4em" }}>
      {item("Farine T55", 12, true)}
      {item("Huile d'olive", 76, false)}
      {item("Café en grains", 54, false)}
    </div>
  );
}

/* W6 — Réservations et commandes */
function W6() {
  const r = (t: string, n: string, p: string, c: string) => (
    <div className="mv-row" style={{ gap: "0.8em", padding: "0.6em 0", borderTop: "0.06em solid #ececf0" }}>
      <span className="mv-h" style={{ fontSize: "0.95em", width: "3.2em" }}>{t}</span>
      <span style={{ flex: 1, fontSize: "0.85em", fontWeight: 600 }}>{n}</span>
      <span className="mv-chip" style={{ fontSize: "0.68em", background: c + "1f", color: c }}>{p}</span>
    </div>
  );
  return (
    <div style={{ ...card, width: "24em", padding: "1.2em 1.5em 0.6em" }}>
      <div className="mv-row" style={{ justifyContent: "space-between", marginBottom: "0.5em" }}>
        <span className="mv-h" style={{ fontSize: "1.1em" }}>Ce soir</span>
        <span className="mv-sub" style={{ fontSize: "0.8em" }}>12 couverts</span>
      </div>
      {r("19:30", "Martin", "4 pers.", RED)}
      {r("20:00", "Durand", "2 pers.", "#3b6fd8")}
      {r("20:45", "Leroy", "6 pers.", GREEN)}
    </div>
  );
}

/* Grande carte — Votre outil, partout */
function WFeature() {
  const nav = ["Tableau de bord", "Réservations", "Stocks", "Devis", "Clients"];
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "9em" }}>
      <div style={{ position: "relative", width: "34em", height: "21em" }}>
        <div className="mv-a" style={{ left: 0, top: 0, width: "30em", height: "19em", borderRadius: "1em", background: "#1a1a1c", padding: "0.5em", boxShadow: "0 2.4em 5em rgba(0,0,0,0.6), inset 0 0 0 0.1em #444" }}>
          <div style={{ height: "100%", borderRadius: "0.6em", overflow: "hidden", display: "flex", background: "#f6f6f8" }}>
            <div style={{ width: "7.4em", background: "#fff", padding: "0.9em 0.7em", borderRight: "0.06em solid #ececf0" }}>
              <div className="mv-row" style={{ gap: "0.4em", marginBottom: "1em" }}><Logo size={1.4} radius={0.4} /><span className="mv-h" style={{ fontSize: "0.62em" }}>Bellevue</span></div>
              {nav.map((n, i) => (
                <div key={n} style={{ fontSize: "0.55em", fontWeight: 600, padding: "0.55em 0.7em", borderRadius: "0.6em", marginTop: "0.25em", background: i === 0 ? "#fff1f0" : "transparent", color: i === 0 ? RED : "#555" }}>{n}</div>
              ))}
            </div>
            <div style={{ flex: 1, fontSize: "1.15em" }}><MiniDash /></div>
          </div>
        </div>
        <div className="mv-a" style={{ right: 0, top: "5em", width: "8.4em", height: "16.4em", borderRadius: "1.4em", background: "#111", padding: "0.3em", boxShadow: "0 2em 4em rgba(0,0,0,0.65), inset 0 0 0 0.1em #555" }}>
          <div style={{ height: "100%", borderRadius: "1.15em", overflow: "hidden", background: "#fff", padding: "1.3em 0.7em 0" }}>
            <div className="mv-h" style={{ fontSize: "0.7em" }}>Aujourd'hui</div>
            {[["Commande fournisseur", RED], ["Rappeler M. Durand", "#3b6fd8"], ["Envoyer devis 0142", GREEN]].map(([t, c]) => (
              <div key={t} className="mv-row" style={{ gap: "0.4em", marginTop: "0.7em", fontSize: "0.5em", fontWeight: 600 }}>
                <span style={{ width: "1em", height: "1em", borderRadius: "0.3em", border: `0.15em solid ${c}`, flex: "none" }} />{t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const VISUALS: Record<string, () => preact.JSX.Element> = {
  "menu-0": V0, "menu-1": V1, "menu-2": V2, "menu-3": V3, "menu-4": V4, "menu-5": V5, "menu-6": V6,
  "webapp-0": W0, "webapp-1": W1, "webapp-2": W2, "webapp-3": W3, "webapp-4": W4, "webapp-5": W5, "webapp-6": W6,
};

export function OfferVisual({ id }: { id: string }) {
  const V = VISUALS[id];
  if (!V) return null;
  return (
    <div className="mv">
      <div className="mv-in">
        <div className="mv-center">
          <div className="mv-float"><V /></div>
        </div>
      </div>
    </div>
  );
}

export function OfferFeatureVisual({ id }: { id: string }) {
  return (
    <div className="mv-feature">
      <div className="mv-in">
        <div className="mv-float mv-float-lg" style={{ position: "absolute", inset: 0 }}>
          {id === "webapp" ? <WFeature /> : <V7 />}
        </div>
      </div>
    </div>
  );
}
