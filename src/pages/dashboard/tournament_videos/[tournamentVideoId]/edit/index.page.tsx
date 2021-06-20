import React from 'react';

import {
  TournamentVideoAttributes,
  usePageDashboardVideoEditQuery,
  useUpdateTournamentVideoMutation,
  TournamentVideo,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { VideoForm } from '@/components/VideoForm';
import { DashboardBreadcrumbs } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { tournamentVideoId } = router.query;
  const { data, loading } = usePageDashboardVideoEditQuery({
    variables: { tournamentVideoId: tournamentVideoId as string },
    skip: !tournamentVideoId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { tournamentVideo } = data;

  return (
    <DashboardContent activeTab="character">
      <Head title={tournamentVideo.title} />
      <DashboardBreadcrumbs to="tournamentVideoEdit" tournamentVideo={tournamentVideo} />
      <PageHeader title={tournamentVideo.title} />

      <VideoContent video={tournamentVideo} />
    </DashboardContent>
  );
};

type TournamentVideoFragment = Pick<TournamentVideo, 'id' | 'title' | 'description' | 'youtubeVideoId'>;

const VideoContent: React.FC<{ video: TournamentVideoFragment }> = ({ video }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateTournamentVideo, { loading }] = useUpdateTournamentVideoMutation({
    onCompleted: () => {
      toast.success('動画を更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: TournamentVideoAttributes) => {
    updateTournamentVideo({ variables: { tournamentVideoId: video.id, attributes } });
  };

  setLoading(loading);
  return <VideoForm video={video} onSubmit={onSubmit} />;
};

export default Page;
