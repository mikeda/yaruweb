import React from 'react';

import {
  HighlightAttributes,
  useCreateHighlightMutation,
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
import { loadingState } from 'states/loading';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardHighlightNewQuery({
    variables: { videoId: videoId as string },
    fetchPolicy: 'network-only',
    skip: !videoId,
  });

  setLoading(loading);
  if (!data) return null;

  const { video } = data;
  const title = 'ハイライト登録';

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs
        parents={[
          {
            name: '動画',
            url: Routes.dashboard.video.index(),
          },
          { name: video.title },
        ]}
        current={title}
      />
      <PageHeader title={title} />

      <PageContent {...data} />
    </DashboardContent>
  );
};
const PageContent: React.FC<PageDashboardHighlightNewQuery> = ({ video }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createHighlight, { loading }] = useCreateHighlightMutation({
    onCompleted: () => {
      toast.success('ハイライトを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: HighlightAttributes) => {
    createHighlight({ variables: { videoId: video.id, attributes } });
  };

  setLoading(loading);

  return <HighlightForm youtubeVideoId={video.videoId} onSubmit={onSubmit} />;
};

export default Page;
