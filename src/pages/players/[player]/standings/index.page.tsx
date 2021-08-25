import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs } from '@/components';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import {
  PlayerStandingsPageDocument,
  PlayerStandingsPageQuery,
  usePlayerStandingsPageStandingsLazyQuery,
} from '@/lib/graphql/types';
import { Profile } from '../components/Profile';
import { PlayerStandingCard } from '../components/PlayerStandingCard';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

interface Props {
  data: PlayerStandingsPageQuery;
  params: {
    playerSlug: string;
  };
}

const Page: React.FC<Props> = ({
  data: {
    player,
    standings: { records: initStandings, paging: initPaging },
  },
  params: { playerSlug },
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

  useEffect(() => {
    setStandings(initStandings);
    setPaging(initPaging);
  }, [playerSlug]);

  const fetchMore = () => {
    if (!paging.hasNext) return;

    setLoading(true);
    fetchBattles({ variables: { playerSlug, page: paging.currentPage + 1 } });
  };

  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="playerStandings" player={player} />}>
      <Head title={`${player.name}の大会戦績`} />

      <Profile player={player} />

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

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const playerSlug = query.player as string;
  const data: PlayerStandingsPageQuery = await fetchGraphql(PlayerStandingsPageDocument, {
    playerSlug,
  });

  return { props: { data, params: { playerSlug } } };
};

export default Page;
