import { Palette } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white px-6 py-3 shadow-lg">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center animate-pulse">
            <Palette className="w-6 h-6 text-pink-500" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
            🎨 Kids Drawing Canvas 🖍️
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;