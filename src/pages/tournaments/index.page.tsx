import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { Box, Button, Grid } from '@material-ui/core';

import {
  TournamentsPageTournamentsDocument,
  TournamentsPageTournamentsQuery,
  useTournamentsPageTournamentsLazyQuery,
} from '@/lib/graphql/types';
import { Head, Content, Breadcrumbs, TournamentCard } from '@/components';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';

const Page: React.FC<TournamentsPageTournamentsQuery> = ({
  tournaments: { records: initTournaments, paging: initPaging },
}) => {
  const [state, setState] = useState({ tournaments: initTournaments, paging: initPaging });
  const [fetch] = useTournamentsPageTournamentsLazyQuery({
    onCompleted: data => {
      setState(prev => ({
        tournaments: [...prev.tournaments, ...data.tournaments.records],
        paging: data.tournaments.paging,
      }));
      setLoading(false);
    },
    onError: e => {
      toast.error(e.message);
      setLoading(false);
    },
  });
  const setLoading = useSetRecoilState(loadingState);

  const { tournaments, paging } = state;

  const fetchMore = () => {
    if (!paging.hasNext) return;

    setLoading(true);
    fetch({ variables: { page: paging.currentPage + 1 } });
  };

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

      {paging.hasNext && (
        <Box pt={2} pb={2} display="flex" justifyContent="center">
          <Button variant="outlined" onClick={fetchMore}>
            もっとみる
          </Button>
        </Box>
      )}
    </Content>
  );
};

export const getStaticProps: GetStaticProps<TournamentsPageTournamentsQuery> = async () => {
  const data: TournamentsPageTournamentsQuery = await fetchGraphql(TournamentsPageTournamentsDocument, { page: 1 });

  return { props: data, revalidate: 300 };
};

export default Page;
