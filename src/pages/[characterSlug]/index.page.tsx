import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  CharacterPathsDocument,
  CharacterPathsQuery,
  PageCharacterDocument,
  PageCharacterQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { CharacterCard } from '@/components/CharacterCard';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Avatar, Box, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import theme from '@/theme';
import { CharacterPageTabs } from '@/components';
import { BattleRoundText } from '@/lib/graphql/enum_texts';
import clsx from 'clsx';
import { path } from '@/lib';
import Link from 'next/link';

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
  list: {
    maxHeight: 300,
    overflowY: 'auto',
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

const Page: React.FC<PageCharacterQuery> = ({ character }) => {
  const classes = useStyles();

  return (
    <Content
      activeTab="characters"
      title={character.longName}
      breadcrumb={<Breadcrumbs to="character" character={character} />}
    >
      <Head title={character.longName} />

      <CharacterCard character={character} />

      <Box mt={2}>
        <CharacterPageTabs characterSlug={character.slug} activeTab="profile" />
      </Box>

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h5">
          ストーリー
        </Typography>
        <Typography className={classes.body}>{character.story}</Typography>
      </Paper>

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h5">
          キャラ解説
        </Typography>
        <Typography className={classes.body}>{character.description}</Typography>
      </Paper>

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h4">
          大会動画
        </Typography>
        <List className={classes.list}>
          {character.battles.map(battle => {
            const video = battle.tournamentVideo;
            const tournament = video.tournament;
            const left = battle.sides[0];
            const right = battle.sides[1];
            let subTitle = tournament.name;
            if (battle.round) {
              subTitle = `${subTitle} ${BattleRoundText[battle.round]}`;
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
      </Paper>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const characterSlug = params?.characterSlug as string;
  const data: PageCharacterQuery = await fetchGraphql(PageCharacterDocument, { characterSlug });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.map(c => ({ params: { characterSlug: c.slug } }));

  return { paths, fallback: false };
};

export default Page;
