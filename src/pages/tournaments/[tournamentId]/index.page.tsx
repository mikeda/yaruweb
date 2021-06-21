import React from 'react';

import { PageTournamentDocument, PageTournamentQuery } from '@/lib/graphql/types';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Card, Heading, Media, NotFound } from '@/components';
import dayjs from '@/lib/dayjs';
import { path } from '@/lib';

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
          {tournament.videos.map(video => (
            <Card
              key={video.id}
              title={video.title}
              imageUrl={video.thumbnailUrl}
              href={path({ to: 'tournamentVideo', tournamentVideoId: video.id })}
            />
          ))}
        </>
      )}
    </>
  );
};

const Page: React.FC<PageTournamentQuery> = ({ tournament }) => {
  return (
    <Content>
      <Head title={tournament.name} />
      <Breadcrumbs to="tournament" tournament={tournament} />
      <PageHeader title={tournament.name} />

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
