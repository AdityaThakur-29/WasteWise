"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Languages, Menu, X, Recycle, BarChart3, ArrowRight, ShieldCheck, Sparkles, BookOpen, Layers } from "lucide-react";

type MegaColumn = {
  eyebrow: string;
  links: { label: string; href: string; active?: boolean; badge?: string }[];
};

type MegaMenu = {
  columns: MegaColumn[];
  footerLinks?: { label: string; href: string }[];
  image: { src: string; alt: string };
  imageCaption?: string;
};

const ABOUT_MENU: MegaMenu = {
  columns: [
    {
      eyebrow: "Field Research",
      links: [
        { label: "College Field Study", href: "#about", active: true, badge: "Primary" },
        { label: "146 Mumbai Households", href: "#about" },
        { label: "Primary Survey Methodology", href: "#methodology" },
      ],
    },
    {
      eyebrow: "Target Audiences",
      links: [
        { label: "General Citizens & PG", href: "#about" },
        { label: "Environmental Students", href: "#about" },
        { label: "Faculty & Evaluators", href: "#about" },
      ],
    },
  ],
  footerLinks: [
    { label: "Understand the Waste", href: "#about" },
    { label: "See the Data", href: "#insights" },
    { label: "Improve the System", href: "#optimization" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop",
    alt: "Urban waste collection and segregation study",
  },
  imageCaption: "WasteWise: Data-Driven Civic Impact",
};

const FINDINGS_MENU: MegaMenu = {
  columns: [
    {
      eyebrow: "Systemic Bottlenecks",
      links: [
        { label: "Collector Mixing Loop", href: "#findings", active: true, badge: "44.4%" },
        { label: "Bin Availability Deficit", href: "#findings", badge: "60.0%" },
      ],
    },
    {
      eyebrow: "Behavioral Patterns",
      links: [
        { label: "Awareness vs Action Paradox", href: "#findings", badge: "26.7%" },
        { label: "Informal E-Waste Channel", href: "#findings", badge: "38%+" },
      ],
    },
  ],
  footerLinks: [
    { label: "Explore Interactive Card Stack", href: "#findings" },
    { label: "Voice of the Field (Direct Quotes)", href: "#findings" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    alt: "Empirical survey insights",
  },
  imageCaption: "4 Systemic Roadblocks Identified in Mumbai",
};

const AWARENESS_MENU: MegaMenu = {
  columns: [
    {
      eyebrow: "Waste Categories",
      links: [
        { label: "Wet Waste (Green Bin)", href: "#awareness", badge: "Organic" },
        { label: "Dry Recyclables (Blue Bin)", href: "#awareness" },
        { label: "Sanitary & Hazardous", href: "#awareness" },
        { label: "Electronic Waste (E-Waste)", href: "#awareness" },
      ],
    },
    {
      eyebrow: "Community Action",
      links: [
        { label: "Interactive Knowledge Quiz", href: "#campaign", badge: "Quiz" },
        { label: "Step-by-Step Segregation", href: "#awareness" },
        { label: "Ward Optimization Roadmap", href: "#optimization" },
      ],
    },
  ],
  footerLinks: [
    { label: "Zero-Waste Habits", href: "#awareness" },
    { label: "BMC Segregation Guidelines", href: "#campaign" },
  ],
  image: {
    src: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=800&auto=format&fit=crop",
    alt: "Color-coded waste segregation",
  },
  imageCaption: "Segregate At Source: Clean City Action",
};

const MEGA_MENUS: Record<string, MegaMenu> = {
  "About": ABOUT_MENU,
  "Key Findings": FINDINGS_MENU,
  "Awareness Hub": AWARENESS_MENU,
};

const NAV_ITEMS = [
  { label: "About", hasMenu: true },
  { label: "Key Findings", hasMenu: true },
  { label: "Awareness Hub", hasMenu: true },
] as const;

import { useLanguage, LANGUAGES, type LanguageCode } from '../context/LanguageContext';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (label: string, hasMenu: boolean) => {
    if (!hasMenu) {
      setOpenMenu(null);
      return;
    }
    setLangOpen(false);
    setOpenMenu((current) => (current === label ? null : label));
  };

  // Close the language dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [langOpen]);

  const activeMenu = openMenu ? MEGA_MENUS[openMenu] : null;

  const navItems = [
    { label: t('navAbout'), key: 'About', hasMenu: true },
    { label: t('navFindings'), key: 'Key Findings', hasMenu: true },
    { label: t('navAwareness'), key: 'Awareness Hub', hasMenu: true },
  ];

  return (
    <header className="sticky top-3 z-50 flex justify-center px-4 py-2 pointer-events-auto">
      <div className="w-full max-w-7xl">
        <motion.div
          layout
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-[0_2px_4px_rgba(0,0,0,0.03),0_12px_32px_-8px_rgba(0,0,0,0.08)]"
        >
          {/* Top row */}
          <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-7">
            {/* Logo without Field Data badge */}
            <a href="#hero" className="flex shrink-0 items-center gap-2.5 group cursor-pointer">
              <div className="w-10 h-10 rounded-2xl bg-emerald-800 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-700 transition-colors">
                <Recycle className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 block leading-tight">
                  WasteWise
                </span>
                <p className="text-[11px] font-sans text-slate-500 font-medium hidden sm:block">
                  {t('navMumbai')}
                </p>
              </div>
            </a>

            {/* Desktop nav with anelkabag animated triggers */}
            <nav className="hidden items-center gap-1.5 md:flex">
              {navItems.map((item) => {
                const isOpen = openMenu === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => toggleMenu(item.key, item.hasMenu)}
                    aria-expanded={isOpen}
                    className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                      isOpen
                        ? "bg-emerald-50 text-emerald-900 shadow-2xs"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-emerald-800" : ""
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="hidden shrink-0 items-center gap-2.5 sm:flex">
              {/* Language switcher */}
              <div className="relative z-50" ref={langRef}>
                <button
                  onClick={() => {
                    setOpenMenu(null);
                    setLangOpen((v) => !v);
                  }}
                  aria-expanded={langOpen}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer border border-slate-200/80 ${
                    langOpen
                      ? "bg-slate-100 text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Languages className="h-3.5 w-3.5 text-emerald-700" />
                  <span>{language}</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-300 ${
                      langOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-full z-[100] mt-2.5 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.18),0_6px_16px_-4px_rgba(0,0,0,0.1)]"
                    >
                      {LANGUAGES.map((lng) => (
                        <button
                          key={lng.code}
                          onClick={() => {
                            setLanguage(lng.code);
                            setLangOpen(false);
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 cursor-pointer"
                        >
                          <span>
                            {lng.label} <span className="text-slate-400 font-mono">({lng.code})</span>
                          </span>
                          {lng.code === language && (
                            <Check className="h-3.5 w-3.5 text-emerald-700" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Live Data CTA button */}
              <a
                href="#insights"
                onClick={() => setOpenMenu(null)}
                className="flex items-center gap-1.5 rounded-full bg-emerald-800 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700 cursor-pointer"
              >
                <BarChart3 className="h-3.5 w-3.5 text-emerald-300" />
                <span>{t('navLiveData')}</span>
              </a>
            </div>

            {/* Mobile trigger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex items-center justify-center rounded-full p-2 text-slate-700 md:hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop mega dropdown */}
          <AnimatePresence initial={false}>
            {activeMenu && (
              <motion.div
                key={openMenu}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="hidden overflow-hidden md:block border-t border-slate-100"
              >
                <div className="grid grid-cols-[1.1fr_1.1fr_auto] gap-8 px-8 pb-8 pt-5">
                  {activeMenu.columns.map((col, colIdx) => (
                    <div key={col.eyebrow} className="flex flex-col gap-4">
                      <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-mono font-semibold text-emerald-800">
                        {col.eyebrow}
                      </span>
                      <ul className="flex flex-col gap-3">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              onClick={() => setOpenMenu(null)}
                              className={`group flex items-center gap-2 text-base font-semibold text-slate-800 hover:text-emerald-800 transition-colors ${
                                link.active ? "text-emerald-900" : ""
                              }`}
                            >
                              <span>{link.label}</span>
                              {link.badge && (
                                <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wide text-white group-hover:bg-emerald-800">
                                  {link.badge}
                                </span>
                              )}
                              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                            </a>
                          </li>
                        ))}
                      </ul>

                      {/* Footer links sit under the last column */}
                      {colIdx === activeMenu.columns.length - 1 && activeMenu.footerLinks && (
                        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-4 border-t border-slate-100">
                          {activeMenu.footerLinks.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={() => setOpenMenu(null)}
                              className="text-xs text-slate-400 hover:text-emerald-800 transition-colors"
                            >
                              {item.label} →
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Preview image card */}
                  <div className="relative hidden h-56 w-72 flex-col justify-end overflow-hidden rounded-2xl lg:flex shadow-sm border border-slate-200/80">
                    <img
                      src={activeMenu.image.src}
                      alt={activeMenu.image.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {activeMenu.imageCaption && (
                      <div className="relative z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-10">
                        <p className="text-xs font-semibold text-white leading-tight">
                          {activeMenu.imageCaption}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile slide-down panel */}
          <AnimatePresence initial={false}>
            {mobileOpen && (
              <motion.div
                key="mobile-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden md:hidden border-t border-slate-100"
              >
                <div className="flex flex-col gap-1 px-5 pb-6 pt-3">
                  {navItems.map((item) => (
                    <div key={item.key} className="border-b border-slate-100 pb-2">
                      <button
                        onClick={() => toggleMenu(item.key, true)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-slate-400 transition-transform ${
                            openMenu === item.key ? "rotate-180 text-emerald-800" : ""
                          }`}
                        />
                      </button>

                      {openMenu === item.key && (
                        <div className="ml-3 flex flex-col gap-2 border-l-2 border-emerald-500 pl-4 py-2">
                          {MEGA_MENUS[item.key]?.columns.flatMap((c) =>
                            c.links.map((link) => (
                              <a
                                key={link.label}
                                href={link.href}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setOpenMenu(null);
                                }}
                                className="flex items-center justify-between py-1 text-xs font-medium text-slate-600 hover:text-emerald-800"
                              >
                                <span>{link.label}</span>
                                {link.badge && (
                                  <span className="rounded-full bg-slate-900 px-1.5 py-0.5 text-[9px] font-mono text-white">
                                    {link.badge}
                                  </span>
                                )}
                              </a>
                            )),
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Mobile language switcher */}
                  <div className="mt-3 flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold text-slate-500">
                      Language:
                    </span>
                    <div className="flex gap-1.5">
                      {LANGUAGES.map((lng) => (
                        <button
                          key={lng.code}
                          onClick={() => setLanguage(lng.code)}
                          className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
                            lng.code === language
                              ? "border-emerald-800 bg-emerald-800 text-white"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {lng.code}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile CTA */}
                  <div className="mt-4 pt-2">
                    <a
                      href="#insights"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-xs"
                    >
                      <BarChart3 className="w-4 h-4 text-emerald-300" />
                      <span>{t('heroExploreData')}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}
