import React from 'react';
import { Recycle, GraduationCap, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-10 sm:py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <Recycle className="w-4 h-4 text-emerald-300" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                WasteWise
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              A data-driven waste management awareness and insights platform developed as part of a college field project. Transforming primary community survey responses into actionable statistics and civic solutions.
            </p>
            <p className="text-[11px] font-mono text-emerald-400">
              "Understand the Waste. See the Data. Improve the System."
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#hero" className="hover:text-emerald-400 transition-colors">Hero Overview</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">Field Methodology</a></li>
              <li><a href="#insights" className="hover:text-emerald-400 transition-colors">Survey Dashboard</a></li>
              <li><a href="#findings" className="hover:text-emerald-400 transition-colors">Key Findings</a></li>
              <li><a href="#optimization" className="hover:text-emerald-400 transition-colors">Optimization Plan</a></li>
              <li><a href="#awareness" className="hover:text-emerald-400 transition-colors">Awareness Hub</a></li>
            </ul>
          </div>

          {/* Academic Context */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              Field Project
            </h4>
            <p className="text-xs leading-relaxed">
              Conducted in Mumbai Metropolitan communities. All figures derived from genuine primary survey responses.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
                Back to Top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} WasteWise Platform. College Field Study Submission.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with React, Vite, Tailwind CSS & Recharts</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
