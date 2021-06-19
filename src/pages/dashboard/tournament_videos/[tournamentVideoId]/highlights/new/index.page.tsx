import React from 'react';

import {
  TournamentVideoHighlightAttributes,
  useCreateTournamentVideoHighlightMutation,
  usePageDashboardHighlightNewQuery,
  PageDashboardHighlightNewQuery,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { HighlightForm } from '@/components/HighlightForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => {
  const router = useRouter();
  const { tournamentVideoId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardHighlightNewQuery({
    variables: { tournamentVideoId: tournamentVideoId as string },
    fetchPolicy: 'network-only',
    skip: !tournamentVideoId,
  });

  setLoading(loading);
  if (!data) return null;

  const { tournamentVideo } = data;
  const title = 'ハイライト登録';

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs
        parents={[
          { name: '大会', url: Routes.dashboard.tournament.index() },
          { name: tournamentVideo.tournament.name },
          { name: '動画', url: Routes.dashboard.tournament.video.index(tournamentVideo.tournament.id) },
          { name: 'ハイライト', url: Routes.dashboard.tournamentVideo.highlight.index(tournamentVideo.id) },
        ]}
        current={title}
      />
      <PageHeader title={title} />

      <PageContent {...data} />
    </DashboardContent>
  );
};
const PageContent: React.FC<PageDashboardHighlightNewQuery> = ({ tournamentVideo }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createTournamentVideoHighlight, { loading }] = useCreateTournamentVideoHighlightMutation({
    onCompleted: () => {
      toast.success('ハイライトを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: TournamentVideoHighlightAttributes) => {
    createTournamentVideoHighlight({ variables: { tournamentVideoId: tournamentVideo.id, attributes } });
  };

  setLoading(loading);

  return <HighlightForm youtubeVideoId={tournamentVideo.youtubeVideoId} onSubmit={onSubmit} />;
};

export default Page;
