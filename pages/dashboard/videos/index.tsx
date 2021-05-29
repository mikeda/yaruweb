import React from 'react';

import { useDeleteVideoMutation, useVideosQuery, VideosQuery } from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import Link from 'next/link';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Head } from '@/components/layouts/Head';
import { useRouter } from 'next/router';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { Paging } from '@/components/blocks/Paging';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { page } = router.query;
  const { data, loading, refetch } = useVideosQuery({
    variables: { page: page ? Number(page as string) : 1 },
    fetchPolicy: 'network-only',
    skip: !router.isReady,
  });

  setLoading(loading);

  const title = '動画';

  return (
    <DashboardContent activeTab="video">
      <Head title={title} />
      <Breadcrumbs current={title} />
      <PageHeader title={title} />

      {data && (
        <>
          <VideoList data={data} onDelete={refetch} />
          <Paging paging={data.videos.paging} url={Routes.dashboard.video.index} />
        </>
      )}
    </DashboardContent>
  );
};

const VideoList: React.FC<{ data: VideosQuery; onDelete: () => void }> = ({
  data: {
    videos: { records: videos },
  },
  onDelete,
}) => {
  const setLoading = useSetRecoilState(loadingState);
  const [deleteVideo, { loading }] = useDeleteVideoMutation({
    onCompleted: data => {
      if (!data.deleteVideo) return;

      onDelete();
      toast.success('動画を削除しました。');
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  setLoading(loading);

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
            return (
              <tr key={video.id}>
                <td>{video.title}</td>
                <td>
                  <Link href={Routes.dashboard.video.edit(video.id)}>
                    <a>編集</a>
                  </Link>
                  /
                  <a
                    onClick={() => {
                      deleteVideo({ variables: { videoId: video.id } });
                    }}
                  >
                    削除
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

export default Page;
