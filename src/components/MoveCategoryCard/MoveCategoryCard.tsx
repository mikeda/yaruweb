import React from 'react';
import { MoveCategoryCardFragment } from '@/lib/graphql/types';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
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
  moveCategory: MoveCategoryCardFragment;
  onDelete?: () => void;
}

export const MoveCategoryCard: React.FC<Props> = ({ moveCategory }) => {
  const classes = useStyles();

  const href = path({ to: 'moveCategory', moveCategoryId: moveCategory.id });

  return (
    <Card>
      <CardActionArea className={classes.root} href={href} component={Link} color="inherit">
        <CardContent className={classes.details}>
          <Typography variant="h6">{moveCategory.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

interface DashboardMoveCategoryCardProps {
  moveCategory: MoveCategoryCardFragment;
  onDelete: () => void;
}

export const DashboardMoveCategoryCard: React.FC<DashboardMoveCategoryCardProps> = ({ moveCategory, onDelete }) => {
  const classes = useStyles();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: moveCategory.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  const href = dashboardPath({ to: 'moveCategoryEdit', moveCategoryId: moveCategory.id });

  return (
    <div style={style}>
      <Card>
        <CardActionArea className={classes.root} href={href} component={Link} color="inherit">
          <CardContent className={classes.details}>
            <Typography variant="h6">{moveCategory.name}</Typography>
          </CardContent>
        </CardActionArea>

        <CardActions disableSpacing>
          <Button
            color="primary"
            href={dashboardPath({ to: 'moves', moveCategoryId: moveCategory.id })}
            component={Link}
          >
            コマンドリスト({moveCategory.movesCount})
          </Button>

          <IconButton color="default" onClick={onDelete} className={classes.deleteButton}>
            <DeleteIcon />
          </IconButton>
          <div ref={setNodeRef} {...attributes} {...listeners}>
            <IconButton color="default" style={{ cursor: 'grab' }}>
              <DragHandle />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};
