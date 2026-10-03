"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
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

export const StickyFindingCard = ({
  i,
  total = 4,
  finding,
  progress,
  range,
  targetScale,
}: {
  i: number;
  total?: number;
  finding: FindingData;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  const isLast = i === total - 1;

  return (
    <div
      ref={container}
      style={{
        top: `calc(clamp(96px, 12vh, 120px) + ${i * 22}px)`,
        zIndex: i + 10,
      }}
      className={`sticky flex items-start justify-center w-full px-2.5 sm:px-4 pointer-events-auto ${
        isLast ? 'min-h-0 pb-4 sm:pb-6' : 'min-h-[34vh] sm:min-h-[40vh] md:min-h-[44vh]'
      }`}
    >
      <motion.div
        style={{
          scale,
        }}
        className="relative w-full max-w-4xl origin-top rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xl border border-slate-200 bg-white transition-shadow hover:shadow-2xl"
      >
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 sm:mb-4 pb-2.5 sm:pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center font-mono font-bold text-xs sm:text-sm shadow-xs ${finding.iconBg}`}>
              #{finding.id}
            </span>
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase text-emerald-900">
                {finding.category}
              </span>
            </div>
          </div>
          <span className={`text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold border ${finding.badgeColor}`}>
            {finding.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-extrabold text-lg sm:text-2xl lg:text-3xl text-slate-900 tracking-tight leading-snug mb-2.5 sm:mb-4">
          {finding.title}
        </h3>

        {/* Evidence Quote Block */}
        <div className="p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs mb-2.5 sm:mb-4">
          <div className="text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            Field Evidence from 146 Households:
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug sm:leading-relaxed italic">
            "{finding.evidence}"
          </p>
        </div>

        {/* Detailed Explanation */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-3 sm:mb-5 line-clamp-3 sm:line-clamp-4 lg:line-clamp-none">
          {finding.detail}
        </p>

        {/* Impact Metric Callout Footer */}
        <div className="pt-2.5 sm:pt-4 border-t border-slate-200/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs font-medium text-slate-600 line-clamp-1">
              {finding.impactLabel}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5 sm:gap-2 shrink-0">
            <span className="text-[9px] sm:text-xs font-mono uppercase text-slate-400">Impact Ratio</span>
            <span className="font-mono font-black text-lg sm:text-2xl lg:text-3xl text-slate-900 tracking-tight">
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
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={container}
      className="relative w-full flex flex-col items-center justify-start pt-2 sm:pt-4 pb-2 sm:pb-4"
    >
      {findings.map((finding, i) => {
        const targetScale = Math.max(0.92, 1 - (findings.length - i - 1) * 0.025);
        return (
          <StickyFindingCard
            key={finding.id}
            i={i}
            total={findings.length}
            finding={finding}
            progress={scrollYProgress}
            range={[i * 0.22, 1]}
            targetScale={targetScale}
          />
        );
      })}
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
