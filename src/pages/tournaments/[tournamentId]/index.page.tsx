import React from 'react';
import Link from 'next/link';

import { PageTournamentDocument, PageTournamentQuery } from '@/lib/graphql/types';
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
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { DEFAULT_AVATAR_URL, NO_IMAGE_URL, placeIconUrl } from '@/lib/Assets';
import { path } from '@/lib';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
});

const PageContent: React.FC<PageTournamentQuery> = ({ tournament }) => {
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
            <Typography variant="body2" color="textSecondary" component="p">
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
            <List>
              {tournament.standings
                .sort((a, b) => a.place - b.place)
                .map(standing => (
                  <ListItem key={standing.id}>
                    <ListItemAvatar>
                      <img src={placeIconUrl(standing.place)} width={38} height={44} />
                    </ListItemAvatar>

                    <ListItemAvatar>
                      <Avatar src={standing.player.avatarUrl || DEFAULT_AVATAR_URL} />
                    </ListItemAvatar>

                    <ListItemText primary={standing.player.name} />
                  </ListItem>
                ))}
            </List>
          </Paper>
        )}
      </Box>

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          大会動画
        </Typography>

        {tournament.videos.length === 0 ? (
          <NotFound>動画が登録されていません。</NotFound>
        ) : (
          <Paper>
            <List component="div">
              {tournament.videos.map(video => (
                <Link key={video.id} href={path({ to: 'tournamentVideo', tournamentVideoId: video.id })} passHref>
                  <ListItem button component="a">
                    <ListItemText primary={video.title} secondary={`対戦動画 ${video.battlesCount}`} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </>
  );
};

const Page: React.FC<PageTournamentQuery> = ({ tournament }) => {
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

export const getStaticProps: GetStaticProps<PageTournamentQuery> = async ({ params }) => {
  const tournamentId = params?.tournamentId as string;
  const data: PageTournamentQuery = await fetchGraphql(PageTournamentDocument, { tournamentId });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
