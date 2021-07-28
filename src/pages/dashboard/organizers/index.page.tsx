import React from 'react';
import { useRouter } from 'next/router';

import { DashboardContent, DashboardBreadcrumbs, DashboardOrganizerCard, SearchWord } from '@/components';
import { dashboardPath } from '@/lib';
import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useOrganizersQuery } from './hooks/useOrganizersQuery';
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
  const { organizers, paging, refetch } = useOrganizersQuery({ page, keyword });
  const classes = useStyles();

  if (!router.isReady) return null;

  return (
    <DashboardContent
      title="オーガナイザー"
      breadcrumb={<DashboardBreadcrumbs to="organizers" />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={dashboardPath({ to: 'organizersNew' })}
        >
          作成する
        </Button>
      }
    >
      <Box mb={2}>
        <SearchWord
          initWord={keyword}
          onSearch={word => {
            router.push(dashboardPath({ to: 'organizers', params: { q: word } }));
          }}
        />
      </Box>

      {organizers && (
        <Grid container spacing={2}>
          {organizers.map(organizer => (
            <Grid item key={organizer.id} xs={12} sm={6} md={4}>
              <DashboardOrganizerCard organizer={organizer} onDelete={refetch} />
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
              router.push(dashboardPath({ to: 'organizers', params: { page } }));
            }}
          />
        </Box>
      )}
    </DashboardContent>
  );
};

export default Page;
