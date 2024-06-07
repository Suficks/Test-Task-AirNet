import { setItemToLocalStorage } from "@/shared/utils/LocalStorage/localStorage";
import { useCallback, useEffect, useState } from "react";
import { Task, useTasks } from '@/app/providers/context/tasksContext';

export const useTasksHook = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const { tasks, setTask } = useTasks();

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
    setItemToLocalStorage<Task[]>('tasks', tasks)
  }, [tasks])

  return {
    onChangeProgress,
    onDeleteTask,
    onStartEditMode,
    onCancelEditMode,
    onSetInputValue,
    onChangeTask,
    isEditMode,
    inputValue,
    selectedTaskId,
  }
}