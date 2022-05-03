import React, { useRef, useState } from 'react';
import { GetStaticProps } from 'next';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { Box, Button, Grid } from '@mui/material';

import {
  PlayersPagePlayersDocument,
  PlayersPagePlayersQuery,
  usePlayersPagePlayersLazyQuery,
  fetchGraphql,
  loadingState,
} from '@/lib';

import { Breadcrumbs, Content, Head, PlayerCard, SearchWord } from '@/components';

const Page: React.FC<PlayersPagePlayersQuery> = ({ players: { records: initPlayers, paging: initPaging } }) => {
  const [state, setState] = useState({ players: initPlayers, paging: initPaging });
  const keywordRef = useRef<string>();
  const [fetch] = usePlayersPagePlayersLazyQuery({
    onCompleted: data => {
      setState(prev => ({
        players: [...prev.players, ...data.players.records],
        paging: data.players.paging,
      }));
      setLoading(false);
    },
    onError: e => {
      toast.error(e.message);
      setLoading(false);
    },
    fetchPolicy: 'network-only',
  });
  const setLoading = useSetRecoilState(loadingState);

  const { players, paging } = state;

  const fetchMore = () => {
    if (!paging.hasNext) return;

    setLoading(true);
    fetch({ variables: { page: paging.currentPage + 1, keyword: keywordRef.current } });
  };

  return (
    <Content activeTab="players" title="プレイヤー" breadcrumb={<Breadcrumbs to="players" />}>
      <Head title="プレイヤー一覧" description="鉄拳7のプレイヤー一覧です。" />

      <Box mb={2}>
        <SearchWord
          onSearch={word => {
            if (keywordRef.current === word) return;

            keywordRef.current = word;
            setState(prev => ({ ...prev, players: [] }));
            setLoading(true);
            fetch({ variables: { page: 1, keyword: keywordRef.current } });
          }}
        />
      </Box>

      <Grid container spacing={2}>
        {players.map(player => (
          <Grid item key={player.slug} xs={12} sm={6}>
            <PlayerCard player={player} />
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
    </Content>
  );
};

export const getStaticProps: GetStaticProps<PlayersPagePlayersQuery> = async () => {
  const data: PlayersPagePlayersQuery = await fetchGraphql(PlayersPagePlayersDocument, { page: 1 });

  return { props: data, revalidate: 300 };
};

export default Page;
