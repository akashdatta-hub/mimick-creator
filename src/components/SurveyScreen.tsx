import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { trackUserFlowEvent } from '@/utils/analytics';

interface SurveyScreenProps {
  onComplete: () => void;
}

export const SurveyScreen = ({ onComplete }: SurveyScreenProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showQuestion, setShowQuestion] = useState(false);
  const [surveyStartTime] = useState<number>(Date.now());

  // Track survey start when component mounts
  useEffect(() => {
    trackUserFlowEvent('SURVEY_STARTED', {});
  }, []);

  const handleContinueToSurvey = () => {
    trackUserFlowEvent('SURVEY_QUESTION_VIEWED', {
      questionText: 'Would you like to play this game again?'
    });
    setShowQuestion(true);
  };

  const handleSubmitSurvey = () => {
    const duration = Date.now() - surveyStartTime;
    trackUserFlowEvent('SURVEY_ANSWER_SELECTED', {
      answer: selectedAnswer,
      duration
    });
    trackUserFlowEvent('SURVEY_COMPLETED', {
      totalDuration: duration,
      completed: true
    });
    console.log('Survey answer:', selectedAnswer);
    onComplete();
  };

  // Handle answer selection tracking
  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
    trackUserFlowEvent('SURVEY_ANSWER_SELECTED', {
      answer,
      timestamp: Date.now()
    });
  };

  if (showQuestion) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-lg w-full">
            {/* Survey Question */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Quick Reflection
            </h1>

            <div className="mb-8">
              <p className="text-lg text-gray-700 mb-4 font-medium">
                Would you like to play this game again?
              </p>

              <div className="space-y-3">
                {[
                  'Yes, I want to play tomorrow',
                  'Yes, I want to play with friends tomorrow',
                  'I don\'t want to play this game'
                ].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="confidence"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSubmitSurvey}
              disabled={!selectedAnswer}
              size="lg"
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white px-8 py-3 text-lg font-bold w-full"
            >
              Complete Day 1 ✨
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎉</span>
            </div>
          </div>

          {/* Completion Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Day 1 Complete!
          </h1>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Congratulations! You've completed Day 1 of 7.
          </p>

          {/* Educational Message */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-8">
            <p className="text-sm text-blue-800 font-medium">
              💡 <strong>Did you know?</strong> Playing this game for 7 days creates the best chance of learning and improving memory of the words you've practiced!
            </p>
          </div>

          {/* Continue to Survey Button */}
          <Button
            onClick={handleContinueToSurvey}
            size="lg"
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg font-bold w-full"
          >
            Continue to Quick Survey 📝
          </Button>
        </div>
      </div>
    </div>
  );
};