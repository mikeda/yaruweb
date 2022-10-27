import React from 'react';

import { Delete } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSetRecoilState } from 'recoil';

import { StandingForm } from './StandingForm';
import { StandingPlaceAvatar } from './StandingPlaceAvatar';

import { useCreateStandingMutation, useDeleteStandingMutation, useStandingListQuery } from '@/generated/graphql';
import { DEFAULT_AVATAR_URL, deleteCache, handleApolloError, loadingState } from '@/lib';

const useStyles = makeStyles({
  list: {
    maxHeight: 300,
    overflowY: 'auto',
  },
});

interface Props {
  tournamentId: string;
}

export const StandingList: React.FC<Props> = ({ tournamentId }) => {
  const { data, loading, refetch } = useStandingListQuery({ variables: { tournamentId } });
  const setLoading = useSetRecoilState(loadingState);
  const classes = useStyles();

  const [create, { loading: createLoading }] = useCreateStandingMutation({
    onError: handleApolloError,
    onCompleted: () => refetch(),
  });

  const [del, { loading: deleteLoading }] = useDeleteStandingMutation({
    onError: handleApolloError,
    //onCompleted: handleClose,
    update(cache, { data }) {
      const id = data?.deleteStanding?.standing.id;
      if (id) {
        deleteCache({ cache, id, __typename: 'Standing' });
      }
    },
  });

  setLoading(loading || createLoading || deleteLoading);

  if (!data) return null;

  return (
    <>
      <List className={classes.list}>
        {data.tournament.standings.map(standing => (
          <ListItem key={standing.id}>
            <ListItemAvatar>
              <StandingPlaceAvatar place={standing.place} />
            </ListItemAvatar>

            <ListItemAvatar>
              <Avatar src={standing.player.avatarUrl || DEFAULT_AVATAR_URL} />
            </ListItemAvatar>

            <ListItemText primary={standing.player.name} />

            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => {
                  if (window.confirm('削除します。')) {
                    del({ variables: { standingId: standing.id } });
                  }
                }}
                size="large"
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <StandingForm
        onSubmit={attributes => {
          create({ variables: { tournamentId, attributes } });
        }}
      />
    </>
  );
};
