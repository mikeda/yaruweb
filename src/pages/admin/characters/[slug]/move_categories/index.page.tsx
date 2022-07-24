import React from 'react';

import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { AdminContent, AdminBreadcrumbs, DashboardMoveCategories } from '@/components';
import { useDashboardCharacterMovesPageQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading } = useDashboardCharacterMovesPageQuery({
    variables: { characterSlug: slug as string },
    skip: !slug,
  });

  const setLoading = useSetRecoilState(loadingState);

  setLoading(loading);

  if (!data) return null;
  const { character } = data;

  return (
    <AdminContent title="コマンドリスト" breadcrumb={<AdminBreadcrumbs to="moveCategories" character={character} />}>
      <DashboardMoveCategories characterSlug={character.slug} moveCategories={character.moveCategories} />
    </AdminContent>
  );
};

export default Page;
