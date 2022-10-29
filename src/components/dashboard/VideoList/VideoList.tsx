import React, { useState } from 'react';

import { MoreVert } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { VideoForm } from './VideoForm';

import { pagesPath } from '@/generated/$path';
import {
  useCreateTournamentVideoMutation,
  useDeleteTournamentVideoMutation,
  useVideoListQuery,
} from '@/generated/graphql';
import { deleteCache, handleApolloError, loadingState } from '@/lib';

const useStyles = makeStyles({
  list: {
    maxHeight: 300,
    overflowY: 'auto',
  },
});

interface Props {
  tournamentId: string;
}

export const VideoList: React.FC<Props> = ({ tournamentId }) => {
  const { data, loading, refetch } = useVideoListQuery({ variables: { tournamentId } });
  const setLoading = useSetRecoilState(loadingState);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [create, { loading: createLoading }] = useCreateTournamentVideoMutation({
    onError: handleApolloError,
    onCompleted: () => refetch(),
  });

  const [del, { loading: deleteLoading }] = useDeleteTournamentVideoMutation({
    onError: handleApolloError,
    //onCompleted: handleClose,
    update(cache, { data }) {
      const id = data?.deleteTournamentVideo?.tournamentVideo.id;
      if (id) {
        deleteCache({ cache, id, __typename: 'TournamentVideo' });
      }
    },
  });
  const classes = useStyles();

  setLoading(loading || createLoading || deleteLoading);

  if (!data) return null;

  return (
    <>
      <List className={classes.list}>
        {data.tournament.videos.map(video => (
          <ListItem key={video.id}>
            <ListItemText primary={video.title} secondary={`対戦動画 ${video.battlesCount}`} />

            <ListItemSecondaryAction>
              <MenuButton
                tournamentVideoId={video.id}
                onDestroy={() => {
                  if (window.confirm('削除します。')) {
                    del({ variables: { tournamentVideoId: video.id } });
                  }
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Box pb={2} display="flex" justifyContent="center" onClick={() => setDialogOpen(true)}>
        <Button color="primary">追加する</Button>
      </Box>

      <VideoForm
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={({ url }) => {
          create({ variables: { tournamentId, url } });
          setDialogOpen(false);
        }}
      />
    </>
  );
};

const MenuButton: React.FC<{ tournamentVideoId: string; onDestroy: () => void }> = ({
  tournamentVideoId,
  onDestroy,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton edge="end" aria-controls="video-menu" aria-haspopup="true" onClick={handleClick} size="large">
        <MoreVert />
      </IconButton>
      <Menu id="video-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            router.push(pagesPath.dashboard.tournament_videos._id(tournamentVideoId).edit.$url());
          }}
        >
          編集する
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(pagesPath.dashboard.tournament_videos._id(tournamentVideoId).battles.$url());
          }}
        >
          対戦を登録する
        </MenuItem>
        <MenuItem onClick={onDestroy}>削除する</MenuItem>
      </Menu>
    </>
  );
};
