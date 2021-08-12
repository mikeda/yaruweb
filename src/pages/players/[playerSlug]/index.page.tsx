import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs, Link as LinkComponent } from '@/components';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import theme from '@/theme';
import { PlayerPageDocument, PlayerPageQuery } from '@/lib/graphql/types';
import { RankingPlaceAvatar } from '@/components';
import dayjs from '@/lib/dayjs';
import Link from 'next/link';
import clsx from 'clsx';
import { TournamentBattleRoundText } from '@/lib/graphql/enum_texts';
import { path } from '@/lib';
import { Profile } from './components/Profile';

const useStyles = makeStyles({
  section: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  sectionTitle: {
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

const Page: React.FC<PlayerPageQuery> = ({ player, tournamentRankings, tournamentBattles }) => {
  const classes = useStyles();

  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="player" player={player} />}>
      <Head title={player.name} />

      <Profile player={player} />

      <Paper className={classes.section}>
        <Typography className={classes.sectionTitle} variant="h4">
          大会戦績
        </Typography>
        <List>
          {tournamentRankings.records.map(ranking => (
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

        {tournamentRankings.paging.hasNext && (
          <Box display="flex" justifyContent="center">
            <Button href={path({ to: 'playerRankings', playerSlug: player.slug })} component={LinkComponent}>
              もっと見る
            </Button>
          </Box>
        )}
      </Paper>

      <Paper className={classes.section}>
        <Typography className={classes.sectionTitle} variant="h4">
          対戦動画
        </Typography>
        <List>
          {tournamentBattles.records.map(battle => {
            const video = battle.tournamentVideo;
            const tournament = video.tournament;
            const left = battle.sides[0];
            const right = battle.sides[1];
            let subTitle = tournament.name;
            if (battle.round) {
              subTitle = `${subTitle} ${TournamentBattleRoundText[battle.round]}`;
            }
            return (
              <Link
                key={battle.id}
                href={path({ to: 'tournamentVideo', tournamentVideoId: video.id, battleId: battle.id })}
                passHref
              >
                <ListItem button>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <Avatar className={clsx(classes.avatar, left.rounds === 3 && classes.win)}>
                          {left.rounds}
                        </Avatar>
                        <Avatar className={classes.avatar} src={left.character.faceImageUrl} />
                        <span>{left.player.name}</span>
                        <span className={classes.vs}>×</span>
                        <Avatar className={clsx(classes.avatar, right.rounds === 3 && classes.win)}>
                          {right.rounds}
                        </Avatar>
                        <Avatar className={classes.avatar} src={right.character.faceImageUrl} />
                        <span>{right.player.name}</span>
                      </Box>
                    }
                    secondary={subTitle}
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>

        {tournamentBattles.paging.hasNext && (
          <Box display="flex" justifyContent="center">
            <Button href={path({ to: 'playerBattles', player: player.slug })} component={LinkComponent}>
              もっと見る
            </Button>
          </Box>
        )}
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
