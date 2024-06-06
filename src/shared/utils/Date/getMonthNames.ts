import { MONTHS_IN_YEAR } from '@/shared/const/dates';
import { createDate } from './createDate';

export const getMonthNames = (locale: string = 'en-us') => {
  const monthNames: {
    month: ReturnType<typeof createDate>['month'];
    monthShort: ReturnType<typeof createDate>['monthShort'];
    monthIndex: ReturnType<typeof createDate>['monthIndex'];
    date: ReturnType<typeof createDate>['date'];
  }[] = Array.from({ length: MONTHS_IN_YEAR });

  const d = new Date();

  monthNames.forEach((_, index) => {
    const { month, monthIndex, monthShort, date } = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + index, 1),
    });

    monthNames[monthIndex] = { month, monthIndex, monthShort, date };
  });

  return monthNames;
};
