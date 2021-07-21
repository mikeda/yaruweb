import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  MoveCategoryIdsDocument,
  MoveCategoryIdsQuery,
  PageMoveCategoryDocument,
  PageMoveCategoryQuery,
} from '@/lib/graphql/types';
import { MoveSearchList } from '@/components/MoveList';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC<PageMoveCategoryQuery> = ({ moveCategory }) => {
  const title = `${moveCategory.name}のコマンドリスト`;

  return (
    <Content
      activeTab="characters"
      title={title}
      breadcrumb={<Breadcrumbs to="moveCategory" moveCategory={moveCategory} />}
    >
      <Head title={title} />

      <MoveSearchList moves={moveCategory.moves} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const moveCategoryId = params?.moveCategoryId as string;

  const data: PageMoveCategoryQuery = await fetchGraphql(PageMoveCategoryDocument, { moveCategoryId });

  return { props: { moveCategory: data.moveCategory }, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: MoveCategoryIdsQuery = await fetchGraphql(MoveCategoryIdsDocument);

  const paths = data.moveCategories.map(moveCategory => ({ params: { moveCategoryId: moveCategory.id } }));

  return { paths, fallback: 'blocking' };
};

export default Page;
