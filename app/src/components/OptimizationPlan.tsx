import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  CheckCircle2, 
  ArrowRight, 
  Trash2, 
  CalendarClock, 
  HelpCircle, 
  BatteryCharging, 
  Users, 
  MessageSquareWarning,
  Sparkles,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export const OptimizationPlan: React.FC = () => {
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

  return (
    <section id="optimization" className="py-10 sm:py-16 md:py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <Badge variant="outline" className="text-xs uppercase font-mono tracking-wider font-semibold text-emerald-800 bg-emerald-50 border-emerald-200 px-3 py-1 mb-2.5 sm:mb-3">
            Academic Intervention Framework
          </Badge>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight">
            Proposed Optimization Plan
          </h2>
          <p className="mt-2.5 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal px-1 sm:px-0">
            Every recommendation is directly tied to verified survey evidence, utilizing the academic sequence: <strong>Identified Problem → Evidence from Survey → Proposed Solution → Expected Impact</strong>.
          </p>
        </div>

        {/* 6 Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {plans.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.id} className="bg-white border-slate-200 min-w-0 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                      Strategy #{p.id}
                    </span>
                    <Badge variant="outline" className="text-[11px] font-sans border-slate-300 text-slate-700">
                      {p.tag}
                    </Badge>
                  </div>
                  <CardTitle className="font-heading font-bold text-lg text-slate-900 flex items-start gap-2 leading-snug">
                    <Icon className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{p.title}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0 space-y-3.5 text-xs">
                  {/* Identified Problem */}
                  <div className="p-2.5 bg-rose-50/60 rounded-md border border-rose-100">
                    <span className="font-semibold text-rose-900 uppercase font-mono tracking-wider text-[10px] block mb-0.5">
                      1. Identified Problem
                    </span>
                    <p className="text-rose-950 font-normal leading-relaxed">{p.problem}</p>
                  </div>

                  {/* Survey Evidence */}
                  <div className="p-2.5 bg-amber-50/60 rounded-md border border-amber-100">
                    <span className="font-semibold text-amber-900 uppercase font-mono tracking-wider text-[10px] block mb-0.5">
                      2. Evidence From Survey
                    </span>
                    <p className="text-amber-950 font-normal leading-relaxed">{p.evidence}</p>
                  </div>

                  {/* Proposed Solution */}
                  <div className="p-2.5 bg-emerald-50/60 rounded-md border border-emerald-100">
                    <span className="font-semibold text-emerald-900 uppercase font-mono tracking-wider text-[10px] block mb-0.5">
                      3. Proposed Solution
                    </span>
                    <p className="text-emerald-950 font-normal leading-relaxed">{p.solution}</p>
                  </div>

                  {/* Expected Impact */}
                  <div className="p-2.5 bg-slate-100/80 rounded-md border border-slate-200">
                    <span className="font-semibold text-slate-700 uppercase font-mono tracking-wider text-[10px] block mb-0.5 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-700" />
                      4. Expected Impact
                    </span>
                    <p className="text-slate-800 font-medium leading-relaxed">{p.impact}</p>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Window: <strong>{p.timeframe}</strong></span>
                    <span>Priority: <strong className={p.priority === 'Urgent' ? 'text-rose-600' : 'text-emerald-700'}>{p.priority}</strong></span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
