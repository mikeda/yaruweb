import React from 'react';

import { useRouter } from 'next/router';

import { TournamentVideoEditForm } from './components';
import { useTournamentVideo } from './hooks/useTournamentVideo';
import { useUpdate } from './hooks/useUpdate';

import { DashboardContent, AdminBreadcrumbs } from '@/components';
import { TournamentVideoAttributes } from '@/generated/graphql';

const Page: React.FC = () => {
  const router = useRouter();
  const tournamentVideoId = router.query.id as string | undefined;

  const { tournamentVideo } = useTournamentVideo(tournamentVideoId);
  const { update } = useUpdate(() => {
    router.back();
  });

  if (!tournamentVideo) return null;

  const onSubmit = (attributes: TournamentVideoAttributes) => {
    update({ variables: { tournamentVideoId: tournamentVideo.id, attributes } });
  };

  return (
    <DashboardContent
      title="大会を編集"
      breadcrumb={<AdminBreadcrumbs to="tournamentVideoEdit" tournamentVideo={tournamentVideo} />}
    >
      <TournamentVideoEditForm tournamentVideo={tournamentVideo} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
