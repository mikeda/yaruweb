import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs } from '@/components';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import {
  PlayerWinningsPageDocument,
  PlayerWinningsPageQuery,
  usePlayerWinningsPageWinningsLazyQuery,
} from '@/lib/graphql/types';
import { Profile } from '../components/Profile';
import { PlayerWinningCard } from '../components/PlayerWinningCard';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

interface Props {
  data: PlayerWinningsPageQuery;
  params: {
    playerSlug: string;
  };
}

const Page: React.FC<Props> = ({
  data: {
    player,
    winnings: { records: initWinnings, paging: initPaging },
  },
  params: { playerSlug },
}) => {
  const [winnings, setWinnings] = useState(initWinnings);
  const [paging, setPaging] = useState(initPaging);
  const [fetchBattles] = usePlayerWinningsPageWinningsLazyQuery({
    onCompleted: data => {
      setWinnings(prev => [...prev, ...data.winnings.records]);
      setPaging(data.winnings.paging);
      setLoading(false);
    },
    onError: e => {
      toast.error(e.message);
      setLoading(false);
    },
  });
  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    setWinnings(initWinnings);
    setPaging(initPaging);
  }, [playerSlug]);

  const fetchMore = () => {
    if (!paging.hasNext) return;

    setLoading(true);
    fetchBattles({ variables: { playerSlug, page: paging.currentPage + 1 } });
  };

  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="playerWinnings" player={player} />}>
      <Head title={`${player.name}の大会戦績`} />

      <Profile player={player} />

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          大会戦績
        </Typography>

        <Grid container spacing={2}>
          {winnings.map(winning => (
            <Grid item key={winning.id} xs={12} sm={6}>
              <PlayerWinningCard winning={winning} />
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
  const data: PlayerWinningsPageQuery = await fetchGraphql(PlayerWinningsPageDocument, {
    playerSlug,
  });

  return { props: { data, params: { playerSlug } } };
};

export default Page;
