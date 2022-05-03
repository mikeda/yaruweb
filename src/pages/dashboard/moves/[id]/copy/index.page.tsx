import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import {
  usePageDashboardMoveCopyQuery,
  PageDashboardMoveCopyQuery,
  AttackMoveAttributes,
  useCreateAttackMoveMutation,
  ThrowMoveAttributes,
  useCreateThrowMoveMutation,
  useCreateReversalMoveMutation,
  ReversalMoveAttributes,
} from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';

import { DashboardBreadcrumbs, DashboardContent, AttackMoveForm, ReversalMoveForm, ThrowMoveForm } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardMoveCopyQuery({
    variables: { moveId: id as string },
    fetchPolicy: 'network-only',
    skip: !id,
  });

  setLoading(loading);
  if (!data) return null;

  const { move } = data;

  return (
    <DashboardContent
      title="技データ登録"
      breadcrumb={<DashboardBreadcrumbs to="movesNew" moveCategory={move.moveCategory} />}
    >
      {move.moveable.__typename === 'AttackMove' && <AttackContent {...data} />}
      {move.moveable.__typename === 'ThrowMove' && <ThrowContent {...data} />}
      {move.moveable.__typename === 'ReversalMove' && <ReversalContent {...data} />}
    </DashboardContent>
  );
};

const AttackContent: React.FC<PageDashboardMoveCopyQuery> = ({ move }) => {
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
    createMove({ variables: { moveCategoryId: move.moveCategory.id, attributes } });
  };

  setLoading(loading);

  return <AttackMoveForm move={move} moves={move.moveCategory.moves} onSubmit={onSubmit} copy />;
};

const ThrowContent: React.FC<PageDashboardMoveCopyQuery> = ({ move }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createMove, { loading }] = useCreateThrowMoveMutation({
    onCompleted: () => {
      toast.success('技データを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ThrowMoveAttributes) => {
    createMove({ variables: { moveCategoryId: move.moveCategory.id, attributes } });
  };

  setLoading(loading);

  return <ThrowMoveForm move={move} moves={move.moveCategory.moves} onSubmit={onSubmit} copy />;
};

const ReversalContent: React.FC<PageDashboardMoveCopyQuery> = ({ move }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createMove, { loading }] = useCreateReversalMoveMutation({
    onCompleted: () => {
      toast.success('技データを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ReversalMoveAttributes) => {
    createMove({ variables: { moveCategoryId: move.moveCategory.id, attributes } });
  };

  setLoading(loading);

  return <ReversalMoveForm move={move} moves={move.moveCategory.moves} onSubmit={onSubmit} copy />;
};

export default Page;
