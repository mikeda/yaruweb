import React from 'react';
import { MoveCategoryCardFragment, MoveCategoryListItemFragment } from '@/lib/graphql/types';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Delete as DeleteIcon, DragHandle } from '@material-ui/icons';
import { CSS } from '@dnd-kit/utilities';

import { path, dashboardPath } from '@/lib';
import { Link } from '../Link';
import { useSortable } from '@dnd-kit/sortable';

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
  moveCategory: MoveCategoryListItemFragment;
}

export const MoveCategoryListItem: React.FC<Props> = ({ moveCategory }) => {
  return (
    <ListItem>
      <ListItemText primary={moveCategory.name} />
    </ListItem>
  );
};
