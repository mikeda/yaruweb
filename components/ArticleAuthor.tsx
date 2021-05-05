import React from 'react';
import dayjs from '@/lib/dayjs';

import styles from './ArticleAuthor.module.scss';

type Props = {
  name: string;
  avatarUrl: string;
  publishedAt?: string | null;
};

export const ArticleAuthor: React.FC<Props> = ({ name, avatarUrl, publishedAt }) => {
  return (
    <div className={styles.container}>
      <figure className={styles.avatar}>
        <img src={avatarUrl} />
      </figure>
      <div>
        <div className={styles.name}>{name}</div>
        {publishedAt && <div className={styles.time}>{dayjs(publishedAt).format('YYYY/M/D  H:mm')}</div>}
      </div>
    </div>
  );
};
