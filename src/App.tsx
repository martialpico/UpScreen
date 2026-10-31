import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import upscreenLogo from "./imports/upscreen-logo-reversed.svg";
import upscreenIcon from "./imports/upscreen-icon.svg";
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
  billing: "One-off" | "Monthly";
  featured?: boolean;
  compareAt?: string;
  note: string;
  plans: Plan[];
};

const services: Service[] = [
  {
    title: "Landing page",
    subtitle: "SAY HELLO TO FINALLY SELLING.",
    billing: "One-off",
    note: "+ A$99/month hosting, care & local SEO",
    plans: [
      {
        label: "Landing page",
        price: "A$1,500",
        features: [
          "Custom one-page website",
          "Mobile-first & fast-loading",
          "Call, booking or contact form",
          "Google Business Profile + monthly local SEO",
          "Connected to your Instagram and Facebook",
        ],
      },
    ],
  },
  {
    title: "Landing page + Video presentation",
    subtitle: "STAND OUT FROM THE FIRST SECOND.",
    billing: "One-off",
    featured: true,
    compareAt: "A$3,000",
    note: "+ A$99/month hosting, care & local SEO · First month free",
    plans: [
      {
        label: "Landing page + Video",
        price: "A$2,500",
        features: [
          "Everything in Landing page",
          "Custom 30–45s presentation video in motion design",
          "We write the script for you",
          "Short vertical version for Instagram",
          "Music & sound design",
        ],
      },
    ],
  },
  {
    title: "Instagram content",
    subtitle: "STAY VISIBLE, EVERY WEEK.",
    billing: "Monthly",
    note: "3-month minimum",
    plans: [
      {
        label: "8 posts",
        price: "A$890",
        features: [
          "8 custom posts per month",
          "Monthly content calendar",
          "Designed & ready-to-post feed",
          "Captions written for you",
          "Reels ideas & content prompts",
        ],
      },
      {
        label: "12 posts + 2 reels",
        price: "A$1,400",
        features: [
          "12 custom posts per month",
          "2 motion design reels per month",
          "Monthly content calendar",
          "Designed & ready-to-post feed",
          "Captions written for you",
        ],
      },
    ],
  },
];

// Real client quotes, published with their agreement. Keep the wording as the
// client wrote it. "person" is optional (first name and role). Add
// placeholder: true to show a "Placeholder" badge on a draft review.
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

const processSteps = [
  {
    title: "Contact us",
    body: "Send us a message on WhatsApp. We get to know your business, your customers and your goals.",
    highlights: ["WhatsApp"],
    side: "left",
  },
  {
    title: "Free mockup",
    body: "We show you what your new page could look like. You only go ahead if you love it. If you choose the motion video, we also write the script of your video.",
    highlights: ["script of your video"],
    side: "right",
  },
  {
    title: "We build",
    body: "We design your page and write all the copy. We finalise your script, then create your custom motion design video.",
    highlights: ["custom motion design video"],
    side: "left",
  },
  {
    title: "You launch",
    body: "Your page goes live in 14 days with your motion video front and centre.",
    highlights: ["motion video"],
    side: "right",
  },
];

const processIcons: Record<string, BrandIconName> = {
  "Contact us": "chat",
  "Free mockup": "mockup",
  "We build": "build",
  "You launch": "launch",
};

const faqs = [
  {
    question: "What exactly do you offer?",
    answer:
      "We help small businesses get seen and chosen online. We build custom landing pages, create motion design presentation videos, and run your Instagram every month. Pick one service or combine them.",
  },
  {
    question: "Who are your services for?",
    answer:
      "Local businesses that want to look as good online as they are in real life: restaurants, cafés, salons, gyms, tradies, clinics and shops.",
  },
  {
    question: "How long does it take?",
    answer:
      "Your landing page and video are ready in about 14 days, from the moment we receive your logo, photos and key info.",
  },
  {
    question: "Can I customise my project?",
    answer:
      "Absolutely. Every page and video is designed from scratch for your business. You see a free mockup first, and two rounds of changes are included.",
  },
  {
    question: "Can you connect my social media to my website?",
    answer:
      "Yes. We add links to your Instagram and Facebook, and can display your latest posts directly on your page.",
  },
  {
    question: "What does Hosting & Care include?",
    answer:
      "Fast and secure hosting, backups, updates, monthly local SEO, Google Business Profile upkeep and small edits, for A$99/month. No lock-in, cancel anytime.",
  },
  {
    question: "How do I contact you?",
    answer:
      "Send us a message on WhatsApp, or leave your details in the contact form below.",
  },
];

function Heading({
  children,
  emphasize = 1,
  breakBeforeEmphasis = false,
}: {
  children: string;
  emphasize?: number;
  breakBeforeEmphasis?: boolean;
}) {
  const words = children.trim().split(" ");
  const emphasizedWords =
    words.length > 1 ? words.splice(-emphasize).join(" ") : null;

  return (
    <h2 className="font-ui text-center text-[32px] font-semibold leading-tight tracking-[-0.02em] text-off-white md:text-[48px]">
      {emphasizedWords ? `${words.join(" ")} ` : children}
      {emphasizedWords && breakBeforeEmphasis && <br />}
      {emphasizedWords && (
        <em className="font-display text-[1.15em] font-normal italic text-brand">
          {emphasizedWords}
        </em>
      )}
    </h2>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    ["Services", "#services"],
    ["How it works", "#process"],
    ["Work", "#work"],
    ["Pricing", "#pricing"],
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
          aria-label="UpScreen home"
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
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
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

        <a
          href="#contact"
          className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-onyx transition-colors hover:bg-[#FF7A7B] md:inline-flex"
        >
          Contact us
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
          className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-off-white/12 bg-off-white/5 text-off-white md:hidden"
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

        <div
          className={`absolute left-4 right-4 top-[72px] overflow-hidden rounded-[22px] border border-[#2A2A2E] bg-onyx/95 p-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 md:hidden ${
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
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-off-white/80 transition-colors hover:bg-off-white/5 hover:text-off-white"
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
            className="mt-2 flex w-full items-center justify-center rounded-2xl bg-brand px-4 py-3.5 text-sm font-semibold text-onyx hover:bg-[#FF7A7B]"
          >
            Contact us
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="scroll-reveal relative mx-auto w-full max-w-[1040px] scroll-mt-24 px-5 pb-[60px] pt-36 sm:px-8 md:pt-44">
      <h1 className="mx-auto max-w-[900px] text-center shadow-none">
        <span className="font-ui block text-base font-normal leading-none tracking-[0.01em] text-warm-gray lg:text-[22px]">
          Your customers are searching.
        </span>
        <span className="font-ui mt-[10px] flex flex-wrap items-baseline justify-center gap-x-[0.2em] text-[40px] font-semibold leading-none tracking-[-0.025em] text-off-white lg:text-[64px]">
          <span>Can they</span>
          <em className="font-display shrink-0 text-[46px] font-normal italic tracking-[-0.01em] text-brand lg:text-[74px]">
            find you?
          </em>
        </span>
      </h1>
      <p className="mx-auto mt-7 max-w-[560px] text-center text-[17px] font-normal leading-[1.6] text-warm-gray sm:text-lg">
        Websites, Instagram content and motion videos that make small businesses
        impossible to ignore.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#contact"
          className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-onyx transition-colors hover:bg-[#FF7A7B]"
        >
          Contact us
        </a>
        <a
          href="#pricing"
          className="rounded-full border border-[#2A2A2E] bg-graphite/70 px-7 py-3.5 text-sm font-semibold text-off-white transition-colors hover:border-off-white/25 hover:bg-graphite"
        >
          See our plans
        </a>
      </div>
      <div className="scroll-reveal relative mt-10">
        {/* Soft red glow behind the video so it sits in the page, no frame. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 -inset-y-6 rounded-[48px] bg-[radial-gradient(ellipse_at_center,rgba(233,68,69,0.2),transparent_68%)] blur-2xl"
        />
        <div
          aria-label="Featured presentation video"
          className="group relative overflow-hidden rounded-[18px] bg-onyx shadow-[0_30px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10 sm:rounded-[28px]"
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
          aria-label={isFullscreen ? "Exit full screen" : "Watch in full screen"}
          title={isFullscreen ? "Exit full screen" : "Full screen"}
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
          title="UpScreen presentation video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play the UpScreen presentation video"
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
              Watch · 1:18
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
    { name: "Bean There Café", url: "beanthere.com.au", rating: "4.8", reviews: "312", hours: "Closes 4 pm", tone: "#B9733F" },
    { name: "The Daily Grind", url: "dailygrind.com.au", rating: "4.7", reviews: "208", hours: "Closes 5 pm", tone: "#3F7A63" },
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
            best café near me
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
                {result.name.replace("The ", "")[0]}
              </span>
              <span className="truncate text-onyx/45" style={{ fontSize: u(7) }}>
                {result.url}
              </span>
            </div>
            <p className="truncate font-semibold text-[#1A0DAB]" style={{ fontSize: u(10.5), lineHeight: 1.25, marginTop: u(3) }}>
              {result.name}, best coffee nearby
            </p>
            <div className="flex items-center text-onyx/50" style={{ gap: u(3), fontSize: u(7.5), marginTop: u(2.5) }}>
              <span className="font-semibold text-onyx/70">{result.rating}</span>
              <Stars size={7} />
              <span>({result.reviews})</span>
              <span className="font-semibold text-[#188038]">Open</span>
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
          You're on page 3
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
          <span className="truncate font-semibold">yourbusiness.com.au</span>
        </span>
        <svg viewBox="0 0 24 24" className="absolute drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]" style={{ width: u(13), height: u(13), left: u(9), top: u(9) }}>
          <path d="M5 3l14 8-6.2 1.6L10 19z" fill="#0A0A0B" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="flex items-baseline justify-between" style={{ marginTop: u(8), fontFamily: mockSerif }}>
        <span className="font-bold text-onyx/70" style={{ fontSize: u(12) }}>
          Your Business
        </span>
        <span className="text-[#1A0DAB] underline" style={{ fontSize: u(7.5) }}>
          Home | Menu | Contact
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
          Welcome to our website!
        </span>
      </div>

      <div>
        <div className="flex items-center justify-between font-semibold" style={{ fontSize: u(8.5), marginBottom: u(4) }}>
          <span className="text-onyx/50">Still loading…</span>
          <span className="text-brand">8.4s</span>
        </div>
        <div className="overflow-hidden rounded-full bg-onyx/8" style={{ height: u(4) }}>
          <span className="mock-load block h-full w-full origin-left rounded-full bg-brand" />
        </div>
      </div>
    </div>
  );
}

// A sleeping Instagram profile and a customer question nobody answered.
function DeadFeedWidget() {
  const tiles = ["#CBB8A4", "#B9C2B4", "#D2C3B5", "#C4BCB3", "#BDB6AE", "#CFC6BC"];

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center" style={{ gap: u(9) }}>
        <span
          className="grid shrink-0 place-items-center rounded-full border border-onyx/15 bg-onyx/[0.07] font-bold text-onyx/40"
          style={{ width: u(28), height: u(28), fontSize: u(8.5) }}
        >
          YB
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-none text-onyx/85" style={{ fontSize: u(9.5) }}>
            yourbusiness
          </p>
          <div className="flex justify-between leading-none" style={{ marginTop: u(5) }}>
            {[
              ["12", "posts"],
              ["87", "followers"],
              ["64", "following"],
            ].map(([value, label]) => (
              <span key={label} style={{ fontSize: u(7) }}>
                <b className="font-bold text-onyx/80">{value}</b> <span className="text-onyx/45">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-3" style={{ gap: u(3), marginTop: u(9) }}>
        {tiles.map((tone, tile) => (
          <span
            key={tone}
            className="relative overflow-hidden"
            style={{
              borderRadius: u(4),
              background: `linear-gradient(150deg, ${tone}, color-mix(in srgb, ${tone} 70%, #8C8A87))`,
              opacity: 0.55,
            }}
          >
            {tile === 0 && (
              <span
                className="absolute rounded-full bg-white font-bold text-onyx/70"
                style={{ left: u(4), top: u(4), fontSize: u(6.5), padding: `${u(1.5)} ${u(4)}` }}
              >
                Mar 2023
              </span>
            )}
          </span>
        ))}
      </div>

      <div
        className="absolute flex items-center border border-onyx/8 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
        style={{ left: u(10), right: u(10), bottom: u(6), borderRadius: u(10), padding: `${u(6)} ${u(8)}`, gap: u(6) }}
      >
        <span
          className="grid shrink-0 place-items-center rounded-full font-bold text-white"
          style={{ width: u(15), height: u(15), fontSize: u(7), background: "linear-gradient(135deg,#F58529,#DD2A7B)" }}
        >
          S
        </span>
        <div className="min-w-0">
          <p className="truncate text-onyx/80" style={{ fontSize: u(8.5) }}>
            <b className="font-semibold">sarah.m</b> Are you still open?
          </p>
          <p className="font-semibold text-brand" style={{ fontSize: u(6.5), marginTop: u(1.5) }}>
            3 weeks ago · No reply
          </p>
        </div>
      </div>
    </div>
  );
}

function ProblemSection() {
  const problems = [
    ["Page 3 of Google", "Nobody finds you."],
    ["Slow, outdated site", "They leave in seconds."],
    ["Last post: 2023", "They wonder if you're still open."],
  ];

  return (
    <section
      id="services"
      className="scroll-reveal mx-auto w-full max-w-[1160px] scroll-mt-24 px-5 py-[60px] sm:px-8"
    >
      <Heading emphasize={5} breakBeforeEmphasis>
        Most businesses lose customers before they even say hello.
      </Heading>
      <div className="mx-auto mt-12 grid max-w-[420px] grid-cols-1 gap-8 md:max-w-[1040px] md:grid-cols-3 md:gap-5 lg:gap-7">
        {problems.map(([title, description], index) => (
          <div key={title} className="relative flex flex-col">
            <ProblemVisual index={index} />
            <article className="glass-panel process-glass problem-glass relative z-10 -mt-8 flex-1 overflow-hidden rounded-[22px] p-5 sm:p-6">
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
        So they choose your competitor. Not because they're better. Because they{" "}
        <em className="font-display text-[1.15em] font-normal italic text-brand">
          look better.
        </em>
      </p>
    </section>
  );
}

function PricingCard({ service }: { service: Service }) {
  const [planIndex, setPlanIndex] = useState(0);
  const plan = service.plans[planIndex];
  const featured = Boolean(service.featured);

  return (
    <article
      className={`scroll-reveal group relative flex min-h-[590px] flex-col rounded-[28px] border bg-graphite/85 p-7 text-off-white backdrop-blur-2xl transition duration-300 hover:-translate-y-1 sm:p-8 ${
        featured
          ? "border-[1.5px] border-brand shadow-[0_28px_80px_rgba(0,0,0,0.48),0_0_32px_rgba(233,68,69,0.12)] md:-my-3 md:min-h-[614px]"
          : "border-[#2A2A2E] hover:border-off-white/20"
      }`}
    >
      {featured && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-brand px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-onyx sm:text-xs">
          Most popular
        </span>
      )}
      <h3 className="relative text-2xl font-semibold leading-[1.05] tracking-[-0.02em] md:min-h-[52px]">
        {service.title}
      </h3>
      <p
        className={`mt-3 text-xs font-semibold uppercase tracking-[0.08em] ${
          featured ? "text-brand-light" : "text-warm-gray"
        }`}
      >
        {service.subtitle}
      </p>
      {service.plans.length > 1 && (
        <div
          role="tablist"
          aria-label={`${service.title} plans`}
          className="mt-6 grid grid-cols-2 gap-1 rounded-full border border-[#2A2A2E] bg-onyx/60 p-1"
        >
          {service.plans.map((option, index) => (
            <button
              key={option.label}
              type="button"
              role="tab"
              aria-selected={index === planIndex}
              onClick={() => setPlanIndex(index)}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                index === planIndex
                  ? "bg-off-white text-onyx"
                  : "text-warm-gray hover:text-off-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      <ul
        className={`space-y-3.5 pb-10 text-[15px] font-normal leading-[1.5] text-[#CFCCC7] ${
          service.plans.length > 1 ? "mt-6" : "mt-8"
        }`}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span
              className={`mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full ${
                featured ? "bg-brand" : "bg-warm-gray/55"
              }`}
            />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto border-t border-off-white/10 pt-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-warm-gray">
          {service.billing}
          {service.compareAt && (
            <>
              {" · "}
              <span className="line-through decoration-warm-gray/70">
                {service.compareAt}
              </span>{" "}
              <span className="text-brand-light">
                Save A$
                {(
                  Number(service.compareAt.replace(/\D/g, "")) -
                  Number(plan.price.replace(/\D/g, ""))
                ).toLocaleString("en-AU")}
              </span>
            </>
          )}
        </p>
        <p className="mt-3 flex items-baseline whitespace-nowrap">
          <span className="mr-1 text-base font-normal text-warm-gray">A$</span>
          <span
            className={`font-display text-[52px] font-normal leading-none tracking-[-0.025em] sm:text-[58px] ${
              featured ? "text-brand" : "text-off-white"
            }`}
          >
            {plan.price.replace("A$", "")}
          </span>
          {service.billing === "Monthly" && (
            <span className="ml-1 text-sm font-normal text-warm-gray">
              /month
            </span>
          )}
        </p>
        <p className="mt-4 min-h-4 text-[11px] font-normal text-warm-gray">
          {service.note}
        </p>
        <a
          href="#contact"
          className={`mt-7 flex w-full items-center justify-center rounded-2xl border px-5 py-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${
            featured
              ? "border-brand bg-brand text-onyx hover:bg-[#FF7A7B]"
              : "border-[#2A2A2E] bg-transparent text-off-white hover:border-off-white/25"
          }`}
        >
          Get started
        </a>
      </div>
    </article>
  );
}

function Services() {
  return (
    <section
      id="pricing"
      className="scroll-reveal relative mx-auto w-full max-w-[1160px] scroll-mt-24 px-5 py-[60px] sm:px-8"
    >
      <Heading>Clear pricing. No hidden fees.</Heading>
      <div className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
        {services.map((service) => (
          <PricingCard key={service.title} service={service} />
        ))}
      </div>
      <p className="mt-8 text-center text-xs font-normal text-warm-gray">
        AUD, excl. GST · Free mockup
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
      className="scroll-reveal relative w-full scroll-mt-24 py-[60px]"
    >
      <div className="px-5 sm:px-8">
        <Heading>What our clients say.</Heading>
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
              className="glass-panel relative flex w-[300px] shrink-0 flex-col rounded-[24px] p-6 sm:w-[360px] sm:p-7"
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
                    <span className="rounded-full border border-[#2A2A2E] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-warm-gray">
                      Placeholder
                    </span>
                  )}
                  <span className="rounded-full bg-off-white/8 px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-off-white/70">
                    {review.lang}
                  </span>
                </span>
              </div>
              <blockquote
                lang={review.lang.toLowerCase()}
                className="mt-2 flex-1 text-[15px] font-normal leading-[1.65] text-[#CFCCC7]"
              >
                {review.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-off-white/10 pt-4">
                <p className="text-sm font-semibold text-off-white">{review.business}</p>
                {review.person && (
                  <p className="mt-0.5 text-xs font-normal text-warm-gray">{review.person}</p>
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
  const panelClass = `step-panel relative z-0 aspect-[1.28/1] w-full origin-bottom overflow-hidden rounded-[24px] border border-white/80 bg-off-white p-5 text-onyx shadow-[0_25px_60px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.9)] transition-transform duration-700 ${
    isLeft
      ? "step-panel-float-left"
      : "step-panel-float-right"
  }`;

  if (title === "Contact us") {
    // A WhatsApp-style conversation: a café owner asks, UpScreen answers.
    return (
      <div className={panelClass.replace(" p-5 ", " p-0 ")}>
        <div className="flex items-center gap-2.5 border-b border-onyx/8 bg-white px-4 py-2.5">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 text-onyx/45" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 3 5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <img src={upscreenIcon} alt="" className="h-8 w-8 rounded-full" />
          <div className="min-w-0 leading-tight">
            <p className="text-xs font-semibold text-onyx/90">UpScreen</p>
            <p className="text-[9px] font-semibold text-[#1DAA61]">online</p>
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
            Today
          </span>
          <div className="ml-auto max-w-[78%] rounded-xl rounded-tr-sm bg-[#D9FDD3] px-2.5 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
            <p className="text-[10.5px] leading-[1.35] text-onyx/85">
              Hi! I run a café in Bondi. Can you help us get more customers?
            </p>
            <p className="mt-0.5 flex items-center justify-end gap-0.5 text-[8px] text-onyx/45">
              9:41
              <svg aria-hidden="true" viewBox="0 0 18 12" className="h-2.5 w-3.5" fill="none" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m1.5 6.5 3 3 6-7M7.5 9.5l6-7" />
              </svg>
            </p>
          </div>
          <div className="mr-auto max-w-[80%] rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
            <p className="text-[10.5px] leading-[1.35] text-onyx/85">
              Hi Sarah! Of course. Tell us about your café and we'll send you a{" "}
              <span className="font-semibold text-brand">free mockup</span>.
            </p>
            <p className="mt-0.5 text-right text-[8px] text-onyx/45">9:42</p>
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

  if (title === "Free mockup") {
    return (
      <div className={panelClass}>
        <div className="flex items-center border-b border-onyx/10 pb-2">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-onyx/10" />
            <span className="h-2 w-2 rounded-full bg-onyx/10" />
            <span className="h-2 w-2 rounded-full bg-onyx/10" />
          </div>
          <p className="mx-auto pr-6 text-[9px] font-semibold">
            UpScreen / Site v2
          </p>
          <span className="rounded-md bg-brand px-2 py-1 text-[7px] font-semibold text-white">
            Share
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-md bg-[#f1f3f8] px-2 py-1">
          <span className="text-[8px] font-semibold text-onyx/55">↖</span>
          <span className="h-3 w-px bg-onyx/10" />
          <span className="text-[8px] font-semibold text-onyx/55">□</span>
          <span className="text-[9px] font-semibold text-onyx/55">+</span>
          <span className="ml-auto text-[7px] font-bold text-onyx/40">
            Desktop · 1440
          </span>
        </div>
        <div className="mt-2 grid h-[65%] grid-cols-[24%_1fr] overflow-hidden rounded-xl border border-onyx/8 bg-[#f1f3f8]">
          <div className="border-r border-onyx/8 bg-white/80 p-2">
            <p className="text-[7px] font-semibold uppercase tracking-wider text-onyx/50">
              Layers
            </p>
            <div className="mt-1.5 space-y-1">
              {[
                "Navigation",
                "Hero",
                "Title",
                "Button",
                "Visual",
                "Benefits",
              ].map((layer, index) => (
                <p
                  key={layer}
                  className={`rounded px-1.5 py-1 text-[7px] font-bold ${
                    index === 3 ? "bg-brand/10 text-brand" : "text-onyx/45"
                  }`}
                >
                  {layer}
                </p>
              ))}
            </div>
          </div>
          <div className="relative m-3 overflow-hidden rounded-lg bg-white p-3 shadow-sm">
            <div className="flex items-center">
              <p className="text-[7px] font-semibold">upscreen</p>
              <div className="ml-auto flex gap-1.5">
                <span className="h-1 w-4 rounded-full bg-onyx/12" />
                <span className="h-1 w-3 rounded-full bg-onyx/10" />
                <span className="h-1 w-3 rounded-full bg-onyx/10" />
              </div>
            </div>
            <p className="mt-3 text-sm font-semibold leading-[0.9]">
              Sell more,
              <br />
              <span className="text-brand">faster.</span>
            </p>
            <div className="mt-2 h-1 w-[55%] rounded-full bg-onyx/10" />
            <div className="mt-1 h-1 w-[42%] rounded-full bg-onyx/8" />
            <span className="mt-3 inline-block rounded-full bg-onyx px-2 py-1 text-[6px] font-bold text-white">
              Request a demo
            </span>
            <div className="absolute bottom-2 right-2 h-[55%] w-[42%] rounded-lg bg-gradient-to-br from-brand/20 to-indigo-200/70">
              <div className="absolute left-2 top-2 w-[72%] rounded bg-white/85 p-1.5 shadow-sm">
                <div className="h-1 w-[55%] rounded-full bg-onyx/20" />
                <div className="mt-1 h-1 w-[35%] rounded-full bg-brand/45" />
              </div>
              <span className="absolute bottom-2 left-1.5 rounded-full bg-brand px-1.5 py-0.5 text-[5px] font-bold text-white">
                Design review
              </span>
            </div>
            <span className="absolute bottom-1 left-[42%] rounded bg-blue-600 px-1.5 py-0.5 text-[5px] font-bold text-white">
              168 × 44
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (title === "You launch") {
    return (
      <div className={panelClass}>
        <div className="flex items-center gap-2 border-b border-onyx/10 pb-2">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-onyx/10" />
            <span className="h-2 w-2 rounded-full bg-onyx/10" />
          </div>
          <div className="flex-1 rounded-md bg-[#f1f3f8] px-2 py-1 text-[8px] font-bold text-onyx/55">
            upscreen.com
          </div>
        </div>
        <div className="relative mt-3 h-[72%] overflow-hidden rounded-xl border border-onyx/8 bg-white p-3 shadow-sm">
          <div className="flex items-center">
            <p className="text-[7px] font-semibold">upscreen</p>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="h-1 w-4 rounded-full bg-onyx/15" />
              <span className="h-1 w-3 rounded-full bg-onyx/10" />
              <span className="rounded-full bg-onyx px-1.5 py-1 text-[5px] font-bold text-white">
                Contact us
              </span>
            </div>
          </div>
          <p className="mt-3 text-base font-semibold leading-[0.9]">
            Grow online,
            <br />
            <span className="text-brand">with clarity.</span>
          </p>
          <div className="mt-2 h-1 w-[40%] rounded-full bg-onyx/12" />
          <div className="mt-1 h-1 w-[32%] rounded-full bg-onyx/8" />
          <span className="relative z-10 mt-3 inline-block rounded-full bg-onyx px-2 py-1 text-[6px] font-bold text-white">
            Start your project
          </span>
          <div className="absolute bottom-2 left-3 h-[17%] w-[42%] rounded-lg bg-gradient-to-r from-brand/20 via-rose-100 to-indigo-100">
            <div className="absolute bottom-2 left-2 h-1 w-[45%] rounded-full bg-brand/55" />
          </div>
          <div className="absolute bottom-3 right-3 w-[56%] rounded-xl border border-onyx/8 bg-white p-2.5 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-[8px] font-semibold">Deployment</p>
              <span className="text-[7px] font-bold text-emerald-600">
                Live
              </span>
            </div>
            <div className="mt-2 space-y-1.5">
              {["Production build", "Domain & SSL", "Analytics"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <span className="grid h-3 w-3 place-items-center rounded-full bg-emerald-500 text-[7px] font-bold text-white">
                    ✓
                  </span>
                  <span className="text-[7px] font-bold text-onyx/65">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-onyx/8 pt-2">
              <span className="text-[7px] font-semibold text-onyx/45">
                Site status
              </span>
              <span className="flex items-center gap-1 text-[7px] font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={panelClass}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold">Production in progress</p>
          <p className="mt-1 text-[9px] font-semibold text-onyx/45">
            UpScreen project workspace
          </p>
        </div>
        <span className="font-display text-2xl italic text-brand">68%</span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-onyx/8">
        <div className="h-full w-[68%] rounded-full bg-brand" />
      </div>
      <div className="mt-4 space-y-2">
        {[
          ["Page structure", "100%", true],
          ["Copywriting", "82%", true],
          ["Motion design", "46%", false],
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
type BrandIconName = "chat" | "mockup" | "build" | "launch" | "growth";

const brandIconGlyphs: Record<BrandIconName, ReactNode> = {
  chat: (
    <>
      <path d="M20 11.5a7.5 7.5 0 0 1-11.1 6.6L4 19.5l1.4-4.5A7.5 7.5 0 1 1 20 11.5Z" />
      <circle cx="8.6" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12.1" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.6" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  mockup: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 8.5h17" />
      <rect x="6.5" y="11.2" width="5" height="5.3" rx="1" />
      <path d="M14.2 12h3.3M14.2 15.3h2.3" />
    </>
  ),
  build: (
    <>
      <path d="M12 3.8 3.8 8.1 12 12.4l8.2-4.3Z" />
      <path d="m3.8 12 8.2 4.3 8.2-4.3" />
      <path d="m3.8 15.9 8.2 4.3 8.2-4.3" />
    </>
  ),
  launch: (
    <>
      <path d="M5 16.4c-1.3 1.1-1.8 4.4-1.8 4.4s3.3-.5 4.4-1.8c.6-.7.6-1.9-.1-2.6a1.9 1.9 0 0 0-2.5 0Z" />
      <path d="m12 14.6-2.6-2.6a19 19 0 0 1 1.8-3.5A11.5 11.5 0 0 1 20.8 3.2c0 2.4-.7 6.6-5.3 9.6a19.5 19.5 0 0 1-3.5 1.8Z" />
      <path d="M9.4 12H5.1s.5-2.6 1.8-3.5c1.4-.9 4.3 0 4.3 0M12 14.6v4.3s2.6-.5 3.5-1.8c.9-1.4 0-4.3 0-4.3" />
    </>
  ),
  growth: (
    <>
      <path d="m3.8 16.8 5.7-5.7 3.8 3.8 6.9-7.3" />
      <path d="M15.3 7.6h4.9v4.9" />
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
        className="h-[58%] w-[58%]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
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
    <section id="process" className="relative mx-auto w-full max-w-[1040px] scroll-mt-24 px-5 py-[60px] sm:px-8">
      <Heading>How it works</Heading>
      <div ref={timelineRef} className="relative mt-16">
        <div className="absolute bottom-8 left-4 top-8 w-px bg-off-white/10 sm:left-1/2 sm:-translate-x-1/2">
          <div
            aria-hidden="true"
            className="absolute inset-0 origin-top bg-gradient-to-b from-brand-light via-brand to-brand-deep shadow-[0_0_18px_rgba(233,68,69,0.65)] will-change-transform"
            style={{ transform: `scaleY(${scrollProgress})` }}
          />
        </div>
        <div className="space-y-10 sm:space-y-12">
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
                className="relative grid min-h-[170px] grid-cols-[32px_1fr] gap-4 sm:grid-cols-[1fr_56px_1fr] sm:gap-3"
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
                    className={`glass-panel process-glass relative z-10 -mt-8 overflow-hidden rounded-[24px] p-5 transition-[opacity,transform] duration-700 ease-out sm:mx-4 sm:p-7 ${
                      isRevealed
                        ? "translate-y-0 opacity-100 sm:translate-x-0"
                        : isLeft
                          ? "translate-y-8 opacity-0 sm:-translate-x-8"
                          : "translate-y-8 opacity-0 sm:translate-x-8"
                    }`}
                  >
                    <div className="flex items-center justify-start gap-3">
                      <span className="text-xs font-semibold tracking-[0.12em] text-warm-gray">
                        0{index + 1}
                      </span>
                      <h3
                        className="inline-block whitespace-nowrap rounded-full border border-[#2A2A2E] bg-off-white/5 px-4 py-2 text-lg font-semibold leading-none tracking-[-0.02em] text-off-white sm:px-5 sm:text-2xl"
                      >
                        {step.title}
                      </h3>
                      <BrandIcon name={processIcons[step.title]} className="h-10 w-10 sm:h-11 sm:w-11" />
                    </div>
                    <p
                      className={`mt-5 text-[17px] font-normal leading-[1.6] text-[#CFCCC7] ${
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
                  className={`col-start-1 row-start-1 mt-7 h-5 w-5 justify-self-center rounded-full border-4 border-onyx transition-all duration-500 sm:col-start-2 sm:h-6 sm:w-6 ${
                    isRevealed
                      ? "scale-100 bg-brand shadow-[0_0_22px_rgba(233,68,69,0.9)] ring-1 ring-brand"
                      : "scale-75 bg-graphite ring-1 ring-off-white/15"
                  }`}
                />
              </div>
            );
          })}
        </div>
        <div
          className={`glass-panel relative z-10 mx-auto mt-12 flex max-w-[700px] flex-col items-center rounded-[26px] border-[#2A2A2E] px-6 py-7 text-center transition-[opacity,transform] duration-700 sm:px-10 ${
            showFinalStep ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs font-semibold tracking-[0.12em] text-warm-gray">
              05
            </span>
            <span className="inline-block text-xl font-semibold tracking-[-0.02em] text-off-white sm:text-3xl">
              We keep you growing
            </span>
            <BrandIcon name="growth" className="h-10 w-10 sm:h-11 sm:w-11" />
          </div>
          <p className="mt-3 text-[17px] font-normal leading-[1.6] text-[#CFCCC7]">
            Hosting, updates and Instagram content, handled every month.
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
      <div className="group relative aspect-video overflow-hidden rounded-[22px] border border-[#2A2A2E] bg-graphite sm:rounded-[28px]">
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
            aria-label={`Play ${title}`}
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
                Personal concept
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
  { mediaId: "iwoeziqb0u", title: "Wise concept ad", thumbnail: motionWise, poster: motionWisePoster },
  { mediaId: "a5t1hj78uk", title: "Airbnb concept ad", thumbnail: motionAirbnb, poster: motionAirbnbPoster },
  { mediaId: "tm4p5wf5de", title: "Any style motion design video", thumbnail: motionAnyStyle, poster: motionAnyStylePoster },
  { mediaId: "cn1y5pm9o1", title: "Notion presentation video", thumbnail: motionNotion, poster: motionNotionPoster },
];

function WorkGallery() {
  return (
    <section id="work" className="scroll-reveal relative mx-auto w-full max-w-[1120px] scroll-mt-24 px-5 py-[60px] sm:px-8">
      <Heading>Motion videos</Heading>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7">
        {motionVideos.map((video) => (
          <MotionVideoCard key={video.mediaId} {...video} />
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="scroll-reveal relative mx-auto w-full max-w-[1000px] scroll-mt-24 px-5 py-[60px] sm:px-8">
      <Heading>FAQ</Heading>
      <div className="mt-12 space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={`${faq.question}-${index}`}
            className="scroll-reveal group overflow-hidden rounded-[20px] border border-[#2A2A2E] bg-graphite transition-colors open:border-off-white/20 hover:border-off-white/20"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-5 text-base font-semibold text-off-white transition-colors hover:text-white sm:px-7 sm:py-6 sm:text-lg [&::-webkit-details-marker]:hidden">
              <span className="flex-1">{faq.question}</span>
              <span className="relative h-5 w-5 shrink-0 text-off-white">
                <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-300 group-open:rotate-90" />
              </span>
            </summary>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="border-t border-[#2A2A2E] px-5 pb-6 pt-4 text-[17px] font-normal leading-[1.6] text-warm-gray sm:px-7">
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

function ContactSection() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};

    ["name", "business", "industry", "email", "phone", "message"].forEach(
      (field) => {
        if (!String(data.get(field) || "").trim()) {
          nextErrors[field] = "This field is required.";
        }
      },
    );

    const email = String(data.get("email") || "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  const fieldClass =
    "mt-2 w-full rounded-xl border border-[#2A2A2E] bg-onyx/70 px-4 py-3 text-base font-normal text-off-white outline-none transition placeholder:text-warm-gray/55 focus:border-off-white/30";

  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-[1160px] scroll-mt-24 px-5 py-[60px] sm:px-8"
    >
      <div className="absolute left-1/2 top-1/2 -z-0 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/8 blur-[120px]" />
      <div className="relative z-10 grid gap-10 rounded-[30px] border border-[#2A2A2E] bg-graphite/90 p-6 backdrop-blur-2xl md:grid-cols-[0.9fr_1.1fr] md:p-10 lg:p-14">
        <div className="flex flex-col justify-center">
          <h2 className="text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-off-white md:text-[48px]">
            Stop losing customers to businesses that just{" "}
            <em className="font-display text-[1.15em] font-normal italic text-brand">
              look better
            </em>{" "}
            online.
          </h2>
          <p className="mt-6 max-w-[480px] text-[17px] font-normal leading-[1.6] text-warm-gray">
            Message us on WhatsApp or fill in the form. You get a free mockup
            and only move forward when you love what you see.
          </p>
          <a
            href="#contact-form"
            className="mt-8 inline-flex w-fit rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-onyx transition-colors hover:bg-[#FF7A7B]"
          >
            Contact us
          </a>
        </div>

        <form
          id="contact-form"
          onSubmit={handleSubmit}
          noValidate
          className="grid gap-4 rounded-[24px] border border-[#2A2A2E] bg-onyx/55 p-5 sm:grid-cols-2 sm:p-6"
        >
          <label className="text-sm font-semibold text-off-white">
            Name
            <input name="name" placeholder="Your name" className={fieldClass} />
            {errors.name && (
              <span className="mt-1 block text-xs font-normal text-amber-400">
                {errors.name}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-off-white">
            Business name
            <input
              name="business"
              placeholder="Business name"
              className={fieldClass}
            />
            {errors.business && (
              <span className="mt-1 block text-xs font-normal text-amber-400">
                {errors.business}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-off-white">
            Industry
            <select name="industry" defaultValue="" className={fieldClass}>
              <option value="" disabled>
                Select your industry
              </option>
              <option>Restaurant/Café</option>
              <option>Salon/Beauty</option>
              <option>Gym/Fitness</option>
              <option>Trades</option>
              <option>Clinic/Health</option>
              <option>Retail</option>
              <option>Other</option>
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
              placeholder="you@business.com"
              className={fieldClass}
            />
            {errors.email && (
              <span className="mt-1 block text-xs font-normal text-amber-400">
                {errors.email}
              </span>
            )}
          </label>
          <label className="text-sm font-semibold text-off-white sm:col-span-2">
            Phone
            <input
              name="phone"
              type="tel"
              placeholder="Your phone number"
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
              placeholder="Tell us about your project"
              className={fieldClass}
            />
            {errors.message && (
              <span className="mt-1 block text-xs font-normal text-amber-400">
                {errors.message}
              </span>
            )}
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-onyx transition-colors hover:bg-[#FF7A7B]"
            >
              Send
            </button>
            {submitted && (
              <p className="mt-3 text-sm font-normal text-off-white">
                Thanks — your project details are ready to send.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const navLinks = [
    ["Services", "#services"],
    ["How it works", "#process"],
    ["Work", "#work"],
    ["Pricing", "#pricing"],
    ["FAQ", "#faq"],
  ];

  return (
    <footer className="border-t border-[#2A2A2E] bg-onyx px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-[1160px] gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
        <a
          href="#home"
          aria-label="UpScreen home"
            className="block w-[180px]"
        >
          <img
            src={upscreenLogo}
            alt="UpScreen"
              className="block h-auto w-full"
          />
        </a>
          <p className="mt-5 max-w-[440px] text-[15px] font-normal leading-[1.6] text-warm-gray">
            Websites, content and motion videos for small businesses.
          </p>
          <p className="mt-6 text-sm font-semibold text-off-white">
            Be seen. Be chosen.
          </p>
        </div>
        <div className="md:text-right">
        <nav
            aria-label="Footer navigation"
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
            <span className="text-xs font-normal text-warm-gray">
              hello@upscreen.com.au (placeholder)
            </span>
            <span className="text-xs font-normal text-warm-gray">
              ABN 28 900 392 176
            </span>
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
      <Services />
      <Process />
      <WorkGallery />
      <Reviews />
      <FAQ />
      <ContactSection />
      <Footer />
    </main>
  );
}
