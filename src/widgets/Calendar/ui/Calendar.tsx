import { memo } from 'react';
import classNames from 'classnames';

import { Text } from '@/shared/ui/Text/Text';

import cls from './Calendar.module.scss';
import { useCalendar } from '../hooks/useCalendar';
import { monthsImagesData } from '@/shared/const/MonthsImagesData';
import { checkDateIsEqual, checkIsToday } from '@/shared/utils/Date';

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
            <Text
              key={weeDayName.dayShort}
              className={cls.weekDay}
              text={weeDayName.dayShort}
              bold
            />
          ))}
        </div>
        <div className={cls.calendar}>
          {state.calendarDays.map((calendarDay) => {
            const isToday = checkIsToday(calendarDay.date);
            const isSelectedDay = checkDateIsEqual(calendarDay.date, state.selectedDate.date)
            const isAdditionalDay = calendarDay.monthIndex !== state.selectedMonth.monthIndex
            const additionalClasses = {
              [cls.today]: isToday,
              [cls.selected]: isSelectedDay,
              [cls.additional]: isAdditionalDay
            }
            return (
              <div
                key={`${calendarDay.dayNumber} - ${calendarDay.monthIndex}`}
                onClick={() => {
                  selectDate(calendarDay.date)
                }}
                className={classNames(cls.day, additionalClasses)}
              >
                {calendarDay.dayNumber}
              </div>
            )
          }
          )}
        </div>
      </section>
    </>
  );
});
