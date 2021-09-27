import React from 'react';

import {
  CommandAttributes,
  PageDashboardCommandEditQuery,
  usePageDashboardCommandEditQuery,
  useUpdateCommandMutation,
} from '@/lib/graphql/types';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { CommandForm } from '@/components/CommandForm';
import { DashboardContent, DashboardBreadcrumbs } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { commandId } = router.query;
  const { data, loading } = usePageDashboardCommandEditQuery({
    variables: { commandId: commandId as string },
    skip: !commandId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { command } = data;

  return (
    <DashboardContent title="判定編集" breadcrumb={<DashboardBreadcrumbs to="commandEdit" move={command.move} />}>
      <CommandContent {...data} />
    </DashboardContent>
  );
};

const CommandContent: React.FC<PageDashboardCommandEditQuery> = ({ command }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateCommand, { loading }] = useUpdateCommandMutation({
    onCompleted: () => {
      toast.success('コマンドを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: CommandAttributes) => {
    updateCommand({ variables: { commandId: command.id, attributes } });
  };

  setLoading(loading);
  return <CommandForm command={command} onSubmit={onSubmit} />;
};

export default Page;
