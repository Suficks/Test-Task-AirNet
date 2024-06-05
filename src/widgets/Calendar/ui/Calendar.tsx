import { memo } from 'react';
import cls from './Calendar.module.scss';
import classNames from 'classnames';
import { useCalendar } from '../hooks/useCalendar';

interface CalendarProps {
  className?: string;
  locale?: string
  selectedDate: Date
  firstWeekDay?: number
  selectDate: (date: Date) => void
}

export const Calendar = memo((props: CalendarProps) => {
  const { locale,
    selectedDate,
    selectDate,
    className,
    firstWeekDay = 2
  } = props;

  const { state } = useCalendar({ firstWeekDay, locale, selectedDate })

  return (
    <div className={classNames(cls.Calendar, className)}>
      Calendar
    </div>
  )
})