import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { AdminBreadcrumbs, AdminContent, AttackMoveForm, ReversalMoveForm, ThrowMoveForm } from '@/components';
import {
  usePageAdminMoveCopyQuery,
  PageAdminMoveCopyQuery,
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
  const { id } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageAdminMoveCopyQuery({
    variables: { moveId: id as string },
    fetchPolicy: 'network-only',
    skip: !id,
  });

  setLoading(loading);
  if (!data) return null;

  const { move } = data;

  return (
    <AdminContent title="技データ登録" breadcrumb={<AdminBreadcrumbs to="movesNew" moveCategory={move.moveCategory} />}>
      {move.moveable.__typename === 'AttackMove' && <AttackContent {...data} />}
      {move.moveable.__typename === 'ThrowMove' && <ThrowContent {...data} />}
      {move.moveable.__typename === 'ReversalMove' && <ReversalContent {...data} />}
    </AdminContent>
  );
};

const AttackContent: React.FC<PageAdminMoveCopyQuery> = ({ move }) => {
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

const ThrowContent: React.FC<PageAdminMoveCopyQuery> = ({ move }) => {
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

const ReversalContent: React.FC<PageAdminMoveCopyQuery> = ({ move }) => {
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
