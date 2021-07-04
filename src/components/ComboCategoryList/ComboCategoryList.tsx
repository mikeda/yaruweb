import React from 'react';
import { ComboCategoryListItemFragment } from '@/lib/graphql/types';
import { List, ListItem, ListItemText } from '@material-ui/core';

import { path } from '@/lib';
import Link from 'next/link';

interface Props {
  comboCategories: ComboCategoryListItemFragment[];
}

export const ComboCategoryList: React.FC<Props> = ({ comboCategories }) => {
  return (
    <List component="div">
      {comboCategories.map(comboCategory => (
        <Link key={comboCategory.id} href={path({ to: 'comboCategory', comboCategoryId: comboCategory.id })} passHref>
          <ListItem button component="a">
            <ListItemText primary={comboCategory.name} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};
