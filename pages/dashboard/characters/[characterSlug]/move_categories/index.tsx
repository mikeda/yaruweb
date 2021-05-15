import React from 'react';

import { MoveCategoryFragment, usePageDashboardMoveCategoriesQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import Link from 'next/link';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

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
      <Breadcrumbs parents={[{ name: 'キャラクター', url: Routes.dashboard.character.index() }]} current={title} />
      <PageHeader title={title} addPageUrl={Routes.dashboard.moveCategory.new(data.character.slug)} />

      <PageContent moveCategories={data.character.moveCategories} />
    </DashboardContent>
  );
};

const PageContent: React.FC<{ moveCategories: MoveCategoryFragment[] }> = ({ moveCategories }) => {
  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {moveCategories.map(moveCategory => {
            return (
              <tr key={moveCategory.id}>
                <td>{moveCategory.name}</td>
                <td>
                  <Link href={Routes.dashboard.move.index(moveCategory.id)}>
                    <a>技データを登録</a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
