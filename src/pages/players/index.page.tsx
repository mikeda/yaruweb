import React from 'react';
import { GetServerSideProps } from 'next';

import { PlayerCard } from '@/components/PlayerCard';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Box, Grid } from '@material-ui/core';
import { PlayersPageDocument, PlayersPageQuery } from '@/lib/graphql/types';
import { Paging, SearchWord } from '@/components';
import { path } from '@/lib';
import { useRouter } from 'next/router';

const Page: React.FC<PlayersPageQuery> = ({ players: { records, paging } }) => {
  const router = useRouter();

  const keyword = router.query.q as string | undefined;
  const url = (page: number) => path({ to: 'players', params: { page, q: keyword } });

  return (
    <Content activeTab="players" title="プレイヤー" breadcrumb={<Breadcrumbs to="players" />}>
      <Head title="プレイヤー一覧" description="鉄拳7のプレイヤー一覧です。" />

      <Box mb={2}>
        <SearchWord
          initWord={keyword}
          onSearch={word => {
            router.push(path({ to: 'players', params: { q: word } }));
          }}
        />
      </Box>

      <Grid container spacing={2}>
        {records.map(player => (
          <Grid item key={player.slug} xs={12} sm={6}>
            <PlayerCard player={player} />
          </Grid>
        ))}
      </Grid>

      <Paging paging={paging} url={url} />
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps<PlayersPageQuery> = async ({ query }) => {
  const page = query?.page ? Number(query.page) : 1;
  const keyword = query?.q as string | undefined;
  const data: PlayersPageQuery = await fetchGraphql(PlayersPageDocument, { page, keyword });

  return { props: data };
};

export default Page;
