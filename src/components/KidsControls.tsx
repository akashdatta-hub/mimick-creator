import { Button } from "@/components/ui/button";
import { Trash2, Undo, Eraser, Palette } from "lucide-react";

interface KidsControlsProps {
  currentColor: string;
  onColorChange: (color: string) => void;
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

const KidsControls = ({
  currentColor,
  onColorChange,
  onClear,
  onUndo,
}: KidsControlsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Color Picker */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center space-x-1 mr-2">
          <Palette className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">Pick a Color:</span>
        </div>
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`w-14 h-14 rounded-full border-4 transition-all duration-200 hover:scale-110 flex items-center justify-center text-lg ${
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
  );
};

export default KidsControls;