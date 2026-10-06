import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import upscreenLogo from "./imports/upscreen-logo.svg";
import motionThumbnailOne from "./imports/motion-thumbnail-1.gif";
import motionThumbnailTwo from "./imports/motion-thumbnail-2.gif";
import processPhone from "./imports/process-phone-transparent.png";
import processMockup from "./imports/process-mockup-transparent.png";
import processBuild from "./imports/process-build-transparent.png";
import processLaunch from "./imports/process-launch-transparent.png";
import processGrowth from "./imports/process-growth-transparent.png";
import googleLogo from "./imports/google-logo.png";
import backgroundMp4 from "./imports/background.mp4";
import backgroundWebm from "./imports/background.webm";
import backgroundPoster from "./imports/background-poster.jpg";

const services = [
  {
    title: "Landing page",
    subtitle: "SAY HELLO TO FINALLY SELLING.",
    features: [
      "Custom one-page website",
      "Mobile-first & fast-loading",
      "Call, booking or contact form",
      "Basic local SEO",
      "Connected to your Instagram and Facebook",
    ],
    price: "A$1,200",
    note: "A$99/month hosting & care",
  },
  {
    title: "Landing page + Video presentation",
    subtitle: "STAND OUT FROM THE FIRST SECOND.",
    features: [
      "Everything in Landing page",
      "Custom 30–45s presentation video in motion design",
      "We write the script for you",
      "Short vertical version for Instagram",
      "Music & sound design",
    ],
    price: "A$2,300",
    note: "A$99/month hosting & care — First month free",
  },
  {
    title: "Instagram content",
    subtitle: "STAY VISIBLE, EVERY WEEK.",
    features: [
      "8 custom posts per month",
      "Monthly content calendar",
      "Designed & ready-to-post feed",
      "Captions written for you",
      "Reels ideas & content prompts",
    ],
    price: "A$890",
    note: "Extra posts available · 3-month minimum",
  },
];

const processSteps = [
  {
    title: "Free call",
    body: "20 minutes to understand your business, your customers and your goals.",
    highlights: [],
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

const processIcons: Record<string, string> = {
  "Free call": processPhone,
  "Free mockup": processMockup,
  "We build": processBuild,
  "You launch": processLaunch,
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
      "Fast and secure hosting, backups, updates, Google Business Profile upkeep and small edits every month, for A$99/month. No lock-in, cancel anytime.",
  },
  {
    question: "How do I contact you?",
    answer:
      "Book a free 20-minute call with the button below, or send us a message through the contact form.",
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
          className="relative z-10 block w-[124px] shrink-0 sm:w-[138px]"
        >
          <img
            src={upscreenLogo}
            alt="UpScreen"
            className="block h-auto w-full drop-shadow-[0_0_14px_rgba(233,68,69,0.5)]"
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
          Book a free call
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
            Book a free call
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
          Book your free call
        </a>
        <a
          href="#pricing"
          className="rounded-full border border-[#2A2A2E] bg-graphite/70 px-7 py-3.5 text-sm font-semibold text-off-white transition-colors hover:border-off-white/25 hover:bg-graphite"
        >
          See our plans
        </a>
      </div>
      <div
        aria-label="Featured presentation video"
        className="scroll-reveal group relative mt-10 overflow-hidden rounded-[24px] border border-[#2A2A2E] bg-graphite shadow-[0_28px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="flex h-10 items-center gap-2 border-b border-[#2A2A2E] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-off-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-off-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-off-white/15" />
          <span className="ml-3 text-[10px] font-normal text-warm-gray">
            upscreen.com
          </span>
        </div>
        <div className="relative aspect-video bg-[radial-gradient(circle_at_50%_50%,rgba(233,68,69,0.08),transparent_45%)]">
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-off-white/20 bg-off-white/8 text-white backdrop-blur-xl transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
          <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-brand sm:border-y-[10px] sm:border-l-[16px]" />
          </span>
        </div>
      </div>
    </section>
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
        {index === 3 && <FiveSecondsWidget />}
      </div>
    </div>
  );
}

function WidgetLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-semibold leading-none" style={{ fontSize: u(11) }}>
      {children}
    </p>
  );
}

function SearchWidget() {
  return (
    <div className="flex h-full flex-col">
      <img src={googleLogo} alt="" className="mx-auto block" style={{ height: u(24), marginBottom: u(9) }} />
      <div
        className="flex items-center border border-onyx/10 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
        style={{ height: u(26), borderRadius: u(13), padding: `0 ${u(10)}`, gap: u(7) }}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-onyx/45" style={{ width: u(11), height: u(11) }}>
          <circle cx="7" cy="7" r="4.5" />
          <path d="m10.5 10.5 3 3" strokeLinecap="round" />
        </svg>
        <span className="font-semibold text-onyx/75" style={{ fontSize: u(10) }}>
          best café near me
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center" style={{ gap: u(8), marginTop: u(8) }}>
        {[70, 56].map((width, row) => (
          <div key={row} style={{ display: "grid", gap: u(4) }}>
            <span className="block rounded-full bg-[#5B6FD8]/55" style={{ height: u(6), width: `${width}%` }} />
            <span className="block rounded-full bg-onyx/10" style={{ height: u(4), width: `${width + 20}%` }} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-onyx/8" style={{ paddingTop: u(8) }}>
        <div className="flex items-center" style={{ gap: u(4) }}>
          {["1", "2", "3"].map((page) => (
            <span
              key={page}
              className={`grid place-items-center rounded-full font-semibold ${
                page === "3" ? "border border-brand bg-brand/10 text-brand" : "bg-onyx/5 text-onyx/45"
              }`}
              style={{ width: u(18), height: u(18), fontSize: u(9) }}
            >
              {page}
            </span>
          ))}
        </div>
        <span className="flex items-center font-semibold text-brand" style={{ fontSize: u(10), gap: u(4) }}>
          <span className="rounded-full bg-brand" style={{ width: u(6), height: u(6) }} />
          You're here
        </span>
      </div>
    </div>
  );
}

function SlowSiteWidget() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center border-b border-onyx/8" style={{ gap: u(4), paddingBottom: u(8) }}>
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="rounded-full bg-onyx/15" style={{ width: u(6), height: u(6) }} />
        ))}
        <span className="ml-auto rounded-full bg-onyx/5 font-semibold text-onyx/40" style={{ fontSize: u(8), padding: `${u(3)} ${u(8)}` }}>
          yourbusiness.com.au
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center" style={{ padding: `${u(10)} 0` }}>
        <div
          className="grid h-full place-items-center border-2 border-dashed border-onyx/20 bg-onyx/5"
          style={{ width: "78%", borderRadius: u(10), transform: "rotate(-3deg)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-onyx/35" style={{ width: u(52), height: u(52) }}>
            <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
            <circle cx="9" cy="9.5" r="1.6" />
            <path d="m3 16.5 5-5 4 4 3-3 6 6" strokeLinejoin="round" />
            <path d="M3.5 3.5 20.5 20.5" stroke="#E94445" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between font-semibold" style={{ fontSize: u(10), marginBottom: u(5) }}>
          <span className="flex items-center text-onyx/55" style={{ gap: u(4) }}>
            <span className="problem-spinner rounded-full border-onyx/15 border-t-brand" style={{ width: u(10), height: u(10), borderWidth: u(1.8) }} />
            Loading…
          </span>
          <span className="text-brand">8.4s</span>
        </div>
        <div className="overflow-hidden rounded-full bg-onyx/8" style={{ height: u(5) }}>
          <span className="block h-full rounded-full bg-brand" style={{ width: "34%" }} />
        </div>
      </div>
    </div>
  );
}

function DeadFeedWidget() {
  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center" style={{ gap: u(8) }}>
        <span
          className="grid shrink-0 place-items-center rounded-full bg-onyx/10 font-semibold text-onyx/45"
          style={{ width: u(28), height: u(28), fontSize: u(9) }}
        >
          YB
        </span>
        <div className="min-w-0">
          <WidgetLabel>yourbusiness</WidgetLabel>
          <p className="font-semibold text-onyx/40" style={{ fontSize: u(8), marginTop: u(4) }}>
            12 posts · 87 followers
          </p>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3" style={{ gap: u(4), marginTop: u(10) }}>
        {[0, 1, 2, 3, 4, 5].map((tile) => (
          <span key={tile} className={tile < 3 ? "bg-onyx/10" : "bg-onyx/5"} style={{ borderRadius: u(5) }} />
        ))}
      </div>
      <div
        className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-2xl border border-brand/25 bg-white text-center shadow-[0_12px_28px_rgba(0,0,0,0.16)]"
        style={{ padding: `${u(8)} ${u(16)}` }}
      >
        <p className="font-semibold uppercase text-onyx/45" style={{ fontSize: u(8), letterSpacing: "0.12em" }}>
          Last post
        </p>
        <p className="font-display text-brand" style={{ fontSize: u(24), lineHeight: 1.05, marginTop: u(2) }}>
          Mar 2023
        </p>
      </div>
    </div>
  );
}

function FiveSecondsWidget() {
  const radius = 15;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center" style={{ gap: u(12) }}>
        <div className="relative shrink-0" style={{ width: u(104), height: u(104) }}>
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle cx="18" cy="18" r={radius} fill="none" stroke="rgba(10,10,11,0.08)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke="#E94445"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * 0.82}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-brand" style={{ fontSize: u(36) }}>
            5s
          </span>
        </div>
        <span className="flex items-center font-semibold text-brand" style={{ fontSize: u(14), gap: u(5) }}>
          Visitor left
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: u(13), height: u(13) }}>
            <path d="M4 2h6v6M10 2 3 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div
        className="bg-onyx/[0.06] text-center font-semibold text-onyx/80"
        style={{ fontSize: u(12.5), lineHeight: 1.3, padding: `${u(8)} ${u(12)}`, borderRadius: `${u(12)} ${u(12)} ${u(12)} ${u(3)}` }}
      >
        "So… what do you actually do?"
      </div>
    </div>
  );
}

function ProblemSection() {
  const problems = [
    ["Page 3 of Google", "Nobody finds you."],
    ["Slow, outdated site", "They leave in seconds."],
    ["Last post: 2023", "They wonder if you're still open."],
    ["5 seconds to explain", "And they still don't get what you do."],
  ];

  return (
    <section
      id="services"
      className="scroll-reveal mx-auto w-full max-w-[1160px] scroll-mt-24 px-5 py-[60px] sm:px-8"
    >
      <Heading emphasize={5} breakBeforeEmphasis>
        Most businesses lose customers before they even say hello.
      </Heading>
      <div className="mx-auto mt-12 grid max-w-[420px] grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
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

function Services() {
  return (
    <section
      id="pricing"
      className="scroll-reveal relative mx-auto w-full max-w-[1160px] scroll-mt-24 px-5 py-[60px] sm:px-8"
    >
      <Heading>Clear pricing. No hidden fees.</Heading>
      <div className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
        {services.map((service, index) => (
          <article
            key={service.title}
            className={`scroll-reveal group relative flex min-h-[590px] flex-col rounded-[28px] border bg-graphite/85 p-7 text-off-white backdrop-blur-2xl transition duration-300 hover:-translate-y-1 sm:p-8 ${
              index === 1
                ? "border-[1.5px] border-brand shadow-[0_28px_80px_rgba(0,0,0,0.48),0_0_32px_rgba(233,68,69,0.12)] md:-my-3 md:min-h-[614px]"
                : "border-[#2A2A2E] hover:border-off-white/20"
            }`}
          >
            {index === 1 && (
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-brand px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-onyx sm:text-xs">
                Most popular
              </span>
            )}
            <h3 className="relative text-2xl font-semibold leading-[1.05] tracking-[-0.02em] md:min-h-[52px]">
              {service.title}
            </h3>
            <p
              className={`mt-3 text-xs font-semibold uppercase tracking-[0.08em] ${
                index === 1 ? "text-brand-light" : "text-warm-gray"
              }`}
            >
              {service.subtitle}
            </p>
            <ul className="mt-8 space-y-3.5 pb-10 text-[15px] font-normal leading-[1.5] text-[#CFCCC7]">
              {service.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span
                    className={`mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full ${
                      index === 1 ? "bg-brand" : "bg-warm-gray/55"
                    }`}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t border-off-white/10 pt-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-warm-gray">
                {index === 2 ? "Monthly" : "One-off"}
              </p>
              <p className="mt-3 flex items-baseline whitespace-nowrap">
                <span className="mr-1 text-base font-normal text-warm-gray">
                  A$
                </span>
                <span
                  className={`font-display text-[52px] font-normal leading-none tracking-[-0.025em] sm:text-[58px] ${
                    index === 1 ? "text-brand" : "text-off-white"
                  }`}
                >
                  {service.price.replace("A$", "")}
                </span>
                {index === 2 && (
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
                  index === 1
                    ? "border-brand bg-brand text-onyx hover:bg-[#FF7A7B]"
                    : "border-[#2A2A2E] bg-transparent text-off-white hover:border-off-white/25"
                }`}
              >
                Get started
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-8 text-center text-xs font-normal text-warm-gray">
        AUD, excl. GST · Free mockup
      </p>
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

  if (title === "Free call") {
    return (
      <div className={`${panelClass} whatsapp-panel`}>
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-300/25 blur-3xl" />
        <div className="absolute -left-12 top-1/2 h-28 w-28 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="relative z-10 flex items-center gap-2.5 border-b border-onyx/8 pb-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white shadow-[0_6px_16px_rgba(16,185,129,0.25)]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
            >
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
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold sm:text-xs">
              WhatsApp call
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[8px] font-bold text-onyx/40">
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-2.5 w-2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3.5" y="7" width="9" height="6.5" rx="2" />
                <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
              </svg>
              End-to-end encrypted
            </p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            02:14
          </span>
        </div>
        <div className="relative z-10 mt-3 flex h-[44%] flex-col items-center justify-center overflow-hidden rounded-2xl border border-emerald-500/10 bg-[radial-gradient(circle_at_50%_40%,rgba(52,211,153,0.16),transparent_32%),linear-gradient(135deg,#ffffff_0%,#f6fdf9_55%,#ecfbdc_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_0_24px_rgba(16,185,129,0.04)]">
          <span className="absolute left-1/2 top-[40%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/8" />
          <span className="absolute left-1/2 top-[40%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/12" />
          <span className="absolute left-1/2 top-[40%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/18" />
          <span className="absolute left-1/2 top-[40%] z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(16,185,129,0.28)] sm:h-11 sm:w-11">
            UP
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
          </span>
          <p className="absolute left-1/2 top-[66%] z-10 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-onyx/75">
            UpScreen consultant
          </p>
          <div className="voice-spectrum absolute left-1/2 top-[83%] z-10 flex h-3 -translate-x-1/2 items-center justify-center gap-0.75">
            {[4, 8, 11, 7, 12, 6, 9, 4, 7].map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="w-0.5 rounded-full bg-emerald-500/55"
                style={{ height }}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-x-4 bottom-12 z-40 flex items-center justify-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-onyx/8 bg-white text-onyx/60 shadow-md">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="7" y="2.5" width="6" height="9" rx="3" />
              <path d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5" />
            </svg>
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-onyx/8 bg-white text-onyx/60 shadow-md">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="3" y="5" width="10" height="10" rx="2" />
              <path d="m13 8 4-2v8l-4-2" />
            </svg>
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-onyx/8 bg-white text-onyx/60 shadow-md">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M5 8v4h3l4 3V5L8 8H5Z" />
              <path d="M14 8a3 3 0 0 1 0 4" />
            </svg>
          </span>
          <span className="grid h-9 w-12 place-items-center rounded-full bg-brand text-white shadow-[0_7px_18px_rgba(233,68,69,0.35)]">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4 rotate-[135deg]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 4.5c3 6 5.5 8.5 10.5 10.5l1.5-3.5-4-2-1.5 2c-1.5-.8-2.7-2-3.5-3.5l2-1.5-2-4L5 4.5Z" />
            </svg>
          </span>
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
                Book a call
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

function ProcessIcon({
  src,
  alt,
  className = "",
  imageClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-contain drop-shadow-[0_0_10px_rgba(233,68,69,0.75)] ${imageClassName}`}
      />
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
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-[8%] z-0 h-32 w-[84%] rounded-[40%] bg-[radial-gradient(circle_at_28%_55%,rgba(233,68,69,0.38),transparent_30%),radial-gradient(circle_at_72%_40%,rgba(239,122,123,0.24),transparent_28%)] opacity-80"
                  />
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
                        className={`inline-block whitespace-nowrap rounded-full border border-[#2A2A2E] bg-off-white/5 px-4 py-2 text-lg font-semibold leading-none tracking-[-0.02em] text-off-white transition-[filter] duration-700 sm:px-5 sm:text-2xl ${
                          isRevealed ? "[filter:none]" : "blur-[6px]"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <ProcessIcon
                        src={processIcons[step.title]}
                        alt={`${step.title} icon`}
                        className="h-12 w-12"
                        imageClassName={
                          step.title === "Free call" ||
                          step.title === "You launch"
                            ? "scale-[0.84]"
                            : ""
                        }
                      />
                    </div>
                    <p
                      className={`mt-5 text-[17px] font-normal leading-[1.6] text-[#CFCCC7] transition-[filter] duration-700 ${
                        isRevealed ? "[filter:none]" : "blur-[6px]"
                      } ${
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
          className={`glass-panel relative z-10 mx-auto mt-12 flex max-w-[700px] flex-col items-center rounded-[26px] border-[#2A2A2E] px-6 py-7 text-center transition-[opacity,transform,filter] duration-700 sm:px-10 ${
            showFinalStep
              ? "translate-y-0 opacity-100 blur-0"
              : "translate-y-10 opacity-0 blur-[3px]"
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs font-semibold tracking-[0.12em] text-warm-gray">
              05
            </span>
            <span className="inline-block text-xl font-semibold tracking-[-0.02em] text-off-white sm:text-3xl">
              We keep you growing
            </span>
            <ProcessIcon
              src={processGrowth}
              alt="Growing results icon"
              className="h-12 w-12"
              imageClassName="scale-[0.84]"
            />
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
}: {
  mediaId: string;
  title: string;
  thumbnail: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="scroll-reveal">
      <div className="group relative aspect-video overflow-hidden rounded-[22px] border border-[#2A2A2E] bg-graphite sm:rounded-[28px]">
        {playing ? (
          <iframe
            src={`https://fast.wistia.net/embed/iframe/${mediaId}?videoFoam=true&autoPlay=true`}
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
            <img
              src={thumbnail}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-onyx/55 via-transparent to-onyx/10" />
            <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-onyx/45 text-white backdrop-blur-md transition-transform group-hover:scale-110">
              <span className="ml-1 h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-white" />
            </span>
          </button>
        )}
      </div>
    </article>
  );
}

function WorkGallery() {
  return (
    <section id="work" className="scroll-reveal relative mx-auto w-full max-w-[1120px] scroll-mt-24 px-5 py-[60px] sm:px-8">
      <Heading>Recent websites</Heading>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7">
        {[0, 1].map((item) => (
          <article
            key={item}
            className="scroll-reveal"
          >
            <div className="group relative aspect-[1.45/1] overflow-hidden rounded-[22px] border border-[#2A2A2E] bg-graphite sm:rounded-[28px]">
              <div className="absolute inset-[10%] rounded-[16px] border border-off-white/10 bg-onyx/50 transition-transform duration-500 group-hover:scale-[1.02]" />
              <div className="absolute bottom-[16%] left-[16%] h-2 w-[30%] rounded-full bg-off-white/15" />
              <div className="absolute bottom-[23%] left-[16%] h-1.5 w-[48%] rounded-full bg-off-white/10" />
              <span className="absolute left-4 top-4 rounded-full border border-[#2A2A2E] bg-onyx/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-warm-gray">
                Placeholder
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-[120px]">
        <Heading>Motion videos</Heading>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7">
          <MotionVideoCard
            mediaId="tm4p5wf5de"
            title="UpScreen motion design video"
            thumbnail={motionThumbnailOne}
          />
          <MotionVideoCard
            mediaId="cn1y5pm9o1"
            title="UpScreen presentation video"
            thumbnail={motionThumbnailTwo}
          />
        </div>
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
            Start with a free 20-minute call and a free mockup. Move forward
            only when you love what you see.
          </p>
          <a
            href="#contact-form"
            className="mt-8 inline-flex w-fit rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-onyx transition-colors hover:bg-[#FF7A7B]"
          >
            Book your free call
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
            className="block w-[170px]"
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
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-warm-gray hover:text-off-white"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <span className="text-xs font-normal text-warm-gray">
              hello@upscreen.com.au (placeholder)
            </span>
            <span className="text-xs font-normal text-warm-gray">
              ABN 00 000 000 000 (placeholder)
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

function BackgroundVideo() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-onyx">
      {reducedMotion ? (
        <img src={backgroundPoster} alt="" className="h-full w-full object-cover" />
      ) : (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={backgroundPoster}
        >
          <source src={backgroundWebm} type="video/webm" />
          <source src={backgroundMp4} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-onyx/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,11,0.45)_80%)]" />
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
      <BackgroundVideo />
      <Header />
      <Hero />
      <ProblemSection />
      <Services />
      <Process />
      <WorkGallery />
      <FAQ />
      <ContactSection />
      <Footer />
    </main>
  );
}
