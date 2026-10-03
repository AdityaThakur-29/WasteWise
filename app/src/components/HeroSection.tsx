import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '../context/LanguageContext';
import { TextAnimate } from './ui/text-animate';
import { 
  BarChart2, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Star, 
  ArrowRight,
  TrendingUp,
  Sparkles,
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
  totalSubmissions: _totalSubmissions
}) => {
  const { t } = useLanguage();

  return (
    <section 
      id="hero" 
      className="relative pt-6 pb-8 sm:pt-10 sm:pb-12 md:pt-12 md:pb-14 lg:pt-14 lg:pb-16 overflow-hidden bg-transparent lg:min-h-[calc(100dvh-5.5rem)] lg:flex lg:flex-col lg:justify-between"
    >
      <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        {/* Top Content Block: Title, Subtitle, CTAs */}
        <div className="text-center max-w-4xl mx-auto pt-4 sm:pt-6">
          {/* Hero Headlines with blurIn TextAnimate */}
          <TextAnimate
            as="h1"
            animation="blurIn"
            by="word"
            className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-[1.12]"
          >
            {t('heroTitle')}
          </TextAnimate>

          <TextAnimate
            as="p"
            animation="blurIn"
            by="word"
            className="mt-3 sm:mt-5 text-base sm:text-xl lg:text-2xl text-slate-700 font-normal max-w-2xl mx-auto leading-relaxed px-1 sm:px-0"
          >
            {t('heroSubtitle')}
          </TextAnimate>

          {/* Action CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
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
              className="w-full sm:w-auto bg-white hover:bg-slate-50 border-slate-200 text-slate-900 font-medium transition-colors h-11 sm:h-12 px-5 sm:px-6 gap-2 cursor-pointer text-sm sm:text-base shadow-xs"
            >
              <a href="#findings">
                <BookOpen className="w-4 h-4 text-emerald-800" />
                {t('heroReadFindings')}
              </a>
            </Button>
          </div>
        </div>

        {/* Live Survey Snapshot KPI Cards */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-5 sm:pt-6 w-full">
          <div className="text-center mb-3 sm:mb-4">
            <span className="text-[11px] sm:text-xs uppercase font-mono tracking-widest font-semibold text-slate-700">
              Empirical Survey Snapshot (146 Verified Responses)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 lg:gap-4">
            {/* KPI 1 */}
            <Card className="bg-white border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between text-slate-600 mb-1 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-600">Total Sample</span>
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
                  {stats.total_count}
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                  Primary responses across Mumbai wards
                </p>
              </CardContent>
            </Card>

            {/* KPI 2 */}
            <Card className="bg-white border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between text-slate-600 mb-1 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-600">Segregation</span>
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-emerald-800 tracking-tight">
                  {stats.segregation_rate}%
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                  Respondents Always or Often segregate
                </p>
              </CardContent>
            </Card>

            {/* KPI 3 */}
            <Card className="bg-white border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between text-slate-600 mb-1 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-600">Satisfaction</span>
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-400" />
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
                  {stats.avg_satisfaction}
                  <span className="text-xs sm:text-sm font-normal text-slate-500 font-sans"> / 5.0</span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                  Average municipal satisfaction score
                </p>
              </CardContent>
            </Card>

            {/* KPI 4 */}
            <Card className="bg-white border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between text-slate-600 mb-1 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-600">Awareness</span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600" />
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
                  {stats.avg_awareness}
                  <span className="text-xs sm:text-sm font-normal text-slate-500 font-sans"> / 5.0</span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                  Self-rated segregation literacy score
                </p>
              </CardContent>
            </Card>

            {/* KPI 5 */}
            <Card className="bg-white border-slate-200/90 shadow-sm hover:shadow-md transition-all col-span-2 sm:col-span-1">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between text-slate-600 mb-1 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-600">Campaign Ready</span>
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-amber-700 tracking-tight">
                  {stats.campaign_positive_rate}%
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
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
