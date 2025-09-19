import { useState } from 'react';
import { WORDS, CLUES, TWIST_PROMPTS } from '@/translations';
import { Language } from '@/contexts/LanguageContext';

export type GameScreen = 'intro' | 'play' | 'celebrate' | 'survey' | 'end';
export type GameWordKey = 'sun' | 'cat' | 'ball';

export interface GameState {
  currentRound: number;
  currentScreen: GameScreen;
  currentWordKey: GameWordKey;
  completedWordKeys: GameWordKey[];
  totalRounds: number;
}

const wordKeys: GameWordKey[] = ['sun', 'cat', 'ball'];

export const useGameState = (language: Language = 'hi') => {
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 1,
    currentScreen: 'intro',
    currentWordKey: wordKeys[0],
    completedWordKeys: [],
    totalRounds: wordKeys.length
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
            completedWordKeys: [...prev.completedWordKeys, prev.currentWordKey]
          };
        }
        // Otherwise go to next word
        const nextRound = prev.currentRound + 1;
        return {
          ...prev,
          currentRound: nextRound,
          currentScreen: 'intro',
          currentWordKey: wordKeys[nextRound - 1],
          completedWordKeys: [...prev.completedWordKeys, prev.currentWordKey]
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
      currentWordKey: wordKeys[0],
      completedWordKeys: [],
      totalRounds: wordKeys.length
    });
  };

  const getLocalizedWord = (wordKey: GameWordKey) => WORDS[language][wordKey];
  const getClue = (wordKey: GameWordKey) => CLUES[language][wordKey];
  const getTwistPrompt = (wordKey: GameWordKey) => {
    const prompts = TWIST_PROMPTS[language][wordKey];
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const isGameComplete = () => gameState.currentScreen === 'survey';

  const goToReflection = () => {
    // This function can be used to navigate to reflection/survey questions
    // For now, we'll keep the user on the survey screen
    console.log('Starting reflection phase...');
  };

  const goToEndScreen = () => {
    setGameState(prev => ({ ...prev, currentScreen: 'end' }));
  };

  return {
    gameState,
    nextScreen,
    resetGame,
    getLocalizedWord,
    getClue,
    getTwistPrompt,
    isGameComplete,
    goToReflection,
    goToEndScreen
  };
};