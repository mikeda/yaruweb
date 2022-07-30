import React from 'react';

import { Box, List, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { BattleForm, BattleListItem } from './components';
import {
  useRouteParams,
  useTournamentVideoQuery,
  useBattlesQuery,
  useCreateMutation,
  useDeleteMutation,
} from './hooks';

import { AdminBreadcrumbs, AdminContent } from '@/components';

const useStyles = makeStyles({
  list: {
    maxHeight: 300,
    overflowY: 'auto',
  },
});

const Page: React.FC = () => {
  const { id } = useRouteParams();
  const { data } = useTournamentVideoQuery(id);
  const { battles, refetch } = useBattlesQuery(id);
  const { create } = useCreateMutation(refetch);
  const { destroy } = useDeleteMutation(refetch);
  const classes = useStyles();

  if (!data) return null;
  const { tournamentVideo, characters, players } = data;

  return (
    <AdminContent title="対戦" breadcrumb={<AdminBreadcrumbs to="battles" tournamentVideo={tournamentVideo} />}>
      <BattleForm
        youtubeVideoId={tournamentVideo.youtubeVideoId}
        players={players.nodes}
        characters={characters.nodes}
        onSubmit={attributes =>
          create({ variables: { attributes: { ...attributes, tournamentVideoId: tournamentVideo.id } } })
        }
      />

      <Box mt={2}>
        <Paper>
          {battles && (
            <List className={classes.list}>
              {battles.map(battle => {
                return (
                  <BattleListItem
                    key={battle.id}
                    battle={battle}
                    tournamentVideoId={tournamentVideo.id}
                    youtubeVideoId={tournamentVideo.youtubeVideoId}
                    players={players.nodes}
                    characters={characters.nodes}
                    onDestroy={() => {
                      destroy({ variables: { battleId: battle.id } });
                    }}
                  />
                );
              })}
            </List>
          )}
        </Paper>
      </Box>
    </AdminContent>
  );
};

export default Page;
