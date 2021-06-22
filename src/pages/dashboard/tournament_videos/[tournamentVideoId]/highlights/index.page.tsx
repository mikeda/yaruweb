import React from 'react';

import { Head, PageHeader, DashboardBreadcrumbs, DashboardContent, Heading } from '@/components';
import { useDestroyQuery, useCreateQuery, useRouteParams, useTournamentVideoQuery, useHighlightsQuery } from './hooks';
import { HighlightList, HighlightForm } from './components';

const Page: React.FC = () => {
  const { tournamentVideoId } = useRouteParams();
  const { tournamentVideo } = useTournamentVideoQuery(tournamentVideoId);
  const { highlights, refetch } = useHighlightsQuery(tournamentVideoId);
  const { create } = useCreateQuery(refetch);
  const { destroy } = useDestroyQuery(refetch);

  return (
    <DashboardContent activeTab="video">
      <Head title="ハイライト" />

      {tournamentVideo && (
        <>
          <DashboardBreadcrumbs to="tournamentVideoHighlights" tournamentVideo={tournamentVideo} />
          <PageHeader title="ハイライト" />
          <HighlightForm
            youtubeVideoId={tournamentVideo.youtubeVideoId}
            onSubmit={attributes => create({ variables: { tournamentVideoId: tournamentVideo.id, attributes } })}
          />

          <Heading lv="h3">ハイライト一覧</Heading>
          {highlights && (
            <HighlightList
              highlights={highlights}
              onDestroy={id => destroy({ variables: { tournamentVideoHighlightId: id } })}
            />
          )}
        </>
      )}
    </DashboardContent>
  );
};

export default Page;
