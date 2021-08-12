import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs } from '@/components';
import { Avatar, Box, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import theme from '@/theme';
import { PlayerBattlesPageDocument, PlayerBattlesPageQuery } from '@/lib/graphql/types';
import Link from 'next/link';
import clsx from 'clsx';
import { TournamentBattleRoundText } from '@/lib/graphql/enum_texts';
import { path } from '@/lib';
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

const Page: React.FC<PlayerBattlesPageQuery> = ({
  player,
  tournamentBattles: { records: tournamentBattles, paging },
}) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Content activeTab="players" title={player.name} breadcrumb={<Breadcrumbs to="player" player={player} />}>
      <Head title={player.name} />

      <Profile player={player} />

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h4">
          大会動画
        </Typography>
        <List>
          {tournamentBattles.map(battle => {
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

        <Box display="flex" justifyContent="center">
          <Pagination
            page={paging.currentPage}
            count={paging.totalPages}
            color="primary"
            onChange={(e, page) => {
              router.push(path({ to: 'playerBattles', player: player.slug, page }));
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
  const data: PlayerBattlesPageQuery = await fetchGraphql(PlayerBattlesPageDocument, {
    playerSlug,
    page: page ? Number(page) : 1,
  });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
