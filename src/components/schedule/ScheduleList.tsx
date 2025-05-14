
import React from 'react';
import ScheduleItem from './ScheduleItem';
import ScheduleItemSkeleton from './ScheduleItemSkeleton';
import { ScheduleItem as ScheduleItemType } from './types';

interface ScheduleListProps {
  day: string;
  itemsToRender: ScheduleItemType[];
  loading: boolean;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ day, itemsToRender, loading }) => {
  if (loading) {
    return (
      <>
        {Array(3).fill(0).map((_, index) => (
          <ScheduleItemSkeleton key={index} />
        ))}
      </>
    );
  }
  
  return (
    <>
      {itemsToRender.map((item, index) => (
        <ScheduleItem key={`${day}-${index}`} item={item} index={index} />
      ))}
    </>
  );
};

export default ScheduleList;
