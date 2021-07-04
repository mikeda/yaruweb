import React from 'react';
import { MoveCategoryListItemFragment } from '@/lib/graphql/types';
import { ListItem, ListItemText } from '@material-ui/core';

interface Props {
  moveCategory: MoveCategoryListItemFragment;
}

export const MoveCategoryListItem: React.FC<Props> = ({ moveCategory }) => {
  return (
    <ListItem>
      <ListItemText primary={moveCategory.name} />
    </ListItem>
  );
};
