
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import ScheduleList from './schedule/ScheduleList';
import { useScheduleData } from './schedule/useScheduleData';
import { useVisibilityEffect } from './schedule/useVisibilityEffect';

const Schedule = () => {
  const { t } = useTranslation('schedule');
  const { 
    activeDay, 
    loading, 
    preloadedData, 
    scheduleData,
    checkScheduleVisibility,
    handleTabChange
  } = useScheduleData();
  
  // Apply visibility effects
  useVisibilityEffect(checkScheduleVisibility, loading, activeDay);
  
  return (
    <section id="schedule" className="py-20 bg-paris-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 reveal dark:text-white">
          {t('title')}
        </h2>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 reveal" style={{ transitionDelay: '100ms' }}>
          {t('description')}
        </p>
        
        <div className="max-w-4xl mx-auto reveal" style={{ transitionDelay: '200ms' }}>
          <Tabs defaultValue="day1" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="day1" className="text-sm sm:text-base">{t('day1')}</TabsTrigger>
              <TabsTrigger value="day2" className="text-sm sm:text-base">{t('day2')}</TabsTrigger>
              <TabsTrigger value="day3" className="text-sm sm:text-base">{t('day3')}</TabsTrigger>
              <TabsTrigger value="day4" className="text-sm sm:text-base">{t('day4')}</TabsTrigger>
            </TabsList>
            
            {Object.keys(scheduleData).map((day) => (
              <TabsContent key={day} value={day} className="space-y-4">
                <ScheduleList 
                  day={day}
                  itemsToRender={preloadedData[day] || []}
                  loading={loading}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
