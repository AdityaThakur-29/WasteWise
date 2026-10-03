import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type LanguageCode = 'EN' | 'HI' | 'MR';

export interface Language {
  code: LanguageCode;
  label: string;
}

export const LANGUAGES: Language[] = [
  { code: 'EN', label: 'English' },
  { code: 'HI', label: 'हिन्दी' },
  { code: 'MR', label: 'मराठी' },
];

const translations = {
  EN: {
    // Navigation
    navAbout: 'About',
    navFindings: 'Key Findings',
    navAwareness: 'Awareness Hub',
    navLiveData: 'Live Data',
    navMumbai: 'Mumbai Waste Analytics Platform',

    // Hero
    heroBadge: 'Primary Field Research • 146 Mumbai Households',
    heroTitle: 'Understand the Waste. See the Data. Improve the System.',
    heroSubtitle: 'Empirical primary survey insights on household waste generation, segregation bottlenecks, and civic awareness across Mumbai.',
    heroExploreData: 'Explore Survey Insights',
    heroReadFindings: 'Read Field Findings',
    heroTotalSubmissions: 'Total Responses',
    heroCollectorMixing: 'Cites Collector Mixing',
    heroCollectorMixingDesc: 'Primary reason households abandon waste segregation',
    heroLackBins: 'Lack Multi-Bin Setup',
    heroLackBinsDesc: 'No separate bins available at the household level',
    heroAlwaysSegregate: 'Always Segregate',
    heroAlwaysSegregateDesc: 'Strict daily adherence despite high awareness',

    // About
    aboutBadge: 'Field Research Framework',
    aboutHeading: 'Bridging Raw Citizen Realities to Actionable Municipal Roadmaps',
    aboutDescription: "Rather than relying on generic environmental slogans, WasteWise analyzes primary data gathered directly from 146 households across Mumbai's diverse residential settlements to reveal where waste segregation fails and how to fix it.",
    aboutCitizens: 'General Citizens',
    aboutCitizensDesc: 'Households seeking clarity on practical segregation, bin systems, and safe disposal routes for e-waste and recyclables.',
    aboutStudents: 'Environmental Students',
    aboutStudentsDesc: 'Scholars exploring urban waste management, behavioral science, civic bottlenecks, and primary field survey methods.',
    aboutFaculty: 'Faculty & Project Evaluators',
    aboutFacultyDesc: 'Academic evaluators reviewing methodology, statistical validity, problem-solution mapping, and actionable recommendations.',

    // Survey Insights Dashboard
    insightsBadge: 'Primary Survey Analytics',
    insightsTitle: 'Survey Insights Dashboard',
    insightsSubtitle: 'Interactive analysis of household waste generation patterns, segregation friction points, municipal collection performance, and environmental awareness.',
    areaFilter: 'Area:',
    allFilter: 'All',
    tabGeneration: '1. Generation',
    tabSegregation: '2. Segregation',
    tabCollection: '3. Collection',
    tabRecycling: '4. Recycling',
    tabAwareness: '5. Awareness',

    // Key Findings
    findingsBadge: 'Empirical Field Evidence',
    findingsTitle: 'Key Empirical Findings',
    findingsSubtitle: 'By analyzing cross-tabulations between awareness scores, collection satisfaction, and daily habits, four systemic roadblocks emerged from the survey data.',
    findingsScrollPrompt: 'Scroll down to explore interactive card stack',
    voiceOfTheField: 'Voice of the Field (Direct Respondent Feedback)',
    voiceSubtitle: 'Unedited Citizen Observations & Demands',

    // Awareness Hub
    awarenessBadge: 'Practical Public Education',
    awarenessTitle: 'Household Waste Segregation Hub',
    awarenessSubtitle: 'Clear rules, actionable categorization, and step-by-step guidance for responsible urban waste management.',

    // Quiz & Campaign
    quizBadge: 'Interactive Citizen Test',
    quizTitle: 'Segregation Awareness Quiz',
    quizSubtitle: 'Test your understanding of Mumbai municipal waste sorting rules in 6 quick questions.',
    
    // Footer
    footerColTitle: 'College Field Project',
    footerColDesc: 'Department of Environmental Studies & Data Analytics',
    footerRights: 'WasteWise Platform • Academic Field Study Research'
  },
  HI: {
    // Navigation
    navAbout: 'परिचय',
    navFindings: 'मुख्य निष्कर्ष',
    navAwareness: 'जागरूकता केंद्र',
    navLiveData: 'लाइव डेटा',
    navMumbai: 'मुंबई कचरा प्रबंधन विश्लेषण मंच',

    // Hero
    heroBadge: 'प्राथमिक फील्ड रिसर्च • 146 मुंबई परिवार',
    heroTitle: 'कचरा समझें। डेटा देखें। व्यवस्था सुधारें।',
    heroSubtitle: 'मुंबई भर में घरेलू कचरा उत्पादन, पृथक्करण की बाधाओं और नागरिक जागरूकता पर वास्तविक प्राथमिक सर्वेक्षण विश्लेषण।',
    heroExploreData: 'सर्वेक्षण डेटा देखें',
    heroReadFindings: 'फील्ड निष्कर्ष पढ़ें',
    heroTotalSubmissions: 'कुल प्रतिक्रियाएं',
    heroCollectorMixing: 'कचरा मिक्स होना',
    heroCollectorMixingDesc: 'कचरा उठाने वालों द्वारा मिलाना - अलग न करने का मुख्य कारण',
    heroLackBins: 'अलग डिब्बों की कमी',
    heroLackBinsDesc: 'घरों में गीले और सूखे कचरे के अलग डस्टबिन उपलब्ध नहीं',
    heroAlwaysSegregate: 'हमेशा अलग करते हैं',
    heroAlwaysSegregateDesc: 'उच्च जागरूकता के बावजूद केवल 1 में से 4 परिवार नियमित',

    // About
    aboutBadge: 'फील्ड रिसर्च रूपरेखा',
    aboutHeading: 'नागरिकों की वास्तविकताओं को व्यावहारिक कार्ययोजना से जोड़ना',
    aboutDescription: 'सामान्य पर्यावरण नारों के बजाय, वेस्टवाइज सीधे मुंबई के 146 परिवारों से एकत्र प्राथमिक डेटा का विश्लेषण करता है ताकि यह पता चल सके कि कचरा पृथक्करण कहाँ विफल होता है और इसे कैसे सुधारा जाए।',
    aboutCitizens: 'आम नागरिक',
    aboutCitizensDesc: 'व्यावहारिक पृथक्करण, रंगीन डिब्बा प्रणाली और ई-कचरे के सुरक्षित निपटान पर स्पष्टता चाहने वाले परिवार।',
    aboutStudents: 'पर्यावरण के छात्र',
    aboutStudentsDesc: 'शहरी कचरा प्रबंधन, नागरिक व्यवहार और प्राथमिक सर्वेक्षण विधियों का अध्ययन करने वाले शोधकर्ता।',
    aboutFaculty: 'संकाय और मूल्यांकनकर्ता',
    aboutFacultyDesc: 'अनुसंधान पद्धति, सांख्यिकीय वैधता और व्यावहारिक समाधानों की समीक्षा करने वाले परीक्षक।',

    // Survey Insights Dashboard
    insightsBadge: 'प्राथमिक सर्वेक्षण विश्लेषण',
    insightsTitle: 'सर्वेक्षण विश्लेषण डैशबोर्ड',
    insightsSubtitle: 'घरेलू कचरा उत्पादन पैटर्न, पृथक्करण बाधाओं, नगरपालिका संग्रहण और पर्यावरण जागरूकता का विस्तृत विश्लेषण।',
    areaFilter: 'क्षेत्र:',
    allFilter: 'सभी',
    tabGeneration: '1. उत्पादन',
    tabSegregation: '2. पृथक्करण',
    tabCollection: '3. संग्रहण',
    tabRecycling: '4. पुनर्चक्रण',
    tabAwareness: '5. जागरूकता',

    // Key Findings
    findingsBadge: 'प्रामाणिक फील्ड साक्ष्य',
    findingsTitle: 'मुख्य अनुभवजन्य निष्कर्ष',
    findingsSubtitle: 'जागरूकता स्कोर, संग्रहण संतुष्टि और दैनिक आदतों के सह-संबंध विश्लेषण से चार प्रमुख बाधाएं सामने आईं।',
    findingsScrollPrompt: 'इंटरैक्टिव कार्ड स्टैक देखने के लिए नीचे स्क्रॉल करें',
    voiceOfTheField: 'नागरिकों की सीधी आवाज़ (सर्वेक्षण से प्राप्त)',
    voiceSubtitle: 'नागरिकों की अनसंपादित टिप्पणियां और मांगें',

    // Awareness Hub
    awarenessBadge: 'व्यावहारिक जनशिक्षा',
    awarenessTitle: 'घरेलू कचरा पृथक्करण केंद्र',
    awarenessSubtitle: 'जिम्मेदार कचरा प्रबंधन के लिए स्पष्ट नियम, रंग-कोडित श्रेणियां और चरणबद्ध मार्गदर्शन।',

    // Quiz & Campaign
    quizBadge: 'संवादात्मक नागरिक परीक्षा',
    quizTitle: 'कचरा पृथक्करण जागरूकता क्विज़',
    quizSubtitle: 'मुंबई नगरपालिका कचरा पृथक्करण नियमों पर अपनी समझ को 6 सरल प्रश्नों में परखें।',

    // Footer
    footerColTitle: 'कॉलेज फील्ड प्रोजेक्ट',
    footerColDesc: 'पर्यावरण अध्ययन और डेटा विश्लेषण विभाग',
    footerRights: 'वेस्टवाइज मंच • शैक्षणिक क्षेत्रीय सर्वेक्षण अनुसंधान'
  },
  MR: {
    // Navigation
    navAbout: 'माहिती',
    navFindings: 'प्रमुख निष्कर्ष',
    navAwareness: 'जागरूकता केंद्र',
    navLiveData: 'थेट डेटा',
    navMumbai: 'मुंबई कचरा व्यवस्थापन विश्लेषण मंच',

    // Hero
    heroBadge: 'प्राथमिक क्षेत्रीय संशोधन • 146 मुंबई कुटुंबे',
    heroTitle: 'कचरा समजून घ्या. डेटा पहा. व्यवस्था सुधारा.',
    heroSubtitle: 'मुंबईतील घरगुती कचरा निर्मिती, वर्गीकरणातील अडचणी आणि नागरीक जागरूकतेचा प्रत्यक्ष सर्वेक्षण अहवाल.',
    heroExploreData: 'सर्वेक्षण आकडेवारी पहा',
    heroReadFindings: 'क्षेत्रीय निष्कर्ष वाचा',
    heroTotalSubmissions: 'एकूण प्रतिसाद',
    heroCollectorMixing: 'कचरा एकत्र मिसळणे',
    heroCollectorMixingDesc: 'कचरा उचलणाऱ्यांकडून एकत्र मिसळणे - वर्गीकरण सोडण्याचे मुख्य कारण',
    heroLackBins: 'स्वतंत्र कुंडीचा अभाव',
    heroLackBinsDesc: 'घरांमध्ये ओल्या व सुक्या कचऱ्यासाठी स्वतंत्र डस्टबिन उपलब्ध नाहीत',
    heroAlwaysSegregate: 'नेहमी कचरा वेगळा',
    heroAlwaysSegregateDesc: 'उच्च जागरूकता असूनही केवळ ४ पैकी १ कुटुंब नियमित',

    // About
    aboutBadge: 'क्षेत्रीय संशोधन आराखडा',
    aboutHeading: 'नागरिकांच्या प्रत्यक्ष अनुभवांना कृतीयोग्य योजनांशी जोडणे',
    aboutDescription: 'केवळ औपचारिक पर्यावरणाचे नारे न देता, वेस्टवाइज मुंबईतील १४६ कुटुंबांकडून थेट गोळा केलेल्या आकडेवारीचे विश्लेषण करते, ज्यामुळे कचरा वर्गीकरण कुठे थांबते आणि ते कसे सुधारावे हे स्पष्ट होते.',
    aboutCitizens: 'सामान्य नागरिक',
    aboutCitizensDesc: 'कचरा वर्गीकरण, रंगीत कुंडी पद्धत आणि ई-कचऱ्याची सुरक्षित विल्हेवाट याबद्दल मार्गदर्शन शोधणारे नागरिक.',
    aboutStudents: 'पर्यावरणाचे विद्यार्थी',
    aboutStudentsDesc: 'शहरी कचरा व्यवस्थापन, नागरी समस्या आणि क्षेत्रीय सर्वेक्षण पद्धतींचा अभ्यास करणारे संशोधक.',
    aboutFaculty: 'प्राध्यापक व मूल्यमापक',
    aboutFacultyDesc: 'पद्धती, सांख्यिकीय अचूकता आणि व्यावहारिक शिफारशींचे मूल्यमापन करणारे शैक्षणिक परीक्षक.',

    // Survey Insights Dashboard
    insightsBadge: 'प्राथमिक सर्वेक्षण विश्लेषण',
    insightsTitle: 'सर्वेक्षण विश्लेषण डॅशबोर्ड',
    insightsSubtitle: 'घरगुती कचरा निर्मिती, वर्गीकरणातील अडचणी, पालिका संकलन आणि पर्यावरण जागरूकतेचे विश्लेषणात्मक डॅशबोर्ड.',
    areaFilter: 'विभाग:',
    allFilter: 'सर्व',
    tabGeneration: '1. निर्मिती',
    tabSegregation: '2. वर्गीकरण',
    tabCollection: '3. संकलन',
    tabRecycling: '4. पुनर्वापर',
    tabAwareness: '5. जागरूकता',

    // Key Findings
    findingsBadge: 'प्रत्यक्ष क्षेत्रीय पुरावे',
    findingsTitle: 'प्रमुख क्षेत्रीय निष्कर्ष',
    findingsSubtitle: 'नागरीक जागरूकता, संकलन समाधान आणि दैनंदिन सवयींच्या अभ्यासातून समोर आलेल्या चार मुख्य अडचणी.',
    findingsScrollPrompt: 'कार्ड स्टॅक एक्सप्लोर करण्यासाठी खाली स्क्रोल करा',
    voiceOfTheField: 'नागरिकांचे प्रत्यक्ष मत (थेट सर्वेक्षण प्रतिसाद)',
    voiceSubtitle: 'नागरिकांच्या मूळ समस्या आणि अपेक्षित सुधारणा',

    // Awareness Hub
    awarenessBadge: 'व्यावहारिक जनजागृती',
    awarenessTitle: 'घरगुती कचरा वर्गीकरण केंद्र',
    awarenessSubtitle: 'कचऱ्याचे योग्य वर्गीकरण करण्यासाठी सोपे नियम, रंग-कोडिंग आणि कृतीशील मार्गदर्शन.',

    // Quiz & Campaign
    quizBadge: 'संवादात्मक नागरीक चाचणी',
    quizTitle: 'कचरा वर्गीकरण जागरूकता क्विझ',
    quizSubtitle: 'मुंबई महानगरपालिका कचरा वर्गीकरण नियमांबद्दल आपली माहिती ६ सोप्या प्रश्नांमध्ये तपासा.',

    // Footer
    footerColTitle: 'महाविद्यालयीन क्षेत्रीय प्रकल्प',
    footerColDesc: 'पर्यावरण अभ्यास व डेटा विश्लेषण विभाग',
    footerRights: 'वेस्टवाइज मंच • शैक्षणिक क्षेत्रीय संशोधन अभ्यास'
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: keyof typeof translations.EN) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wastewise_lang') as LanguageCode;
      if (saved === 'EN' || saved === 'HI' || saved === 'MR') {
        return saved;
      }
    }
    return 'EN';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wastewise_lang', lang);
    }
  };

  useEffect(() => {
    // Optional: dynamically set html lang tag
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language.toLowerCase();
    }
  }, [language]);

  const t = (key: keyof typeof translations.EN): string => {
    const langDict = translations[language] || translations.EN;
    return (langDict as any)[key] || translations.EN[key] || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
