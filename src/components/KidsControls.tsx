import { Button } from "@/components/ui/button";
import { Trash2, Undo, Eraser, Palette } from "lucide-react";

interface KidsControlsProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
  tool: 'brush' | 'eraser';
  onToolChange: (tool: 'brush' | 'eraser') => void;
  onClear: () => void;
  onUndo: () => void;
}

const colors = [
  { name: 'Red', value: '#ef4444', emoji: '❤️' },
  { name: 'Orange', value: '#f97316', emoji: '🧡' },
  { name: 'Yellow', value: '#eab308', emoji: '💛' },
  { name: 'Green', value: '#22c55e', emoji: '💚' },
  { name: 'Blue', value: '#3b82f6', emoji: '💙' },
  { name: 'Purple', value: '#a855f7', emoji: '💜' },
  { name: 'Pink', value: '#ec4899', emoji: '🩷' },
  { name: 'Black', value: '#1f2937', emoji: '🖤' },
];

const brushSizes = [
  { size: 3, label: 'Thin', emoji: '✏️' },
  { size: 8, label: 'Medium', emoji: '🖊️' },
  { size: 15, label: 'Thick', emoji: '🖍️' },
  { size: 25, label: 'Super Thick', emoji: '🖌️' },
];

const KidsControls = ({
  currentColor,
  onColorChange,
  brushSize,
  onBrushSizeChange,
  tool,
  onToolChange,
  onClear,
  onUndo,
}: KidsControlsProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 mx-4 mb-4">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Color Picker */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1 mr-2">
            <Palette className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Colors:</span>
          </div>
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => onColorChange(color.value)}
              className={`w-12 h-12 rounded-full border-4 transition-all duration-200 hover:scale-110 flex items-center justify-center text-lg ${
                currentColor === color.value
                  ? 'border-gray-800 shadow-lg scale-110'
                  : 'border-white shadow-md hover:shadow-lg'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {currentColor === color.value && (
                <span className="text-white text-xl">✓</span>
              )}
            </button>
          ))}
        </div>

        {/* Brush Sizes */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Size:</span>
          {brushSizes.map((brush) => (
            <button
              key={brush.size}
              onClick={() => onBrushSizeChange(brush.size)}
              className={`w-12 h-12 rounded-full border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center text-lg ${
                brushSize === brush.size
                  ? 'border-purple-500 bg-purple-100 shadow-lg scale-110'
                  : 'border-gray-300 bg-white shadow-md hover:shadow-lg'
              }`}
              title={`${brush.label} (${brush.size}px)`}
            >
              {brush.emoji}
            </button>
          ))}
        </div>

        {/* Tools */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Tools:</span>
          <Button
            onClick={() => onToolChange('brush')}
            variant={tool === 'brush' ? 'default' : 'outline'}
            size="lg"
            className={`h-12 px-4 ${
              tool === 'brush'
                ? 'bg-purple-500 hover:bg-purple-600 text-white'
                : 'border-purple-300 text-purple-600 hover:bg-purple-50'
            }`}
          >
            🖌️ Brush
          </Button>
          <Button
            onClick={() => onToolChange('eraser')}
            variant={tool === 'eraser' ? 'default' : 'outline'}
            size="lg"
            className={`h-12 px-4 ${
              tool === 'eraser'
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'border-orange-300 text-orange-600 hover:bg-orange-50'
            }`}
          >
            <Eraser className="w-4 h-4 mr-2" />
            Eraser
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={onUndo}
            variant="outline"
            size="lg"
            className="h-12 px-4 border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Undo className="w-4 h-4 mr-2" />
            Undo
          </Button>
          <Button
            onClick={onClear}
            variant="outline"
            size="lg"
            className="h-12 px-4 border-red-300 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KidsControls;