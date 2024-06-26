import { memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import { LuPlus } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';

import { Tasks } from '@/widgets/Tasks';
import { Text } from '@/shared/ui/Text/Text';
import { useTasks } from '@/app/providers/context/tasksContext';

import cls from './Modal.module.scss';
import { Input } from '@/shared/ui/Input/Input';

interface ModalProps {
  className?: string;
  isOpen: boolean;
  date: Date;
  onClose?: (value: boolean) => void;
}

export const Modal = memo((props: ModalProps) => {
  const { className, isOpen, onClose, date } = props;
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { setTask } = useTasks();

  const onModalClose = useCallback(() => {
    onClose?.(false);
    setIsAddingTask(false);
  }, []);

  const onOpenInput = useCallback(() => {
    setIsAddingTask(true);
  }, []);

  const onSetInputValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [],
  );

  const onAddNewTask = useCallback(() => {
    setIsAddingTask(false);
    setInputValue('');

    if (inputValue) {
      setTask((prev) => [
        ...prev,
        {
          text: inputValue,
          id: uuidv4(),
          date,
          progress: 'incomplete',
        },
      ]);
    }
  }, [inputValue]);

  const onCancelAddTask = useCallback(() => {
    setIsAddingTask(false);
    setInputValue('');
  }, []);

  return (
    <>
      <div
        className={classNames(cls.Modal, className, { [cls.open]: isOpen })}
        data-testid='modal'
      >
        <button className={cls.close_btn} onClick={onModalClose}>
          {<IoClose className={cls.icon} />}
        </button>
        <Text title="Current Tasks" />
        <button className={cls.new_task} onClick={onOpenInput}>
          {<LuPlus className={cls.icon} />}
          <Text text="Add New Task" size="s" />
        </button>
        {isAddingTask && (
          <Input
            onAccept={onAddNewTask}
            onCancel={onCancelAddTask}
            onChange={onSetInputValue}
            value={inputValue}
          />
        )}
        <Tasks date={date} withInput />
      </div>
      <div
        className={classNames(cls.overlay, { [cls.overlay_active]: isOpen })}
        onClick={onModalClose}
      />
    </>
  );
});
