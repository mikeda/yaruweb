import React from 'react';

import { Box, Button, Grid } from '@mui/material';
import { GetStaticProps } from 'next';
import { useSetRecoilState } from 'recoil';

import { Breadcrumbs, Content, Head, PlayerCard } from '@/components';
import { PlayersPageDocument, PlayersPageQuery, usePlayerCardsQuery } from '@/generated/graphql';
import { fetchGraphql, handleApolloError, loadingState } from '@/lib';

// TODO: キーワード検索
const Page: React.FC<PlayersPageQuery> = ssrData => {
  const { data, loading, fetchMore } = usePlayerCardsQuery({ onError: handleApolloError });
  const setLoading = useSetRecoilState(loadingState);
  setLoading(loading);

  const players = data ? data.players.edges.map(e => e.node) : ssrData.players.nodes;
  const pageInfo = data?.players.pageInfo;

  return (
    <Content activeTab="players" title="プレイヤー" breadcrumb={<Breadcrumbs to="players" />}>
      <Head title="プレイヤー一覧" description="鉄拳7のプレイヤー一覧です。" />

      <Grid container spacing={2}>
        {players.map(player => (
          <Grid item key={player.slug} xs={12} sm={6}>
            <PlayerCard player={player} />
          </Grid>
        ))}
      </Grid>

      {pageInfo?.hasNextPage && (
        <Box pt={2} pb={2} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => {
              fetchMore({ variables: { after: pageInfo.endCursor } });
            }}
          >
            もっとみる
          </Button>
        </Box>
      )}
    </Content>
  );
};

export const getStaticProps: GetStaticProps<PlayersPageQuery> = async () => {
  const data: PlayersPageQuery = await fetchGraphql(PlayersPageDocument, { page: 1 });

  return { props: data, revalidate: 300 };
};

export default Page;
