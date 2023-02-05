import React from 'react';

import { Avatar, IconButton, Link, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { pagesPath } from '@/generated/$path';
import { signOutFirebase, useViewer, viewerState, resolveUrlObject } from '@/lib';

export const UserMenu: React.FC = () => {
  const { viewer } = useViewer();
  const router = useRouter();
  const setViewer = useSetRecoilState(viewerState);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (!viewer) {
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
      <IconButton aria-controls='user-menu' aria-haspopup='true' onClick={handleClick} size='large'>
        <Avatar alt={viewer.name} src={viewer.avatarUrl} />
      </IconButton>
      <Menu id='user-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
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
              setViewer(null);
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
