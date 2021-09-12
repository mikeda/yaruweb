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
    paths: [],
    fallback: 'blocking',
  };
};

export default Page;
