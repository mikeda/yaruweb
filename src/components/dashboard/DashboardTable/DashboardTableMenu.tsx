import React, { useState } from 'react';

import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';

interface Item {
  label: string;
  onClick: () => void;
}

interface Props {
  items: Item[];
}

export const DashboardTableMenu: React.FC<Props> = ({ items }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton edge='end' onClick={handleClick} size='large'>
        <MoreVert />
      </IconButton>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {items.map(({ label, onClick }) => (
          <MenuItem
            key={label}
            onClick={() => {
              onClick();
              handleClose();
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
