import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Mic, MicOff } from 'lucide-react';
import DrawingCanvas from './DrawingCanvas';
import KidsControls from './KidsControls';
import { GameWord } from '@/hooks/useGameState';

interface PlayScreenProps {
  word: GameWord;
  getTwistPrompt: (word: GameWord) => string;
  onNext: () => void;
}

export const PlayScreen = ({ word, getTwistPrompt, onNext }: PlayScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentColor, setCurrentColor] = useState('#ef4444');
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(1); // 1=Draw, 2=Twist, 3=Voice, 4=Complete
  const [twistPrompt, setTwistPrompt] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setCanvasHistory(prev => [...prev.slice(-9), imageData]);
  };

  const handleCanvasReady = (canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
    // Don't save state immediately to prevent infinite loop
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || canvasHistory.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const lastState = canvasHistory[canvasHistory.length - 1];
    ctx.putImageData(lastState, 0, 0);
    setCanvasHistory(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#fef9f3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setCanvasHistory([]);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setHasDrawn(true);
      saveCanvasState();
      setTwistPrompt(getTwistPrompt(word));
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else {
      onNext();
    }
  };

  const handleVoiceRecord = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      handleNextStep();
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => {
      setIsRecording(false);
      handleNextStep();
    };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log('Heard:', transcript);
    };

    recognition.start();
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return `Draw your ${word}!`;
      case 2: return `Now try this twist!`;
      case 3: return `Say a sentence with "${word}"!`;
      case 4: return `Amazing work!`;
      default: return `Draw your ${word}!`;
    }
  };

  const getStepInstruction = () => {
    switch (currentStep) {
      case 1: return "Use your creativity to draw what you imagine!";
      case 2: return twistPrompt;
      case 3: return `Record yourself saying a sentence that includes the word "${word}"`;
      case 4: return "You completed all the steps! Ready for the next word?";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-100 via-green-50 to-blue-100">
      {/* Header with Step Progress */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep === step 
                    ? 'bg-primary text-white' 
                    : currentStep > step 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? '✓' : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Current Step Info */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {getStepTitle()}
            </h1>
            <p className="text-lg text-gray-600">
              {getStepInstruction()}
            </p>
          </div>
        </div>
      </div>

      {/* Drawing Area */}
      <main className="flex-1 flex">
        <div className="flex-1">
          <DrawingCanvas
            currentColor={currentColor}
            brushSize={12}
            tool="brush"
            onCanvasReady={handleCanvasReady}
          />
        </div>
      </main>

      {/* Controls */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 mx-4 mb-4">
        <div className="flex flex-col items-center gap-4">
          {/* Step-specific controls */}
          {currentStep === 1 && (
            <>
              <KidsControls
                currentColor={currentColor}
                onColorChange={setCurrentColor}
                onClear={handleClear}
                onUndo={handleUndo}
              />
              <Button
                onClick={handleNextStep}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-bold"
              >
                I'm Done Drawing! ✏️
              </Button>
            </>
          )}
          
          {currentStep === 2 && (
            <Button
              onClick={handleNextStep}
              size="lg"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg font-bold"
            >
              Continue! ✨
            </Button>
          )}
          
          {currentStep === 3 && (
            <Button
              onClick={handleVoiceRecord}
              disabled={isRecording}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-bold"
            >
              {isRecording ? (
                <>
                  <MicOff className="w-6 h-6 mr-2" />
                  Listening...
                </>
              ) : (
                <>
                  <Mic className="w-6 h-6 mr-2" />
                  Record Sentence 🎤
                </>
              )}
            </Button>
          )}
          
          {currentStep === 4 && (
            <Button
              onClick={onNext}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-bold"
            >
              Next Word! 🎉
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};