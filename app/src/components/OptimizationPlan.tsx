import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TextAnimate } from './ui/text-animate';
import { 
  Trash2, 
  CalendarClock, 
  BatteryCharging, 
  Users, 
  MessageSquareWarning,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export const OptimizationPlan: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const plans = [
    {
      id: '01',
      title: 'Standardized Dual-Bin Household Distribution',
      icon: Trash2,
      tag: 'Infrastructure',
      problem: 'High bin deficit: 44.4% of households have no separate bins; 15.6% only have partial setups.',
      evidence: 'Survey Q10 indicates 60% of households lack adequate segregation infrastructure, making source-mixing the default habit.',
      solution: 'Roll out subsidized, clearly labeled two-bin kits (Green for Wet/Organic, Blue for Dry/Recyclable) to every residential society.',
      impact: 'Immediate 35-40% increase in household source segregation compliance within 90 days.',
      timeframe: '0-3 Months',
      priority: 'High'
    },
    {
      id: '02',
      title: 'Anti-Mixing Protocol & Partitioned Vehicles',
      icon: ShieldCheck,
      tag: 'Logistics',
      problem: 'Collectors mixing segregated waste back into a single truck bed, destroying public trust.',
      evidence: 'Survey Q9 revealed 44.4% of citizens stopped segregating specifically because "the collector mixes the waste anyway".',
      solution: 'Enforce strict compartmentalization in collection vehicles, GPS tracking, and penalties/incentives for sanitation workers based on clean segregated pickup.',
      impact: 'Eliminates the #1 demotivating factor; restores civic faith in municipal waste management.',
      timeframe: 'Immediate',
      priority: 'Urgent'
    },
    {
      id: '03',
      title: 'Fixed Scheduled Timetable & SMS Arrival Alerts',
      icon: CalendarClock,
      tag: 'Operations',
      problem: 'Irregular collection timings causing overflowing community bins, bad smell, and stray animals.',
      evidence: 'Survey Q14 highlighted overflowing bins (51%) and foul odor (48%) as the primary neighborhood nuisances.',
      solution: 'Establish fixed 2-hour daily pickup windows per lane with automated SMS/WhatsApp alerts 15 minutes before the collection truck arrives.',
      impact: 'Reduces open bin overflow by 60% and prevents garbage exposure to rain and stray animals.',
      timeframe: '1-3 Months',
      priority: 'High'
    },
    {
      id: '04',
      title: 'Ward-Level Quarterly E-Waste Drives',
      icon: BatteryCharging,
      tag: 'Hazardous Waste',
      problem: 'Over 38% of residents discard toxic electronics into regular municipal garbage or informal scrap routes.',
      evidence: 'Survey Q16 shows minimal awareness of authorized e-waste centers, with batteries and chargers dumped in landfills.',
      solution: 'Partner with authorized recyclers to establish permanent drop-off kiosks in local post offices and host quarterly Sunday collection drives with small token incentives.',
      impact: 'Safely diverts toxic heavy metals (lead, cadmium) from local landfills and open burning.',
      timeframe: '3-6 Months',
      priority: 'Medium'
    },
    {
      id: '05',
      title: 'Visual Multi-Lingual Segregation Signage',
      icon: Users,
      tag: 'Public Awareness',
      problem: 'Confusion regarding borderline items (soiled food paper, multi-layered plastic, sanitary pads).',
      evidence: 'Survey Q18 shows 68% of residents have only moderate awareness and request clear pictorial guidelines.',
      solution: 'Mount durable, pictorial stickers in Marathi, Hindi, and English directly above communal dustbins in societies, markets, and transit stations.',
      impact: 'Lowers contamination rate of recyclable plastics and cardboards by up to 45%.',
      timeframe: '1-2 Months',
      priority: 'High'
    },
    {
      id: '06',
      title: 'QR Code Civic Grievance & Overflow Reporting',
      icon: MessageSquareWarning,
      tag: 'Civic Tech',
      problem: 'Citizens lack a simple, fast mechanism to flag missed collections or uncollected heaps.',
      evidence: 'Survey Q21 and Q23 showed overwhelming citizen appetite for transparent reporting and responsive municipal staff.',
      solution: 'Place scannable QR codes on every community bin linking to a lightweight WhatsApp chatbot where residents upload photos of overflowing bins for guaranteed 4-hour clearance.',
      impact: 'Cuts municipal resolution time from 48+ hours to under 4 hours, dramatically cleaning street corners.',
      timeframe: '2-4 Months',
      priority: 'Medium'
    }
  ];

  // Scroll Progress Hook bound to the parent 300vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  // Calculate dynamic pixel width of track relative to viewport
  const updateScrollRange = () => {
    if (trackRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      // Leave generous padding at the right end for aesthetics
      const padding = windowWidth < 640 ? 40 : 120;
      const maxScroll = Math.max(0, trackWidth - windowWidth + padding);
      setScrollRange(maxScroll);
    }
  };

  useEffect(() => {
    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);
    return () => window.removeEventListener('resize', updateScrollRange);
  }, []);

  // Map vertical scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // Track active card index based on scroll position
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const rawIndex = Math.round(latest * (plans.length - 1));
    const clamped = Math.max(0, Math.min(plans.length - 1, rawIndex));
    setActiveIndex(clamped);
  });

  // Programmatic scroll step helper for buttons and pagination dots
  const scrollToCard = (index: number) => {
    if (!targetRef.current) return;
    const rect = targetRef.current.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const totalScrollableHeight = targetRef.current.offsetHeight - window.innerHeight;
    const stepHeight = totalScrollableHeight / (plans.length - 1);
    
    window.scrollTo({
      top: top + index * stepHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      id="optimization" 
      ref={targetRef} 
      className="relative h-[320vh] bg-transparent"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-8">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0">
          <div className="max-w-4xl mx-auto text-center">
            <TextAnimate
              as="h2"
              animation="blurIn"
              by="word"
              className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tight"
            >
              Proposed Optimization Plan
            </TextAnimate>
            <TextAnimate
              as="p"
              animation="blurIn"
              by="word"
              className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed font-normal"
            >
              Every recommendation is directly tied to verified survey evidence: Identified Problem → Evidence from Survey → Proposed Solution → Expected Impact.
            </TextAnimate>
          </div>
        </div>

        {/* Scroll-Driven Horizontal Track */}
        <div className="relative w-full overflow-hidden flex-1 flex items-center my-auto py-2">
          <motion.div 
            ref={trackRef}
            style={{ x }}
            className="flex gap-4 sm:gap-6 items-stretch px-4 sm:px-10 lg:px-16 w-max will-change-transform"
          >
            {plans.map((p, idx) => {
              const Icon = p.icon;
              const isCurrent = activeIndex === idx;

              return (
                <Card 
                  key={p.id} 
                  className={`w-[290px] sm:w-[360px] md:w-[410px] shrink-0 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                    isCurrent 
                      ? 'bg-white border-emerald-600 shadow-2xl scale-[1.01]' 
                      : 'bg-white border-slate-200/90 shadow-md hover:shadow-xl hover:border-slate-300'
                  }`}
                >
                  <CardHeader className="pb-2.5 pt-4 sm:pt-5 px-4 sm:px-6">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        Strategy #{p.id}
                      </span>
                      <span className="text-[11px] font-mono font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {p.tag}
                      </span>
                    </div>
                    <CardTitle className="font-heading font-bold text-base sm:text-lg md:text-xl text-slate-900 flex items-start gap-2.5 leading-snug">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-900 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{p.title}</span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0 px-4 sm:px-6 pb-4 sm:pb-5 space-y-2.5 text-xs">
                    {/* Identified Problem */}
                    <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200">
                      <span className="font-semibold text-rose-950 uppercase font-mono tracking-wider text-[10px] block mb-0.5">
                        1. Identified Problem
                      </span>
                      <p className="text-slate-800 font-normal leading-relaxed line-clamp-3">{p.problem}</p>
                    </div>

                    {/* Survey Evidence */}
                    <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                      <span className="font-semibold text-amber-950 uppercase font-mono tracking-wider text-[10px] block mb-0.5">
                        2. Evidence From Survey
                      </span>
                      <p className="text-slate-800 font-normal leading-relaxed line-clamp-3">{p.evidence}</p>
                    </div>

                    {/* Proposed Solution */}
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <span className="font-semibold text-emerald-950 uppercase font-mono tracking-wider text-[10px] block mb-0.5">
                        3. Proposed Solution
                      </span>
                      <p className="text-slate-800 font-normal leading-relaxed line-clamp-3">{p.solution}</p>
                    </div>

                    {/* Expected Impact */}
                    <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-200">
                      <span className="font-semibold text-sky-950 uppercase font-mono tracking-wider text-[10px] block mb-0.5 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                        4. Expected Impact
                      </span>
                      <p className="text-slate-900 font-medium leading-relaxed line-clamp-3">{p.impact}</p>
                    </div>

                    {/* Footer Meta */}
                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-700 font-mono border-t border-slate-100">
                      <span>Window: <strong className="text-slate-900">{p.timeframe}</strong></span>
                      <span>Priority: <strong className={p.priority === 'Urgent' ? 'text-rose-700 font-bold' : 'text-emerald-800'}>{p.priority}</strong></span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Scroll Progress Bar & Dots Indicator */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
            {/* Progress track */}
            <div className="w-full sm:w-64 h-1.5 bg-white/60 rounded-full overflow-hidden border border-slate-200">
              <motion.div 
                className="h-full bg-emerald-700 rounded-full origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>

            {/* Quick jump strategy dots */}
            <div className="flex items-center gap-2">
              {plans.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === i ? 'w-8 bg-emerald-800' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Jump to strategy ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
