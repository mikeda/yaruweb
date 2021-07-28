import React from 'react';
import { DashboardOrganizerCardFragment, useDashboardOrganizerCardDeleteOrganizerMutation } from '@/lib/graphql/types';
import { Card, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

import { dashboardPath } from '@/lib';
import { NO_IMAGE_URL } from '@/lib/Assets';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import theme from '@/theme';

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
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

interface Props {
  organizer: DashboardOrganizerCardFragment;
  onDelete: () => void;
}

export const DashboardOrganizerCard: React.FC<Props> = ({ organizer, onDelete }) => {
  const classes = useStyles();
  const setLoading = useSetRecoilState(loadingState);
  const [deleteOrganizer, { loading: deleteLoading }] = useDashboardOrganizerCardDeleteOrganizerMutation({
    variables: { organizerSlug: organizer.slug },
    onCompleted: data => {
      const organizer = data.deleteOrganizer?.organizer;
      if (!organizer) return;
      toast.success('オーガナイザー情報を削除しました。');
      onDelete();
    },
  });

  setLoading(deleteLoading);

  return (
    <Card className={classes.root}>
      <CardMedia image={organizer.avatarUrl || NO_IMAGE_URL} className={classes.media} />

      <div className={classes.details}>
        <Typography variant="h6">{organizer.name}</Typography>

        <div className={classes.actions}>
          <IconButton color="default" href={dashboardPath({ to: 'organizerEdit', organizerSlug: organizer.slug })}>
            <Edit />
          </IconButton>
          <IconButton color="default" onClick={() => deleteOrganizer()}>
            <Delete />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};
