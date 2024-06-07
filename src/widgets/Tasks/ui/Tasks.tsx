import { memo } from 'react';
import classNames from 'classnames';

import { useTasks } from '@/app/providers/context/tasksContext';
import { Text } from '@/shared/ui/Text/Text';

import cls from './Tasks.module.scss';

interface TasksProps {
  className?: string;
  date?: Date
  withInput?: boolean
  small?: boolean
}

export const Tasks = memo(({ className, date, withInput = false, small }: TasksProps) => {
  const { tasks, setTask } = useTasks();
  const todaysTasks = tasks.filter(task => task.date === date);

  const onChangeProgress = (id: string) => () => {
    setTask(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, progress: task.progress === 'complete' ? 'incomplete' : 'complete' } : task
      )
    );
  }

  return (
    <ul className={classNames(cls.list, className)}>
      {todaysTasks.map((item) => (
        <li key={item.id} >
          <label className={classNames(cls.task, { [cls.small]: small })}>
            {withInput && <input type='checkbox' onChange={onChangeProgress(item.id)} />}
            <Text
              text={item.text}
              size={small ? 'xs' : 's'}
              className={classNames(cls.text, { [cls.checked]: item.progress === 'complete' })}
            />
          </label>
        </li>
      ))}
    </ul>
  )
})