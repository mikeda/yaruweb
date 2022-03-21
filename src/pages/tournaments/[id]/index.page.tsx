import React from 'react';
import Link from 'next/link';

import {
  TournamentPageDocument,
  TournamentPageQuery,
  TournamentPathsDocument,
  TournamentPathsQuery,
} from '@/lib/graphql/types';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { NotFound } from '@/components';
import dayjs from '@/lib/dayjs';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { DEFAULT_AVATAR_URL, NO_IMAGE_URL, placeIconUrl } from '@/lib/Assets';
import { ParsedUrlQuery } from 'querystring';
import { pagesPath } from '@/lib/$path';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
});

const PageContent: React.FC<TournamentPageQuery> = ({ tournament }) => {
  const classes = useStyles();

  return (
    <>
      <Card>
        <CardMedia image={tournament.mainImageUrl || NO_IMAGE_URL} title={tournament.name} className={classes.media} />
        <CardContent>
          <Typography variant="h3">開催日時</Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {dayjs(tournament.startsAt).format('YYYY/M/D H:mm')}
          </Typography>

          <Box mt={4}>
            <Typography variant="h3">大会概要</Typography>
            <Typography variant="body2" color="textSecondary" component="p" sx={{ whiteSpace: 'pre-line' }}>
              {tournament.description}
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography variant="h3">リンク</Typography>
            <Button href={tournament.url} target="_blank" color="primary">
              大会情報
            </Button>
            {tournament.streamingUrl && (
              <Button href={tournament.streamingUrl} target="_blank" color="primary">
                配信
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          結果
        </Typography>

        {tournament.standings.length === 0 ? (
          <NotFound>結果が登録されていません。</NotFound>
        ) : (
          <Paper>
            <List component="div">
              {tournament.standings
                .sort((a, b) => a.place - b.place)
                .map(standing => (
                  <Link key={standing.id} href={pagesPath.players._slug(standing.player.slug).$url()} passHref>
                    <ListItem button component="a">
                      <ListItemAvatar>
                        <img src={placeIconUrl(standing.place)} width={38} height={44} />
                      </ListItemAvatar>

                      <ListItemAvatar>
                        <Avatar src={standing.player.avatarUrl || DEFAULT_AVATAR_URL} />
                      </ListItemAvatar>

                      <ListItemText primary={standing.player.name} />
                    </ListItem>
                  </Link>
                ))}
            </List>
          </Paper>
        )}
      </Box>

      <Box mt={4} p={2} component={Paper}>
        <Typography variant="h2" gutterBottom>
          対戦動画
        </Typography>

        {tournament.videos.length === 0 ? (
          <NotFound>動画が登録されていません。</NotFound>
        ) : (
          <List>
            {tournament.videos.map(tournamentVideo => (
              <Link key={tournamentVideo.id} href={pagesPath.tournament_videos._id(tournamentVideo.id).$url()} passHref>
                <ListItem component="a">
                  <ListItemText
                    primary={tournamentVideo.title}
                    secondary={`対戦登録 ${tournamentVideo.battlesCount}`}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        )}
      </Box>
    </>
  );
};

const Page: React.FC<TournamentPageQuery> = ({ tournament }) => {
  return (
    <Content
      activeTab="tournaments"
      title={tournament.name}
      breadcrumb={<Breadcrumbs to="tournament" tournament={tournament} />}
    >
      <Head title={tournament.name} image={tournament.mainImageUrl} />

      <PageContent tournament={tournament} />
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<TournamentPageQuery, Params> = async ({ params }) => {
  const data: TournamentPageQuery = await fetchGraphql(TournamentPageDocument, { tournamentId: params?.id });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: TournamentPathsQuery = await fetchGraphql(TournamentPathsDocument);

  const paths = data.allTournaments.map(({ id }) => ({ params: { id } }));

  return { paths, fallback: 'blocking' };
};

export default Page;
