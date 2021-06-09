import React from 'react';
import dayjs from '@/lib/dayjs';

import styles from './Comment.module.scss';

interface PlayerProps {
  name: string;
  avatarUrl: string;
}

interface Props {
  message: string;
  createdAt: string;
  player: PlayerProps;
}

export const Comment: React.FC<Props> = ({ message, createdAt, player }) => {
  return (
    <CommentWrapper player={player}>
      <div className={styles.header}>
        <div className={styles.playerName}>{player.name}</div>
        <div className={styles.time}>{dayjs(createdAt).format('YYYY/M/D  H:mm')}</div>
      </div>
      <div className={styles.message}>{message}</div>
    </CommentWrapper>
  );
};

export const CommentWrapper: React.FC<{ player: PlayerProps }> = ({ player, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={player.avatarUrl} />
      </div>
      <div className={styles.cont}>{children}</div>
    </div>
  );
};
