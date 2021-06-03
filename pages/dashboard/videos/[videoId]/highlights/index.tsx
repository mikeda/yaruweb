import React from 'react';

import { Highlight, useDeleteHighlightMutation, usePageDashboardHighlightsQuery } from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Head } from '@/components/layouts/Head';
import { useRouter } from 'next/router';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { ObjectCardList } from '@/components/ObjectCardList';
import { formatSec } from '@/lib/formatSec';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { videoId } = router.query;
  const { data, loading, refetch } = usePageDashboardHighlightsQuery({
    variables: { videoId: videoId as string },
    fetchPolicy: 'network-only',
    skip: !videoId,
  });

  setLoading(loading);
  if (!data) return null;

  const { video } = data;

  setLoading(loading);

  const title = 'ハイライト';

  return (
    <DashboardContent activeTab="video">
      <Head title={title} />
      <Breadcrumbs parents={[{ name: '動画', url: Routes.dashboard.video.index() }]} current={title} />
      <PageHeader title={title} addPageUrl={Routes.dashboard.video.highlight.new(video.id)} />

      <PageContent highlights={video.highlights} refetch={refetch} />
    </DashboardContent>
  );
};

type HighlightFragment = Pick<Highlight, 'id' | 'title' | 'startSec'>;

interface PageContentProps {
  highlights: HighlightFragment[];
  refetch: () => void;
}

const PageContent: React.FC<PageContentProps> = ({ highlights, refetch }) => {
  const setLoading = useSetRecoilState(loadingState);

  const [deleteHighlight, { loading: deleteLoading }] = useDeleteHighlightMutation({
    onCompleted: data => {
      const highlight = data.deleteHighlight?.highlight;
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
          { text: '編集する', url: Routes.dashboard.highlight.edit(highlight.id) },
          {
            text: '削除する',
            onClick: () => {
              if (window.confirm('ハイライトを削除します。')) {
                deleteHighlight({ variables: { highlightId: highlight.id } });
              }
            },
          },
        ],
      }))}
    />
  );
};

export default Page;
