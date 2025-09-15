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
  const [brushSize, setBrushSize] = useState(8);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);
  const [twistPrompt, setTwistPrompt] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);

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
    saveCanvasState();
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

  const handleTwist = () => {
    setTwistPrompt(getTwistPrompt(word));
  };

  const handleVoiceRecord = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setHasSpoken(true);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => {
      setIsRecording(false);
      setHasSpoken(true);
    };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log('Heard:', transcript);
      setHasSpoken(true);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-100 via-green-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Draw: <span className="text-primary">{word}</span>
            </h1>
            {twistPrompt && (
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                ✨ {twistPrompt}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleTwist}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Twist!
            </Button>
            <Button
              onClick={handleVoiceRecord}
              disabled={isRecording}
              className={`${
                hasSpoken
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {isRecording ? (
                <MicOff className="w-4 h-4 mr-2" />
              ) : (
                <Mic className="w-4 h-4 mr-2" />
              )}
              {hasSpoken ? '✓ Said it!' : 'Say it!'}
            </Button>
            <Button
              onClick={onNext}
              className="bg-green-500 hover:bg-green-600 text-white px-8"
            >
              Done! 🎉
            </Button>
          </div>
        </div>
      </div>

      {/* Drawing Area */}
      <main className="flex-1 flex">
        <div className="flex-1">
          <DrawingCanvas
            currentColor={currentColor}
            brushSize={brushSize}
            tool={tool}
            onCanvasReady={handleCanvasReady}
          />
        </div>
      </main>

      {/* Controls */}
      <KidsControls
        currentColor={currentColor}
        onColorChange={setCurrentColor}
        brushSize={brushSize}
        onBrushSizeChange={setBrushSize}
        tool={tool}
        onToolChange={setTool}
        onClear={handleClear}
        onUndo={handleUndo}
      />
    </div>
  );
};