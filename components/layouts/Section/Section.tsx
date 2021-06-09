import React from 'react';
import { Heading } from '../Heading';

import styles from './Section.module.scss';

interface Props {
  title?: string;
}

export const Section: React.FC<Props> = ({ title, children }) => {
  return (
    <section className={styles.section}>
      {title && (
        <div className={styles.header}>
          <Heading lv="h2">{title}</Heading>
        </div>
      )}

      {children}
    </section>
  );
};

export const SectionUnit: React.FC = ({ children }) => {
  return <div className={styles.unit}>{children}</div>;
};
