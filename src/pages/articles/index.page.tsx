import React from 'react';
import { useRouter } from 'next/router';

import { Order, useArticlesQuery } from '@/lib/graphql/types';
import { TabLinkGroup } from '@/components/TabLinkGroup';
import { Routes } from '@/lib/Routes';
import { Media } from '@/components/Media';
import { Head } from '@/components/layouts/Head';
import { TabLink } from '@/components/TabLinkGroup';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { Paging } from '@/components/Paging';

const Page: React.FC = () => {
  return (
    <Content>
      <Head title="鉄拳7の記事一覧" />
      <Breadcrumbs items={[{ name: '記事' }]} />

      <PageContent />
    </Content>
  );
};

const PageContent: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { query } = router;
  const page = query.page ? Number(query.page as string) : 1;
  const order = query.order === 'popular' ? Order.Popular : Order.New;
  const { data, loading } = useArticlesQuery({
    variables: { page, order },
    skip: !router.isReady,
  });

  const url = (page: number) => Routes.article.index({ page, order });
  setLoading(loading);

  return (
    <>
      <TabLinkGroup>
        <TabLink text="新着" href={Routes.article.index()} active={order === Order.New} />
        <TabLink text="人気" href={Routes.article.index({ order: Order.Popular })} active={order === Order.Popular} />
      </TabLinkGroup>

      <div className="bl_section">
        <div className="bl_section_body">
          <div className="bl_mediaUnit">
            {data?.articles.records.map(article => {
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

      {data && <Paging paging={data.articles.paging} url={url} />}
    </>
  );
};

export default Page;
