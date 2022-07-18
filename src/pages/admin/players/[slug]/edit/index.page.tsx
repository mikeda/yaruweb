import React from 'react';

import { useRouter } from 'next/router';

import { usePlayer } from './hooks/usePlayer';
import { useUpdate } from './hooks/useUpdate';

import { AdminContent, AdminBreadcrumbs, PlayerForm } from '@/components';
import { PlayerAttributes } from '@/generated/graphql';

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
    <AdminContent title="プレイヤー編集" breadcrumb={<AdminBreadcrumbs to="playerEdit" player={player} />}>
      <PlayerForm player={player} onSubmit={onSubmit} />
    </AdminContent>
  );
};

export default Page;
