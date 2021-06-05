import React from 'react';

import { VideoAttributes, usePageDashboardVideoEditQuery, useUpdateVideoMutation, Video } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';
import { VideoForm } from '@/components/VideoForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { videoId } = router.query;
  const { data, loading } = usePageDashboardVideoEditQuery({
    variables: { videoId: videoId as string },
    skip: !videoId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { video } = data;

  return (
    <DashboardContent activeTab="character">
      <Head title={video.title} />
      <Breadcrumbs parents={[{ name: '動画', url: Routes.dashboard.video.index() }]} current={video.title} />
      <PageHeader title={video.title} />

      <VideoContent video={video} />
    </DashboardContent>
  );
};

type VideoFragment = Pick<Video, 'id' | 'title' | 'description' | 'videoId'>;

const VideoContent: React.FC<{ video: VideoFragment }> = ({ video }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateVideo, { loading }] = useUpdateVideoMutation({
    onCompleted: () => {
      toast.success('動画を更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: VideoAttributes) => {
    updateVideo({ variables: { videoId: video.id, attributes } });
  };

  setLoading(loading);
  return <VideoForm video={video} onSubmit={onSubmit} />;
};

export default Page;
