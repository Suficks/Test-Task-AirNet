import { memo, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { MdModeEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import { useTasks } from '@/app/providers/context/tasksContext';
import { Text } from '@/shared/ui/Text/Text';
import { Input } from '@/shared/ui/Input/Input';
import { setItemToLocalStorage } from '@/shared/utils/LocalStorage/localStorage';

import cls from './Tasks.module.scss';

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

    const todaysTasks = tasks.filter((task) =>
      new Date(task.date).getTime() === date?.getTime()
    );

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
      [isEditMode],
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

    const onCancelEditMode = useCallback(() => {
      setIsEditMode(false);
    }, []);

    const onSetInputValue = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      },
      [],
    );

    const onChangeTask = useCallback((e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation()
      if (inputValue) {
        setTask((prevTasks) =>
          prevTasks.map((task) =>
            task.id === selectedTaskId ? { ...task, text: inputValue } : task,
          ),
        );
      }
      setIsEditMode(false);
    }, [selectedTaskId, inputValue]);

    useEffect(() => {
      setItemToLocalStorage('tasks', tasks)
    }, [tasks])

    return (
      <ul className={classNames(cls.list, className)}>
        {todaysTasks.map(({ id, progress, text }) => {
          const isEditing = isEditMode && selectedTaskId === id;
          const taskContent = isEditing ? (
            <Input
              value={inputValue}
              onCancel={onCancelEditMode}
              onChange={onSetInputValue}
              onAccept={onChangeTask}
            />
          ) : (
            <>
              {withInput && (
                <input
                  type="checkbox"
                  onChange={onChangeProgress(id)}
                  checked={progress === 'complete'}
                />
              )}
              <Text
                text={text}
                size={small ? 'xs' : 's'}
                className={classNames(cls.text, {
                  [cls.checked]: progress === 'complete',
                })}
              />
            </>
          )

          return (
            <li key={id} className={cls.task}>
              <label className={classNames(cls.label, { [cls.small]: small })}>
                {taskContent}
              </label>
              {
                <div className={cls.buttons_wrapper}>
                  {!small && !isEditing && (
                    <button onClick={onStartEditMode(id, text)}>
                      {<MdModeEdit className={classNames(cls.icon, cls.edit)} />}
                    </button>
                  )}
                  {!small && !isEditing && (
                    <button onClick={onDeleteTask(id)}>
                      {<MdDelete className={classNames(cls.icon, cls.delete)} />}
                    </button>
                  )}
                </div>
              }
            </li>
          );
        })}
      </ul>
    );
  })
