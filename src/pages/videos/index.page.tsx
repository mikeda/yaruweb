import React from 'react';
import { useRouter } from 'next/router';

import { useVideosQuery } from '@/lib/graphql/types';
import { VideoCard } from '@/components/VideoCard';
import { Routes } from '@/lib/Routes';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { Paging } from '@/components/Paging';

const PageContent: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { page } = router.query;
  const { data, loading } = useVideosQuery({
    variables: { page: page ? Number(page as string) : 1 },
    skip: !router.isReady,
  });

  setLoading(loading);

  return (
    <>
      <div className="ly_row ly_row__mg_md">
        {data?.videos.records.map(video => {
          if (!video) return null;

          return (
            <div className="ly_col_6 ly_smCol_12" key={video.id}>
              <VideoCard video={video} />
            </div>
          );
        })}
      </div>

      {data && <Paging paging={data.videos.paging} url={Routes.video.index} />}
    </>
  );
};

const Page: React.FC = () => {
  return (
    <Content>
      <Head title="鉄拳7動画まとめ" />
      <Breadcrumbs current="動画" />

      <PageContent />
    </Content>
  );
};

export default Page;
