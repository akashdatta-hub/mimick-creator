import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { SurveyQuestion } from '@/types/survey';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuestionProps {
  question: SurveyQuestion;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
}

export const RadioQuestion = ({ question, value, onChange }: QuestionProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
        {t(question.question, question.question)}
      </h2>
      <div className="space-y-3">
        {question.options?.map((optionKey, index) => (
          <label key={index} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name={question.id}
              value={optionKey}
              checked={value === optionKey}
              onChange={(e) => onChange(e.target.value)}
              className="w-5 h-5 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-gray-700 flex-1">{t(optionKey, optionKey)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export const TextQuestion = ({ question, value, onChange }: QuestionProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        {t(question.question, question.question)}
      </h2>
      <div className="relative">
        <Textarea
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('favorite_games_placeholder', 'Tell us about your favorite games...')}
          className="min-h-[120px] text-lg p-4 border-2 border-purple-200 focus:border-purple-400 rounded-xl resize-none"
        />
        <div className="absolute bottom-3 right-3 text-sm text-gray-400">
          {((value as string) || '').length}/500
        </div>
      </div>
    </div>
  );
};

export const SliderQuestion = ({ question, value, onChange }: QuestionProps) => {
  const { t } = useLanguage();
  const sliderValue = typeof value === 'number' ? value : (question.min || 0);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        {t(question.question, question.question)}
      </h2>
      <div className="space-y-4">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 px-6 py-3 rounded-full">
            <span className="text-3xl">⭐</span>
            <span className="text-2xl font-bold text-yellow-600">{sliderValue}</span>
            <span className="text-lg text-yellow-600">{t('stars', 'stars')}</span>
          </div>
        </div>
        <div className="px-6">
          <Slider
            value={[sliderValue]}
            onValueChange={(values) => onChange(values[0])}
            min={question.min || 0}
            max={question.max || 10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{question.min || 0}</span>
            <span>{question.max || 10}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmojiQuestion = ({ question, value, onChange }: QuestionProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        {t(question.question, question.question)}
      </h2>
      <div className="flex justify-center space-x-6">
        {question.emojis?.map((emoji) => (
          <button
            key={emoji.value}
            onClick={() => onChange(emoji.value)}
            className={`flex flex-col items-center space-y-2 p-6 rounded-2xl transition-all duration-200 hover:scale-105 ${
              value === emoji.value
                ? 'bg-purple-100 ring-4 ring-purple-300 scale-105'
                : 'bg-gray-50 hover:bg-purple-50'
            }`}
        >
          <span className="text-6xl">{emoji.emoji}</span>
          <span className="text-sm font-medium text-gray-700">{t(emoji.label, emoji.label)}</span>
        </button>
      ))}
    </div>
  </div>
);
};

export const YesNoQuestion = ({ question, value, onChange }: QuestionProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        {t(question.question, question.question)}
      </h2>
      <div className="flex justify-center space-x-4">
        <Button
          onClick={() => onChange('yes')}
          size="lg"
          className={`px-8 py-6 text-xl font-bold transition-all duration-200 ${
            value === 'yes'
              ? 'bg-green-500 hover:bg-green-600 text-white scale-105'
              : 'bg-gray-100 hover:bg-green-100 text-gray-700'
          }`}
        >
          <span className="mr-2">✅</span>
          {t('yes', 'Yes')}
        </Button>
        <Button
          onClick={() => onChange('no')}
          size="lg"
          className={`px-8 py-6 text-xl font-bold transition-all duration-200 ${
            value === 'no'
              ? 'bg-red-500 hover:bg-red-600 text-white scale-105'
              : 'bg-gray-100 hover:bg-red-100 text-gray-700'
          }`}
        >
        <span className="mr-2">❌</span>
        {t('no', 'No')}
      </Button>
    </div>
  </div>
);
};

export const QuestionComponent = (props: QuestionProps) => {
  switch (props.question.type) {
    case 'radio':
      return <RadioQuestion {...props} />;
    case 'text':
      return <TextQuestion {...props} />;
    case 'slider':
      return <SliderQuestion {...props} />;
    case 'emoji':
      return <EmojiQuestion {...props} />;
    case 'yesno':
      return <YesNoQuestion {...props} />;
    default:
      return null;
  }
};