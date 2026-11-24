// Illustrations HTML/CSS des cartes « Menu digital » (nettes à toutes les tailles).
// Unité : 1em = largeur de la carte / 32 (voir .mv-in dans index.css).

type S = Record<string, string | number>;

function QR({ seed = 7, color = "#111" }: { seed?: number; color?: string }) {
  const n = 21;
  const cells: string[] = [];
  let x = seed * 9301 + 49297;
  const rnd = () => ((x = (x * 9301 + 49297) % 233280) / 233280);
  const finder = (r: number, c: number) => {
    for (const [fr, fc] of [[0, 0], [0, n - 7], [n - 7, 0]]) {
      if (r >= fr && r < fr + 7 && c >= fc && c < fc + 7) return true;
    }
    return false;
  };
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) {
      if (finder(r, c)) continue;
      if ((r === 7 || c === 7 || r === n - 8 || c === n - 8) && (r < 8 || c < 8) && !(r >= n - 8 && c >= n - 8)) continue;
      if (rnd() > 0.52) cells.push(`M${c} ${r}h1v1h-1z`);
    }
  const f = (r: number, c: number) => `M${c} ${r}h7v7h-7zM${c + 1} ${r + 1}v5h5v-5zM${c + 2} ${r + 2}h3v3h-3z`;
  return (
    <svg className="mv-qr" viewBox="-1.5 -1.5 24 24" shapeRendering="crispEdges">
      <rect x="-1.5" y="-1.5" width="24" height="24" rx="2" fill="#fff" />
      <path d={`${f(0, 0)}${f(0, n - 7)}${f(n - 7, 0)}`} fill={color} fillRule="evenodd" />
      <path d={cells.join("")} fill={color} />
    </svg>
  );
}

function Phone({ style, children, status = true }: { style: S; children: preact.ComponentChildren; status?: boolean }) {
  return (
    <div className="mv-phone" style={style}>
      <div className="mv-screen">
        <div className="mv-island" />
        {status && (
          <div className="mv-status">
            <span>9:41</span>
            <span>●●● ▮</span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

function Dish({ plate, name, desc, price, hl }: { plate: string; name: string; desc?: string; price: string; hl?: boolean }) {
  return (
    <div className="mv-row" style={{ padding: "0.45em 0.5em", borderRadius: "0.8em", background: hl ? "rgba(233,68,69,0.1)" : "#fff", marginTop: "0.4em" }}>
      <div className={`mv-plate ${plate}`} style={{ width: "2.6em", height: "2.6em" }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="mv-t" style={{ fontSize: "0.68em" }}>{name}</div>
        {desc ? <div className="mv-s" style={{ fontSize: "0.5em", marginTop: "0.2em" }}>{desc}</div> : <div className="mv-line" style={{ width: "70%", marginTop: "0.35em" }} />}
      </div>
      <div className="mv-t" style={{ fontSize: "0.62em", color: hl ? "#e94445" : "#111" }}>{price}</div>
    </div>
  );
}

function MenuScreen({ brand = "#e94445", title = "Notre carte", big = false }: { brand?: string; title?: string; big?: boolean }) {
  return (
    <div style={{ padding: "0.6em 0.7em" }}>
      <div className="mv-row" style={{ marginTop: "0.3em" }}>
        <div style={{ width: "1.6em", height: "1.6em", borderRadius: "0.5em", background: brand, display: "grid", placeItems: "center", color: "#fff", fontSize: "0.8em", fontWeight: 900 }}>B</div>
        <div className="mv-t" style={{ fontSize: big ? "1.15em" : "0.9em" }}>{title}</div>
      </div>
      <div className={`mv-row ${big ? "" : "mv-tabs-sm"}`} style={{ gap: "0.3em", marginTop: "0.6em" }}>
        <span className="mv-pill" style={{ background: brand, color: "#fff" }}>Plats</span>
        <span className="mv-pill mv-soft">Entrées</span>
        <span className="mv-pill mv-soft">Desserts</span>
      </div>
    </div>
  );
}

/* 0 — À votre image */
function V0() {
  return (
    <>
      <Phone style={{ left: "11em", top: "1.6em", width: "10.5em", height: "21.5em" }}>
        <MenuScreen />
        <div style={{ padding: "0 0.5em" }}>
          <Dish plate="mv-p1" name="Saumon rôti" price="14,50 €" />
          <Dish plate="mv-p2" name="Salade du marché" price="11 €" />
          <Dish plate="mv-p3" name="Fondant chocolat" price="7 €" />
        </div>
      </Phone>
      <div className="mv-card" style={{ left: "1.6em", top: "3.4em", width: "8.6em", padding: "0.8em" }}>
        <div className="mv-t" style={{ fontSize: "0.72em" }}>Thème</div>
        <div className="mv-row" style={{ gap: "0.4em", marginTop: "0.6em" }}>
          {["#e94445", "#111", "#f3e7d3"].map((c, i) => (
            <div key={c} style={{ width: "1.7em", height: "1.7em", borderRadius: "50%", background: c, boxShadow: i === 0 ? "0 0 0 0.15em #fff, 0 0 0 0.3em #e94445" : "inset 0 0 0 0.08em rgba(0,0,0,0.12)" }} />
          ))}
        </div>
        <div className="mv-pill mv-soft" style={{ marginTop: "0.8em" }}>#E94445</div>
      </div>
      <div className="mv-card" style={{ left: "2.6em", top: "13.6em", width: "7.4em", padding: "0.7em 0.8em" }}>
        <div className="mv-s" style={{ fontSize: "0.55em" }}>Police</div>
        <div className="mv-row" style={{ justifyContent: "space-between", marginTop: "0.2em" }}>
          <span className="mv-t" style={{ fontSize: "1.1em", fontFamily: "Georgia, serif" }}>Aa</span>
          <span style={{ fontSize: "0.6em", color: "#888" }}>▾</span>
        </div>
      </div>
      <div className="mv-card" style={{ left: "22.8em", top: "6.2em", width: "7.4em", padding: "0.8em", textAlign: "center" }}>
        <div style={{ width: "3.4em", height: "3.4em", margin: "0 auto", borderRadius: "1em", background: "linear-gradient(140deg,#f0595a,#b52a2c)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 900, fontSize: "1.1em" }}>B</div>
        <div className="mv-s" style={{ fontSize: "0.55em", marginTop: "0.6em" }}>Votre logo</div>
      </div>
    </>
  );
}

/* 1 — Modifiable à tout moment */
function V1() {
  return (
    <>
      <Phone style={{ left: "19.2em", top: "1.8em", width: "10.5em", height: "21.5em" }}>
        <MenuScreen />
        <div style={{ padding: "0 0.5em" }}>
          <Dish plate="mv-p1" name="Saumon rôti" price="14,50 €" hl />
          <Dish plate="mv-p4" name="Risotto" price="13 €" />
          <Dish plate="mv-p3" name="Bavette" price="18 €" />
        </div>
      </Phone>
      <div className="mv-card" style={{ left: "1.8em", top: "4em", width: "18.6em", padding: "1em 1.1em" }}>
        <div className="mv-row" style={{ justifyContent: "space-between" }}>
          <span className="mv-t" style={{ fontSize: "0.95em" }}>Modifier un plat</span>
          <span style={{ width: "1.4em", height: "1.4em", borderRadius: "50%", background: "#f1eeec", display: "grid", placeItems: "center", fontSize: "0.6em" }}>✕</span>
        </div>
        <div className="mv-row" style={{ marginTop: "0.8em", alignItems: "flex-start" }}>
          <div className="mv-plate mv-p1" style={{ width: "4.2em", height: "4.2em", borderRadius: "0.9em" }} />
          <div style={{ flex: 1 }}>
            <div className="mv-s" style={{ fontSize: "0.5em" }}>Nom du plat</div>
            <div style={{ border: "0.08em solid #e3dfdc", borderRadius: "0.5em", padding: "0.35em 0.5em", fontSize: "0.62em", fontWeight: 600, marginTop: "0.2em" }}>Saumon rôti</div>
            <div className="mv-s" style={{ fontSize: "0.5em", marginTop: "0.5em" }}>Description</div>
            <div style={{ border: "0.08em solid #e3dfdc", borderRadius: "0.5em", padding: "0.35em 0.5em", fontSize: "0.52em", color: "#555", marginTop: "0.2em" }}>Purée, asperges, tomates rôties</div>
          </div>
        </div>
        <div className="mv-row" style={{ marginTop: "0.8em", justifyContent: "space-between" }}>
          <div style={{ border: "0.1em solid #e94445", borderRadius: "0.6em", padding: "0.35em 0.7em", fontSize: "0.72em", fontWeight: 800 }}>14,50 €<span style={{ color: "#e94445" }}>|</span></div>
          <div className="mv-row" style={{ gap: "0.4em" }}>
            <span className="mv-s" style={{ fontSize: "0.55em" }}>En ligne</span>
            <span style={{ width: "2.2em", height: "1.25em", borderRadius: "1em", background: "#e94445", position: "relative" }}>
              <span style={{ position: "absolute", right: "0.15em", top: "0.15em", width: "0.95em", height: "0.95em", borderRadius: "50%", background: "#fff" }} />
            </span>
          </div>
        </div>
        <div className="mv-row" style={{ marginTop: "0.8em", gap: "0.5em" }}>
          <div className="mv-btn mv-soft" style={{ flex: 1 }}>Annuler</div>
          <div className="mv-btn mv-red" style={{ flex: 1.4 }}>Publier</div>
        </div>
      </div>
    </>
  );
}

/* 2 — Sans réimpression */
function V2() {
  const sheet = (rot: number, l: number, t: number, op = 1) => (
    <div className="mv-card" style={{ left: `${l}em`, top: `${t}em`, width: "8.4em", height: "11.4em", padding: "0.9em 0.8em", transform: `rotate(${rot}deg)`, background: "#f4efe6", opacity: op, borderRadius: "0.4em" }}>
      <div className="mv-t" style={{ fontSize: "0.7em", textAlign: "center", fontFamily: "Georgia, serif" }}>Menu</div>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="mv-row" style={{ marginTop: "0.6em", justifyContent: "space-between" }}>
          <div className="mv-line" style={{ width: "62%", background: "#d9d0c2" }} />
          <div className="mv-line" style={{ width: "18%", background: "#d9d0c2" }} />
        </div>
      ))}
    </div>
  );
  return (
    <>
      {sheet(-10, 2.4, 6.2, 0.7)}
      {sheet(-4, 3.6, 5.4)}
      <div className="mv-abs" style={{ left: "1.6em", top: "11em", width: "12.4em", height: "0.3em", background: "#e94445", transform: "rotate(-38deg)", borderRadius: "1em", boxShadow: "0 0 1em rgba(233,68,69,0.7)" }} />
      <Phone style={{ left: "16.6em", top: "1.6em", width: "10.5em", height: "21.5em" }}>
        <MenuScreen />
        <div style={{ padding: "0 0.5em" }}>
          <Dish plate="mv-p2" name="Plat du jour" price="12 €" hl />
          <Dish plate="mv-p1" name="Poisson" price="16 €" />
          <Dish plate="mv-p4" name="Tarte" price="6 €" />
        </div>
      </Phone>
      <div className="mv-card" style={{ left: "24.6em", top: "15.6em", padding: "0.5em 0.8em", borderRadius: "2em" }}>
        <span className="mv-row" style={{ gap: "0.35em", fontSize: "0.62em", fontWeight: 800 }}>
          <span style={{ color: "#3f9a4a", fontSize: "1.3em" }}>❦</span>0 papier
        </span>
      </div>
    </>
  );
}

/* 3 — QR code d'avis Google */
function V3() {
  return (
    <>
      <Phone style={{ left: "8.4em", top: "1.4em", width: "11em", height: "22em" }}>
        <div style={{ padding: "1.4em 0.9em 0", textAlign: "center" }}>
          <div style={{ width: "2.4em", height: "2.4em", margin: "0 auto", borderRadius: "0.8em", background: "#e94445", display: "grid", placeItems: "center", color: "#fff", fontWeight: 900 }}>B</div>
          <div className="mv-t" style={{ fontSize: "0.85em", marginTop: "0.6em" }}>Laissez un avis</div>
          <div className="mv-s" style={{ fontSize: "0.5em", marginTop: "0.3em" }}>Votre avis nous aide à grandir</div>
          <div className="mv-star" style={{ fontSize: "1.25em", marginTop: "0.5em", letterSpacing: "0.08em" }}>★★★★★</div>
          <div style={{ marginTop: "0.6em", height: "4.4em", borderRadius: "0.7em", background: "#fff", border: "0.08em solid #e6e2df", textAlign: "left", padding: "0.5em", fontSize: "0.5em", color: "#555" }}>Super accueil et plats délicieux, on reviendra !</div>
          <div className="mv-btn mv-red" style={{ marginTop: "0.7em" }}>Publier l'avis</div>
        </div>
      </Phone>
      <div className="mv-card" style={{ left: "21.2em", top: "7.2em", width: "8.2em", padding: "0.7em", textAlign: "center" }}>
        <div className="mv-star" style={{ fontSize: "0.7em" }}>★ ★ ★</div>
        <div style={{ width: "6.2em", height: "6.2em", margin: "0.3em auto 0" }}><QR seed={3} /></div>
        <div className="mv-t" style={{ fontSize: "0.55em", marginTop: "0.4em" }}>Notez-nous</div>
      </div>
      <div className="mv-card" style={{ left: "1.8em", top: "15.2em", padding: "0.5em 0.8em", borderRadius: "2em" }}>
        <span className="mv-t" style={{ fontSize: "0.8em" }}>4,9 <span className="mv-star">★</span></span>
        <span className="mv-s" style={{ fontSize: "0.5em", marginLeft: "0.4em" }}>128 avis</span>
      </div>
    </>
  );
}

/* 4 — Carte de fidélité digitale */
function V4() {
  return (
    <>
      <Phone style={{ left: "8.2em", top: "1.6em", width: "15.6em", height: "23em" }}>
        <div style={{ padding: "0.9em 0.9em 0" }}>
          <div className="mv-row" style={{ justifyContent: "space-between" }}>
            <span className="mv-t" style={{ fontSize: "1em" }}>Mes cartes</span>
            <span style={{ width: "1.5em", height: "1.5em", borderRadius: "50%", background: "#ece8e5", display: "grid", placeItems: "center", fontSize: "0.8em", fontWeight: 700 }}>+</span>
          </div>
          <div style={{ marginTop: "0.8em", borderRadius: "1.1em", padding: "0.9em", color: "#fff", background: "linear-gradient(140deg,#f0595a 0%,#e94445 45%,#b52a2c 100%)", boxShadow: "0 1em 2em rgba(233,68,69,0.35)" }}>
            <div className="mv-t" style={{ fontSize: "0.95em" }}>Café Bellevue</div>
            <div style={{ fontSize: "0.5em", opacity: 0.8, marginTop: "0.15em" }}>Carte de fidélité</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.45em", marginTop: "0.9em" }}>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} style={{ aspectRatio: "1", borderRadius: "50%", background: i < 7 ? "#fff" : "transparent", border: "0.12em solid rgba(255,255,255,0.75)", display: "grid", placeItems: "center", color: "#e94445", fontSize: "0.6em", fontWeight: 900 }}>{i < 7 ? "☕" : i === 9 ? <span style={{ color: "#fff" }}>★</span> : ""}</div>
              ))}
            </div>
            <div className="mv-row" style={{ justifyContent: "space-between", marginTop: "0.8em" }}>
              <span style={{ fontSize: "0.6em", fontWeight: 800 }}>7 / 10</span>
              <span className="mv-pill" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>Offert au 10e</span>
            </div>
          </div>
          <div style={{ marginTop: "0.6em", borderRadius: "1em", height: "3.2em", background: "linear-gradient(140deg,#2a2627,#111)", padding: "0.7em" }}>
            <div style={{ fontSize: "0.6em", color: "#fff", fontWeight: 800 }}>Boulangerie du Port</div>
          </div>
        </div>
      </Phone>
      <div className="mv-card" style={{ left: "21.4em", top: "4.2em", padding: "0.5em 0.8em", borderRadius: "2em" }}>
        <span className="mv-t" style={{ fontSize: "0.62em", color: "#e94445" }}>+1 tampon</span>
      </div>
    </>
  );
}

/* 5 — QR codes pour vos supports */
function V5() {
  return (
    <>
      {/* chevalet */}
      <div className="mv-abs" style={{ left: "1.8em", top: "6em", width: "10.6em", height: "15em", background: "linear-gradient(180deg,#fff,#efebe8)", borderRadius: "0.6em", clipPath: "polygon(8% 0, 92% 0, 100% 100%, 0 100%)", boxShadow: "0 1.6em 3em rgba(0,0,0,0.5)" }}>
        <div className="mv-t" style={{ textAlign: "center", marginTop: "1.2em", fontSize: "0.7em" }}>Scannez la carte</div>
        <div style={{ width: "6.4em", height: "6.4em", margin: "0.6em auto 0" }}><QR seed={11} /></div>
        <div style={{ textAlign: "center", fontSize: "0.5em", color: "#e94445", fontWeight: 800, marginTop: "0.6em" }}>BELLEVUE</div>
      </div>
      {/* sticker vitrine */}
      <div className="mv-abs" style={{ left: "12.4em", top: "2em", width: "8.4em", height: "8.4em", borderRadius: "50%", background: "#e94445", boxShadow: "0 1.4em 2.6em rgba(0,0,0,0.5)", display: "grid", placeItems: "center" }}>
        <div style={{ width: "4.6em", height: "4.6em" }}><QR seed={5} /></div>
      </div>
      {/* sac kraft */}
      <div className="mv-abs" style={{ left: "18.6em", top: "8.6em", width: "11.2em", height: "13.4em", background: "linear-gradient(160deg,#d7b48a,#b98c5c)", borderRadius: "0.4em 0.4em 0.7em 0.7em", boxShadow: "0 1.6em 3em rgba(0,0,0,0.55)" }}>
        <div style={{ height: "1.3em", background: "repeating-linear-gradient(90deg,#c9a274 0 0.6em,#bf9667 0.6em 1.2em)", borderRadius: "0.4em 0.4em 0 0" }} />
        <div style={{ margin: "1.6em auto 0", width: "6.6em", background: "#fff", borderRadius: "0.6em", padding: "0.5em", textAlign: "center" }}>
          <div style={{ width: "5.6em", height: "5.6em" }}><QR seed={9} color="#b52a2c" /></div>
          <div className="mv-t" style={{ fontSize: "0.5em", marginTop: "0.3em" }}>Commandez en ligne</div>
        </div>
      </div>
    </>
  );
}

/* 6 — Sans application */
function V6() {
  const corner = (s: S) => <div className="mv-abs" style={{ width: "1.4em", height: "1.4em", borderColor: "#fff", borderStyle: "solid", borderWidth: 0, ...s }} />;
  return (
    <Phone status={false} style={{ left: "9.6em", top: "1.2em", width: "12.8em", height: "24em" }}>
      <div className="mv-abs" style={{ inset: 0, background: "radial-gradient(80% 60% at 50% 55%, #4a3a34, #1a1414 70%)" }} />
      <div className="mv-abs" style={{ left: "50%", top: "50%", width: "6em", height: "6em", margin: "-3em 0 0 -3em", transform: "perspective(20em) rotateX(14deg)" }}><QR seed={13} /></div>
      <div className="mv-abs" style={{ left: "50%", top: "50%", width: "8em", height: "8em", margin: "-4em 0 0 -4em" }}>
        {corner({ left: 0, top: 0, borderLeftWidth: "0.22em", borderTopWidth: "0.22em", borderTopLeftRadius: "0.6em" })}
        {corner({ right: 0, top: 0, borderRightWidth: "0.22em", borderTopWidth: "0.22em", borderTopRightRadius: "0.6em" })}
        {corner({ left: 0, bottom: 0, borderLeftWidth: "0.22em", borderBottomWidth: "0.22em", borderBottomLeftRadius: "0.6em" })}
        {corner({ right: 0, bottom: 0, borderRightWidth: "0.22em", borderBottomWidth: "0.22em", borderBottomRightRadius: "0.6em" })}
      </div>
      <div className="mv-abs" style={{ left: "0.7em", right: "0.7em", top: "2em", background: "rgba(255,255,255,0.92)", borderRadius: "0.9em", padding: "0.55em 0.7em", boxShadow: "0 0.6em 1.4em rgba(0,0,0,0.35)" }}>
        <div className="mv-row" style={{ gap: "0.5em" }}>
          <span style={{ width: "1.6em", height: "1.6em", borderRadius: "0.45em", background: "#e94445", display: "grid", placeItems: "center", color: "#fff", fontWeight: 900, fontSize: "0.7em" }}>B</span>
          <span style={{ flex: 1 }}>
            <span className="mv-t" style={{ display: "block", fontSize: "0.62em" }}>Ouvrir le menu</span>
            <span className="mv-s" style={{ fontSize: "0.48em" }}>bellevue.fr/carte</span>
          </span>
          <span style={{ fontSize: "0.7em", color: "#888" }}>›</span>
        </div>
      </div>
      <div className="mv-abs" style={{ left: "50%", bottom: "1.2em", width: "2.6em", height: "2.6em", marginLeft: "-1.3em", borderRadius: "50%", border: "0.2em solid #fff", background: "rgba(255,255,255,0.25)" }} />
    </Phone>
  );
}

/* 7 — Votre carte en ligne (grande carte) */
function V7() {
  return (
    <>
      <Phone style={{ left: "50%", top: "50%", width: "21em", height: "42em", marginLeft: "-10.5em", marginTop: "-19em" }}>
        <div style={{ fontSize: "1.45em" }}>
          <MenuScreen big />
          <div style={{ padding: "0 0.5em" }}>
            <Dish plate="mv-p1" name="Saumon rôti" desc="Purée maison, asperges" price="14,50 €" />
            <Dish plate="mv-p2" name="Salade du marché" desc="Légumes de saison, feta" price="11 €" />
            <Dish plate="mv-p3" name="Bavette grillée" desc="Frites fraîches, sauce" price="18 €" />
            <Dish plate="mv-p4" name="Tarte aux poires" desc="Crème vanille" price="7 €" />
          </div>
        </div>
      </Phone>
      <div className="mv-card" style={{ left: "50%", marginLeft: "-20em", top: "10em", padding: "0.7em 1em", borderRadius: "2em" }}>
        <span className="mv-t" style={{ fontSize: "0.8em" }}>🌿 Végétarien</span>
      </div>
      <div className="mv-card" style={{ left: "50%", marginLeft: "9.6em", top: "18em", padding: "0.8em 1em", width: "10em" }}>
        <div className="mv-s" style={{ fontSize: "0.6em" }}>Allergènes</div>
        <div className="mv-row" style={{ gap: "0.3em", marginTop: "0.4em", flexWrap: "wrap" }}>
          <span className="mv-pill mv-soft">Gluten</span>
          <span className="mv-pill mv-soft">Lait</span>
        </div>
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
        <div className="mv-z">
          <V />
        </div>
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
