import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { trackUserFlowEvent } from '@/utils/analytics';
import { SURVEY_QUESTIONS, SurveyAnswers } from '@/types/survey';
import { QuestionComponent } from '@/components/survey/QuestionComponents';
import { useLanguage } from '@/contexts/LanguageContext';

interface SurveyScreenProps {
  onComplete: () => void;
}

export const SurveyScreen = ({ onComplete }: SurveyScreenProps) => {
  const { t } = useLanguage();
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [surveyStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  const currentQuestion = SURVEY_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === SURVEY_QUESTIONS.length - 1;
  const currentAnswer = answers[currentQuestion?.id];

  // Track survey start when component mounts
  useEffect(() => {
    trackUserFlowEvent('SURVEY_STARTED', {
      totalQuestions: SURVEY_QUESTIONS.length
    });
  }, []);

  // Track question views
  useEffect(() => {
    if (currentQuestion) {
      setQuestionStartTime(Date.now());
      trackUserFlowEvent('SURVEY_QUESTION_VIEWED', {
        questionId: currentQuestion.id,
        questionText: currentQuestion.question,
        questionNumber: currentQuestionIndex + 1,
        totalQuestions: SURVEY_QUESTIONS.length
      });
    }
  }, [currentQuestion, currentQuestionIndex]);

  const handleStartSurvey = () => {
    setShowIntro(false);
  };

  const handleAnswerChange = (value: string | number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    trackUserFlowEvent('SURVEY_ANSWER_SELECTED', {
      questionId: currentQuestion.id,
      answer: value,
      questionNumber: currentQuestionIndex + 1,
      timeOnQuestion: Date.now() - questionStartTime
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Complete survey
      const totalDuration = Date.now() - surveyStartTime;
      trackUserFlowEvent('SURVEY_COMPLETED', {
        totalDuration,
        questionsAnswered: Object.keys(answers).length,
        totalQuestions: SURVEY_QUESTIONS.length,
        allAnswers: answers
      });
      console.log('Survey completed:', answers);
      onComplete();
    } else {
      // Next question
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const isAnswered = () => {
    if (!currentQuestion) return false;
    const answer = currentAnswer;
    if (currentQuestion.type === 'text' && !currentQuestion.required) return true;
    return answer !== undefined && answer !== '';
  };

  // Intro screen
  if (showIntro) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎉</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {t('day_1_complete', 'Day 1 Complete!')}
            </h1>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t('congratulations_day_1', 'Congratulations! You\'ve completed Day 1 of 7.')}
            </p>

            <div className="bg-blue-50 rounded-2xl p-4 mb-8">
              <p className="text-sm text-blue-800 font-medium">
                💡 <strong>{t('did_you_know', 'Did you know?')}</strong> {t('7_days_best_chance', 'Playing this game for 7 days creates the best chance of learning and improving memory of the words you\'ve practiced!')}
              </p>
            </div>

            <Button
              onClick={handleStartSurvey}
              size="lg"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg font-bold w-full"
            >
              {t('continue_to_survey', 'Continue to Survey 📝')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
      {/* Progress Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm px-6 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="text-sm font-medium text-gray-600">
            {t('question_of', 'Question %current% of %total%', { current: (currentQuestionIndex + 1).toString(), total: SURVEY_QUESTIONS.length.toString() })}
          </div>
          <div className="flex-1 mx-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / SURVEY_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-sm font-medium text-purple-600">
            {Math.round(((currentQuestionIndex + 1) / SURVEY_QUESTIONS.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
          {currentQuestion && (
            <QuestionComponent
              question={currentQuestion}
              value={currentAnswer}
              onChange={handleAnswerChange}
            />
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm px-6 py-4">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={currentQuestionIndex === 0}
            className="px-6"
          >
            {t('previous', '← Previous')}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isAnswered()}
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 font-bold"
          >
            {isLastQuestion ? t('complete_survey', 'Complete Survey ✨') : t('next', 'Next →')}
          </Button>
        </div>
      </div>
    </div>
  );
};