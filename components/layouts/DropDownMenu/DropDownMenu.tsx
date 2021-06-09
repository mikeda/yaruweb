import React from 'react';

import styles from './DropDownMenu.module.scss';

interface Props {
  items: React.ReactNode[];
  onClose: () => void;
}

export const DropDownMenu: React.FC<Props> = ({ items, onClose }) => {
  return (
    <>
      <ul className={styles.dropdown} onClick={() => onClose()}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <div className={styles.fullscreenTransparent} role="button" tabIndex={-1} onClick={() => onClose()} />
    </>
  );
};
