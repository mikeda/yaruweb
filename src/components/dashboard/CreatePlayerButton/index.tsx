import React, { useState } from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

import { PlayerFormSmashgg } from './PlayerFormSmashgg';

import { pagesPath } from '@/generated/$path';

export const CreatePlayerButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        作成する
      </Button>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            router.push(pagesPath.dashboard.players.new.$url());
          }}
        >
          フォームで登録
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          SmashGG IDで登録
        </MenuItem>
      </Menu>

      <PlayerFormSmashgg open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};
