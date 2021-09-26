import React from 'react';

import {
  usePageDashboardMoveNewQuery,
  PageDashboardMoveNewQuery,
  AttackMoveAttributes,
  useCreateAttackMoveMutation,
} from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { MoveForm } from '@/components/MoveForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { DashboardBreadcrumbs } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const { moveCategoryId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardMoveNewQuery({
    variables: { moveCategoryId: moveCategoryId as string },
    fetchPolicy: 'network-only',
    skip: !moveCategoryId,
  });

  setLoading(loading);
  if (!data) return null;

  const { moveCategory } = data;

  return (
    <DashboardContent
      title="技データ登録"
      breadcrumb={<DashboardBreadcrumbs to="movesNew" moveCategory={moveCategory} />}
    >
      <PageContent {...data} />
    </DashboardContent>
  );
};
const PageContent: React.FC<PageDashboardMoveNewQuery> = ({ moveCategory }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createMove, { loading }] = useCreateAttackMoveMutation({
    onCompleted: () => {
      toast.success('技データを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: AttackMoveAttributes) => {
    createMove({ variables: { moveCategoryId: moveCategory.id, attributes } });
  };

  setLoading(loading);

  return <MoveForm onSubmit={onSubmit} />;
};

export default Page;
