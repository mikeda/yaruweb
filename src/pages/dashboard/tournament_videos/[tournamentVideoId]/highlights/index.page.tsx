import React from 'react';

import { DashboardBreadcrumbs, DashboardContent, Heading } from '@/components';
import { useDestroyQuery, useCreateQuery, useRouteParams, useTournamentVideoQuery, useHighlightsQuery } from './hooks';
import { HighlightList, HighlightForm } from './components';

const Page: React.FC = () => {
  const { tournamentVideoId } = useRouteParams();
  const { tournamentVideo } = useTournamentVideoQuery(tournamentVideoId);
  const { highlights, refetch } = useHighlightsQuery(tournamentVideoId);
  const { create } = useCreateQuery(refetch);
  const { destroy } = useDestroyQuery(refetch);

  return (
    <DashboardContent
      title="ハイライト"
      breadcrumb={
        tournamentVideo && <DashboardBreadcrumbs to="tournamentVideoHighlights" tournamentVideo={tournamentVideo} />
      }
    >
      {tournamentVideo && (
        <>
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
