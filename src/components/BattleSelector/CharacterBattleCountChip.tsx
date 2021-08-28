import React from 'react';
import { Avatar, Chip } from '@material-ui/core';
import { CharacterBattleCountChipFragment } from '@/lib/graphql/types';

interface Props {
  battleCount: CharacterBattleCountChipFragment;
  active: boolean;
  onClick: () => void;
}

export const CharacterBattleCountChip: React.FC<Props> = ({ battleCount: bc, active, onClick }) => {
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
