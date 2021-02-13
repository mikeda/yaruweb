import React from 'react';

import styles from './Button.module.scss';

interface Props {
  active: boolean;
  onMouseDown: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  icon: number;
}

export const Button: React.FC<Props> = ({ active, onMouseDown, icon }) => {
  return (
    <span className={active ? styles.activeButton : styles.button} onMouseDown={onMouseDown}>
      {String.fromCharCode(icon)}
    </span>
  );
};
