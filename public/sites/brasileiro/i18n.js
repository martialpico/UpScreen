/* ============================================================
   O Brasileiro — EN / PT language switch
   The page is authored in English. Portuguese (Brazil) lives here,
   keyed by the English markup of each element, so the HTML stays clean.
   Choice is remembered per visitor; Portuguese browsers get PT first.
   ============================================================ */
(function () {
  const SEL = [
    ".nav-links a", ".mm-links a", ".btn", ".brand-tag", ".hero-eyebrow", ".hero-title .reveal-line",
    ".scroll-hint span", ".story h2", ".story p:not(.kicker):not(.open-status)", ".stat span",
    ".story-media figcaption", ".sec-head h2", ".menu-note", ".menu-hint", ".tab", ".menu-group h3",
    ".menu-group li i", ".menu-foot", ".sig-tag", ".sig-body p", ".gal-item span", ".visit h2",
    ".visit-grid h3", ".hours-day", ".visit-map-link", ".reviews-score span", ".reviews-note",
    ".review-card h3", ".review-card p", ".footer-top p", ".footer-links a", ".action-bar span"
  ].join(", ");

  const PT = {
    "Handmade Brazilian Food": "Comida brasileira artesanal",
    "Story": "História",
    "Signatures": "Destaques",
    "Menu": "Cardápio",
    "Visit": "Visite",
    "Reviews": "Avaliações",
    "Book a table": "Reservar mesa",
    "Order online": "Pedir online",
    "Call": "Ligar",
    "Order": "Pedir",
    "Bem-vindo. A little corner of Brazil, right in Brisbane City.": "Bem-vindo. Um cantinho do Brasil, bem no centro de Brisbane.",
    "A piece of Brazil,": "Um pedaço do Brasil,",
    "slow-cooked with saudade.": "cozido devagar, com saudade.",
    "Feijoada like home.": "Feijoada como a de casa.",
    "Scroll": "Role",
    "Born in Brazil. <em>Brisbane is home now.</em>": "Nascido no Brasil. <em>Brisbane agora é casa.</em>",
    "O Brasileiro started with a simple kind of homesickness: the smell of black beans simmering all morning, the crackle of <em>torresmo</em>, a café com leite that tastes like Sunday. We bottled that feeling and set it down in the middle of the city, on Adelaide Street.":
      "O Brasileiro nasceu de uma saudade simples: o cheiro do feijão cozinhando a manhã inteira, o estalo do <em>torresmo</em>, um café com leite com gosto de domingo. Guardamos esse sentimento e o trouxemos para o meio da cidade, na Adelaide Street.",
    "Everything is cooked the way our families cook it: rump cap grilled to order, farofa toasted golden, açaí blended thick and cold. No shortcuts, no fuss, just generous, honest Brazilian food from morning coffee to late-night caipirinha.":
      "Tudo é feito do jeito que nossas famílias fazem: picanha grelhada na hora, farofa dourada, açaí batido grosso e gelado. Sem atalhos, sem frescura, só comida brasileira generosa e honesta, do café da manhã à caipirinha da noite.",
    "Authentic recipes": "Receitas autênticas",
    "Coffee from": "Café desde as",
    "4.8 Google rating": "Nota 4,8 no Google",
    "Our room on Adelaide St — warm wood, green neon, fresh pastéis on the counter.": "Nosso espaço na Adelaide St: madeira, neon verde e pastéis fresquinhos no balcão.",
    "The dishes people come back for": "Os pratos que fazem a gente voltar",
    "Most loved": "Mais pedido",
    "Grilled rump cap or chicken with rice, brown beans, golden farofa, fried plantain &amp; fresh salad. The everyday Brazilian plate, done right.":
      "Picanha ou frango grelhado com arroz, feijão carioca, farofa dourada, banana frita e salada fresca. O prato feito de todo dia, do jeito certo.",
    "Shredded chicken &amp; cream cheese in golden fried dough.": "Frango desfiado com requeijão numa massa dourada e crocante.",
    "Thick açaí, fresh fruit, granola &amp; honey. (DF, VG)": "Açaí grosso, frutas frescas, granola e mel. (sem lactose, vegano)",
    "The full menu": "O cardápio completo",
    "Served fresh on Adelaide St. Please advise staff of any allergies · 15% surcharge on public holidays.": "Feito na hora na Adelaide St. Avise a equipe sobre alergias · taxa de 15% nos feriados.",
    "Breakfast &amp; Snacks": "Café da manhã &amp; Salgados",
    "PF &amp; Mains": "PF &amp; Pratos",
    "Sharing &amp; Sides": "Para dividir &amp; Acompanhamentos",
    "Drinks": "Bebidas",
    "Sweets": "Doces",
    "Tap a dish to see it up close.": "Toque num prato para vê-lo de perto.",
    "Breakfast <span>until 11am</span>": "Café da manhã <span>até 11h</span>",
    "Brazilian bread roll or sourdough with butter. Add spread +$1": "Pão francês ou de fermentação natural com manteiga. Outra cobertura +$1",
    "Brazilian roll, ham &amp; cheese. Veg option with requeijão": "Pão francês, presunto e queijo. Opção vegetariana com requeijão",
    "Brazilian roll with mortadella &amp; cheese": "Pão francês com mortadela e queijo",
    "Roll with 2 eggs your way. Add bacon &amp; cheese +$6": "Pão com 2 ovos do seu jeito. Bacon e queijo +$6",
    "Sourdough, smashed avo, 2 eggs &amp; requeijão (V)": "Pão de fermentação natural, abacate amassado, 2 ovos e requeijão (V)",
    "2 eggs, bacon, mushroom with onions &amp; avocado": "2 ovos, bacon, cogumelos com cebola e abacate",
    "2 eggs, ham, halloumi, requeijão &amp; 2 cheese breads": "2 ovos, presunto, halloumi, requeijão e 2 pães de queijo",
    "Snacks <span>all day</span>": "Salgados <span>o dia todo</span>",
    "Shredded chicken &amp; cream cheese, fried": "Frango desfiado com requeijão, frita",
    "Jerk beef &amp; cream cheese, fried": "Carne seca com requeijão, frita",
    "Mozzarella, cream cheese &amp; oregano, fried (V)": "Muçarela, requeijão e orégano, frita (V)",
    "Brazilian cheese bread (GF)": "Pão de queijo mineiro (sem glúten)",
    "Açaí, banana &amp; berries, topped with fruit, granola &amp; honey (DF, VG)": "Açaí batido com banana e frutas vermelhas, com frutas, granola e mel (sem lactose, vegano)",
    "Blended with banana &amp; berries (DF)": "Batido com banana e frutas vermelhas (sem lactose)",
    "Main dishes <span>PF · prato feito</span>": "Pratos principais <span>PF · prato feito</span>",
    "Rump cap or chicken, rice, brown beans, chips, farofa &amp; salad": "Picanha ou frango, arroz, feijão carioca, batata frita, farofa e salada",
    "Black beans with pork, bacon, ribs, jerk beef &amp; chorizo, rice, kale, crispy pork belly &amp; vinagrete": "Feijão preto com carne de porco, bacon, costela, carne seca e linguiça, arroz, couve, torresmo e vinagrete",
    "Brown beans with chorizo, bacon, eggs &amp; farofa, rice, cassava croquette &amp; kale. Veg/Vegan option": "Feijão carioca com linguiça, bacon, ovos e farofa, arroz, bolinho de mandioca e couve. Opção vegetariana/vegana",
    "Cream of cassava filled with jerk beef, chicken or palm heart, rice, beans, farofa &amp; salad": "Creme de mandioca recheado com carne seca, frango ou palmito, arroz, feijão, farofa e salada",
    "Rump cap &amp; your way": "Picanha &amp; do seu jeito",
    "Rump cap or chicken with fried onions &amp; all the sides": "Picanha ou frango acebolado com todos os acompanhamentos",
    "Topped with garlic, rice, beans, chips, farofa &amp; salad": "Ao alho, com arroz, feijão, batata frita, farofa e salada",
    "Topped with four-cheese sauce": "Com molho quatro queijos",
    "Choose 1 protein + 2 sides. Extra side $1.50": "Escolha 1 proteína + 2 acompanhamentos. Acompanhamento extra $1.50",
    "Palm heart, mushroom with onions or halloumi": "Palmito, cogumelos acebolados ou halloumi",
    "Rump cap or chicken, rice, beans, chips &amp; farofa (up to 10 yo)": "Picanha ou frango, arroz, feijão, batata frita e farofa (até 10 anos)",
    "Sharing <span>dinner · for the table</span>": "Para dividir <span>jantar · para a mesa</span>",
    "Rump cap, 4 cheese, bread roll &amp; chips. Veg option available": "Picanha, quatro queijos, pão e batata frita. Opção vegetariana",
    "With bread roll &amp; chips": "Com pão e batata frita",
    "With fried onions, bread roll &amp; chips": "Com cebola frita, pão e batata frita",
    "With aioli. Add 4 cheese +$5": "Com aioli. Quatro queijos +$5",
    "With green mayo": "Com maionese verde",
    "With guava jam": "Com goiabada",
    "Sides": "Acompanhamentos",
    "each": "cada",
    "Cocktail &amp; cold": "Drinque &amp; gelados",
    "Cachaça, sugar &amp; lime. The Brazilian national cocktail": "Cachaça, açúcar e limão. O drinque nacional do Brasil",
    "house-made iced tea": "chá gelado da casa",
    "Beer, cider &amp; wine": "Cerveja, sidra &amp; vinho",
    "glass / bottle": "taça / garrafa",
    "Coffee &amp; juices": "Café &amp; sucos",
    "Sweets <span>doces</span>": "Doces <span>sobremesas</span>",
    "Silky cream caramel pudim (GF)": "Pudim de leite cremoso (sem glúten)",
    "Sweet ball of condensed milk &amp; cocoa (GF)": "Docinho de leite condensado e chocolate (sem glúten)",
    "More desserts on the front display, just ask our team.": "Mais doces na vitrine, é só perguntar à equipe.",
    "Our room": "Nosso espaço",
    "Fresh on the counter": "Fresquinho no balcão",
    "Find us in the city": "Encontre a gente no centro",
    "Hours": "Horários",
    "Mon–Thu": "Seg–Qui",
    "Fri": "Sex",
    "Sat": "Sáb",
    "Sun": "Dom",
    "Where": "Onde",
    "Order on Uber Eats": "Pedir no Uber Eats",
    "Get directions": "Como chegar",
    "Open in Google Maps ↗": "Abrir no Google Maps ↗",
    "Loved by Brisbane": "Brisbane aprova",
    "<strong>4.8</strong> out of 5 on Google": "<strong>4,8</strong> de 5 no Google",
    "What guests mention most in their reviews:": "O que os clientes mais citam nas avaliações:",
    "Generous Brazilian plates": "Pratos brasileiros generosos",
    "PF plates and feijoada served the way they are at home: big portions, slow-cooked, nothing held back.": "PF e feijoada servidos como em casa: porções fartas, cozimento lento, sem economia.",
    "Friendly, quick service": "Atendimento simpático e rápido",
    "A warm team that knows its regulars and gets you fed on a CBD lunch break.": "Uma equipe acolhedora que conhece os clientes da casa e serve rapidinho na hora do almoço.",
    "Worth arriving early": "Vale chegar cedo",
    "Lunch fills up fast. Come a little before midday, or book a table for Friday and Saturday dinner.": "O almoço enche rápido. Chegue um pouco antes do meio-dia ou reserve uma mesa para o jantar de sexta e sábado.",
    "Read all reviews on Google ↗": "Ler todas as avaliações no Google ↗",
    "A piece of Brazil in the heart of Brisbane.": "Um pedaço do Brasil no coração de Brisbane.",
    "Call us": "Ligue para nós"
  };

  // Short UI strings used by scripts (aria-labels, live status)
  const UI = {
    en: {
      title: "O Brasileiro — A Taste of Brazil in Brisbane",
      openMenu: "Open menu", closeMenu: "Close menu", close: "Close",
      open: "Open now · until {t}", soon: "Closing soon · {t}",
      opensToday: "Closed · opens {t}", opensTomorrow: "Closed · opens tomorrow {t}", opensDay: "Closed · opens {d} {t}",
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    pt: {
      title: "O Brasileiro — Um pedaço do Brasil em Brisbane",
      openMenu: "Abrir menu", closeMenu: "Fechar menu", close: "Fechar",
      open: "Aberto agora · até {t}", soon: "Fecha em breve · {t}",
      opensToday: "Fechado · abre às {t}", opensTomorrow: "Fechado · abre amanhã às {t}", opensDay: "Fechado · abre {d} às {t}",
      days: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"]
    }
  };

  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const nodes = [...document.querySelectorAll(SEL)].filter((el) => !el.closest(".open-status"));
  nodes.forEach((el) => { el.dataset.en = el.innerHTML; });

  let lang = "en";
  function apply(next) {
    lang = next === "pt" ? "pt" : "en";
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    nodes.forEach((el) => {
      const en = el.dataset.en;
      el.innerHTML = lang === "pt" ? (PT[norm(en)] || en) : en;
    });
    document.title = UI[lang].title;
    document.querySelectorAll(".lang-btn").forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    try { localStorage.setItem("ob-lang", lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("ob:langchange", { detail: { lang } }));
  }

  let saved = null;
  try { saved = localStorage.getItem("ob-lang"); } catch (e) {}
  const initial = saved || ((navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "en");

  window.OB_I18N = {
    get lang() { return lang; },
    t: (key) => UI[lang][key],
    set: apply,
    missing: () => nodes.map((el) => norm(el.dataset.en)).filter((k) => !PT[k])
  };

  document.querySelectorAll(".lang-btn").forEach((b) => b.addEventListener("click", () => apply(b.dataset.lang)));
  if (initial !== "en") apply(initial);
})();
