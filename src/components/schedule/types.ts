
export interface ScheduleItem {
  time: string;
  title: string;
  speaker: string;
  location: string;
  category: string;
}

export type ScheduleData = Record<string, ScheduleItem[]>;
