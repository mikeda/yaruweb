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

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs parents={[{ name: 'キャラクター', url: Routes.dashboard.character.index() }]} current={title} />
      <PageHeader title="キャラクター" addPageUrl={Routes.dashboard.character.new()} />

      <SectionUnit>
        <Section>
          <MoveCategorySection {...data} />
        </Section>

        <MoveCategorySection {...data} />
        <ComboCategorySection {...data} />
      </SectionUnit>
    </DashboardContent>
  );
};

const MoveCategorySection: React.FC<PageDashboardCharacterQuery> = ({ character: { moveCategories } }) => {
  return (
    <Section title="コマンドリスト">
      <CategoryCardList
        categories={moveCategories.map(moveCategory => ({
          ...moveCategory,
          href: Routes.dashboard.move.index(moveCategory.id),
        }))}
      />
    </Section>
  );
};

const ComboCategorySection: React.FC<PageDashboardCharacterQuery> = ({ character: { comboCategories } }) => {
  return (
    <Section title="コンボ">
      <CategoryCardList
        categories={comboCategories.map(comboCategory => ({
          ...comboCategory,
          href: Routes.dashboard.combo.index(comboCategory.id),
        }))}
      />
    </Section>
  );
};

export default Page;
