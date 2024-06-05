import { memo } from 'react';
import classNames from 'classnames';

import { weekDaysList } from '@/shared/const/WeekDaysList';

import cls from './WeekDays.module.scss';

interface WeekDaysProps {
  className?: string;
}

export const WeekDays = memo(({ className }: WeekDaysProps) => {
  return (
    <div className={classNames(cls.weekDays, className)}>
      {weekDaysList.map(item => (
        <div key={item} className={cls.day}>{item}</div>
      ))}
    </div>
  )
})