import { useRef } from "react";
import Header from "@/components/Header";
import NotificationBanner from "@/components/NotificationBanner";
import DrawingPrompt from "@/components/DrawingPrompt";
import DrawingCanvas from "@/components/DrawingCanvas";
import ControlButtons from "@/components/ControlButtons";

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUndo = () => {
    // Implementation for undo functionality
    console.log("Undo action");
  };

  const handleClear = () => {
    // Clear the canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleTestAI = () => {
    console.log("Testing AI");
    // Implementation for AI testing
  };

  const handleNewChallenge = () => {
    console.log("New challenge requested");
    // Implementation for new challenge
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header />
      <NotificationBanner />
      
      <main className="flex-1 relative">
        <DrawingPrompt />
        <div className="h-full pt-20 pb-4">
          <DrawingCanvas />
        </div>
      </main>

      <ControlButtons 
        onUndo={handleUndo}
        onClear={handleClear}
        onTestAI={handleTestAI}
        onNewChallenge={handleNewChallenge}
      />
    </div>
  );
};

export default Index;