export interface SurveyQuestion {
  id: string;
  type: 'radio' | 'text' | 'slider' | 'emoji' | 'yesno';
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  emojis?: { emoji: string; label: string; value: string }[];
  required: boolean;
}

export interface SurveyAnswers {
  [questionId: string]: string | number;
}

// Survey question keys for translation
export const SURVEY_QUESTION_KEYS = {
  play_again: {
    question: 'play_again_question',
    options: ['play_again_tomorrow', 'play_with_friends_tomorrow', 'dont_want_to_play']
  },
  favorite_games: {
    question: 'favorite_games_question',
    placeholder: 'favorite_games_placeholder'
  },
  stars_earned: {
    question: 'stars_earned_question'
  },
  stars_feeling: {
    question: 'stars_feeling_question',
    labels: ['sad', 'okay', 'happy']
  },
  friends_stars: {
    question: 'friends_stars_question'
  }
};

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'play_again',
    type: 'radio',
    question: 'play_again_question', // translation key
    options: ['play_again_tomorrow', 'play_with_friends_tomorrow', 'dont_want_to_play'], // translation keys
    required: true
  },
  {
    id: 'favorite_games',
    type: 'text',
    question: 'favorite_games_question', // translation key
    required: false
  },
  {
    id: 'stars_earned',
    type: 'slider',
    question: 'stars_earned_question', // translation key
    min: 0,
    max: 15,
    required: true
  },
  {
    id: 'stars_feeling',
    type: 'emoji',
    question: 'stars_feeling_question', // translation key
    emojis: [
      { emoji: '😔', label: 'sad', value: 'sad' }, // translation key
      { emoji: '😐', label: 'okay', value: 'okay' }, // translation key
      { emoji: '😊', label: 'happy', value: 'happy' } // translation key
    ],
    required: true
  },
  {
    id: 'friends_stars',
    type: 'yesno',
    question: 'friends_stars_question', // translation key
    required: true
  }
];