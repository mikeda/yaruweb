import React from 'react';

import { PageTournamentsDocument, PageTournamentsQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { useRouter } from 'next/router';
import { path } from '@/lib';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { GetServerSideProps } from 'next';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { TournamentCard } from '@/components/TournamentCard';
import { Pagination } from '@material-ui/lab';
import theme from '@/theme';

const useStyles = makeStyles({
  paging: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
});

const Page: React.FC<PageTournamentsQuery> = ({ tournaments: { records: tournaments, paging } }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Content activeTab="tournaments" title="大会" breadcrumb={<Breadcrumbs to="tournaments" />}>
      <Head title="鉄拳7の大会情報" />

      <Grid container spacing={2}>
        {tournaments.map(tournament => (
          <Grid item key={tournament.id} xs={12} sm={6} md={4}>
            <TournamentCard tournament={tournament} />
          </Grid>
        ))}
      </Grid>
      <Box className={classes.paging}>
        <Pagination
          page={paging.currentPage}
          count={paging.totalPages}
          color="primary"
          onChange={(e, page) => {
            router.push(path({ to: 'tournaments', params: { page } }));
          }}
        />
      </Box>
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps<PageTournamentsQuery> = async ({ query }) => {
  const page = query?.page ? Number(query.page) : 1;
  const data: PageTournamentsQuery = await fetchGraphql(PageTournamentsDocument, { page });

  return {
    props: data,
  };
};

export default Page;
