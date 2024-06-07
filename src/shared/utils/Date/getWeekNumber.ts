import { DAYS_IN_WEEK, TIMESTAMP } from '@/shared/const/dates';

export const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysYear = (date.getTime() - firstDayOfYear.getTime()) / TIMESTAMP;

  return Math.ceil((pastDaysYear + firstDayOfYear.getDay() + 1) / DAYS_IN_WEEK);
};
