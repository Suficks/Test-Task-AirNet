import classNames from 'classnames';

import cls from './MainPage.module.scss';

interface MainPageProps {
  className?: string;
}

export const MainPage = ({ className }: MainPageProps) => {
  return (
    <div className={classNames(cls.MainPage, className)}>

    </div>
  )
}