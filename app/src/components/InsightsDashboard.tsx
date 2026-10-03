import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useLanguage } from '../context/LanguageContext';
import { TextAnimate } from './ui/text-animate';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  CartesianGrid,
  Legend
} from 'recharts';
import { 
  Trash2, 
  Layers, 
  Truck, 
  Recycle, 
  Lightbulb, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Star,
  Info,
  ChevronRight
} from 'lucide-react';

interface RecordItem {
  id: number;
  area_type: string;
  locality: string;
  household_size: string;
  waste_per_day: string;
  waste_types_gen: string[];
  waste_gen_most: string;
  segregate_freq: string;
  segregate_types: string[];
  segregate_barrier: string;
  separate_bins: string;
  collection_method: string;
  collection_frequency: string;
  satisfaction: number | null;
  collection_problems: string[];
  recyclable_action: string;
  ewaste_disposal: string;
  reuse_compost: string;
  awareness: number | null;
  aware_topics: string[];
  campaign_participate: string;
}

interface InsightsDashboardProps {
  stats: any;
  records: RecordItem[];
}

const PALETTE = {
  emerald: '#059669',
  teal: '#0d9488',
  leaf: '#10b981',
  amber: '#f59e0b',
  rose: '#f43f5e',
  blue: '#3b82f6',
  indigo: '#6366f1',
  slate: '#64748b',
};

const PIE_COLORS = ['#059669', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export const InsightsDashboard: React.FC<InsightsDashboardProps> = ({
  stats,
  records
}) => {
  const { t } = useLanguage();
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('All');

  // Filter records dynamically if user picks an area filter
  const filteredRecords = useMemo(() => {
    let pool = records;
    if (selectedAreaFilter !== 'All') {
      pool = pool.filter(r => r.area_type === selectedAreaFilter);
    }
    return pool;
  }, [records, selectedAreaFilter]);

  // Dynamically recalculate key distributions based on filtered records
  const dynamicStats = useMemo(() => {
    const total = filteredRecords.length || 1;

    const getDist = (key: keyof RecordItem) => {
      const counts: Record<string, number> = {};
      let valid = 0;
      filteredRecords.forEach(r => {
        const val = String(r[key] || '');
        if (val && val !== 'Not reported' && val !== 'Unspecified') {
          counts[val] = (counts[val] || 0) + 1;
          valid++;
        }
      });
      const subTotal = valid || total;
      return Object.entries(counts)
        .map(([name, count]) => ({
          name,
          count,
          percentage: Number(((count / subTotal) * 100).toFixed(1))
        }))
        .sort((a, b) => b.count - a.count);
    };

    const getMultiDist = (key: keyof RecordItem) => {
      const counts: Record<string, number> = {};
      let validCount = 0;
      filteredRecords.forEach(r => {
        const items = r[key] as string[];
        if (Array.isArray(items) && items.length > 0) {
          validCount++;
          items.forEach(it => {
            if (it && it !== 'None of these' && it !== 'Other') {
              counts[it] = (counts[it] || 0) + 1;
            }
          });
        }
      });
      const base = validCount || total;
      return Object.entries(counts)
        .map(([name, count]) => ({
          name,
          count,
          percentage: Number(((count / base) * 100).toFixed(1))
        }))
        .sort((a, b) => b.count - a.count);
    };

    const satVals = filteredRecords.map(r => r.satisfaction).filter((s): s is number => s !== null && s > 0);
    const awareVals = filteredRecords.map(r => r.awareness).filter((a): a is number => a !== null && a > 0);

    const avgSat = satVals.length ? Number((satVals.reduce((a, b) => a + b, 0) / satVals.length).toFixed(2)) : 0;
    const avgAware = awareVals.length ? Number((awareVals.reduce((a, b) => a + b, 0) / awareVals.length).toFixed(2)) : 0;

    // Sat distribution
    const satDist = [1, 2, 3, 4, 5].map(star => {
      const count = satVals.filter(s => s === star).length;
      return {
        rating: `${star} Star${star > 1 ? 's' : ''}`,
        count,
        percentage: satVals.length ? Number(((count / satVals.length) * 100).toFixed(1)) : 0
      };
    });

    // Aware distribution
    const awareLabels: Record<number, string> = { 1: '1 - Low', 2: '2 - Fair', 3: '3 - Moderate', 4: '4 - High', 5: '5 - Expert' };
    const awareDist = [1, 2, 3, 4, 5].map(lvl => {
      const count = awareVals.filter(a => a === lvl).length;
      return {
        level: awareLabels[lvl],
        count,
        percentage: awareVals.length ? Number(((count / awareVals.length) * 100).toFixed(1)) : 0
      };
    });

    return {
      total,
      avgSat,
      avgAware,
      wastePerDay: getDist('waste_per_day').filter(x => x.name !== 'Not reported'),
      wasteTypes: getMultiDist('waste_types_gen'),
      segFreq: getDist('segregate_freq').filter(x => x.name !== 'Not reported'),
      segCategories: getMultiDist('segregate_types'),
      segBarriers: getDist('segregate_barrier').filter(x => x.name !== 'Not reported' && x.name !== 'I always segregate waste'),
      collectionMethods: getDist('collection_method').filter(x => x.name !== 'Not reported'),
      collectionFreq: getDist('collection_frequency').filter(x => x.name !== 'Not reported'),
      satisfactionDist: satDist,
      problems: getMultiDist('collection_problems'),
      recyclables: getDist('recyclable_action').filter(x => x.name !== 'Not reported'),
      ewaste: getDist('ewaste_disposal').filter(x => x.name !== 'Not reported'),
      reuseCompost: getDist('reuse_compost').filter(x => x.name !== 'Not reported'),
      awareDist,
      awareTopics: getMultiDist('aware_topics'),
      campaignInterest: getDist('campaign_participate').filter(x => x.name !== 'Not reported')
    };
  }, [filteredRecords]);

  const areaTypesList = ['All', 'Apartment or Society', 'Independent House', 'Hostel or PG', 'Slum or Informal Settlement'];

  return (
    <section id="insights" className="py-10 sm:py-16 md:py-20 bg-transparent w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 sm:gap-5 mb-6 sm:mb-8">
          <div>
            <TextAnimate
              as="h2"
              animation="blurIn"
              by="word"
              className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tight"
            >
              {t('insightsTitle')}
            </TextAnimate>
            <TextAnimate
              as="p"
              animation="blurIn"
              by="word"
              className="mt-2 sm:mt-3 text-slate-700 text-base sm:text-lg md:text-xl max-w-3xl font-normal leading-relaxed"
            >
              {t('insightsSubtitle')}
            </TextAnimate>
          </div>

          {/* Area Type Filter Bar (Placed directly under description) */}
          <div className="w-full overflow-x-auto no-scrollbar -mx-1 px-1">
            <div className="inline-flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-xs whitespace-nowrap">
              <span className="text-xs font-semibold text-slate-700 px-2 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-emerald-800" />
                {t('areaFilter')}
              </span>
              {areaTypesList.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedAreaFilter(area)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all cursor-pointer shrink-0 ${
                    selectedAreaFilter === area
                      ? 'bg-emerald-800 text-white shadow-2xs font-semibold'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {area === 'All' ? t('allFilter') : area === 'Slum or Informal Settlement' ? 'Slum/Informal' : area}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Filter Note */}
        {selectedAreaFilter !== 'All' && (
          <div className="mb-6 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
            <span>
              Showing analytics filtered for <strong>{selectedAreaFilter}</strong> ({dynamicStats.total} responses).
            </span>
            <button
              onClick={() => setSelectedAreaFilter('All')}
              className="text-emerald-800 underline font-semibold hover:text-emerald-950 cursor-pointer"
            >
              Reset to All
            </button>
          </div>
        )}

        {/* Dashboard Tabs using @beui/tabs with smooth horizontal scroll on mobile */}
        <Tabs defaultValue="generation" variant="segment" className="w-full">
          <div className="w-full overflow-x-auto no-scrollbar flex justify-start sm:justify-center mb-6 sm:mb-8 pb-1">
            <TabsList 
              className="bg-slate-200/80 p-1 rounded-xl sm:rounded-2xl border border-slate-300/60 shadow-xs inline-flex flex-nowrap gap-1 shrink-0"
            >
              <TabsTrigger 
                value="generation" 
                className="px-3 sm:px-4 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm text-slate-700 hover:text-emerald-950 cursor-pointer flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl shrink-0 whitespace-nowrap"
                indicatorClassName="bg-emerald-800 text-white rounded-lg sm:rounded-xl shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{t('tabGeneration')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="segregation" 
                className="px-3 sm:px-4 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm text-slate-700 hover:text-emerald-950 cursor-pointer flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl shrink-0 whitespace-nowrap"
                indicatorClassName="bg-emerald-800 text-white rounded-lg sm:rounded-xl shadow-xs"
              >
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{t('tabSegregation')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="collection" 
                className="px-3 sm:px-4 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm text-slate-700 hover:text-emerald-950 cursor-pointer flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl shrink-0 whitespace-nowrap"
                indicatorClassName="bg-emerald-800 text-white rounded-lg sm:rounded-xl shadow-xs"
              >
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{t('tabCollection')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="recycling" 
                className="px-3 sm:px-4 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm text-slate-700 hover:text-emerald-950 cursor-pointer flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl shrink-0 whitespace-nowrap"
                indicatorClassName="bg-emerald-800 text-white rounded-lg sm:rounded-xl shadow-xs"
              >
                <Recycle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{t('tabRecycling')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="awareness" 
                className="px-3 sm:px-4 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm text-slate-700 hover:text-emerald-950 cursor-pointer flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl shrink-0 whitespace-nowrap"
                indicatorClassName="bg-emerald-800 text-white rounded-lg sm:rounded-xl shadow-xs"
              >
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{t('tabAwareness')}</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: WASTE GENERATION */}
          <TabsContent value="generation" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Daily Waste Generation Distribution */}
              <Card className="bg-white border border-slate-200 min-w-0 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                      Daily Household Waste Generation
                    </CardTitle>
                    <Badge variant="outline" className="font-mono text-[10px] sm:text-[11px] text-emerald-800 bg-emerald-50">
                      Bar Chart
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-500">
                    Self-reported daily waste quantity per household across respondents
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 sm:pt-4">
                  <div className="h-64 sm:h-72 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dynamicStats.wastePerDay} margin={{ top: 10, right: 10, left: -25, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} angle={-15} textAnchor="end" />
                        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                        <Tooltip 
                          formatter={(value: any, name: any, item: any) => [`${value} responses (${item.payload.percentage}%)`, 'Count']}
                          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                        />
                        <Bar dataKey="count" fill="#059669" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-2 italic text-center">
                    Majority of surveyed urban households report generating between 0.5 kg to 2 kg of solid waste each day.
                  </p>
                </CardContent>
              </Card>

              {/* Dominant Waste Types Frequency */}
              <Card className="bg-white border border-slate-200 min-w-0 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                      Commonly Generated Waste Categories
                    </CardTitle>
                    <Badge variant="outline" className="font-mono text-[10px] sm:text-[11px] text-teal-800 bg-teal-50">
                      Multi-Select %
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-500">
                    Proportion of households generating each category regularly
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 sm:pt-4">
                  <div className="h-64 sm:h-72 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={dynamicStats.wasteTypes.slice(0, 7)} 
                        layout="vertical"
                        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} unit="%" />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#334155' }} width={80} />
                        <Tooltip 
                          formatter={(value: any) => [`${value}% of households`, 'Prevalence']}
                          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                        />
                        <Bar dataKey="percentage" fill="#0d9488" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-2 italic text-center">
                    Food & Kitchen organics dominate, closely accompanied by single-use packaging plastics and paper waste.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 2: WASTE SEGREGATION */}
          <TabsContent value="segregation" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Segregation Frequency Donut */}
              <Card className="bg-white border border-slate-200 min-w-0 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                    Segregation Regularity
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    How consistently citizens separate waste before handover
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2">
                  <div className="h-56 sm:h-64 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dynamicStats.segFreq}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={75}
                          paddingAngle={3}
                        >
                          {dynamicStats.segFreq.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any, name: any, item: any) => [`${value} (${item.payload.percentage}%)`, name]}
                          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-1 text-[11px] sm:text-xs">
                    {dynamicStats.segFreq.map((item: any, idx: number) => (
                      <div key={item.name} className="flex items-center gap-1.5 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                        <span className="text-slate-600 truncate">{item.name}:</span>
                        <strong className="text-slate-900 font-mono shrink-0">{item.percentage}%</strong>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Main Barriers to Segregation */}
              <Card className="bg-white border border-slate-200 min-w-0 shadow-sm hover:shadow-md transition-all overflow-hidden lg:col-span-2">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                      Why Citizens Don't Always Segregate (Key Barriers)
                    </CardTitle>
                    <Badge variant="outline" className="font-mono text-[10px] sm:text-[11px] text-rose-800 bg-rose-50 border-rose-200">
                      Root Causes
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-500">
                    Primary systemic and behavioral friction points identified in survey
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2">
                  <div className="h-56 sm:h-64 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={dynamicStats.segBarriers.slice(0, 5)} 
                        layout="vertical"
                        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#334155' }} width={95} />
                        <Tooltip 
                          formatter={(value: any, name: any, item: any) => [`${value} responses (${item.payload.percentage}%)`, 'Reported']}
                          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                        />
                        <Bar dataKey="count" fill="#f43f5e" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-3 p-2.5 sm:p-3 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start gap-2 text-xs text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Critical Finding:</strong> Over <strong>44%</strong> of respondents cite that <em>"Waste collectors mix the waste anyway"</em>, severely degrading household motivation to segregate at the source.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 3: WASTE COLLECTION */}
          <TabsContent value="collection" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Collection Method & Frequency */}
              <Card className="bg-white border border-slate-200 min-w-0 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                    Collection Infrastructure
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    How waste is transported from households
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 space-y-4">
                  <div className="space-y-3">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
                      Primary Pickup Mode
                    </span>
                    {dynamicStats.collectionMethods.slice(0, 4).map((cm: any) => (
                      <div key={cm.name} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-600 font-medium truncate max-w-[180px]">{cm.name}</span>
                          <span className="font-mono font-bold text-slate-900">{cm.percentage}%</span>
                        </div>
                        <Progress value={cm.percentage} className="h-2 bg-slate-100" />
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
                      Collection Regularity
                    </span>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      {dynamicStats.collectionFreq.slice(0, 4).map((cf: any) => (
                        <div key={cf.name} className="p-2 bg-slate-50 rounded border border-slate-200">
                          <div className="font-bold text-slate-900 truncate">{cf.name}</div>
                          <div className="text-slate-500 text-[11px]">{cf.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Collection Satisfaction Score */}
              <Card className="bg-white border border-slate-200 min-w-0 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                      Collection Satisfaction
                    </CardTitle>
                    <div className="flex items-center text-amber-500 gap-1 text-sm font-bold font-mono">
                      <Star className="w-4 h-4 fill-amber-400" />
                      {dynamicStats.avgSat} / 5.0
                    </div>
                  </div>
                  <CardDescription className="text-xs text-slate-500">
                    Citizen satisfaction rating breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2">
                  <div className="h-56 sm:h-64 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dynamicStats.satisfactionDist} margin={{ top: 10, right: 10, left: -25, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="rating" tick={{ fontSize: 10, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                        <Tooltip 
                          formatter={(value: any, name: any, item: any) => [`${value} responses (${item.payload.percentage}%)`, 'Rating']}
                          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                        />
                        <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-2 italic text-center">
                    Satisfaction is moderate with notable polarizations: 3 and 4 stars lead, but significant dissatisfaction exists.
                  </p>
                </CardContent>
              </Card>

              {/* Reported Collection Bottlenecks */}
              <Card className="bg-white border border-slate-200 min-w-0 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                    Observed Collection Problems
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Frequently reported neighborhood issues
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2">
                  <div className="space-y-3">
                    {dynamicStats.problems.slice(0, 5).map((prob: any) => (
                      <div key={prob.name} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-700 font-medium truncate max-w-[190px]" title={prob.name}>
                            {prob.name}
                          </span>
                          <span className="font-mono text-rose-700 font-bold">{prob.percentage}%</span>
                        </div>
                        <Progress value={prob.percentage} className="h-1.5 bg-slate-100" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 p-2.5 sm:p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
                    <strong>Top Complaint:</strong> Overflowing community bins and bad smell caused by delayed municipal collection cycles.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 4: RECYCLING & E-WASTE */}
          <TabsContent value="recycling" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recyclables Destination */}
              <Card className="bg-white border border-slate-200 min-w-0 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                    Disposal Channels for Recyclables
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Where dry recyclables (paper, plastic, metal) actually end up
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 sm:pt-4">
                  <div className="h-64 sm:h-72 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={dynamicStats.recyclables.slice(0, 5)} 
                        layout="vertical"
                        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} unit="%" />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#334155' }} width={85} />
                        <Tooltip 
                          formatter={(value: any) => [`${value}%`, 'Share']}
                          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                        />
                        <Bar dataKey="percentage" fill="#059669" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-2 italic text-center">
                    Scrap dealers (kabadiwalas) and municipal collectors handle the bulk of dry recyclables.
                  </p>
                </CardContent>
              </Card>

              {/* Electronic Waste Disposal Breakdown */}
              <Card className="bg-white border border-slate-200 min-w-0 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                      E-Waste Disposal Pathway
                    </CardTitle>
                    <Badge variant="outline" className="font-mono text-[10px] sm:text-[11px] text-amber-800 bg-amber-50">
                      Hazard Risk
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-500">
                    How citizens dispose of dead phones, chargers, and batteries
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 sm:pt-4">
                  <div className="h-56 sm:h-64 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dynamicStats.ewaste}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={75}
                          paddingAngle={3}
                        >
                          {dynamicStats.ewaste.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any, name: any, item: any) => [`${value} responses (${item.payload.percentage}%)`, name]}
                          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2 text-[11px] sm:text-xs">
                    {dynamicStats.ewaste.map((item: any, idx: number) => (
                      <div key={item.name} className="flex items-center gap-1.5 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                        <span className="text-slate-600 truncate">{item.name}:</span>
                        <strong className="text-slate-900 font-mono shrink-0">{item.percentage}%</strong>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 5: AWARENESS ANALYSIS */}
          <TabsContent value="awareness" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Overall Awareness Index Distribution */}
              <Card className="bg-white border border-slate-200 min-w-0 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                      Overall Awareness Rating (1 to 5)
                    </CardTitle>
                    <Badge variant="outline" className="font-mono text-emerald-800 bg-emerald-50 text-[10px] sm:text-xs">
                      Avg: {dynamicStats.avgAware} / 5.0
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-500">
                    Self-rated environmental and segregation literacy
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 sm:pt-4">
                  <div className="h-56 sm:h-64 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dynamicStats.awareDist} margin={{ top: 10, right: 10, left: -25, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="level" tick={{ fontSize: 10, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                        <Tooltip 
                          formatter={(value: any, name: any, item: any) => [`${value} responses (${item.payload.percentage}%)`, 'Respondents']}
                          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                        />
                        <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-2 italic text-center">
                    Level 3 (Moderate) and Level 4 (High) form the bulk of respondents.
                  </p>
                </CardContent>
              </Card>

              {/* Topic-by-Topic Awareness Checklist */}
              <Card className="bg-white border border-slate-200 min-w-0 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                    Awareness Across Specific Waste Practices
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Which specialized waste management practices respondents recognize
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 sm:pt-4">
                  <div className="space-y-3">
                    {dynamicStats.awareTopics.slice(0, 6).map((topic: any) => (
                      <div key={topic.name} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-700 font-medium truncate max-w-[200px]">{topic.name}</span>
                          <span className="font-mono text-emerald-800 font-bold">{topic.percentage}%</span>
                        </div>
                        <Progress value={topic.percentage} className="h-2 bg-slate-100" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 p-3 sm:p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-emerald-950">Civic Campaign Openness</div>
                      <div className="text-[11px] sm:text-xs text-emerald-800 mt-0.5">
                        {stats.campaign_positive_rate}% of respondents are willing or open to join awareness drives.
                      </div>
                    </div>
                    <Badge className="bg-emerald-800 text-white font-mono self-start sm:self-auto text-xs">
                      {stats.campaign_positive_rate}% Yes/Maybe
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </section>
  );
};
