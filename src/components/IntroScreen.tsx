import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Sun, Cat, Zap } from 'lucide-react';
import { GameWord } from '@/hooks/useGameState';

interface IntroScreenProps {
  word: GameWord;
  clue: string;
  onNext: () => void;
}

const wordIcons = {
  sun: Sun,
  cat: Cat,
  ball: Zap
};

export const IntroScreen = ({ word, clue, onNext }: IntroScreenProps) => {
  const [showClue, setShowClue] = useState(false);
  const Icon = wordIcons[word];

  const handleYes = () => onNext();
  const handleNo = () => setShowClue(true);
  const handleSkip = () => onNext();

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-6">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full text-center space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <Icon className="w-16 h-16 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{word}</h1>
            <Button
              onClick={speakWord}
              variant="ghost"
              size="sm"
              className="text-primary hover:bg-primary/10"
            >
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {!showClue ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Do you know this word?
            </h2>
            <div className="flex flex-col space-y-3">
              <Button
                onClick={handleYes}
                className="bg-green-500 hover:bg-green-600 text-white py-4 text-lg rounded-2xl"
              >
                ✅ Yes, I know it!
              </Button>
              <Button
                onClick={handleNo}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 text-lg rounded-2xl"
              >
                ❓ No, tell me more
              </Button>
              <Button
                onClick={handleSkip}
                variant="ghost"
                className="text-gray-600 py-2"
              >
                Skip this word
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-2xl p-4">
              <Icon className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <p className="text-lg text-blue-800">{clue}</p>
            </div>
            <Button
              onClick={onNext}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-4 text-lg rounded-2xl"
            >
              🎨 Let's Draw!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};