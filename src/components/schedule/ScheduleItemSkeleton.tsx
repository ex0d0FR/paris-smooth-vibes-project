
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ScheduleItemSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-4 reveal">
      <div className="sm:w-1/4">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="sm:w-3/4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default ScheduleItemSkeleton;
