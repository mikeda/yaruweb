import React from 'react';

import {
  MoveCategory,
  usePageDashboardMoveCategoriesQuery,
  useUpdateMoveCategoryPositionMutation,
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

  const { data, loading } = usePageDashboardMoveCategoriesQuery({
    variables: { characterSlug: characterSlug as string },
    fetchPolicy: 'network-only',
    skip: !characterSlug,
  });

  setLoading(loading);
  if (!data) return null;

  const title = `技データ(${data.character.name})`;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <DashboardBreadcrumbs to="moveCategories" character={data.character} />
      <PageHeader
        title={title}
        addPageUrl={dashboardPath({ to: 'moveCategoriesNew', characterSlug: data.character.slug })}
      />

      <PageContent moveCategories={data.character.moveCategories} />
    </DashboardContent>
  );
};

type MoveCategoryFragment = Pick<MoveCategory, 'id' | 'name' | 'movesCount'>;

const PageContent: React.FC<{ moveCategories: MoveCategoryFragment[] }> = ({ moveCategories }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [updateMoveCategoryPosition, { loading }] = useUpdateMoveCategoryPositionMutation({
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);

  return (
    <SortableObjectCardList
      items={moveCategories.map(moveCategory => ({
        id: moveCategory.id,
        title: moveCategory.name,
        links: [
          { text: '編集する', url: dashboardPath({ to: 'moveCategoryEdit', moveCategoryId: moveCategory.id }) },
          {
            text: `技データ(${moveCategory.movesCount})`,
            url: dashboardPath({ to: 'moves', moveCategoryId: moveCategory.id }),
          },
        ],
      }))}
      onMove={(moveCategoryId, newPosition) =>
        updateMoveCategoryPosition({ variables: { moveCategoryId, newPosition } })
      }
    />
  );
};

export default Page;
