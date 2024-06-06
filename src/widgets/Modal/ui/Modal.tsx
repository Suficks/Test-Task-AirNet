import { memo } from 'react';
import classNames from 'classnames';

import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  isOpen: boolean,
  onClose: () => void
}

export const Modal = memo((props: ModalProps) => {
  const { className, isOpen, onClose } = props;
  return (
    <div className={classNames(cls.Modal, className)}>

    </div>
  )
})