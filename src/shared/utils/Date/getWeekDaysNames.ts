import { DAYS_IN_WEEK } from '@/shared/const/dates';
import { createDate } from './createDate';

export const getWeekDaysNames = (
  firstWeekDay: number = 2,
  locale: string = 'en-us',
) => {
  const weekDaysNames: {
    day: ReturnType<typeof createDate>['day'];
    dayShort: ReturnType<typeof createDate>['dayShort'];
  }[] = Array.from({ length: DAYS_IN_WEEK });

  const d = new Date();

  weekDaysNames.forEach((_, index) => {
    const { day, dayNumberInWeek, dayShort } = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth(), d.getDate() + index),
    });

    weekDaysNames[dayNumberInWeek - 1] = { day, dayShort };
  });

  return [
    ...weekDaysNames.slice(firstWeekDay - 1),
    ...weekDaysNames.slice(0, firstWeekDay - 1),
  ];
};
