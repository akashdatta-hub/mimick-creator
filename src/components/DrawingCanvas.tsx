import { useRef, useEffect, useState, useCallback } from "react";

interface DrawingCanvasProps {
  currentColor: string;
  brushSize: number;
  tool: 'brush' | 'eraser';
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

const DrawingCanvas = ({ currentColor, brushSize, tool, onCanvasReady }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Save current drawing
      const imageData = canvas.width > 0 ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
      
      // Set canvas size to container size
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      // Set drawing styles
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Clear canvas with a fun background
      ctx.fillStyle = '#fef9f3';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Restore drawing if it existed
      if (imageData && imageData.width > 0) {
        try {
          ctx.putImageData(imageData, 0, 0);
        } catch (e) {
          // Ignore errors if canvas size changed
        }
      }
    };

    resizeCanvas();
    
    // Only call onCanvasReady once, not on every resize
    if (onCanvasReady && canvas.width > 0) {
      onCanvasReady(canvas);
    }

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []); // Remove onCanvasReady from dependencies to prevent infinite loop

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
    }
    ctx.lineWidth = brushSize;
  }, [currentColor, brushSize, tool]);

  const getCoordinates = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-pink-50 overflow-hidden">
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${tool === 'eraser' ? 'cursor-grab' : 'cursor-crosshair'} touch-none`}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    </div>
  );
};

export default DrawingCanvas;