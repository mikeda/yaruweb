import React from 'react';

import { DashboardBreadcrumbs, DashboardContent } from '@/components';
import { useDestroyQuery, useCreateQuery, useRouteParams, useTournamentVideoQuery, useHighlightsQuery } from './hooks';
import { HighlightList, HighlightForm } from './components';
import { Box, Typography } from '@material-ui/core';

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

          <Box mt={2}>
            <Typography variant="h2" gutterBottom>
              ハイライト一覧
            </Typography>
            {highlights && (
              <HighlightList
                highlights={highlights}
                onDestroy={id => destroy({ variables: { tournamentVideoHighlightId: id } })}
              />
            )}
          </Box>
        </>
      )}
    </DashboardContent>
  );
};

export default Page;
