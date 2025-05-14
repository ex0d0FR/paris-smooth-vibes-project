
import React from 'react';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScheduleItem as ScheduleItemType } from './types';
import { getCategoryColor } from './CategoryColors';

interface ScheduleItemProps {
  item: ScheduleItemType;
  index: number;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ item, index }) => {
  const { t } = useTranslation('schedule');
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 reveal"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="sm:w-1/4">
        <div className="flex items-center">
          <Clock className="mr-2 text-paris-blue dark:text-paris-gold h-4 w-4" />
          <span className="text-sm font-medium dark:text-gray-200">{item.time}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.location}</p>
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${getCategoryColor(item.category)}`}>
          {t(`categories.${item.category.toLowerCase()}`, item.category)}
        </span>
      </div>
      
      <div className="sm:w-3/4">
        <h3 className="text-lg font-semibold dark:text-white">{item.title}</h3>
        <p className="text-paris-blue dark:text-paris-gold">{item.speaker}</p>
      </div>
    </div>
  );
};

export default ScheduleItem;
