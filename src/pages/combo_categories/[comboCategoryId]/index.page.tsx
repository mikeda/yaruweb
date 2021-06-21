import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  ComboCategoryIdsDocument,
  ComboCategoryIdsQuery,
  PageComboCategoryDocument,
  PageComboCategoryQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { PageHeader } from '@/components/layouts/PageHeader';
import { ComboList } from './ComboList';

const Page: React.FC<PageComboCategoryQuery> = ({ comboCategory }) => {
  if (!comboCategory) return null;
  const title = comboCategory.name;

  return (
    <Content>
      <Head title={title} />
      <Breadcrumbs to="comboCategory" comboCategory={comboCategory} />
      <PageHeader title={title} />

      <ComboList combos={comboCategory.combos} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const comboCategoryId = params?.comboCategoryId as string;

  const data: PageComboCategoryQuery = await fetchGraphql(PageComboCategoryDocument, { comboCategoryId });

  return { props: data, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: ComboCategoryIdsQuery = await fetchGraphql(ComboCategoryIdsDocument);

  const paths = data.comboCategories.map(comboCategory => ({ params: { comboCategoryId: comboCategory.id } }));

  return { paths, fallback: 'blocking' };
};

export default Page;
