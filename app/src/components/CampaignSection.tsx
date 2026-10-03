import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Megaphone, 
  QrCode, 
  Share2, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  Download,
  Award,
  RefreshCw
} from 'lucide-react';

export const CampaignSection: React.FC = () => {
  // Mini segregation quiz state
  const quizQuestions = [
    {
      question: 'Which bin does a rinsed milk packet or plastic packaging belong to?',
      options: ['Green (Wet/Compost)', 'Blue (Dry/Recyclable)', 'Red (Hazardous)', 'Black (Landfill)'],
      correct: 1,
      explanation: 'Once rinsed and dried, plastic milk packets are high-value recyclables destined for the Blue Dry Waste bin.'
    },
    {
      question: 'How should you discard old dead AA alkaline or lithium button batteries?',
      options: ['Toss in general kitchen trash', 'Flush down the toilet', 'Store in dedicated e-waste box', 'Bury in garden soil'],
      correct: 2,
      explanation: 'Batteries contain toxic heavy metals. They should be accumulated in a dedicated e-waste receptacle for authorized collection.'
    },
    {
      question: 'What is the required handling for used sanitary napkins or diapers?',
      options: ['Mix directly with cardboard waste', 'Wrap securely in newspaper with a red dot', 'Burn in open courtyard', 'Throw loosely in community bin'],
      correct: 1,
      explanation: 'Sanitary and medical waste must be wrapped in paper and marked with a visible red mark to protect sanitation workers from infection.'
    }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    setSelectedOption(idx);
    setShowAnswer(true);
    if (idx === quizQuestions[currentQ].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section className="py-16 md:py-24 bg-radial from-emerald-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-xs uppercase font-mono tracking-wider px-3 py-1 mb-3">
            Civic Action Initiative
          </Badge>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Separate Today, Cleaner Tomorrow
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            The civic awareness campaign tailored directly to address the barriers identified in our Mumbai field survey.
          </p>
        </div>

        {/* Campaign Poster & Interactive Quiz Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Campaign Poster Showcase */}
          <div className="lg:col-span-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <Badge variant="outline" className="border-emerald-400 text-emerald-300 text-xs font-mono">
                  Official Campaign Kit
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                  Mumbai Wards
                </div>
              </div>

              {/* Poster Art Card */}
              <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-xl p-6 text-white text-center border border-emerald-600/30 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-heading font-extrabold text-8xl">
                  ♻
                </div>
                <span className="text-xs uppercase tracking-widest font-mono text-emerald-200">
                  WasteWise Community Drive
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-2 leading-tight">
                  "One Small Bin at Home,<br />A Cleaner City for All."
                </h3>
                <p className="text-xs text-emerald-100/80 mt-3 max-w-md mx-auto">
                  Over 55% of our neighbors already segregate. Join the movement to make dual-bin disposal universal in your society today.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  <div className="px-3 py-1.5 bg-white/10 rounded-lg text-[11px] font-medium border border-white/20">
                    🟢 Green = Wet Food Scraps
                  </div>
                  <div className="px-3 py-1.5 bg-white/10 rounded-lg text-[11px] font-medium border border-white/20">
                    🔵 Blue = Dry Clean Recyclables
                  </div>
                </div>
              </div>

              {/* Campaign Features */}
              <div className="mt-6 grid sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>College notice board posters ready for print</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>WhatsApp society group shareable graphics</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs h-10 px-4 gap-1.5 cursor-pointer"
              >
                <a href="#awareness">
                  Start Segregating Today
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </Button>
              <span className="text-[11px] text-slate-400 font-mono">
                Hashtag: #SeparateTodayMumbai
              </span>
            </div>
          </div>

          {/* Interactive 3-Question Segregation Quiz */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-white">
                    Segregation Knowledge Check
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Test your everyday disposal knowledge in 3 quick questions
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-emerald-500/50 text-emerald-300">
                {!quizFinished ? `Q ${currentQ + 1} of ${quizQuestions.length}` : 'Completed'}
              </Badge>
            </div>

            {!quizFinished ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                    Question {currentQ + 1}
                  </span>
                  <h5 className="font-heading font-bold text-sm sm:text-base text-white">
                    {quizQuestions[currentQ].question}
                  </h5>
                </div>

                <div className="space-y-2">
                  {quizQuestions[currentQ].options.map((opt, idx) => {
                    let btnStyle = 'bg-slate-800/50 hover:bg-slate-800 border-slate-700 text-slate-300';
                    if (showAnswer) {
                      if (idx === quizQuestions[currentQ].correct) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (idx === selectedOption) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      }
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={showAnswer}
                        className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {showAnswer && idx === quizQuestions[currentQ].correct && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showAnswer && (
                  <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs text-slate-300 space-y-1">
                    <strong className="text-emerald-400">Why: </strong>
                    <span>{quizQuestions[currentQ].explanation}</span>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  {showAnswer && (
                    <Button
                      onClick={handleNext}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs cursor-pointer gap-1"
                    >
                      {currentQ < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-heading font-extrabold text-2xl">
                  {score}/{quizQuestions.length}
                </div>
                <div>
                  <h5 className="font-heading font-bold text-xl text-white">
                    {score === 3 ? 'Perfect Score! 🌟' : score === 2 ? 'Great Knowledge! 👍' : 'Keep Learning! 📚'}
                  </h5>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    You got {score} out of {quizQuestions.length} questions correct. Share these segregation insights with your household.
                  </p>
                </div>
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  size="sm"
                  className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retake Quiz
                </Button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
