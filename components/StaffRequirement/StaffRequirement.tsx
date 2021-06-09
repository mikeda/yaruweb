import React from 'react';

import styles from './StaffRequirement.module.scss';

export const StaffRequirement: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.ttl}>運営テケナー募集中！</h2>

      <p className={styles.txt}>
        キャラの技データ作成を手伝ってくれるテケナーを募集しています。
        <br />
        興味があればぜひご連絡下さい！
        <br />
        <a href="https://twitter.com/mikeda" target="_blank" rel="noreferrer">
          Twitter : @mikeda
        </a>
      </p>
    </div>
  );
};
