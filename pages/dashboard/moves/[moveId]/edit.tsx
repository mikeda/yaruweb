import React from 'react';

import {
  MoveAttributes,
  PageDashboardMoveEditQuery,
  usePageDashboardMoveEditQuery,
  useUpdateMoveMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';
import { MoveForm } from '@/components/MoveForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

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

  const title = '判定編集';

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs
        parents={[
          { name: 'キャラクター', url: Routes.dashboard.character.index() },
          {
            name: `技データ(${move.moveCategory.character.name})`,
            url: Routes.dashboard.moveCategory.index(move.moveCategory.character.slug),
          },
          {
            name: move.moveCategory.name,
            url: Routes.dashboard.move.index(move.moveCategory.id),
          },
        ]}
        current={title}
      />
      <PageHeader title={title} />

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
  return <MoveForm move={move} conditions={move.moveCategory.character.conditions} onSubmit={onSubmit} />;
};

export default Page;
