import React from 'react';
import { useRouter } from 'next/router';

import { Order, useArticlesQuery } from '@/lib/graphql/types';
import { TabLinkGroup } from '@/components/blocks/TabLinkGroup';
import { Routes } from '@/lib/Routes';
import { NotFound } from '@/components/NotFound';
import { Media } from '@/components/Media';
import { Head } from '@/components/layouts/Head';
import { TabLink } from '@/components/blocks/TabLink';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';

const Page: React.FC = () => {
  return (
    <Content>
      <Head title="鉄拳7の記事一覧" />
      <Breadcrumbs current="記事" />

      <PageContent />
    </Content>
  );
};

const PageContent: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const order = router.query.order === 'popular' ? Order.Popular : Order.New;

  const { data, loading, fetchMore } = useArticlesQuery({ variables: { first: 10, order: order } });
  setLoading(loading);
  if (loading) return <NotFound>読み込み中</NotFound>;

  const articles = data?.articles.nodes;
  const pageInfo = data?.articles.pageInfo;
  if (!(articles && pageInfo && articles.length > 0)) return <NotFound>記事がありません。</NotFound>;

  return (
    <>
      <TabLinkGroup>
        <TabLink text="新着" href={Routes.article.index()} active={order === Order.New} />
        <TabLink text="人気" href={Routes.article.index({ order: Order.Popular })} active={order === Order.Popular} />
      </TabLinkGroup>

      <div className="bl_section">
        <div className="bl_section_body">
          <div className="bl_mediaUnit">
            {articles.map(article => {
              if (!article) return;

              return (
                <Media
                  key={article.id}
                  href={Routes.article.detail(article.id)}
                  imageUrl={article.mainImageUrl}
                  title={article.title}
                  text={article.description}
                />
              );
            })}
          </div>
        </div>
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

                  const prevNodes = prev.articles.nodes;
                  const nodes = fetchMoreResult.articles.nodes;
                  if (!(prevNodes && nodes)) return prev;

                  return {
                    ...fetchMoreResult,
                    articles: {
                      ...fetchMoreResult.articles,
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
