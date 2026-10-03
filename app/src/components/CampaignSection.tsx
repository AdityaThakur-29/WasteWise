import React, { useState } from 'react';
import { Button } from './ui/button';
import { TextAnimate } from './ui/text-animate';
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
    <section className="py-10 sm:py-16 md:py-20 bg-transparent text-slate-900 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <TextAnimate
            as="h2"
            animation="blurIn"
            by="word"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-slate-900"
          >
            Separate Today, Cleaner Tomorrow
          </TextAnimate>
          <TextAnimate
            as="p"
            animation="blurIn"
            by="word"
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto font-normal leading-relaxed px-1 sm:px-0"
          >
            The civic awareness campaign tailored directly to address the barriers identified in our Mumbai field survey.
          </TextAnimate>
        </div>

        {/* Campaign Poster & Interactive Quiz Grid */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Campaign Poster Showcase */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span className="border border-emerald-600/30 text-emerald-800 text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 font-semibold">
                  Official Campaign Kit
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono">
                  <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                  Mumbai Wards
                </div>
              </div>

              {/* Poster Art Card */}
              <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-xl p-4 sm:p-6 text-white text-center border border-emerald-600/30 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-heading font-extrabold text-7xl sm:text-8xl">
                  ♻
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest font-mono text-emerald-200">
                  WasteWise Community Drive
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-white mt-1.5 sm:mt-2 leading-tight">
                  "One Small Bin at Home,<br />A Cleaner City for All."
                </h3>
                <p className="text-[11px] sm:text-xs text-emerald-100/80 mt-2 sm:mt-3 max-w-md mx-auto">
                  Over 55% of our neighbors already segregate. Join the movement to make dual-bin disposal universal in your society today.
                </p>

                <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2">
                  <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-lg text-[10px] sm:text-[11px] font-medium border border-white/20">
                    🟢 Green = Wet Food Scraps
                  </div>
                  <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-lg text-[10px] sm:text-[11px] font-medium border border-white/20">
                    🔵 Blue = Dry Clean Recyclables
                  </div>
                </div>
              </div>

              {/* Campaign Features */}
              <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-700">
                <div className="p-2.5 sm:p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>College notice board posters ready for print</span>
                </div>
                <div className="p-2.5 sm:p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>WhatsApp society group shareable graphics</span>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Button
                asChild
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs h-10 px-4 gap-1.5 cursor-pointer shadow-xs"
              >
                <a href="#awareness">
                  Start Segregating Today
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </Button>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono text-center sm:text-right">
                Hashtag: #SeparateTodayMumbai
              </span>
            </div>
          </div>

          {/* Interactive 3-Question Segregation Quiz */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                    Segregation Knowledge Check
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-600">
                    Test your everyday disposal knowledge in 3 quick questions
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs border border-emerald-200 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold shrink-0">
                {!quizFinished ? `Q ${currentQ + 1} of ${quizQuestions.length}` : 'Completed'}
              </span>
            </div>

            {!quizFinished ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/70">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-1">
                    Question {currentQ + 1}
                  </span>
                  <h5 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                    {quizQuestions[currentQ].question}
                  </h5>
                </div>

                <div className="space-y-2">
                  {quizQuestions[currentQ].options.map((opt, idx) => {
                    let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 font-medium';
                    if (showAnswer) {
                      if (idx === quizQuestions[currentQ].correct) {
                        btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-semibold';
                      } else if (idx === selectedOption) {
                        btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-semibold';
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
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showAnswer && (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 space-y-1">
                    <strong className="text-amber-800">Why: </strong>
                    <span>{quizQuestions[currentQ].explanation}</span>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  {showAnswer && (
                    <Button
                      onClick={handleNext}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs cursor-pointer gap-1 shadow-xs"
                    >
                      {currentQ < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mx-auto flex items-center justify-center font-heading font-extrabold text-2xl">
                  {score}/{quizQuestions.length}
                </div>
                <div>
                  <h5 className="font-heading font-bold text-xl text-slate-900">
                    {score === 3 ? 'Perfect Score! 🌟' : score === 2 ? 'Great Knowledge! 👍' : 'Keep Learning! 📚'}
                  </h5>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                    You got {score} out of {quizQuestions.length} questions correct. Share these segregation insights with your household.
                  </p>
                </div>
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  size="sm"
                  className="border-slate-200 bg-white text-slate-800 hover:bg-slate-50 text-xs gap-1.5 cursor-pointer shadow-xs"
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
