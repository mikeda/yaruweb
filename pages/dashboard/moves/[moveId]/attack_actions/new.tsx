import React from 'react';

import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import {
  AttackActionAttributes,
  PageDashboardActionNewQuery,
  useCreateAttackActionMutation,
  usePageDashboardActionNewQuery,
} from '@/lib/graphql/types';
import { AttackActionForm } from '@/components/AttackActionForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => {
  const router = useRouter();
  const { moveId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardActionNewQuery({
    variables: { moveId: moveId as string },
    fetchPolicy: 'network-only',
    skip: !moveId,
  });

  setLoading(loading);
  if (!data) return null;

  const { move } = data;
  const title = '判定登録';

  return (
    <DashboardContent activeTab="character">
      <Head title="判定登録" />
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
          {
            name: move.name,
            url: Routes.dashboard.move.actions.index(move.id),
          },
        ]}
        current={title}
      />
      <PageHeader title="判定登録" />

      <PageContent {...data} />
    </DashboardContent>
  );
};

const PageContent: React.FC<PageDashboardActionNewQuery> = ({ move }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createAttackAction, { loading }] = useCreateAttackActionMutation({
    onCompleted: () => {
      toast.success('判定を登録しました。');
      router.push(Routes.dashboard.move.actions.index(move.id));
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: AttackActionAttributes) => {
    createAttackAction({ variables: { moveId: move.id, attributes } });
  };

  setLoading(loading);

  return <AttackActionForm onSubmit={onSubmit} />;
};

export default Page;
