
import React from 'react';
import { useTranslation } from 'react-i18next';

const RestaurantTips: React.FC = () => {
  const { t } = useTranslation('restaurants');

  // Get tips items with proper type casting
  const tipsItems = t('tips.items', { returnObjects: true });
  const tipsArray = Array.isArray(tipsItems) ? tipsItems : [];

  return (
    <div className="mt-12 bg-paris-blue/5 dark:bg-paris-gold/5 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('tips.title')}</h2>
      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
        {tipsArray.map((tip: string, index: number) => (
          <li key={index}>• {tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantTips;
