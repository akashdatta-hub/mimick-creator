import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export const LanguageHeader = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'hi' as const, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <header className="absolute top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/95 backdrop-blur-sm shadow-lg border-gray-200 hover:bg-white/100 transition-all duration-200"
          >
            <Globe className="w-4 h-4 mr-2" />
            <span className="mr-1">{currentLang?.flag}</span>
            <span className="hidden sm:inline">{currentLang?.name}</span>
            <span className="sm:hidden">{currentLang?.code.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-gray-200">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => setLanguage(language.code)}
              className={`cursor-pointer transition-colors duration-200 ${
                currentLanguage === language.code
                  ? 'bg-purple-50 text-purple-700 font-medium'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">{language.flag}</span>
              <span>{language.name}</span>
              {currentLanguage === language.code && (
                <span className="ml-auto text-purple-500">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};