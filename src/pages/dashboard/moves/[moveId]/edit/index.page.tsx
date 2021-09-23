import React from 'react';

import {
  MoveAttributes,
  PageDashboardMoveEditQuery,
  usePageDashboardMoveEditQuery,
  useUpdateMoveMutation,
} from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { MoveForm } from '@/components/MoveForm';
import { DashboardBreadcrumbs } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { moveId } = router.query;
  const { data, loading } = usePageDashboardMoveEditQuery({
    variables: { moveId: moveId as string },
    skip: !moveId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { move } = data;

  return (
    <DashboardContent title="技データ編集" breadcrumb={<DashboardBreadcrumbs to="moveEdit" move={move} />}>
      <MoveContent {...data} />
    </DashboardContent>
  );
};

const MoveContent: React.FC<PageDashboardMoveEditQuery> = ({ move }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateMove, { loading }] = useUpdateMoveMutation({
    onCompleted: () => {
      toast.success('技データを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: MoveAttributes) => {
    updateMove({ variables: { moveId: move.id, attributes } });
  };

  setLoading(loading);
  return <MoveForm move={move} onSubmit={onSubmit} />;
};

export default Page;
