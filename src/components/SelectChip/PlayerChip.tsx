import React from 'react';

import { Avatar, Chip } from '@mui/material';

import { PlayerChipFragment } from '@/generated/graphql';
import { DEFAULT_AVATAR_URL } from '@/lib';

interface Props {
  player: PlayerChipFragment;
  onClick: () => void;
}

export const PlayerChip: React.FC<Props> = ({ player, onClick }) => {
  return (
    <Chip
      variant="outlined"
      avatar={<Avatar src={player.avatarUrl || DEFAULT_AVATAR_URL} />}
      label={`${player.name} (${player.battlesCount})`}
      onClick={onClick}
    />
  );
};
