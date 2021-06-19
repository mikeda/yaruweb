import React from 'react';

import {
  useCreateVideoMutation,
  useDeleteVideoMutation,
  usePageDashboardTournamentVideosQuery,
  TournamentVideo,
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
import { ObjectCardList } from '@/components/ObjectCardList';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/Button';
import { useForm } from 'react-hook-form';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);

  let tournamentId: string | undefined;
  if (router.query.tournamentId) {
    tournamentId = router.query.tournamentId as string;
  }

  const { data, loading, refetch } = usePageDashboardTournamentVideosQuery({
    variables: { tournamentId: tournamentId as string },
    fetchPolicy: 'network-only',
    skip: !router.isReady && !!tournamentId,
  });

  if (!tournamentId) return null;

  setLoading(loading);
  if (!data) return null;

  const { tournamentVideos: videos } = data;

  setLoading(loading);

  const title = '動画';

  return (
    <DashboardContent activeTab="video">
      <Head title={title} />
      <Breadcrumbs items={[{ name: title }]} />
      <PageHeader title={title} />

      <VideoForm tournamentId={tournamentId} />

      <PageContent videos={videos} refetch={refetch} />
    </DashboardContent>
  );
};

type TournamentVideoFragment = Pick<TournamentVideo, 'id' | 'title' | 'highlightsCount'>;

interface PageContentProps {
  videos: TournamentVideoFragment[];
  refetch: () => void;
}

const PageContent: React.FC<PageContentProps> = ({ videos, refetch }) => {
  const setLoading = useSetRecoilState(loadingState);

  const [deleteTournamentVideo, { loading: deleteLoading }] = useDeleteVideoMutation({
    onCompleted: data => {
      const video = data.deleteTournamentVideo?.tournamentVideo;
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
          { text: '編集する', url: Routes.dashboard.tournamentVideo.edit(video.id) },
          {
            text: `ハイライト(${video.highlightsCount})`,
            url: Routes.dashboard.tournamentVideo.highlight.index(video.id),
          },
          {
            text: '削除する',
            onClick: () => {
              if (window.confirm('動画を削除します。')) {
                deleteTournamentVideo({ variables: { tournamentVideoId: video.id } });
              }
            },
          },
        ],
      }))}
    />
  );
};

const VideoForm: React.FC<{ tournamentId: string }> = ({ tournamentId }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createTournamentVideo, { loading }] = useCreateVideoMutation({
    onCompleted: data => {
      const video = data.createTournamentVideo?.tournamentVideo;
      if (!video) return;

      toast.success('動画を登録しました。');
      router.push(Routes.dashboard.tournamentVideo.edit(video.id));
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  const { register, handleSubmit } = useForm<{ url: string }>();

  const onSubmit = ({ url }: { url: string }) => {
    createTournamentVideo({ variables: { tournamentId, url } });
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
