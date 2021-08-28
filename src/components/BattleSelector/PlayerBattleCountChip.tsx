import React from 'react';
import { Avatar, Chip } from '@material-ui/core';
import { DEFAULT_AVATAR_URL } from '@/lib/Assets';
import { PlayerBattleCountChipFragment } from '@/lib/graphql/types';

interface Props {
  battleCount: PlayerBattleCountChipFragment;
  active: boolean;
  onClick: () => void;
}

export const PlayerBattleCountChip: React.FC<Props> = ({ battleCount: bc, active, onClick }) => {
  return (
    <Chip
      variant="outlined"
      avatar={<Avatar src={bc.player.avatarUrl || DEFAULT_AVATAR_URL} />}
      label={`${bc.player.name} (${bc.count})`}
      color={active ? 'primary' : undefined}
      onClick={onClick}
    />
  );
};
