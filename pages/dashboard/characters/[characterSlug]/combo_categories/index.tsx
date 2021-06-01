import React from 'react';

import {
  ComboCategory,
  usePageDashboardComboCategoriesQuery,
  useUpdateComboCategoryPositionMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { toast } from 'react-toastify';
import { SortableCardList } from '@/components/SortableCardList';
import { SortableCardContent } from '@/components/SortableCardContent';

const Page: React.FC = () => {
  const router = useRouter();
  const { characterSlug } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardComboCategoriesQuery({
    variables: { characterSlug: characterSlug as string },
    fetchPolicy: 'network-only',
    skip: !characterSlug,
  });

  setLoading(loading);
  if (!data) return null;

  const title = `コンボ(${data.character.name})`;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs parents={[{ name: 'キャラクター', url: Routes.dashboard.character.index() }]} current={title} />
      <PageHeader title={title} addPageUrl={Routes.dashboard.comboCategory.new(data.character.slug)} />

      <PageContent comboCategories={data.character.comboCategories} />
    </DashboardContent>
  );
};

type ComboCategoryFragment = Pick<ComboCategory, 'id' | 'name' | 'combosCount'>;

const PageContent: React.FC<{ comboCategories: ComboCategoryFragment[] }> = ({ comboCategories }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [updateComboCategoryPosition, { loading }] = useUpdateComboCategoryPositionMutation({
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);

  return (
    <SortableCardList
      items={comboCategories.map(c => ({ id: c.id, content: <ComboCategoryContent comboCategory={c} /> }))}
      onMove={(comboCategoryId, newPosition) =>
        updateComboCategoryPosition({ variables: { comboCategoryId, newPosition } })
      }
    />
  );
};

const ComboCategoryContent: React.FC<{ comboCategory: ComboCategoryFragment }> = ({ comboCategory }) => {
  return (
    <SortableCardContent
      title={comboCategory.name}
      links={[
        { text: '編集する', url: Routes.dashboard.comboCategory.edit(comboCategory.id) },
        { text: `コンボ(${comboCategory.combosCount})`, url: Routes.dashboard.combo.index(comboCategory.id) },
      ]}
    />
  );
};

export default Page;
