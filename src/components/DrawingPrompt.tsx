import { Card } from "@/components/ui/card";
import { Timer, RotateCcw } from "lucide-react";

const DrawingPrompt = () => {
  return (
    <Card className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-4 shadow-lg border-0 rounded-xl">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-medium text-gray-900">Draw</span>
          <span className="text-lg font-bold text-primary">cow</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <Timer className="w-4 h-4" />
          <span className="font-medium">11s</span>
        </div>
        
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <RotateCcw className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </Card>
  );
};

export default DrawingPrompt;