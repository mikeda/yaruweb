import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs, PlayerPageTabs } from '@/components';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { PlayerPageDocument, PlayerPageQuery, PlayerSlugsDocument, PlayerSlugsQuery } from '@/lib/graphql/types';
import { path } from '@/lib';
import { Profile } from './components/Profile';
import theme from '@/theme';
import { BattleSelector, CharacterBattleCountChip } from '@/components/BattleSelector';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

const useStyles = makeStyles({
  description: {
    marginTop: theme.spacing(1),
    whiteSpace: 'pre-line',
  },
});

const Page: React.FC<PlayerPageQuery> = ({ player, battleCounts }) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="player" player={player} />}>
      <Head title={player.name} />

      <Profile player={player} />

      <PlayerPageTabs activeTab="profile" player={player} />

      <Paper>
        <Box p={2}>
          <Typography variant="h2" gutterBottom>
            プロフィール
          </Typography>

          <Typography className={classes.description}>
            {player.description || 'プロフィールが登録されていません。'}
          </Typography>

          <Box mt={4}>
            <Typography variant="h2" gutterBottom>
              使用キャラクター
            </Typography>

            <BattleSelector>
              {battleCounts.records.map(bc => (
                <CharacterBattleCountChip
                  key={bc.id}
                  battleCount={bc}
                  onClick={() => {
                    router.push(path({ to: 'playerBattles', player: player.slug, characterSlug: bc.character.slug }));
                  }}
                />
              ))}
            </BattleSelector>
          </Box>
        </Box>
      </Paper>
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  player: string;
}

export const getStaticProps: GetStaticProps<PlayerPageQuery, Params> = async ({ params }) => {
  const playerSlug = params?.player;
  const data: PlayerPageQuery = await fetchGraphql(PlayerPageDocument, { playerSlug });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: PlayerSlugsQuery = await fetchGraphql(PlayerSlugsDocument, { per: 50 });

  return {
    paths: data.players.records.map(({ slug }) => ({ params: { player: slug } })),
    fallback: 'blocking',
  };
};

export default Page;
