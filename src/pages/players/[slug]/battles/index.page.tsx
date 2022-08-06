import React from 'react';

import { ParsedUrlQuery } from 'querystring';

import { GetStaticPaths, GetStaticProps } from 'next';

import { Head, Content, Breadcrumbs, PlayerProfile, PlayerTabs, PlayerBattleList } from '@/components';
import {
  PlayerBattlesPageDocument,
  PlayerBattlesPageQuery,
  PlayerBattlesPageQueryVariables,
  SsgPlayerPathsDocument,
  SsgPlayerPathsQuery,
} from '@/generated/graphql';
import { fetchGraphql } from '@/lib';

const Page: React.FC<PlayerBattlesPageQuery> = ({ player }) => {
  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="playerBattles" player={player} />}>
      <Head title={`${player.name}の対戦動画`} />

      <PlayerProfile player={player} />

      <PlayerTabs activeTab="battles" player={player} />

      <PlayerBattleList playerSlug={player.slug} />
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<PlayerBattlesPageQuery, Params> = async ({ params }) => {
  const playerSlug = params?.slug as string;
  const variables: PlayerBattlesPageQueryVariables = { playerSlug };
  const data: PlayerBattlesPageQuery = await fetchGraphql(PlayerBattlesPageDocument, variables);

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: SsgPlayerPathsQuery = await fetchGraphql(SsgPlayerPathsDocument);

  return {
    paths: data.players.nodes.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export default Page;
