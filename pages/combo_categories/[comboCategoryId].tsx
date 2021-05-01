import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  ComboCategoryDetailDocument,
  ComboCategoryDetailFragment,
  ComboCategoryDetailQuery,
  ComboCategoryIdsDocument,
  ComboCategoryIdsQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Heading } from '@/components/Heading';
import { ComboList } from '@/pages-lib/characters/[slug]/combos/ComboList';

interface Props {
  comboCategory: ComboCategoryDetailFragment;
}

const Page: React.FC<Props> = ({ comboCategory }) => {
  const title = `${comboCategory.character.longName} / ${comboCategory.name}のコンボ`;

  return (
    <Content>
      <Head title={title} />

      <Heading lv="h1">{title}</Heading>

      <ComboList combos={comboCategory.combos} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const comboCategoryId = params?.comboCategoryId as string;

  const data: ComboCategoryDetailQuery = await fetchGraphql(ComboCategoryDetailDocument, { comboCategoryId });

  return { props: { comboCategory: data.comboCategory }, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: ComboCategoryIdsQuery = await fetchGraphql(ComboCategoryIdsDocument);

  const paths = data.comboCategories.map(comboCategory => ({ params: { comboCategoryId: comboCategory.id } }));

  return { paths, fallback: true };
};

export default Page;
