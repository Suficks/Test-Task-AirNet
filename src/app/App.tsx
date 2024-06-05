import { useState } from 'react';
import classNames from 'classnames';

import { Header } from '@/widgets/Header';
import { WeekDays } from '@/widgets/WeekDays/WeekDays';
import { Calendar } from '@/widgets/Calendar';

import cls from './App.module.scss'

interface AppProps {
  className?: string;
}

export const App = ({ className }: AppProps) => {
  const [selectedDate, setSelectedDay] = useState(new Date());

  return (
    <div className='wrapper'>
      <Header />
      <WeekDays />
      <main className={classNames(cls.App, className)}>
        <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)} />
      </main>
    </div>
  );
};