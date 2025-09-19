import { Language } from '@/contexts/LanguageContext';

// Game words with Hindi translations
export const WORDS = {
  hi: {
    sun: 'सूरज',
    cat: 'बिल्ली',
    ball: 'गेंद'
  },
  en: {
    sun: 'sun',
    cat: 'cat',
    ball: 'ball'
  }
};

// Word clues in both languages
export const CLUES = {
  hi: {
    sun: "यह दिन के समय आसमान में चमकता है।",
    cat: "एक छोटा जानवर जो म्याऊं-म्याऊं करता है।",
    ball: "आप इसे फेंक सकते हैं; यह उछल सकती है।"
  },
  en: {
    sun: "It shines in the sky in daytime.",
    cat: "A small animal that says meow.",
    ball: "You can throw it; it can bounce."
  }
};

// Twist prompts for drawing challenges
export const TWIST_PROMPTS = {
  hi: {
    sun: ["एक छोटा सूरज बनाएं", "एक सोता हुआ सूरज बनाएं", "एक इंद्रधनुषी सूरज बनाएं"],
    cat: ["एक उड़ती हुई बिल्ली बनाएं", "एक सुपरहीरो बिल्ली बनाएं", "एक नाचती हुई बिल्ली बनाएं"],
    ball: ["एक चौकोर गेंद बनाएं", "एक उछलती गेंद बनाएं", "एक जादुई गेंद बनाएं"]
  },
  en: {
    sun: ["Draw a tiny sun", "Draw a sleepy sun", "Draw a rainbow sun"],
    cat: ["Draw a flying cat", "Draw a superhero cat", "Draw a dancing cat"],
    ball: ["Draw a square ball", "Draw a bouncing ball", "Draw a magic ball"]
  }
};

// UI Text translations
export const UI_TEXTS = {
  hi: {
    // Navigation and headers
    'language_switcher': 'भाषा',
    'english': 'English',

    // Intro screen
    'intro.do_you_know': 'क्या आप इस शब्द को जानते हैं?',
    'intro.yes_i_know': 'हाँ, मैं जानता हूँ!',
    'intro.no_tell_more': 'नहीं, मुझे और बताएं',
    'intro.skip_word': 'इस शब्द को छोड़ें',
    'intro.lets_draw': 'आइए चित्र बनाते हैं!',
    'hindi': 'हिंदी',

    // Game screens
    'draw_your_word': 'अपना %word% बनाएं!',
    'now_try_this_twist': 'अब यह ट्विस्ट करके देखें!',
    'say_sentence_with_word': '"%word%" के साथ एक वाक्य बोलें!',
    'amazing_work': 'शानदार काम!',

    // Instructions
    'use_creativity_to_draw': 'अपनी रचनात्मकता का उपयोग करके बनाएं!',
    'record_sentence_instruction': '"%word%" शब्द वाला वाक्य बोलकर रिकॉर्ड करें',
    'completed_all_steps': 'आपने सभी चरण पूरे किए! अगले शब्द के लिए तैयार हैं?',

    // Controls and buttons
    'pick_a_color': 'रंग चुनें:',
    'clear_all': 'सभी साफ करें',
    'undo': 'वापस करें',
    'im_done_drawing': 'मैंने बनाना खत्म किया! ✏️',
    'continue': 'जारी रखें! ✨',
    'record_sentence': 'वाक्य रिकॉर्ड करें 🎤',
    'listening': 'सुन रहा हूं...',
    'next_word': 'अगला शब्द 📝',
    'complete_day_1': 'दिन 1 पूरा करें ✨',
    'play_again': '🎮 फिर से खेलें',

    // Celebrate screen
    'amazing_creativity': 'शानदार रचनात्मकता!',
    'wonderful_drawing': 'क्या शानदार चित्र है!',
    'so_artistic': 'आप कितने कलाकार हैं!',
    'fantastic_work': 'शानदार काम!',
    'beautiful_imagination': 'सुंदर कल्पना!',
    'your_drawing_wonderful': 'आपका "%word%" का चित्र बहुत सुंदर है!',
    'game_complete': '🏆 खेल पूरा हुआ! 🏆',
    'round_of': 'राउंड %current% का %total%',

    // Survey screen
    'day_1_complete': 'दिन 1 पूरा!',
    'congratulations_day_1': 'बधाई हो! आपने 7 में से दिन 1 पूरा किया है।',
    'did_you_know': 'क्या आप जानते हैं?',
    '7_days_best_chance': 'इस खेल को 7 दिन तक खेलने से सीखे गए शब्दों को याद रखने और स्मृति सुधारने की सबसे अच्छी संभावना बनती है!',
    'continue_to_survey': 'सर्वेक्षण पर जाएं 📝',
    'question_of': 'प्रश्न %current% का %total%',
    'previous': '← पिछला',
    'next': 'अगला →',
    'complete_survey': 'सर्वेक्षण पूरा करें ✨',

    // Survey questions
    'play_again_question': 'क्या आप यह खेल फिर से खेलना चाहते हैं?',
    'play_again_tomorrow': 'हां, मैं कल खेलना चाहता हूं',
    'play_with_friends_tomorrow': 'हां, मैं कल दोस्तों के साथ खेलना चाहता हूं',
    'dont_want_to_play': 'मैं यह खेल नहीं खेलना चाहता',

    'favorite_games_question': 'क्या आपके पास कोई पसंदीदा कंप्यूटर या मोबाइल गेम हैं?',
    'favorite_games_placeholder': 'अपने पसंदीदा गेम के बारे में बताएं...',

    'stars_earned_question': 'आपने कितने तारे कमाए?',
    'stars': 'तारे',

    'stars_feeling_question': 'उन तारों को कमाने के बारे में आप कैसा महसूस करते हैं?',
    'sad': 'उदास',
    'okay': 'ठीक',
    'happy': 'खुश',

    'friends_stars_question': 'क्या आपके दोस्तों ने कोई तारे कमाए?',
    'yes': 'हां',
    'no': 'नहीं',

    // End screen
    'thank_you_for_playing': 'खेलने के लिए धन्यवाद!',
    'game_complete_message': 'आपने पूरा खेल पूरा कर लिया है! हमें उम्मीद है कि आपको सीखने और चित्र बनाने में मज़ा आया।',
    'words_you_learned': 'आज आपने जो शब्द सीखे',
    'keep_practicing_message': 'इन शब्दों को बेहतर तरीके से याद रखने के लिए अभ्यास करते रहें। चित्र बनाना और बोलना आपके दिमाग को तेज़ी से सीखने में मदद करता है!',
    'play_again': 'फिर खेलें!',
    'thank_you_footer': 'हमारे साथ सीखने के लिए धन्यवाद! 🌟',

    // Stickers and achievements
    'creative': 'रचनात्मक',
    'clear_speaker': 'स्पष्ट वक्ता',
    'fun_twist': 'मजेदार ट्विस्ट',

    // Celebrate screen
    'celebration_1': 'अद्भुत रचनात्मकता!',
    'celebration_2': 'कितना सुंदर चित्र है!',
    'celebration_3': 'आप बहुत कलाकार हैं!',
    'celebration_4': 'शानदार काम!',
    'celebration_5': 'सुंदर कल्पना!',
    'drawing_wonderful': 'आपका "%word%" का चित्र अद्भुत है!',
    'round_progress': 'राउंड %currentRound% में से %totalRounds%',
    'complete_day_1': 'दिन 1 पूरा करें ✨',
    'next_word': 'अगला शब्द 📝'
  },
  en: {
    // Navigation and headers
    'language_switcher': 'Language',
    'english': 'English',
    'hindi': 'हिंदी',

    // Intro screen
    'intro.do_you_know': 'Do you know this word?',
    'intro.yes_i_know': 'Yes, I know it!',
    'intro.no_tell_more': 'No, tell me more',
    'intro.skip_word': 'Skip this word',
    'intro.lets_draw': 'Let\'s Draw!',

    // Game screens
    'draw_your_word': 'Draw your %word%!',
    'now_try_this_twist': 'Now try this twist!',
    'say_sentence_with_word': 'Say a sentence with "%word%"!',
    'amazing_work': 'Amazing work!',

    // Instructions
    'use_creativity_to_draw': 'Use your creativity to draw what you imagine!',
    'record_sentence_instruction': 'Record yourself saying a sentence that includes the word "%word%"',
    'completed_all_steps': 'You completed all the steps! Ready for the next word?',

    // Controls and buttons
    'pick_a_color': 'रंग चुनें:',
    'clear_all': 'सब साफ़ करें',
    'im_done_drawing': 'मेरा चित्र बन गया! ✏️',
    'continue': 'जारी रखें! ✨',
    'record_sentence': 'वाक्य रिकॉर्ड करें 🎤',
    'listening': 'सुन रहे हैं...',
    'next_word': 'अगला शब्द 📝',
    'complete_day_1': 'दिन 1 पूरा करें ✨',
    'play_again': '🎮 फिर खेलें',

    // Celebrate screen
    'amazing_creativity': 'Amazing creativity!',
    'wonderful_drawing': 'What a wonderful drawing!',
    'so_artistic': 'You\'re so artistic!',
    'fantastic_work': 'Fantastic work!',
    'beautiful_imagination': 'Beautiful imagination!',
    'your_drawing_wonderful': 'Your drawing of "%word%" is wonderful!',
    'game_complete': '🏆 Game Complete! 🏆',
    'round_of': 'Round %current% of %total%',

    // Survey screen
    'day_1_complete': 'Day 1 Complete!',
    'congratulations_day_1': 'Congratulations! You\'ve completed Day 1 of 7.',
    'did_you_know': 'Did you know?',
    '7_days_best_chance': 'Playing this game for 7 days creates the best chance of learning and improving memory of the words you\'ve practiced!',
    'continue_to_survey': 'Continue to Survey 📝',
    'question_of': 'Question %current% of %total%',
    // Survey screen
    'day_1_complete': 'दिन 1 पूरा हुआ!',
    'congratulations_day_1': 'बधाई हो! आपने 7 दिनों में से दिन 1 पूरा कर लिया है।',
    'did_you_know': 'क्या आप जानते हैं?',
    '7_days_best_chance': 'इस गेम को 7 दिन तक खेलने से उन शब्दों को सीखने और याददाश्त बेहतर बनाने का सबसे अच्छा मौका मिलता है जिनका आपने अभ्यास किया है!',
    'continue_to_survey': 'सर्वेक्षण पर जाएं 📝',
    'question_of': 'प्रश्न %current% में से %total%',
    'previous': '← पिछला',
    'next': 'अगला →',
    'complete_survey': 'सर्वेक्षण पूरा करें ✨',

    // Survey questions
    'play_again_question': 'Would you like to play this game again?',
    'play_again_tomorrow': 'Yes, I want to play tomorrow',
    'play_with_friends_tomorrow': 'Yes, I want to play with friends tomorrow',
    'dont_want_to_play': 'I don\'t want to play this game',

    'favorite_games_question': 'Do you have any favourite computer or mobile games?',
    'favorite_games_placeholder': 'Tell us about your favorite games...',

    'stars_earned_question': 'How many stars did you earn?',
    'stars': 'stars',

    'stars_feeling_question': 'How do you feel about earning those stars?',
    'sad': 'Sad',
    'okay': 'Okay',
    'happy': 'Happy',

    'friends_stars_question': 'Did your friends earn any stars?',
    'yes': 'Yes',
    'no': 'No',

    // End screen
    'thank_you_for_playing': 'Thank you for playing!',
    'game_complete_message': 'You\'ve completed the entire game! We hope you had fun learning and drawing.',
    'words_you_learned': 'Words You Learned Today',
    'keep_practicing_message': 'Keep practicing these words to remember them better. Drawing and speaking helps your brain learn faster!',
    'play_again': 'Play Again!',
    'thank_you_footer': 'Thank you for learning with us! 🌟',

    // Stickers and achievements
    'creative': 'Creative',
    'clear_speaker': 'Clear Speaker',
    'fun_twist': 'Fun Twist',

    // Celebrate screen
    'celebration_1': 'Amazing creativity!',
    'celebration_2': 'What a wonderful drawing!',
    'celebration_3': 'You\'re so artistic!',
    'celebration_4': 'Fantastic work!',
    'celebration_5': 'Beautiful imagination!',
    'drawing_wonderful': 'Your drawing of "%word%" is wonderful!',
    'round_progress': 'Round %currentRound% of %totalRounds%',
    'complete_day_1': 'Complete Day 1 ✨',
    'next_word': 'Next Word 📝',

    // Controls and buttons
    'pick_a_color': 'Pick a Color:',
    'clear_all': 'Clear All',
    'im_done_drawing': 'I\'m Done Drawing! ✏️'
  }
};

// Translation function
export const getTranslation = (language: Language, key: string, fallback?: string, replacements?: Record<string, string>): string => {
  let translation = UI_TEXTS[language][key as keyof typeof UI_TEXTS['hi']] || fallback || key;

  // Handle replacements (like %word%)
  if (replacements) {
    Object.keys(replacements).forEach(placeholder => {
      translation = translation.replace(`%${placeholder}%`, replacements[placeholder]);
    });
  }

  return translation;
};