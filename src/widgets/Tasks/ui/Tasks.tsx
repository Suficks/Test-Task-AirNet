import { memo } from 'react';
import classNames from 'classnames';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

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

  const onDeleteTask = (id: string) => () => {
    setTask(prevTasks =>
      [...prevTasks.filter(task => task.id !== id)]
    );
  }

  return (
    <ul className={classNames(cls.list, className)}>
      {todaysTasks.map(({ id, progress, text }) => (
        <li key={id} >
          <label className={classNames(cls.task, { [cls.small]: small })}>
            {withInput && <input type='checkbox' onChange={onChangeProgress(id)} />}
            <Text
              text={text}
              size={small ? 'xs' : 's'}
              className={classNames(cls.text, { [cls.checked]: progress === 'complete' })}
            />
            <div className={cls.buttons_wrapper}>
              {/* <button onClick={onEditTask(id)}>{<MdModeEdit className={classNames(cls.icon, cls.edit)} />}</button> */}
              {!small && <button onClick={onDeleteTask(id)}>{<MdDelete className={classNames(cls.icon, cls.delete)} />}</button>}
            </div>
          </label>
        </li>
      ))}
    </ul>
  )
})