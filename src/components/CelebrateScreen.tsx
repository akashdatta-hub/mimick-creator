import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Mic, Wand2 } from 'lucide-react';

interface CelebrateScreenProps {
  word: string;
  currentRound: number;
  totalRounds: number;
  onNext: () => void;
  isGameComplete: boolean;
  onRestart?: () => void;
}

const stickers = [
  { name: 'Creative', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  { name: 'Clear Speaker', icon: Mic, color: 'text-blue-500', bg: 'bg-blue-100' },
  { name: 'Fun Twist', icon: Wand2, color: 'text-purple-500', bg: 'bg-purple-100' }
];

const celebrations = [
  "Amazing creativity!",
  "What a wonderful drawing!",
  "You're so artistic!",
  "Fantastic work!",
  "Beautiful imagination!"
];

export const CelebrateScreen = ({ 
  word, 
  currentRound, 
  totalRounds, 
  onNext, 
  isGameComplete,
  onRestart 
}: CelebrateScreenProps) => {
  const [sticker, setSticker] = useState(stickers[0]);
  const [celebration, setCelebration] = useState(celebrations[0]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Random sticker and celebration message
    setSticker(stickers[Math.floor(Math.random() * stickers.length)]);
    setCelebration(celebrations[Math.floor(Math.random() * celebrations.length)]);
    setShowConfetti(true);
    
    // Remove confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [word]);

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
            Your drawing of "<span className="font-semibold text-primary">{word}</span>" is wonderful!
          </p>
        </div>

        {/* Sticker Award */}
        <div className="space-y-3">
          <div className={`${sticker.bg} rounded-2xl p-6 mx-auto inline-block`}>
            <sticker.icon className={`w-12 h-12 ${sticker.color} mx-auto mb-2`} />
            <p className="font-semibold text-gray-700">{sticker.name}</p>
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
            Round {currentRound} of {totalRounds}
          </p>
        </div>

        {/* Next Button */}
        {isGameComplete ? (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-green-600">
              🏆 Game Complete! 🏆
            </h2>
            <Button
              onClick={onRestart}
              className="bg-green-500 hover:bg-green-600 text-white w-full py-4 text-lg rounded-2xl"
            >
              🎮 Play Again
            </Button>
          </div>
        ) : (
          <Button
            onClick={onNext}
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-4 text-lg rounded-2xl"
          >
            Next Word 📝
          </Button>
        )}
      </div>
    </div>
  );
};