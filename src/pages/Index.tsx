import { useGameState } from "@/hooks/useGameState";
import { IntroScreen } from "@/components/IntroScreen";
import { PlayScreen } from "@/components/PlayScreen";
import { CelebrateScreen } from "@/components/CelebrateScreen";
import { SurveyScreen } from "@/components/SurveyScreen";

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
            isGameComplete={isGameComplete()}
            onRestart={resetGame}
          />
        );
      case 'survey':
        return (
          <SurveyScreen
            onReflect={goToReflection}
          />
        );
      default:
        return null;
    }
  };

  return renderScreen();
};

export default Index;