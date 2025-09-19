import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { GameWordKey } from '@/hooks/useGameState';
import { WORDS } from '@/translations';
import { Star, Trophy, Heart } from 'lucide-react';
import { trackUserFlowEvent } from '@/utils/analytics';

interface EndScreenProps {
  onRestart: () => void;
}

export const EndScreen = ({ onRestart }: EndScreenProps) => {
  const { t, currentLanguage } = useLanguage();

  // The 3 words they learned
  const wordKeys: GameWordKey[] = ['sun', 'cat', 'ball'];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 p-6 relative overflow-hidden">
      {/* Celebration Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)]
            }}
          />
        ))}
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center space-y-8 z-10">
        {/* Trophy Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100 rounded-full p-6">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
        </div>

        {/* Thank You Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 animate-bounce">
            🎉 {t('thank_you_for_playing', 'Thank you for playing!')} 🎉
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            {t('game_complete_message', 'You\'ve completed the entire game! We hope you had fun learning and drawing.')}
          </p>
        </div>

        {/* Words Learned Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              {t('words_you_learned', 'Words You Learned Today')}
            </h2>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wordKeys.map((wordKey, index) => (
              <div
                key={wordKey}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center space-y-3">
                  <div className="text-4xl font-bold text-purple-600">
                    {index + 1}
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-gray-800">
                      {WORDS[currentLanguage][wordKey]}
                    </div>
                    {currentLanguage === 'hi' && (
                      <div className="text-lg text-gray-600">
                        ({WORDS['en'][wordKey]})
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Encouragement Message */}
        <div className="bg-blue-50 rounded-2xl p-6 space-y-4">
          <div className="flex justify-center">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-lg text-blue-800 font-medium">
            {t('keep_practicing_message', 'Keep practicing these words to remember them better. Drawing and speaking helps your brain learn faster!')}
          </p>
        </div>

        {/* Play Again Button */}
        <Button
          onClick={() => {
            trackUserFlowEvent('RESTART_FROM_END', { wordsLearned: wordKeys.length });
            onRestart();
          }}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 text-xl font-bold rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          🎮 {t('play_again', 'Play Again!')}
        </Button>

        {/* Thank You Footer */}
        <p className="text-sm text-gray-500 mt-8">
          {t('thank_you_footer', 'Thank you for learning with us! 🌟')}
        </p>
      </div>
    </div>
  );
};