
import React from 'react';
import { useTranslation } from 'react-i18next';

const BookingTips: React.FC = () => {
  const { t } = useTranslation('accommodations');

  const tips = [
    'tips.bookEarly',
    'tips.mentionConference',
    'tips.shuttleService',
    'tips.metroProximity',
    'tips.wifiQuality',
    'tips.cancellationPolicy'
  ];

  const firstHalf = tips.slice(0, 3);
  const secondHalf = tips.slice(3);

  return (
    <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {t('tips.title')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300">
        <ul className="space-y-2">
          {firstHalf.map((tipKey, index) => (
            <li key={index} className="flex items-start">
              <span className="text-paris-blue dark:text-paris-gold mr-2">•</span>
              {t(tipKey)}
            </li>
          ))}
        </ul>
        <ul className="space-y-2">
          {secondHalf.map((tipKey, index) => (
            <li key={index} className="flex items-start">
              <span className="text-paris-blue dark:text-paris-gold mr-2">•</span>
              {t(tipKey)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingTips;
