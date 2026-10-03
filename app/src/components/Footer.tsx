import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-transparent pt-8 sm:pt-14">
      {/* 100% Full-Width Dark Technical Footer Frame with Rounded Top */}
      <div className="relative w-full rounded-t-[36px] sm:rounded-t-[50px] lg:rounded-t-[64px] bg-[#0a0d14] text-white border-t border-slate-800/90 overflow-hidden shadow-2xl px-6 sm:px-12 lg:px-20 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]">
        
        {/* Inner Content Wrapper */}
        <div className="w-full max-w-[1700px] mx-auto">
          
          {/* Top Control Bar */}
          <div className="flex items-center justify-between pb-8 sm:pb-12 border-b border-slate-800/60">
            <div className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-slate-400">
              <span className="w-5 h-5 rounded-full bg-white text-[#0a0d14] flex items-center justify-center font-black text-[10px]">
                W
              </span>
              <span>FOOTER</span>
            </div>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-500 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs group"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="pt-8 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start relative">
            
            {/* Left Column: Inquiry + Giant Email */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#ff5722] mb-3 sm:mb-4">
                  HAVE AN IDEA WORTH BUILDING?
                </div>

                <a
                  href="https://my-portfoliopot.vercel.app/"
                  className="group inline-flex items-center gap-2 sm:gap-3 text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none hover:text-slate-200 transition-colors"
                >
                  <span>hello@adityaThakur</span>
                  <ArrowUpRight className="w-7 h-7 sm:w-10 sm:h-10 text-[#ff5722] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                </a>
              </div>
            </div>

            {/* Right Column: 2 Link Groups Tailored to WasteWise */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-6 sm:gap-10">
              {/* Group 1: Research & Insights */}
              <div>
                <div className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-slate-300 font-bold mb-3.5 sm:mb-4">
                  RESEARCH & DATA
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-[15px] text-slate-400 font-medium">
                  <li>
                    <a href="#about" className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                      About Study
                    </a>
                  </li>
                  <li>
                    <a href="#insights" className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                      Survey Insights
                    </a>
                  </li>
                  <li>
                    <a href="#findings" className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                      Key Findings
                    </a>
                  </li>
                  <li>
                    <a href="#optimization" className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                      Optimization Plan
                    </a>
                  </li>
                  <li>
                    <a href="#methodology" className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                      Raw Survey Data
                    </a>
                  </li>
                </ul>
              </div>

              {/* Group 2: Civic & Awareness */}
              <div>
                <div className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-slate-300 font-bold mb-3.5 sm:mb-4">
                  CIVIC & ACTION
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-[15px] text-slate-400 font-medium">
                  <li>
                    <a href="#awareness" className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                      Awareness Hub
                    </a>
                  </li>
                  <li>
                    <a href="#awareness" className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                      Segregation Guide
                    </a>
                  </li>
                  <li>
                    <a href="#campaign" className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                      Civic Campaign
                    </a>
                  </li>
                  <li>
                    <a href="#campaign" className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                      Interactive Quiz
                    </a>
                  </li>
                  <li>
                    <a href="#findings" className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                      Citizen Voices
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Giant Typographic Headline matching 'OhhMyDesign' */}
          <div className="my-8 sm:my-14 overflow-hidden w-full select-none">
            <div className="font-heading font-black text-[15.5vw] leading-none tracking-tighter text-white flex items-baseline w-full">
              <span className="text-[#ff5722]">W</span>
              <span>asteWise</span>
            </div>
          </div>

          {/* Ruler Tick Marks Strip */}
          <div className="w-full h-2 border-t border-slate-800/80 flex justify-between items-start opacity-30 select-none pointer-events-none mb-3">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`w-px bg-slate-400 ${i % 8 === 0 ? 'h-2.5' : 'h-1'}`}
              />
            ))}
          </div>

          

          </div>

    </div>
    </footer>
  );
};
