import { useState } from 'react';

export type GameScreen = 'intro' | 'play' | 'celebrate' | 'survey';
export type GameWord = 'sun' | 'cat' | 'ball';

export interface GameState {
  currentRound: number;
  currentScreen: GameScreen;
  currentWord: GameWord;
  completedWords: GameWord[];
  totalRounds: number;
}

const words: GameWord[] = ['sun', 'cat', 'ball'];

const clues = {
  sun: "It shines in the sky in daytime.",
  cat: "A small animal that says meow.",
  ball: "You can throw it; it can bounce."
};

const twistPrompts = {
  sun: ["Draw a tiny sun", "Draw a sleepy sun", "Draw a rainbow sun"],
  cat: ["Draw a flying cat", "Draw a superhero cat", "Draw a dancing cat"],
  ball: ["Draw a square ball", "Draw a bouncing ball", "Draw a magic ball"]
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 1,
    currentScreen: 'intro',
    currentWord: words[0],
    completedWords: [],
    totalRounds: words.length
  });

  const nextScreen = () => {
    setGameState(prev => {
      if (prev.currentScreen === 'intro') {
        return { ...prev, currentScreen: 'play' };
      }
      if (prev.currentScreen === 'play') {
        return { ...prev, currentScreen: 'celebrate' };
      }
      if (prev.currentScreen === 'celebrate') {
        // After completing 3rd word, go to survey - GAME ENDS
        if (prev.currentRound === prev.totalRounds) {
          return {
            ...prev,
            currentScreen: 'survey',
            completedWords: [...prev.completedWords, prev.currentWord]
          };
        }
        // Otherwise go to next word
        const nextRound = prev.currentRound + 1;
        return {
          ...prev,
          currentRound: nextRound,
          currentScreen: 'intro',
          currentWord: words[nextRound - 1],
          completedWords: [...prev.completedWords, prev.currentWord]
        };
      }
      // From survey screen - STAY PUT, NO MORE NAVIGATION
      return prev;
    });
  };

  const resetGame = () => {
    setGameState({
      currentRound: 1,
      currentScreen: 'intro',
      currentWord: words[0],
      completedWords: [],
      totalRounds: words.length
    });
  };

  const getClue = (word: GameWord) => clues[word];
  const getTwistPrompt = (word: GameWord) => {
    const prompts = twistPrompts[word];
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const isGameComplete = () => gameState.currentScreen === 'survey';

  const goToReflection = () => {
    // This function can be used to navigate to reflection/survey questions
    // For now, we'll keep the user on the survey screen
    console.log('Starting reflection phase...');
  };

  return {
    gameState,
    nextScreen,
    resetGame,
    getClue,
    getTwistPrompt,
    isGameComplete,
    goToReflection
  };
};