import React from 'react';

import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import {
  CommandAttributes,
  PageDashboardCommandNewQuery,
  useCreateCommandMutation,
  usePageDashboardCommandNewQuery,
} from '@/lib/graphql/types';
import { CommandForm } from '@/components/CommandForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => {
  const router = useRouter();
  const { moveId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardCommandNewQuery({
    variables: { moveId: moveId as string },
    fetchPolicy: 'network-only',
    skip: !moveId,
  });

  setLoading(loading);
  if (!data) return null;

  const { move } = data;
  const title = 'コマンド登録';

  return (
    <DashboardContent activeTab="character">
      <Head title="コマンド登録" />
      <Breadcrumbs items={[{ name: title }]} />
      <PageHeader title="コマンド登録" />

      <PageContent {...data} />
    </DashboardContent>
  );
};

const PageContent: React.FC<PageDashboardCommandNewQuery> = ({ move }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createCommand, { loading }] = useCreateCommandMutation({
    onCompleted: () => {
      toast.success('コマンドを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: CommandAttributes) => {
    createCommand({ variables: { moveId: move.id, attributes } });
  };

  setLoading(loading);

  return <CommandForm states={move.moveCategory.character.states} onSubmit={onSubmit} />;
};

export default Page;
