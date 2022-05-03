import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import {
  PageDashboardMoveEditQuery,
  usePageDashboardMoveEditQuery,
  useUpdateAttackMoveMutation,
  useUpdateReversalMoveMutation,
  useUpdateThrowMoveMutation,
  loadingState,
} from '@/lib';

import { DashboardBreadcrumbs, DashboardContent, AttackMoveForm, ReversalMoveForm, ThrowMoveForm } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { id } = router.query;
  const { data, loading } = usePageDashboardMoveEditQuery({
    variables: { moveId: id as string },
    skip: !id,
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
          moves={move.moveCategory.moves}
          onSubmit={attributes => {
            updateThrowMove({ variables: { moveId: move.id, attributes } });
          }}
        />
      );
    case 'ReversalMove':
      return (
        <ReversalMoveForm
          move={move}
          moves={move.moveCategory.moves}
          onSubmit={attributes => {
            updateReversalMove({ variables: { moveId: move.id, attributes } });
          }}
        />
      );
  }
};

export default Page;
