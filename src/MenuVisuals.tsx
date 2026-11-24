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

/* ---------- 0 — À votre image ---------- */
function V0() {
  const colors = ["#e94445", "#1f3a2e", "#c8873a", "#2b2b2e", "#4b5bd6"];
  return (
    <>
      <Phone style={{ left: "15.6em", top: "2.4em", width: "14.4em", height: "30em" }}>
        <MenuApp serif />
      </Phone>
      <div className="mv-sheet" style={{ left: "1.8em", top: "4.6em", width: "15.4em", padding: "0.95em 1em" }}>
        <div className="mv-h" style={{ fontSize: "0.8em" }}>Votre identité</div>
        <div className="mv-sub" style={{ fontSize: "0.5em", marginTop: "0.3em" }}>Couleur principale</div>
        <div className="mv-row" style={{ gap: "0.5em", marginTop: "0.5em" }}>
          {colors.map((c, i) => (
            <span key={c} style={{ width: "1.55em", height: "1.55em", borderRadius: "50%", background: c, display: "grid", placeItems: "center", boxShadow: i === 0 ? `0 0 0 0.14em #fff, 0 0 0 0.27em ${c}` : "inset 0 0 0 0.06em rgba(0,0,0,0.1)" }}>
              {i === 0 && <svg width="0.8em" height="0.8em" viewBox="0 0 12 12"><path d="M2.5 6.2 5 8.6l4.6-5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </span>
          ))}
        </div>
        <div className="mv-sub" style={{ fontSize: "0.5em", marginTop: "0.9em" }}>Typographie</div>
        <div className="mv-seg" style={{ marginTop: "0.45em", fontSize: "0.52em" }}>
          <span>Moderne</span>
          <span className="on" style={{ fontFamily: "Georgia, serif" }}>Bistrot</span>
          <span style={{ fontFamily: "'Courier New', monospace" }}>Brut</span>
        </div>
        <div className="mv-row" style={{ marginTop: "0.85em", padding: "0.5em 0.6em", borderRadius: "0.7em", background: "#f2f2f7" }}>
          <Logo size={1.5} radius={0.4} />
          <div style={{ flex: 1 }}>
            <div className="mv-h" style={{ fontSize: "0.52em" }}>logo-bellevue.png</div>
            <div className="mv-sub" style={{ fontSize: "0.42em", marginTop: "0.2em" }}>Importé</div>
          </div>
          <span style={{ fontSize: "0.5em", color: RED, fontWeight: 600 }}>Changer</span>
        </div>
      </div>
    </>
  );
}

/* ---------- 1 — Modifiable à tout moment ---------- */
function V1() {
  return (
    <>
      <Phone style={{ left: "19.4em", top: "3.4em", width: "14.4em", height: "30em" }}>
        <MenuApp hl="salmon" priceOverride={{ salmon: "15,50 €" }} />
      </Phone>
      <div className="mv-sheet" style={{ left: "1.6em", top: "3em", width: "18.6em", padding: "0.9em 1em 1em", background: "#f2f2f7" }}>
        <div className="mv-row" style={{ justifyContent: "space-between", fontSize: "0.55em" }}>
          <span style={{ color: RED }}>Annuler</span>
          <span className="mv-h" style={{ fontSize: "1.15em" }}>Modifier le plat</span>
          <span style={{ color: RED, fontWeight: 700 }}>OK</span>
        </div>
        <div className="mv-row" style={{ marginTop: "0.8em", gap: "0.8em" }}>
          <div className="mv-photo" style={{ width: "4.6em", height: "4.6em", borderRadius: "0.9em", backgroundImage: IMG("salmon"), boxShadow: "0 0.3em 0.8em rgba(0,0,0,0.18)" }} />
          <div style={{ flex: 1 }}>
            <div className="mv-h" style={{ fontSize: "0.78em" }}>Pavé de saumon</div>
            <div className="mv-sub" style={{ fontSize: "0.5em", marginTop: "0.3em" }}>Purée maison, asperges vertes, beurre citronné</div>
          </div>
        </div>
        <div className="mv-group" style={{ marginTop: "0.8em", fontSize: "0.58em" }}>
          <div className="mv-row" style={{ justifyContent: "space-between", padding: "0.75em 0.9em" }}>
            <span>Prix</span>
            <span className="mv-row" style={{ gap: "0.4em" }}>
              <span className="mv-sub" style={{ textDecoration: "line-through" }}>14,50 €</span>
              <span style={{ fontWeight: 700, color: RED }}>15,50 €<span style={{ display: "inline-block", width: "0.09em", height: "1em", background: RED, marginLeft: "0.1em", verticalAlign: "-0.15em" }} /></span>
            </span>
          </div>
          <div className="mv-sep" />
          <div className="mv-row" style={{ justifyContent: "space-between", padding: "0.6em 0.9em" }}>
            <span>Disponible aujourd'hui</span>
            <span className="mv-toggle" />
          </div>
          <div className="mv-sep" />
          <div className="mv-row" style={{ justifyContent: "space-between", padding: "0.75em 0.9em" }}>
            <span>Catégorie</span>
            <span className="mv-sub">Plats ›</span>
          </div>
        </div>
      </div>
      <div className="mv-a mv-row" style={{ left: "4.4em", top: "29.8em", padding: "0.55em 0.95em", borderRadius: "99em", background: "rgba(28,28,30,0.92)", color: "#fff", fontSize: "0.58em", fontWeight: 600, boxShadow: "0 0.8em 1.6em rgba(0,0,0,0.4)" }}>
        <span style={{ width: "1.3em", height: "1.3em", borderRadius: "50%", background: "#34c759", display: "grid", placeItems: "center" }}>
          <svg width="0.75em" height="0.75em" viewBox="0 0 12 12"><path d="M2.5 6.2 5 8.6l4.6-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        En ligne sur votre carte
      </div>
    </>
  );
}

/* ---------- 2 — Sans réimpression ---------- */
function V2() {
  const lines: [string, string, string?][] = [["Pavé de saumon", "14,50"], ["Bavette grillée", "17,00", "18,00"], ["Linguine aux cèpes", "15,00"], ["Salade du marché", "11,00"], ["Fondant chocolat", "7,50"]];
  return (
    <>
      <div className="mv-a mv-shadow" style={{ left: "1.6em", top: "4.2em", width: "14.4em", height: "19em", padding: "1.2em", background: "linear-gradient(170deg,#fbf7ef,#efe7d8)", borderRadius: "0.25em", transform: "rotate(-5deg)", fontFamily: "Georgia, 'Times New Roman', serif", color: "#3b2f25" }}>
        <div style={{ textAlign: "center", fontSize: "0.9em", fontStyle: "italic", fontWeight: 700 }}>Bistrot Bellevue</div>
        <div style={{ textAlign: "center", fontSize: "0.42em", letterSpacing: "0.3em", marginTop: "0.3em", color: "#8a7560" }}>— LA CARTE —</div>
        {lines.map(([n, p, newp]) => (
          <div key={n} className="mv-row" style={{ marginTop: "0.75em", fontSize: "0.55em", justifyContent: "space-between", gap: "0.3em" }}>
            <span>{n}</span>
            <span style={{ flex: 1, borderBottom: "0.1em dotted #b9a88f", transform: "translateY(-0.25em)" }} />
            <span style={{ position: "relative" }}>
              <span style={newp ? { textDecoration: "line-through", textDecorationColor: "#1d4ed8", textDecorationThickness: "0.12em" } : undefined}>{p}</span>
              {newp && <span style={{ position: "absolute", right: "-0.4em", top: "-1.2em", fontFamily: "'Bradley Hand', 'Segoe Print', cursive", color: "#1d4ed8", fontSize: "1.1em", transform: "rotate(-8deg)" }}>{newp}</span>}
            </span>
          </div>
        ))}
        <div style={{ marginTop: "1.2em", width: "2.4em", height: "2.4em", borderRadius: "50%", border: "0.1em solid rgba(120,80,40,0.25)", opacity: 0.6 }} />
      </div>
      <Phone style={{ left: "16.6em", top: "2.6em", width: "14.4em", height: "30em" }}>
        <MenuApp list={["salmon", "steak", "pasta", "salad"]} hl="steak" />
      </Phone>
    </>
  );
}

/* ---------- 3 — QR code d'avis Google ---------- */
function V3() {
  return (
    <>
      <Phone style={{ left: "1.8em", top: "2.4em", width: "14.4em", height: "30em" }} bg="#fff">
        <div style={{ padding: "0.6em 1em 0", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}><Logo size={2.6} radius={0.8} /></div>
          <div className="mv-h" style={{ fontSize: "0.82em", marginTop: "0.6em" }}>Bistrot Bellevue</div>
          <div className="mv-sub" style={{ fontSize: "0.5em", marginTop: "0.3em" }}>Comment s'est passé votre repas ?</div>
          <div className="mv-star" style={{ fontSize: "1.55em", marginTop: "0.45em", letterSpacing: "0.05em" }}>★★★★★</div>
          <div style={{ marginTop: "0.6em", minHeight: "4em", borderRadius: "0.75em", background: "#f2f2f7", textAlign: "left", padding: "0.7em 0.8em", fontSize: "0.5em", lineHeight: 1.45, color: "#333" }}>
            Accueil adorable et le saumon était parfait. On reviendra !<span style={{ display: "inline-block", width: "0.1em", height: "1.1em", background: RED, verticalAlign: "-0.2em" }} />
          </div>
          <div className="mv-cta" style={{ marginTop: "0.7em", fontSize: "0.58em" }}>Publier sur Google</div>
        </div>
      </Phone>
      <div className="mv-sheet" style={{ left: "17.4em", top: "4.2em", width: "13em", padding: "0.85em 0.9em" }}>
        <div className="mv-row" style={{ gap: "0.5em" }}>
          <span style={{ width: "1.8em", height: "1.8em", borderRadius: "50%", background: "linear-gradient(135deg,#7c9cff,#4b5bd6)", color: "#fff", display: "grid", placeItems: "center", fontSize: "0.62em", fontWeight: 700 }}>CL</span>
          <div>
            <div className="mv-h" style={{ fontSize: "0.56em" }}>Camille L.</div>
            <div className="mv-sub" style={{ fontSize: "0.44em", marginTop: "0.15em" }}>Local Guide · il y a 2 jours</div>
          </div>
        </div>
        <div className="mv-star" style={{ fontSize: "0.7em", marginTop: "0.5em" }}>★★★★★</div>
        <div style={{ fontSize: "0.5em", lineHeight: 1.45, marginTop: "0.35em", color: "#333" }}>Super adresse, la carte en ligne est très pratique.</div>
      </div>
      <div className="mv-a mv-shadow" style={{ left: "19.4em", top: "11.6em", width: "8.8em", padding: "0.7em", background: "#fff", borderRadius: "0.9em", textAlign: "center" }}>
        <div style={{ width: "7.4em", height: "7.4em" }}><QR seed={3} /></div>
        <div className="mv-h" style={{ fontSize: "0.5em", marginTop: "0.45em" }}>Laissez-nous un avis</div>
        <div className="mv-star" style={{ fontSize: "0.5em", marginTop: "0.2em" }}>★★★★★</div>
      </div>
    </>
  );
}

/* ---------- 4 — Carte de fidélité digitale ---------- */
function V4() {
  const label = { display: "block", fontSize: "0.38em", letterSpacing: "0.12em", opacity: 0.6 };
  return (
    <>
      <div className="mv-a mv-shadow" style={{ left: "5.2em", top: "5.4em", width: "21.6em", borderRadius: "1.1em", overflow: "hidden", background: "linear-gradient(160deg,#3a2a22,#1e1612)", color: "#fff" }}>
        <div className="mv-row" style={{ justifyContent: "space-between", padding: "0.8em 0.95em 0" }}>
          <span className="mv-row" style={{ gap: "0.45em" }}>
            <Logo size={1.5} radius={0.45} />
            <span className="mv-h" style={{ fontSize: "0.68em" }}>Café Bellevue</span>
          </span>
          <span style={{ textAlign: "right" }}>
            <span style={label}>TAMPONS</span>
            <span className="mv-h" style={{ fontSize: "0.85em" }}>7 / 10</span>
          </span>
        </div>
        <div style={{ position: "relative", marginTop: "0.75em", height: "6.6em", backgroundImage: IMG("latte"), backgroundSize: "cover", backgroundPosition: "center 40%" }}>
          <div className="mv-a" style={{ inset: 0, background: "linear-gradient(180deg,rgba(30,22,18,0.15),rgba(30,22,18,0.6))" }} />
          <div className="mv-a" style={{ left: "0.95em", right: "0.95em", bottom: "0.75em", display: "grid", gridTemplateColumns: "repeat(10,1fr)", gap: "0.35em" }}>
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} style={{ aspectRatio: "1", borderRadius: "50%", background: i < 7 ? "#fff" : "rgba(255,255,255,0.12)", border: i < 7 ? "none" : "0.08em dashed rgba(255,255,255,0.7)", display: "grid", placeItems: "center", boxShadow: i < 7 ? "0 0.15em 0.35em rgba(0,0,0,0.3)" : undefined }}>
                {i < 7 && <svg width="55%" height="55%" viewBox="0 0 16 16"><path d="M3 6h8v3.5A3.5 3.5 0 0 1 7.5 13h-1A3.5 3.5 0 0 1 3 9.5V6Zm8 1h1.2a1.8 1.8 0 0 1 0 3.6H11" fill="none" stroke={RED} strokeWidth="1.6" strokeLinejoin="round" /></svg>}
              </span>
            ))}
          </div>
        </div>
        <div className="mv-row" style={{ justifyContent: "space-between", padding: "0.75em 0.95em", alignItems: "flex-end" }}>
          <span>
            <span style={label}>RÉCOMPENSE</span>
            <span className="mv-h" style={{ fontSize: "0.62em" }}>Café offert</span>
          </span>
          <span>
            <span style={label}>MEMBRE</span>
            <span className="mv-h" style={{ fontSize: "0.62em" }}>Julie M.</span>
          </span>
          <span style={{ width: "3em", height: "3em", borderRadius: "0.35em", overflow: "hidden" }}><QR seed={21} /></span>
        </div>
      </div>
      <div className="mv-banner mv-row" style={{ left: "6.6em", top: "1.6em", width: "18.8em", padding: "0.6em 0.75em", gap: "0.6em" }}>
        <Logo size={1.7} radius={0.45} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mv-row" style={{ justifyContent: "space-between", fontSize: "0.5em" }}>
            <span className="mv-h">Café Bellevue</span>
            <span className="mv-sub">maintenant</span>
          </div>
          <div style={{ fontSize: "0.48em", marginTop: "0.2em", color: "#333" }}>+1 tampon ! Plus que 3 avant votre café offert.</div>
        </div>
      </div>
    </>
  );
}

/* ---------- 5 — QR codes pour vos supports ---------- */
function V5() {
  return (
    <>
      <div className="mv-a" style={{ left: 0, right: 0, bottom: 0, height: "8em", background: "linear-gradient(180deg,#5a3b28,#3a2418)", boxShadow: "inset 0 0.2em 0.3em rgba(255,255,255,0.12)" }}>
        <div className="mv-a" style={{ inset: 0, opacity: 0.35, background: "repeating-linear-gradient(178deg, transparent 0 0.6em, rgba(0,0,0,0.25) 0.6em 0.7em)" }} />
      </div>
      <div className="mv-a mv-shadow" style={{ left: "2em", top: "2.4em", width: "7.6em", height: "7.6em", borderRadius: "50%", background: RED, display: "grid", placeItems: "center", textAlign: "center", color: "#fff" }}>
        <div>
          <div style={{ width: "4.2em", height: "4.2em", margin: "0 auto", borderRadius: "0.3em", overflow: "hidden" }}><QR seed={5} /></div>
          <div className="mv-h" style={{ fontSize: "0.42em", marginTop: "0.45em", letterSpacing: "0.08em" }}>NOTRE CARTE</div>
        </div>
      </div>
      <div className="mv-a" style={{ left: "10.4em", top: "3.4em", width: "11.4em", height: "17.4em" }}>
        <div className="mv-a mv-shadow" style={{ inset: "0 0 1em 0", borderRadius: "0.35em", background: "#fff", padding: "1em", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}><Logo size={1.7} radius={0.5} /></div>
          <div className="mv-h" style={{ fontSize: "0.72em", marginTop: "0.5em", fontFamily: "Georgia, serif" }}>Bistrot Bellevue</div>
          <div style={{ width: "7em", height: "7em", margin: "0.7em auto 0" }}><QR seed={11} /></div>
          <div className="mv-h" style={{ fontSize: "0.55em", marginTop: "0.55em" }}>Scannez pour voir la carte</div>
          <div className="mv-sub" style={{ fontSize: "0.42em", marginTop: "0.2em" }}>Sans application</div>
        </div>
        <div className="mv-a" style={{ inset: "-0.3em -0.3em 0.7em -0.3em", borderRadius: "0.5em", background: "linear-gradient(115deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 35%, transparent 50%, rgba(255,255,255,0.12))", border: "0.08em solid rgba(255,255,255,0.45)" }} />
        <div className="mv-a" style={{ left: "-0.8em", right: "-0.8em", bottom: 0, height: "1.3em", borderRadius: "0.3em", background: "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.15))", boxShadow: "0 0.6em 1em rgba(0,0,0,0.45)" }} />
      </div>
      <div className="mv-a mv-shadow" style={{ left: "22.6em", top: "8.4em", width: "8em", height: "11.4em", background: "#1c1a1b", borderRadius: "0.3em", transform: "rotate(7deg)", padding: "0.8em", color: "#fff" }}>
        <div className="mv-h" style={{ fontSize: "0.62em" }}>À emporter</div>
        <div style={{ fontSize: "0.42em", opacity: 0.7, marginTop: "0.25em" }}>Commandez en 1 scan</div>
        <div style={{ width: "5.4em", height: "5.4em", marginTop: "0.8em", borderRadius: "0.3em", overflow: "hidden" }}><QR seed={9} /></div>
        <div style={{ height: "0.35em", width: "60%", background: RED, borderRadius: "1em", marginTop: "0.8em" }} />
      </div>
    </>
  );
}

/* ---------- 6 — Sans application ---------- */
function V6() {
  const tilt = "perspective(18em) rotateX(8deg) rotateY(-10deg)";
  return (
    <Phone dark style={{ left: "8.8em", top: "1.6em", width: "14.4em", height: "30em" }} bg="#000">
      <div className="mv-a" style={{ left: 0, right: 0, top: "3.4em", height: "19.4em", overflow: "hidden", background: "radial-gradient(90% 70% at 50% 60%, #6a4c39, #2c1d15 70%, #160e0a)" }}>
        <div className="mv-a" style={{ left: 0, right: 0, bottom: 0, height: "6em", background: "linear-gradient(180deg,#5a3b28,#3a2418)" }} />
        <div className="mv-a" style={{ left: "3.2em", top: "4.2em", width: "7.4em", height: "10.4em", background: "#f4f2ee", borderRadius: "0.25em", transform: tilt, boxShadow: "0 1em 1.6em rgba(0,0,0,0.5)", padding: "0.6em", textAlign: "center" }}>
          <div className="mv-h" style={{ fontSize: "0.45em", fontFamily: "Georgia, serif" }}>Bistrot Bellevue</div>
          <div style={{ width: "5.4em", height: "5.4em", margin: "0.6em auto 0" }}><QR seed={11} /></div>
          <div style={{ fontSize: "0.38em", marginTop: "0.5em", fontWeight: 600 }}>Scannez la carte</div>
        </div>
        <div className="mv-a" style={{ left: "3.75em", top: "5.6em", width: "6.2em", height: "6.2em", border: "0.12em solid #ffd60a", borderRadius: "0.5em", transform: tilt }} />
        <div className="mv-a mv-row" style={{ left: "50%", top: "15.2em", transform: "translateX(-50%)", padding: "0.45em 0.85em", borderRadius: "99em", background: "#ffd60a", color: "#000", fontSize: "0.56em", fontWeight: 600, whiteSpace: "nowrap", gap: "0.4em" }}>
          <svg width="1em" height="1em" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.6" fill="none" stroke="#000" strokeWidth="1.3" /><path d="m10.6 5.4-1.8 3.4-3.4 1.8 1.8-3.4z" fill="#000" /></svg>
          bellevue.fr/carte
        </div>
      </div>
      <div className="mv-a" style={{ left: 0, right: 0, top: "23.4em", textAlign: "center" }}>
        <div className="mv-row" style={{ justifyContent: "center", gap: "1.1em", fontSize: "0.46em", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.65)" }}>
          <span>VIDÉO</span><span style={{ color: "#ffd60a" }}>PHOTO</span><span>PORTRAIT</span>
        </div>
        <div style={{ width: "3em", height: "3em", margin: "0.7em auto 0", borderRadius: "50%", border: "0.2em solid #fff", padding: "0.18em" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#fff" }} />
        </div>
      </div>
    </Phone>
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
      <div className="mv-banner mv-row" style={{ left: "50%", marginLeft: "-17.2em", top: "7.6em", padding: "0.55em 0.8em", gap: "0.5em" }}>
        <span style={{ width: "1.5em", height: "1.5em", borderRadius: "0.4em", background: "#e8f6ea", display: "grid", placeItems: "center" }}>
          <svg width="0.9em" height="0.9em" viewBox="0 0 16 16"><path d="M13 3C7 3 3 6 3 11c0 1 .2 1.6.5 2 .6-3 2.6-5.3 6-6.5-2.5 1.6-4 3.6-4.6 6.3C11 13 13 9 13 3Z" fill="#1f8a3b" /></svg>
        </span>
        <span>
          <span className="mv-h" style={{ display: "block", fontSize: "0.56em" }}>Végétarien</span>
          <span className="mv-sub" style={{ fontSize: "0.44em" }}>3 plats signalés</span>
        </span>
      </div>
    </>
  );
}

const VISUALS = [V0, V1, V2, V3, V4, V5, V6];

export function MenuVisual({ index }: { index: number }) {
  const V = VISUALS[index];
  if (!V) return null;
  return (
    <div className="mv">
      <div className="mv-in">
        <V />
      </div>
    </div>
  );
}

export function MenuFeatureVisual() {
  return (
    <div className="mv-feature">
      <div className="mv-in">
        <V7 />
      </div>
    </div>
  );
}
