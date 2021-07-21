import React from 'react';

import { PageTournamentVideoQuery, PageTournamentVideoDocument } from '@/lib/graphql/types';
import { VideoMedia } from '@/components/VideoMedia';
import { TournamentVideoIdCommentsBlock } from '@/components';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Box } from '@material-ui/core';

const PageContent: React.FC<PageTournamentVideoQuery> = ({ tournamentVideo }) => {
  return (
    <>
      <Box mb={4}>
        <VideoMedia video={tournamentVideo} />
      </Box>

      <TournamentVideoIdCommentsBlock tournamentVideoId={tournamentVideo.id} />
    </>
  );
};

const Page: React.FC<PageTournamentVideoQuery> = data => {
  const video = data.tournamentVideo;

  return (
    <Content
      activeTab="tournaments"
      title={video.title}
      breadcrumb={<Breadcrumbs to="tournamentVideo" tournamentVideo={video} />}
    >
      <Head title={video.title} />

      <PageContent {...data} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tournamentVideoId = params?.tournamentVideoId as string;
  const data: PageTournamentVideoQuery = await fetchGraphql(PageTournamentVideoDocument, { tournamentVideoId });

  return { props: data, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
