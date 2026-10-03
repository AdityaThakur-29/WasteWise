import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Apple, 
  Package, 
  Laptop, 
  Biohazard, 
  Check, 
  X, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Sparkles
} from 'lucide-react';

export const AwarenessHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'wet' | 'dry' | 'ewaste' | 'sanitary'>('wet');

  const categories = {
    wet: {
      id: 'wet',
      title: 'Wet / Organic Waste',
      color: 'border-emerald-500 text-emerald-800 bg-emerald-50/50',
      badge: 'Green Bin',
      icon: Apple,
      desc: 'Biodegradable kitchen remnants and biological matter that can be composted into nutrient-rich soil.',
      allowed: [
        'Vegetable & fruit peels, rotten produce',
        'Leftover cooked meal scraps & bones',
        'Tea leaves, coffee grounds & eggshells',
        'Garden leaves, cut flowers & plant trimmings',
        'Coconut shells & soiled raw food wraps'
      ],
      forbidden: [
        'Plastic packaging or cling wrap',
        'Sanitary napkins or diapers',
        'Glass bottles or metal foil',
        'Batteries or electronic toys'
      ],
      disposalTip: 'Store in an unlined or newspaper-lined container. Hand over daily for community composting or biogas generation.'
    },
    dry: {
      id: 'dry',
      title: 'Dry / Recyclable Waste',
      color: 'border-blue-500 text-blue-800 bg-blue-50/50',
      badge: 'Blue Bin',
      icon: Package,
      desc: 'Non-biodegradable, clean materials that can be remanufactured into new products through industrial recycling.',
      allowed: [
        'Paper, cardboard boxes, newspapers & books',
        'Plastic bottles, milk pouches (rinsed & dried)',
        'Aluminium cans, tins & clean metal lids',
        'Glass bottles & unbroken glass jars',
        'Tetra paks & clean delivery packaging'
      ],
      forbidden: [
        'Greasy pizza boxes with heavy food residue',
        'Wet kitchen scraps or biological fluids',
        'Broken CFL lamps (contains mercury)',
        'Syringes or medication blister packs'
      ],
      disposalTip: 'Ensure plastic pouches and bottles are rinsed and dried before storage so they do not attract pests or mold.'
    },
    ewaste: {
      id: 'ewaste',
      title: 'Electronic Waste (E-Waste)',
      color: 'border-amber-500 text-amber-800 bg-amber-50/50',
      badge: 'Dedicated Box',
      icon: Laptop,
      desc: 'Discarded electronics with toxic components (lithium, mercury, lead) that require authorized chemical recycling.',
      allowed: [
        'Dead smartphones, feature phones & tablets',
        'USB cables, chargers, power banks & adapters',
        'Dry alkaline batteries, button cells & power bricks',
        'Defunct keyboards, mice, earbuds & headphones',
        'Small household appliances (iron, mixer grinder)'
      ],
      forbidden: [
        'Throwing in regular municipal trash bins',
        'Open burning or melting plastic insulation',
        'Dumping in communal open garbage vats',
        'Crushing or dismantling lithium-ion batteries'
      ],
      disposalTip: 'Collect separately in an indoor cardboard box and take to authorized e-waste collection bins or quarterly neighborhood drives.'
    },
    sanitary: {
      id: 'sanitary',
      title: 'Sanitary & Hazardous Waste',
      color: 'border-rose-500 text-rose-800 bg-rose-50/50',
      badge: 'Red / Marked Wrap',
      icon: Biohazard,
      desc: 'Infectious or biohazardous materials that mandate careful wrapping to protect municipal sanitation workers from pathogens.',
      allowed: [
        'Sanitary napkins & tampons (wrapped in paper with red dot)',
        'Baby & adult diapers (wrapped securely)',
        'Expired medicines, ointments & syrups',
        'Used cotton swabs, bandages & facial wipes',
        'Sharps (razor blades, needles capped safely)'
      ],
      forbidden: [
        'Flushing down toilets or sewer lines',
        'Mixing loosely with dry recyclable plastics',
        'Throwing exposed unwrapped blades or syringes',
        'Mixing with kitchen wet compost waste'
      ],
      disposalTip: 'Always wrap securely in newspaper and mark with an identifiable red cross/dot so collection staff recognize bio-hazard material.'
    }
  };

  const steps = [
    {
      num: '1',
      title: 'Separate at Source',
      desc: 'Categorize at the exact moment of disposal inside your kitchen and living spaces into dual bins.'
    },
    {
      num: '2',
      title: 'Rinse & Dry Recyclables',
      desc: 'Quickly rinse milk pouches and plastic trays with greywater to eliminate odors and bacterial growth.'
    },
    {
      num: '3',
      title: 'Dedicated Bio-Wrap',
      desc: 'Wrap sanitary items and sharps in newspaper with a red marker dot to safeguard municipal handlers.'
    },
    {
      num: '4',
      title: 'Hand Over to Segregated Vehicle',
      desc: 'Deposit directly into the designated wet and dry truck compartments; report mixing if observed.'
    }
  ];

  const dosAndDonts = [
    {
      do: 'Separate wet food waste from dry packaging before throwing.',
      dont: 'Dump everything together into one communal plastic garbage bag.'
    },
    {
      do: 'Rinse and dry milk packets, plastic containers, and beverage cans.',
      dont: 'Throw greasy, food-soiled packaging into the paper recycling pile.'
    },
    {
      do: 'Store dead batteries, cables, and old electronics in a dedicated box.',
      dont: 'Discard batteries and toxic electronic items into regular household trash.'
    },
    {
      do: 'Hand over recyclables to local scrap collectors (kabadiwalas).',
      dont: 'Burn leaves, cardboard, or plastic trash in open public areas or streets.'
    },
    {
      do: 'Demand segregated collection compartments from your municipal truck.',
      dont: 'Abandon segregation just because an informal worker temporarily mixes it.'
    }
  ];

  const currentCat = categories[activeCategory];
  const CurrentIcon = currentCat.icon;

  return (
    <section id="awareness" className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="text-xs uppercase font-mono tracking-wider font-semibold text-emerald-800 bg-emerald-50 border-emerald-200 px-3 py-1 mb-3">
            Civic Education Toolkit
          </Badge>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Awareness Hub & Segregation Guide
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Practical, visual, and immediately actionable rules. Discover what goes where, how to prep materials, and how to eliminate contamination.
          </p>
        </div>

        {/* 4 Category Switcher */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {(Object.keys(categories) as Array<keyof typeof categories>).map((catKey) => {
            const cat = categories[catKey];
            const Icon = cat.icon;
            const isSelected = activeCategory === catKey;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(catKey)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs ring-2 ring-emerald-600/20' 
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-emerald-800' : 'text-slate-500'}`} />
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {cat.badge}
                  </Badge>
                </div>
                <div className={`font-heading font-bold text-sm ${isSelected ? 'text-emerald-950 font-extrabold' : 'text-slate-800'}`}>
                  {cat.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Category Deep Dive Card */}
        <Card className="border-slate-200 shadow-xs mb-16 overflow-hidden">
          <div className="p-6 sm:p-8 bg-slate-50/60 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-800 shadow-2xs">
                <CurrentIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  {currentCat.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                  {currentCat.desc}
                </p>
              </div>
            </div>
            <Badge className="bg-emerald-800 text-white font-mono text-xs px-3 py-1 self-start sm:self-auto">
              Designated: {currentCat.badge}
            </Badge>
          </div>

          <CardContent className="p-6 sm:p-8 grid md:grid-cols-2 gap-8">
            {/* Allowed items */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-heading font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                What Belongs Here (DO Put)
              </div>
              <ul className="space-y-2 text-xs">
                {currentCat.allowed.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50/40 border border-emerald-100/80 text-slate-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Forbidden items */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-heading font-bold text-sm">
                <X className="w-4 h-4 text-rose-600" />
                Common Mistakes (DON'T Put)
              </div>
              <ul className="space-y-2 text-xs">
                {currentCat.forbidden.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-rose-50/40 border border-rose-100/80 text-slate-800">
                    <X className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro tip callout */}
            <div className="md:col-span-2 p-4 bg-amber-50/70 border border-amber-200/90 rounded-xl flex items-start gap-3 text-xs text-amber-950">
              <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Handling Protocol:</strong> {currentCat.disposalTip}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4-Step Household Flow */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-mono tracking-widest font-bold text-slate-500">
              Daily Household Flow
            </span>
            <h3 className="font-heading font-bold text-2xl text-slate-900 mt-2">
              4 Steps to Zero Contamination
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.num} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                  Step {s.num}
                </span>
                <h4 className="font-heading font-bold text-base text-slate-900 mt-3">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Do's & Don'ts Comparison Table */}
        <div>
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-mono tracking-widest font-bold text-slate-500">
              Practical Reference
            </span>
            <h3 className="font-heading font-bold text-2xl text-slate-900 mt-2">
              Everyday Do's and Don'ts
            </h3>
          </div>

          <div className="overflow-hidden border border-slate-200 rounded-xl bg-white shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {/* Do Column */}
              <div className="p-6 bg-emerald-50/20">
                <div className="flex items-center gap-2 mb-4 text-emerald-800 font-heading font-bold text-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  DO (Responsible Habits)
                </div>
                <div className="space-y-3">
                  {dosAndDonts.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 p-2.5 rounded-lg bg-white border border-emerald-100">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{item.do}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Don't Column */}
              <div className="p-6 bg-rose-50/20">
                <div className="flex items-center gap-2 mb-4 text-rose-800 font-heading font-bold text-lg">
                  <X className="w-5 h-5 text-rose-600" />
                  DON'T (Common Pitfalls)
                </div>
                <div className="space-y-3">
                  {dosAndDonts.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 p-2.5 rounded-lg bg-white border border-rose-100">
                      <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        ✗
                      </span>
                      <span>{item.dont}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
