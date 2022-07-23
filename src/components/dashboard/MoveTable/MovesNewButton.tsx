import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';

import { pagesPath } from '@/generated/$path';

export const MovesNewButton = ({ moveCategoryId }: { moveCategoryId: string }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="コマンドを作成">
        <IconButton onClick={handleClick} size="large">
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            router.push(
              pagesPath.admin.move_categories._id(moveCategoryId).moves.new.$url({ query: { move_type: 'attack' } }),
            );
          }}
        >
          打撃
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            router.push(
              pagesPath.admin.move_categories._id(moveCategoryId).moves.new.$url({ query: { move_type: 'throw' } }),
            );
          }}
        >
          投げ
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            router.push(
              pagesPath.admin.move_categories._id(moveCategoryId).moves.new.$url({ query: { move_type: 'reversal' } }),
            );
          }}
        >
          返し技
        </MenuItem>
      </Menu>
    </>
  );
};
