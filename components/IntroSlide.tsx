import React from 'react';

import styles from './IntroSlide.module.scss';

interface Props {
  imageUrl: string;
}

export const IntroSlide: React.FC<Props> = ({ imageUrl, children }) => {
  return (
    <div>
      <div className={styles.innber}>
        <div className={styles.image}>
          <img src={imageUrl} />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};
