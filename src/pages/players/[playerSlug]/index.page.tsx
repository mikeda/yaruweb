import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { PlayerCard } from '@/components/PlayerCard';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import theme from '@/theme';
import { PlayerPageDocument, PlayerPageQuery } from '@/lib/graphql/types';
import { RankingPlaceAvatar } from '@/components';
import dayjs from '@/lib/dayjs';
import Link from 'next/link';
import { path } from '@/lib';

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
});

const Page: React.FC<PlayerPageQuery> = ({ player }) => {
  const classes = useStyles();

  return (
    <Content activeTab="tournaments" title={player.name} breadcrumb={<Breadcrumbs to="player" player={player} />}>
      <Head title={player.name} />

      <PlayerCard player={player} />

      {player.description && (
        <Paper className={classes.paper}>
          <Typography className={classes.title} variant="h4">
            プレイヤー解説
          </Typography>
          <Typography className={classes.body}>{player.description}</Typography>
        </Paper>
      )}

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h4">
          大会戦績
        </Typography>
        <List>
          {player.tournamentRankings.map(ranking => (
            <Link key={ranking.id} href={path({ to: 'tournament', tournamentId: ranking.tournament.id })} passHref>
              <ListItem button>
                <ListItemIcon>
                  <RankingPlaceAvatar place={ranking.place} />
                </ListItemIcon>
                <ListItemText
                  primary={ranking.tournament.name}
                  secondary={dayjs(ranking.tournament.startsAt).format('YYYY/M/D')}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h4">
          大会動画
        </Typography>
        <List>
          {player.tournamentBattles.map(battle => {
            const video = battle.tournamentVideo;
            const tournament = video.tournament;
            const left = battle.sides[0];
            const right = battle.sides[1];
            const title = `${left.player.name} × ${right.player.name}`;
            const subTitle = `${tournament.name} ${dayjs(tournament.startsAt).format('YYYY/M/D')}`;

            return (
              <Link
                key={battle.id}
                href={path({ to: 'tournamentVideo', tournamentVideoId: video.id, battleId: battle.id })}
                passHref
              >
                <ListItem button>
                  <ListItemText primary={title} secondary={subTitle} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Paper>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const playerSlug = params?.playerSlug as string;
  const data: PlayerPageQuery = await fetchGraphql(PlayerPageDocument, { playerSlug });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
