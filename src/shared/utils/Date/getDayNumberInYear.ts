import { TIMESTAMP } from '@/shared/const/dates';

export const getDayNumberInYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();

  return Math.floor(diff / TIMESTAMP) + 1;
};
