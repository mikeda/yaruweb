import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  ComboCategoryIdsDocument,
  ComboCategoryIdsQuery,
  PageComboCategoryDocument,
  PageComboCategoryQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { ComboList } from './ComboList';
import { Head } from '@/components';

const Page: React.FC<PageComboCategoryQuery> = ({ comboCategory }) => {
  const title = `${comboCategory.name}のコンボ`;

  return (
    <Content title={title} breadcrumb={<Breadcrumbs to="comboCategory" comboCategory={comboCategory} />}>
      <Head title={title} />
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
