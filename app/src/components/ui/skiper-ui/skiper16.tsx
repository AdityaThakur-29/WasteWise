"use client";

import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";

const projects = [
  {
    title: "Project 1",
    src: "/images/lummi/img8.png",
  },
  {
    title: "Project 2",
    src: "/images/lummi/img14.png",
  },
  {
    title: "Project 3",
    src: "/images/lummi/img10.png",
  },
  {
    title: "Project 4",
    src: "/images/lummi/img15.png",
  },
  {
    title: "Project 5",
    src: "/images/lummi/img12.png",
  },
];

const StickyCard_001 = ({
  i,
  title,
  src,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  src: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 20 + 250}px)`,
        }}
        className="rounded-4xl relative -top-1/4 flex h-[300px] w-[500px] origin-top flex-col overflow-hidden"
      >
        <img src={src} alt={title} className="h-full w-full object-cover" />
      </motion.div>
    </div>
  );
};

export interface FindingData {
  id: string;
  title: string;
  category: string;
  badge: string;
  badgeColor: string;
  bgGradient: string;
  borderColor: string;
  iconBg: string;
  evidence: string;
  detail: string;
  impactMetric: string;
  impactLabel: string;
  icon?: React.ReactNode;
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export const StickyFindingCard = ({
  i,
  finding,
  progress,
  range,
  targetScale,
}: {
  i: number;
  finding: FindingData;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-16 lg:top-20 flex items-start justify-center w-full min-h-[50vh] sm:min-h-[55vh] px-3 sm:px-4 pointer-events-auto"
    >
      <motion.div
        style={{
          scale,
          top: `calc(4px + ${i * 16}px)`,
        }}
        className={`relative w-full max-w-4xl origin-top rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xl border ${finding.borderColor} ${finding.bgGradient} backdrop-blur-md transition-shadow hover:shadow-2xl`}
      >
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-200/70">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs sm:text-sm shadow-xs ${finding.iconBg}`}>
              #{finding.id}
            </span>
            <div>
              <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase text-emerald-800">
                {finding.category}
              </span>
            </div>
          </div>
          <span className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold border ${finding.badgeColor}`}>
            {finding.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-slate-900 tracking-tight leading-snug mb-3 sm:mb-4">
          {finding.title}
        </h3>

        {/* Evidence Quote Block */}
        <div className="p-3 sm:p-4 bg-white/90 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs mb-3 sm:mb-4">
          <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            Field Evidence from 146 Households:
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic">
            "{finding.evidence}"
          </p>
        </div>

        {/* Detailed Explanation */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4 sm:mb-5 line-clamp-3 lg:line-clamp-none">
          {finding.detail}
        </p>

        {/* Impact Metric Callout Footer */}
        <div className="pt-3 sm:pt-4 border-t border-slate-200/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-medium text-slate-600">
              {finding.impactLabel}
            </span>
          </div>
          <div className="flex items-baseline gap-2 shrink-0">
            <span className="text-[10px] sm:text-xs font-mono uppercase text-slate-400">Impact Ratio</span>
            <span className="font-mono font-black text-xl sm:text-2xl lg:text-3xl text-slate-900 tracking-tight">
              {finding.impactMetric}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Skiper16FindingsStack = ({
  findings,
}: {
  findings: FindingData[];
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const activeFinding = findings[activeMobileIdx] || findings[0];

  return (
    <div className="w-full">
      {/* MOBILE & TABLET (<md) DEDICATED ONE-FRAME VIEW */}
      <div className="block md:hidden w-full">
        {/* Finding Selector Pills */}
        <div className="flex items-center justify-between gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 mb-3 overflow-x-auto no-scrollbar">
          {findings.map((f, idx) => (
            <button
              key={f.id}
              onClick={() => setActiveMobileIdx(idx)}
              className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                activeMobileIdx === idx
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>#{f.id}</span>
              <span className="text-[9px] font-sans font-medium truncate max-w-[65px]">
                {f.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile Finding Card: Strictly Fits One Screen */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFinding.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full rounded-2xl p-4 shadow-md border ${activeFinding.borderColor} ${activeFinding.bgGradient} backdrop-blur-sm`}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-2.5 pb-2.5 border-b border-slate-200/70">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shadow-2xs ${activeFinding.iconBg}`}>
                  #{activeFinding.id}
                </span>
                <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-emerald-800 truncate max-w-[170px]">
                  {activeFinding.category}
                </span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${activeFinding.badgeColor}`}>
                {activeFinding.badge}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-heading font-extrabold text-lg text-slate-900 tracking-tight leading-snug mb-2.5">
              {activeFinding.title}
            </h3>

            {/* Evidence Quote Block */}
            <div className="p-2.5 bg-white/95 rounded-xl border border-slate-200/90 shadow-2xs mb-2.5">
              <div className="text-[9px] uppercase font-mono font-bold tracking-wider text-slate-500 mb-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                Field Evidence:
              </div>
              <p className="text-xs font-semibold text-slate-800 leading-snug italic">
                "{activeFinding.evidence}"
              </p>
            </div>

            {/* Detailed Explanation */}
            <p className="text-xs text-slate-600 leading-relaxed font-normal mb-3">
              {activeFinding.detail}
            </p>

            {/* Footer with Impact Metric and Nav Controls */}
            <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-mono text-slate-400">Impact Metric</span>
                <span className="font-mono font-black text-xl text-slate-900 tracking-tight">
                  {activeFinding.impactMetric}
                </span>
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveMobileIdx(prev => (prev > 0 ? prev - 1 : findings.length - 1))}
                  className="w-8 h-8 rounded-lg border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs"
                  aria-label="Previous Finding"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono font-semibold text-slate-500 px-1">
                  {activeMobileIdx + 1}/{findings.length}
                </span>
                <button
                  onClick={() => setActiveMobileIdx(prev => (prev < findings.length - 1 ? prev + 1 : 0))}
                  className="w-8 h-8 rounded-lg border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs"
                  aria-label="Next Finding"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DESKTOP (md+) STICKY STACKING FRAME */}
      <div
        ref={container}
        className="hidden md:flex relative w-full flex-col items-center justify-start pt-4 pb-[16vh]"
      >
        {findings.map((finding, i) => {
          const targetScale = Math.max(0.9, 1 - (findings.length - i - 1) * 0.035);
          return (
            <StickyFindingCard
              key={finding.id}
              i={i}
              finding={finding}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
};

const Skiper16 = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <main
        ref={container}
        className="relative flex w-full flex-col items-center justify-center pb-[100vh] pt-[50vh]"
      >
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
          <span className="after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']">
            scroll down to see card stack
          </span>
        </div>
        {projects.map((project, i) => {
          const targetScale = Math.max(
            0.5,
            1 - (projects.length - i - 1) * 0.1,
          );
          return (
            <StickyCard_001
              key={`p_${i}`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    </ReactLenis>
  );
};

export { Skiper16, StickyCard_001 };
