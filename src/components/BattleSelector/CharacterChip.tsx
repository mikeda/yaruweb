import React from 'react';
import { Avatar, Chip } from '@material-ui/core';
import { CharacterChipFragment } from '@/lib/graphql/types';

interface Props {
  character: CharacterChipFragment;
  onClick: () => void;
}

export const CharacterChip: React.FC<Props> = ({ character, onClick }) => {
  return (
    <Chip
      variant="outlined"
      avatar={<Avatar src={character.faceImageUrl} />}
      label={`${character.name} (${character.battlesCount})`}
      onClick={onClick}
    />
  );
};
