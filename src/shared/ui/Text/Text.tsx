import { memo } from 'react';
import classNames from 'classnames';

import cls from './Text.module.scss';

export type TextSize = 's' | 'm';
export type TextStyle = 'normal' | 'italic';

type HeaderTagType = 'h1' | 'h2';

const mapSizeToClass: Record<TextSize, string> = {
  s: cls.size_s,
  m: cls.size_m,
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h2',
  m: 'h1',
};

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  bold?: boolean;
  size?: TextSize;
  style?: TextStyle;
}

export const Text = memo((props: TextProps) => {
  const { className, title, text, bold, style = 'normal', size = 'm' } = props;

  const HeaderTag = mapSizeToHeaderTag[size];
  const sizeClass = mapSizeToClass[size];

  return (
    <>
      {title && (
        <HeaderTag
          className={classNames(
            cls.title,
            {
              [cls.bold]: bold,
              [cls.italic]: style === 'italic',
            },
            sizeClass,
            className,
          )}
        >
          {title}
        </HeaderTag>
      )}
      {text && (
        <p
          className={classNames(
            cls.text,
            {
              [cls.bold]: bold,
              [cls.italic]: style === 'italic',
            },
            sizeClass,
            className,
          )}
        >
          {text}
        </p>
      )}
    </>
  );
});
