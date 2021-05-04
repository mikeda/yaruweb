import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { StageFragment, StagesDocument, StagesQuery } from '@/lib/graphql/types';
import { GetStaticProps } from 'next';
import React from 'react';

interface Props {
  stages: StageFragment[];
}

const Page: React.FC<Props> = ({ stages }) => {
  return (
    <Content>
      <Head title="ステージ" />

      {stages.map(stage => (
        <div key={stage.id}>
          {stage.name}
          <img src={stage.mainImageUrl} />
        </div>
      ))}
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: StagesQuery = await fetchGraphql(StagesDocument);

  return { props: { stages: data.stages }, revalidate: 60 };
};

export default Page;
