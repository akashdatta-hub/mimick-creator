import { Button } from "@/components/ui/button";
import { 
  Globe, 
  ChevronDown, 
  Users, 
  Eye,
  Settings
} from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-primary to-secondary text-white px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and branding */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-sm"></div>
          </div>
          <h1 className="text-lg font-semibold">Draw and Learn</h1>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center space-x-4">
          {/* All words button */}
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <span className="mr-2">📝</span>
            All words
          </Button>

          {/* Language selector */}
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Globe className="w-4 h-4 mr-2" />
            English
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>

          {/* User selector */}
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Users className="w-4 h-4 mr-2" />
            Gemini
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>

          {/* Teacher view toggle */}
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Eye className="w-4 h-4 mr-2" />
            Teacher View
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Settings className="w-4 h-4" />
          </Button>

          {/* Online status */}
          <div className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium">
            Online
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;