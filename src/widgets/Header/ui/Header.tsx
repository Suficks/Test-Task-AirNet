import { memo, useState } from 'react';
import classNames from 'classnames';

import { monthsImagesData } from '@/shared/const/MonthsImagesData';
import { Text } from '@/shared/ui/Text/Text';

import cls from './Header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header = memo(({ className }: HeaderProps) => {
  const [monthOffset, setMonthOffset] = useState(0);
  const [yearOffset, setYearOffset] = useState(0);
  const currentDate = new Date();
  const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1).toLocaleString('en-us', { month: 'short' });
  const currentYear = new Date(currentDate.getFullYear() + yearOffset, currentDate.getMonth() + monthOffset, 1).getFullYear();

  const handleNextMonth = () => {
    if (monthOffset === 12) {
      setMonthOffset(0);
      setYearOffset(prev => prev + 1)
    }
    setMonthOffset(prev => prev + 1);
  };

  const handlePrevMonth = () => {
    if (monthOffset === 0) {
      setMonthOffset(12)
      setYearOffset(prev => prev - 1)
    }
    setMonthOffset(prev => prev - 1);
  };

  return (
    <header className={classNames(cls.Header, className)}>
      <img className={cls.image} src={monthsImagesData.find(item => item.month === currentMonth)?.image} />
      <button onClick={handlePrevMonth} className={classNames(cls.button, cls.prev)} />
      <Text className={cls.title} title={`${currentMonth} ${currentYear}`} bold />
      <button onClick={handleNextMonth} className={cls.button} />
    </header>
  )
})