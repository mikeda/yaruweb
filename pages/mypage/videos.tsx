import React, { useState } from 'react';

import { useMyVideosQuery } from '@/lib/graphql/types';
import { Layout } from '@/pages-lib/mypage/Layout';
import { VideoFormModal } from '@/components/VideoModalForm';
import { NotFound } from '@/components/NotFound';

const VideoList: React.FC<{ videos: ({ id: string; title: string } | undefined | null)[] }> = ({ videos }) => {
  if (!(videos.length > 0)) return <NotFound>オススメ動画がありません。</NotFound>;

  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
          </tr>
        </thead>
        <tbody>
          {videos.map(video => {
            if (!video) return;

            return (
              <tr key={video.id}>
                <td>
                  <a href={`/videos/${video.id}`} target="_blank" rel="noreferrer">
                    {video.title}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Page: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading, refetch } = useMyVideosQuery();
  if (loading) return <NotFound>読み込み中</NotFound>;

  const videos = data?.myVideos.nodes;

  return (
    <>
      <VideoFormModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <Layout activeTab="videos">
        <div className="bl_myContHeader">
          <a
            className="el_btn"
            onClick={() => {
              setIsOpen(true);
              refetch();
            }}
          >
            投稿する
          </a>
        </div>

        {videos && <VideoList videos={videos} />}
      </Layout>
    </>
  );
};

export default Page;
