import ReactGA from 'react-ga4';

// GA4 Measurement ID - replace with your actual GA4 property ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with actual GA4 ID

// User flow event names
export const AnalyticsEvents = {
  // Screen views
  INTRO_SCREEN_VIEW: 'intro_screen_view',
  PLAY_SCREEN_VIEW: 'play_screen_view',
  CELEBRATE_SCREEN_VIEW: 'celebrate_screen_view',
  SURVEY_SCREEN_VIEW: 'survey_screen_view',

  // Play screen step views
  DRAW_STEP_VIEW: 'draw_step_view',
  TWIST_STEP_VIEW: 'twist_step_view',
  VOICE_STEP_VIEW: 'voice_step_view',
  COMPLETE_STEP_VIEW: 'complete_step_view',

  // User interactions
  DRAWING_STARTED: 'drawing_started',
  DRAWING_COMPLETED: 'drawing_completed',
  TWIST_CONTINUE: 'twist_continue',
  VOICE_RECORDING_STARTED: 'voice_recording_started',
  VOICE_RECORDING_COMPLETED: 'voice_recording_completed',

  // Progress events
  WORD_STARTED: 'word_started',
  WORD_COMPLETED: 'word_completed',
  GAME_COMPLETED: 'game_completed',

  // Survey events
  SURVEY_STARTED: 'survey_started',
  SURVEY_QUESTION_VIEWED: 'survey_question_viewed',
  SURVEY_ANSWER_SELECTED: 'survey_answer_selected',
  SURVEY_COMPLETED: 'survey_completed',

  // End screen events
  END_SCREEN_VIEW: 'end_screen_view',
  GAME_FULLY_COMPLETED: 'game_fully_completed',
  RESTART_FROM_END: 'restart_from_end',

  // Dropoff events
  ABANDONED_INTRO: 'abandoned_intro',
  ABANDONED_DRAWING: 'abandoned_drawing',
  ABANDONED_TWIST: 'abandoned_twist',
  ABANDONED_VOICE: 'abandoned_voice',
  ABANDONED_SURVEY: 'abandoned_survey',
} as const;

// Initialize Google Analytics
export const initializeGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log('Google Analytics initialized');
  } else {
    console.log('Google Analytics not initialized - no measurement ID provided');
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  ReactGA.event(eventName, parameters);
  console.log('Analytics event:', eventName, parameters);
};

// Track user flow specific events
export const trackUserFlowEvent = (
  eventName: keyof typeof AnalyticsEvents,
  properties?: {
    word?: string;
    step?: number;
    duration?: number;
    round?: number;
    totalRounds?: number;
    surveyAnswer?: string;
    [key: string]: any;
  }
) => {
  trackEvent(AnalyticsEvents[eventName], {
    ...properties,
    timestamp: Date.now(),
  });
};

// Track screen views with automatic timing
let screenStartTime: number | null = null;

export const trackScreenView = (
  screenName: string,
  properties?: Record<string, any>
) => {
  // Track previous screen duration
  if (screenStartTime) {
    const duration = Date.now() - screenStartTime;
    trackEvent('screen_duration', {
      duration_ms: duration,
      previous_screen: screenName
    });
  }

  // Track new screen view
  screenStartTime = Date.now();
  trackEvent('screen_view', {
    screen_name: screenName,
    ...properties
  });
};