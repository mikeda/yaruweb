import React from 'react';

import styles from './GlobalFooter.module.scss';

export const GlobalFooter: React.FC = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.inner}>
        <ul className={styles.nav}>
          <li>
            <a href="https://www.tk7.tekken-official.jp/" target="_blank" rel="noreferrer">
              鉄拳7公式
            </a>
          </li>
          <li>
            <a href="https://twitter.com/mikeda" target="_blank" rel="noreferrer">
              問い合わせ(Twitter)
            </a>
          </li>
        </ul>

        <div className={styles.copyright}>&copy; 鉄拳やろうよ.com</div>
      </div>
    </footer>
  );
};
