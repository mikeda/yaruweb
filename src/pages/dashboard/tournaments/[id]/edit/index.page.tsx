import React from 'react';

import { useRouter } from 'next/router';



import { useTournament } from './hooks/useTournament';
import { useUpdate } from './hooks/useUpdate';

import { DashboardContent, DashboardBreadcrumbs, TournamentForm } from '@/components';
import { TournamentAttributes } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const tournamentId = router.query.id as string | undefined;

  const { tournament } = useTournament(tournamentId);
  const { update } = useUpdate(() => {
    router.back();
  });

  if (!tournament) return null;

  const onSubmit = (attributes: TournamentAttributes) => {
    update({ variables: { tournamentId: tournament.id, attributes } });
  };

  return (
    <DashboardContent
      title="大会を編集"
      breadcrumb={<DashboardBreadcrumbs to="tournamentEdit" tournament={tournament} />}
    >
      <TournamentForm tournament={tournament} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
