"use client";

import * as React from "react";

type NavItem = { id: string; label: string };

const NAV: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "why", label: "Why" },
  { id: "solution", label: "Solution" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

const CALENDLY_URL = "https://www.calendly.com/joshschlisserman";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = React.useState<string>(ids[0] ?? "home");

  React.useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];
        if (!visible?.target?.id) return;
        setActiveId(visible.target.id);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-15% 0px -70% 0px",
      },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return activeId;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function BrandMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6.2 14.1c2.4-5.4 7.2-8.8 12.5-9.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7.9 19.2c4.3.7 9.1-1 12.4-4.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4.2 9.8c.3 1.7 1.1 3.4 2.2 4.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="6.1" cy="18.2" r="1.2" fill="currentColor" />
    </svg>
  );
}

function Icon(
  props: React.SVGProps<SVGSVGElement> & { title: string },
) {
  const { title, ...rest } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <title>{title}</title>
      {props.children}
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Page() {
  const activeId = useActiveSection(NAV.map((n) => n.id));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  const painPoints = [
    {
      title: "Head knowledge stays head knowledge",
      body: "What’s in the detective’s head doesn’t always make it into the warrant.",
      icon: (
        <Icon
          title="Knowledge gap"
          className="h-5 w-5 text-cyan-200"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M7 9a5 5 0 1 1 10 0c0 2-1 3-2 4-1 1-1 2-1 3h-4c0-1 0-2-1-3-1-1-2-2-2-4Z" />
        </Icon>
      ),
    },
    {
      title: "Rework loops burn days",
      body: "Back-and-forth between investigators, supervisors, and the DA.",
      icon: (
        <Icon
          title="Rework loops"
          className="h-5 w-5 text-cyan-200"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 7h10v10" />
          <path d="M17 7 7 17" />
          <path d="M6 12a6 6 0 0 0 6 6" />
        </Icon>
      ),
    },
    {
      title: "Late-stage legal misses",
      body: "Nexus / staleness / scope issues get caught too late.",
      icon: (
        <Icon
          title="Legal risk"
          className="h-5 w-5 text-cyan-200"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M4.2 4.2l2.1 2.1" />
          <path d="M17.7 17.7l2.1 2.1" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
          <path d="M4.2 19.8l2.1-2.1" />
          <path d="M17.7 6.3l2.1-2.1" />
          <path d="M9.5 9.5 12 12l2.5 2.5" />
          <circle cx="12" cy="12" r="5.5" />
        </Icon>
      ),
    },
    {
      title: "Jurisdiction drift",
      body: "Templates vary by county, judge, and DA preference.",
      icon: (
        <Icon
          title="Jurisdiction variation"
          className="h-5 w-5 text-cyan-200"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3 2 9l10 6 10-6-10-6Z" />
          <path d="M2 15l10 6 10-6" />
        </Icon>
      ),
    },
    {
      title: "Training isn’t consistent",
      body: "New investigators learn by osmosis and one-off feedback.",
      icon: (
        <Icon
          title="Training"
          className="h-5 w-5 text-cyan-200"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" />
          <path d="M6 17V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10" />
          <path d="M9 9h6" />
          <path d="M9 12h6" />
        </Icon>
      ),
    },
    {
      title: "Facts from multiple sources",
      body: "You have to jump between systems to pull the right data accurately.",
      icon: (
        <Icon
          title="Guardrails"
          className="h-5 w-5 text-cyan-200"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 7h10" />
          <path d="M7 12h10" />
          <path d="M7 17h10" />
          <path d="M4 6v12" />
          <path d="M20 6v12" />
        </Icon>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-zinc-900 focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/25 via-cyan-400/15 to-fuchsia-400/20 blur-3xl" />
        <div className="absolute bottom-[-220px] left-[-180px] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-cyan-400/15 to-emerald-400/10 blur-3xl" />
        <div className="absolute right-[-220px] top-[38%] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-fuchsia-400/10 to-indigo-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.18]" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("home");
              setMobileOpen(false);
            }}
            className="group flex items-center gap-2 rounded-xl px-2 py-1 text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            aria-label="Preside home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition group-hover:bg-white/7">
              <BrandMark className="h-5 w-5 text-cyan-200" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Preside
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(item.id);
                    setMobileOpen(false);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={cx(
                    "rounded-xl px-3 py-2 text-sm transition",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
                    isActive
                      ? "bg-white/10 text-white ring-1 ring-white/10"
                      : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
                setMobileOpen(false);
              }}
              className="hidden rounded-xl px-3 py-2 text-sm text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/5 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:inline-flex"
            >
              Contact
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
                setMobileOpen(false);
              }}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400/90 to-indigo-400/90 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_14px_40px_-18px_rgba(34,211,238,0.75)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            >
              Schedule Demo
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-xl bg-white/5 p-2 text-zinc-100 ring-1 ring-white/10 transition hover:bg-white/7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-5 w-5"
              >
                {mobileOpen ? (
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="md:hidden">
            <div className="border-t border-white/10 bg-zinc-950/70 backdrop-blur-xl">
              <nav
                className="mx-auto grid max-w-6xl gap-1 px-4 py-3 sm:px-6"
                aria-label="Mobile primary"
              >
                {NAV.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={`m-${item.id}`}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(item.id);
                        setMobileOpen(false);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={cx(
                        "rounded-xl px-3 py-2 text-sm transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
                        isActive
                          ? "bg-white/10 text-white ring-1 ring-white/10"
                          : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100",
                      )}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        ) : null}
      </header>

      <main id="main" className="relative">
        {/* HERO / HOME */}
        <section
          id="home"
          className="scroll-mt-24 border-b border-white/10"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  AI Search Warrant Co-Pilot
                </div>

                <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl">
                  Preside
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
                  Draft DA-template-ready Search Warrants directly from Microsoft
                  Word
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={CALENDLY_URL}
            target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400/90 to-indigo-400/90 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_18px_50px_-22px_rgba(34,211,238,0.85)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                  >
                    Schedule Demo
          </a>
          <a
                    href="#why"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("why");
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-zinc-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                  >
                    <span>See why it works</span>
                    <span aria-hidden="true" className="text-zinc-400">
                      →
                    </span>
                  </a>
                </div>

                <div className="mt-10 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-xl">
                  <p className="text-xs font-semibold tracking-wide text-zinc-300">
                    Backed by:
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      {
                        src: "/logos/caffeinated-capital.png",
                        alt: "Caffeinated Capital",
                      },
                      { src: "/logos/basecase.jpg", alt: "Basecase" },
                      { src: "/logos/third-logo.svg", alt: "Backer logo" },
                      { src: "/logos/banter.png", alt: "Banter" },
                    ].map((logo) => (
                      <div
                        key={logo.src}
                        className="grid h-12 place-items-center rounded-xl bg-white/90 px-3 ring-1 ring-white/10"
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="h-7 w-auto object-contain opacity-95"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    "DA-template mapping",
                    "Integrate all your systems",
                    "Microsoft Word add-in",
                  ].map((f) => (
                    <div
                      key={f}
                      className="group rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/7 hover:shadow-[0_22px_60px_-40px_rgba(34,211,238,0.6)]"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 ring-1 ring-white/10">
                          <CheckIcon className="h-4 w-4 text-cyan-200" />
                        </span>
                        <p className="text-sm font-semibold text-zinc-100">
                          {f}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-indigo-400/10" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold tracking-wide text-zinc-300">
                        Draft Preview
                      </p>
                      <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[11px] font-semibold text-emerald-200 ring-1 ring-emerald-300/15">
                        Guardrails on
                      </span>
                    </div>

                    <div className="mt-5 space-y-4">
                      <div className="rounded-2xl bg-zinc-950/50 p-4 ring-1 ring-white/10">
                        <p className="text-xs font-semibold text-zinc-200">
                          Facts (captured)
                        </p>
                        <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                          <li className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" />
                            Observed device behavior consistent with distribution
                            activity.
                          </li>
                          <li className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" />
                            Identified location(s), date/time windows, and source
                            of information.
                          </li>
                        </ul>
                      </div>

                      <div className="rounded-2xl bg-zinc-950/50 p-4 ring-1 ring-white/10">
                        <p className="text-xs font-semibold text-zinc-200">
                          Judicial scrutiny checks
                        </p>
                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                          {[
                            "Nexus clarity",
                            "Staleness risk",
                            "Scope limits",
                            "Inference labeling",
                          ].map((x) => (
                            <div
                              key={x}
                              className="rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-300 ring-1 ring-white/10"
                            >
                              {x}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-zinc-950/50 p-4 ring-1 ring-white/10">
                        <p className="text-xs font-semibold text-zinc-200">
                          Output
                        </p>
                        <p className="mt-2 text-sm leading-6 text-zinc-300">
                          DA-template-ready narrative blocks with facts separated
                          from inference and a clear nexus to the items to be
                          seized.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                      <p className="text-xs text-zinc-400">
                        No external images. No invented facts.
                      </p>
                      <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200 ring-1 ring-white/10 transition hover:bg-white/7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                      >
                        Book time →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Removed the 4-card quick-value grid per request */}
              </div>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section id="why" className="scroll-mt-24 border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Why
              </h2>
              <p className="max-w-3xl text-zinc-300">
                As is, drafting search warrants stalls investigations.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {painPoints.map((p) => (
                <div
                  key={p.title}
                  className="group rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/7 hover:shadow-[0_24px_70px_-48px_rgba(99,102,241,0.6)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/15 to-indigo-400/15 ring-1 ring-white/10">
                      {p.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {p.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section
          id="solution"
          className="scroll-mt-24 border-b border-white/10"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-12">
                <h2 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Solution
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-center text-zinc-300">
                  Preside is a Microsoft Word add-in that helps investigators
                  capture facts quickly, structure them into DA-approved formats,
                  and surface common legal weak-points before the draft hits a
                  supervisor or judge.
                </p>

                <div className="mx-auto mt-8 max-w-3xl rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-xl">
                  <p className="text-center text-xs font-semibold tracking-wide text-zinc-300">
                    How it works
                  </p>
                  <ol className="mt-4 space-y-3 text-left">
                    {[
                      {
                        t: "Add Preside on Microsoft Word",
                        d: "Preside is a plug-in on Microsoft Word that integrates with any systems permitted access.",
                      },
                      {
                        t: "Capture facts (voice/text/systems)",
                        d: "Rapid intake of observations, sources, and timelines from user input and all systems.",
                      },
                      {
                        t: "Preside maps to DA template",
                        d: "Your template structure drives the output format.",
                      },
                    ].map((s, idx) => (
                      <li
                        key={s.t}
                        className="grid grid-cols-[2.25rem_1fr] items-start gap-3"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xs font-semibold text-zinc-200 ring-1 ring-white/10">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {s.t}
                          </p>
                          <p className="mt-1 text-sm text-zinc-300">{s.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="scroll-mt-24 border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Pricing
                </h2>
                <p className="mt-3 max-w-2xl text-zinc-300">
                  Start with a pilot that’s simple to evaluate and easy to stop.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <div className="relative overflow-hidden rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 via-transparent to-cyan-400/10" />
                <div className="relative">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200 ring-1 ring-amber-300/15">
                        Limited time
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-white">
                        30-day no cost pilot (limited time)
                      </h3>
                      <p className="mt-2 text-sm text-zinc-300">
                        Validate workflow fit with your template, your process,
                        and your review standards.
                      </p>
                    </div>

                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400/90 to-indigo-400/90 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_18px_50px_-22px_rgba(34,211,238,0.85)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                    >
                      Schedule Demo
                    </a>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      "Unlimited drafts during pilot",
                      "Works with your DA template",
                      "Stick with tools you already use",
                      "Integrates with any system of record",
                    ].map((x) => (
                      <div
                        key={x}
                        className="flex items-start gap-2 rounded-2xl bg-zinc-950/45 px-4 py-3 text-sm text-zinc-300 ring-1 ring-white/10"
                      >
                        <CheckIcon className="mt-0.5 h-4 w-4 text-cyan-200" />
                        <span>{x}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Contact Us
            </h2>

            <div className="mt-8 grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-12">
                <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-xl">
                  <p className="text-sm leading-7 text-zinc-300">
                    If you’re evaluating Preside for warrant drafting, we’ll
                    walk you through how we help save you time on investigations.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400/90 to-indigo-400/90 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_18px_50px_-22px_rgba(34,211,238,0.85)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                    >
                      Schedule Demo
                    </a>

                    <div className="rounded-2xl bg-zinc-950/45 px-4 py-3 text-sm text-zinc-300 ring-1 ring-white/10">
                      Email:{" "}
                      <a
                        className="font-semibold text-white underline decoration-white/20 underline-offset-4 transition hover:decoration-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                        href="mailto:josh@usepreside.com"
                      >
                        josh@usepreside.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="mt-10 border-t border-white/10 pt-6 text-sm text-zinc-400">
              © Preside
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
