import { memo, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { MdModeEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { FaTasks } from "react-icons/fa";

import { useTasks } from '@/app/providers/context/tasksContext';
import { Text } from '@/shared/ui/Text/Text';
import { Input } from '@/shared/ui/Input/Input';
import { useTasksHook } from '../hooks/useTasks';

import cls from './Tasks.module.scss';

interface TasksProps {
  className?: string;
  date?: Date;
  withInput?: boolean;
  small?: boolean;
}

export const Tasks = memo(
  ({ className, date, withInput = false, small }: TasksProps) => {
    const { tasks } = useTasks();
    const { isEditMode,
      selectedTaskId,
      inputValue,
      onCancelEditMode,
      onSetInputValue,
      onChangeTask,
      onChangeProgress,
      onStartEditMode,
      onDeleteTask
    } = useTasksHook();

    const todaysTasks = tasks.filter((task) =>
      new Date(task.date).getTime() === date?.getTime()
    );

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
            <li key={id} className={classNames(cls.task, { [cls.small]: small })}>
              <label className={(cls.label)}>
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
        })
        }
        {todaysTasks.length > 0 && small && < FaTasks className={cls.task_icon} />}
      </ul>
    );
  })
