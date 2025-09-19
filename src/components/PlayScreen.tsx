import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Mic, MicOff } from 'lucide-react';
import DrawingCanvas from './DrawingCanvas';
import KidsControls from './KidsControls';
import { GameWord } from '@/hooks/useGameState';
import { trackUserFlowEvent } from '@/utils/analytics';

interface PlayScreenProps {
  word: GameWord;
  getTwistPrompt: (word: GameWord) => string;
  onNext: () => void;
}

export const PlayScreen = ({ word, getTwistPrompt, onNext }: PlayScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentColor, setCurrentColor] = useState('#ef4444');
  const [currentStep, setCurrentStep] = useState(1); // 1=Draw, 2=Twist, 3=Voice, 4=Complete
  const [twistPrompt, setTwistPrompt] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [stepStartTime, setStepStartTime] = useState<number>(Date.now());

  // Track step changes
  useEffect(() => {
    const stepEvents = {
      1: 'DRAW_STEP_VIEW',
      2: 'TWIST_STEP_VIEW',
      3: 'VOICE_STEP_VIEW',
      4: 'COMPLETE_STEP_VIEW'
    } as const;

    const eventName = stepEvents[currentStep as keyof typeof stepEvents];
    if (eventName) {
      setStepStartTime(Date.now());
      trackUserFlowEvent(eventName, {
        word,
        step: currentStep,
        twistPrompt: currentStep === 2 ? twistPrompt : undefined
      });
    }
  }, [currentStep, word, twistPrompt]);


  const handleCanvasReady = (canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
    // Don't save state immediately to prevent infinite loop
  };


  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#fef9f3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleNextStep = () => {
    const duration = Date.now() - stepStartTime;

    if (currentStep === 1) {
      trackUserFlowEvent('DRAWING_COMPLETED', {
        word,
        duration,
        step: currentStep
      });
      setHasDrawn(true);
      setTwistPrompt(getTwistPrompt(word));
      setCurrentStep(2);
    } else if (currentStep === 2) {
      trackUserFlowEvent('TWIST_CONTINUE', {
        word,
        duration,
        step: currentStep,
        twistPrompt
      });
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else {
      onNext();
    }
  };

  const handleVoiceRecord = () => {
    trackUserFlowEvent('VOICE_RECORDING_STARTED', {
      word,
      step: currentStep
    });

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      // Voice not supported, skip to next step
      trackUserFlowEvent('VOICE_RECORDING_COMPLETED', {
        word,
        step: currentStep,
        success: false,
        reason: 'not_supported'
      });
      handleNextStep();
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const voiceStartTime = Date.now();

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => {
      const duration = Date.now() - voiceStartTime;
      setIsRecording(false);
      trackUserFlowEvent('VOICE_RECORDING_COMPLETED', {
        word,
        step: currentStep,
        duration,
        success: true
      });
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
    <div className="flex flex-col h-screen bg-gradient-to-br from-yellow-100 via-green-50 to-blue-100">
      {/* Compact Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm px-4 py-2 flex items-center justify-between">
        {/* Progress Steps */}
        <div className="flex items-center">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep === step 
                  ? 'bg-primary text-white' 
                  : currentStep > step 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > step ? '✓' : step}
              </div>
              {step < 4 && (
                <div className={`w-8 h-0.5 mx-1 ${
                  currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        {/* Current Step Info */}
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-gray-800">
            {getStepTitle()}
          </h1>
          {currentStep === 2 && (
            <p className="text-sm text-gray-600 mt-1">
              {getStepInstruction()}
            </p>
          )}
        </div>
        
        <div className="w-20"></div> {/* Spacer for balance */}
      </div>

      {/* Full Screen Drawing Area */}
      <main className="flex-1 relative overflow-hidden">
        <DrawingCanvas
          currentColor={currentColor}
          brushSize={12}
          tool="brush"
          onCanvasReady={handleCanvasReady}
        />
      </main>

      {/* Floating Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl px-4 py-3">
        <div className="flex flex-col items-center gap-4">
          {/* Step-specific controls */}
          {currentStep === 1 && (
            <>
              <KidsControls
                currentColor={currentColor}
                onColorChange={setCurrentColor}
                onClear={handleClear}
                onDone={handleNextStep}
              />
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