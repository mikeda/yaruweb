import React from 'react';
import { useRouter } from 'next/router';

import { DashboardContent, DashboardBreadcrumbs, DashboardTournamentCard } from '@/components';
import { dashboardPath } from '@/lib';
import { Box, Grid, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useTournamentsQuery } from './hooks/useTournamentsQuery';
import theme from '@/theme';

const useStyles = makeStyles({
  paging: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
});

const Page: React.FC = () => {
  const router = useRouter();
  const { tournaments, paging, refetch } = useTournamentsQuery();
  const classes = useStyles();

  return (
    <DashboardContent title="大会" breadcrumb={<DashboardBreadcrumbs to="tournaments" />}>
      {tournaments && (
        <Grid container spacing={2}>
          {tournaments.map(tournament => (
            <Grid item key={tournament.id} xs={12} sm={6} md={4}>
              <DashboardTournamentCard tournament={tournament} onDelete={refetch} />
            </Grid>
          ))}
        </Grid>
      )}
      {paging && (
        <Box className={classes.paging}>
          <Pagination
            page={paging.currentPage}
            count={paging.totalPages}
            color="primary"
            onChange={(e, page) => {
              router.push(dashboardPath({ to: 'tournaments', params: { page } }));
            }}
          />
        </Box>
      )}
    </DashboardContent>
  );
};

export default Page;
