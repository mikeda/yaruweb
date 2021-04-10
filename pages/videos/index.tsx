import React from 'react';
import { useRouter } from 'next/router';

import { Order, useVideosQuery } from '@/lib/graphql/types';
import { VideoCard } from '@/components/VideoCard';
import { Routes } from '@/lib/Routes';
import { TabLinkGroup } from '@/components/blocks/TabLinkGroup';
import { NotFound } from '@/components/NotFound';
import { TabLink } from '@/components/blocks/TabLink';

const Page: React.FC = () => {
  const router = useRouter();
  const order = router.query.order === 'popular' ? Order.Popular : Order.New;

  const { data, loading, fetchMore } = useVideosQuery({ variables: { first: 20, order: order } });
  if (loading) return <NotFound>読み込み中</NotFound>;
  const videos = data?.videos.nodes;
  if (!(data && videos)) return <NotFound>動画がありません。</NotFound>;
  const pageInfo = data.videos.pageInfo;

  return (
    <>
      <TabLinkGroup>
        <TabLink text="新着" href={Routes.videos()} active={order === Order.New} />
        <TabLink text="人気" href={Routes.videos(Order.Popular)} active={order === Order.Popular} />
      </TabLinkGroup>

      <div className="ly_row ly_row__mg_md">
        {videos.map(video => {
          if (!video) return null;

          return (
            <div className="ly_col_6 ly_mbCol_12" key={video.id}>
              <VideoCard video={video} />
            </div>
          );
        })}
      </div>

      {pageInfo.hasNextPage && (
        <div className="bl_box bl_box__unbordered bl_box__c">
          <div
            className="el_btn"
            onClick={() => {
              fetchMore({
                variables: { after: pageInfo.endCursor },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;

                  const prevNodes = prev.videos.nodes;
                  const nodes = fetchMoreResult.videos.nodes;
                  if (!(prevNodes && nodes)) return prev;

                  return {
                    ...fetchMoreResult,
                    videos: {
                      ...fetchMoreResult.videos,
                      nodes: [...prevNodes, ...nodes],
                    },
                  };
                },
              });
            }}
          >
            次のページ
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
