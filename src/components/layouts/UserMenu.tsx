import React from 'react';

import { Avatar, IconButton, Link, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { pagesPath } from '@/generated/$path';
import { signOutFirebase, useCurrentUser, currentUserState, resolveUrlObject } from '@/lib';

export const UserMenu: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (!currentUser) {
    return <Link href={resolveUrlObject(router, pagesPath.login.$url())}>ログイン</Link>;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-controls="user-menu" aria-haspopup="true" onClick={handleClick} size="large">
        <Avatar alt={currentUser.name} src={currentUser.avatarUrl} />
      </IconButton>
      <Menu id="user-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            router.push(pagesPath.dashboard.articles.$url());
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
              router.push(pagesPath.$url());
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
