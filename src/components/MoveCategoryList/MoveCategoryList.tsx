import React from 'react';
import { MoveCategoryListItemFragment } from '@/lib/graphql/types';
import { List, ListItem, ListItemText } from '@material-ui/core';

import { path } from '@/lib';
import Link from 'next/link';

interface Props {
  moveCategories: MoveCategoryListItemFragment[];
}

export const MoveCategoryList: React.FC<Props> = ({ moveCategories }) => {
  return (
    <List component="div">
      {moveCategories.map(moveCategory => (
        <Link key={moveCategory.id} href={path({ to: 'moveCategory', moveCategoryId: moveCategory.id })} passHref>
          <ListItem button component="a">
            <ListItemText primary={moveCategory.name} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};
