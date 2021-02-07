import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { CurrentPlayerContext } from '@/lib/contexts/CurrentPlayerContext';
import { Routes } from '@/lib/Routes';

import styles from './PlayerMenu.module.scss';
import { DropDownMenu } from './DropDownMenu';
import { signOutFirebase } from '@/lib/firebase';

export const PlayerMenu: React.FC = () => {
  const { currentPlayer, setCurrentPlayer } = useContext(CurrentPlayerContext);
  const [menuOpened, setMenuOpened] = useState(false);
  const router = useRouter();

  if (!currentPlayer) {
    return (
      <Link href={Routes.login()}>
        <a>ログイン</a>
      </Link>
    );
  }

  return (
    <div className={styles.menu}>
      <div
        onClick={() => {
          setMenuOpened(!menuOpened);
        }}
        className={styles.avatar}
      >
        <img src={currentPlayer.avatarUrl} />
      </div>

      {menuOpened && (
        <DropDownMenu
          onClose={() => setMenuOpened(false)}
          items={[
            <Link key={0} href={Routes.mypageArticles()}>
              <a>マイページ</a>
            </Link>,
            <Link key={1} href={Routes.mypageEdit()}>
              <a>アカウント設定</a>
            </Link>,
            <a
              key={2}
              onClick={e => {
                e.preventDefault();
                signOutFirebase().then(() => {
                  toast.success('ログアウトしました。');
                  setCurrentPlayer(undefined);
                  router.push(Routes.top());
                });
              }}
            >
              ログアウト
            </a>,
          ]}
        />
      )}
    </div>
  );
};
