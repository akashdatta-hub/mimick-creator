import { useGameState } from "@/hooks/useGameState";
import { IntroScreen } from "@/components/IntroScreen";
import { PlayScreen } from "@/components/PlayScreen";
import { CelebrateScreen } from "@/components/CelebrateScreen";
import { SurveyScreen } from "@/components/SurveyScreen";
import { useEffect } from "react";
import { trackScreenView, trackUserFlowEvent } from "@/utils/analytics";

const Index = () => {
  const {
    gameState,
    nextScreen,
    resetGame,
    getClue,
    getTwistPrompt,
    isGameComplete,
    goToReflection
  } = useGameState();

  // Track screen changes
  useEffect(() => {
    const screenName = `${gameState.currentScreen}_screen`;
    const properties = {
      word: gameState.currentWord,
      round: gameState.currentRound,
      totalRounds: gameState.totalRounds
    };

    trackScreenView(screenName, properties);

    // Track specific screen events
    switch (gameState.currentScreen) {
      case 'intro':
        trackUserFlowEvent('INTRO_SCREEN_VIEW', properties);
        if (gameState.currentRound === 1) {
          trackUserFlowEvent('WORD_STARTED', { word: gameState.currentWord });
        }
        break;
      case 'play':
        trackUserFlowEvent('PLAY_SCREEN_VIEW', properties);
        break;
      case 'celebrate':
        trackUserFlowEvent('CELEBRATE_SCREEN_VIEW', properties);
        trackUserFlowEvent('WORD_COMPLETED', { word: gameState.currentWord });
        break;
      case 'survey':
        trackUserFlowEvent('SURVEY_SCREEN_VIEW', properties);
        trackUserFlowEvent('GAME_COMPLETED', { totalWords: gameState.totalRounds });
        break;
    }
  }, [gameState.currentScreen, gameState.currentWord, gameState.currentRound]);

  const renderScreen = () => {
    switch (gameState.currentScreen) {
      case 'intro':
        return (
          <IntroScreen
            word={gameState.currentWord}
            clue={getClue(gameState.currentWord)}
            onNext={nextScreen}
          />
        );
      case 'play':
        return (
          <PlayScreen
            word={gameState.currentWord}
            getTwistPrompt={getTwistPrompt}
            onNext={nextScreen}
          />
        );
      case 'celebrate':
        return (
          <CelebrateScreen
            word={gameState.currentWord}
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
            onComplete={() => {
              // Survey completed - game ends here
              console.log('Survey completed! Game finished.');
            }}
          />
        );
      default:
        return null;
    }
  };

  return renderScreen();
};

export default Index;