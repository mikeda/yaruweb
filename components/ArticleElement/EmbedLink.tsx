import React from 'react';

import styles from './EmbedLink.module.scss';

interface Props {
  url: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  attributes: { [key: string]: unknown };
}

export const EmbedLink: React.FC<Props> = ({ url, title, description, imageUrl, attributes, children }) => {
  const hostname = new URL(url).hostname;
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <a href={url} className={styles.link}>
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            {description && <div>{description}</div>}
            <div className={styles.host}>{hostname}</div>
          </div>

          {imageUrl && (
            <figure className={styles.image}>
              <img src={imageUrl} />
            </figure>
          )}
        </a>
      </div>
      {children}
    </div>
  );
};
