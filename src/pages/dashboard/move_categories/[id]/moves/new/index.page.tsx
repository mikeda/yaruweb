import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { DashboardBreadcrumbs, DashboardContent, AttackMoveForm, ThrowMoveForm, ReversalMoveForm } from '@/components';
import {
  usePageDashboardMoveNewQuery,
  PageDashboardMoveNewQuery,
  AttackMoveAttributes,
  useCreateAttackMoveMutation,
  ThrowMoveAttributes,
  useCreateThrowMoveMutation,
  useCreateReversalMoveMutation,
  ReversalMoveAttributes,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const { id, move_type: moveType } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardMoveNewQuery({
    variables: { moveCategoryId: id as string },
    fetchPolicy: 'network-only',
    skip: !id,
  });

  setLoading(loading);
  if (!data) return null;

  const { moveCategory } = data;

  return (
    <DashboardContent
      title="技データ登録"
      breadcrumb={<DashboardBreadcrumbs to="movesNew" moveCategory={moveCategory} />}
    >
      {moveType === 'attack' && <AttackContent {...data} />}
      {moveType === 'throw' && <ThrowContent {...data} />}
      {moveType === 'reversal' && <ReversalContent {...data} />}
    </DashboardContent>
  );
};

const AttackContent: React.FC<PageDashboardMoveNewQuery> = ({ moveCategory }) => {
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

  return <AttackMoveForm moves={moveCategory.moves} onSubmit={onSubmit} />;
};

const ThrowContent: React.FC<PageDashboardMoveNewQuery> = ({ moveCategory }) => {
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
    createMove({ variables: { moveCategoryId: moveCategory.id, attributes } });
  };

  setLoading(loading);

  return <ThrowMoveForm moves={moveCategory.moves} onSubmit={onSubmit} />;
};

const ReversalContent: React.FC<PageDashboardMoveNewQuery> = ({ moveCategory }) => {
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
    createMove({ variables: { moveCategoryId: moveCategory.id, attributes } });
  };

  setLoading(loading);

  return <ReversalMoveForm moves={moveCategory.moves} onSubmit={onSubmit} />;
};

export default Page;
