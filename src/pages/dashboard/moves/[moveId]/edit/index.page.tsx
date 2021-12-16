import React from 'react';

import {
  PageDashboardMoveEditQuery,
  usePageDashboardMoveEditQuery,
  useUpdateAttackMoveMutation,
  useUpdateReversalMoveMutation,
  useUpdateThrowMoveMutation,
} from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { AttackMoveForm, ReversalMoveForm, ThrowMoveForm } from '@/components/MoveForm';
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

  const [updateAttackMove, { loading: attackLoading }] = useUpdateAttackMoveMutation({
    onCompleted: () => {
      toast.success('技データを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const [updateThrowMove, { loading: throwLoading }] = useUpdateThrowMoveMutation({
    onCompleted: () => {
      toast.success('技データを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const [updateReversalMove, { loading: reversalLoading }] = useUpdateReversalMoveMutation({
    onCompleted: () => {
      toast.success('技データを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(attackLoading || throwLoading || reversalLoading);

  switch (move.moveable.__typename) {
    case 'AttackMove':
      return (
        <AttackMoveForm
          move={move}
          moves={move.moveCategory.moves}
          onSubmit={attributes => {
            updateAttackMove({ variables: { moveId: move.id, attributes } });
          }}
        />
      );
    case 'ThrowMove':
      return (
        <ThrowMoveForm
          move={move}
          onSubmit={attributes => {
            updateThrowMove({ variables: { moveId: move.id, attributes } });
          }}
        />
      );
    case 'ReversalMove':
      return (
        <ReversalMoveForm
          move={move}
          onSubmit={attributes => {
            updateReversalMove({ variables: { moveId: move.id, attributes } });
          }}
        />
      );
  }
};

export default Page;
