import React from 'react';

import { useVideosQuery } from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import Link from 'next/link';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Head } from '@/components/layouts/Head';

const Page: React.FC = () => {
  const title = '動画';

  return (
    <DashboardContent activeTab="video">
      <Head title={title} />
      <Breadcrumbs current={title} />
      <PageHeader title={title} />

      <VideoList />
    </DashboardContent>
  );
};

const VideoList: React.FC = () => {
  const { data, loading } = useVideosQuery();
  if (loading) return <NotFound>読み込み中</NotFound>;

  const videos = data?.videos.nodes;
  if (!(videos && videos.length > 0)) return <NotFound>イベントがありません。</NotFound>;

  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {videos.map(video => {
            if (!video) return;

            return (
              <tr key={video.id}>
                <td>{video.title}</td>
                <td>
                  <Link href={Routes.dashboard.video.edit(video.id)}>
                    <a>編集</a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
