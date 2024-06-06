import { getWeekNumber } from './getWeekNumber';

interface CreateDateParams {
  locale?: string;
  date?: Date;
}

export interface CalendarDay {
  date: Date
  dayNumber: number
  day: string
  dayNumberInWeek: number
  dayShort: string
  year: number
  yearShort: string
  month: string
  monthShort: string
  monthNumber: number
  monthIndex: number
  timestamp: number
  week: number
}

export const createDate = (params?: CreateDateParams): CalendarDay => {
  const locale = params?.locale ?? 'en-us';
  const date = params?.date ?? new Date();

  const dayNumber = date.getDate();
  const day = date.toLocaleDateString(locale, { weekday: 'long' });
  const dayNumberInWeek = date.getDay() + 1;
  const dayShort = date.toLocaleDateString(locale, { weekday: 'short' });
  const year = date.getFullYear();
  const yearShort = date.toLocaleDateString(locale, { year: '2-digit' });
  const month = date.toLocaleDateString(locale, { month: 'long' });
  const monthShort = date.toLocaleDateString(locale, { month: 'short' });
  const monthNumber = date.getMonth() + 1;
  const monthIndex = date.getMonth();
  const timestamp = date.getTime();
  const week = getWeekNumber(date);

  return {
    date,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    week,
  };
};
