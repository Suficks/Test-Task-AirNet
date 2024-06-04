import classNames from 'classnames';

import { Header } from '@/widgets/Header';

import cls from './App.module.scss'
import { WeekDays } from '@/widgets/WeekDays/WeekDays';

interface AppProps {
  className?: string;
}

export const App = ({ className }: AppProps) => {
  return (
    <div className='wrapper'>
      <Header />
      <WeekDays />
      <main className={classNames(cls.App, className)}>
      </main>
    </div>
  );
};