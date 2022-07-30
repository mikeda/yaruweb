import React from 'react';

import { ParsedUrlQuery } from 'querystring';

import { Box } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Breadcrumbs, Content, Head, TournamentTabs, BattleList } from '@/components';
import {
  SsgTournamentPathsDocument,
  SsgTournamentPathsQuery,
  TournamentBattlesPageDocument,
  TournamentBattlesPageQuery,
  TournamentBattlesPageQueryVariables,
} from '@/generated/graphql';
import { fetchGraphql } from '@/lib';

const Page: React.FC<TournamentBattlesPageQuery> = ({ tournament }) => {
  return (
    <Content activeTab="tournaments" breadcrumb={<Breadcrumbs to="tournamentBattles" tournament={tournament} />}>
      <Head title={`${tournament.name}の対戦動画`} />

      <Box mt={2}>
        <TournamentTabs tournament={tournament} activeTab="battles" />
      </Box>

      <BattleList tournamentId={tournament.id} />
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<TournamentBattlesPageQuery, Params> = async ({ params }) => {
  const tournamentId = params?.id as string;
  const variables: TournamentBattlesPageQueryVariables = { tournamentId };
  const data: TournamentBattlesPageQuery = await fetchGraphql(TournamentBattlesPageDocument, variables);

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: SsgTournamentPathsQuery = await fetchGraphql(SsgTournamentPathsDocument);

  const paths = data.tournaments.nodes.map(({ id }) => ({ params: { id } }));

  return { paths, fallback: 'blocking' };
};

export default Page;
