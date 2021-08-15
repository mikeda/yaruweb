import React from 'react';
import { GetStaticProps } from 'next';

import { StaffRequirement } from '@/components/StaffRequirement';

import { TopPageDocument, TopPageQuery } from '@/lib/graphql/types';
import { IntroSlides } from './IntroSlides';
import { Head, Content, BattleListItem, CharacterCard, ArticleCard, Link as LinkComponent } from '@/components';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Box, Button, createStyles, Grid, List, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { TournamentCard } from '@/components/TournamentCard';
import { PlayerCard } from '@/components/PlayerCard';
import { path } from '@/lib';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      marginTop: theme.spacing(4),
    },
    sectionFooter: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

const Page: React.FC<TopPageQuery> = ({ tournaments, battles, players, characters, articles }) => {
  const classes = useStyles();

  return (
    <Content activeTab="top">
      <Head title="鉄拳やろうよ.com" description="鉄拳やろうよ.comは格闘ゲーム「鉄拳7」を楽しむためのサイトです。" />

      <Box>
        <IntroSlides />
      </Box>

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          大会
        </Typography>

        <Grid container spacing={2}>
          {tournaments.records.map(tournament => (
            <Grid item key={tournament.id} xs={12} sm={6} md={4}>
              <TournamentCard tournament={tournament} />
            </Grid>
          ))}
        </Grid>

        <div className={classes.sectionFooter}>
          <Button href={path({ to: 'tournaments' })} component={LinkComponent}>
            もっとみる
          </Button>
        </div>
      </Box>

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          対戦動画
        </Typography>

        <Paper>
          <List>
            {battles.records.map((battle, i) => (
              <BattleListItem key={battle.id} battle={battle} last={battles.records.length === i + 1} />
            ))}
          </List>
        </Paper>

        <div className={classes.sectionFooter}>
          <Button href={path({ to: 'battles' })} component={LinkComponent}>
            もっとみる
          </Button>
        </div>
      </Box>

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          プレイヤー
        </Typography>

        <Grid container spacing={2}>
          {players.records.map(player => (
            <Grid item key={player.slug} xs={12} sm={6}>
              <PlayerCard player={player} />
            </Grid>
          ))}
        </Grid>

        <div className={classes.sectionFooter}>
          <Button href={path({ to: 'players' })} component={LinkComponent}>
            もっとみる
          </Button>
        </div>
      </Box>

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          キャラクター
        </Typography>

        <Grid container spacing={2}>
          {characters.records.map(character => (
            <Grid item key={character.slug} xs={12} sm={6}>
              <CharacterCard character={character} />
            </Grid>
          ))}
        </Grid>

        <div className={classes.sectionFooter}>
          <Button href={path({ to: 'characters' })} component={LinkComponent}>
            もっとみる
          </Button>
        </div>
      </Box>

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          新着記事
        </Typography>

        <Grid container spacing={2}>
          {articles.records.map(article => (
            <Grid item key={article.id} xs={12} sm={6} md={4}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>

        <div className={classes.sectionFooter}>
          <Button href={path({ to: 'articles' })} component={LinkComponent}>
            もっとみる
          </Button>
        </div>
      </Box>

      <Box mt={4}>
        <StaffRequirement />
      </Box>
    </Content>
  );
};

export const getStaticProps: GetStaticProps<TopPageQuery> = async () => {
  const data: TopPageQuery = await fetchGraphql(TopPageDocument);

  return { props: data, revalidate: 300 };
};

export default Page;
