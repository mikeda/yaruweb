import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs, BattleListItem, Link as LinkComponent } from '@/components';
import { Box, Button, Grid, List, Paper, Typography } from '@material-ui/core';
import { PlayerPageDocument, PlayerPageQuery } from '@/lib/graphql/types';
import { path } from '@/lib';
import { Profile } from './components/Profile';
import { WinningCard } from './components/WinningCard';

const Page: React.FC<PlayerPageQuery> = ({ player, winnings, battles }) => {
  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="player" player={player} />}>
      <Head title={player.name} />

      <Profile player={player} />

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          大会戦績
        </Typography>

        <Grid container spacing={2}>
          {winnings.records.map(winning => (
            <Grid item key={winning.id} xs={12} sm={6}>
              <WinningCard winning={winning} />
            </Grid>
          ))}
        </Grid>

        {winnings.paging.hasNext && (
          <Box mt={2} display="flex" justifyContent="center">
            <Button href={path({ to: 'playerWinnings', playerSlug: player.slug })} component={LinkComponent}>
              もっと見る
            </Button>
          </Box>
        )}
      </Box>

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          対戦動画
        </Typography>

        <Paper>
          <List>
            {battles.records.map((battle, i) => (
              <BattleListItem key={battle.id} battle={battle} last={battles.records.length === i + 1} />
            ))}
          </List>
        </Paper>

        {battles.paging.hasNext && (
          <Box mt={2} display="flex" justifyContent="center">
            <Button href={path({ to: 'playerBattles', player: player.slug })} component={LinkComponent}>
              もっと見る
            </Button>
          </Box>
        )}
      </Box>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const playerSlug = params?.playerSlug as string;
  const data: PlayerPageQuery = await fetchGraphql(PlayerPageDocument, { playerSlug });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
