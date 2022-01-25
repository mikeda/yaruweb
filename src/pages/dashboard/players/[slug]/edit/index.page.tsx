import React from 'react';

import { PlayerAttributes } from '@/lib/graphql/types';
import { useRouter } from 'next/router';
import { PlayerForm } from '@/components/PlayerForm';
import { DashboardContent, DashboardBreadcrumbs } from '@/components';
import { usePlayer } from './hooks/usePlayer';
import { useUpdate } from './hooks/useUpdate';

const Page: React.FC = () => {
  const router = useRouter();
  const playerSlug = router.query.slug as string | undefined;

  const { player } = usePlayer(playerSlug);
  const { update } = useUpdate(() => {
    router.back();
  });

  if (!player) return null;

  const onSubmit = (attributes: PlayerAttributes) => {
    update({ variables: { playerSlug: player.slug, attributes } });
  };

  return (
    <DashboardContent title="プレイヤー編集" breadcrumb={<DashboardBreadcrumbs to="playerEdit" player={player} />}>
      <PlayerForm player={player} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
