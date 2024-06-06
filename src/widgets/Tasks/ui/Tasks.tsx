import { memo } from 'react';
import classNames from 'classnames';

import { useTasks } from '@/app/providers/context/tasksContext';

import cls from './Tasks.module.scss';

interface TasksProps {
  className?: string;
  date?: Date
}

export const Tasks = memo(({ className, date }: TasksProps) => {
  const { tasks } = useTasks();
  const todaysTasks = tasks.filter(task => task.date === date);

  return (
    <div className={classNames(cls.tasks, className)}>
      {todaysTasks.map((item) => (
        <div className={cls.task}>{item.text}</div>
      ))}
    </div>
  )
})