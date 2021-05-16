import React from 'react';

import { PageDashboardCharacterQuery, usePageDashboardCharacterQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { CategoryCardList } from '@/components/CategoryCardList';
import { Section, SectionUnit } from '@/components/layouts/Section';
import { Col, Grid } from '@/components/layouts/Grid';

const Page: React.FC = () => {
  const router = useRouter();
  const { characterSlug } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardCharacterQuery({
    variables: { characterSlug: characterSlug as string },
    fetchPolicy: 'network-only',
    skip: !characterSlug,
  });

  setLoading(loading);
  if (!data) return null;

  const { character } = data;
  const title = character.longName;

  const Box: React.FC = ({ children }) => {
    return <div style={{ width: '100%', border: '1px solid red' }}>{children}</div>;
  };

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs parents={[{ name: 'キャラクター', url: Routes.dashboard.character.index() }]} current={title} />
      <PageHeader title="キャラクター" addPageUrl={Routes.dashboard.character.new()} />

      <Grid>
        <Col sm={12} md={6}>
          <Box>111</Box>
        </Col>
        <Col sm={12} md={6}>
          <Box>222</Box>
        </Col>
        <Col sm={6} md={4}>
          <Box>333</Box>
        </Col>
        <Col sm={6} md={4}>
          <Box>444</Box>
        </Col>
        <Col sm={6} md={4}>
          <Box>555</Box>
        </Col>
      </Grid>
      <SectionUnit>
        <Section>
          <MoveCategorySection {...data} />
        </Section>

        <Section title="コマンドリスト">
          <MoveCategorySection {...data} />
        </Section>

        <Section title="コンボ">
          <MoveCategorySection {...data} />
        </Section>
      </SectionUnit>
    </DashboardContent>
  );
};

const MoveCategorySection: React.FC<PageDashboardCharacterQuery> = ({ character: { moveCategories } }) => {
  return (
    <CategoryCardList
      categories={moveCategories.map(moveCategory => ({
        ...moveCategory,
        href: Routes.dashboard.move.index(moveCategory.id),
      }))}
    />
  );
};

export default Page;
