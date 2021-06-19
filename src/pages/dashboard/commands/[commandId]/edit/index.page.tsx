import React from 'react';

import {
  CommandAttributes,
  PageDashboardCommandEditQuery,
  usePageDashboardCommandEditQuery,
  useUpdateCommandMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { CommandForm } from '@/components/CommandForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

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

  const title = '判定編集';

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs
        items={[
          { name: 'キャラクター', url: Routes.dashboard.character.index() },
          {
            name: `技データ(${command.move.moveCategory.character.name})`,
            url: Routes.dashboard.moveCategory.index(command.move.moveCategory.character.slug),
          },
          {
            name: command.move.moveCategory.name,
            url: Routes.dashboard.move.index(command.move.moveCategory.id),
          },
          {
            name: command.move.name,
            url: Routes.dashboard.move.commands.index(command.move.id),
          },
          { name: title },
        ]}
      />
      <PageHeader title={title} />

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
  return <CommandForm command={command} states={command.move.moveCategory.character.states} onSubmit={onSubmit} />;
};

export default Page;
