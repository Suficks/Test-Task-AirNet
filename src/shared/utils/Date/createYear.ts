import { MONTHS_IN_YEAR } from '@/shared/const/dates';
import { createDate } from './createDate';
import { createMonth } from './createMonth';

interface CreateYearParams {
  year?: number;
  locale?: string;
  monthNumber?: number;
}

export const createYear = (params: CreateYearParams) => {
  const locale = params?.locale ?? 'en-us';

  const today = createDate();
  const year = params.year ?? today.year;
  const monthNumber = params.monthNumber ?? today.monthNumber;

  const month = createMonth({ date: new Date(year, monthNumber - 1), locale });

  const getMonthDays = (monthIndex: number) =>
    createMonth({ date: new Date(year, monthIndex), locale }).createMonthDays();

  const createYearMonths = () => {
    const months = [];

    for (let i = 0; i <= MONTHS_IN_YEAR - 1; i += 1) {
      months[i] = getMonthDays(i);
    }
    return months;
  };

  return {
    createYearMonths,
    month,
    year,
  };
};
