import React from 'react';

import { Avatar, Chip } from '@mui/material';

interface Props {
  label: string;
  count?: number;
  avatarUrl?: string;
  active?: boolean;
  onClick: () => void;
}

export const SelectChip: React.FC<Props> = ({ label, count, avatarUrl, active = false, onClick }) => {
  return (
    <Chip
      label={count ? `${label} (${count})` : label}
      avatar={avatarUrl ? <Avatar src={avatarUrl} /> : undefined}
      color={active ? 'primary' : undefined}
      variant="outlined"
      onClick={onClick}
    />
  );
};
