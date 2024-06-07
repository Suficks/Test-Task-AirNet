import { Task } from '@/app/providers/context/tasksContext';

export const getItemFromLocalStorage = (key: string) => {
  const itemFromLS = localStorage.getItem(key);
  if (itemFromLS) {
    return JSON.parse(itemFromLS);
  }
};

export const setItemToLocalStorage = (key: string, value: Task[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};
