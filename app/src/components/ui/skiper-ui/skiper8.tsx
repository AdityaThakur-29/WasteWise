"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skiper8Props {
  words?: string[];
  durationPerWord?: number;
  onComplete?: () => void;
  className?: string;
}

const defaultWords = [
  "WasteWise",
  "Field Research",
  "146 Household Responses",
  "Data Insights",
  "Segregation At Source",
  "Cleaner Mumbai",
  "WasteWise"
];

export const Skiper8 = ({
  words = defaultWords,
  durationPerWord = 200,
  onComplete,
  className = ""
}: Skiper8Props) => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        if (onComplete) onComplete();
      }, durationPerWord * 1.5);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, durationPerWord);

    return () => clearTimeout(timer);
  }, [index, words.length, durationPerWord, onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curveVariants: any = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 },
    },
  };

  const slideUp: any = {
    initial: {
      top: 0,
    },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && dimension.width > 0 && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 text-white cursor-wait select-none ${className}`}
        >
          {/* Centered Word Transition */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                  className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="mt-4 text-[11px] font-mono tracking-widest text-emerald-400/70 uppercase">
              Field Study & Data Platform
            </div>
          </div>

          {/* Dennis Snellenberg curved SVG bottom edge */}
          <svg className="absolute top-0 w-full h-[calc(100%+300px)] pointer-events-none fill-slate-950">
            <motion.path
              variants={curveVariants}
              initial="initial"
              exit="exit"
            />
          </svg>

          {/* Quick Skip button in corner */}
          <button
            onClick={() => {
              setIsLoading(false);
              if (onComplete) onComplete();
            }}
            className="absolute bottom-6 right-6 z-20 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/60"
          >
            Skip ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Skiper8;
