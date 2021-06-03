import React from 'react';

import {
  HighlightAttributes,
  PageDashboardHighlightEditQuery,
  usePageDashboardHighlightEditQuery,
  useUpdateHighlightMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';
import { HighlightForm } from '@/components/HighlightForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { highlightId } = router.query;
  const { data, loading } = usePageDashboardHighlightEditQuery({
    variables: { highlightId: highlightId as string },
    skip: !highlightId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { highlight } = data;

  return (
    <DashboardContent activeTab="video">
      <Head title={highlight.title} />
      <Breadcrumbs
        parents={[
          {
            name: '動画',
            url: Routes.dashboard.video.index(),
          },
          { name: highlight.video.title },
        ]}
        current={highlight.title}
      />
      <PageHeader title={highlight.title} />

      <HighlightContent {...data} />
    </DashboardContent>
  );
};

const HighlightContent: React.FC<PageDashboardHighlightEditQuery> = ({ highlight }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateHighlight, { loading }] = useUpdateHighlightMutation({
    onCompleted: () => {
      toast.success('ハイライトを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: HighlightAttributes) => {
    updateHighlight({ variables: { highlightId: highlight.id, attributes } });
  };

  setLoading(loading);
  return <HighlightForm highlight={highlight} youtubeVideoId={highlight.video.videoId} onSubmit={onSubmit} />;
};

export default Page;
