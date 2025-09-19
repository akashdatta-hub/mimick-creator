import { useGameState } from "@/hooks/useGameState";
import { IntroScreen } from "@/components/IntroScreen";
import { PlayScreen } from "@/components/PlayScreen";
import { CelebrateScreen } from "@/components/CelebrateScreen";
import { SurveyScreen } from "@/components/SurveyScreen";
import { EndScreen } from "@/components/EndScreen";
import { LanguageHeader } from "@/components/LanguageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { trackScreenView, trackUserFlowEvent } from "@/utils/analytics";

const Index = () => {
  const { currentLanguage } = useLanguage();
  const {
    gameState,
    nextScreen,
    resetGame,
    getLocalizedWord,
    getClue,
    getTwistPrompt,
    isGameComplete,
    goToReflection,
    goToEndScreen
  } = useGameState(currentLanguage);

  // Track screen changes
  useEffect(() => {
    const screenName = `${gameState.currentScreen}_screen`;
    const localizedWord = getLocalizedWord(gameState.currentWordKey);
    const properties = {
      word: localizedWord,
      wordKey: gameState.currentWordKey,
      round: gameState.currentRound,
      totalRounds: gameState.totalRounds,
      language: currentLanguage
    };

    trackScreenView(screenName, properties);

    // Track specific screen events
    switch (gameState.currentScreen) {
      case 'intro':
        trackUserFlowEvent('INTRO_SCREEN_VIEW', properties);
        if (gameState.currentRound === 1) {
          trackUserFlowEvent('WORD_STARTED', { word: localizedWord, wordKey: gameState.currentWordKey });
        }
        break;
      case 'play':
        trackUserFlowEvent('PLAY_SCREEN_VIEW', properties);
        break;
      case 'celebrate':
        trackUserFlowEvent('CELEBRATE_SCREEN_VIEW', properties);
        trackUserFlowEvent('WORD_COMPLETED', { word: localizedWord, wordKey: gameState.currentWordKey });
        break;
      case 'survey':
        trackUserFlowEvent('SURVEY_SCREEN_VIEW', properties);
        trackUserFlowEvent('GAME_COMPLETED', { totalWords: gameState.totalRounds });
        break;
      case 'end':
        trackUserFlowEvent('END_SCREEN_VIEW', properties);
        trackUserFlowEvent('GAME_FULLY_COMPLETED', { totalWords: gameState.totalRounds });
        break;
    }
  }, [gameState.currentScreen, gameState.currentWordKey, gameState.currentRound, currentLanguage, getLocalizedWord]);

  const renderScreen = () => {
    switch (gameState.currentScreen) {
      case 'intro':
        return (
          <IntroScreen
            word={getLocalizedWord(gameState.currentWordKey)}
            clue={getClue(gameState.currentWordKey)}
            onNext={nextScreen}
          />
        );
      case 'play':
        return (
          <PlayScreen
            word={getLocalizedWord(gameState.currentWordKey)}
            wordKey={gameState.currentWordKey}
            getTwistPrompt={getTwistPrompt}
            onNext={nextScreen}
          />
        );
      case 'celebrate':
        return (
          <CelebrateScreen
            word={getLocalizedWord(gameState.currentWordKey)}
            currentRound={gameState.currentRound}
            totalRounds={gameState.totalRounds}
            onNext={nextScreen}
            isGameComplete={gameState.currentRound === gameState.totalRounds}
            onRestart={resetGame}
          />
        );
      case 'survey':
        return (
          <SurveyScreen
            onComplete={goToEndScreen}
          />
        );
      case 'end':
        return (
          <EndScreen
            onRestart={resetGame}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <LanguageHeader />
      {renderScreen()}
    </>
  );
};

export default Index;