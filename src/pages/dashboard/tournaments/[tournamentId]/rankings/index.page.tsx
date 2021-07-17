import React from 'react';

import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { DashboardBreadcrumbs, TournamentRankingForm, DashboardTournamentRankingCard } from '@/components';
import { Button, Grid } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useCreateMutation, useDeleteMutation, useQuery, useRouteParams } from './hooks';

const Page: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { tournamentId } = useRouteParams();
  const { data, refetch } = useQuery(tournamentId);
  const { create } = useCreateMutation({ onCreate: refetch });
  const { destroy } = useDeleteMutation({ onDelete: refetch });

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
      title="順位"
      breadcrumb={<DashboardBreadcrumbs to="tournamentRankings" tournament={tournament} />}
      actions={
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
          作成する
        </Button>
      }
    >
      <TournamentRankingForm
        open={open}
        onClose={handleClose}
        onSubmit={attributes => {
          create({ variables: { tournamentId: tournament.id, attributes } });
          handleClose();
        }}
      />

      <Grid container spacing={2}>
        {tournament.rankings.map(ranking => (
          <Grid item key={tournament.id} xs={12} sm={6}>
            <DashboardTournamentRankingCard
              tournamentRanking={ranking}
              onDelete={() => {
                destroy({
                  variables: { tournamentRankingId: ranking.id },
                });
              }}
            />
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
  );
};

export default Page;
