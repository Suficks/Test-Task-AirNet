import { MouseEventHandler, memo } from 'react';
import classNames from 'classnames';
import { FaCheck } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';

import cls from './Input.module.scss';

interface InputProps {
  className?: string;
  value: string;
  onAccept?: () => void;
  onCancel?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = memo((props: InputProps) => {
  const { className, onAccept, onCancel, onChange, value } = props;

  return (
    <div className={classNames(cls.Input, className)}>
      <input className={cls.input} value={value} onChange={onChange} />
      <button onClick={onAccept}>
        {<FaCheck className={classNames(cls.accept)} />}
      </button>
      <button onClick={onCancel}>
        {<AiFillCloseCircle className={classNames(cls.cancel)} />}
      </button>
    </div>
  );
});
