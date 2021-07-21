import React from 'react';

import { useCreateVideoMutation, useDashboardTournamentVideosPageQuery } from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { DashboardBreadcrumbs } from '@/components';
import { useRouter } from 'next/router';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { Input } from '@/components/form/Input';
import { useForm } from 'react-hook-form';
import { dashboardPath } from '@/lib';
import { Button, Grid } from '@material-ui/core';
import { DashboardTournamentVideoCard } from '@/components/DashboardTournamentVideoCard';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);

  let tournamentId: string | undefined;
  if (router.query.tournamentId) {
    tournamentId = router.query.tournamentId as string;
  }

  const { data, loading, refetch } = useDashboardTournamentVideosPageQuery({
    variables: { tournamentId: tournamentId as string },
    fetchPolicy: 'network-only',
    skip: !router.isReady && !!tournamentId,
  });

  if (!tournamentId) return null;

  setLoading(loading);

  if (!data) return null;
  const { tournament } = data;

  return (
    <DashboardContent title="動画" breadcrumb={<DashboardBreadcrumbs to="tournamentVideos" tournament={tournament} />}>
      <VideoForm tournamentId={tournamentId} />

      <Grid container spacing={2}>
        {tournament.videos.map(video => (
          <Grid item key={tournament.id} xs={12} sm={6} md={4}>
            <DashboardTournamentVideoCard tournamentVideo={video} onDelete={refetch} />
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
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
      router.push(dashboardPath({ to: 'tournamentVideosEdit', tournamentVideoId: video.id }));
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
      <Button type="submit" variant="contained">
        登録する
      </Button>
    </form>
  );
};

export default Page;
