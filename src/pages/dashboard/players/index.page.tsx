import React from 'react';
import { useRouter } from 'next/router';

import { DashboardContent, DashboardBreadcrumbs, DashboardPlayerCard } from '@/components';
import { dashboardPath } from '@/lib';
import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { usePlayersQuery } from './hooks/usePlayersQuery';
import theme from '@/theme';
import { Add as AddIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  paging: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
});

const Page: React.FC = () => {
  const router = useRouter();
  const { players, paging, refetch } = usePlayersQuery();
  const classes = useStyles();

  return (
    <DashboardContent
      title="プレイヤー"
      breadcrumb={<DashboardBreadcrumbs to="players" />}
      actions={
        <Button variant="contained" color="primary" startIcon={<AddIcon />} href={dashboardPath({ to: 'playersNew' })}>
          作成する
        </Button>
      }
    >
      {players && (
        <Grid container spacing={2}>
          {players.map(player => (
            <Grid item key={player.id} xs={12} sm={6} md={4}>
              <DashboardPlayerCard player={player} onDelete={refetch} />
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
              router.push(dashboardPath({ to: 'players', params: { page } }));
            }}
          />
        </Box>
      )}
    </DashboardContent>
  );
};

export default Page;
