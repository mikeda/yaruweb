import React from 'react';

import { PageTournamentDocument, PageTournamentQuery } from '@/lib/graphql/types';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Heading, Media, NotFound } from '@/components';
import dayjs from '@/lib/dayjs';
import { TournamentVideoCard } from '@/components/TournamentVideoCard';
import { Grid } from '@material-ui/core';

const PageContent: React.FC<PageTournamentQuery> = ({ tournament }) => {
  return (
    <>
      <Media
        key={tournament.id}
        imageUrl={tournament.mainImageUrl}
        title={tournament.name}
        titleNote={dayjs(tournament.startsAt).format('YYYY/M/D H:mm')}
        text={tournament.description}
        footer={
          <>
            <a href={tournament.url} target="_blank" rel="noreferrer" className="el_btn hp_mg_r_sm">
              大会情報URL
            </a>

            {tournament.streamingUrl && (
              <a href={tournament.streamingUrl} target="_blank" rel="noreferrer" className="el_btn hp_mg_r_sm">
                配信URL
              </a>
            )}
          </>
        }
      />

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
