import React from 'react';

import { PageTournamentDocument, PageTournamentQuery } from '@/lib/graphql/types';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Heading, NotFound } from '@/components';
import dayjs from '@/lib/dayjs';
import { TournamentVideoCard } from '@/components/TournamentVideoCard';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import { NO_IMAGE_URL } from '@/lib/Assets';

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
          <Typography variant="body1" color="textSecondary" component="p">
            {dayjs(tournament.startsAt).format('YYYY/M/D H:mm')}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {tournament.description}
          </Typography>
        </CardContent>

        <CardActions>
          <Button href={tournament.url} target="_blank" size="small" color="primary">
            大会情報
          </Button>
          {tournament.streamingUrl && (
            <Button href={tournament.streamingUrl} target="_blank" size="small" color="primary">
              配信
            </Button>
          )}
        </CardActions>
      </Card>

      <Heading lv="h2">動画</Heading>

      {tournament.videos.length === 0 ? (
        <NotFound>動画が登録されていません。</NotFound>
      ) : (
        <>
          <Grid container spacing={2}>
            {tournament.videos.map(video => (
              <Grid item key={video.id} xs={12} sm={6} md={4}>
                <TournamentVideoCard tournamentVideo={video} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
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
      <Head title={tournament.name} />

      <PageContent tournament={tournament} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps<PageTournamentQuery> = async ({ params }) => {
  const tournamentId = params?.tournamentId as string;
  const data: PageTournamentQuery = await fetchGraphql(PageTournamentDocument, { tournamentId });

  return {
    props: data,
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
