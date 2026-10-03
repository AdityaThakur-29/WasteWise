import React from 'react';
import { Badge } from './ui/badge';
import { Quote, MapPin } from 'lucide-react';
import { Skiper16FindingsStack, type FindingData } from './ui/skiper-ui/skiper16';
import { useLanguage } from '../context/LanguageContext';

interface KeyFindingsProps {
  stats: any;
  curatedQuotes: Array<{
    locality: string;
    housing: string;
    problem: string;
    improvement: string;
  }>;
}

export const KeyFindings: React.FC<KeyFindingsProps> = ({
  curatedQuotes
}) => {
  const { t, language } = useLanguage();

  const findings: FindingData[] = [
    {
      id: '01',
      title: language === 'HI' ? 'कलेक्टर मिक्सिंग की हतोत्साहित करने वाली बाधा' : language === 'MR' ? 'कचरा उचलणाऱ्यांकडून एकत्र मिसळण्याची निराशाजनक पद्धत' : 'The Demotivating Collector Mixing Loop',
      category: language === 'HI' ? 'प्रणालीगत बुनियादी ढांचा बाधा' : language === 'MR' ? 'प्रणालीगत पायाभूत सुविधा अडचण' : 'Systemic Infrastructure Bottleneck',
      badge: 'Critical Barrier',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      bgGradient: 'bg-gradient-to-br from-rose-50/90 via-white to-red-50/40',
      borderColor: 'border-rose-200/90',
      iconBg: 'bg-rose-100 text-rose-800 border border-rose-200',
      evidence: language === 'HI' ? 'अलग न करने वाले 44.4% उत्तरदाताओं ने कचरा उठाने वालों द्वारा मिला देने को ही पृथक्करण बंद करने का मुख्य कारण बताया।' : language === 'MR' ? 'वर्गीकरण न करणाऱ्या ४४.४% नागरिकांनी कचरा उचलणाऱ्यांकडून एकत्र मिसळणे हेच वर्गीकरण सोडण्याचे मुख्य कारण सांगितले.' : '44.4% of non-segregating respondents identify collector mixing as the primary reason they abandoned segregation.',
      detail: language === 'HI' ? 'जब नागरिक घर पर गीले और सूखे कचरे को अलग करते हैं और कर्मचारी दोनों को एक ही वाहन में मिला देते हैं, तो जनता का विश्वास टूट जाता है।' : language === 'MR' ? 'नागरिक घरात ओला व सुका कचरा वेगळा करतात आणि कर्मचारी गाडीत एकत्र टाकतात, तेव्हा नागरिकांचा विश्वास कमी होतो.' : 'When citizens meticulously segregate organic food waste from dry plastics in their homes, only to watch municipal collection personnel dump both into the same vehicle bin, public trust collapses. This creates a psychological disincentive to continue segregation at the household level.',
      impactMetric: '44.4%',
      impactLabel: 'Cites Collector Mixing as Main Barrier'
    },
    {
      id: '02',
      title: language === 'HI' ? 'अलग डस्टबिन की उपलब्धता का अभाव' : language === 'MR' ? 'स्वतंत्र कचराकुंडी उपलब्धतेचा अभाव' : 'The Bin Availability Deficit',
      category: language === 'HI' ? 'घरेलू भौतिक बुनियादी ढांचा' : language === 'MR' ? 'घरगुती भौतिक पायाभूत सुविधा' : 'Household Physical Infrastructure',
      badge: 'Resource Gap',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      bgGradient: 'bg-gradient-to-br from-amber-50/90 via-white to-orange-50/40',
      borderColor: 'border-amber-200/90',
      iconBg: 'bg-amber-100 text-amber-800 border border-amber-200',
      evidence: language === 'HI' ? '44.4% परिवारों के पास गीले और सूखे कचरे के अलग डिब्बे नहीं हैं, और 15.6% के पास केवल कुछ ही प्रकार के डिब्बे हैं।' : language === 'MR' ? '४४.४% कुटुंबांकडे ओल्या व सुक्या कचऱ्यासाठी स्वतंत्र कुंड्या नाहीत, तर १५.६% कडे मोजक्याच कुंड्या आहेत.' : '44.4% of surveyed households do not possess separate bins for wet and dry waste, and another 15.6% only have bins for certain types.',
      detail: language === 'HI' ? 'कचरा पृथक्करण घरेलू सुविधा से सीधा जुड़ा है। रसोई में रंग-कोडित अलग डिब्बों के बिना कचरा एक ही डिब्बे में मिल जाता है।' : language === 'MR' ? 'कचरा वर्गीकरण सुविधेवर अवलंबून असते. घरात रंगीत स्वतंत्र कुंड्या नसल्यास सर्व कचरा एकाच ठिकाणी एकत्र होतो.' : 'Segregation compliance is strongly correlated with household convenience. Without physical color-coded separate bins stationed in the kitchen or apartment lobby, waste default-mixes into single communal receptacles.',
      impactMetric: '60.0%',
      impactLabel: 'Lack Complete Multi-Bin Setups'
    },
    {
      id: '03',
      title: language === 'HI' ? '"जागरूकता बनाम क्रियान्वयन" का विरोधाभास' : language === 'MR' ? '"जागरूकता विरुद्ध प्रत्यक्ष कृती" विरोधाभास' : 'The "Awareness vs. Action" Paradox',
      category: language === 'HI' ? 'व्यवहार विज्ञान अंतराल' : language === 'MR' ? 'वर्तणूक शास्त्र तफावत' : 'Behavioral Science Gap',
      badge: 'Behavioral Gap',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
      bgGradient: 'bg-gradient-to-br from-teal-50/90 via-white to-emerald-50/40',
      borderColor: 'border-teal-200/90',
      iconBg: 'bg-teal-100 text-teal-800 border border-teal-200',
      evidence: language === 'HI' ? 'जबकि 75%+ उत्तरदाता अपनी जागरूकता को मध्यम से उच्च (औसत 3.24/5) आंकते हैं, केवल 26.7% "हमेशा" कचरा अलग करते हैं।' : language === 'MR' ? '७५%+ नागरिक स्वतःची जागरूकता मध्यम ते उच्च (सरासरी ३.२४/५) मानतात, तरी केवळ २६.७% नागरिक नेहमी कचरा वेगळा करतात.' : 'While 75%+ of respondents self-rate their awareness as Moderate to High (Avg 3.24/5), only 26.7% "Always" segregate waste.',
      detail: language === 'HI' ? 'पर्यावरणीय साक्षरता अच्छी होने के बावजूद, बुनियादी ढांचे और स्पष्ट लेबलिंग के बिना केवल ज्ञान से नियमित अनुपालन संभव नहीं होता।' : language === 'MR' ? 'पर्यावरण साक्षरता चांगली असली तरी, योग्य पायाभूत सुविधा आणि स्पष्ट मार्गदर्शनाशिवाय केवळ माहितीमुळे नियमित सवय लागत नाही.' : 'Public environmental literacy in urban Mumbai is reasonably high regarding single-use plastics and recycling principles. However, knowledge alone does not produce behavioral compliance without structural reinforcement, clear bin labeling, and predictable collection schedules.',
      impactMetric: '26.7%',
      impactLabel: 'Only 1 in 4 Segregates Always'
    },
    {
      id: '04',
      title: language === 'HI' ? 'अनौपचारिक ई-कचरा निपटान का प्रभुत्व' : language === 'MR' ? 'अनधिकृत ई-कचरा विल्हेवाटीचे प्रमाण' : 'The Informal E-Waste Channel Dominance',
      category: language === 'HI' ? 'पर्यावरणीय जोखिम' : language === 'MR' ? 'पर्यावरणीय धोका' : 'Hazardous Waste Risk',
      badge: 'Environmental Risk',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      bgGradient: 'bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/40',
      borderColor: 'border-blue-200/90',
      iconBg: 'bg-blue-100 text-blue-800 border border-blue-200',
      evidence: language === 'HI' ? '38% से अधिक परिवार या तो ई-कचरे को सामान्य कचरे में फेंकते हैं या इसे अनौपचारिक कबाड़ी को बिना प्रमाण पत्र के सौंपते हैं।' : language === 'MR' ? '३८% पेक्षा जास्त कुटुंबे ई-कचरा सामान्य कचऱ्यात टाकतात किंवा अनधिकृत भंगार विक्रेत्यांना देतात.' : 'Over 38% of households either throw electronic waste into regular trash or hand it to informal scrap dealers without certification.',
      detail: language === 'HI' ? 'बैटरी और छोटे उपकरणों से निकलने वाली जहरीली भारी धातुएं गंभीर जल और मिट्टी प्रदूषण का कारण बनती हैं।' : language === 'MR' ? 'बॅटऱ्या आणि उपकरणांमधील घातक रसायने पाणी व माती प्रदूषित करतात. प्रभागांमध्ये अधिकृत संकलन केंद्रांची कमतरता आहे.' : 'Toxic heavy metals (lead, cadmium, lithium) from mobile batteries, chargers, and small appliances pose severe soil and water contamination risks. The lack of publicized ward-level authorized e-waste dropboxes forces residents into informal or unsafe disposal pathways.',
      impactMetric: '38%+',
      impactLabel: 'Uncertified or General Trash Disposal'
    }
  ];

  return (
    <section id="findings" className="py-10 sm:py-16 md:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <Badge variant="outline" className="text-xs uppercase font-mono tracking-wider font-semibold text-emerald-800 bg-emerald-50 border-emerald-200 px-3 py-1 mb-2.5 sm:mb-3">
            {t('findingsBadge')}
          </Badge>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight">
            {t('findingsTitle')}
          </h2>
          <p className="mt-2.5 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal px-1 sm:px-0">
            {t('findingsSubtitle')}
          </p>
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              {t('findingsScrollPrompt')}
            </span>
          </div>
        </div>

        {/* Skiper16 Interactive Sticky Card Stack (Desktop) / One-Frame Viewer (Mobile) */}
        <div className="mb-10 sm:mb-16 md:mb-20">
          <Skiper16FindingsStack findings={findings} />
        </div>

        {/* Voice of the Field: Curated Authentic Quotes */}
        <div className="pt-10 border-t border-slate-200">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200">
              Voice of the Field (Direct Respondent Feedback)
            </span>
            <h3 className="font-heading font-bold text-2xl text-slate-900 mt-3">
              Unedited Citizen Observations & Demands
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Verbatim community responses from Survey Question 22 (Biggest Problem) and Question 23 (Requested Improvement).
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {curatedQuotes.slice(0, 6).map((q, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 hover:bg-white hover:border-emerald-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-5 h-5 text-emerald-600/40 mb-2" />
                  <p className="text-xs text-slate-800 italic leading-relaxed">
                    "{q.problem}"
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <div className="text-[11px] font-semibold text-emerald-800">
                    Desired Fix: <span className="font-normal text-slate-700">{q.improvement}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {q.locality || 'Mumbai Resident'}
                    </span>
                    <span>{q.housing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
