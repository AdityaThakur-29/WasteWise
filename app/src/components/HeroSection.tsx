import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../context/LanguageContext';
import { 
  BarChart2, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Star, 
  GraduationCap, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Layers
} from 'lucide-react';

interface HeroProps {
  stats: {
    total_count: number;
    segregation_rate: number;
    avg_satisfaction: number;
    avg_awareness: number;
    separate_bins_rate: number;
    campaign_positive_rate: number;
  };
  totalSubmissions: number;
}

export const HeroSection: React.FC<HeroProps> = ({
  stats,
  totalSubmissions
}) => {
  const { t } = useLanguage();

  return (
    <section 
      id="hero" 
      className="relative pt-6 pb-8 sm:pt-10 sm:pb-12 md:pt-12 md:pb-14 lg:pt-14 lg:pb-16 overflow-hidden bg-radial from-emerald-50/70 via-slate-50 to-slate-50 border-b border-slate-200/80 lg:min-h-[calc(100dvh-5.5rem)] lg:flex lg:flex-col lg:justify-between"
    >
      {/* Decorative subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0596690a_1px,transparent_1px),linear-gradient(to_bottom,#0596690a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        {/* Top Content Block: Badges, Title, Subtitle, CTAs */}
        <div className="text-center max-w-4xl mx-auto pt-2 sm:pt-4">
          {/* Top Field Project Pill */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-5">
            <Badge className="bg-emerald-100/90 text-emerald-900 border-emerald-300 font-sans font-medium text-xs px-2.5 sm:px-3 py-1 flex items-center gap-1.5 shadow-2xs">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t('heroBadge')}</span>
            </Badge>
            <Badge variant="outline" className="bg-white/80 border-slate-300 text-slate-700 font-sans text-xs px-2.5 py-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>Mumbai Metropolitan Region</span>
            </Badge>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 font-mono text-xs px-2 py-0.5">
              N={totalSubmissions}
            </Badge>
          </div>

          {/* Hero Headlines */}
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.12]">
            {t('heroTitle')}
          </h1>
          <p className="mt-3 sm:mt-5 text-sm sm:text-lg lg:text-xl text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed px-1 sm:px-0">
            {t('heroSubtitle')}
          </p>

          {/* Action CTAs */}
          <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-700 text-white font-medium shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all duration-200 gap-2 cursor-pointer h-11 sm:h-12 px-5 sm:px-6 text-sm sm:text-base"
            >
              <a href="#insights">
                <BarChart2 className="w-4 h-4" />
                {t('heroExploreData')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-white/90 hover:bg-slate-100 border-slate-300 text-slate-800 font-medium hover:text-emerald-800 transition-colors h-11 sm:h-12 px-5 sm:px-6 gap-2 cursor-pointer text-sm sm:text-base"
            >
              <a href="#findings">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                {t('heroReadFindings')}
              </a>
            </Button>
          </div>
        </div>

        {/* Live Survey Snapshot KPI Cards */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-5 sm:pt-6 border-t border-slate-200/70 w-full">
          <div className="text-center mb-3.5 sm:mb-5">
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-emerald-200">
              Empirical Survey Snapshot (146 Verified Responses)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 lg:gap-4">
            {/* KPI 1 */}
            <Card className="bg-white border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between text-slate-500 mb-1 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-500">Total Sample</span>
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
                  {stats.total_count}
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                  Primary responses across Mumbai wards
                </p>
              </CardContent>
            </Card>

            {/* KPI 2 */}
            <Card className="bg-white border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between text-slate-500 mb-1 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-500">Segregation</span>
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-emerald-800 tracking-tight">
                  {stats.segregation_rate}%
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                  Respondents Always or Often segregate
                </p>
              </CardContent>
            </Card>

            {/* KPI 3 */}
            <Card className="bg-white border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between text-slate-500 mb-1 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-500">Satisfaction</span>
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-400" />
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
                  {stats.avg_satisfaction}
                  <span className="text-xs sm:text-sm font-normal text-slate-400 font-sans"> / 5.0</span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                  Average municipal satisfaction score
                </p>
              </CardContent>
            </Card>

            {/* KPI 4 */}
            <Card className="bg-white border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between text-slate-500 mb-1 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-500">Awareness</span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600" />
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
                  {stats.avg_awareness}
                  <span className="text-xs sm:text-sm font-normal text-slate-400 font-sans"> / 5.0</span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                  Self-rated segregation literacy score
                </p>
              </CardContent>
            </Card>

            {/* KPI 5 */}
            <Card className="bg-white border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow col-span-2 sm:col-span-1">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between text-slate-500 mb-1 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-500">Campaign Ready</span>
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-amber-700 tracking-tight">
                  {stats.campaign_positive_rate}%
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                  Citizens ready to join awareness drives
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
