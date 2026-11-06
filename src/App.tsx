import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import upscreenLogo from "./imports/upscreen-logo-reversed.svg";
import upscreenIcon from "./imports/upscreen-icon.svg";
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

type Plan = {
  label: string;
  price: string;
  features: string[];
};

type Service = {
  title: string;
  subtitle: string;
  billing: "Paiement unique" | "Mensuel";
  featured?: boolean;
  note: string;
  plans: Plan[];
};

// Prix en euros HT, au format français (espace insécable pour les milliers).
const prices = {
  landing: "890",
  landingVideo: "1 490",
  instagramEssentiel: "490",
  instagramCroissance: "790",
  care: "49",
};

const careNote = `+ ${prices.care} €/mois : hébergement, maintenance et SEO local`;

const services: Service[] = [
  {
    title: "Landing page",
    subtitle: "Enfin un site qui vend.",
    billing: "Paiement unique",
    note: careNote,
    plans: [
      {
        label: "Landing page",
        price: prices.landing,
        features: [
          "Site sur-mesure d'une seule page",
          "Pensé pour le mobile et rapide à charger",
          "Appel, réservation ou formulaire de contact",
          "Fiche Google Business + SEO local chaque mois",
          "Relié à votre Instagram et à votre Facebook",
        ],
      },
    ],
  },
  {
    title: "Landing page + Vidéo de présentation",
    subtitle: "Démarquez-vous dès la première seconde.",
    billing: "Paiement unique",
    featured: true,
    note: `${careNote} · 1er mois offert`,
    plans: [
      {
        label: "Landing page + Vidéo",
        price: prices.landingVideo,
        features: [
          "Tout ce que comprend la Landing page",
          "Vidéo de présentation en motion design de 30 à 45 s, sur-mesure",
          "Nous écrivons le script pour vous",
          "Version verticale courte pour Instagram",
          "Musique et sound design",
        ],
      },
    ],
  },
  {
    title: "Contenu Instagram",
    subtitle: "Restez visible, chaque semaine.",
    billing: "Mensuel",
    note: "Engagement de 3 mois minimum",
    plans: [
      {
        label: "Essentiel",
        price: prices.instagramEssentiel,
        features: [
          "8 posts par mois, dont 1 reel en motion design",
          "Calendrier éditorial mensuel",
          "Légendes rédigées pour vous",
          "Programmation des posts",
        ],
      },
      {
        label: "Croissance",
        price: prices.instagramCroissance,
        features: [
          "12 posts par mois",
          "2 reels en motion design par mois",
          "Calendrier éditorial mensuel",
          "Légendes rédigées pour vous",
          "Programmation des posts",
        ],
      },
    ],
  },
];

// Vrais avis clients, publiés avec leur accord, dans la langue où le client les
// a écrits. "person" est facultatif (prénom et rôle). Ajouter placeholder: true
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
      "We struggled to grow our online presence before. Now we're reaching a much wider audience and seeing real results for our business.",
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
      "Quentin is always available and very attentive to our needs. He's responsive, easy to communicate with, and genuinely takes the time to understand and support us throughout the project.",
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
    title: "Maquette offerte",
    body: "Nous concevons gratuitement une maquette de votre futur site. Vous ne continuez que si elle vous plaît.",
    highlights: ["gratuitement"],
    side: "right",
  },
  {
    title: "On construit",
    body: "Nous créons votre site et rédigeons tous les textes : pensé pour le mobile, rapide, avec votre formulaire de contact ou de réservation.",
    highlights: ["rédigeons tous les textes"],
    side: "left",
  },
  {
    title: "Google & SEO",
    body: "Nous créons votre fiche Google Business et optimisons votre site pour la recherche locale, pour que les clients du quartier vous trouvent sur Google et Maps.",
    highlights: ["fiche Google Business"],
    side: "right",
  },
  {
    title: "Mise en ligne",
    body: "Votre site est en ligne en 14 jours, prêt à vous apporter des appels, des réservations et des messages.",
    highlights: ["14 jours"],
    side: "left",
  },
];

const processIcons: Record<string, BrandIconName> = {
  "Appel découverte": "chat",
  "Maquette offerte": "mockup",
  "On construit": "build",
  "Google & SEO": "seo",
  "Mise en ligne": "launch",
};

const faqs = [
  {
    question: "Que proposez-vous exactement ?",
    answer:
      "Nous aidons les petites entreprises à être vues et choisies en ligne. Nous créons des landing pages sur-mesure, des vidéos de présentation en motion design, et nous gérons votre Instagram chaque mois. Choisissez un service ou combinez-les.",
  },
  {
    question: "À qui s'adressent vos services ?",
    answer:
      "Aux entreprises locales qui veulent être aussi convaincantes en ligne qu'en vrai : restaurants, cafés, salons, salles de sport, artisans, cabinets et commerces.",
  },
  {
    question: "Combien de temps faut-il ?",
    answer:
      "Votre landing page et votre vidéo sont prêtes en 14 jours environ, à partir du moment où nous recevons votre logo, vos photos et vos informations clés.",
  },
  {
    question: "Puis-je personnaliser mon projet ?",
    answer:
      "Bien sûr. Chaque page et chaque vidéo est conçue sur-mesure pour votre entreprise. Vous voyez d'abord une maquette gratuite, et deux séries de modifications sont incluses.",
  },
  {
    question: "Pouvez-vous relier mes réseaux sociaux à mon site ?",
    answer:
      "Oui. Nous ajoutons les liens vers votre Instagram et votre Facebook, et nous pouvons afficher vos derniers posts directement sur votre page.",
  },
  {
    question: "Que comprend l'offre hébergement et maintenance ?",
    answer: `Un hébergement rapide et sécurisé, les sauvegardes, les mises à jour, le SEO local chaque mois, le suivi de votre fiche Google Business et les petites modifications, pour ${prices.care} €/mois. Sans engagement, résiliable à tout moment.`,
  },
  {
    question: "Comment vous contacter ?",
    answer:
      "Réservez un appel découverte gratuit sur WhatsApp, ou laissez vos coordonnées dans le formulaire ci-dessous.",
  },
];

// Système visuel commun : cartes arrondies à 20 px, médias à 24 px, boutons en
// pilule, mêmes marges verticales pour toutes les sections.
const sectionY = "py-20 md:py-28";
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

// Titres de section. L'italique rouge est réservé au hero et au titre de
// contact : ici, il ne s'applique que si on le demande (emphasize > 0).
function Heading({
  children,
  emphasize = 0,
  tone = "dark",
}: {
  children: string;
  emphasize?: number;
  tone?: "dark" | "light";
}) {
  const words = children.trim().split(" ");
  const emphasizedWords =
    emphasize > 0 && words.length > 1 ? words.splice(-emphasize).join(" ") : null;

  return (
    <h2
      className={`font-ui text-center text-[32px] font-semibold leading-tight tracking-[-0.02em] md:text-[46px] ${
        tone === "light" ? "text-onyx" : "text-off-white"
      }`}
    >
      {emphasizedWords ? `${words.join(" ")} ` : children}
      {emphasizedWords && (
        <em className="font-display text-[1.15em] font-normal italic text-brand">
          {emphasizedWords}
        </em>
      )}
    </h2>
  );
}

// Numéro WhatsApp au format international, sans « + » ni espaces
// (ex. 33612345678 pour le 06 12 34 56 78). Tant qu'il est vide, les boutons
// WhatsApp n'apparaissent pas.
const whatsappNumber = "";
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
  const [scrolled, setScrolled] = useState(false);
  const links = [
    ["Services", "#services"],
    ["Méthode", "#process"],
    ["Réalisations", "#work"],
    ["Tarifs", "#pricing"],
    ["FAQ", "#faq"],
  ];

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300 ${
        scrolled
          ? "border-[#2A2A2E] bg-onyx/95 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-20 max-w-[1160px] items-center justify-between px-5 sm:px-8">
        <a
          href="#home"
          aria-label="Accueil UpScreen"
          onClick={() => setMenuOpen(false)}
          className="relative z-10 block w-[132px] shrink-0 sm:w-[148px]"
        >
          <img
            src={upscreenLogo}
            alt="UpScreen"
            className="block h-auto w-full drop-shadow-[0_0_14px_rgba(233,68,69,0.35)]"
          />
        </a>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 lg:flex"
        >
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-off-white/65 transition-colors hover:bg-off-white/6 hover:text-off-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Écrire sur WhatsApp"
              className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full border border-off-white/15 bg-off-white/5 px-3 text-sm font-semibold text-off-white transition-colors hover:border-off-white/30 hover:bg-off-white/10 xl:px-4"
            >
              <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
          )}
          <a
            href="#contact"
            className="inline-flex whitespace-nowrap rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-onyx transition-colors hover:bg-[#FF7A7B]"
          >
            Prendre rendez-vous
          </a>
        </div>

        <div className="relative z-10 flex items-center gap-2 lg:hidden">
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Écrire sur WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full border border-off-white/12 bg-off-white/5 text-[#25D366]"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          )}
        <button
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
          className="grid h-10 w-10 place-items-center rounded-full border border-off-white/12 bg-off-white/5 text-off-white"
        >
          <span className="relative h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-transform ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
        </div>

        <div
          className={`absolute left-4 right-4 top-[72px] overflow-hidden rounded-[20px] border border-[#2A2A2E] bg-onyx/95 p-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 lg:hidden ${
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-off-white/80 transition-colors hover:bg-off-white/5 hover:text-off-white"
            >
              {label}
              <span aria-hidden="true" className="text-brand">
                ↗
              </span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            className="mt-2 flex w-full items-center justify-center rounded-full bg-brand px-4 py-3.5 text-sm font-semibold text-onyx hover:bg-[#FF7A7B]"
          >
            Prendre rendez-vous
          </a>
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

function Hero() {
  return (
    <section
      id="home"
      className="scroll-reveal relative mx-auto grid w-full max-w-[1160px] scroll-mt-24 items-center gap-12 px-5 pb-20 pt-32 sm:px-8 md:pt-40 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:pb-28"
    >
      <div className="text-center lg:text-left">
        <h1 className="shadow-none">
          <span className="font-ui block text-base font-normal leading-none text-warm-gray lg:text-xl">
            Vos clients vous cherchent.
          </span>
          <span className="font-ui mt-4 block text-[40px] font-semibold leading-[1.04] tracking-[-0.025em] text-off-white sm:text-[52px] lg:text-[58px]">
            Encore faut-il{" "}
            <em className="glow-text font-display text-[1.12em] font-normal italic tracking-[-0.01em] text-brand">
              qu’ils vous trouvent.
            </em>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-[520px] text-[17px] font-normal leading-[1.6] text-warm-gray sm:text-lg lg:mx-0">
          Sites web, contenus Instagram et vidéos en motion design qui rendent les
          petites entreprises impossibles à ignorer.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <a
            href="#contact"
            className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-onyx transition-colors hover:bg-[#FF7A7B]"
          >
            Prendre rendez-vous
          </a>
          <a
            href="#pricing"
            className="rounded-full border border-[#2A2A2E] bg-graphite/70 px-7 py-3.5 text-sm font-semibold text-off-white transition-colors hover:border-off-white/25 hover:bg-graphite"
          >
            Voir nos offres
          </a>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-[640px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 rounded-[48px] bg-[radial-gradient(ellipse_at_center,rgba(233,68,69,0.18),transparent_70%)] blur-2xl"
        />
        <div
          aria-label="Vidéo de présentation"
          className="group relative overflow-hidden rounded-[24px] bg-onyx shadow-[0_30px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
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
    ["Page 3 de Google", "Personne ne vous trouve."],
    ["Site lent et dépassé", "Ils repartent en quelques secondes."],
    ["Dernier post : 2023", "Ils se demandent si vous êtes encore ouvert."],
  ];

  return (
    <section
      id="services"
      className={`scroll-reveal mx-auto w-full max-w-[1160px] scroll-mt-24 px-5 sm:px-8 ${sectionY}`}
    >
      <Heading>
        La plupart des entreprises perdent des clients avant même de dire bonjour.
      </Heading>
      <div className="mx-auto mt-12 grid max-w-[420px] grid-cols-1 gap-8 md:max-w-[1040px] md:grid-cols-3 md:gap-5 lg:gap-7">
        {problems.map(([title, description], index) => (
          <div key={title} className="relative flex flex-col">
            <ProblemVisual index={index} />
            <article className={`${darkCard} relative z-10 -mt-8 flex-1 overflow-hidden p-5 sm:p-6`}>
              <p className="inline-block whitespace-nowrap rounded-full border border-brand/35 bg-brand/12 px-3.5 py-1.5 text-[15px] font-semibold leading-none tracking-[-0.01em] text-brand-light">
                {title}
              </p>
              <p className="mt-4 text-sm font-normal leading-[1.6] text-warm-gray sm:text-[15px]">
                {description}
              </p>
            </article>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-[760px] text-center text-[17px] font-normal leading-[1.6] text-[#CFCCC7]">
        Alors ils choisissent votre concurrent. Pas parce qu'il est meilleur. Parce qu'il{" "}
        <span className="font-semibold text-off-white">présente mieux.</span>
      </p>
    </section>
  );
}

function PricingCard({ service }: { service: Service }) {
  const [planIndex, setPlanIndex] = useState(0);
  const plan = service.plans[planIndex];
  const featured = Boolean(service.featured);
  const t = featured
    ? {
        card: "border-[1.5px] border-brand bg-graphite text-off-white shadow-[0_30px_70px_rgba(0,0,0,0.45)] lg:-my-3 lg:min-h-[614px]",
        subtitle: "text-brand-light",
        bullet: "bg-brand",
        price: "text-brand",
        button: "border-brand bg-brand text-onyx hover:bg-[#FF7A7B]",
      }
    : {
        card: "border-white/[0.08] bg-graphite text-off-white hover:border-white/20",
        subtitle: "text-warm-gray",
        bullet: "bg-warm-gray/60",
        price: "text-off-white",
        button: "border-white/15 bg-transparent text-off-white hover:border-white/35",
      };
  const shared = {
    toggle: "border-white/[0.08] bg-onyx",
    toggleOff: "text-warm-gray hover:text-off-white",
    toggleOn: "bg-off-white text-onyx",
    list: "text-[#CFCCC7]",
    divider: "border-white/10",
    muted: "text-warm-gray",
  };

  return (
    <article
      className={`scroll-reveal group relative flex min-h-[590px] flex-col rounded-[20px] border p-7 transition duration-300 hover:-translate-y-1 sm:p-8 ${t.card}`}
    >
      {featured && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-brand px-5 py-2 text-xs font-semibold text-onyx">
          Le plus populaire
        </span>
      )}
      <h3 className="relative text-2xl font-semibold leading-[1.05] tracking-[-0.02em] md:min-h-[52px]">
        {service.title}
      </h3>
      <p className={`mt-3 text-sm font-semibold ${t.subtitle}`}>{service.subtitle}</p>
      {service.plans.length > 1 && (
        <div
          role="tablist"
          aria-label={`Formules ${service.title}`}
          className={`mt-6 grid grid-cols-2 gap-1 rounded-full border p-1 ${shared.toggle}`}
        >
          {service.plans.map((option, index) => (
            <button
              key={option.label}
              type="button"
              role="tab"
              aria-selected={index === planIndex}
              onClick={() => setPlanIndex(index)}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                index === planIndex ? shared.toggleOn : shared.toggleOff
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      <ul
        className={`space-y-3.5 pb-10 text-[15px] font-normal leading-[1.5] ${shared.list} ${
          service.plans.length > 1 ? "mt-6" : "mt-8"
        }`}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className={`mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full ${t.bullet}`} />
            {feature}
          </li>
        ))}
      </ul>
      <div className={`mt-auto border-t pt-7 ${shared.divider}`}>
        <p className={`text-xs font-semibold ${shared.muted}`}>{service.billing}</p>
        <p className="mt-3 flex items-baseline whitespace-nowrap">
          <span
            className={`font-display text-[52px] font-normal leading-none tracking-[-0.025em] sm:text-[58px] ${t.price}`}
          >
            {plan.price}
          </span>
          <span className={`ml-1.5 text-xl font-normal ${shared.muted}`}>€</span>
          {service.billing === "Mensuel" && (
            <span className={`ml-1 text-sm font-normal ${shared.muted}`}>/mois</span>
          )}
        </p>
        <p className={`mt-4 min-h-4 text-[11px] font-normal ${shared.muted}`}>{service.note}</p>
        <a
          href="#contact"
          className={`mt-7 flex w-full items-center justify-center rounded-full border px-5 py-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${t.button}`}
        >
          Commencer
        </a>
      </div>
    </article>
  );
}

function Services() {
  return (
    <section
      id="pricing"
      className={`scroll-reveal relative mx-auto w-full max-w-[1160px] scroll-mt-24 px-5 sm:px-8 ${sectionY}`}
    >
      <Heading>Des prix transparents, sans frais cachés.</Heading>
      <SectionLead>Le site se paie une seule fois. Le reste se règle au mois, sans surprise.</SectionLead>
      <div className="mx-auto mt-14 grid max-w-[480px] gap-6 lg:max-w-none lg:grid-cols-3">
        {services.map((service) => (
          <PricingCard key={service.title} service={service} />
        ))}
      </div>
      <p className="mt-8 text-center text-xs font-normal text-warm-gray">
        Prix HT · Maquette offerte
      </p>
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
      className={`scroll-reveal relative w-full scroll-mt-24 ${sectionY}`}
    >
      <div className="px-5 sm:px-8">
        <Heading tone="light">Ce que disent nos clients.</Heading>
      </div>
      <div className="reviews-viewport relative mt-12 overflow-hidden">
        <div
          className="reviews-track flex w-max gap-5 px-5"
          style={{ animationDuration: `${set.length * 10}s` }}
        >
          {loop.map((review, index) => (
            <figure
              key={index}
              aria-hidden={index >= reviews.length}
              className={`${lightCard} relative flex w-[300px] shrink-0 flex-col p-6 sm:w-[360px] sm:p-7`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  aria-hidden="true"
                  className="font-display -mt-1 text-[44px] leading-none text-brand"
                >
                  &ldquo;
                </span>
                <span className="flex items-center gap-2">
                  {review.placeholder && (
                    <span className="rounded-full border border-onyx/15 px-2.5 py-1 text-[10px] font-semibold text-onyx/50">
                      Exemple
                    </span>
                  )}
                  <span className="rounded-full bg-onyx/[0.06] px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-onyx/55">
                    {review.lang}
                  </span>
                </span>
              </div>
              <blockquote
                lang={review.lang.toLowerCase()}
                className="mt-2 flex-1 text-[15px] font-normal leading-[1.65] text-onyx/75"
              >
                {review.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-onyx/10 pt-4">
                <p className="text-sm font-semibold text-onyx">{review.business}</p>
                {review.person && (
                  <p className="mt-0.5 text-xs font-normal text-onyx/50">{review.person}</p>
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
  const panelClass = `step-panel relative z-0 aspect-[1.28/1] w-full origin-bottom overflow-hidden rounded-[20px] border border-onyx/[0.06] bg-white p-5 text-onyx shadow-[0_24px_50px_rgba(10,10,11,0.12)] transition-transform duration-700 ${
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

  if (title === "Maquette offerte") {
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
            <p className="text-[7px] font-semibold text-onyx/45">Calques</p>
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
          <p className="text-[11px] font-semibold">Production en cours</p>
          <p className="mt-1 text-[9px] font-semibold text-onyx/45">
            Espace projet UpScreen
          </p>
        </div>
        <span className="font-display text-2xl italic text-brand">68 %</span>
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
            <span className="ml-auto text-[8px] font-bold text-onyx/40">
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
type BrandIconName = "chat" | "mockup" | "build" | "seo" | "launch" | "growth";

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
  const [revealedSteps, setRevealedSteps] = useState(() =>
    processSteps.map(() => false),
  );
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setRevealedSteps(processSteps.map(() => true));
      setShowFinalStep(true);
      setScrollProgress(1);
      return;
    }

    let previousScrollY = window.scrollY;
    let isScrollingUp = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(
            (entry.target as HTMLElement).dataset.stepIndex,
          );

          if (!entry.isIntersecting) {
            const exitedBelow =
              entry.boundingClientRect.top > window.innerHeight * 0.52;

            if (isScrollingUp && exitedBelow) {
              setRevealedSteps((current) =>
                current.map((isRevealed, stepIndex) =>
                  stepIndex === index ? false : isRevealed,
                ),
              );

              if (index === processSteps.length - 1) {
                setShowFinalStep(false);
              }
            }
            return;
          }

          setRevealedSteps((current) =>
            current.map((isRevealed, stepIndex) =>
              stepIndex === index ? true : isRevealed,
            ),
          );

          if (index === processSteps.length - 1) {
            setShowFinalStep(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -42% 0px" },
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    let animationFrame = 0;
    const updateProgress = () => {
      const currentScrollY = window.scrollY;
      isScrollingUp = currentScrollY < previousScrollY;
      previousScrollY = currentScrollY;

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
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section id="process" className={`relative mx-auto w-full max-w-[1040px] scroll-mt-24 px-5 sm:px-8 ${sectionY}`}>
      <Heading tone="light">Comment ça marche</Heading>
      <SectionLead tone="light">Du premier appel à la mise en ligne, en 14 jours.</SectionLead>
      <div ref={timelineRef} className="relative mt-16">
        <div className="absolute bottom-8 left-4 top-8 w-px bg-onyx/10 sm:left-1/2 sm:-translate-x-1/2">
          <div
            aria-hidden="true"
            className="absolute inset-0 origin-top bg-gradient-to-b from-brand-light via-brand to-brand-deep will-change-transform"
            style={{ transform: `scaleY(${scrollProgress})` }}
          />
        </div>
        <div className="space-y-10 sm:space-y-0">
          {processSteps.map((step, index) => {
            const isLeft = step.side === "left";
            const isRevealed = revealedSteps[index];
            return (
              <div
                key={step.title}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                data-step-index={index}
                className={`relative grid min-h-[170px] grid-cols-[32px_1fr] gap-4 sm:grid-cols-[1fr_56px_1fr] sm:gap-3 ${
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
                  <div
                    className={`transition-[opacity,transform] duration-700 ease-out ${
                      isRevealed
                        ? "translate-y-0 opacity-100 sm:translate-x-0"
                        : isLeft
                          ? "translate-y-6 opacity-0 sm:-translate-x-8"
                          : "translate-y-6 opacity-0 sm:translate-x-8"
                    }`}
                  >
                    <StepVisual title={step.title} isLeft={isLeft} />
                  </div>
                  <article
                    className={`${lightCard} relative z-10 -mt-8 overflow-hidden p-5 transition-[opacity,transform] duration-700 ease-out sm:mx-4 sm:p-7 ${
                      isRevealed
                        ? "translate-y-0 opacity-100 sm:translate-x-0"
                        : isLeft
                          ? "translate-y-8 opacity-0 sm:-translate-x-8"
                          : "translate-y-8 opacity-0 sm:translate-x-8"
                    }`}
                  >
                    <div className="flex items-center justify-start gap-3">
                      <span className="text-xs font-semibold tracking-[0.12em] text-onyx/40">
                        0{index + 1}
                      </span>
                      <h3
                        className="inline-block whitespace-nowrap rounded-full border border-onyx/10 bg-onyx/[0.04] px-4 py-2 text-lg font-semibold leading-none tracking-[-0.02em] text-onyx sm:px-5 sm:text-2xl"
                      >
                        {step.title}
                      </h3>
                      <BrandIcon name={processIcons[step.title]} className="h-10 w-10 sm:h-11 sm:w-11" />
                    </div>
                    <p
                      className={`mt-5 text-[17px] font-normal leading-[1.6] text-onyx/70 ${
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
                <span
                  className={`col-start-1 row-start-1 mt-7 h-5 w-5 justify-self-center rounded-full border-4 border-off-white transition-all duration-500 sm:col-start-2 sm:h-6 sm:w-6 ${
                    isRevealed
                      ? "scale-100 bg-brand shadow-[0_4px_14px_rgba(233,68,69,0.45)] ring-1 ring-brand"
                      : "scale-75 bg-white ring-1 ring-onyx/15"
                  }`}
                />
              </div>
            );
          })}
        </div>
        <div
          className={`${lightCard} relative z-10 mx-auto mt-12 flex max-w-[700px] flex-col items-center px-6 py-7 text-center transition-[opacity,transform] duration-700 sm:px-10 ${
            showFinalStep ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs font-semibold tracking-[0.12em] text-onyx/40">
              06
            </span>
            <span className="inline-block text-xl font-semibold tracking-[-0.02em] text-onyx sm:text-3xl">
              On vous accompagne ensuite
            </span>
            <BrandIcon name="growth" className="h-10 w-10 sm:h-11 sm:w-11" />
          </div>
          <p className="mt-3 text-[17px] font-normal leading-[1.6] text-onyx/70">
            Hébergement, mises à jour et SEO local, gérés pour vous chaque mois.
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
              Salon de coiffure à Lyon 6e. Coupe, couleur et soins, sur rendez-vous.
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
              Studio de yoga à Bordeaux, tous niveaux. Petits groupes de 12 personnes maximum.
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

function WorkGallery() {
  return (
    <section id="work" className={`scroll-reveal relative mx-auto w-full max-w-[1120px] scroll-mt-24 px-5 sm:px-8 ${sectionY}`}>
      <Heading>Réalisations</Heading>
      <SectionLead>Des sites pensés pour les commerces de quartier, et des vidéos qui arrêtent le scroll.</SectionLead>

      <h3 className="mt-14 text-xl font-semibold text-off-white">Sites de démonstration</h3>
      <div className={`${darkCard} mt-6 grid items-center gap-8 p-6 md:p-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12`}>
        <div>
          <div className="flex items-center gap-3">
            <p className="text-2xl font-semibold tracking-[-0.02em] text-off-white">Le Comptoir Rose</p>
            <DemoChip />
          </div>
          <p className="mt-1 text-sm text-warm-gray">Café · Toulouse</p>
          <p className="mt-5 text-[17px] font-normal leading-[1.6] text-[#CFCCC7]">
            Le café qui suit tout notre parcours : l'appel, la maquette, la fiche Google, puis les
            premières réservations.
          </p>
          <ul className="mt-5 space-y-2.5 text-[15px] text-[#CFCCC7]">
            {["Réservation de table en un clic", "Carte et horaires toujours à jour", "Fiche Google reliée au site"].map(
              (point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {point}
                </li>
              ),
            )}
          </ul>
        </div>
        <CafeShowcase />
      </div>
      <div className="mt-6 grid gap-8 md:grid-cols-3 md:gap-6">
        <DemoSiteCard name="Atelier Lumière" trade="Salon de coiffure · Lyon">
          <DemoSalon />
        </DemoSiteCard>
        <DemoSiteCard name="Dupuy Plomberie" trade="Plombier chauffagiste · Toulouse">
          <DemoPlumber />
        </DemoSiteCard>
        <DemoSiteCard name="Studio Ananda" trade="Studio de yoga · Bordeaux">
          <DemoYoga />
        </DemoSiteCard>
      </div>
      <p className="mt-6 text-sm text-warm-gray">
        Des commerces fictifs, créés pour montrer notre style. La maquette du vôtre est offerte.
      </p>

      <h3 className="mt-16 text-xl font-semibold text-off-white">Vidéos en motion design</h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-7">
        {motionVideos.map((video) => (
          <MotionVideoCard key={video.mediaId} {...video} />
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className={`scroll-reveal relative mx-auto w-full max-w-[1000px] scroll-mt-24 px-5 sm:px-8 ${sectionY}`}>
      <Heading tone="light">Questions fréquentes</Heading>
      <div className="mt-12 space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={`${faq.question}-${index}`}
            className="scroll-reveal group overflow-hidden rounded-[20px] border border-onyx/10 bg-white transition-colors open:border-onyx/25 hover:border-onyx/25"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-5 text-base font-semibold text-onyx sm:px-7 sm:py-6 sm:text-lg [&::-webkit-details-marker]:hidden">
              <span className="flex-1">{faq.question}</span>
              <span className="relative h-5 w-5 shrink-0 text-brand">
                <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-300 group-open:rotate-90" />
              </span>
            </summary>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="border-t border-onyx/10 px-5 pb-6 pt-4 text-[17px] font-normal leading-[1.6] text-onyx/65 sm:px-7">
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
    "mt-2 w-full rounded-xl border border-[#2A2A2E] bg-onyx/70 px-4 py-3 text-base font-normal text-off-white outline-none transition placeholder:text-warm-gray/55 focus:border-off-white/30";

  return (
    <section
      id="contact"
      className={`relative mx-auto w-full max-w-[1160px] scroll-mt-24 overflow-hidden px-5 sm:px-8 ${sectionY}`}
    >
      <div className="absolute left-1/2 top-1/2 -z-0 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/8 blur-[120px]" />
      <div className="relative z-10 grid gap-10 rounded-[24px] border border-white/[0.08] bg-graphite p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10 lg:p-14">
        <div className="flex flex-col justify-center">
          <h2 className="text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-off-white md:text-[48px]">
            Arrêtez de perdre des clients face à des concurrents qui{" "}
            <em className="glow-text font-display text-[1.15em] font-normal italic text-brand">
              présentent mieux
            </em>{" "}
            en ligne.
          </h2>
          <p className="mt-6 max-w-[480px] text-[17px] font-normal leading-[1.6] text-warm-gray">
            Réservez votre appel découverte gratuit sur WhatsApp ou via le
            formulaire. Vous recevez ensuite une maquette gratuite, et vous ne
            continuez que si elle vous plaît.
          </p>
          <a
            href="#contact-form"
            className="mt-8 inline-flex w-fit rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-onyx transition-colors hover:bg-[#FF7A7B]"
          >
            Prendre rendez-vous
          </a>
        </div>

        <form
          id="contact-form"
          onSubmit={handleSubmit}
          noValidate
          className="grid gap-4 rounded-[20px] border border-white/[0.08] bg-onyx/60 p-5 sm:grid-cols-2 sm:p-6"
        >
          <label className="text-sm font-semibold text-off-white">
            Nom
            <input name="name" placeholder="Votre nom" className={fieldClass} />
            {errors.name && (
              <span className="mt-1 block text-xs font-normal text-amber-400">
                {errors.name}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-off-white">
            Entreprise
            <input
              name="business"
              placeholder="Nom de votre entreprise"
              className={fieldClass}
            />
            {errors.business && (
              <span className="mt-1 block text-xs font-normal text-amber-400">
                {errors.business}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-off-white">
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
              <span className="mt-1 block text-xs font-normal text-amber-400">
                {errors.industry}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-off-white">
            Email
            <input
              name="email"
              type="email"
              placeholder="vous@entreprise.fr"
              className={fieldClass}
            />
            {errors.email && (
              <span className="mt-1 block text-xs font-normal text-amber-400">
                {errors.email}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-off-white sm:col-span-2">
            Téléphone
            <input
              name="phone"
              type="tel"
              placeholder="Votre numéro de téléphone"
              className={fieldClass}
            />
            {errors.phone && (
              <span className="mt-1 block text-xs font-normal text-amber-400">
                {errors.phone}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-off-white sm:col-span-2">
            Message
            <textarea
              name="message"
              rows={4}
              placeholder="Parlez-nous de votre projet"
              className={fieldClass}
            />
            {errors.message && (
              <span className="mt-1 block text-xs font-normal text-amber-400">
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
              className="w-full rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-onyx transition-colors hover:bg-[#FF7A7B] disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? "Envoi…" : "Envoyer"}
            </button>
            <div aria-live="polite">
              {status === "sent" && (
                <p className="mt-3 text-sm font-normal text-off-white">
                  Merci ! Votre message est bien parti. Nous revenons vers vous très vite.
                </p>
              )}
              {status === "activate" && (
                <p className="mt-3 text-sm font-normal text-amber-400">
                  Presque fini : ouvrez l'email « Activate Form » envoyé à {contactEmail}, cliquez
                  sur le lien, puis renvoyez le formulaire.
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-sm font-normal text-amber-400">
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
    ["Services", "#services"],
    ["Méthode", "#process"],
    ["Réalisations", "#work"],
    ["Tarifs", "#pricing"],
    ["FAQ", "#faq"],
  ];

  return (
    <footer className="border-t border-[#2A2A2E] bg-onyx px-5 py-12 sm:px-8">
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
          <p className="mt-5 max-w-[440px] text-[15px] font-normal leading-[1.6] text-warm-gray">
            Sites web, contenus Instagram et vidéos en motion design pour les
            petites entreprises.
          </p>
          <p className="mt-6 text-sm font-semibold text-off-white">
            Be seen. Be chosen.
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
              href={`mailto:${contactEmail}`}
              className="text-xs font-normal text-warm-gray transition-colors hover:text-off-white"
            >
              {contactEmail}
            </a>
          </div>
          <p className="mt-6 text-xs font-normal text-off-white/35">
            © UpScreen
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
      <span className="bg-streak bg-streak-a" />
      <span className="bg-streak bg-streak-b" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,11,0.5)_80%)]" />
    </div>
  );
}

export default function App() {
  useEffect(() => {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-onyx font-ui">
      <BackgroundLights />
      <Header />
      <Hero />
      <ProblemSection />
      <div className="light-section relative bg-off-white">
        <Process />
      </div>
      <WorkGallery />
      <div className="light-section relative bg-off-white">
        <Reviews />
      </div>
      <Services />
      <div className="light-section relative bg-off-white">
        <FAQ />
      </div>
      <ContactSection />
      <Footer />
    </main>
  );
}
