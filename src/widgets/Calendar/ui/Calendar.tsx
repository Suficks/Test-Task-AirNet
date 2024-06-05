import { memo } from 'react';
import classNames from 'classnames';

import { Text } from '@/shared/ui/Text/Text';

import cls from './Calendar.module.scss';
import { useCalendar } from '../hooks/useCalendar';
import { monthsImagesData } from '@/shared/const/MonthsImagesData';

interface CalendarProps {
  className?: string;
  locale?: string;
  selectedDate: Date;
  firstWeekDay?: number;
  selectDate: (date: Date) => void;
}

export const Calendar = memo((props: CalendarProps) => {
  const {
    locale,
    selectedDate,
    selectDate,
    className,
    firstWeekDay = 2,
  } = props;

  const { state } = useCalendar({ firstWeekDay, locale, selectedDate });
  const currentMonth =
    state.monthsNames[state.selectedMonth.monthIndex].monthShort;

  return (
    <>
      <section className={classNames(cls.Header, className)}>
        <img
          className={cls.image}
          src={
            monthsImagesData.find((item) => item.month === currentMonth)?.image
          }
        />
        {/* <button onClick={handlePrevMonth} className={classNames(cls.button, cls.prev)} /> */}
        <Text
          className={cls.title}
          title={`${currentMonth} ${state.selectedYear}`}
          bold
        />
        {/* <button onClick={handleNextMonth} className={cls.button} /> */}
      </section>
      <section>
        <div className={cls.weekNames}>
          {state.weekDaysNames.map((weeDayName) => (
            <div
              key={weeDayName.dayShort}
              className={cls.weekDay}>
              {weeDayName.dayShort}
            </div>
          ))}
        </div>
        <div className={cls.calendar}>
          {state.calendarDays.map((calendarDay) => (
            <div
              key={`${calendarDay.dayNumber} - ${calendarDay.monthIndex}`}
              className={cls.day}>
              {calendarDay.dayNumber}
            </div>
          ))}
        </div>
      </section>
    </>
  );
});
