import { memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import { MdModeEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import { useTasks } from '@/app/providers/context/tasksContext';
import { Text } from '@/shared/ui/Text/Text';

import cls from './Tasks.module.scss';
import { Input } from '@/shared/ui/Input/Input';

interface TasksProps {
  className?: string;
  date?: Date;
  withInput?: boolean;
  small?: boolean;
}

export const Tasks = memo(
  ({ className, date, withInput = false, small }: TasksProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const { tasks, setTask } = useTasks();

    const todaysTasks = tasks.filter((task) => task.date === date);

    const onChangeProgress = useCallback(
      (id: string) => () => {
        setTask((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  progress:
                    task.progress === 'complete' ? 'incomplete' : 'complete',
                }
              : task,
          ),
        );
      },
      [],
    );

    const onDeleteTask = useCallback(
      (id: string) => () => {
        setTask((prevTasks) => [...prevTasks.filter((task) => task.id !== id)]);
      },
      [],
    );

    const onStartEditMode = useCallback(
      (id: string, text: string) => () => {
        setSelectedTaskId(id);
        setIsEditMode(true);
        setInputValue(text);
      },
      [],
    );

    const onCancelEditMode = () => {
      setIsEditMode(false);
    };

    const onSetInputValue = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      },
      [],
    );

    const onChangeTask = useCallback(() => {
      setTask((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTaskId ? { ...task, text: inputValue } : task,
        ),
      );
      setIsEditMode(false);
    }, [selectedTaskId, inputValue]);

    return (
      <ul className={classNames(cls.list, className)}>
        {todaysTasks.map(({ id, progress, text }) => (
          <li key={id}>
            <label className={classNames(cls.task, { [cls.small]: small })}>
              {withInput && (
                <input type="checkbox" onChange={onChangeProgress(id)} />
              )}
              {isEditMode && selectedTaskId === id ? (
                <Input
                  value={inputValue}
                  onCancel={onCancelEditMode}
                  onChange={onSetInputValue}
                  onAccept={onChangeTask}
                />
              ) : (
                <Text
                  text={text}
                  size={small ? 'xs' : 's'}
                  className={classNames(cls.text, {
                    [cls.checked]: progress === 'complete',
                  })}
                />
              )}
              {
                <div className={cls.buttons_wrapper}>
                  {!small && (
                    <button onClick={onStartEditMode(id, text)}>
                      {
                        <MdModeEdit
                          className={classNames(cls.icon, cls.edit)}
                        />
                      }
                    </button>
                  )}
                  {!small && (
                    <button onClick={onDeleteTask(id)}>
                      {
                        <MdDelete
                          className={classNames(cls.icon, cls.delete)}
                        />
                      }
                    </button>
                  )}
                </div>
              }
            </label>
          </li>
        ))}
      </ul>
    );
  },
);
