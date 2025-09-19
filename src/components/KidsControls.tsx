import { Button } from "@/components/ui/button";
import { Trash2, Palette } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

interface KidsControlsProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  onClear: () => void;
  onDone: () => void;
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
  onDone,
}: KidsControlsProps) => {
  const { t } = useLanguage();
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Color Picker Section */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-4">
          <Palette className="w-5 h-5 text-purple-500 mr-2" />
          <span className="text-base font-medium text-gray-700">{t('pick_a_color', 'Pick a Color:')}</span>
        </div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => onColorChange(color.value)}
              className={`w-12 h-12 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center shadow-sm ${
                currentColor === color.value
                  ? 'ring-4 ring-gray-800 ring-offset-2 scale-105'
                  : 'hover:shadow-md'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
              aria-label={`Select ${color.name} color`}
            >
              {currentColor === color.value && (
                <span className="text-white text-lg font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="flex justify-center gap-4 flex-wrap">
        <Button
          onClick={onClear}
          variant="outline"
          size="lg"
          className="h-12 px-6 border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-colors duration-200 font-medium"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          {t('clear_all', 'Clear All')}
        </Button>
        <Button
          onClick={onDone}
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 h-12 text-lg font-bold transition-colors duration-200"
        >
          {t('im_done_drawing', 'I\'m Done Drawing! ✏️')}
        </Button>
      </div>
    </div>
  );
};

export default KidsControls;