import { useEffect, useMemo, useState } from 'react';
import {
  createDate,
  createMonth,
  getMonthNames,
  getMonthNumberOfDays,
  getWeekDaysNames,
} from '@/shared/utils/Date';
import { getDaysOff } from '@/shared/api/getDaysOff';
import { DAYS_IN_WEEK, MONTHS_IN_YEAR } from '@/shared/const/dates';

interface UseCalendarParams {
  locale?: string;
  selectedDate: Date;
  firstWeekDay: number;
}

export const useCalendar = ({
  locale,
  selectedDate: date,
  firstWeekDay = 2,
}: UseCalendarParams) => {
  const [selectedDate, setSelectedDate] = useState(createDate({ date }));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({
      date: new Date(selectedDate.year, selectedDate.monthIndex),
      locale,
    }),
  );
  const [selectedYear, setSelectedYear] = useState(selectedDate.year);
  const [daysOff, setDaysOff] = useState('');

  useEffect(() => {
    const fetchDaysOff = async () => {
      const daysOffData = await getDaysOff(selectedYear);
      setDaysOff(daysOffData);
    };

    fetchDaysOff();
  }, [selectedYear])

  const monthsNames = useMemo(() => getMonthNames(locale), []);
  const weekDaysNames = useMemo(
    () => getWeekDaysNames(firstWeekDay, locale),
    [],
  );
  const days = useMemo(
    () => selectedMonth.createMonthDays(),
    [selectedMonth, selectedYear],
  );

  const calendarDays = useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(
      selectedMonth.monthIndex,
      selectedYear,
    );
    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();
    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const firstDay = days[0];
    const lastDay = days[monthNumberOfDays - 1];

    const shiftIndex = firstWeekDay - 1;

    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? DAYS_IN_WEEK - (firstWeekDay - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays =
      DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
        ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
        : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

    const totalCalendarDays = days.length + numberOfNextDays + numberOfPrevDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }
    for (
      let i = numberOfPrevDays;
      i < totalCalendarDays - numberOfNextDays;
      i += 1
    ) {
      result[i] = days[i - numberOfPrevDays];
    }
    for (
      let i = totalCalendarDays - numberOfNextDays;
      i < totalCalendarDays;
      i += 1
    ) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }

    return result;
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

  const onClickArrow = (direction: 'right' | 'left') => {
    const monthIndex = direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1

    if (monthIndex === -1) {
      const year = selectedYear - 1
      setSelectedYear(year)
      return setSelectedMonth(createMonth({ date: new Date(year, 11), locale }))
    }
    if (monthIndex === MONTHS_IN_YEAR) {
      const year = selectedYear + 1
      setSelectedYear(year)
      return setSelectedMonth(createMonth({ date: new Date(year, 0), locale }))
    }

    return setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }))
  }

  return {
    state: {
      calendarDays,
      weekDaysNames,
      monthsNames,
      selectedDate,
      selectedMonth,
      selectedYear,
      daysOff,
    },
    functions: {
      setSelectedDate,
      onClickArrow
    }
  };
};
