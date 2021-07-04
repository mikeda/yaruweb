import React from 'react';
import { ComboCategoryListItemFragment } from '@/lib/graphql/types';
import { ListItem, ListItemText } from '@material-ui/core';

interface Props {
  comboCategory: ComboCategoryListItemFragment;
}

export const ComboCategoryListItem: React.FC<Props> = ({ comboCategory }) => {
  return (
    <ListItem>
      <ListItemText primary={comboCategory.name} />
    </ListItem>
  );
};
