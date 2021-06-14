import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { Routes } from '@/lib/Routes';

import styles from './PlayerMenu.module.scss';
import { DropDownMenu } from '@/components';
import { signOutFirebase } from '@/lib/firebase';
import { useCurrentPlayer } from '@/hooks/useCurrentPlayer';
import { currentPlayerState } from '@/states/currentPlayer';

export const PlayerMenu: React.FC = () => {
  const { currentPlayer } = useCurrentPlayer();
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const [menuOpened, setMenuOpened] = useState(false);
  const router = useRouter();

  if (!currentPlayer) {
    return (
      <Link href={Routes.session.login()}>
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
            <Link key={0} href={Routes.dashboard.article.index()}>
              <a>マイページ</a>
            </Link>,
            <a
              key={2}
              onClick={e => {
                e.preventDefault();
                signOutFirebase().then(() => {
                  toast.success('ログアウトしました。');
                  setCurrentPlayer(null);
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
