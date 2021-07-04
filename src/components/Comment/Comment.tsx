import React from 'react';
import dayjs from '@/lib/dayjs';

import styles from './Comment.module.scss';

interface UserProps {
  name: string;
  avatarUrl: string;
}

interface Props {
  message: string;
  createdAt: string;
  user: UserProps;
}

export const Comment: React.FC<Props> = ({ message, createdAt, user }) => {
  return (
    <CommentWrapper user={user}>
      <div className={styles.header}>
        <div className={styles.userName}>{user.name}</div>
        <div className={styles.time}>{dayjs(createdAt).format('YYYY/M/D  H:mm')}</div>
      </div>
      <div className={styles.message}>{message}</div>
    </CommentWrapper>
  );
};

export const CommentWrapper: React.FC<{ user: UserProps }> = ({ user, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={user.avatarUrl} />
      </div>
      <div className={styles.cont}>{children}</div>
    </div>
  );
};
