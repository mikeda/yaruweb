import React, { useState } from 'react';

import { ParsedUrlQuery } from 'querystring';

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
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import { NotFound, Content, Head, Breadcrumbs, TournamentVideoPlayer } from '@/components';
import { pagesPath } from '@/generated/$path';
import {
  SsgTournamentPathsDocument,
  SsgTournamentPathsQuery,
  TournamentPageDocument,
  TournamentPageQuery,
  TournamentPageQueryVariables,
  TournamentVideoPlayerFragment,
} from '@/generated/graphql';
import { dayjs, fetchGraphql, DEFAULT_AVATAR_URL, NO_IMAGE_URL, placeIconUrl } from '@/lib';

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
  const [videoIndex, setVideoIndex] = useState(0);

  return (
    <>
      <Card>
        <CardMedia image={tournament.mainImageUrl || NO_IMAGE_URL} title={tournament.name} className={classes.media} />
        <CardContent>
          <Typography variant='h3'>開催日時</Typography>
          <Typography variant='body1' color='textSecondary' component='p'>
            {dayjs(tournament.startsAt).format('YYYY/M/D H:mm')}
          </Typography>

          <Box mt={2}>
            <Typography variant='h3'>大会概要</Typography>
            <Typography variant='body2' color='textSecondary' component='p' sx={{ whiteSpace: 'pre-line' }}>
              {tournament.description}
            </Typography>
          </Box>

          <Box mt={2}>
            <Button href={tournament.url} target='_blank' color='primary'>
              大会URL
            </Button>
            {tournament.streamingUrl && (
              <Button href={tournament.streamingUrl} target='_blank' color='primary'>
                配信URL
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Typography variant='h2' gutterBottom>
          結果
        </Typography>

        {tournament.standings.length === 0 ? (
          <NotFound>対戦結果が登録されていません。</NotFound>
        ) : (
          <Paper>
            <List component='div'>
              {tournament.standings
                .sort((a, b) => a.place - b.place)
                .map(standing => (
                  <Link key={standing.id} href={pagesPath.players._slug(standing.player.slug).$url()} passHref>
                    <ListItem button component='a'>
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

      <Box mt={4}>
        <Typography variant='h2' gutterBottom>
          対戦動画
        </Typography>

        {tournament.videos.length === 0 ? (
          <NotFound>対戦動画が登録されていません。</NotFound>
        ) : (
          <Paper square>
            {tournament.videos.length > 1 && (
              <Tabs value={videoIndex} indicatorColor='primary' textColor='primary' variant='fullWidth'>
                {tournament.videos
                  .sort((a, b) => dayjs(a.publishedAt).unix() - dayjs(b.publishedAt).unix())
                  .map((video, i) => (
                    <Tab
                      key={video.id}
                      value={i}
                      label={`動画 ${i + 1}`}
                      onClick={() => {
                        setVideoIndex(i);
                      }}
                    />
                  ))}
              </Tabs>
            )}

            <TournamentVideoPlayer tournamentVideo={tournament.videos[videoIndex] as TournamentVideoPlayerFragment} />
          </Paper>
        )}
      </Box>
    </>
  );
};

const Page: React.FC<TournamentPageQuery> = ({ tournament }) => {
  return (
    <Content
      activeTab='tournaments'
      title={tournament.name}
      breadcrumb={<Breadcrumbs to='tournament' tournament={tournament} />}
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
  const tournamentId = params?.id as string;
  const variables: TournamentPageQueryVariables = { tournamentId };
  const data: TournamentPageQuery = await fetchGraphql(TournamentPageDocument, variables);

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: SsgTournamentPathsQuery = await fetchGraphql(SsgTournamentPathsDocument);

  const paths = data.tournaments.nodes.map(({ id }) => ({ params: { id } }));

  return { paths, fallback: 'blocking' };
};

export default Page;
