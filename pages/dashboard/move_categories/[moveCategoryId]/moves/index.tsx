import React from 'react';

import { MoveCategoryDetailDocument, MoveCategoryDetailFragment, MoveCategoryDetailQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Heading } from '@/components/Heading';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { VideoPlayer } from '@/components/MoveMedia/VideoPlayer';
import { VideoDropzone } from '@/components/MoveMedia/VideoDropzone';

interface Props {
  moveCategory: MoveCategoryDetailFragment;
}

const Page: React.FC<Props> = ({ moveCategory }) => {
  const title = `コマンドリスト(${moveCategory.character.longName}/${moveCategory.name})`;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />

      <Heading lv="h1">{title}</Heading>

      <PageContent moveCategory={moveCategory} />
    </DashboardContent>
  );
};

const PageContent: React.FC<Props> = ({ moveCategory }) => {
  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th>動画</th>
            <th>アップロード</th>
          </tr>
        </thead>
        <tbody>
          {moveCategory.moves.map(move => {
            return (
              <tr key={move.id}>
                <td>{move.name}</td>
                <td style={{ width: 320 }}>
                  {move.moveVideo && (
                    <VideoPlayer src={move.moveVideo.m3u8Url} thumnailUrl={move.moveVideo.thumbnailUrl} />
                  )}
                </td>
                <td>
                  <VideoDropzone moveId={move.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const moveCategoryId = params?.moveCategoryId as string;
  const data: MoveCategoryDetailQuery = await fetchGraphql(MoveCategoryDetailDocument, { moveCategoryId });

  return { props: { moveCategory: data.moveCategory } };
};

export default Page;
