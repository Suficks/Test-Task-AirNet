import { getItemFromLocalStorage } from "@/shared/utils/LocalStorage/localStorage";
import { ReactNode, createContext, useContext, useState } from "react";

export type Task = {
  /** Идентификатор задачи */
  id: string
  /** Текст задачи */
  text: string
  /** Прогресс по  задачи: выполнена или нет */
  progress: 'complete' | 'incomplete'
  /** День на который назначена задача */
  date: Date
}

interface TasksContextType {
  tasks: Task[];
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksContext = createContext<TasksContextType>({
  tasks: [],
  setTask: () => { },
});

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTask] = useState<Task[]>(getItemFromLocalStorage('tasks') || []);

  return (
    <TasksContext.Provider value={{ tasks, setTask }}>
      {children}
    </TasksContext.Provider>
  );
};