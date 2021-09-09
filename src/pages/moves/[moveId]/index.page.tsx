import React from 'react';

import { MoveFragment, PageMoveDocument, PageMoveQuery } from '@/lib/graphql/types';
import { MoveMedia } from '@/components/MoveMedia';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Box } from '@material-ui/core';

const PageContent: React.FC<{ move: MoveFragment }> = ({ move }) => {
  return (
    <Box mb={4}>
      <MoveMedia move={move} />
    </Box>
  );
};

const Page: React.FC<PageMoveQuery> = ({ move }) => {
  const title = move.name;

  return (
    <Content activeTab="characters" title={title} breadcrumb={<Breadcrumbs to="move" move={move} />}>
      <Head title={title} />

      <PageContent move={move} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const moveId = params?.moveId as string;
  const data: PageMoveQuery = await fetchGraphql(PageMoveDocument, { moveId });

  return {
    props: data,
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
