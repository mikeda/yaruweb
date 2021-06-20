import React from 'react';

import {
  TournamentVideoHighlightAttributes,
  PageDashboardHighlightEditQuery,
  usePageDashboardHighlightEditQuery,
  useUpdateTournamentVideoHighlightMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { HighlightForm } from '@/components/HighlightForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { tournamentVideoHighlightId } = router.query;
  const { data, loading } = usePageDashboardHighlightEditQuery({
    variables: { tournamentVideoHighlightId: tournamentVideoHighlightId as string },
    skip: !tournamentVideoHighlightId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { tournamentVideoHighlight } = data;

  return (
    <DashboardContent activeTab="video">
      <Head title={tournamentVideoHighlight.title} />
      <Breadcrumbs
        items={[
          { name: tournamentVideoHighlight.tournamentVideo.title },
          { name: '大会', url: Routes.dashboard.tournament.index() },
          { name: tournamentVideoHighlight.tournamentVideo.tournament.name },
          {
            name: '動画',
            url: Routes.dashboard.tournament.video.index(tournamentVideoHighlight.tournamentVideo.tournament.id),
          },
          { name: tournamentVideoHighlight.tournamentVideo.title },
          { name: tournamentVideoHighlight.title },
        ]}
      />
      <PageHeader title={tournamentVideoHighlight.title} />

      <HighlightContent {...data} />
    </DashboardContent>
  );
};

const HighlightContent: React.FC<PageDashboardHighlightEditQuery> = ({ tournamentVideoHighlight }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateHighlight, { loading }] = useUpdateTournamentVideoHighlightMutation({
    onCompleted: () => {
      toast.success('ハイライトを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: TournamentVideoHighlightAttributes) => {
    updateHighlight({ variables: { tournamentVideoHighlightId: tournamentVideoHighlight.id, attributes } });
  };

  setLoading(loading);
  return (
    <HighlightForm
      highlight={tournamentVideoHighlight}
      youtubeVideoId={tournamentVideoHighlight.tournamentVideo.youtubeVideoId}
      onSubmit={onSubmit}
    />
  );
};

export default Page;
