import React from 'react';

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
import { DashboardContent, DashboardBreadcrumbs } from '@/components';

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

  return (
    <DashboardContent title="コマンド登録" breadcrumb={<DashboardBreadcrumbs to="commandsNew" move={move} />}>
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

  return <CommandForm onSubmit={onSubmit} />;
};

export default Page;
