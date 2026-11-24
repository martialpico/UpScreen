import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  LiquidGlassButton,
  LiquidGlassToolbar,
  LiquidGlassToolbarItem,
  liquidGlassClass,
} from "@/components/goodui/liquid-glass-button";
import upscreenLogo from "./imports/upscreen-logo-reversed.svg";
import upscreenIcon from "./imports/upscreen-icon.svg";
import upscreenLogoDark from "./imports/upscreen-logo-dark.svg";

// Fond blanc par défaut ; ?fond=noir affiche l'ancienne version sombre.
const lightTheme =
  typeof window === "undefined" || new URLSearchParams(window.location.search).get("fond") !== "noir";
const siteLogo = lightTheme ? upscreenLogoDark : upscreenLogo;
import cafePhoto from "./imports/cafe-espresso.webp";
import motionWise from "./imports/motion-wise.mp4";
import motionAirbnb from "./imports/motion-airbnb.mp4";
import motionAnyStyle from "./imports/motion-anystyle.mp4";
import motionNotion from "./imports/motion-notion.mp4";
import motionWisePoster from "./imports/motion-wise-poster.webp";
import motionAirbnbPoster from "./imports/motion-airbnb-poster.webp";
import motionAnyStylePoster from "./imports/motion-anystyle-poster.webp";
import motionNotionPoster from "./imports/motion-notion-poster.webp";
import googleLogo from "./imports/google-logo.webp";

// Les offres de site (paiement unique) et le sur-mesure. Prix en euros, TVA non applicable.
type SiteOffer = {
  title: string;
  subtitle: string;
  price?: string;
  delay?: string;
  chip: string;
  featured?: boolean;
  cta: string;
  href?: string;
  // Une ligne simple, ou [intitulé, détail] pour une ligne dépliable.
  features: (string | [string, string])[];
};

const siteOffers: SiteOffer[] = [
  {
    title: "Essentiel",
    subtitle: "Pour être en ligne rapidement.",
    price: "890",
    delay: "En ligne sous 7 jours",
    chip: "7 jours",
    cta: "Choisir Essentiel",
    features: [
      "Création de votre site de zéro",
      "Site d'une page, adapté au mobile et à la tablette",
      [
        "Liaison avec votre outil de prise de rendez-vous",
        "Votre numéro de téléphone en un clic, ou un formulaire de contact pour réserver.",
      ],
      ["Avis clients et témoignages Google", "Vos avis Google affichés directement sur votre site."],
      ["SEO de base", "Référencement des balises et des textes de votre site pour Google."],
      "Nom de domaine et hébergement inclus la 1re année",
    ],
  },
  {
    title: "Complet",
    subtitle: "Pour être trouvé et choisi.",
    price: "1 490",
    delay: "En ligne sous 14 jours",
    chip: "14 jours",
    featured: true,
    cta: "Choisir Complet",
    features: [
      "Tout ce que comprend l'Essentiel",
      "Site multipage",
      [
        "Création de zéro ou refonte de votre site actuel",
        "Pour une refonte, on repart de votre site actuel et de son référencement.",
      ],
      ["Fiche Google créée ou refaite", "Horaires, catégorie d'activité et photos fournies par vous."],
      [
        "Liens possibles vers Instagram et Facebook",
        "Si vous en avez, on connecte votre Instagram et votre Facebook pour afficher vos derniers posts sur le site.",
      ],
    ],
  },
  {
    title: "Sur mesure",
    subtitle: "Pour aller plus loin.",
    delay: "Devis gratuit sous 48 h",
    chip: "Devis 48 h",
    cta: "Voir les options sur mesure",
    href: "#sur-mesure",
    features: [
      "Menu digital & QR codes",
      "Web app sur mesure",
      "Vidéo de présentation en motion design",
      "Refonte graphique complète : logo, charte, supports",
    ],
  },
];

// Abonnements mensuels, présentés en tableau comparatif.
type PlanCell = true | false | string;
const subscriptions = [
  { name: "Visibilité", price: "99", engagement: "Aucun" },
  { name: "Premium", price: "249", engagement: "Aucun", featured: true },
] as const;

// Une ligne simple, ou [intitulé, détail] pour une ligne dépliable.
const subscriptionRows: [string | [string, string], PlanCell, PlanCell][] = [
  [
    ["Fiche Google active", "Posts réguliers et réponse à chaque avis : votre fiche remonte sur Google et Maps."],
    true,
    true,
  ],
  [
    ["SEO renforcé et référencement", "Textes, mots-clés et vitesse optimisés chaque mois, y compris pour les IA (ChatGPT, Claude, Gemini)."],
    true,
    true,
  ],
  [
    ["Petites modifications, mises à jour et sauvegardes", "Un horaire, un plat, une photo à changer : c'est fait rapidement. Site sauvegardé et sécurisé."],
    true,
    true,
  ],
  [
    ["Articles de blog", "Chaque article est une nouvelle porte d'entrée sur Google pour vous trouver."],
    "1 par mois",
    "1 par semaine",
  ],
  [
    ["Instagram", "Des posts soignés créés à partir de vos photos, pour un compte actif qui donne envie de venir."],
    false,
    "2 posts par semaine, à partir de vos photos et vidéos",
  ],
  [
    ["Légendes et programmation des posts", "On écrit les textes et on publie aux meilleurs horaires, vous n'avez rien à faire."],
    false,
    true,
  ],
];

const hostingRenewal = "49";

// Vrais avis clients, publiés avec leur accord. lang "EN" = avis écrit en
// anglais, affiché traduit avec la mention « Traduit de l'anglais ». "person" est facultatif (prénom et rôle). Ajouter placeholder: true
// affiche un badge « Exemple » sur un avis en attente.
type Review = {
  lang: "EN" | "FR";
  quote: string;
  business: string;
  person?: string;
  placeholder?: boolean;
};

const reviews: Review[] = [
  {
    lang: "FR",
    quote:
      "Depuis qu'on travaille avec eux, on a vraiment vu une différence. On reçoit beaucoup plus de demandes de clients et notre visibilité sur les réseaux sociaux a complètement changé.",
    business: "Maison Laurent",
  },
  {
    lang: "EN",
    quote:
      "Avant, on avait du mal à développer notre présence en ligne. Aujourd'hui, on touche un public bien plus large et on voit de vrais résultats pour notre activité.",
    business: "The Modern Studio",
  },
  {
    lang: "FR",
    quote:
      "Une équipe très professionnelle, à l'écoute et surtout réactive. Ils ont rapidement compris nos besoins et mis en place une stratégie adaptée à notre activité.",
    business: "Le Bistrot du Marché",
  },
  {
    lang: "EN",
    quote:
      "Quentin est toujours disponible et très attentif à nos besoins. Réactif, facile à joindre, il prend vraiment le temps de comprendre notre projet et de nous accompagner du début à la fin.",
    business: "Martial Production",
  },
];

// Le parcours du site, du premier message à la mise en ligne.
const processSteps = [
  {
    title: "Appel découverte",
    body: "Un appel gratuit de 20 minutes, sur WhatsApp ou par téléphone, pour comprendre votre entreprise, vos clients et vos objectifs.",
    highlights: ["appel gratuit"],
    side: "left",
  },
  {
    title: "Maquette gratuite",
    body: "Nous concevons une maquette de votre futur site, sans frais. Vous ne continuez que si elle vous plaît.",
    highlights: ["sans frais"],
    side: "right",
  },
  {
    title: "On construit",
    body: "Nous créons votre site et rédigeons tous les textes. Rapide, pensé pour le mobile et relié à votre prise de rendez-vous.",
    highlights: ["rédigeons tous les textes"],
    side: "left",
  },
  {
    title: "Mise en ligne",
    body: "Votre site est en ligne sous 7 à 14 jours, prêt à vous apporter des appels et des réservations.",
    highlights: ["sous 7 à 14 jours"],
    side: "right",
  },
];

const processIcons: Record<string, BrandIconName> = {
  "Appel découverte": "chat",
  "Maquette gratuite": "mockup",
  "On construit": "build",
  "Google & SEO": "seo",
  "Mise en ligne": "launch",
};

const faqs = [
  {
    question: "Que proposez-vous exactement ?",
    answer:
      "Nous créons des sites pour les commerces et les artisans, reliés à votre prise de rendez-vous, à vos avis et à votre fiche Google. Ensuite, nos abonnements Visibilité et Premium font vivre votre présence en ligne chaque mois.",
  },
  {
    question: "Combien de temps faut-il ?",
    answer:
      "7 jours pour l'offre Essentiel et 14 jours pour l'offre Complet, à partir du moment où nous recevons votre logo, vos photos et vos informations clés.",
  },
  {
    question: "Puis-je personnaliser mon projet ?",
    answer:
      "Bien sûr. Chaque site est conçu sur mesure pour votre entreprise. Vous voyez d'abord une maquette gratuite, et deux séries de modifications sont incluses.",
  },
  {
    question: "Pouvez-vous relier mes réseaux sociaux à mon site ?",
    answer:
      "Oui. Nous ajoutons les liens vers votre Instagram et votre Facebook, et nous pouvons afficher vos derniers posts directement sur votre page.",
  },
  {
    question: "Comment fonctionnent l'hébergement et les abonnements ?",
    answer:
      "Le nom de domaine et l'hébergement sont inclus la 1re année, puis facturés 49 €/an. Les abonnements sont en option : Visibilité à 99 €/mois et Premium à 249 €/mois, tous les deux sans engagement. Votre site et votre nom de domaine vous appartiennent : si vous arrêtez, le transfert est gratuit.",
  },
  {
    question: "Proposez-vous d'autres services ?",
    answer:
      "Oui, sur devis : rebranding complet (logo, charte graphique, UI/UX), vidéo de présentation en motion design, et des outils pour votre commerce : menu digital et QR codes, carte de fidélité, devis et factures, gestion des stocks.",
  },
  {
    question: "Où êtes-vous basés ?",
    answer:
      "À Toulouse. On travaille avec les commerces et artisans de Toulouse et des alentours. Tout peut aussi se faire à distance : un appel, quelques messages WhatsApp, et on s'occupe du reste.",
  },
  {
    question: "Comment vous contacter ?",
    answer:
      "Le plus simple : écrivez-nous sur WhatsApp au 06 21 32 65 40, en cliquant sur « Nous contacter » en haut du site. Vous pouvez aussi laisser vos coordonnées dans le formulaire en bas de page, ou écrire à upscreenweb@gmail.com : on vous rappelle pour un appel découverte gratuit de 20 minutes.",
  },
];

// Système visuel commun : cartes arrondies à 20 px, médias à 24 px, boutons en
// pilule, mêmes marges verticales pour toutes les sections.
const sectionY = "py-12 md:py-16";
const darkCard = "rounded-[20px] border border-white/[0.08] bg-graphite";
const lightCard =
  "rounded-[20px] border border-onyx/[0.08] bg-white shadow-[0_14px_40px_rgba(10,10,11,0.06)]";

function SectionLead({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={`mx-auto mt-4 max-w-[600px] text-center text-[17px] font-normal leading-[1.6] ${
        tone === "light" ? "text-onyx/60" : "text-warm-gray"
      }`}
    >
      {children}
    </p>
  );
}

// Étiquette de section : texte mono rouge, espacé, en capitales.
function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <div className={center ? "mb-7 flex justify-center" : "flex"}>
      <span className="inline-flex items-center gap-2 rounded-full bg-off-white px-4 py-2 font-mono text-[12px] font-semibold uppercase leading-none tracking-[0.18em] text-onyx">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand shadow-none" />
        {children}
      </span>
    </div>
  );
}

// En-tête de section : étiquette, titre sur deux lignes (blanc puis gris),
// et à droite une phrase d'introduction, des pastilles ou un lien.
function SectionHeader({
  eyebrow,
  title,
  muted,
  aside,
  lead,
  small = false,
  framed = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  muted?: string;
  aside?: ReactNode;
  lead?: ReactNode;
  small?: boolean;
  framed?: boolean;
}) {
  return (
    <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
      {eyebrow && (
        <div className="scroll-reveal reveal-pop">
          <Eyebrow center>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={`${framed ? "scroll-reveal title-frame relative my-6 px-7 md:my-8 md:px-0" : ""} text-balance font-extrabold tracking-[-0.055em] ${
          small ? "text-[32px] leading-[1.02] md:text-[44px]" : "text-[40px] leading-[0.98] md:text-[56px] lg:text-[60px]"
        }`}
      >
        {framed && (
          <>
            <span aria-hidden="true" className="frame-line frame-top" />
            <span aria-hidden="true" className="frame-line frame-right" />
            <span aria-hidden="true" className="frame-line frame-bottom" />
            <span aria-hidden="true" className="frame-line frame-left" />
            <span aria-hidden="true" className="frame-corner frame-tl" />
            <span aria-hidden="true" className="frame-corner frame-tr" />
            <span aria-hidden="true" className="frame-corner frame-br" />
            <span aria-hidden="true" className="frame-corner frame-bl" />
          </>
        )}
        <span className="scroll-reveal reveal-mask block"><span className="reveal-line block text-off-white">{title}</span></span>
        {muted && (
          <span className="scroll-reveal reveal-mask block">
            <span className="reveal-line block text-[#7d7b80]" style={{ transitionDelay: "120ms" }}>{muted}</span>
          </span>
        )}
      </h2>
      {lead && <p style={{ transitionDelay: "240ms" }} className="scroll-reveal mt-5 max-w-[640px] font-mono text-[14px] font-semibold leading-[1.7] tracking-[-0.01em] text-[#CFCCC7] md:text-[15px]">{lead}</p>}
      {aside && <div className="mt-5 max-w-[640px]">{aside}</div>}
    </div>
  );
}

function AsideLead({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[14px] font-semibold leading-[1.7] tracking-[-0.01em] text-[#CFCCC7] md:text-[15px]">{children}</p>;
}

function CheckChips({ items }: { items: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap justify-center gap-2.5">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-medium text-off-white"
        >
          <CheckIcon className="h-3.5 w-3.5 text-brand" />
          {item}
        </span>
      ))}
    </div>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function ClockIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3l2 1.5" />
    </svg>
  );
}

// Titres de section. L'italique rouge est réservé au hero et au titre de
// contact : ici, il ne s'applique que si on le demande (emphasize > 0).
function Heading({
  children,
  emphasize = 0,
  tone = "dark",
  eyebrow,
}: {
  children: string;
  emphasize?: number;
  tone?: "dark" | "light";
  eyebrow?: string;
}) {
  const words = children.trim().split(" ");
  const emphasizedWords =
    emphasize > 0 && words.length > 1 ? words.splice(-emphasize).join(" ") : null;

  return (
    <>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2
      className={`font-ui mx-auto max-w-[900px] text-balance text-center text-[36px] font-extrabold leading-[1.04] tracking-[-0.045em] md:text-[56px] ${
        tone === "light" ? "text-onyx" : "text-off-white"
      }`}
    >
      {emphasizedWords ? `${words.join(" ")} ` : children}
      {emphasizedWords && (
        <em className="text-gradient-brand not-italic">
          {emphasizedWords}
        </em>
      )}
    </h2>
    </>
  );
}

// Numéro WhatsApp au format international, sans « + » ni espaces
// (ex. 33612345678 pour le 06 12 34 56 78). Tant qu'il est vide, les boutons
// WhatsApp n'apparaissent pas.
const whatsappNumber = "33621326540";
const whatsappDisplay = "06 21 32 65 40";
const whatsappLink = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Bonjour UpScreen ! J'aimerais prendre rendez-vous pour un appel découverte.",
    )}`
  : "";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 3.25a8.25 8.25 0 0 0-7.08 12.48L4 20l4.38-1.14A8.25 8.25 0 1 0 12 3.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.4 8.1c.2-.45.42-.46.72-.47h.37c.12 0 .3.05.46.4.15.36.54 1.3.59 1.4.05.09.08.2.01.32-.06.13-.1.2-.2.3-.1.12-.21.25-.3.34-.1.1-.2.21-.08.42.12.2.52.86 1.13 1.39.77.69 1.43.9 1.63 1 .2.1.32.08.44-.05.12-.14.5-.59.64-.79.13-.2.26-.16.45-.1.18.07 1.16.55 1.36.65.2.1.33.15.38.23.05.08.05.48-.11.94-.17.46-.97.88-1.34.93-.35.06-.8.08-1.3-.08-.3-.1-.7-.23-1.2-.45-.53-.23-2.31-.85-3.94-2.97-.46-.6-.97-1.34-.97-2.16 0-.82.43-1.22.58-1.39Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const links: [string, string][] = [
    ["Réalisations", "work"],
    ["Tarifs", "pricing"],
    ["Sur mesure", "sur-mesure"],
    ["Méthode", "process"],
    ["FAQ", "faq"],
  ];

  // Section visible au milieu de l'écran : la loupe du menu la suit.
  useEffect(() => {
    const sections = links
      .map(([, id]) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    const onTop = () => window.scrollY < 300 && setActive("");
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`${liquidGlassClass("dark")} relative mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-3 !rounded-[22px] px-3 sm:h-[78px] sm:px-5`}
        onPointerMove={(event) => {
          const el = event.currentTarget;
          const rect = el.getBoundingClientRect();
          el.style.setProperty("--lg-x", `${event.clientX - rect.left}px`);
          el.style.setProperty("--lg-y", `${event.clientY - rect.top}px`);
        }}
      >
        <a
          href="#home"
          aria-label="Accueil UpScreen"
          onClick={() => setMenuOpen(false)}
          className="relative z-[2] flex shrink-0 items-center px-1 sm:px-2"
        >
          <img src={siteLogo} alt="UpScreen" className="block h-auto w-[112px] min-[400px]:w-[132px] sm:w-[156px]" />
        </a>

        <nav className="relative z-[2] hidden xl:block" aria-label="Navigation principale">
        <LiquidGlassToolbar
          tone="dark"
          value={active}
          onValueChange={goTo}
          aria-label="Sections du site"
          className="!bg-white/[0.04] !shadow-none [&>button]:h-11 [&>button]:px-5 [&>button]:text-[15px]"
        >
          {links.map(([label, id]) => (
            <LiquidGlassToolbarItem key={id} value={id}>
              {label}
            </LiquidGlassToolbarItem>
          ))}
        </LiquidGlassToolbar>
        </nav>

        <div className="relative z-[2] flex items-center gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Nous contacter sur WhatsApp au ${whatsappDisplay}`}
            className="inline-flex h-11 items-center whitespace-nowrap rounded-[14px] bg-brand px-3.5 text-[15px] font-extrabold tabular-nums tracking-[-0.01em] text-white md:hidden"
          >
            {whatsappDisplay}
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Nous contacter sur WhatsApp au ${whatsappDisplay}`}
            className="hidden h-12 flex-col items-center justify-center whitespace-nowrap rounded-[14px] bg-brand px-5 leading-none text-white transition hover:-translate-y-0.5 hover:bg-[#d93a3b] md:inline-flex"
          >
            <span className="text-[12px] font-semibold text-[rgba(255,255,255,0.88)]">Nous contacter</span>
            <span className="mt-1 text-[16px] font-extrabold tabular-nums tracking-[-0.01em]">{whatsappDisplay}</span>
          </a>
          <a
            href="#contact-form"
            className="hidden h-12 items-center gap-2 whitespace-nowrap rounded-[14px] bg-[#0e0d10] px-5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(14,13,16,0.25)] transition hover:-translate-y-0.5 hover:bg-[#26242a] sm:inline-flex"
          >
            Être rappelé <ArrowIcon />
          </a>
          <LiquidGlassButton
            tone="dark"
            size="icon"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className="!h-11 !w-11 !rounded-[14px] xl:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </LiquidGlassButton>
        </div>

        <div
          className={`absolute left-0 right-0 top-[76px] rounded-[22px] border border-white/10 bg-[#141315] p-2 shadow-[0_30px_70px_rgba(0,0,0,0.6)] transition-all duration-300 xl:hidden ${
            menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="relative z-[2]">
            {links.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(id);
                }}
                tabIndex={menuOpen ? 0 : -1}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-semibold transition-colors hover:bg-white/[0.06] ${
                  active === id ? "bg-white/[0.08] text-off-white" : "text-off-white/80"
                }`}
              >
                {label}
                <ArrowIcon className="h-4 w-4 text-brand" />
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={menuOpen ? 0 : -1}
                className="flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white"
              >
                <span className="flex flex-col items-center leading-none">
                  <span className="text-[12px] font-semibold text-[rgba(255,255,255,0.88)]">Nous contacter</span>
                  <span className="mt-1 text-[15px] font-extrabold tabular-nums">{whatsappDisplay}</span>
                </span>
              </a>
              <a
                href="#contact-form"
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                className="flex items-center justify-center gap-2 rounded-full bg-[#0e0d10] px-4 py-3.5 text-sm font-semibold text-white"
              >
                Être rappelé <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Rend une maquette à sa taille de design, puis la met à l'échelle de son
// conteneur d'un seul bloc : rien ne se tasse ni ne passe à la ligne.
function ScaledFrame({
  width,
  height,
  children,
  className = "",
}: {
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => setScale(frame.clientWidth / width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={frameRef} className={`relative w-full ${className}`} style={{ height: height * scale }}>
      <div
        className="absolute left-0 top-0"
        style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}

function BrowserBar({ url, className = "" }: { url: string; className?: string }) {
  return (
    <div className={`flex h-[26px] items-center gap-1.5 border-b border-black/5 px-3 ${className}`}>
      <span className="h-[7px] w-[7px] rounded-full bg-black/15" />
      <span className="h-[7px] w-[7px] rounded-full bg-black/15" />
      <span className="h-[7px] w-[7px] rounded-full bg-black/15" />
      <span className="ml-3 flex items-center gap-1 rounded-md bg-white/80 px-2 py-[3px] text-[8px] font-semibold text-black/50">
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
          <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
        </svg>
        {url}
      </span>
    </div>
  );
}

// Le site du café Le Comptoir Rose, sur ordinateur et sur téléphone : ce que
// le visiteur achète, montré dès le premier écran.
function CafeShowcase() {
  const brown = "#3B2A20";
  const cream = "#F7F1E8";
  const rust = "#B5482F";
  const menu = [
    ["Espresso", "Pure origine Colombie", "2,20 €"],
    ["Flat white", "Lait entier ou avoine", "4,50 €"],
    ["Brunch du dimanche", "Sur réservation", "19 €"],
  ];

  return (
    <div aria-hidden="true" className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[48px] bg-[radial-gradient(ellipse_at_center,rgba(233,68,69,0.18),transparent_70%)] blur-2xl" />
      <ScaledFrame width={620} height={450}>
        <div
          className="absolute left-0 top-2 w-[540px] overflow-hidden rounded-[16px] shadow-[0_40px_90px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
          style={{ background: cream, color: brown }}
        >
          <BrowserBar url="lecomptoirrose.fr" className="bg-[#EDE5DA]" />
          <div className="relative h-[214px]">
            <img src={cafePhoto} alt="" className="absolute inset-0 h-full w-full object-cover object-[60%_45%]" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#24170F]/90 via-[#24170F]/55 to-transparent" />
            <div className="relative flex items-center px-6 pt-4">
              <p className="font-display text-[15px] leading-none" style={{ color: cream }}>
                Le Comptoir Rose
              </p>
              <div className="ml-auto flex items-center gap-3 text-[9.5px] font-semibold" style={{ color: `${cream}cc` }}>
                <span>Carte</span>
                <span>À propos</span>
                <span className="rounded-full px-2.5 py-1" style={{ background: cream, color: brown }}>
                  Réserver
                </span>
              </div>
            </div>
            <div className="relative mt-6 max-w-[300px] px-6">
              <p className="font-display text-[30px] leading-[1.02]" style={{ color: cream }}>
                Le café qui donne envie de se lever.
              </p>
              <p className="mt-2 text-[10.5px] leading-[1.45]" style={{ color: `${cream}cc` }}>
                Café de spécialité et brunch, au cœur de Toulouse.
              </p>
              <div className="mt-3 flex gap-2 text-[9.5px] font-bold">
                <span className="rounded-full px-3 py-1.5 text-white" style={{ background: rust }}>
                  Voir la carte
                </span>
                <span className="rounded-full border px-3 py-1.5" style={{ borderColor: `${cream}80`, color: cream }}>
                  Itinéraire
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 py-2.5 text-[9.5px] font-semibold" style={{ color: `${brown}b3` }}>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1DAA61]" />
              Ouvert aujourd'hui · 7 h 30 – 16 h
            </span>
            <span>
              <span className="text-[#FBBC04]">★</span> 4,9 sur Google · 48 avis
            </span>
          </div>
          <div className="px-6 pb-5">
            <p className="font-display text-[15px]">Nos incontournables</p>
            <div className="mt-2 grid grid-cols-3 gap-2.5">
              {menu.map(([name, detail, price]) => (
                <div key={name} className="rounded-lg bg-white p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <p className="text-[10px] font-bold">{name}</p>
                  <p className="mt-0.5 text-[8px]" style={{ color: `${brown}99` }}>
                    {detail}
                  </p>
                  <p className="mt-1.5 text-[10px] font-bold" style={{ color: rust }}>
                    {price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-[112px] h-[326px] w-[176px] rounded-[30px] bg-[#0A0A0B] p-[7px] shadow-[0_30px_70px_rgba(0,0,0,0.6)] ring-1 ring-white/15">
          <div className="relative h-full overflow-hidden rounded-[24px]" style={{ background: cream, color: brown }}>
            <div className="relative h-[128px]">
              <img src={cafePhoto} alt="" className="absolute inset-0 h-full w-full object-cover object-[40%_45%]" />
              <span className="absolute inset-0 bg-gradient-to-b from-[#24170F]/60 to-transparent" />
              <p className="relative px-3 pt-3 font-display text-[11px]" style={{ color: cream }}>
                Le Comptoir Rose
              </p>
            </div>
            <div className="px-3 pt-3">
              <p className="font-display text-[17px] leading-[1.05]">Le café qui donne envie de se lever.</p>
              <p className="mt-1.5 text-[8px] leading-[1.4]" style={{ color: `${brown}99` }}>
                Café de spécialité et brunch, au cœur de Toulouse.
              </p>
              <span className="mt-3 block rounded-full py-2 text-center text-[9.5px] font-bold text-white" style={{ background: rust }}>
                Réserver une table
              </span>
              <p className="mt-2 text-center text-[8px] font-semibold" style={{ color: `${brown}99` }}>
                <span className="text-[#FBBC04]">★</span> 4,9 · Ouvert jusqu'à 16 h
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 border-t border-black/5 bg-white text-center text-[8.5px] font-bold">
              <span className="py-2.5">Appeler</span>
              <span className="border-l border-black/5 py-2.5">Itinéraire</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-6 flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-onyx shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
          <img src={googleLogo} alt="" className="h-3.5" />
          <span className="leading-tight">
            <span className="block text-[11px] font-bold">N°1 près de vous</span>
            <span className="block text-[9px] text-onyx/55">
              <span className="text-[#FBBC04]">★★★★★</span> 4,9 · 48 avis
            </span>
          </span>
        </div>
      </ScaledFrame>
    </div>
  );
}

// Titre centré, boutons, puis la vidéo de présentation en grand dessous.
function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto w-full max-w-[1040px] scroll-mt-24 px-5 pb-10 pt-32 sm:px-8 md:pt-40 lg:pb-12"
    >
      <Eyebrow center>Agence web</Eyebrow>
      <h1 className="font-ui mx-auto text-center text-[40px] font-extrabold leading-[1.02] tracking-[-0.05em] text-off-white sm:text-[46px] md:text-[48px] lg:text-[64px]">
        <span className="block">Vos clients vous cherchent.</span>
        <span className="text-gradient-brand block text-balance md:whitespace-nowrap">
          Encore <span className="whitespace-nowrap">faut-il</span> qu’ils vous trouvent.
        </span>
      </h1>
      <p className="mx-auto mt-8 text-center font-mono text-[15px] font-semibold leading-[1.6] tracking-[-0.01em] text-off-white sm:text-[18px]">
        <span className="whitespace-nowrap">Sites web & visibilité locale</span>
        <span aria-hidden="true" className="mx-3 hidden text-brand sm:inline">·</span>
        <br className="sm:hidden" />
        <span className="whitespace-nowrap">Création de contenu</span>
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#contact-form"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#d93a3b]"
        >
          Être rappelé
          <ArrowIcon />
        </a>
        <a
          href="#pricing"
          className="rounded-full border border-off-white bg-off-white px-7 py-3.5 text-sm font-semibold text-onyx transition-colors hover:bg-white"
        >
          Voir les tarifs
        </a>
      </div>
      <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
        {["Appel gratuit", "Maquette gratuite", "Sans engagement"].map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-[15px] font-medium text-off-white">
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-off-white text-brand">
              <CheckIcon className="h-3 w-3" />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className="relative mt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 -inset-y-6 rounded-[48px] bg-[radial-gradient(ellipse_at_center,rgba(233,68,69,0.2),transparent_68%)] blur-2xl"
        />
        <div
          aria-label="Vidéo de présentation"
          className="dark-island group relative overflow-hidden rounded-[24px] bg-onyx shadow-[0_30px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
        >
          <HeroVideo />
        </div>
      </div>
    </section>
  );
}

// Main VSL (Wistia). A light facade shows the video's own thumbnail and a
// play button; the Wistia player only loads on click, so it adds nothing to
// the first page load.
const heroVideoId = "fp7irsnikd";
const heroThumb = "https://embed-ssl.wistia.com/deliveries/fa13e1f1ce5630eeddd3b20283bc2adcbc2e4e9e.jpg";
const heroThumbAt = (w: number, h: number) => `${heroThumb}?image_crop_resized=${w}x${h}`;

// Wistia player options: brand colour, full controls, and full screen allowed
// (button in the player bar, plus auto full screen when a phone rotates).
const wistiaParams =
  "autoPlay=true&playsinline=true&playerColor=E94445&fullscreenButton=true&playbar=true&fullscreenOnRotateToLandscape=true";

type FullscreenDoc = Document & {
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => void;
};
type FullscreenEl = HTMLElement & { webkitRequestFullscreen?: () => void };

function HeroVideo() {
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  // Our own full screen button for desktop and Android. On iPhone, where web
  // pages cannot go full screen, the Wistia player's native button is used.
  useEffect(() => {
    const doc = document as FullscreenDoc;
    setCanFullscreen(Boolean(doc.fullscreenEnabled || doc.webkitFullscreenEnabled));
    const onChange = () =>
      setIsFullscreen(Boolean(doc.fullscreenElement || doc.webkitFullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  const toggleFullscreen = () => {
    const doc = document as FullscreenDoc;
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      (doc.exitFullscreen ?? doc.webkitExitFullscreen)?.call(doc);
      return;
    }
    const el = frameRef.current as FullscreenEl | null;
    if (!el) return;
    setPlaying(true);
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else el.webkitRequestFullscreen?.();
  };

  return (
    <div ref={frameRef} className="hero-video relative aspect-video bg-onyx">
      {canFullscreen && (
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Quitter le plein écran" : "Regarder en plein écran"}
          title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
          className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-onyx/55 text-off-white/85 backdrop-blur-md transition hover:bg-onyx/80 hover:text-white sm:right-4 sm:top-4"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isFullscreen ? (
              <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
            ) : (
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            )}
          </svg>
        </button>
      )}
      {playing ? (
        <iframe
          src={`https://fast.wistia.net/embed/iframe/${heroVideoId}?${wistiaParams}`}
          title="Vidéo de présentation UpScreen"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Lire la vidéo de présentation UpScreen"
          className="absolute inset-0 h-full w-full"
        >
          {thumbFailed ? (
            <img
              src={`https://fast.wistia.com/embed/medias/${heroVideoId}/swatch`}
              alt=""
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-[6px]"
            />
          ) : (
            <img
              src={heroThumbAt(960, 540)}
              srcSet={`${heroThumbAt(640, 360)} 640w, ${heroThumbAt(960, 540)} 960w, ${heroThumbAt(1280, 720)} 1280w, ${heroThumbAt(1920, 1080)} 1920w`}
              sizes="(min-width: 1024px) 976px, 100vw"
              alt=""
              fetchPriority="high"
              onError={() => setThumbFailed(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-onyx/45 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-brand shadow-[0_0_40px_rgba(233,68,69,0.55)] transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
              <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-white sm:border-y-[10px] sm:border-l-[16px]" />
            </span>
            <span className="rounded-full bg-onyx/55 px-3 py-1 text-xs font-semibold text-off-white/85 backdrop-blur-md">
              Regarder · 1:18
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

// Design grid is 260 units wide; every size scales with the card width (cqw).
const u = (value: number) => `${(value / 2.6).toFixed(3)}cqw`;

function ProblemVisual({ index }: { index: number }) {
  const floatClass =
    index % 2 === 0 ? "step-panel-float-left" : "step-panel-float-right";

  return (
    <div
      aria-hidden="true"
      className="relative z-0 mx-auto w-[86%]"
      style={{ containerType: "inline-size" }}
    >
      <div
        className={`step-panel problem-panel relative w-full overflow-hidden border border-white/80 bg-off-white text-onyx shadow-[0_25px_60px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.9)] ${floatClass}`}
        style={{
          aspectRatio: "1.08 / 1",
          borderRadius: u(20),
          padding: `${u(14)} ${u(14)} ${u(50)}`,
        }}
      >
        {index === 0 && <SearchWidget />}
        {index === 1 && <SlowSiteWidget />}
        {index === 2 && <DeadFeedWidget />}
      </div>
    </div>
  );
}

const mockSerif = '"Times New Roman", Times, serif';

function Stars({ size }: { size: number }) {
  return (
    <span className="flex" style={{ gap: u(0.6) }}>
      {[0, 1, 2, 3, 4].map((star) => (
        <svg key={star} viewBox="0 0 20 20" fill="#FBBC04" style={{ width: u(size), height: u(size) }}>
          <path d="M10 1.8l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.4l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.8z" />
        </svg>
      ))}
    </span>
  );
}

// Page 1 of Google is all competitors; "you" only show up on page 3.
function SearchWidget() {
  const results = [
    { name: "Le Grain Torréfié", url: "legraintorrefie.fr", rating: "4,8", reviews: "312", hours: "Ferme à 16 h", tone: "#B9733F" },
    { name: "Café des Halles", url: "cafedeshalles.fr", rating: "4,7", reviews: "208", hours: "Ferme à 17 h", tone: "#3F7A63" },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center" style={{ gap: u(8) }}>
        <img src={googleLogo} alt="" className="block shrink-0" style={{ height: u(14) }} />
        <div
          className="flex min-w-0 flex-1 items-center border border-onyx/10 bg-white shadow-[0_3px_10px_rgba(0,0,0,0.06)]"
          style={{ height: u(22), borderRadius: u(11), padding: `0 ${u(8)}`, gap: u(5) }}
        >
          <span className="truncate font-semibold text-onyx/75" style={{ fontSize: u(8.5) }}>
            meilleur café près de moi
          </span>
          <span className="mock-caret shrink-0 bg-onyx/60" style={{ width: u(0.8), height: u(10) }} />
          <svg viewBox="0 0 16 16" fill="none" stroke="#4285F4" strokeWidth="1.9" className="ml-auto shrink-0" style={{ width: u(10), height: u(10) }}>
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center" style={{ gap: u(10) }}>
        {results.map((result) => (
          <div key={result.name}>
            <div className="flex items-center" style={{ gap: u(5) }}>
              <span
                className="grid shrink-0 place-items-center rounded-full font-bold text-white"
                style={{ width: u(12), height: u(12), fontSize: u(6.5), background: result.tone }}
              >
                {result.name.replace(/^(Le|La|Les|Café) /, "")[0]}
              </span>
              <span className="truncate text-onyx/45" style={{ fontSize: u(7) }}>
                {result.url}
              </span>
            </div>
            <p className="truncate font-semibold text-[#1A0DAB]" style={{ fontSize: u(10.5), lineHeight: 1.25, marginTop: u(3) }}>
              {result.name}, le café du quartier
            </p>
            <div className="flex items-center text-onyx/50" style={{ gap: u(3), fontSize: u(7.5), marginTop: u(2.5) }}>
              <span className="font-semibold text-onyx/70">{result.rating}</span>
              <Stars size={7} />
              <span>({result.reviews})</span>
              <span className="font-semibold text-[#188038]">Ouvert</span>
              <span className="truncate">{result.hours}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-onyx/8" style={{ paddingTop: u(7) }}>
        <div className="flex items-center font-semibold" style={{ gap: u(7), fontSize: u(8.5) }}>
          <span className="text-onyx/80 underline decoration-[#4285F4] underline-offset-2">1</span>
          <span className="text-[#1A0DAB]">2</span>
          <span
            className="grid place-items-center rounded-full border border-brand bg-brand/10 text-brand"
            style={{ width: u(16), height: u(16) }}
          >
            3
          </span>
        </div>
        <span className="flex items-center font-semibold text-brand" style={{ fontSize: u(8.5), gap: u(4) }}>
          <span className="rounded-full bg-brand" style={{ width: u(5), height: u(5) }} />
          Vous êtes en page 3
        </span>
      </div>
    </div>
  );
}

// An old-looking site that is still loading, and a visitor heading for "Back".
function SlowSiteWidget() {
  return (
    <div className="flex h-full flex-col">
      <div className="relative flex items-center border-b border-onyx/8" style={{ gap: u(5), paddingBottom: u(7) }}>
        <span className="relative grid shrink-0 place-items-center rounded-full bg-brand/12 text-brand" style={{ width: u(16), height: u(16) }}>
          <span className="mock-tap absolute inset-0 rounded-full border border-brand" />
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: u(9), height: u(9) }}>
            <path d="M10 3 5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-onyx/20" style={{ width: u(9), height: u(9) }}>
          <path d="m6 3 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span
          className="flex min-w-0 flex-1 items-center rounded-full bg-onyx/[0.05] text-onyx/45"
          style={{ height: u(16), padding: `0 ${u(7)}`, gap: u(4), fontSize: u(7.5) }}
        >
          <span className="problem-spinner shrink-0 rounded-full border-onyx/15 border-t-brand" style={{ width: u(8), height: u(8), borderWidth: u(1.5) }} />
          <span className="truncate font-semibold">votre-entreprise.fr</span>
        </span>
        <svg viewBox="0 0 24 24" className="absolute drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]" style={{ width: u(13), height: u(13), left: u(9), top: u(9) }}>
          <path d="M5 3l14 8-6.2 1.6L10 19z" fill="#0A0A0B" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="flex items-baseline justify-between" style={{ marginTop: u(8), fontFamily: mockSerif }}>
        <span className="font-bold text-onyx/70" style={{ fontSize: u(12) }}>
          Votre Entreprise
        </span>
        <span className="text-[#1A0DAB] underline" style={{ fontSize: u(7.5) }}>
          Accueil | Carte | Contact
        </span>
      </div>

      <div
        className="flex flex-1 flex-col items-center justify-center border border-dashed border-onyx/20 bg-onyx/[0.04]"
        style={{ margin: `${u(7)} 0`, borderRadius: u(6), gap: u(4) }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-onyx/30" style={{ width: u(30), height: u(30) }}>
          <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
          <circle cx="9" cy="9.5" r="1.6" />
          <path d="m3 16.5 5-5 4 4 3-3 6 6" strokeLinejoin="round" />
          <path d="M3.5 3.5 20.5 20.5" stroke="#E94445" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="text-onyx/35" style={{ fontSize: u(7), fontFamily: mockSerif }}>
          Bienvenue sur notre site !
        </span>
      </div>

      <div>
        <div className="flex items-center justify-between font-semibold" style={{ fontSize: u(8.5), marginBottom: u(4) }}>
          <span className="text-onyx/50">Chargement…</span>
          <span className="text-brand">8,4 s</span>
        </div>
        <div className="overflow-hidden rounded-full bg-onyx/8" style={{ height: u(4) }}>
          <span className="mock-load block h-full w-full origin-left rounded-full bg-brand" />
        </div>
      </div>
    </div>
  );
}

// Un vrai profil Instagram d'entreprise, endormi depuis mars 2023, et une
// question de client restée sans réponse.
function DeadFeedWidget() {
  // Vignettes : la plus récente en haut à gauche (« Fermé jusqu'au 15 mars »),
  // puis des photos du café recadrées, un peu passées.
  const photoTiles = [
    { position: "35% 35%", zoom: 1.7, badge: "reel" },
    { position: "70% 75%", zoom: 2.1, badge: "multi" },
    { position: "50% 50%", zoom: 1, badge: null },
    { position: "15% 80%", zoom: 1.9, badge: null },
    { position: "55% 20%", zoom: 2.4, badge: "reel" },
  ] as const;
  const igBlue = "#0095F6";

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center" style={{ gap: u(10) }}>
        <span
          className="grid shrink-0 place-items-center rounded-full bg-[#3B2A20] font-display text-[#F7F1E8]"
          style={{ width: u(32), height: u(32), fontSize: u(11), boxShadow: "0 0 0 1px rgba(10,10,11,0.1)" }}
        >
          VE
        </span>
        <div className="grid flex-1 grid-cols-3 text-center leading-none">
          {[
            ["12", "publications"],
            ["87", "followers"],
            ["64", "suivi(e)s"],
          ].map(([value, label]) => (
            <span key={label}>
              <b className="block font-bold text-onyx/85" style={{ fontSize: u(9.5) }}>
                {value}
              </b>
              <span className="mt-[0.35em] block text-onyx/55" style={{ fontSize: u(6.5) }}>
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: u(6) }}>
        <p className="font-bold leading-tight text-onyx/85" style={{ fontSize: u(7.5) }}>
          Votre Entreprise
        </p>
        <p className="leading-tight text-onyx/55" style={{ fontSize: u(6.5), marginTop: u(1) }}>
          Café · Brunch · Toulouse
        </p>
      </div>

      <div className="grid grid-cols-2 font-semibold" style={{ gap: u(4), marginTop: u(6), fontSize: u(7) }}>
        <span className="grid place-items-center text-white" style={{ height: u(15), borderRadius: u(4), background: igBlue }}>
          Suivre
        </span>
        <span className="grid place-items-center bg-[#EFEFEF] text-onyx/85" style={{ height: u(15), borderRadius: u(4) }}>
          Message
        </span>
      </div>

      <div
        className="grid grid-cols-3 overflow-hidden"
        style={{ gap: u(1.5), marginTop: u(8), filter: "saturate(0.55) brightness(1.06) contrast(0.92)" }}
      >
        <span
          className="relative flex aspect-square flex-col items-center justify-center bg-[#EADFD2] text-center font-display leading-[1.05] text-[#3B2A20]"
          style={{ fontSize: u(8.5) }}
        >
          Fermé jusqu'au
          <br />
          15 mars
          <span className="font-ui text-[#3B2A20]/60" style={{ fontSize: u(5.5), marginTop: u(3) }}>
            À très vite !
          </span>
          <span
            className="absolute rounded-full bg-white font-ui font-bold text-onyx/70"
            style={{ left: u(3), top: u(3), fontSize: u(5.5), padding: `${u(1.2)} ${u(3.5)}` }}
          >
            mars 2023
          </span>
        </span>
        {photoTiles.map((tile) => (
          <span key={tile.position} className="relative aspect-square overflow-hidden bg-[#D8CFC5]">
            <img
              src={cafePhoto}
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: tile.position, transform: `scale(${tile.zoom})`, transformOrigin: tile.position }}
            />
            {tile.badge === "reel" && (
              <svg viewBox="0 0 16 16" className="absolute drop-shadow" style={{ right: u(3), top: u(3), width: u(7), height: u(7) }} fill="none" stroke="#fff" strokeWidth="1.6">
                <rect x="2" y="2" width="12" height="12" rx="3.5" />
                <path d="m6.6 5.6 4 2.4-4 2.4Z" fill="#fff" stroke="none" />
              </svg>
            )}
            {tile.badge === "multi" && (
              <svg viewBox="0 0 16 16" className="absolute drop-shadow" style={{ right: u(3), top: u(3), width: u(7), height: u(7) }} fill="none" stroke="#fff" strokeWidth="1.6">
                <rect x="5" y="2" width="9" height="9" rx="2" />
                <path d="M3 5.5v7.5h7.5" />
              </svg>
            )}
          </span>
        ))}
      </div>

      <div
        className="absolute flex items-center border border-onyx/8 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
        style={{ left: u(12), right: u(12), bottom: u(-14), borderRadius: u(9), padding: `${u(5)} ${u(7)}`, gap: u(6) }}
      >
        <span
          className="grid shrink-0 place-items-center rounded-full font-bold text-white"
          style={{ width: u(15), height: u(15), fontSize: u(7), background: "linear-gradient(135deg,#F58529,#DD2A7B)" }}
        >
          J
        </span>
        <div className="min-w-0">
          <p className="truncate text-onyx/80" style={{ fontSize: u(8.5) }}>
            <b className="font-semibold">julie.m</b> Vous êtes toujours ouverts ?
          </p>
          <p className="font-semibold text-brand" style={{ fontSize: u(6.5), marginTop: u(1.5) }}>
            Il y a 3 semaines · Sans réponse
          </p>
        </div>
      </div>
    </div>
  );
}

function ProblemSection() {
  const problems = [
    ["Site non référencé", "Personne ne vous trouve sur Google."],
    ["Site lent et dépassé", "Les visiteurs repartent en quelques secondes."],
    ["Absent des réseaux", "On se demande si vous êtes encore ouvert."],
  ];

  return (
    <section
      id="services"
      className="scroll-reveal mx-auto w-full max-w-[1160px] scroll-mt-24 px-5 pb-20 pt-4 sm:px-8 md:pb-28 md:pt-6"
    >
      <SectionHeader eyebrow="Le constat" title="Vous perdez des clients" muted="avant même de dire bonjour." />
      <div className="mx-auto mt-12 grid max-w-[420px] grid-cols-1 gap-8 md:max-w-[1040px] md:grid-cols-3 md:gap-5 lg:gap-7">
        {problems.map(([title, description], index) => (
          <div key={title} className="relative flex flex-col">
            <ProblemVisual index={index} />
            <article className={`${darkCard} relative z-10 -mt-8 flex-1 overflow-hidden p-5 sm:p-6`}>
              <p className="inline-block whitespace-nowrap rounded-full bg-brand px-3.5 py-1.5 text-[15px] font-semibold leading-none tracking-[-0.01em] text-white">
                {title}
              </p>
              <p className="mt-4 text-sm font-normal leading-[1.6] text-warm-gray sm:text-[15px]">
                {description}
              </p>
            </article>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-[760px] text-center text-[17px] font-semibold leading-[1.6] text-off-white">
        Résultat : ils choisissent votre concurrent.
      </p>
    </section>
  );
}

// Fond « premium » : formes rouges floues qui dérivent lentement.
function PremiumBlobs() {
  return (
    <div aria-hidden="true" className="premium-blobs pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <span className="blob blob-a" />
      <span className="blob blob-b" />
      <span className="blob blob-c" />
      <span className="blob blob-d" />
    </div>
  );
}

function DelayChip({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.12em] ${
        tone === "light" ? "bg-onyx/[0.06] text-onyx/70" : "bg-white/[0.06] text-[#CFCCC7]"
      }`}
    >
      <ClockIcon className="h-3.5 w-3.5 text-brand" />
      {children}
    </span>
  );
}

function CheckDot({ solid = false, light = false }: { solid?: boolean; light?: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${
        solid ? "bg-brand text-white shadow-none" : light ? "bg-brand/12 text-brand" : "bg-brand/15 text-brand"
      }`}
    >
      <CheckIcon className="h-3 w-3" />
    </span>
  );
}

function SiteOfferCard({ offer }: { offer: SiteOffer }) {
  const featured = Boolean(offer.featured);
  const quote = !offer.price;

  return (
    <article
      className={`scroll-reveal relative isolate flex flex-col overflow-hidden rounded-[28px] border p-7 transition duration-300 hover:-translate-y-1 sm:p-8 ${
        featured
          ? "isolate border-white/10 dark-island bg-[#0b0a0b] shadow-[0_40px_90px_rgba(233,68,69,0.22)]"
          : quote
            ? "keep-colors border-white/80 bg-off-white shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
            : "border-white/[0.08] bg-graphite hover:border-white/20"
      }`}
    >
      {featured ? <PremiumBlobs /> : <div aria-hidden="true" className="tint-drift pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_70%_at_100%_0%,rgba(233,68,69,0.16),rgba(233,68,69,0.05)_45%,transparent_70%)]" />}
      <div className="flex min-h-[28px] items-start justify-between gap-3">
        <h3 className={`text-[26px] font-extrabold leading-none tracking-[-0.05em] ${quote ? "text-onyx" : "text-off-white"}`}>
          {offer.title}
        </h3>
        {featured ? (
          <span className="whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.12em] text-onyx">
            Recommandé
          </span>
        ) : null}
      </div>
      <p
        className={`mt-3 ${
          featured ? "font-mono text-[13px] font-semibold leading-[1.6] text-white/75" : quote ? "font-mono text-[13px] font-semibold leading-[1.6] text-onyx/60" : "font-mono text-[13px] font-semibold leading-[1.6] text-[#CFCCC7]"
        }`}
      >
        {offer.subtitle}
      </p>

      <p className="mt-7 flex h-[62px] items-end whitespace-nowrap">
        {quote ? (
          <span className="text-[48px] font-extrabold leading-none tracking-[-0.055em] text-onyx sm:text-[54px]">Sur devis</span>
        ) : (
          <span className="text-[54px] font-extrabold leading-none tracking-[-0.055em] text-off-white sm:text-[62px]">
            {offer.price}&nbsp;€
          </span>
        )}
      </p>
      <div className="mt-5">
        <DelayChip tone={quote ? "light" : "dark"}>{offer.chip}</DelayChip>
      </div>

      <ul className={`mt-8 space-y-4 text-[15px] leading-[1.5] ${quote ? "text-onyx/80" : "text-[#E4E1DC]"}`}>
        {offer.features.map((feature) => {
          const dot = <CheckDot solid={featured} light={quote} />;
          if (typeof feature === "string")
            return (
              <li key={feature} className="flex gap-3">
                {dot}
                {feature}
              </li>
            );
          const [label, detail] = feature;
          return (
            <li key={label}>
              <details className="group">
                <summary className="flex cursor-pointer list-none gap-3 [&::-webkit-details-marker]:hidden">
                  {dot}
                  <span className="flex-1">{label}</span>
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-[0.3em] h-4 w-4 shrink-0 text-warm-gray transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m4 6 4 4 4-4" />
                  </svg>
                </summary>
                <p className="ml-[34px] mt-1.5 pr-6 text-[13px] leading-[1.5] text-warm-gray">{detail}</p>
              </details>
            </li>
          );
        })}
      </ul>

      <div aria-hidden="true" className="min-h-10 flex-1" />
      <a
        href={offer.href ?? "#contact"}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 py-4 text-[15px] font-semibold transition duration-200 hover:-translate-y-0.5 ${
          featured
            ? "border-white bg-white text-onyx shadow-[0_18px_40px_rgba(0,0,0,0.35)] hover:bg-off-white"
            : quote
              ? "border-brand bg-brand text-onyx hover:bg-[#FF7A7B]"
              : "border-white/15 text-off-white hover:border-white/35"
        }`}
      >
        {offer.cta}
        <ArrowIcon />
      </a>
    </article>
  );
}

function PlanMark({ value }: { value: PlanCell }) {
  if (value === true)
    return (
      <svg aria-label="Inclus" role="img" viewBox="0 0 16 16" className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3.5 8.5 3 3 6-7" />
      </svg>
    );
  if (value === false) return <span aria-label="Non inclus" className="text-warm-gray/50">—</span>;
  return <span>{value}</span>;
}

const subscriptionTaglines: Record<string, string> = {
  Visibilité: "Pour rester visible sur Google, mois après mois.",
  Premium: "Google, blog et Instagram gérés pour vous.",
};

function SubscriptionCard({ plan }: { plan: (typeof subscriptions)[number] }) {
  const featured = "featured" in plan && plan.featured;
  const column = subscriptions.indexOf(plan) + 1;
  const items = subscriptionRows
    .filter((row) => row[column] !== false)
    .map((row) => {
      const value = row[column];
      const [label, detail] = typeof row[0] === "string" ? [row[0], undefined] : row[0];
      return { label: typeof value === "string" ? `${label} : ${value}` : label, detail };
    });

  return (
    <article
      className={`scroll-reveal relative isolate flex flex-col overflow-hidden rounded-[28px] border p-7 sm:p-9 ${
        featured
          ? "isolate border-white/10 dark-island bg-[#0b0a0b] shadow-[0_40px_90px_rgba(233,68,69,0.22)]"
          : "border-white/[0.08] bg-graphite"
      }`}
    >
      {featured ? <PremiumBlobs /> : <div aria-hidden="true" className="tint-drift pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_70%_at_100%_0%,rgba(233,68,69,0.16),rgba(233,68,69,0.05)_45%,transparent_70%)]" />}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[28px] font-extrabold leading-none tracking-[-0.05em] text-off-white">{plan.name}</h3>
        {featured && (
          <span className="whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.12em] text-onyx">
            Le plus complet
          </span>
        )}
      </div>
      <p className={`mt-3 font-mono text-[13px] font-semibold leading-[1.6] ${featured ? "text-white/75" : "text-[#CFCCC7]"}`}>
        {subscriptionTaglines[plan.name]}
      </p>
      <p className="mt-7 flex items-baseline gap-2 whitespace-nowrap">
        <span className="text-[56px] font-extrabold leading-none tracking-[-0.055em] text-off-white sm:text-[64px]">{plan.price}&nbsp;€</span>
        <span className="text-[17px] font-medium text-white/60">/mois</span>
      </p>
      <div className="mt-5">
        <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white/[0.08] px-3 py-1.5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.12em] text-[#E4E1DC]">
          <ClockIcon className="h-3.5 w-3.5 text-brand" />
          {plan.engagement === "Aucun" ? "Sans engagement" : plan.engagement}
        </span>
      </div>
      <ul className="mt-8 space-y-4 text-[15px] leading-[1.5] text-[#E4E1DC]">
        {items.map(({ label, detail }) => (
          <li key={label}>
            {detail ? (
              <details className="group">
                <summary className="flex cursor-pointer list-none gap-3 [&::-webkit-details-marker]:hidden">
                  <CheckDot solid={featured} />
                  <span className="flex-1">{label}</span>
                  <svg aria-hidden="true" viewBox="0 0 16 16" className={`mt-[0.3em] h-4 w-4 shrink-0 transition-transform group-open:rotate-180 ${featured ? "text-white/80" : "text-warm-gray"}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m4 6 4 4 4-4" />
                  </svg>
                </summary>
                <p className={`ml-[34px] mt-1.5 pr-6 text-[13px] leading-[1.5] ${featured ? "text-white/85" : "text-warm-gray"}`}>{detail}</p>
              </details>
            ) : (
              <span className="flex gap-3">
                <CheckDot solid={featured} />
                {label}
              </span>
            )}
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="min-h-10 flex-1" />
      <a
        href="#contact"
        className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 py-4 text-[15px] font-semibold transition duration-200 hover:-translate-y-0.5 ${
          featured
            ? "border-white bg-white text-onyx shadow-[0_18px_40px_rgba(0,0,0,0.35)] hover:bg-off-white"
            : "border-white/15 text-off-white hover:border-white/35"
        }`}
      >
        Choisir {plan.name}
        <ArrowIcon />
      </a>
    </article>
  );
}

function SubscriptionTable() {
  return (
    <div className="mt-16">
      <SectionHeader
        eyebrow="Abonnements"
        title="Les abonnements."
        muted="Pour faire vivre votre site."
        lead="Une fois en ligne, on s'occupe de votre présence chaque mois."
      />
      <div className="mx-auto mt-12 grid max-w-[940px] gap-6 md:grid-cols-2">
        {subscriptions.map((plan) => (
          <SubscriptionCard key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  );
}

function Services() {
  return (
    <section
      id="pricing"
      className={`relative mx-auto w-full max-w-[1160px] scroll-mt-24 px-5 sm:px-8 ${sectionY}`}
    >
      <SectionHeader
        eyebrow="Tarifs"
        title={<>Des tarifs <span className="title-box">transparents</span></>}
        muted="Payés une seule fois."
        lead={
          <>
            Pas de devis interminable&nbsp;: un prix fixe, tout compris.
            <br />
            Votre site vous appartient.
          </>
        }
      />
      <CheckChips items={["Maquette gratuite", "Transfert gratuit"]} />
      <div className="mx-auto mt-16 grid max-w-[480px] gap-6 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
        {siteOffers.map((offer) => (
          <SiteOfferCard key={offer.title} offer={offer} />
        ))}
      </div>

      <SubscriptionTable />

      <div className="scroll-reveal dark-island relative isolate mx-auto mt-6 max-w-[940px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0a0b] p-7 text-center shadow-[0_30px_70px_rgba(233,68,69,0.18)] md:p-9">
        <div aria-hidden="true" className="tint-drift absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(233,68,69,0.28),transparent_70%)]" />
        <p className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 text-[24px] font-extrabold tracking-[-0.045em]">
          <span className="text-white">Hébergement et nom de domaine</span>
          <span className="text-brand-light">Inclus la 1re année</span>
        </p>
        <p className="mx-auto mt-3 max-w-[640px] font-mono text-[14px] font-semibold leading-[1.7] tracking-[-0.01em] text-white/70">
          Puis {hostingRenewal} €/an, payés à la date anniversaire. Avec les offres Essentiel et Complet.
        </p>
      </div>
      <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-warm-gray">TVA non applicable, art. 293 B du CGI</p>
    </section>
  );
}

function Reviews() {
  // Repeat short lists so one set is wider than large screens, then duplicate
  // the set for a seamless marquee loop.
  let set = reviews;
  while (set.length < 6) set = [...set, ...reviews];
  const loop = [...set, ...set];

  return (
    <section
      id="reviews"
      className={`relative w-full scroll-mt-24 ${sectionY}`}
    >
      <div className="px-5 sm:px-8">
        <div className="mx-auto max-w-[1096px]">
          <SectionHeader eyebrow="Avis" title="Ils nous ont fait confiance." muted="Ils en parlent mieux que nous." />
        </div>
      </div>
      <div className="scroll-reveal reviews-viewport relative mx-auto mt-12 max-w-[1200px] overflow-hidden">
        <div
          className="reviews-track flex w-max gap-5 px-5"
          style={{ animationDuration: `${set.length * 10}s` }}
        >
          {loop.map((review, index) => (
            <figure
              key={index}
              aria-hidden={index >= reviews.length}
              className="tint-drift dark-island relative flex w-[300px] shrink-0 flex-col rounded-[24px] border border-white/10 bg-[#0b0a0b] bg-[radial-gradient(120%_70%_at_100%_0%,rgba(233,68,69,0.22),transparent_60%)] p-6 shadow-[0_24px_60px_rgba(14,13,16,0.18)] sm:w-[360px] sm:p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  aria-hidden="true"
                  className="-mt-1 text-[44px] font-extrabold leading-none text-brand"
                >
                  &ldquo;
                </span>
                <span className="flex items-center gap-2">
                  {review.placeholder && (
                    <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-semibold text-white/55">
                      Exemple
                    </span>
                  )}
                  {review.lang === "EN" && (
                    <span className="rounded-full bg-white/[0.08] px-2.5 py-1 font-mono text-[10px] font-semibold text-white/60">
                      Traduit de l'anglais
                    </span>
                  )}
                </span>
              </div>
              <blockquote
                lang="fr"
                className="mt-2 flex-1 text-[15px] font-normal leading-[1.65] text-white/80"
              >
                {review.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="text-[15px] font-extrabold tracking-[-0.02em] text-white">{review.business}</p>
                {review.person && (
                  <p className="mt-0.5 text-xs font-normal text-white/55">{review.person}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEP_PANEL_WIDTH = 360;
const STEP_PANEL_HEIGHT = STEP_PANEL_WIDTH / 1.28;

// Renders the mockup at its design size, then scales it down as one image so
// nothing squashes or wraps on narrow screens.
function StepVisual({ title, isLeft }: { title: string; isLeft: boolean }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => setScale(frame.clientWidth / STEP_PANEL_WIDTH);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative z-0 mx-auto w-[82%] sm:w-[78%]"
      style={{ height: STEP_PANEL_HEIGHT * scale }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: STEP_PANEL_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <StepVisualPanel title={title} isLeft={isLeft} />
      </div>
    </div>
  );
}

function StepVisualPanel({
  title,
  isLeft,
}: {
  title: string;
  isLeft: boolean;
}) {
  const panelClass = `step-panel relative z-0 aspect-[1.28/1] w-full origin-bottom overflow-hidden rounded-[20px] border border-white/80 bg-off-white p-5 text-onyx shadow-[0_25px_60px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.9)] transition-transform duration-700 ${
    isLeft
      ? "step-panel-float-left"
      : "step-panel-float-right"
  }`;

  if (title === "Appel découverte") {
    // Une conversation façon WhatsApp : une gérante de café écrit, UpScreen répond.
    return (
      <div className={panelClass.replace(" p-5 ", " p-0 ")}>
        <div className="flex items-center gap-2.5 border-b border-onyx/8 bg-white px-4 py-2.5">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 text-onyx/45" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 3 5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <img src={upscreenIcon} alt="" className="h-8 w-8 rounded-full" />
          <div className="min-w-0 leading-tight">
            <p className="text-xs font-semibold text-onyx/90">UpScreen</p>
            <p className="text-[9px] font-semibold text-[#1DAA61]">en ligne</p>
          </div>
          <div className="ml-auto flex items-center gap-3 text-onyx/45">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="2.5" y="5" width="10.5" height="10" rx="2" />
              <path d="m13 8.3 4.5-2.3v8l-4.5-2.3" strokeLinejoin="round" />
            </svg>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
              <path d="M5 3.5 7.6 3l1.5 3.6-1.8 1.3a9 9 0 0 0 4.8 4.8l1.3-1.8 3.6 1.5-.5 2.6c-.2.8-.9 1.3-1.7 1.3C8.6 16.3 3.7 11.4 3.7 5.2c0-.8.5-1.5 1.3-1.7Z" />
            </svg>
          </div>
        </div>
        <div className="flex h-full flex-col gap-2 bg-[#EFEAE2] bg-[radial-gradient(rgba(10,10,11,0.045)_1px,transparent_1.2px)] bg-[length:14px_14px] px-4 pt-3">
          <span className="mx-auto rounded-md bg-white/85 px-2 py-0.5 text-[8px] font-semibold text-onyx/50 shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
            Aujourd'hui
          </span>
          <div className="ml-auto max-w-[78%] rounded-xl rounded-tr-sm bg-[#D9FDD3] px-2.5 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
            <p className="text-[10.5px] leading-[1.35] text-onyx/85">
              Bonjour ! J'ai un café à Toulouse, Le Comptoir Rose. Vous pouvez nous aider à avoir plus de clients ?
            </p>
            <p className="mt-0.5 flex items-center justify-end gap-0.5 text-[8px] text-onyx/45">
              09:41
              <svg aria-hidden="true" viewBox="0 0 18 12" className="h-2.5 w-3.5" fill="none" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m1.5 6.5 3 3 6-7M7.5 9.5l6-7" />
              </svg>
            </p>
          </div>
          <div className="mr-auto max-w-[80%] rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
            <p className="text-[10.5px] leading-[1.35] text-onyx/85">
              Bonjour Julie ! Avec plaisir. On s'appelle demain à 10 h pour un{" "}
              <span className="font-semibold text-brand">appel découverte gratuit</span> ?
            </p>
            <p className="mt-0.5 text-right text-[8px] text-onyx/45">09:42</p>
          </div>
          <div className="mock-typing mr-auto flex items-center gap-1 rounded-xl rounded-tl-sm bg-white px-3 py-2 shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-onyx/35" />
            <span className="h-1.5 w-1.5 rounded-full bg-onyx/35" />
            <span className="h-1.5 w-1.5 rounded-full bg-onyx/35" />
          </div>
        </div>
      </div>
    );
  }

  if (title === "Maquette gratuite") {
    // La page d'accueil du café en cours de design, avec le commentaire de la cliente.
    return (
      <div className={panelClass}>
        <div className="flex items-center border-b border-onyx/10 pb-2">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-onyx/10" />
            <span className="h-2 w-2 rounded-full bg-onyx/10" />
            <span className="h-2 w-2 rounded-full bg-onyx/10" />
          </div>
          <p className="mx-auto pr-6 text-[9px] font-semibold text-onyx/70">
            Le Comptoir Rose · Accueil
          </p>
          <span className="rounded-md bg-brand px-2 py-1 text-[7px] font-semibold text-white">
            Partager
          </span>
        </div>
        <div className="mt-2 grid h-[74%] grid-cols-[22%_1fr] overflow-hidden rounded-xl border border-onyx/8 bg-[#EEF0F4]">
          <div className="border-r border-onyx/8 bg-white/85 p-2">
            <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.1em] text-onyx/45">Calques</p>
            <div className="mt-1.5 space-y-0.5">
              {["En-tête", "Hero", "Photo", "Carte", "Horaires", "Réserver"].map((layer) => (
                <p
                  key={layer}
                  className={`truncate rounded px-1.5 py-[3px] text-[7px] font-semibold ${
                    layer === "Photo" ? "bg-[#0D99FF]/12 text-[#0B7FD6]" : "text-onyx/50"
                  }`}
                >
                  {layer}
                </p>
              ))}
            </div>
          </div>
          <div className="relative p-2.5">
            <div className="h-full overflow-hidden rounded-md bg-[#F7F1E8] px-3 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="flex items-center">
                <p className="font-display text-[9px] leading-none text-[#3B2A20]">Le Comptoir Rose</p>
                <div className="ml-auto flex items-center gap-2 text-[5.5px] font-semibold text-[#3B2A20]/60">
                  <span>Carte</span>
                  <span>Infos</span>
                  <span className="rounded-full bg-[#3B2A20] px-1.5 py-[3px] text-[#F7F1E8]">Réserver</span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-[1fr_42%] items-center gap-2.5">
                <div>
                  <p className="font-display text-[14px] leading-[1.02] text-[#3B2A20]">
                    Le café qui donne envie de se lever.
                  </p>
                  <p className="mt-1.5 text-[5.5px] leading-[1.4] text-[#3B2A20]/60">
                    Café de spécialité et brunch, au cœur de Toulouse.
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-[#B5482F] px-2 py-[3px] text-[5.5px] font-bold text-white">
                    Voir la carte
                  </span>
                </div>
                <div className="relative">
                  <img src={cafePhoto} alt="" className="block aspect-[1/1.08] w-full rounded-[5px] object-cover object-[55%_50%]" />
                  <span className="pointer-events-none absolute -inset-[2px] border border-[#0D99FF]" />
                  {["-left-[4px] -top-[4px]", "-right-[4px] -top-[4px]", "-bottom-[4px] -left-[4px]", "-bottom-[4px] -right-[4px]"].map((pos) => (
                    <span key={pos} className={`absolute h-[5px] w-[5px] border border-[#0D99FF] bg-white ${pos}`} />
                  ))}
                  <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-[#0D99FF] px-1 py-px text-[5px] font-bold text-white">
                    240 × 260
                  </span>
                  <div className="absolute -left-3 bottom-2 flex items-center gap-1 rounded-full rounded-bl-sm bg-white py-1 pl-1 pr-2 shadow-[0_4px_12px_rgba(0,0,0,0.16)]">
                    <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-gradient-to-br from-[#F58529] to-[#DD2A7B] text-[6px] font-bold text-white">
                      J
                    </span>
                    <span className="whitespace-nowrap text-[7px] font-semibold text-onyx/75">J'adore cette photo !</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (title === "Google & SEO") {
    // Après : l'entreprise apparaît en premier dans les résultats locaux de Google et Maps.
    return (
      <div className={panelClass}>
        <div className="flex items-center gap-2.5">
          <img src={googleLogo} alt="" className="h-[15px] shrink-0" />
          <div className="flex h-7 flex-1 items-center rounded-full border border-onyx/10 bg-white px-3 text-[10px] font-semibold text-onyx/75 shadow-[0_3px_10px_rgba(0,0,0,0.06)]">
            meilleur café près de moi
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="#4285F4" strokeWidth="1.9" className="ml-auto h-3 w-3">
              <circle cx="7" cy="7" r="4.5" />
              <path d="m10.5 10.5 3 3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="relative mt-3 h-[58px] overflow-hidden rounded-xl bg-[#E9EEF1]">
          <span className="absolute -left-4 top-[18px] h-[7px] w-[120%] -rotate-6 bg-white" />
          <span className="absolute left-[38%] -top-4 h-[140%] w-[6px] rotate-12 bg-white" />
          <span className="absolute -left-2 bottom-2 h-[5px] w-[70%] rotate-3 bg-white/80" />
          <span className="absolute right-3 top-2 h-8 w-16 rounded-[40%] bg-[#CFE7D3]" />
          <span className="absolute left-[18%] top-[34px] h-2 w-2 rounded-full border border-white bg-onyx/25" />
          <span className="absolute right-[24%] top-[30px] h-2 w-2 rounded-full border border-white bg-onyx/25" />
          <span className="absolute left-[72%] top-[10px] h-2 w-2 rounded-full border border-white bg-onyx/25" />
          <span className="absolute left-[46%] top-[6px] grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full rounded-br-none bg-brand text-[10px] font-bold text-white shadow-[0_4px_10px_rgba(233,68,69,0.45)] [transform:translateX(-50%)_rotate(45deg)]">
            <span className="-rotate-45">1</span>
          </span>
        </div>
        <div className="mt-2.5 rounded-xl border border-onyx/8 bg-white p-2.5 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[12px] font-semibold leading-tight text-[#1A0DAB]">Le Comptoir Rose</p>
              <p className="mt-0.5 flex items-center gap-1 text-[9px] text-onyx/50">
                <b className="font-semibold text-onyx/75">4,9</b>
                <span className="tracking-[-0.05em] text-[#FBBC04]">★★★★★</span>
                (48) · Café
              </p>
              <p className="text-[9px] text-onyx/50">
                <span className="font-semibold text-[#188038]">Ouvert</span> · Ferme à 16 h
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-brand px-2 py-1 text-[8px] font-bold text-white">
              N°1 près de vous
            </span>
          </div>
          <div className="mt-2 flex gap-1.5">
            {["Site Web", "Itinéraire", "Appeler"].map((action) => (
              <span
                key={action}
                className="rounded-full border border-[#DADCE0] px-2 py-0.5 text-[8px] font-semibold text-[#1A73E8]"
              >
                {action}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (title === "Mise en ligne") {
    // Le site du café terminé, en ligne, qui apporte déjà une réservation.
    return (
      <div className={panelClass}>
        <div className="flex items-center gap-2 border-b border-onyx/10 pb-2">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-onyx/10" />
            <span className="h-2 w-2 rounded-full bg-onyx/10" />
          </div>
          <div className="flex flex-1 items-center gap-1 rounded-md bg-[#f1f3f8] px-2 py-1 text-[8px] font-semibold text-onyx/55">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
              <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            lecomptoirrose.fr
          </div>
          <span className="flex items-center gap-1 text-[8px] font-semibold text-[#188038]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1DAA61]" />
            En ligne
          </span>
        </div>
        <div className="relative mt-2.5 overflow-hidden rounded-xl shadow-sm">
          <div className="relative h-[136px]">
            <img src={cafePhoto} alt="" className="absolute inset-0 h-full w-full object-cover object-[60%_45%]" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#24170F]/90 via-[#24170F]/55 to-transparent" />
            <div className="relative flex items-center px-3 pt-2.5">
              <p className="font-display text-[10px] leading-none text-[#F7F1E8]">Le Comptoir Rose</p>
              <div className="ml-auto flex items-center gap-2 text-[6px] font-semibold text-[#F7F1E8]/75">
                <span>Carte</span>
                <span>À propos</span>
                <span className="rounded-full bg-[#F7F1E8] px-1.5 py-[3px] text-[#3B2A20]">Réserver</span>
              </div>
            </div>
            <div className="relative mt-4 max-w-[58%] px-3">
              <p className="font-display text-[17px] leading-[1.02] text-[#F7F1E8]">Le café qui donne envie de se lever.</p>
              <p className="mt-1.5 text-[6.5px] leading-[1.4] text-[#F7F1E8]/75">
                Café de spécialité et brunch, au cœur de Toulouse.
              </p>
              <div className="mt-2 flex gap-1.5">
                <span className="rounded-full bg-[#B5482F] px-2 py-[3px] text-[6px] font-bold text-white">Voir la carte</span>
                <span className="rounded-full border border-[#F7F1E8]/50 px-2 py-[3px] text-[6px] font-bold text-[#F7F1E8]">Itinéraire</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#F7F1E8] px-3 py-1.5 text-[6.5px] font-semibold text-[#3B2A20]/70">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1DAA61]" />
              Ouvert aujourd'hui · 7 h 30 – 16 h
            </span>
            <span>
              <span className="text-[#FBBC04]">★</span> 4,9 sur Google
            </span>
          </div>
        </div>
        <div className="absolute bottom-[86px] right-3 flex w-[44%] items-center gap-2 rounded-xl border border-onyx/8 bg-white p-2 shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand text-white">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <rect x="2.5" y="3.5" width="11" height="10" rx="2" />
              <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" />
            </svg>
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-[8px] font-semibold text-onyx/85">Nouvelle réservation</p>
            <p className="truncate text-[7px] text-onyx/50">Table pour 2 · sam. 9 h 30</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={panelClass}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-extrabold tracking-[-0.03em]">Production en cours</p>
          <p className="mt-1 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-onyx/45">
            Espace projet UpScreen
          </p>
        </div>
        <span className="text-[26px] font-extrabold leading-none tracking-[-0.05em] text-brand">68 %</span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-onyx/8">
        <div className="h-full w-[68%] rounded-full bg-brand" />
      </div>
      <div className="mt-4 space-y-2">
        {[
          ["Structure de la page", "100 %", true],
          ["Rédaction des textes", "82 %", true],
          ["Version mobile", "46 %", false],
        ].map(([label, progress, complete]) => (
          <div
            key={String(label)}
            className="flex items-center gap-2 rounded-lg border border-onyx/8 bg-white px-2.5 py-2 shadow-sm"
          >
            <span
              className={`h-4 w-4 rounded-full ${
                complete ? "bg-brand" : "border-2 border-brand/35 bg-brand/5"
              }`}
            />
            <span className="text-[9px] font-bold text-onyx/65">{label}</span>
            <span className="ml-auto font-mono text-[8px] font-semibold text-onyx/45">
              {progress}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Process icons in the brand style: the same red rounded square and white
// line glyph as the UpScreen app icon (corner radius 23%, like the logo).
type BrandIconName =
  | "chat" | "mockup" | "build" | "seo" | "launch" | "growth"
  | "brand" | "play" | "ads" | "qr" | "spark" | "app";

const brandIconGlyphs: Record<BrandIconName, ReactNode> = {
  chat: (
    <>
      <path d="M6.2 4.8h11.6a2.7 2.7 0 0 1 2.7 2.7v7.4a2.7 2.7 0 0 1-2.7 2.7h-6.1l-4.4 3.3v-3.3H6.2a2.7 2.7 0 0 1-2.7-2.7V7.5a2.7 2.7 0 0 1 2.7-2.7Z" />
      <circle cx="8.3" cy="11.2" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11.2" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.7" cy="11.2" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  mockup: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.7" />
      <path d="M3.5 9h17" />
      <rect x="6.8" y="12" width="4.6" height="4.4" rx="0.8" />
      <path d="M14.4 12.6h2.8M14.4 15.8h1.8" />
    </>
  ),
  build: (
    <>
      <path d="M12 3.6 3.6 8 12 12.4 20.4 8Z" />
      <path d="m3.6 12 8.4 4.4 8.4-4.4" />
      <path d="m3.6 16 8.4 4.4 8.4-4.4" />
    </>
  ),
  seo: (
    <>
      <circle cx="10.5" cy="10.5" r="6.6" />
      <path d="m15.5 15.5 4.7 4.7" />
      <path d="m7.7 12.3 1.9-1.9 1.6 1.6 2.3-2.4" />
    </>
  ),
  launch: (
    <>
      <path d="M12 2.9c2.7 2 4.1 5.1 4.1 8.6v4.4H7.9v-4.4c0-3.5 1.4-6.6 4.1-8.6Z" />
      <circle cx="12" cy="9.8" r="1.5" />
      <path d="M7.9 12.6 5 15.4v2.8h2.9M16.1 12.6l2.9 2.8v2.8h-2.9" />
      <path d="M10.4 18.9 12 21.2l1.6-2.3" />
    </>
  ),
  brand: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.1 0 1.7-.9 1.4-1.9-.3-1 .4-2 1.5-2h1.7a3.9 3.9 0 0 0 3.9-3.9C20.5 7.6 16.7 3.5 12 3.5Z" />
      <circle cx="7.8" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.4" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="7.6" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  play: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="3" />
      <path d="m10.2 9.2 4.6 2.8-4.6 2.8Z" fill="currentColor" stroke="none" />
    </>
  ),
  ads: (
    <>
      <path d="M4 10v4h3l7 4V6L7 10H4Z" />
      <path d="M17.5 9.5a3.5 3.5 0 0 1 0 5" />
    </>
  ),
  qr: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1.2" />
      <rect x="14" y="4" width="6" height="6" rx="1.2" />
      <rect x="4" y="14" width="6" height="6" rx="1.2" />
      <path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2" />
    </>
  ),
  spark: (
    <>
      <path d="M12 4.5 13.6 9l4.4 1.6-4.4 1.6L12 16.7l-1.6-4.5L6 10.6 10.4 9Z" />
      <path d="M18 15.5v4M16 17.5h4" />
    </>
  ),
  app: (
    <>
      <rect x="7" y="3.5" width="10" height="17" rx="2.5" />
      <path d="M10.5 17.5h3" />
    </>
  ),
  growth: (
    <>
      <path d="m3.6 17 5.9-5.9 3.9 3.9 7-7.4" />
      <path d="M15.2 7.6h5.2v5.2" />
    </>
  ),
};

function BrandIcon({ name, className = "" }: { name: BrandIconName; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-[23%] bg-brand text-white shadow-[0_8px_22px_rgba(233,68,69,0.32),inset_0_1px_0_rgba(255,255,255,0.22)] ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[68%] w-[68%]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {brandIconGlyphs[name]}
      </svg>
    </span>
  );
}

function HighlightedText({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  if (!highlights.length) return text;

  const pattern = new RegExp(`(${highlights.join("|")})`, "g");
  return text.split(pattern).map((part, index) =>
    highlights.includes(part) ? (
      <span key={`${part}-${index}`} className="text-brand">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function Process() {
  // Les étapes apparaissent et disparaissent avec le même système que le
  // reste du site (classe .scroll-reveal observée dans App), dans les deux
  // sens de défilement. Ici on ne pilote que la ligne de progression.
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScrollProgress(1);
      return;
    }

    let animationFrame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const timeline = timelineRef.current;
        if (!timeline) return;

        const rect = timeline.getBoundingClientRect();
        const viewportMarker = window.innerHeight * 0.58;
        const progress = Math.min(
          1,
          Math.max(0, (viewportMarker - rect.top) / rect.height),
        );
        setScrollProgress(progress);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section id="process" className={`relative mx-auto w-full max-w-[1160px] scroll-mt-24 px-5 sm:px-8 ${sectionY}`}>
      <SectionHeader
        eyebrow="Méthode"
        title="Du premier appel"
        muted="à la mise en ligne."
        aside={<AsideLead>Vous voyez votre site avant de payer. Il est en ligne sous 7 à 14 jours.</AsideLead>}
      />
      <div ref={timelineRef} className="relative mt-16">
        <div className="absolute bottom-8 left-4 top-8 w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2">
          <div
            aria-hidden="true"
            className="absolute inset-0 origin-top bg-gradient-to-b from-brand-light via-brand to-brand-deep will-change-transform"
            style={{ transform: `scaleY(${scrollProgress})` }}
          />
        </div>
        <div className="space-y-10 sm:space-y-0">
          {processSteps.map((step, index) => {
            const isLeft = step.side === "left";
            return (
              <div
                key={step.title}
                data-step-index={index}
                data-side={isLeft ? "left" : "right"}
                className={`scroll-reveal step-row relative grid min-h-[170px] grid-cols-[32px_1fr] gap-4 sm:grid-cols-[1fr_56px_1fr] sm:gap-3 ${
                  index > 0 ? "sm:-mt-40" : ""
                }`}
              >
                <div
                  className={`${
                    isLeft
                      ? "sm:col-start-1 sm:text-left"
                      : "sm:col-start-3 sm:text-left"
                  } relative col-start-2 row-start-1 text-left`}
                >
                  <div className="step-anim">
                    <StepVisual title={step.title} isLeft={isLeft} />
                  </div>
                  <article
                    className="dark-island relative isolate z-10 -mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0a0b] p-6 shadow-[0_30px_70px_rgba(233,68,69,0.18)] step-anim step-anim-late sm:mx-4 sm:p-8"
                  >
                    <PremiumBlobs />
                    <div aria-hidden="true" className="absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(11,10,11,0.35),rgba(11,10,11,0.75))]" />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex rounded-full bg-white/90 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.16em] text-onyx">
                          Étape 0{index + 1}
                        </span>
                        <h3 className="mt-4 text-[28px] font-extrabold leading-none tracking-[-0.05em] text-off-white sm:text-[34px]">
                          {step.title}
                        </h3>
                      </div>
                      <BrandIcon name={processIcons[step.title]} className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" />
                    </div>
                    <p
                      className={`mt-5 font-mono text-[14px] font-semibold leading-[1.7] tracking-[-0.01em] text-white/80 ${
                        isLeft ? "sm:text-left" : ""
                      }`}
                    >
                      <HighlightedText
                        text={step.body}
                        highlights={step.highlights}
                      />
                    </p>
                  </article>
                </div>
                <span className="step-dot col-start-1 row-start-1 mt-7 h-5 w-5 justify-self-center rounded-full border-4 border-onyx sm:col-start-2 sm:h-6 sm:w-6" />
              </div>
            );
          })}
        </div>
        <div
          className={`scroll-reveal relative isolate z-10 mx-auto mt-12 flex max-w-[720px] flex-col items-center overflow-hidden rounded-[28px] border border-white/10 dark-island bg-[#0b0a0b] px-6 py-10 text-center shadow-[0_40px_90px_rgba(233,68,69,0.22)] sm:px-12`}
        >
          <PremiumBlobs />
          <div className="absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(11,10,11,0.3),rgba(11,10,11,0.7))]" />
          <BrandIcon name="growth" className="h-12 w-12" />
          <span className="mt-5 inline-flex rounded-full bg-white/90 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.16em] text-onyx">
            Étape 05
          </span>
          <span className="mt-4 inline-block text-[30px] font-extrabold leading-none tracking-[-0.05em] text-off-white sm:text-[40px]">
            On vous accompagne ensuite
          </span>
          <p className="mt-4 max-w-[520px] font-mono text-[14px] font-semibold leading-[1.7] tracking-[-0.01em] text-white/80">
            Avec un abonnement, on gère chaque mois votre fiche Google, votre référencement, vos réseaux… et bien plus si besoin.
          </p>
        </div>
      </div>
    </section>
  );
}

function MotionVideoCard({
  mediaId,
  title,
  thumbnail,
  poster,
  concept = false,
}: {
  mediaId: string;
  title: string;
  thumbnail: string;
  poster: string;
  concept?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [nearView, setNearView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Only download and play the preview loop when the card is close to the
  // viewport, and pause it when it scrolls away. The poster shows until then.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || playing) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearView(true);
          if (!reduceMotion) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [playing, reduceMotion]);

  return (
    <article className="scroll-reveal">
      <div className="group relative aspect-video overflow-hidden rounded-[20px] border border-white/[0.08] bg-graphite">
        {playing ? (
          <iframe
            src={`https://fast.wistia.net/embed/iframe/${mediaId}?${wistiaParams}`}
            title={title}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Lire : ${title}`}
            className="absolute inset-0 h-full w-full overflow-hidden text-left"
          >
            <video
              ref={videoRef}
              src={nearView ? thumbnail : undefined}
              poster={poster}
              autoPlay={nearView && !reduceMotion}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-onyx/55 via-transparent to-onyx/10" />
            {concept && (
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-onyx/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-off-white/75 backdrop-blur-md">
                Concept personnel
              </span>
            )}
            <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-onyx/45 text-white backdrop-blur-md transition-transform group-hover:scale-110">
              <span className="ml-1 h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-white" />
            </span>
          </button>
        )}
      </div>
    </article>
  );
}

// Wistia media IDs. Wise and Airbnb are personal concept ads, not commissioned work.
// Add concept: true to an entry to show a "Personal concept" badge on it.
const motionVideos = [
  { mediaId: "iwoeziqb0u", title: "Pub concept pour Wise", thumbnail: motionWise, poster: motionWisePoster },
  { mediaId: "a5t1hj78uk", title: "Pub concept pour Airbnb", thumbnail: motionAirbnb, poster: motionAirbnbPoster },
  { mediaId: "tm4p5wf5de", title: "Vidéo motion design Any Style", thumbnail: motionAnyStyle, poster: motionAnyStylePoster },
  { mediaId: "cn1y5pm9o1", title: "Vidéo de présentation Notion", thumbnail: motionNotion, poster: motionNotionPoster },
];

function DemoSiteCard({ name, trade, children }: { name: string; trade: string; children: ReactNode }) {
  return (
    <figure className="scroll-reveal">
      <div aria-hidden="true" className="overflow-hidden rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
        <ScaledFrame width={400} height={300}>
          {children}
        </ScaledFrame>
      </div>
      <figcaption className="mt-4 flex items-start justify-between gap-3">
        <span>
          <span className="block text-base font-semibold text-off-white">{name}</span>
          <span className="block text-sm text-warm-gray">{trade}</span>
        </span>
        <DemoChip />
      </figcaption>
    </figure>
  );
}

// Salon de coiffure : tons poudrés, serif élégante, réservation en ligne.
function DemoSalon() {
  const plum = "#4A2C3A";
  const rose = "#C8746A";
  return (
    <div className="h-[300px] w-[400px] bg-[#F6E9E3]" style={{ color: plum }}>
      <BrowserBar url="atelier-lumiere.fr" className="bg-[#EFDDD5]" />
      <div className="px-5 pt-3">
        <div className="flex items-center">
          <p className="font-display text-[14px] italic">Atelier Lumière</p>
          <div className="ml-auto flex items-center gap-2.5 text-[7.5px] font-semibold opacity-80">
            <span>Prestations</span>
            <span>Tarifs</span>
            <span className="rounded-full px-2 py-1 text-[#F6E9E3]" style={{ background: plum }}>
              Prendre RDV
            </span>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-[1fr_130px] items-end gap-4">
          <div className="pb-2">
            <p className="font-display text-[26px] leading-[1]">Révélez votre lumière.</p>
            <p className="mt-2 text-[8.5px] leading-[1.45] opacity-75">
              Salon de coiffure aux Carmes. Coupe, couleur et soins, sur rendez-vous.
            </p>
            <span className="mt-3 inline-block rounded-full px-3 py-1.5 text-[8.5px] font-bold text-white" style={{ background: rose }}>
              Réserver en ligne
            </span>
            <p className="mt-2 flex items-center gap-1 text-[7.5px] font-semibold opacity-70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1DAA61]" />
              Prochain créneau : demain 10 h 30
            </p>
          </div>
          <div className="relative h-[150px]">
            <span className="absolute inset-x-0 bottom-0 top-0 rounded-t-full" style={{ background: "linear-gradient(170deg,#EDC3B3,#C8746A)" }} />
            <span className="absolute inset-x-3 bottom-3 top-3 rounded-t-full border border-white/60" />
            <span className="absolute -left-3 top-6 h-7 w-7 rounded-full bg-[#F6E9E3] ring-1" style={{ boxShadow: `inset 0 0 0 1px ${rose}` }} />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-[8px] font-semibold">
          {[
            ["Coupe femme", "45 €"],
            ["Couleur", "dès 65 €"],
            ["Balayage", "120 €"],
          ].map(([label, price]) => (
            <span key={label} className="flex justify-between rounded-lg bg-white/80 px-2 py-2">
              {label}
              <span style={{ color: rose }}>{price}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Plombier : bleu nuit et jaune, urgence et réassurance avant tout.
function DemoPlumber() {
  const navy = "#12324A";
  const yellow = "#F5B700";
  return (
    <div className="h-[300px] w-[400px] bg-white" style={{ color: navy }}>
      <BrowserBar url="dupuy-plomberie.fr" className="bg-[#EEF1F4]" />
      <div className="px-5 py-1 text-[7px] font-semibold text-white" style={{ background: navy }}>
        Dépannage 7j/7 · Toulouse et alentours
      </div>
      <div className="flex items-center px-5 py-2.5">
        <p className="text-[13px] font-extrabold tracking-[-0.02em]">
          DUPUY <span className="font-normal">plomberie</span>
        </p>
        <div className="ml-auto flex items-center gap-2.5 text-[7.5px] font-semibold opacity-75">
          <span>Services</span>
          <span>Zone</span>
          <span className="rounded-md px-2 py-1 font-bold" style={{ background: yellow, color: navy }}>
            Devis gratuit
          </span>
        </div>
      </div>
      <div className="mx-5 grid grid-cols-[1fr_120px] gap-4 rounded-xl p-4 text-white" style={{ background: navy }}>
        <div>
          <p className="text-[21px] font-extrabold leading-[1.05] tracking-[-0.02em]">
            Fuite, panne ? On arrive en 1 h.
          </p>
          <p className="mt-2 text-[8px] leading-[1.45] text-white/75">
            Plombier chauffagiste à Toulouse. Intervention rapide, prix annoncé avant les travaux.
          </p>
          <div className="mt-3 flex gap-1.5 text-[8px] font-bold">
            <span className="rounded-md px-2.5 py-1.5" style={{ background: yellow, color: navy }}>
              Appeler maintenant
            </span>
            <span className="rounded-md border border-white/40 px-2.5 py-1.5">Devis en ligne</span>
          </div>
        </div>
        <div className="space-y-1.5 self-center rounded-lg bg-white p-2.5 text-[8px] font-semibold" style={{ color: navy }}>
          {["Devis gratuit", "Garantie 2 ans", "Paiement après travaux"].map((item) => (
            <p key={item} className="flex items-center gap-1.5">
              <span className="grid h-3 w-3 place-items-center rounded-full text-[7px] font-bold" style={{ background: yellow }}>
                ✓
              </span>
              {item}
            </p>
          ))}
          <p className="border-t border-black/5 pt-1.5">
            <span className="text-[#FBBC04]">★</span> 4,9 · 126 avis Google
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 px-5 text-center text-[8px] font-semibold">
        {["Fuite d'eau", "Chauffe-eau", "Débouchage"].map((service) => (
          <span key={service} className="rounded-lg bg-[#EEF1F4] py-2">
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}

// Studio de yoga : vert sauge, planning du jour et premier cours offert.
function DemoYoga() {
  const green = "#2F4A3A";
  const sage = "#7C9A7E";
  return (
    <div className="h-[300px] w-[400px] bg-[#E9EEE5]" style={{ color: green }}>
      <BrowserBar url="studio-ananda.fr" className="bg-[#DFE6DA]" />
      <div className="px-5 pt-3">
        <div className="flex items-center">
          <p className="font-display text-[14px]">Studio Ananda</p>
          <div className="ml-auto flex items-center gap-2.5 text-[7.5px] font-semibold opacity-80">
            <span>Cours</span>
            <span>Planning</span>
            <span className="rounded-full px-2 py-1 text-white" style={{ background: green }}>
              Réserver un cours
            </span>
          </div>
        </div>
        <div className="relative mt-4 grid grid-cols-[1fr_150px] gap-4">
          <span className="absolute -right-6 -top-6 h-28 w-28 rounded-full" style={{ background: "radial-gradient(circle,#F3D9A4 0%,rgba(243,217,164,0) 70%)" }} />
          <div className="relative">
            <p className="font-display text-[25px] leading-[1.02]">Respirez. Bougez. Revenez à vous.</p>
            <p className="mt-2 text-[8.5px] leading-[1.45] opacity-75">
              Studio de yoga à Saint-Cyprien, tous niveaux. Petits groupes de 12 personnes maximum.
            </p>
            <span className="mt-3 inline-block rounded-full px-3 py-1.5 text-[8.5px] font-bold text-white" style={{ background: sage }}>
              1er cours offert
            </span>
          </div>
          <div className="relative rounded-xl bg-white p-2.5 shadow-[0_6px_18px_rgba(47,74,58,0.12)]">
            <p className="text-[9px] font-bold">Aujourd'hui</p>
            {[
              ["07:30", "Vinyasa", "2 places"],
              ["12:15", "Yin", "Complet"],
              ["18:30", "Hatha", "5 places"],
            ].map(([time, course, seats]) => (
              <div key={time} className="mt-1.5 flex items-center gap-1.5 border-t border-black/5 pt-1.5 text-[8px]">
                <span className="font-bold">{time}</span>
                <span className="flex-1">{course}</span>
                <span className={seats === "Complet" ? "opacity-40" : "font-semibold"} style={seats === "Complet" ? undefined : { color: sage }}>
                  {seats}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex gap-2 text-[8px] font-semibold">
          {["Vinyasa", "Yin", "Hatha", "Prénatal"].map((tag) => (
            <span key={tag} className="rounded-full border px-2.5 py-1" style={{ borderColor: `${green}33` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoChip() {
  return (
    <span className="shrink-0 rounded-full border border-off-white/15 px-2.5 py-1 text-[11px] font-semibold text-off-white/70">
      Démo
    </span>
  );
}

// Sites vitrines réalisés : captures ordinateur et mobile dans public/vitrines.
const vitrines = [
  { slug: "brasileiro", name: "O Brasileiro", trade: "Restaurant brésilien" },
  { slug: "5dogs", name: "5 Dogs", trade: "Hot dogs gourmets" },
  { slug: "sparrow", name: "Sparrow & Finch", trade: "Café" },
  { slug: "samsthai", name: "Sam's Thai Kitchen", trade: "Restaurant thaï" },
  { slug: "clinic", name: "Foot, Ankle & Body Experts", trade: "Clinique de santé" },
];

type Vitrine = (typeof vitrines)[number];

function VitrineCard({ site, large = false, onOpen }: { site: Vitrine; large?: boolean; onOpen: () => void }) {
  const { slug, name, trade } = site;
  const src = (kind: string) => `${import.meta.env.BASE_URL}vitrines/${slug}-${kind}.webp`;
  return (
    <figure className={`scroll-reveal ${large ? "md:col-span-2" : ""}`}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Voir le site ${name}`}
        className="group block w-full cursor-pointer text-left"
      >
        <div className="relative">
          <div className="dark-island overflow-hidden rounded-[22px] border border-white/10 bg-[#121113] p-1.5 shadow-[0_30px_70px_rgba(0,0,0,0.45)] transition duration-500 group-hover:-translate-y-1 group-hover:border-white/25">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="relative overflow-hidden rounded-[16px]">
              <img
                src={src("desktop")}
                alt=""
                loading="lazy"
                decoding="async"
                width={1440}
                height={900}
                className="block aspect-[16/10] w-full object-cover object-top transition duration-700 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-onyx/0 opacity-0 transition duration-300 group-hover:bg-onyx/45 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-off-white px-5 py-3 text-sm font-semibold text-onyx">
                  Voir le site <ArrowIcon />
                </span>
              </span>
            </div>
          </div>
          <img
            src={src("mobile")}
            alt=""
            loading="lazy"
            decoding="async"
            width={390}
            height={844}
            className={`dark-island absolute bottom-[-6%] right-[-2%] aspect-[390/844] rounded-[18px] border-[5px] border-onyx object-cover object-top shadow-[0_24px_50px_rgba(0,0,0,0.6)] transition duration-500 group-hover:-translate-y-2 sm:rounded-[22px] ${
              large ? "w-[17%]" : "w-[24%]"
            }`}
          />
        </div>
        <figcaption className="mt-7 pr-[26%]">
          <p className="flex items-center gap-2 text-lg font-extrabold tracking-[-0.03em] text-off-white">
            {name}
            <ArrowIcon className="h-4 w-4 text-brand transition group-hover:translate-x-1" />
          </p>
          <p className="mt-1 font-mono text-[12px] font-semibold tracking-[-0.01em] text-warm-gray">{trade}</p>
        </figcaption>
      </button>
    </figure>
  );
}

// Fenêtre qui affiche le vrai site (copie dans public/sites) dans un cadre,
// en vue ordinateur ou mobile.
function VitrineModal({ site, onClose }: { site: Vitrine; onClose: () => void }) {
  const [device, setDevice] = useState<"desktop" | "mobile">(
    () => (typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop"),
  );
  const [loaded, setLoaded] = useState(false);
  const url = `${import.meta.env.BASE_URL}sites/${site.slug}/index.html`;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Site ${site.name}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-onyx/80 p-2 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-full max-h-[920px] w-full max-w-[1320px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-graphite shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3 sm:px-5">
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="min-w-0 flex-1 sm:ml-3">
            <p className="truncate text-[15px] font-bold tracking-[-0.02em] text-off-white">{site.name}</p>
            <p className="truncate text-xs text-warm-gray">{site.trade}</p>
          </div>
          <div className="hidden rounded-full bg-white/[0.06] p-1 sm:flex">
            {(["desktop", "mobile"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setDevice(value)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  device === value ? "bg-off-white text-onyx" : "text-[#CFCCC7] hover:text-off-white"
                }`}
              >
                {value === "desktop" ? "Ordinateur" : "Mobile"}
              </button>
            ))}
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener"
            className="hidden rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-off-white transition hover:border-white/35 md:inline-flex"
          >
            Nouvel onglet ↗
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-off-white transition hover:bg-white/15"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>
        <div className="relative flex flex-1 justify-center overflow-hidden bg-onyx">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-brand" />
            </div>
          )}
          <iframe
            key={device}
            src={url}
            title={`Site ${site.name}`}
            onLoad={() => setLoaded(true)}
            className={`h-full border-0 bg-white transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${
              device === "mobile" ? "w-full max-w-[400px] self-center sm:h-[calc(100%-2rem)] sm:rounded-[28px] sm:border-[6px] sm:border-[#2a2a2e]" : "w-full"
            }`}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

function WorkGallery() {
  const [openSite, setOpenSite] = useState<Vitrine | null>(null);
  return (
    <section id="work" className={`relative mx-auto w-full max-w-[1160px] scroll-mt-24 px-5 sm:px-8 ${sectionY}`}>
      <SectionHeader
        framed
          title="Des sites sur-mesure"
        muted="conçus pour votre entreprise."
        lead="Des sites uniques, rapides et pensés pour ordinateur et mobile, qui donnent envie de pousser la porte. Cliquez pour en découvrir un."
      />

      <div className="mt-14 grid gap-x-6 gap-y-10 md:grid-cols-2">
        {vitrines.map((site, index) => (
          <VitrineCard key={site.slug} site={site} large={index === 0} onOpen={() => setOpenSite(site)} />
        ))}
      </div>

      {openSite && <VitrineModal site={openSite} onClose={() => setOpenSite(null)} />}
    </section>
  );
}

const customServices: { icon: BrandIconName; title: string; body: string; points: string[] }[] = [
  {
    icon: "brand",
    title: "Rebranding complet",
    body: "Une identité qui donne envie d'entrer.",
    points: ["Logo",
      "Charte graphique : couleurs, typographies",
      "UI/UX : design de vos écrans et parcours",
      "Supports imprimés : cartes de visite, flyers, menus",],
  },
  {
    icon: "qr",
    title: "Outils pour votre commerce",
    body: "Des applications simples qui vous font gagner du temps chaque jour.",
    points: [
      "Menu digital et QR codes (avis Google, réseaux)",
      "Carte de fidélité digitale",
      "Devis et factures depuis votre téléphone",
      "Gestion des stocks et commandes fournisseurs",
      "Et tout outil sur mesure pour votre activité",
    ],
  },
];

const motionFormats = [
  "Vidéo de présentation de 30 à 60 secondes",
  "Script et storyboard écrits pour vous",
  "Animation sur mesure, musique et sound design",
  "Versions pour votre site et Instagram",
];

type CustomOffer = {
  id: string;
  title: string;
  body: string;
  image: string;
  details: string[];
  videos?: boolean;
  ui?: "motion";
  tag: string;
};

const customOffers: CustomOffer[] = [
  {
    id: "menu",
    tag: "QR codes",
    title: "Menu digital & QR codes",
    body: "Votre carte sur téléphone et des QR codes pour vos avis Google et vos réseaux.",
    image: `${import.meta.env.BASE_URL}sur-mesure/menu.webp`,
    details: [
      "Menu digital, modifiable en un clic",
      "QR codes pour vos tables, votre vitrine et vos flyers",
      "QR code d'avis : vos clients laissent un avis Google en un geste",
      "Carte de fidélité digitale",
    ],
  },
  {
    id: "webapp",
    tag: "Web app",
    title: "Web app sur mesure",
    body: "Des outils pensés pour votre commerce, qui vous font gagner du temps chaque jour.",
    image: `${import.meta.env.BASE_URL}sur-mesure/webapp.webp`,
    details: [
      "Devis et factures depuis votre téléphone",
      "Gestion des stocks et des commandes fournisseurs",
      "Réservations et prises de commande",
      "Et tout outil sur mesure pour votre activité",
    ],
  },
  {
    id: "motion",
    tag: "Vidéo",
    title: "Vidéo en motion design",
    body: "30 à 60 secondes pour expliquer ce que vous faites et retenir l'attention.",
    image: "",
    ui: "motion",
    details: motionFormats,
    videos: true,
  },
  {
    id: "brand",
    tag: "Branding",
    title: "Refonte graphique complète",
    body: "Logo, charte et supports : une identité qui donne envie de pousser la porte.",
    image: `${import.meta.env.BASE_URL}sur-mesure/brand.webp`,
    details: [
      "Logo",
      "Charte graphique : couleurs, typographies",
      "UI/UX : design de vos écrans et parcours",
      "Supports imprimés : cartes de visite, flyers, menus",
    ],
  },
];

// Visuel « interface » de la carte motion design : un petit éditeur vidéo
// (aperçu, bouton lecture, pistes de montage et tête de lecture animée).
function MotionEditorUI() {
  const tracks = [
    { color: "bg-white/85", left: "6%", width: "40%" },
    { color: "bg-brand", left: "28%", width: "55%" },
  ];
  return (
    <div aria-hidden="true" className="relative mt-8">
      <div className="overflow-hidden rounded-[14px] border border-white/12 bg-[#141214] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="relative flex aspect-[16/8] items-center justify-center overflow-hidden rounded-[10px] bg-[radial-gradient(90%_80%_at_50%_45%,#3b1012_0%,#141012_70%,#0b0a0b_100%)]">
          <span className="absolute left-2 top-1.5 font-mono text-[8px] font-semibold text-white/60">upscreen-presentation.mp4</span>
          <span className="motion-shape-a absolute left-[10%] top-[44%] h-3.5 w-3.5 rounded-full bg-white/80" />
          <span className="motion-shape-b absolute bottom-[20%] right-[10%] h-2.5 w-7 rounded-full bg-brand" />
          <span className="flex items-center gap-1.5">
            <img src={upscreenLogo} alt="" className="motion-logo h-auto w-[104px] drop-shadow-[0_6px_16px_rgba(0,0,0,0.3)]" />
          </span>
          <span className="absolute bottom-1.5 left-2 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <svg viewBox="0 0 16 16" className="ml-px h-2.5 w-2.5 text-brand" fill="currentColor">
              <path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5Z" />
            </svg>
          </span>
          <span className="absolute bottom-1.5 right-2 font-mono text-[8px] font-semibold text-white/85">00:12 / 00:45</span>
        </div>
        <div className="relative mt-1.5 space-y-1 px-1 pb-0.5">
          {tracks.map((track, index) => (
            <span key={index} className="relative block h-2 rounded-full bg-white/[0.06]">
              <span className={`absolute inset-y-0 rounded-full ${track.color}`} style={{ left: track.left, width: track.width }} />
            </span>
          ))}
          <span className="motion-playhead absolute -top-1 bottom-0 left-1 w-px bg-white">
            <span className="absolute -left-[3px] -top-0.5 h-[7px] w-[7px] rotate-45 rounded-[1px] bg-white" />
          </span>
        </div>
      </div>
    </div>
  );
}

function CustomOfferCard({ offer, index, onOpen }: { offer: CustomOffer; index: number; onOpen: () => void }) {
  return (
    <article
      className="stagger-card dark-island group relative isolate flex min-h-[440px] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#b52a2c] p-6 text-white shadow-[0_30px_70px_rgba(233,68,69,0.25)] sm:min-h-[480px]"
      style={{ ["--i" as string]: index }}
    >
      {offer.ui === "motion" ? (
        <>
          <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(110%_70%_at_50%_10%,#3a0d0f_0%,#160809_55%,#0c0506_100%)]" />
        </>
      ) : (
        <img
          src={offer.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,10,11,0.2)_0%,rgba(10,10,11,0)_30%,rgba(10,10,11,0.55)_60%,rgba(10,10,11,0.92)_100%)]" />
      {(offer.id === "menu" || offer.id === "webapp") && (
        <div
          aria-hidden="true"
          className="tint-drift absolute inset-0 -z-10 bg-[linear-gradient(200deg,rgba(233,68,69,0.42)_0%,rgba(233,68,69,0.14)_38%,rgba(233,68,69,0)_62%)]"
        />
      )}
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-[#0e0d10] backdrop-blur">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand shadow-none" />
        {offer.tag}
      </span>
      {offer.ui === "motion" && <MotionEditorUI />}
      <div className="mt-auto pt-6">
        <h3 className="text-[24px] font-extrabold leading-[1.05] tracking-[-0.045em]">{offer.title}</h3>
        <p className="mt-3 font-mono text-[13px] font-semibold leading-[1.65] tracking-[-0.01em] text-white/85">{offer.body}</p>
        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          aria-label={`Découvrir : ${offer.title}`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0e0d10] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Découvrir <ArrowIcon />
        </button>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Pages « Découvrir » des offres sur mesure : une page plein écran par offre,
// ouverte par-dessus le site (hero + maquette, ce qui est inclus, déroulé).
// Pour la vidéo et le branding, le déroulé défile à l'horizontale pendant
// qu'on scrolle, avec une ligne centrale qui met l'étape en cours en avant.
// ---------------------------------------------------------------------------

type OfferIcon =
  | "phone" | "palette" | "refresh" | "leaf" | "star" | "card" | "qr" | "link"
  | "chart" | "layers" | "doc" | "box" | "calendar" | "pen" | "film" | "music"
  | "send" | "type" | "print" | "eye" | "screen";

const offerIconPaths: Record<OfferIcon, string> = {
  phone: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3 17h2",
  palette: "M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.9 1.2-1.8-.5-1-.2-2.2 1.1-2.2H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10ZM7.5 11.5h.01M10 7.5h.01M14.5 7.5h.01",
  refresh: "M20 11a8 8 0 0 0-14.6-4.5L4 8m0-4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16m0 4v-4h-4",
  leaf: "M5 19c6 0 14-4 14-15C9 4 5 9 5 15v4Zm0 0 7-7",
  star: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z",
  card: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 3h18M7 15h4",
  qr: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h2v2h-2v-2Zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2z",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  chart: "M4 20V10m6 10V4m6 16v-7m4 7H3",
  layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
  doc: "M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm7 0v5h5M9 13h6M9 17h4",
  box: "m21 8-9-5-9 5v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v8",
  calendar: "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm-2 5h18M8 3v4m8-4v4",
  pen: "m15 5 4 4L8 20H4v-4L15 5Zm-2 2 4 4",
  film: "M4 4h16v16H4V4Zm4 0v16m8-16v16M4 9h4m8 0h4M4 15h4m8 0h4",
  music: "M9 18V6l11-2v12M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  send: "M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z",
  type: "M5 6V4h14v2M12 4v16m-3 0h6",
  print: "M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7v-7Z",
  eye: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  screen: "M3 5h18v11H3V5Zm6 15h6m-3-4v4",
};

function OfferIconBadge({ name, tone = "dark" }: { name: OfferIcon; tone?: "dark" | "red" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${
        tone === "red" ? "bg-white text-[#e94445]" : "bg-[#e94445] text-white shadow-[0_10px_24px_rgba(233,68,69,0.35)]"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={offerIconPaths[name]} />
      </svg>
    </span>
  );
}

type OfferPage = {
  eyebrow: string;
  title: [string, string];
  lead: string;
  includedEyebrow: string;
  includedTitle: [string, string];
  included: { icon: OfferIcon; title: string; text: string }[];
  feature?: { title: string; text: string };
  highlight?: { big: string; text: string };
  processEyebrow: string;
  processTitle: [string, string];
  processLead: string;
  processMode: "grid" | "scroll";
  process: { title: string; text: string; icon?: OfferIcon; image?: string; videoBadge?: boolean }[];
};

const offerPages: Record<string, OfferPage> = {
  menu: {
    eyebrow: "Menu digital & QR codes",
    title: ["Menu", "digital."],
    lead: "Vos clients scannent un QR code et lisent votre carte sur leur téléphone. Un plat change ? Vous le modifiez en un clic, c'est en ligne tout de suite.",
    includedEyebrow: "Le menu digital",
    includedTitle: ["Ce qui est", "inclus."],
    feature: { title: "Votre carte en ligne", text: "Photos, descriptions, prix et allergènes, lisibles sur tous les téléphones." },
    included: [
      { icon: "palette", title: "À votre image", text: "Vos couleurs, votre logo, votre ambiance." },
      { icon: "refresh", title: "Modifiable à tout moment", text: "Plat du jour, prix, rupture : changé en quelques secondes." },
      { icon: "leaf", title: "Sans réimpression", text: "Moins de frais, moins de papier." },
      { icon: "star", title: "QR code d'avis Google", text: "Vos clients laissent un avis en un geste." },
      { icon: "card", title: "Carte de fidélité digitale", text: "Fini les cartes en carton perdues." },
      { icon: "qr", title: "QR codes pour vos supports", text: "Tables, vitrine, comptoir, flyers et sacs." },
      { icon: "phone", title: "Sans application", text: "Un scan suffit, sur iPhone comme sur Android." },
    ],
    highlight: { big: "QR", text: "À vos couleurs, avec votre logo." },
    processEyebrow: "Comment ça marche",
    processTitle: ["Du QR code", "à l'assiette."],
    processLead: "Simple pour vos clients, simple pour vous.",
    processMode: "grid",
    process: [
      { title: "Le QR code", text: "Sur la table, la vitrine ou le comptoir, à vos couleurs." },
      { title: "Le scan", text: "Votre client ouvre la carte sur son téléphone, sans application." },
      { title: "La carte", text: "Photos, descriptions, prix et menu du jour." },
      { title: "La mise à jour", text: "Un plat change ? C'est en ligne tout de suite." },
    ],
  },
  webapp: {
    eyebrow: "Web app sur mesure",
    title: ["Web app", "sur mesure."],
    lead: "Un outil à vos couleurs, pensé pour votre commerce : vos devis, vos stocks, vos réservations et vos chiffres réunis au même endroit.",
    includedEyebrow: "Pourquoi sur mesure",
    includedTitle: ["Tous vos outils", "en un seul."],
    feature: { title: "Votre outil, partout", text: "Au comptoir, en réserve ou chez vous : vos chiffres et vos tâches du jour, toujours à portée de main." },
    included: [
      { icon: "layers", title: "Tout au même endroit", text: "Un seul écran au lieu de dix fichiers et cinq onglets ouverts." },
      { icon: "link", title: "Reliée à vos logiciels", text: "Agenda, tableurs, caisse ou banque : les données arrivent toutes seules." },
      { icon: "phone", title: "Sur ordinateur et téléphone", text: "Au comptoir, en réserve ou chez vous, sans rien installer." },
      { icon: "chart", title: "Vos chiffres en clair", text: "Tableaux de bord et alertes pour décider plus vite." },
      { icon: "doc", title: "Devis et factures", text: "Créés depuis votre téléphone, envoyés en un clic." },
      { icon: "box", title: "Stocks et commandes", text: "Alertes de stock bas et commandes fournisseurs prêtes." },
      { icon: "calendar", title: "Réservations et commandes", text: "Centralisées et visibles d'un coup d'œil." },
    ],
    highlight: { big: "1", text: "seul outil, pensé pour votre façon de travailler." },
    processEyebrow: "Comment ça marche",
    processTitle: ["De votre quotidien", "à votre outil."],
    processLead: "On part de votre façon de travailler, pas d'un logiciel tout fait.",
    processMode: "grid",
    process: [
      { title: "On vous écoute", text: "Vos tâches, vos logiciels, ce qui vous fait perdre du temps." },
      { title: "La maquette", text: "Vous voyez et validez les écrans avant le développement." },
      { title: "On construit", text: "Votre outil, à vos couleurs, testé avec vos vraies données." },
      { title: "Mise en service", text: "On vous forme, et l'outil évolue avec votre activité." },
    ],
  },
  motion: {
    eyebrow: "Vidéo en motion design",
    title: ["Vidéo", "motion design."],
    lead: "30 à 60 secondes pour expliquer ce que vous faites, retenir l'attention et donner envie de vous contacter. Pour votre site, Instagram et vos publicités.",
    includedEyebrow: "Inclus",
    includedTitle: ["Une vidéo", "clé en main."],
    included: [
      { icon: "film", title: "30 à 60 secondes", text: "Le bon format pour votre site et vos réseaux." },
      { icon: "pen", title: "Script et storyboard", text: "Écrits pour vous, validés avant l'animation." },
      { icon: "music", title: "Musique et sound design", text: "Une bande-son qui porte votre message." },
      { icon: "screen", title: "Tous les formats", text: "16:9 pour le site, vertical pour Instagram." },
    ],
    processEyebrow: "Process motion design",
    processTitle: ["De votre brief", "à la livraison."],
    processLead: "Vous validez chaque étape : pas de surprise, pas de mauvaise direction.",
    processMode: "scroll",
    process: [
      { icon: "palette", image: `${import.meta.env.BASE_URL}process/m0.webp`, title: "Direction artistique", text: "Couleurs, typographies, style d'illustration : on définit l'univers de votre vidéo avant toute production." },
      { icon: "pen", image: `${import.meta.env.BASE_URL}process/m1.webp`, title: "Script", text: "On écrit ensemble le message, le ton et le déroulé. Chaque seconde a une raison d'être." },
      { icon: "layers", image: `${import.meta.env.BASE_URL}process/m2.webp`, title: "Storyboard", text: "Votre vidéo découpée image par image : vous validez le rythme et chaque plan avant l'animation." },
      { icon: "film", image: `${import.meta.env.BASE_URL}process/m3.webp`, title: "Animation", text: "Chaque seconde est animée à la main. Aucun template, aucun élément générique." },
      { icon: "music", image: `${import.meta.env.BASE_URL}process/m4.webp`, title: "Sound design", text: "Voix off, musique et effets sonores : le son fait la moitié de l'impact d'une vidéo." },
      { icon: "send", image: `${import.meta.env.BASE_URL}process/m5.webp`, videoBadge: true, title: "Livraison", text: "En HD ou 4K, déclinée en 16:9, vertical et carré selon vos usages." },
    ],
  },
  brand: {
    eyebrow: "Refonte graphique",
    title: ["Refonte", "graphique."],
    lead: "Logo, couleurs, typographies et supports : une identité cohérente partout, qui donne envie de pousser la porte.",
    includedEyebrow: "Inclus",
    includedTitle: ["Une identité", "complète."],
    included: [
      { icon: "pen", title: "Logo", text: "Version principale, icône et déclinaisons." },
      { icon: "palette", title: "Charte graphique", text: "Couleurs, typographies et règles d'usage." },
      { icon: "screen", title: "UI/UX", text: "Vos écrans et parcours, du site à l'application." },
      { icon: "print", title: "Supports imprimés", text: "Cartes de visite, flyers, menus, enseigne." },
    ],
    processEyebrow: "Process branding",
    processTitle: ["De votre histoire", "à votre identité."],
    processLead: "Vous validez chaque étape, de la première piste aux fichiers finaux.",
    processMode: "scroll",
    process: [
      { icon: "eye", title: "Brief et audit", text: "Votre histoire, vos clients, vos concurrents : on regarde ce qui marche et ce qui coince aujourd'hui." },
      { icon: "layers", title: "Moodboard", text: "Ambiances, couleurs et références : on fixe ensemble la direction avant de dessiner." },
      { icon: "pen", title: "Logo", text: "Plusieurs pistes, puis une seule affinée jusqu'au moindre détail, avec ses déclinaisons." },
      { icon: "palette", title: "Charte graphique", text: "Couleurs, typographies et règles d'usage, pour rester cohérent partout." },
      { icon: "print", title: "Déclinaisons", text: "Cartes de visite, flyers, menus, réseaux sociaux, enseigne : votre identité appliquée à vos supports." },
      { icon: "send", title: "Livraison", text: "Tous les fichiers sources et un guide simple pour les utiliser, chez vous ou chez l'imprimeur." },
    ],
  },
};

// Maquette : téléphone avec une carte de café.
function PhoneMenuMockup() {
  const items = [
    ["Brunch du week-end", "Œufs, avocat, pain au levain", "18,50 €"],
    ["Tartine avocat", "Citron, graines, piment doux", "9,50 €"],
    ["Granola maison", "Yaourt grec, fruits de saison", "7,00 €"],
    ["Cookie du jour", "Chocolat noir, fleur de sel", "3,20 €"],
  ];
  return (
    <div aria-hidden="true" className="relative mx-auto w-[260px] sm:w-[290px]">
      <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(233,68,69,0.35),transparent)] blur-2xl" />
      <div className="rounded-[44px] bg-[#0e0d10] p-2.5 shadow-[0_40px_90px_rgba(14,13,16,0.35)] ring-1 ring-black/10">
        <div className="relative overflow-hidden rounded-[36px] bg-[#fbf8f4]">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0e0d10]" />
          <div className="bg-[#e94445] px-5 pb-5 pt-10 text-center text-white">
            <p className="text-[19px] font-extrabold tracking-[-0.03em]">Le Comptoir Rose</p>
            <p className="mt-1 text-[10px] font-semibold text-white/80">Café · brunch · Toulouse</p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[9px] font-bold text-[#1f7a43]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22a35a]" /> Ouvert · 8 h – 16 h
            </span>
          </div>
          <div className="flex gap-1.5 px-4 pt-3">
            {["Brunch", "Boissons", "Desserts"].map((tab, i) => (
              <span key={tab} className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${i === 0 ? "bg-[#0e0d10] text-white" : "bg-[#0e0d10]/[0.06] text-[#0e0d10]/70"}`}>
                {tab}
              </span>
            ))}
          </div>
          <div className="px-4 pb-6 pt-2">
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#e94445]">Plat du jour</span>
              <span className="h-px flex-1 bg-[#e94445]/30" />
            </div>
            <div className="mt-2 overflow-hidden rounded-[14px]">
              <img src={cafePhoto} alt="" className="h-[86px] w-full object-cover" />
            </div>
            {items.map(([name, desc, price]) => (
              <div key={name} className="flex items-start justify-between gap-3 border-b border-dashed border-[#0e0d10]/10 py-2.5">
                <div>
                  <p className="text-[11px] font-bold text-[#0e0d10]">{name}</p>
                  <p className="mt-0.5 text-[9px] text-[#0e0d10]/55">{desc}</p>
                </div>
                <p className="text-[11px] font-extrabold text-[#0e0d10]">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -left-12 bottom-14 hidden rounded-[16px] bg-white p-2.5 shadow-[0_20px_50px_rgba(14,13,16,0.2)] sm:block">
        <svg viewBox="0 0 21 21" className="h-16 w-16 text-[#0e0d10]" shapeRendering="crispEdges">
          {[
            "M0 0h7v7H0zM14 0h7v7h-7zM0 14h7v7H0z",
          ].map((d) => <path key={d} d={d} fill="currentColor" />)}
          <path d="M1 1h5v5H1zM15 1h5v5h-5zM1 15h5v5H1z" fill="#fff" />
          <path d="M2 2h3v3H2zM16 2h3v3h-3zM2 16h3v3H2zM9 1h2v2H9zM8 4h2v2H8zM11 5h2v2h-2zM9 8h3v2H9zM14 9h2v2h-2zM17 8h3v2h-3zM8 12h2v2H8zM12 12h2v3h-2zM15 13h2v2h-2zM18 12h2v2h-2zM9 16h2v2H9zM12 17h3v2h-3zM16 16h2v2h-2zM18 18h2v2h-2zM1 9h2v2H1zM4 8h2v3H4z" fill="currentColor" />
        </svg>
        <p className="mt-1 text-center text-[9px] font-bold text-[#e94445]">Scannez-moi</p>
      </div>
    </div>
  );
}

// Maquette : tableau de bord de web app, sombre avec accents rouges.
function DashboardMockup() {
  const kpis = [
    ["CA du mois", "6 120 €", "+9 % vs octobre"],
    ["Devis en attente", "4", "1 à relancer"],
    ["Stock bas", "3 articles", "Commande prête"],
    ["Réservations", "12", "Aujourd'hui"],
  ];
  return (
    <div aria-hidden="true" className="relative">
      <div className="absolute -inset-8 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(233,68,69,0.3),transparent)] blur-2xl" />
      <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#121113] shadow-[0_40px_90px_rgba(14,13,16,0.35)]">
        <div className="flex">
          <div className="hidden w-[150px] shrink-0 border-r border-white/[0.07] p-3 sm:block">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e94445] text-[11px] font-extrabold text-white">C</span>
              <div>
                <p className="text-[10px] font-bold text-white">Comptoir Rose</p>
                <p className="text-[8px] text-white/45">Espace gérant</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-[#e94445] py-1.5 text-center text-[9px] font-bold text-white">+ Nouveau devis</div>
            {["Accueil", "Devis & factures", "Stocks", "Réservations", "Clients"].map((item, i) => (
              <p key={item} className={`mt-1.5 rounded-lg px-2 py-1.5 text-[9px] font-semibold ${i === 0 ? "bg-white/[0.08] text-white" : "text-white/55"}`}>
                {item}
              </p>
            ))}
          </div>
          <div className="min-w-0 flex-1 p-4">
            <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/40">Mardi 24 novembre</p>
            <p className="text-[15px] font-extrabold text-white">Bonjour Julie</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {kpis.map(([label, value, note], i) => (
                <div key={label} className={`rounded-xl border p-2.5 ${i === 0 ? "border-[#e94445]/50 bg-[#e94445]/15" : "border-white/[0.07] bg-white/[0.03]"}`}>
                  <p className="text-[8px] font-semibold text-white/55">{label}</p>
                  <p className="mt-1 text-[15px] font-extrabold tracking-[-0.02em] text-white">{value}</p>
                  <p className={`mt-0.5 text-[8px] font-semibold ${i === 0 ? "text-[#ff8a8b]" : "text-white/40"}`}>{note}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold text-white">Chiffre d'affaires</p>
                <span className="rounded-full bg-[#e94445] px-2 py-0.5 text-[8px] font-bold text-white">12 mois</span>
              </div>
              <svg viewBox="0 0 300 80" className="mt-1 h-[70px] w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dash-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#e94445" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#e94445" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 62 C30 55 45 40 70 44 S110 60 135 46 S175 22 200 30 S240 12 260 16 S290 8 300 6 V80 H0Z" fill="url(#dash-fill)" />
                <path d="M0 62 C30 55 45 40 70 44 S110 60 135 46 S175 22 200 30 S240 12 260 16 S290 8 300 6" fill="none" stroke="#e94445" strokeWidth="2.2" />
                <path d="M0 70 C40 66 80 64 120 62 S200 58 300 52" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OfferHeroVisual({ offer }: { offer: CustomOffer }) {
  if (offer.id === "menu") return <PhoneMenuMockup />;
  if (offer.id === "webapp") return <DashboardMockup />;
  if (offer.id === "motion")
    return (
      <div className="dark-island relative rounded-[26px] bg-[radial-gradient(110%_80%_at_50%_0%,#3a0d0f_0%,#160809_60%,#0c0506_100%)] p-5 shadow-[0_40px_90px_rgba(14,13,16,0.35)] sm:p-7">
        <div className="-mt-8">
          <MotionEditorUI />
        </div>
      </div>
    );
  return (
    <div className="relative overflow-hidden rounded-[26px] shadow-[0_40px_90px_rgba(14,13,16,0.3)]">
      <img src={offer.image} alt="" className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]" />
    </div>
  );
}

function OfferHeading({ eyebrow, title, lead, center = false }: { eyebrow: string; title: [string, string]; lead?: string; center?: boolean }) {
  return (
    <div className={center ? "flex flex-col items-center text-center" : ""}>
      <p className="scroll-reveal flex items-center gap-3 font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#e94445]">
        <span aria-hidden="true" className="h-px w-10 bg-[#e94445]" />
        {eyebrow}
      </p>
      <h3 className="mt-4 text-[38px] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#0e0d10] sm:text-[52px] lg:text-[60px]">
        <span className="scroll-reveal reveal-mask block">
          <span className="reveal-line block">{title[0]}</span>
        </span>
        <span className="scroll-reveal reveal-mask block">
          <span className="reveal-line block text-[#e94445]" style={{ transitionDelay: "120ms" }}>{title[1]}</span>
        </span>
      </h3>
      {lead && (
        <p className="scroll-reveal mt-4 max-w-[560px] font-mono text-[14px] font-semibold leading-[1.7] tracking-[-0.01em] text-[#0e0d10]/60 sm:text-[15px]">
          {lead}
        </p>
      )}
    </div>
  );
}

function OfferCTAs({ onClose, light = false }: { onClose: () => void; light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-14 flex-col items-center justify-center rounded-[16px] bg-[#e94445] px-6 leading-none text-white shadow-[0_14px_34px_rgba(233,68,69,0.35)] transition hover:-translate-y-0.5 hover:bg-[#d93a3b]"
      >
        <span className="text-[12px] font-semibold text-[rgba(255,255,255,0.88)]">Nous contacter</span>
        <span className="mt-1 text-[17px] font-extrabold tabular-nums">{whatsappDisplay}</span>
      </a>
      <a
        href="#contact-form"
        onClick={onClose}
        className={`inline-flex h-14 items-center gap-2 rounded-[16px] px-6 text-[15px] font-semibold transition hover:-translate-y-0.5 ${
          light ? "bg-white text-[#0e0d10]" : "bg-[#0e0d10] text-white"
        }`}
      >
        Être rappelé <ArrowIcon />
      </a>
    </div>
  );
}

// Déroulé horizontal piloté par le scroll vertical de la page d'offre.
function ScrollProcess({
  page,
  scroller,
  onClose,
}: {
  page: OfferPage;
  scroller: { current: HTMLDivElement | null };
  onClose: () => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const steps = page.process;

  useEffect(() => {
    const root = scroller.current;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!root || !section || !track) return;
    let frame = 0;
    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const last = track.children[steps.length - 1] as HTMLElement | undefined;
      if (!first || !last) return;
      const span = last.offsetLeft + last.offsetWidth / 2 - (first.offsetLeft + first.offsetWidth / 2);
      setDistance(span);
      return span;
    };
    let span = measure() ?? 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - root.clientHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      track.style.transform = `translate3d(${(-progress * span).toFixed(1)}px,0,0)`;
      setActive(Math.round(progress * (steps.length - 1)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      span = measure() ?? span;
      onScroll();
    };
    update();
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, [scroller, steps.length]);

  return (
    <section ref={sectionRef} className="relative" style={{ height: `calc(100dvh + ${Math.round(distance * 1.1)}px)` }}>
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden pb-6 pt-24">
        <div className="offer-process-head mx-auto w-full max-w-[1160px] px-5 sm:px-8">
          <OfferHeading eyebrow={page.processEyebrow} title={page.processTitle} lead={page.processLead} center />
        </div>
        <div className="relative mt-8 lg:mt-10">
          <div aria-hidden="true" className="pointer-events-none absolute -top-5 bottom-[-20px] left-1/2 z-20 w-px -translate-x-1/2 bg-[#0e0d10]">
            <span className="absolute -top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[8px] border-x-transparent border-t-[#0e0d10]" />
          </div>
          <div
            ref={trackRef}
            className="flex w-max gap-5 will-change-transform sm:gap-7"
            style={{ paddingLeft: "calc(50vw - min(240px, 42vw))", paddingRight: "calc(50vw - min(240px, 42vw))" }}
          >
            {steps.map((step, index) => {
              const isActive = index === active;
              return (
                <article
                  key={step.title}
                  className={`flex w-[min(480px,84vw)] shrink-0 flex-col rounded-[30px] border transition-[background-color,border-color,box-shadow,transform] duration-500 ${
                    step.image ? "p-4 sm:p-5" : "h-[min(420px,52dvh)] min-h-[330px] p-7 sm:p-10"
                  } ${
                    isActive
                      ? "scale-[1.02] border-[#e94445]/50 bg-[linear-gradient(160deg,#fff_0%,#ffe9e9_100%)] shadow-[0_24px_60px_rgba(233,68,69,0.28)]"
                      : "border-[#0e0d10]/[0.08] bg-white shadow-[0_14px_40px_rgba(14,13,16,0.06)]"
                  }`}
                >
                  {step.image ? (
                    <>
                      <div className="relative overflow-hidden rounded-[20px] bg-[#f4f2ef] ring-1 ring-[#0e0d10]/[0.06]">
                        {step.videoBadge && (
                          <span aria-hidden="true" className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#e94445] text-white shadow-[0_8px_20px_rgba(233,68,69,0.45)] ring-2 ring-white">
                            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
                              <path d="m15.5 10.5 6-3.5v10l-6-3.5" />
                            </svg>
                          </span>
                        )}
                        <img
                          src={step.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className={`aspect-[16/9] max-h-[30dvh] w-full object-cover transition-transform duration-700 ${isActive ? "scale-[1.04]" : ""}`}
                        />
                      </div>
                      <div className="px-2 pb-2 pt-5 sm:px-3">
                        <div className="flex items-end justify-between gap-4">
                          <h4 className="text-[26px] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#0e0d10] sm:text-[32px]">{step.title}</h4>
                          <span className="offer-outline-number shrink-0 text-[44px] font-extrabold leading-[0.8] tracking-[-0.04em] sm:text-[52px]">{String(index + 1).padStart(2, "0")}</span>
                        </div>
                        <p className="mt-3 text-[15px] leading-[1.6] text-[#0e0d10]/65 sm:text-[16px]">{step.text}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <div className={`transition-transform duration-500 ${isActive ? "scale-[1.35]" : "scale-125"}`} style={{ transformOrigin: "left top" }}>
                          {step.icon && <OfferIconBadge name={step.icon} />}
                        </div>
                        <span className="offer-outline-number text-[64px] font-extrabold leading-[0.8] tracking-[-0.04em] sm:text-[80px]">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <h4 className="mt-auto text-[30px] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#0e0d10] sm:text-[40px]">{step.title}</h4>
                      <p className="mt-3 text-[15px] leading-[1.6] text-[#0e0d10]/65 sm:text-[17px]">{step.text}</p>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>
        <div aria-hidden="true" className="mx-auto mt-8 flex gap-1.5">
          {steps.map((step, index) => (
            <span key={step.title} className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? "w-6 bg-[#e94445]" : "w-1.5 bg-[#0e0d10]/15"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomOfferModal({ offer, onClose }: { offer: CustomOffer; index: number; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const page = offerPages[offer.id];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, [onClose]);

  // Apparitions au scroll, à l'intérieur de la page d'offre.
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { root, threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [offer.id]);

  return createPortal(
    <div
      ref={scrollerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`offer-${offer.id}`}
      className="offer-page fixed inset-0 z-[110] overflow-y-auto overflow-x-hidden overscroll-contain bg-[#f6f5f2] font-ui text-[#0e0d10]"
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_50%_at_85%_0%,rgba(233,68,69,0.14),transparent_70%),radial-gradient(50%_40%_at_0%_60%,rgba(233,68,69,0.08),transparent_70%)]" />
      <div aria-hidden="true" className="offer-grid pointer-events-none fixed inset-0" />

      {/* Barre du haut */}
      <div className="sticky top-0 z-30 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between gap-3 rounded-[20px] border border-[#0e0d10]/[0.06] bg-white/80 px-3 shadow-[0_12px_32px_rgba(14,13,16,0.08)] backdrop-blur-xl sm:h-[68px] sm:px-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-[12px] px-3 py-2 text-[14px] font-semibold text-[#0e0d10] transition hover:bg-[#0e0d10]/[0.05]"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" /> Retour
          </button>
          <img src={upscreenLogoDark} alt="UpScreen" className="hidden h-auto w-[120px] sm:block" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0e0d10] text-white transition hover:bg-[#2a282d]"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-[1160px] items-center gap-14 px-5 pb-12 pt-12 sm:px-8 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-16">
          <div>
            <p className="scroll-reveal flex items-center gap-3 font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#e94445]">
              <span aria-hidden="true" className="h-px w-10 bg-[#e94445]" />
              {page.eyebrow}
            </p>
            <h2 id={`offer-${offer.id}`} className="mt-5 text-[44px] font-extrabold uppercase leading-[0.9] tracking-[-0.06em] sm:text-[72px] lg:text-[88px]">
              <span className="scroll-reveal reveal-mask -mt-[0.16em] block pt-[0.16em]">
                <span className="reveal-line block">{page.title[0]}</span>
              </span>
              <span className="scroll-reveal reveal-mask -mt-[0.16em] block pt-[0.16em]">
                <span className="reveal-line block text-[#e94445]" style={{ transitionDelay: "120ms" }}>{page.title[1]}</span>
              </span>
            </h2>
            <p className="scroll-reveal mt-6 max-w-[520px] text-[17px] leading-[1.6] text-[#0e0d10]/70 sm:text-[19px]" style={{ transitionDelay: "240ms" }}>
              {page.lead}
            </p>
            <div className="scroll-reveal mt-8" style={{ transitionDelay: "320ms" }}>
              <OfferCTAs onClose={onClose} />
            </div>
            <p className="scroll-reveal mt-5 font-mono text-[12px] font-semibold text-[#0e0d10]/45">Sur devis · devis gratuit sous 48 h</p>
          </div>
          <div className="scroll-reveal" style={{ transitionDelay: "200ms" }}>
            <OfferHeroVisual offer={offer} />
          </div>
        </section>

        {/* Déroulé horizontal (vidéo, branding) */}
        {page.processMode === "scroll" && <ScrollProcess page={page} scroller={scrollerRef} onClose={onClose} />}

        {/* Ce qui est inclus */}
        <section className="mx-auto w-full max-w-[1160px] px-5 py-12 sm:px-8 lg:py-16">
          <OfferHeading eyebrow={page.includedEyebrow} title={page.includedTitle} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.feature && (
              <article className="scroll-reveal dark-island relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[26px] bg-[#0b0a0b] p-7 text-white sm:col-span-2 lg:row-span-2">
                <img src={offer.image} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,10,11,0)_30%,rgba(10,10,11,0.9)_100%)]" />
                <h4 className="text-[28px] font-extrabold tracking-[-0.045em]">{page.feature.title}</h4>
                <p className="mt-2 max-w-[420px] text-[15px] leading-[1.6] text-white/75">{page.feature.text}</p>
              </article>
            )}
            {page.included.map((item) => (
              <article
                key={item.title}
                className="scroll-reveal dark-island tint-drift relative isolate flex min-h-[170px] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#0b0a0b] bg-[radial-gradient(110%_80%_at_100%_0%,rgba(233,68,69,0.28),transparent_60%)] p-6 text-white shadow-[0_24px_60px_rgba(14,13,16,0.16)]"
              >
                <OfferIconBadge name={item.icon} />
                <h4 className="mt-auto pt-8 text-[21px] font-extrabold leading-[1.1] tracking-[-0.04em]">{item.title}</h4>
                <p className="mt-2 text-[14px] leading-[1.55] text-white/70">{item.text}</p>
              </article>
            ))}
            {page.highlight && (
              <article className="scroll-reveal relative isolate flex min-h-[170px] flex-col overflow-hidden rounded-[26px] bg-[linear-gradient(140deg,#f0595a_0%,#e94445_45%,#b52a2c_100%)] p-6 text-white shadow-[0_24px_60px_rgba(233,68,69,0.35)]">
                <p className="text-[76px] font-extrabold leading-[0.85] tracking-[-0.06em]">{page.highlight.big}</p>
                <p className="mt-auto pt-6 text-[21px] font-extrabold leading-[1.1] tracking-[-0.04em]">{page.highlight.text}</p>
              </article>
            )}
          </div>
        </section>

        {/* Comment ça marche (menu, web app) */}
        {page.processMode === "grid" && (
          <section className="mx-auto w-full max-w-[1160px] px-5 py-12 sm:px-8 lg:py-16">
            <OfferHeading eyebrow={page.processEyebrow} title={page.processTitle} lead={page.processLead} />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.process.map((step, index) => (
                <article key={step.title} className="scroll-reveal rounded-[26px] border border-[#0e0d10]/[0.08] bg-white p-7 shadow-[0_14px_40px_rgba(14,13,16,0.06)]">
                  <p className="offer-outline-number text-[76px] font-extrabold leading-none tracking-[-0.04em]">{String(index + 1).padStart(2, "0")}</p>
                  <h4 className="mt-6 text-[22px] font-extrabold tracking-[-0.04em]">{step.title}</h4>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[#0e0d10]/65">{step.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Réalisations vidéo */}
        {offer.videos && (
          <section className="mx-auto w-full max-w-[1160px] px-5 py-12 sm:px-8 lg:py-16">
            <OfferHeading eyebrow="Réalisations" title={["Quelques vidéos", "qu'on a réalisées."]} />
            <div className="modal-videos offer-videos dark-island mt-12 grid gap-5 md:grid-cols-2">
              {motionVideos.map((video) => (
                <MotionVideoCard key={video.mediaId} {...video} />
              ))}
            </div>
          </section>
        )}

        {/* Appel à l'action final */}
        <section className="mx-auto w-full max-w-[1160px] px-5 pb-16 pt-6 sm:px-8">
          <div className="scroll-reveal dark-island relative isolate overflow-hidden rounded-[30px] bg-[#0b0a0b] px-7 py-12 text-white sm:px-12 sm:py-16">
            <PremiumBlobs />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#ff8a8b]">Devis gratuit sous 48 h</p>
                <h3 className="mt-3 text-[34px] font-extrabold leading-[1] tracking-[-0.05em] sm:text-[48px]">
                  Parlons de votre projet.
                </h3>
                <p className="mt-3 max-w-[460px] text-[15px] leading-[1.6] text-white/70">
                  On étudie votre besoin et on vous envoie une proposition claire, sans engagement.
                </p>
              </div>
              <OfferCTAs onClose={onClose} light />
            </div>
          </div>
        </section>
      </div>
    </div>,
    document.body,
  );
}

function CustomServices() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Progression du défilement (0 → 1) : les cartes montent une à une.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      grid.style.setProperty("--p", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = grid.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.75 + rect.height * 0.35)));
      grid.style.setProperty("--p", progress.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="sur-mesure"
      className="relative mx-auto w-full max-w-[1160px] scroll-mt-24 px-5 py-12 sm:px-8 md:py-16"
    >
      <SectionHeader
        eyebrow="Sur mesure"
        title="Besoin de plus"
        muted="qu'un site ?"
        aside={
          <AsideLead>
            Outils, vidéo ou identité visuelle pour votre commerce : on étudie votre projet et on vous envoie un devis gratuit sous 48 h.
          </AsideLead>
        }
      />

      <div ref={gridRef} className="stagger-grid mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {customOffers.map((offer, index) => (
          <CustomOfferCard key={offer.id} offer={offer} index={index} onOpen={() => setOpenIndex(index)} />
        ))}
      </div>

      <p className="mt-10 text-center font-mono text-[13px] font-semibold text-warm-gray">
        Un autre projet ?{" "}
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-4 hover:text-brand-deep">
          Nous contacter
        </a>{" "}
        ou{" "}
        <a href="#contact-form" className="text-brand underline underline-offset-4 hover:text-brand-deep">
          être rappelé
        </a>
        , on vous dit ce qui est possible.
      </p>

      {openIndex !== null && (
        <CustomOfferModal offer={customOffers[openIndex]} index={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className={`relative mx-auto w-full max-w-[960px] scroll-mt-24 px-5 sm:px-8 ${sectionY}`}>
      <SectionHeader eyebrow="FAQ" title="Vos questions." muted="Nos réponses." />
      <div className="mt-12 space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={`${faq.question}-${index}`}
            className="tint-drift dark-island scroll-reveal group overflow-hidden rounded-[20px] border border-white/10 bg-[#0b0a0b] bg-[radial-gradient(90%_140%_at_100%_0%,rgba(233,68,69,0.22),rgba(233,68,69,0.06)_45%,transparent_70%)] shadow-[0_16px_40px_rgba(14,13,16,0.15)] transition-colors open:border-brand/40 hover:border-white/25"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-5 text-base font-bold tracking-[-0.02em] text-white sm:px-7 sm:py-6 sm:text-lg [&::-webkit-details-marker]:hidden">
              <span className="flex-1">{faq.question}</span>
              <span className="relative h-5 w-5 shrink-0 text-brand">
                <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-300 group-open:rotate-90" />
              </span>
            </summary>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="border-t border-white/10 px-5 pb-6 pt-4 text-[16px] font-normal leading-[1.65] text-white/70 sm:px-7">
                  {faq.answer}
                </p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// Enquiries are emailed to the agency inbox through FormSubmit (formsubmit.co:
// free, no account). The very first submission from the live site makes
// FormSubmit send an "Activate Form" email to this address: click it once.
const contactEmail = "upscreenweb@gmail.com";
const formEndpoint = `https://formsubmit.co/ajax/${contactEmail}`;

type FormStatus = "idle" | "sending" | "sent" | "activate" | "error";

function ContactSection() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (field: string) => String(data.get(field) || "").trim();
    const nextErrors: Record<string, string> = {};

    ["name", "business", "industry", "email", "phone", "message"].forEach(
      (field) => {
        if (!String(data.get(field) || "").trim()) {
          nextErrors[field] = "Ce champ est obligatoire.";
        }
      },
    );

    const email = String(data.get("email") || "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Entrez une adresse email valide.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    const clearForm = () => {
      form.reset();
      const industry = form.elements.namedItem("industry") as HTMLSelectElement | null;
      if (industry) industry.value = "";
    };

    // Hidden field only bots fill in: pretend it worked, send nothing.
    if (value("_honey")) {
      clearForm();
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nouvelle demande de ${value("business")}`,
          _template: "table",
          _replyto: value("email"),
          _captcha: "false",
          Nom: value("name"),
          Entreprise: value("business"),
          Secteur: value("industry"),
          Email: value("email"),
          Téléphone: value("phone"),
          Message: value("message"),
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean | string; message?: string }
        | null;
      const succeeded = response.ok && (result?.success === true || result?.success === "true");

      if (succeeded) {
        clearForm();
        setStatus("sent");
      } else if (/activat/i.test(result?.message ?? "")) {
        setStatus("activate");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "mt-2 w-full rounded-xl border border-[#0e0d10]/10 bg-[#f4f3f0] px-4 py-3 text-base font-normal text-[#0e0d10] outline-none transition placeholder:text-[#0e0d10]/40 focus:border-[#e94445]/60 focus:bg-white";

  return (
    <section
      id="contact"
      className={`relative mx-auto w-full max-w-[1160px] scroll-mt-24 overflow-hidden px-5 sm:px-8 ${sectionY}`}
    >
      <div className="absolute left-1/2 top-1/2 -z-0 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/8 blur-[120px]" />
      <div className="relative z-10 isolate grid gap-10 overflow-hidden rounded-[28px] border border-white/10 dark-island bg-[#0b0a0b] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10 lg:p-14">
        <PremiumBlobs />
        <div className="absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(11,10,11,0.3),rgba(11,10,11,0.7))]" />
        <div className="flex flex-col justify-center">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mt-5 text-[40px] font-extrabold leading-[0.98] tracking-[-0.055em] text-off-white md:text-[56px] lg:text-[60px]">
            <span className="block">Votre maquette est gratuite.</span>
            <span className="block text-white/55">Parlons de votre commerce.</span>
          </h2>
          <p className="mt-6 max-w-[460px] font-mono text-[14px] font-semibold leading-[1.7] tracking-[-0.01em] text-white/80">
            Laissez vos coordonnées, on vous rappelle. En 20 minutes, on fait le point sur votre commerce,
            puis on vous envoie la maquette de votre futur site.
          </p>
          <ul className="mt-6 space-y-2.5">
            {["Appel gratuit de 20 minutes", "Maquette gratuite", "Vous ne payez que si elle vous plaît"].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[15px] font-medium text-off-white">
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-off-white text-brand">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Nous contacter sur WhatsApp au ${whatsappDisplay}`}
            className="mt-7 inline-flex h-14 w-fit flex-col items-center justify-center whitespace-nowrap rounded-[16px] bg-brand px-7 leading-none text-white shadow-[0_14px_34px_rgba(233,68,69,0.35)] transition hover:-translate-y-0.5 hover:bg-[#d93a3b]"
          >
            <span className="text-[12px] font-semibold text-[rgba(255,255,255,0.88)]">Nous contacter</span>
            <span className="mt-1 text-[18px] font-extrabold tabular-nums tracking-[-0.01em]">{whatsappDisplay}</span>
          </a>
          <p className="mt-4 font-mono text-[12px] font-semibold text-white/60">
            Ou écrivez-nous :{" "}
            <a href={`mailto:${contactEmail}`} className="text-off-white underline underline-offset-4 hover:text-brand-light">
              {contactEmail}
            </a>
          </p>
        </div>

        <form
          id="contact-form"
          onSubmit={handleSubmit}
          noValidate
          className="grid scroll-mt-28 gap-4 rounded-[22px] border border-white/80 bg-white p-5 text-[#0e0d10] shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:grid-cols-2 sm:p-7"
        >
          <label className="text-sm font-semibold text-[#0e0d10]">
            Nom
            <input name="name" placeholder="Votre nom" className={fieldClass} />
            {errors.name && (
              <span className="mt-1 block text-xs font-normal text-[#c62d30]">
                {errors.name}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-[#0e0d10]">
            Entreprise
            <input
              name="business"
              placeholder="Nom de votre entreprise"
              className={fieldClass}
            />
            {errors.business && (
              <span className="mt-1 block text-xs font-normal text-[#c62d30]">
                {errors.business}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-[#0e0d10]">
            Secteur
            <select name="industry" defaultValue="" className={fieldClass}>
              <option value="" disabled>
                Votre secteur
              </option>
              <option>Restaurant / Café</option>
              <option>Coiffure / Beauté</option>
              <option>Sport / Fitness</option>
              <option>Artisan / BTP</option>
              <option>Santé / Cabinet</option>
              <option>Commerce</option>
              <option>Autre</option>
            </select>
            {errors.industry && (
              <span className="mt-1 block text-xs font-normal text-[#c62d30]">
                {errors.industry}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-[#0e0d10]">
            Email
            <input
              name="email"
              type="email"
              placeholder="vous@entreprise.fr"
              className={fieldClass}
            />
            {errors.email && (
              <span className="mt-1 block text-xs font-normal text-[#c62d30]">
                {errors.email}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-[#0e0d10] sm:col-span-2">
            Téléphone
            <input
              name="phone"
              type="tel"
              placeholder="Votre numéro de téléphone"
              className={fieldClass}
            />
            {errors.phone && (
              <span className="mt-1 block text-xs font-normal text-[#c62d30]">
                {errors.phone}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-[#0e0d10] sm:col-span-2">
            Message
            <textarea
              name="message"
              rows={4}
              placeholder="Votre commerce, ce dont vous avez besoin…"
              className={fieldClass}
            />
            {errors.message && (
              <span className="mt-1 block text-xs font-normal text-[#c62d30]">
                {errors.message}
              </span>
            )}
          </label>
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-brand px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#d93a3b] disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? "Envoi…" : "Être rappelé"}
            </button>
            <p className="mt-3 text-center text-[12px] font-normal leading-[1.5] text-[#0e0d10]/55">
              Vos informations servent uniquement à vous recontacter.{" "}
              <button type="button" onClick={openLegal} className="underline underline-offset-2 hover:text-[#0e0d10]">
                Mentions légales et données personnelles
              </button>
            </p>
            <div aria-live="polite">
              {status === "sent" && (
                <p className="mt-3 text-sm font-normal text-[#0e0d10]">
                  Merci ! Votre message est bien parti. Nous revenons vers vous très vite.
                </p>
              )}
              {status === "activate" && (
                <p className="mt-3 text-sm font-normal text-[#c62d30]">
                  Presque fini : ouvrez l'email « Activate Form » envoyé à {contactEmail}, cliquez
                  sur le lien, puis renvoyez le formulaire.
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-sm font-normal text-[#c62d30]">
                  Votre message n'est pas parti. Réessayez, ou écrivez-nous à{" "}
                  <a href={`mailto:${contactEmail}`} className="underline underline-offset-2">
                    {contactEmail}
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const navLinks = [
    ["Réalisations", "#work"],
    ["Tarifs", "#pricing"],
    ["Sur mesure", "#sur-mesure"],
    ["Méthode", "#process"],
    ["FAQ", "#faq"],
  ];

  return (
    <footer className="dark-island border-t border-white/10 bg-[#0b0a0b] px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-[1160px] gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
        <a
          href="#home"
          aria-label="Accueil UpScreen"
            className="block w-[180px]"
        >
          <img
            src={upscreenLogo}
            alt="UpScreen"
              className="block h-auto w-full"
          />
        </a>
          <p className="mt-5 max-w-[440px] font-mono text-[13px] font-semibold leading-[1.65] tracking-[-0.01em] text-warm-gray">
            Agence web à Toulouse : sites web, visibilité locale et création
            de contenu pour les commerces et artisans de Toulouse et alentours.
          </p>
          <p className="mt-6 text-sm font-semibold text-off-white">
            Être vu. Être choisi.
          </p>
        </div>
        <div className="md:text-right">
        <nav
            aria-label="Navigation du pied de page"
            className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end"
        >
            {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
                className="text-sm font-normal text-warm-gray transition-colors hover:text-off-white"
            >
              {label}
            </a>
          ))}
        </nav>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:justify-end">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-normal text-warm-gray transition-colors hover:text-off-white"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
              {whatsappDisplay}
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="text-xs font-normal text-warm-gray transition-colors hover:text-off-white"
            >
              {contactEmail}
            </a>
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-normal text-off-white/35 md:justify-end">
            <span>© UpScreen · Martial Production</span>
            <a
              href="#mentions-legales"
              onClick={(event) => {
                event.preventDefault();
                openLegal();
              }}
              className="underline underline-offset-2 transition-colors hover:text-off-white"
            >
              Mentions légales
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Animated red light streaks drawn in pure CSS (see .bg-light-* in index.css).
// Replaces the former video loop: no media download, GPU-friendly transforms only.
function BackgroundLights() {
  return (
    <div aria-hidden="true" className="bg-lights pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-onyx">
      <span className="bg-light bg-light-a" />
      <span className="bg-light bg-light-b" />
      <span className="bg-light bg-light-c" />
      <span className="bg-light bg-light-d" />
      <div className="bg-grid absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,11,0.5)_80%)]" />
    </div>
  );
}

// Mentions légales : ouvertes depuis le footer, le formulaire ou l'adresse
// #mentions-legales. Éditeur : Martial Production (entreprise individuelle).
const legalEvent = "upscreen:open-legal";
function openLegal() {
  window.dispatchEvent(new Event(legalEvent));
}

const legalSections: { title: string; body: ReactNode }[] = [
  {
    title: "Éditeur du site",
    body: (
      <>
        <p>UpScreen est une marque exploitée par <strong>Martial Production</strong>, entreprise individuelle.</p>
        <p>Adresse : 5 rue du Ramounat, 31230 L'Isle-en-Dodon, France</p>
        <p>RCS : 920 083 094 R.C.S. Toulouse</p>
        <p>TVA non applicable, art. 293 B du CGI.</p>
        <p>Contact : {contactEmail} · {whatsappDisplay} · contact@martialproduction.fr</p>
        <p>Directeur de la publication : Martial Pico, pour Martial Production.</p>
      </>
    ),
  },
  {
    title: "Hébergement",
    body: (
      <p>
        Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis. Téléphone : +1 559 288 7060. Site : vercel.com
      </p>
    ),
  },
  {
    title: "Données personnelles",
    body: (
      <>
        <p>
          Les informations envoyées par le formulaire de contact (nom, entreprise, secteur, email, téléphone, message) servent
          uniquement à vous recontacter et à préparer votre maquette ou votre devis. Elles ne sont ni vendues ni cédées.
        </p>
        <p>
          Elles nous sont transmises par email via le service FormSubmit (formsubmit.co) et sont conservées au maximum 3 ans
          après notre dernier échange.
        </p>
        <p>
          Conformément au RGPD, vous pouvez y accéder, les faire rectifier ou supprimer, ou vous opposer à leur utilisation en
          écrivant à {contactEmail}. Vous pouvez aussi adresser une réclamation à la CNIL (cnil.fr).
        </p>
      </>
    ),
  },
  {
    title: "Cookies",
    body: (
      <p>
        Le site n'utilise ni cookie publicitaire ni outil de mesure d'audience. Les vidéos sont diffusées par Wistia, qui peut
        déposer des cookies techniques nécessaires à la lecture. Vous pouvez les refuser dans les réglages de votre navigateur.
      </p>
    ),
  },
  {
    title: "Propriété intellectuelle",
    body: (
      <p>
        Les textes, images, vidéos et le logo UpScreen sont protégés par le droit d'auteur et le droit des marques. Les sites
        présentés dans la rubrique Réalisations restent la propriété de leurs clients respectifs. Toute reproduction sans
        autorisation est interdite.
      </p>
    ),
  },
  {
    title: "Responsabilité et liens externes",
    body: (
      <p>
        Les informations du site sont données à titre indicatif et peuvent évoluer. Le site peut contenir des liens vers des
        sites externes sur lesquels nous n'avons aucun contrôle et dont nous ne sommes pas responsables.
      </p>
    ),
  },
  {
    title: "Droit applicable",
    body: <p>Le site est soumis au droit français. En cas de litige, les tribunaux français sont seuls compétents.</p>,
  },
];

function LegalModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(legalEvent, show);
    if (window.location.hash === "#mentions-legales") setOpen(true);
    return () => window.removeEventListener(legalEvent, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
      className="fixed inset-0 z-[200] flex items-end justify-center bg-[rgba(10,10,11,0.55)] p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative max-h-[88vh] w-full max-w-[720px] overflow-y-auto rounded-[24px] bg-[#ffffff] p-6 text-[#0e0d10] shadow-[0_40px_100px_rgba(0,0,0,0.35)] sm:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fermer"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f1ee] text-xl leading-none text-[#0e0d10] transition hover:bg-[#e6e4e0]"
        >
          ×
        </button>
        <h2 id="legal-title" className="pr-12 text-[30px] font-extrabold leading-none tracking-[-0.05em] sm:text-[38px]">
          Mentions légales
        </h2>
        <p className="mt-3 font-mono text-[12px] font-semibold text-[#0e0d10]/50">Mises à jour le 24/11/2026</p>
        <div className="mt-8 space-y-7">
          {legalSections.map((section) => (
            <section key={section.title}>
              <h3 className="text-[17px] font-extrabold tracking-[-0.02em]">{section.title}</h3>
              <div className="mt-2 space-y-1.5 text-[14px] leading-[1.65] text-[#0e0d10]/75">{section.body}</div>
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function App() {
  useEffect(() => {
    // Chaque bloc visible du site apparaît au défilement : on marque
    // automatiquement titres, textes, cartes, images, boutons et formulaires.
    // Le parcours suit l'ordre du document : un bloc marqué anime son contenu
    // d'un seul tenant, sans double animation à l'intérieur.
    const root = document.querySelector("main");
    const skip =
      "header, .scroll-reveal, .stagger-card, .reveal-mask, [data-step-index], .reviews-viewport, [role='dialog'], .bg-light, .premium-blobs";
    root
      ?.querySelectorAll<HTMLElement>(
        "section h1, section h2, section h3, section p, section ul, section ol, section article, section figure, section details, section form, section img, section video, section iframe, section a, section button, section [class*='rounded-['], section [class*='rounded-full'], footer > * > *",
      )
      .forEach((element) => {
        if (element.closest(skip)) return;
        if (element.closest("[aria-hidden='true']") && element.tagName !== "IMG") return;
        const style = getComputedStyle(element);
        if (style.position === "absolute" || style.position === "fixed" || style.display === "inline") return;
        if (element.getBoundingClientRect().height < 8) return;
        element.classList.add("scroll-reveal");
      });

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".scroll-reveal"),
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    // Seuls les titres et les visuels se replient quand ils quittent l'écran ;
    // le contenu à lire (textes, tarifs, FAQ, formulaire) reste en place.
    const exitSelector =
      ".reveal-mask, .reveal-pop, .title-frame, .step-row, figure, img, video, iframe, .reviews-viewport";

    const observer = new IntersectionObserver(
      (entries) => {
        // Apparition en descendant, disparition quand l'élément sort de
        // l'écran : il repart vers le bas en remontant la page, vers le haut
        // en la descendant, et rejoue son animation à son retour.
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add("is-visible");
            return;
          }
          if (!target.classList.contains("is-visible")) return;
          if (!target.matches(exitSelector)) {
            observer.unobserve(target);
            return;
          }
          const exitedTop = entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
          target.dataset.exit = exitedTop ? "top" : "bottom";
          target.classList.remove("is-visible");
        });
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={`relative isolate min-h-screen overflow-hidden bg-onyx font-ui ${lightTheme ? "theme-light" : ""}`}>
      <BackgroundLights />
      <Header />
      <Hero />
      <WorkGallery />
      <Services />
      <CustomServices />
      <Process />
      <Reviews />
      <FAQ />
      <ContactSection />
      <Footer />
      <LegalModal />
    </main>
  );
}
