import React from 'react';
import surveyData from './data/surveyData.json';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { InsightsDashboard } from './components/InsightsDashboard';
import { KeyFindings } from './components/KeyFindings';
import { OptimizationPlan } from './components/OptimizationPlan';
import { AwarenessHub } from './components/AwarenessHub';
import { CampaignSection } from './components/CampaignSection';
import { MethodologySection } from './components/MethodologySection';
import { Footer } from './components/Footer';
import { CometCursor } from './components/CometCursor';
import { Skiper8 } from './components/ui/skiper-ui/skiper8';
import ReactLenis from 'lenis/react';
import { LanguageProvider } from './context/LanguageContext';

export function App() {
  const stats = surveyData.stats;

  return (
    <LanguageProvider>
      <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
          {/* Skiper8 Words Preloader */}
      <Skiper8
        words={[
          "WasteWise",
          "Primary Field Study",
          "146 Household Responses",
          "Data-Driven Analytics",
          "Segregation At Source",
          "Cleaner Mumbai",
          "WasteWise"
        ]}
        durationPerWord={190}
      />

      {/* Dynamic Comet Cursor Trail */}
      <CometCursor
        variant="soft"
        trailColor="#059669"
        coreColor="#a7f3d0"
        length={30}
        thickness={12}
        blur={12}
      />

      {/* Global Navigation Bar with Sticky Blur */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section & Live Snapshot KPIs */}
        <HeroSection
          stats={stats}
          totalSubmissions={surveyData.metadata.total_submissions}
        />

        {/* About Project & 7-Step Field Research Pipeline */}
        <AboutSection />

        {/* Survey Insights Dashboard (5 Sub-Tabs & Live Area Filter) */}
        <InsightsDashboard
          stats={stats}
          records={surveyData.records as any}
        />

        {/* Key Empirical Findings & Unedited Citizen Quotes */}
        <KeyFindings
          stats={stats}
          curatedQuotes={surveyData.curated_quotes}
        />

        {/* Optimization Plan (Problem -> Evidence -> Solution -> Impact) */}
        <OptimizationPlan />

        {/* Awareness Hub (Waste Categories, Step-by-Step, Do's & Don'ts) */}
        <AwarenessHub />

        {/* Dedicated Civic Campaign & Interactive Knowledge Quiz */}
        <CampaignSection />

        {/* Survey Methodology & Searchable Raw Data Table */}
        <MethodologySection
          metadata={surveyData.metadata}
          records={surveyData.records as any}
        />
      </main>

      {/* Academic Attribution Footer */}
      <Footer />
    </div>
    </ReactLenis>
    </LanguageProvider>
  );
}

export default App;
