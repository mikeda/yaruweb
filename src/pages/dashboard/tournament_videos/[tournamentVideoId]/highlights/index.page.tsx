import React from 'react';

import {
  TournamentVideoHighlight,
  useDeleteHighlightMutation,
  usePageDashboardHighlightsQuery,
} from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { DashboardBreadcrumbs } from '@/components';
import { Head } from '@/components/layouts/Head';
import { useRouter } from 'next/router';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { ObjectCardList } from '@/components/ObjectCardList';
import { formatSec } from '@/lib/formatSec';
import { dashboardPath } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { tournamentVideoId } = router.query;
  const { data, loading, refetch } = usePageDashboardHighlightsQuery({
    variables: { tournamentVideoId: tournamentVideoId as string },
    fetchPolicy: 'network-only',
    skip: !tournamentVideoId,
  });

  setLoading(loading);
  if (!data) return null;

  const { tournamentVideo } = data;

  setLoading(loading);

  const title = 'ハイライト';

  return (
    <DashboardContent activeTab="video">
      <Head title={title} />
      <DashboardBreadcrumbs to="tournamentVideoHighlights" tournamentVideo={tournamentVideo} />
      <PageHeader
        title={title}
        addPageUrl={dashboardPath({ to: 'tournamentVideoHighlightNew', tournamentVideoId: tournamentVideo.id })}
      />

      <PageContent highlights={tournamentVideo.highlights} refetch={refetch} />
    </DashboardContent>
  );
};

type TournamentVideoHighlightFragment = Pick<TournamentVideoHighlight, 'id' | 'title' | 'startSec'>;

interface PageContentProps {
  highlights: TournamentVideoHighlightFragment[];
  refetch: () => void;
}

const PageContent: React.FC<PageContentProps> = ({ highlights, refetch }) => {
  const setLoading = useSetRecoilState(loadingState);

  const [deleteTournamentVideoHighlight, { loading: deleteLoading }] = useDeleteHighlightMutation({
    onCompleted: data => {
      const highlight = data.deleteTournamentVideoHighlight?.tournamentVideoHighlight;
      if (!highlight) return;
      refetch();
      toast.success('ハイライトを削除しました。');
    },
  });

  setLoading(deleteLoading);

  return (
    <ObjectCardList
      items={highlights.map(highlight => ({
        id: highlight.id,
        title: `[${formatSec(highlight.startSec)}] ${highlight.title}`,
        links: [
          {
            text: '編集する',
            url: dashboardPath({ to: 'tournamentVideoHighlightEdit', tournamentVideoHighlightId: highlight.id }),
          },
          {
            text: '削除する',
            onClick: () => {
              if (window.confirm('ハイライトを削除します。')) {
                deleteTournamentVideoHighlight({ variables: { tournamentVideoHighlightId: highlight.id } });
              }
            },
          },
        ],
      }))}
    />
  );
};

export default Page;
