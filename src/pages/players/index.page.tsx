import React from 'react';
import { GetServerSideProps } from 'next';

import { PlayerCard } from '@/components/PlayerCard';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Grid } from '@material-ui/core';
import { PlayersPageDocument, PlayersPageQuery } from '@/lib/graphql/types';
import { Paging } from '@/components';
import { path } from '@/lib';

const Page: React.FC<PlayersPageQuery> = ({ players: { records, paging } }) => {
  const url = (page: number) => path({ to: 'players', params: { page } });

  return (
    <Content activeTab="tournaments" title="プレイヤー" breadcrumb={<Breadcrumbs to="players" />}>
      <Head title="プレイヤー一覧" description="鉄拳7のプレイヤー一覧です。" />

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
  const data: PlayersPageQuery = await fetchGraphql(PlayersPageDocument, { page });

  return { props: data };
};

export default Page;
