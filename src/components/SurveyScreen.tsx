import { Button } from '@/components/ui/button';

interface SurveyScreenProps {
  onReflect: () => void;
}

export const SurveyScreen = ({ onReflect }: SurveyScreenProps) => {
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

          {/* Reflect Button */}
          <Button
            onClick={onReflect}
            size="lg"
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg font-bold w-full"
          >
            Reflect on This Game 🤔
          </Button>
        </div>
      </div>
    </div>
  );
};