import React from 'react';

import { Avatar, Chip } from '@mui/material';

import { CharacterBattleCountChipFragment } from '@/generated/graphql';

interface Props {
  battleCount: CharacterBattleCountChipFragment;
  active?: boolean;
  onClick: () => void;
}

export const CharacterBattleCountChip: React.FC<Props> = ({ battleCount: bc, active = false, onClick }) => {
  return (
    <Chip
      variant="outlined"
      avatar={<Avatar src={bc.character.faceImageUrl} />}
      label={`${bc.character.name} (${bc.count})`}
      color={active ? 'primary' : undefined}
      onClick={onClick}
    />
  );
};
