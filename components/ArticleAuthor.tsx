import React from 'react';
import dayjs from '@/lib/dayjs';

import styles from './ArticleAuthor.module.scss';

type Props = {
  name: string;
  avatarUrl: string;
  publishedAt: string;
};

export const ArticleAuthor: React.FC<Props> = ({ name, avatarUrl, publishedAt }) => {
  const publishedTime = dayjs(publishedAt).format('YYYY/M/D  H:mm');

  return (
    <div className={styles.container}>
      <figure className={styles.avatar}>
        <img src={avatarUrl} />
      </figure>
      <div>
        <div className={styles.name}>{name}</div>
        <div className={styles.time}>{publishedTime}</div>
      </div>
    </div>
  );
};
