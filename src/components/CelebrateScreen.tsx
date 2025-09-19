import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Mic, Wand2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CelebrateScreenProps {
  word: string;
  currentRound: number;
  totalRounds: number;
  onNext: () => void;
  isGameComplete: boolean;
  onRestart?: () => void;
}

const getStickerName = (name: string, t: any) => {
  const stickerNames = {
    'Creative': t('creative', 'Creative'),
    'Clear Speaker': t('clear_speaker', 'Clear Speaker'),
    'Fun Twist': t('fun_twist', 'Fun Twist')
  };
  return stickerNames[name as keyof typeof stickerNames] || name;
};

const getStickers = (t: any) => [
  { name: 'Creative', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  { name: 'Clear Speaker', icon: Mic, color: 'text-blue-500', bg: 'bg-blue-100' },
  { name: 'Fun Twist', icon: Wand2, color: 'text-purple-500', bg: 'bg-purple-100' }
];

const getCelebrations = (t: any) => [
  t('celebration_1', 'Amazing creativity!'),
  t('celebration_2', 'What a wonderful drawing!'),
  t('celebration_3', 'You\'re so artistic!'),
  t('celebration_4', 'Fantastic work!'),
  t('celebration_5', 'Beautiful imagination!')
];

export const CelebrateScreen = ({
  word,
  currentRound,
  totalRounds,
  onNext,
  isGameComplete,
  onRestart
}: CelebrateScreenProps) => {
  const { t } = useLanguage();
  const [sticker, setSticker] = useState(getStickers(t)[0]);
  const [celebration, setCelebration] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Random sticker and celebration message
    const stickers = getStickers(t);
    const celebrations = getCelebrations(t);
    setSticker(stickers[Math.floor(Math.random() * stickers.length)]);
    setCelebration(celebrations[Math.floor(Math.random() * celebrations.length)]);
    setShowConfetti(true);

    // Remove confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [word, t]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-green-100 p-6 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-rainbow animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full text-center space-y-6 z-10">
        {/* Celebration Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800 animate-bounce">
            🎉 {celebration} 🎉
          </h1>
          <p className="text-lg text-gray-600">
            {t('drawing_wonderful', 'Your drawing of "%word%" is wonderful!', { word })}
          </p>
        </div>

        {/* Sticker Award */}
        <div className="space-y-3">
          <div className={`${sticker.bg} rounded-2xl p-6 mx-auto inline-block`}>
            <sticker.icon className={`w-12 h-12 ${sticker.color} mx-auto mb-2`} />
            <p className="font-semibold text-gray-700">{getStickerName(sticker.name, t)}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <div className="flex justify-center space-x-2">
            {[...Array(totalRounds)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full ${
                  i < currentRound ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            {t('round_progress', 'Round %currentRound% of %totalRounds%', { currentRound: currentRound.toString(), totalRounds: totalRounds.toString() })}
          </p>
        </div>

        {/* Next Button */}
        {isGameComplete ? (
          <Button
            onClick={onNext}
            className="bg-purple-500 hover:bg-purple-600 text-white w-full py-4 text-lg rounded-2xl"
          >
            {t('complete_day_1', 'Complete Day 1 ✨')}
          </Button>
        ) : (
          <Button
            onClick={onNext}
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-4 text-lg rounded-2xl"
          >
            {t('next_word', 'Next Word 📝')}
          </Button>
        )}
      </div>
    </div>
  );
};