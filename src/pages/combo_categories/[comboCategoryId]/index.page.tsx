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
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { ComboList } from './ComboList';

interface Props {
  comboCategory: ComboCategoryDetailFragment;
}

const Page: React.FC<Props> = ({ comboCategory }) => {
  if (!comboCategory) return null;
  const title = comboCategory.name;

  return (
    <Content>
      <Head title={title} />
      <Breadcrumbs
        parents={[
          { name: 'キャラクター', url: Routes.character.index() },
          { name: comboCategory.character.longName, url: Routes.character.detail(comboCategory.character.slug) },
        ]}
        current={title}
      />
      <PageHeader title={title} />

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

  return { paths, fallback: 'blocking' };
};

export default Page;
