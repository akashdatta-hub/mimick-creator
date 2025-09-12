import { Button } from "@/components/ui/button";
import { Undo, Trash2, Sparkles, RefreshCw } from "lucide-react";

interface ControlButtonsProps {
  onUndo?: () => void;
  onClear?: () => void;
  onTestAI?: () => void;
  onNewChallenge?: () => void;
}

const ControlButtons = ({ onUndo, onClear, onTestAI, onNewChallenge }: ControlButtonsProps) => {
  return (
    <div className="flex items-center justify-between w-full px-8 py-6">
      {/* Left side buttons */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="lg" 
          onClick={onUndo}
          className="text-muted-foreground hover:text-foreground"
        >
          <Undo className="w-5 h-5 mr-2" />
          Undo
        </Button>
        
        <Button 
          variant="ghost" 
          size="lg" 
          onClick={onClear}
          className="text-muted-foreground hover:text-foreground"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Clear
        </Button>
      </div>

      {/* Center status */}
      <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-primary">Gemini Active</span>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center space-x-4">
        <Button 
          onClick={onTestAI}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          TEST AI
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onNewChallenge}
          className="px-6"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          New Challenge
        </Button>
      </div>
    </div>
  );
};

export default ControlButtons;