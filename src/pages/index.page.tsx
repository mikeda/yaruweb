import React from 'react';

import { Box, Button, Grid, List, Paper, Typography } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';



import { IntroSlides } from './components/IntroSlides';
import { StaffRequirement } from './components/StaffRequirement';

import {
  ArticleCard,
  BattleListItem,
  CharacterCard,
  Content,
  Head,
  Link as LinkComponent,
  PlayerCard,
  TournamentCard,
} from '@/components';
import { TopPageDocument, TopPageQuery, theme, fetchGraphql, pagesPath, resolveUrlObject } from '@/lib';

const useStyles = makeStyles(() =>
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
  const router = useRouter();

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
          <Button href={resolveUrlObject(router, pagesPath.tournaments.$url())} component={LinkComponent}>
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
          <Button href={resolveUrlObject(router, pagesPath.battles.$url())} component={LinkComponent}>
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
          <Button href={resolveUrlObject(router, pagesPath.players.$url())} component={LinkComponent}>
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
          <Button href={resolveUrlObject(router, pagesPath.characters.$url())} component={LinkComponent}>
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
          <Button href={resolveUrlObject(router, pagesPath.articles.$url())} component={LinkComponent}>
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
