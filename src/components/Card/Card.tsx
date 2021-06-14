import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import styles from './Card.module.scss';

type Props = {
  title: string;
  imageUrl: string;
  href: string;
  isNew?: boolean;
};

export const Card: React.FC<Props> = ({ title, href, isNew, imageUrl, children }) => {
  return (
    <Link href={href}>
      <a className={styles.container}>
        {isNew && (
          <b className={styles.badge}>
            <span className={styles.badge_txt}>New</span>
          </b>
        )}

        <figure>
          <Image src={imageUrl} width={400} height={210} />
        </figure>

        <div className={styles.body}>
          <h3 className={styles.ttl}>{title}</h3>
          {children}
        </div>
      </a>
    </Link>
  );
};
