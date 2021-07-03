import React from 'react';
import { MoveCategoryListItemFragment } from '@/lib/graphql/types';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

import { path } from '@/lib';
import Link from 'next/link';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  media: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
});

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
