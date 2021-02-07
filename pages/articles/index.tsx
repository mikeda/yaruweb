import React from 'react';
import { useRouter } from 'next/router';

import { Order, useArticlesQuery } from '@/lib/graphql/types';
import { TabLinkGroup } from '@/components/blocks/TabLinkGroup';
import { Routes } from '@/lib/Routes';
import { NotFound } from '@/components/NotFound';
import { Media } from '@/components/Media';

const Page: React.FC = () => {
  const router = useRouter();
  const order = router.query.order === 'popular' ? Order.Popular : Order.New;

  const { data, loading, fetchMore } = useArticlesQuery({ variables: { first: 10, order: order } });
  if (loading) return <NotFound>読み込み中</NotFound>;

  const articles = data?.articles.nodes;
  const pageInfo = data?.articles.pageInfo;
  if (!(articles && pageInfo && articles.length > 0)) return <NotFound>記事がありません。</NotFound>;

  return (
    <>
      <TabLinkGroup
        links={[
          { href: Routes.articles(), text: '新着', active: order == Order.New },
          { href: Routes.articles(Order.Popular), text: '人気', active: order == Order.Popular },
        ]}
      />
      <div className="bl_section">
        <div className="bl_section_body">
          <div className="bl_mediaUnit">
            {articles.map(article => {
              if (!article) return;

              return (
                <Media
                  key={article.id}
                  href={Routes.article(article.id)}
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
