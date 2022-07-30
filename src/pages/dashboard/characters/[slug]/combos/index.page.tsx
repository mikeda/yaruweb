import React from 'react';

import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { DashboardContent, AdminBreadcrumbs, ComboDashboard } from '@/components';
import { useDashboardCharacterCombosPageQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading } = useDashboardCharacterCombosPageQuery({
    variables: { characterSlug: slug as string },
    skip: !slug,
  });

  const setLoading = useSetRecoilState(loadingState);

  setLoading(loading);

  if (!data) return null;
  const { character } = data;

  return (
    <DashboardContent title="コマンドリスト" breadcrumb={<AdminBreadcrumbs to="combos" character={character} />}>
      <ComboDashboard character={character} />
    </DashboardContent>
  );
};

export default Page;
