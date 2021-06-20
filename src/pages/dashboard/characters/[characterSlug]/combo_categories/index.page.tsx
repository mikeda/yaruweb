import React from 'react';

import {
  ComboCategory,
  usePageDashboardComboCategoriesQuery,
  useUpdateComboCategoryPositionMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { DashboardBreadcrumbs } from '@/components';
import { toast } from 'react-toastify';
import { SortableObjectCardList } from '@/components/ObjectCardList';
import { dashboardPath } from '@/lib';

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
      <DashboardBreadcrumbs to="comboCategories" character={data.character} />
      <PageHeader
        title={title}
        addPageUrl={dashboardPath({ to: 'comboCategoriesNew', characterSlug: data.character.slug })}
      />

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
    <SortableObjectCardList
      items={comboCategories.map(comboCategory => ({
        id: comboCategory.id,
        title: comboCategory.name,
        links: [
          { text: '編集する', url: dashboardPath({ to: 'comboCategoryEdit', comboCategoryId: comboCategory.id }) },
          {
            text: `コンボ(${comboCategory.combosCount})`,
            url: dashboardPath({ to: 'combos', comboCategoryId: comboCategory.id }),
          },
        ],
      }))}
      onMove={(comboCategoryId, newPosition) =>
        updateComboCategoryPosition({ variables: { comboCategoryId, newPosition } })
      }
    />
  );
};

export default Page;
