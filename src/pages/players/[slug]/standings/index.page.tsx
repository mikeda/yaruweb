import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs, PlayerPageTabs } from '@/components';
import { Box, Button, Grid, Typography } from '@mui/material';
import {
  PlayerSlugsDocument,
  PlayerSlugsQuery,
  PlayerStandingsPageDocument,
  PlayerStandingsPageQuery,
  usePlayerStandingsPageStandingsLazyQuery,
} from '@/lib/graphql/types';
import { Profile } from '../components/Profile';
import { PlayerStandingCard } from '../components/PlayerStandingCard';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { ParsedUrlQuery } from 'querystring';

const Page: React.FC<PlayerStandingsPageQuery> = ({
  player,
  standings: { records: initStandings, paging: initPaging },
}) => {
  const [standings, setStandings] = useState(initStandings);
  const [paging, setPaging] = useState(initPaging);
  const [fetchBattles] = usePlayerStandingsPageStandingsLazyQuery({
    onCompleted: data => {
      setStandings(prev => [...prev, ...data.standings.records]);
      setPaging(data.standings.paging);
      setLoading(false);
    },
    onError: e => {
      toast.error(e.message);
      setLoading(false);
    },
  });
  const setLoading = useSetRecoilState(loadingState);

  const fetchMore = () => {
    if (!paging.hasNext) return;

    setLoading(true);
    fetchBattles({ variables: { playerSlug: player.slug, page: paging.currentPage + 1 } });
  };

  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="playerStandings" player={player} />}>
      <Head title={`${player.name}の大会戦績`} />

      <Profile player={player} />

      <PlayerPageTabs activeTab="standings" player={player} />

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          大会戦績
        </Typography>

        <Grid container spacing={2}>
          {standings.map(standing => (
            <Grid item key={standing.id} xs={12} sm={6}>
              <PlayerStandingCard standing={standing} />
            </Grid>
          ))}
        </Grid>

        {paging.hasNext && (
          <Box pt={2} pb={2} display="flex" justifyContent="center">
            <Button variant="outlined" onClick={fetchMore}>
              もっとみる
            </Button>
          </Box>
        )}
      </Box>
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<PlayerStandingsPageQuery, Params> = async ({ params }) => {
  const playerSlug = params?.slug;
  const data: PlayerStandingsPageQuery = await fetchGraphql(PlayerStandingsPageDocument, { playerSlug });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: PlayerSlugsQuery = await fetchGraphql(PlayerSlugsDocument, { per: 50 });

  return {
    paths: data.players.records.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export default Page;
