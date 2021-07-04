import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { signOutFirebase } from '@/lib/firebase';
import { useCurrentPlayer } from '@/hooks/useCurrentPlayer';
import { currentPlayerState } from '@/states/currentPlayer';
import { dashboardPath, path } from '@/lib';
import { Avatar, IconButton, Link, Menu, MenuItem } from '@material-ui/core';

export const PlayerMenu: React.FC = () => {
  const { currentPlayer } = useCurrentPlayer();
  const router = useRouter();
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (!currentPlayer) {
    return <Link href={path({ to: 'login' })}>ログイン</Link>;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-controls="player-menu" aria-haspopup="true" onClick={handleClick}>
        <Avatar alt={currentPlayer.name} src={currentPlayer.avatarUrl} />
      </IconButton>
      <Menu id="player-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            router.push(dashboardPath({ to: 'articles' }));
            handleClose();
          }}
        >
          マイページ
        </MenuItem>
        <MenuItem
          onClick={() => {
            signOutFirebase().then(() => {
              toast.success('ログアウトしました。');
              setCurrentPlayer(null);
              router.push(path({ to: 'top' }));
            });
            handleClose();
          }}
        >
          ログアウト
        </MenuItem>
      </Menu>
    </>
  );
};
