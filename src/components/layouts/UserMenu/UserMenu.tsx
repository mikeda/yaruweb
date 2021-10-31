import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { signOutFirebase } from '@/lib/firebase';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { currentUserState } from '@/states/currentUser';
import { dashboardPath, path } from '@/lib';
import { Avatar, IconButton, Link, Menu, MenuItem } from '@mui/material';

export const UserMenu: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (!currentUser) {
    return <Link href={path({ to: 'login' })}>ログイン</Link>;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>
    <IconButton
      aria-controls="user-menu"
      aria-haspopup="true"
      onClick={handleClick}
      size="large">
      <Avatar alt={currentUser.name} src={currentUser.avatarUrl} />
    </IconButton>
    <Menu id="user-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
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
            setCurrentUser(null);
            router.push(path({ to: 'top' }));
          });
          handleClose();
        }}
      >
        ログアウト
      </MenuItem>
    </Menu>
  </>;
};
