import React from 'react';

import { useCreateVideoMutation, useDashboardTournamentVideosPageQuery } from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { DashboardBreadcrumbs } from '@/components';
import { useRouter } from 'next/router';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { Button, Grid } from '@material-ui/core';
import { DashboardTournamentVideoCard } from '@/components/DashboardTournamentVideoCard';
import { VideoForm } from './components/VideoForm';
import { Add as AddIcon } from '@material-ui/icons';

const Page: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
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
  const [create, { loading: createLoading }] = useCreateVideoMutation({
    onCompleted: data => {
      const video = data.createTournamentVideo?.tournamentVideo;
      if (!video) return;

      router.reload();
      toast.success('動画を登録しました。');
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  if (!tournamentId) return null;

  setLoading(loading || createLoading);

  if (!data) return null;
  const { tournament } = data;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DashboardContent
      title="動画"
      breadcrumb={<DashboardBreadcrumbs to="tournamentVideos" tournament={tournament} />}
      actions={
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
          作成する
        </Button>
      }
    >
      <VideoForm
        open={open}
        onClose={handleClose}
        onSubmit={({ url }) => {
          create({ variables: { tournamentId: tournament.id, url } });
          handleClose();
        }}
      />

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

export default Page;
