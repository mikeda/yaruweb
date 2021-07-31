import React from 'react';
import { useRouter } from 'next/router';

import { DashboardContent, DashboardBreadcrumbs, DashboardTournamentCard, SearchWord } from '@/components';
import { dashboardPath } from '@/lib';
import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useTournamentsQuery } from './hooks/useTournamentsQuery';
import theme from '@/theme';
import { Add as AddIcon } from '@material-ui/icons';
import { useRouteParams } from './hooks/useRouteParams';

const useStyles = makeStyles({
  paging: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
});

const Page: React.FC = () => {
  const router = useRouter();
  const { page, keyword } = useRouteParams();
  const { tournaments, paging, refetch } = useTournamentsQuery({ page, keyword });
  const classes = useStyles();

  return (
    <DashboardContent
      title="大会"
      breadcrumb={<DashboardBreadcrumbs to="tournaments" />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={dashboardPath({ to: 'tournamentsNew' })}
        >
          登録する
        </Button>
      }
    >
      <Box mb={2}>
        <SearchWord
          initWord={keyword}
          onSearch={word => {
            router.push(dashboardPath({ to: 'tournaments', q: word }));
          }}
        />
      </Box>

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
              router.push(dashboardPath({ to: 'tournaments', page, q: keyword }));
            }}
          />
        </Box>
      )}
    </DashboardContent>
  );
};

export default Page;
