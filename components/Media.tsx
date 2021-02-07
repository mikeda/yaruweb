import React from 'react';
import Link from 'next/link';

import styles from './Media.module.scss';

interface Props {
  href?: string;
  imageUrl: string;
  title: string;
  titleNote?: string;
  text: string;
  footer?: React.ReactNode;
}

const Wrapper: React.FC<{ href?: string }> = ({ href, children }) => {
  return href ? (
    <Link href={href}>
      <a className={styles.media}>{children}</a>
    </Link>
  ) : (
    <div className={styles.media}>{children}</div>
  );
};

export const Media: React.FC<Props> = ({ href, imageUrl, title, titleNote, text, footer }) => {
  return (
    <Wrapper href={href}>
      <figure className={styles.imgWrapper}>
        <img src={imageUrl} />
      </figure>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.ttl}>{title}</h3>
          {titleNote && <div className="el_note">{titleNote}</div>}
        </div>

        <p className={styles.txt}>{text}</p>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </Wrapper>
  );
};
