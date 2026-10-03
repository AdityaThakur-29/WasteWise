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
      className="sticky top-20 sm:top-24 flex items-start justify-center w-full h-[60vh] sm:h-[70vh] px-4 pointer-events-auto"
    >
      <motion.div
        style={{
          scale,
          top: `calc(12px + ${i * 24}px)`,
        }}
        className={`relative w-full max-w-4xl origin-top rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border ${finding.borderColor} ${finding.bgGradient} backdrop-blur-md transition-shadow hover:shadow-3xl`}
      >
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-200/70">
          <div className="flex items-center gap-3">
            <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-bold text-sm shadow-xs ${finding.iconBg}`}>
              #{finding.id}
            </span>
            <div>
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-800">
                {finding.category}
              </span>
            </div>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${finding.badgeColor}`}>
            {finding.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-snug mb-4">
          {finding.title}
        </h3>

        {/* Evidence Quote Block */}
        <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/90 shadow-2xs mb-5">
          <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            Field Evidence from 146 Households:
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic">
            "{finding.evidence}"
          </p>
        </div>

        {/* Detailed Explanation */}
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6">
          {finding.detail}
        </p>

        {/* Impact Metric Callout Footer */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-600">
              {finding.impactLabel}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-mono uppercase text-slate-400">Impact Ratio</span>
            <span className="font-mono font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
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
      className="relative flex w-full flex-col items-center justify-start pt-6 pb-[20vh]"
    >
      {findings.map((finding, i) => {
        const targetScale = Math.max(0.88, 1 - (findings.length - i - 1) * 0.04);
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
