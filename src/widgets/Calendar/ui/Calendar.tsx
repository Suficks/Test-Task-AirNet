import { memo, useState } from 'react';
import classNames from 'classnames';

import { Text } from '@/shared/ui/Text/Text';
import { useCalendar } from '../hooks/useCalendar';
import { monthsImagesData } from '@/shared/const/MonthsImagesData';
import {
  CalendarDay,
  checkDateIsEqual,
  checkIsToday,
  getDayNumberInYear,
} from '@/shared/utils/Date';
import { Tasks } from '@/widgets/Tasks/ui/Tasks';
import { Modal } from '@/widgets/Modal';

import cls from './Calendar.module.scss';

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

  const { state, functions } = useCalendar({
    firstWeekDay,
    locale,
    selectedDate,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentMonth =
    state.monthsNames[state.selectedMonth.monthIndex].monthShort;

  const additionalClasses = (calendarDay: CalendarDay) => {
    const isToday = checkIsToday(calendarDay.date);
    const isSelectedDay = checkDateIsEqual(
      calendarDay.date,
      state.selectedDate.date,
    );
    const isAdditionalDay =
      calendarDay.monthIndex !== state.selectedMonth.monthIndex;
    const isDayOff =
      Number(state.daysOff[getDayNumberInYear(calendarDay.date) - 1]) === 1;

    return {
      [cls.today]: isToday,
      [cls.selected]: isSelectedDay,
      [cls.additional]: isAdditionalDay,
      [cls.isDayOff]: isDayOff,
    };
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <section className={classNames(cls.Header, className)}>
        <img
          className={cls.image}
          src={
            monthsImagesData.find((item) => item.month === currentMonth)?.image
          }
        />
        <button
          onClick={() => functions.onClickArrow('left')}
          className={classNames(cls.button, cls.prev)}
        />
        <Text
          className={cls.title}
          title={`${currentMonth} ${state.selectedYear}`}
          bold
        />
        <button
          onClick={() => functions.onClickArrow('right')}
          className={cls.button}
        />
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
            return (
              <div
                key={`${calendarDay.dayNumber} - ${calendarDay.monthIndex}`}
                onClick={() => {
                  onModalOpen();
                  functions.setSelectedDate(calendarDay);
                  selectDate(calendarDay.date);
                }}
                className={classNames(cls.day, additionalClasses(calendarDay))}
                data-testid='day'
              >
                {calendarDay.dayNumber}
                <Tasks date={calendarDay.date} small className={cls.tasks} />
              </div>
            );
          })}
        </div>
        <Modal
          isOpen={isModalOpen}
          date={state.selectedDate.date}
          onClose={setIsModalOpen}
        />
      </section>
    </>
  );
});
