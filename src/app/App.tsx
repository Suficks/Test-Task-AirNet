import classNames from 'classnames';

import { Header } from '@/widgets/Header';

import cls from './App.module.scss'

interface AppProps {
  className?: string;
}

export const App = ({ className }: AppProps) => {
  return (
    <div className='wrapper'>
      <Header />
      <main className={classNames(cls.App, className)}>
      </main>
    </div>
  );
};