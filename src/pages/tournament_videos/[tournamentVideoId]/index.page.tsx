import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

const Page: React.FC = () => null;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tournamentVideoId = params?.tournamentVideoId as string;
  const id_map: { [key: string]: string } = {
    '190': '327',
    '191': '281',
    '192': '328',
    '193': '189',
    '194': '332',
    '195': '333',
    '196': '330',
    '198': '283',
    '199': '337',
    '200': '339',
  };

  return {
    redirect: {
      permanent: true,
      destination: `https://tekken.yarouyo.com/tournaments/${id_map[tournamentVideoId]}`,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { tournamentVideoId: '190' } },
      { params: { tournamentVideoId: '191' } },
      { params: { tournamentVideoId: '192' } },
      { params: { tournamentVideoId: '193' } },
      { params: { tournamentVideoId: '194' } },
      { params: { tournamentVideoId: '195' } },
      { params: { tournamentVideoId: '196' } },
      { params: { tournamentVideoId: '198' } },
      { params: { tournamentVideoId: '199' } },
      { params: { tournamentVideoId: '200' } },
    ],
    fallback: 'blocking',
  };
};

export default Page;
