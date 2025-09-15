import { useRef, useState, useCallback } from "react";
import Header from "@/components/Header";
import DrawingCanvas from "@/components/DrawingCanvas";
import KidsControls from "@/components/KidsControls";

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentColor, setCurrentColor] = useState('#ef4444'); // Red
  const [brushSize, setBrushSize] = useState(8); // Medium
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);

  const saveCanvasState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setCanvasHistory(prev => [...prev.slice(-9), imageData]); // Keep last 10 states
  }, []);

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
    saveCanvasState();
  }, [saveCanvasState]);

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

    // Clear with fun background
    ctx.fillStyle = '#fef9f3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setCanvasHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <DrawingCanvas 
          currentColor={currentColor}
          brushSize={brushSize}
          tool={tool}
          onCanvasReady={handleCanvasReady}
        />
      </main>

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

export default Index;