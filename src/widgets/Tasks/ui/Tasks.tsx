import { memo } from 'react';
import classNames from 'classnames';

import { useTasks } from '@/app/providers/context/tasksContext';
import { Text } from '@/shared/ui/Text/Text';

import cls from './Tasks.module.scss';

interface TasksProps {
  className?: string;
  date?: Date
  withInput?: boolean
}

export const Tasks = memo(({ className, date, withInput = false }: TasksProps) => {
  const { tasks } = useTasks();
  const todaysTasks = tasks.filter(task => task.date === date);

  return (
    <ul className={classNames(cls.list, className)}>
      {todaysTasks.map((item) => (
        <li key={item.id} >
          <label className={cls.task}>
            {withInput && <input type='checkbox' />}
            <Text text={item.text} size='s' />
          </label>
        </li>
      ))}
    </ul>
  )
})