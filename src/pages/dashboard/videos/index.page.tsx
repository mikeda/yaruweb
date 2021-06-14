import React from 'react';

import {
  useCreateVideoMutation,
  useDeleteVideoMutation,
  usePageDashboardVideosQuery,
  Video,
} from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Head } from '@/components/layouts/Head';
import { useRouter } from 'next/router';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { Paging } from '@/components/Paging';
import { ObjectCardList } from '@/components/ObjectCardList';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/Button';
import { useForm } from 'react-hook-form';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { query } = router;
  const page = query.page ? Number(query.page as string) : 1;
  const { data, loading, refetch } = usePageDashboardVideosQuery({
    variables: { page },
    fetchPolicy: 'network-only',
    skip: !router.isReady,
  });

  setLoading(loading);
  if (!data) return null;

  const {
    videos: { records: videos, paging },
  } = data;

  setLoading(loading);

  const title = '動画';

  return (
    <DashboardContent activeTab="video">
      <Head title={title} />
      <Breadcrumbs current={title} />
      <PageHeader title={title} />

      <VideoForm />

      <PageContent videos={videos} refetch={refetch} />
      <Paging paging={paging} url={Routes.dashboard.video.index} />
    </DashboardContent>
  );
};

type VideoFragment = Pick<Video, 'id' | 'title' | 'highlightsCount'>;

interface PageContentProps {
  videos: VideoFragment[];
  refetch: () => void;
}

const PageContent: React.FC<PageContentProps> = ({ videos, refetch }) => {
  const setLoading = useSetRecoilState(loadingState);

  const [deleteVideo, { loading: deleteLoading }] = useDeleteVideoMutation({
    onCompleted: data => {
      const video = data.deleteVideo?.video;
      if (!video) return;
      refetch();
      toast.success('動画を削除しました。');
    },
  });

  setLoading(deleteLoading);

  return (
    <ObjectCardList
      items={videos.map(video => ({
        id: video.id,
        title: video.title,
        links: [
          { text: '編集する', url: Routes.dashboard.video.edit(video.id) },
          { text: `ハイライト(${video.highlightsCount})`, url: Routes.dashboard.video.highlight.index(video.id) },
          {
            text: '削除する',
            onClick: () => {
              if (window.confirm('動画を削除します。')) {
                deleteVideo({ variables: { videoId: video.id } });
              }
            },
          },
        ],
      }))}
    />
  );
};

const VideoForm: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createVideo, { loading }] = useCreateVideoMutation({
    onCompleted: data => {
      const video = data.createVideo?.video;
      if (!video) return;

      toast.success('動画を登録しました。');
      router.push(Routes.dashboard.video.edit(video.id));
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  const { register, handleSubmit } = useForm<{ url: string }>();

  const onSubmit = (attributes: { url: string }) => {
    createVideo({ variables: attributes });
  };

  setLoading(loading);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('url')} placeholder="YouTubeの動画URL" />
      <Button>
        <input type="submit" />
      </Button>
    </form>
  );
};
export default Page;
