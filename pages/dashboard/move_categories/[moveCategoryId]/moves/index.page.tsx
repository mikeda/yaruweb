import React from 'react';

import { Move, usePageDashboardMovesQuery, useUpdateMovePositionMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Routes } from '@/lib/Routes';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { toast } from 'react-toastify';
import { SortableObjectCardList } from '@/components/ObjectCardList';

const Page: React.FC = () => {
  const router = useRouter();
  const { moveCategoryId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardMovesQuery({
    variables: { moveCategoryId: moveCategoryId as string },
    fetchPolicy: 'network-only',
    skip: !moveCategoryId,
  });

  setLoading(loading);
  if (!data) return null;

  const { moveCategory } = data;
  const title = moveCategory.name;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs
        parents={[
          { name: 'キャラクター', url: Routes.dashboard.character.index() },
          {
            name: `技データ(${moveCategory.character.name})`,
            url: Routes.dashboard.moveCategory.index(moveCategory.character.slug),
          },
        ]}
        current={title}
      />
      <PageHeader title={title} addPageUrl={Routes.dashboard.move.new(moveCategory.id)} />

      <PageContent moves={data.moveCategory.moves} />
    </DashboardContent>
  );
};

type MoveFragment = Pick<Move, 'id' | 'name' | 'commandsCount' | 'actionsCount'>;

const PageContent: React.FC<{ moves: MoveFragment[] }> = ({ moves }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [updateMovePosition, { loading }] = useUpdateMovePositionMutation({
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);

  return (
    <SortableObjectCardList
      items={moves.map(move => ({
        id: move.id,
        title: move.name,
        links: [
          { text: '編集する', url: Routes.dashboard.move.edit(move.id) },
          { text: `コマンド(${move.commandsCount})`, url: Routes.dashboard.move.commands.index(move.id) },
          { text: `判定(${move.actionsCount})`, url: Routes.dashboard.move.actions.index(move.id) },
        ],
      }))}
      onMove={(moveId, newPosition) => updateMovePosition({ variables: { moveId, newPosition } })}
    />
  );
};

export default Page;
