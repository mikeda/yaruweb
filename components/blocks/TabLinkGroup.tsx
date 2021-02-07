import React from 'react';
import Link from 'next/link';

import styles from './TabLinkGroup.module.scss';

interface LinkProps {
  href: string;
  text: string;
  active: boolean;
}

interface Props {
  links: LinkProps[];
}

export const TabLinkGroup: React.FC<Props> = ({ links }) => {
  return (
    <div className={styles.container}>
      {links.map((link, i) => (
        <Link key={i} href={link.href}>
          <a className={link.active ? styles.itemActive : styles.item}>{link.text}</a>
        </Link>
      ))}
    </div>
  );
};
