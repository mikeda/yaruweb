import { useSortable } from '@dnd-kit/sortable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { CSS } from '@dnd-kit/utilities';

import styles from './SortableCard.module.scss';

interface Props {
  id: string;
}

export const SortableCard: React.FC<Props> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  return (
    <div style={style}>
      <div className={styles.card}>
        <div className={styles.content}>{children}</div>
        <div ref={setNodeRef} {...attributes} {...listeners}>
          <FontAwesomeIcon icon={faBars} className={styles.handle} />
        </div>
      </div>
    </div>
  );
};
