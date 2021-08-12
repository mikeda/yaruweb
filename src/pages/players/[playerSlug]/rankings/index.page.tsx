import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs } from '@/components';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import theme from '@/theme';
import { PlayerRankingsPageDocument, PlayerRankingsPageQuery } from '@/lib/graphql/types';
import { RankingPlaceAvatar } from '@/components';
import dayjs from '@/lib/dayjs';
import Link from 'next/link';
import { path } from '@/lib';
import { NO_IMAGE_URL } from '@/lib/Assets';
import { Pagination } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { Profile } from '../components/Profile';

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  body: {
    whiteSpace: 'pre-line',
  },
  avatar: {
    width: 24,
    height: 24,
  },
  win: {
    backgroundColor: '#D6AF36',
  },
  vs: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});

const Page: React.FC<PlayerRankingsPageQuery> = ({
  player,
  tournamentRankings: { records: tournamentRankings, paging },
}) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Content activeTab="players" title={player.name} breadcrumb={<Breadcrumbs to="player" player={player} />}>
      <Head title={player.name} />

      <Profile player={player} />

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h4">
          大会戦績
        </Typography>
        <List>
          {tournamentRankings.map(ranking => (
            <Link key={ranking.id} href={path({ to: 'tournament', tournamentId: ranking.tournament.id })} passHref>
              <ListItem button>
                <ListItemAvatar>
                  <RankingPlaceAvatar place={ranking.place} />
                </ListItemAvatar>
                <ListItemAvatar>
                  <Avatar src={ranking.tournament.mainImageUrl || NO_IMAGE_URL} />
                </ListItemAvatar>
                <ListItemText
                  primary={ranking.tournament.name}
                  secondary={dayjs(ranking.tournament.startsAt).format('YYYY/M/D')}
                />
              </ListItem>
            </Link>
          ))}
        </List>

        <Box display="flex" justifyContent="center">
          <Pagination
            page={paging.currentPage}
            count={paging.totalPages}
            color="primary"
            onChange={(e, page) => {
              router.push(path({ to: 'playerRankings', playerSlug: player.slug, page }));
            }}
          />
        </Box>
      </Paper>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const playerSlug = params?.playerSlug as string;
  const page = params?.page as string | undefined;
  const data: PlayerRankingsPageQuery = await fetchGraphql(PlayerRankingsPageDocument, {
    playerSlug,
    page: page ? Number(page) : 1,
  });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
