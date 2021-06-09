import React from 'react';

import styles from './TextButton.module.scss';

interface Props {
  active: boolean;
  onMouseDown: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  text: string;
}

export const TextButton: React.FC<Props> = ({ active, onMouseDown, text }) => {
  return (
    <span className={active ? styles.activeButton : styles.button} onMouseDown={onMouseDown}>
      {text}
    </span>
  );
};
