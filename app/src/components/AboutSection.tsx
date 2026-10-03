import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Target, 
  GraduationCap, 
  Users2,
  Sparkles
} from 'lucide-react';

interface ScrollRevealTextProps {
  paragraphs: string[];
}

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ paragraphs }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start revealing when container enters 85% of viewport, finish at 30% from viewport top
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.25;

      const current = rect.top;
      const rawProgress = (start - current) / (start - end);
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute total words across all paragraphs
  const allWords = paragraphs.map(p => p.split(' '));
  const totalWordCount = allWords.reduce((acc, curr) => acc + curr.length, 0);

  let globalWordIndex = 0;

  return (
    <div ref={containerRef} className="space-y-6 max-w-4xl mx-auto">
      {allWords.map((wordList, pIdx) => (
        <p 
          key={pIdx} 
          className="text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed sm:leading-relaxed text-slate-800 transition-colors"
        >
          {wordList.map((word, wIdx) => {
            const wordPosition = globalWordIndex / totalWordCount;
            const wordEndPosition = (globalWordIndex + 1) / totalWordCount;
            globalWordIndex++;

            const isFullyRevealed = progress >= wordEndPosition;
            const isTransitioning = progress > wordPosition && progress < wordEndPosition;

            return (
              <span
                key={wIdx}
                className="inline-block mr-[0.28em] transition-all duration-300 select-none"
                style={{
                  color: isFullyRevealed 
                    ? '#0f172a' 
                    : isTransitioning 
                    ? '#047857' 
                    : '#94a3b8',
                  opacity: isFullyRevealed ? 1 : isTransitioning ? 0.85 : 0.3,
                  transform: isFullyRevealed 
                    ? 'translateY(0)' 
                    : isTransitioning 
                    ? 'translateY(-1px)' 
                    : 'translateY(3px)',
                }}
              >
                {word}
              </span>
            );
          })}
        </p>
      ))}
      
    </div>
  );
};

import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();

  const targetAudiences = [
    {
      title: t('aboutCitizens'),
      desc: t('aboutCitizensDesc'),
      icon: Users2,
      badge: 'Public Impact'
    },
    {
      title: t('aboutStudents'),
      desc: t('aboutStudentsDesc'),
      icon: Target,
      badge: 'Academic Research'
    },
    {
      title: t('aboutFaculty'),
      desc: t('aboutFacultyDesc'),
      icon: GraduationCap,
      badge: 'Evaluation Rigor'
    },
  ];

  const descriptionParagraphs = language === 'HI' ? [
    "कचरा प्रबंधन की चुनौतियों पर अक्सर औपचारिक रूप से चर्चा की जाती है। हालांकि, वास्तविक नगरपालिका सेवा वितरण और घरेलू अनुपालन विभिन्न आवासीय क्षेत्रों में नाटकीय रूप से भिन्न होते हैं।",
    "वेस्टवाइज को 146 परिवारों से सीधे प्राथमिक डेटा एकत्र करने, संरचनात्मक बाधाओं की पहचान करने और अनुभवजन्य निष्कर्षों को व्यावहारिक नागरिक कार्ययोजना में बदलने के लिए एक कठोर क्षेत्रीय अध्ययन के रूप में विकसित किया गया है।"
  ] : language === 'MR' ? [
    "कचरा व्यवस्थापनाच्या समस्यांवर नेहमी चर्चा होते, परंतु वस्त्यांनुसार प्रत्यक्षात पालिकेची सेवा आणि नागरिकांचे सहकार्य यात मोठी तफावत आढळते.",
    "वेस्टवाइज हा उपक्रम १४६ कुटुंबांकडून थेट प्रत्यक्ष माहिती गोळा करून, मूळ अडचणी शोधून काढण्यासाठी आणि या निष्कर्षांचे रूपांतर नागरी कृती आराखड्यात करण्यासाठी राबवण्यात आलेला क्षेत्रीय संशोधन प्रकल्प आहे."
  ] : [
    "Waste management challenges are frequently discussed in abstract terms. However, actual municipal service delivery and household compliance vary radically across residential settlements.",
    "WasteWise was conducted as a rigorous field study to collect primary community data from 146 households, identify real structural bottlenecks, and translate empirical findings into actionable civic solutions."
  ];

  return (
    <section id="about" className="py-10 sm:py-14 md:py-18 lg:py-24 bg-white border-b border-slate-200/80 relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header with Responsive Typography */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
          <Badge variant="outline" className="text-xs uppercase font-mono tracking-wider font-semibold text-emerald-800 bg-emerald-50 border-emerald-200 px-3 py-1 mb-2.5 sm:mb-3">
            {t('aboutBadge')}
          </Badge>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.15]">
            {t('aboutHeading')}
          </h2>
        </div>

        {/* Scroll Reveal Description */}
        <div className="mb-12 sm:mb-16 text-center">
          <ScrollRevealText paragraphs={descriptionParagraphs} />
        </div>

        {/* Target Stakeholders */}
        <div className="pt-8 sm:pt-10 border-t border-slate-100">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-xs uppercase font-mono tracking-widest font-bold text-slate-500">
              Who This Field Study Serves
            </span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {targetAudiences.map((aud) => {
              const Icon = aud.icon;
              return (
                <Card key={aud.title} className="bg-slate-50/60 border-slate-200 shadow-none hover:shadow-xs transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-800">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px] sm:text-[11px] font-sans border-slate-300 text-slate-700">
                        {aud.badge}
                      </Badge>
                    </div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                      {aud.title}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {aud.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
