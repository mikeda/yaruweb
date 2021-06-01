import React from 'react';

import styles from './SortableCardContent.module.scss';
import Link from 'next/link';

interface Props {
  title: string;
  links: { text: string; url: string }[];
}

export const SortableCardContent: React.FC<Props> = ({ title, links }) => {
  return (
    <div>
      <div className={styles.title}>{title}</div>
      <div className={styles.links}>
        {links.map((link, i) => (
          <Link key={i} href={link.url}>
            <a className={styles.link}>{link.text}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};
