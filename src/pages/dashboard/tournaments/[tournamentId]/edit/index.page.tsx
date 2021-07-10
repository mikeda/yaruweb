import React from 'react';

import { TournamentAttributes } from '@/lib/graphql/types';
import { useRouter } from 'next/router';
import { TournamentForm } from '@/components/TournamentForm';
import { DashboardContent, DashboardBreadcrumbs } from '@/components';
import { useTournament } from './hooks/useTournament';
import { useUpdate } from './hooks/useUpdate';

const Page: React.FC = () => {
  const router = useRouter();
  const tournamentId = router.query.tournamentId as string | undefined;

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
