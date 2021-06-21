import React from 'react';

import { Head, PageHeader, DashboardBreadcrumbs, DashboardContent, Heading } from '@/components';
import { usePageQuery, useDestroyQuery, useCreateQuery } from './hooks';
import { HighlightList, HighlightForm } from './components';

const Page: React.FC = () => {
  const { data, refetch } = usePageQuery();
  const { create } = useCreateQuery(refetch);
  const { destroy } = useDestroyQuery(refetch);

  const tournamentVideo = data?.tournamentVideo;

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
          <HighlightList
            highlights={tournamentVideo.highlights}
            onDestroy={id => destroy({ variables: { tournamentVideoHighlightId: id } })}
          />
        </>
      )}
    </DashboardContent>
  );
};

export default Page;
