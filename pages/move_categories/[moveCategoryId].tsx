import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  MoveCategoryDetailDocument,
  MoveCategoryDetailFragment,
  MoveCategoryDetailQuery,
  MoveCategoryIdsDocument,
  MoveCategoryIdsQuery,
} from '@/lib/graphql/types';
import { MoveList } from '@/components/MoveList';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Heading } from '@/components/Heading';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Routes } from '@/lib/Routes';

interface Props {
  moveCategory: MoveCategoryDetailFragment;
}

const Page: React.FC<Props> = ({ moveCategory }) => {
  const title = `${moveCategory.character.longName} / ${moveCategory.name}のコマンドリスト`;

  return (
    <Content>
      <Head title={title} />
      <Breadcrumbs
        parents={[
          { name: 'キャラクター', url: Routes.character.index() },
          { name: moveCategory.character.longName, url: Routes.character.detail(moveCategory.character.slug) },
        ]}
        current={moveCategory.name}
      />

      <Heading lv="h1">{title}</Heading>

      <MoveList moves={moveCategory.moves} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const moveCategoryId = params?.moveCategoryId as string;

  const data: MoveCategoryDetailQuery = await fetchGraphql(MoveCategoryDetailDocument, { moveCategoryId });

  return { props: { moveCategory: data.moveCategory }, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: MoveCategoryIdsQuery = await fetchGraphql(MoveCategoryIdsDocument);

  const paths = data.moveCategories.map(moveCategory => ({ params: { moveCategoryId: moveCategory.id } }));

  return { paths, fallback: 'blocking' };
};

export default Page;
