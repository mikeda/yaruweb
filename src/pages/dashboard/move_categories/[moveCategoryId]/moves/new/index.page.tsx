import React from 'react';

import {
  MoveAttributes,
  useCreateMoveMutation,
  usePageDashboardMoveNewQuery,
  PageDashboardMoveNewQuery,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
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
    <DashboardContent activeTab="character">
      <Head title="技データ作成" />
      <DashboardBreadcrumbs to="movesNew" moveCategory={moveCategory} />
      <PageHeader title="技データ作成" />

      <PageContent {...data} />
    </DashboardContent>
  );
};
const PageContent: React.FC<PageDashboardMoveNewQuery> = ({ moveCategory }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createMove, { loading }] = useCreateMoveMutation({
    onCompleted: () => {
      toast.success('技データを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: MoveAttributes) => {
    createMove({ variables: { moveCategoryId: moveCategory.id, attributes } });
  };

  setLoading(loading);

  return <MoveForm conditions={moveCategory.character.conditions} onSubmit={onSubmit} />;
};

export default Page;
