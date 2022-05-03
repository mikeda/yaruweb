import React from 'react';
import { Avatar, Chip } from '@mui/material';
import { DEFAULT_AVATAR_URL } from '@/lib/placeIconUrl';
import { PlayerChipFragment } from '@/lib/$types';

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
