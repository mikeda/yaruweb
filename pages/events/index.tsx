import React from 'react';

import { useEventsQuery } from '@/lib/graphql/types';
import { Media } from '@/components/Media';
import dayjs from '@/lib/dayjs';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Routes } from '@/lib/Routes';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { Paging } from '@/components/blocks/Paging';

const PageContent: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { query } = router;
  const page = query.page ? Number(query.page as string) : 1;
  const { data, loading } = useEventsQuery({
    variables: { page },
    skip: !router.isReady,
  });

  const url = (page: number) => Routes.event.index({ page });

  setLoading(loading);

  return (
    <>
      <div className="bl_section">
        <div className="bl_section_body">
          <div className="bl_mediaUnit">
            {data?.events.records.map(event => {
              if (!event) return;

              return (
                <Media
                  key={event.id}
                  imageUrl={event.mainImageUrl}
                  title={event.name}
                  titleNote={dayjs(event.startsAt).format('YYYY/M/D H:mm')}
                  text={event.description}
                  footer={
                    <>
                      <a href={event.url} target="_blank" rel="noreferrer" className="el_btn hp_mg_r_sm">
                        イベント情報
                      </a>

                      {event.streamingUrl && (
                        <a href={event.streamingUrl} target="_blank" rel="noreferrer" className="el_btn hp_mg_r_sm">
                          配信
                        </a>
                      )}

                      {event.videoUrl && (
                        <a href={event.videoUrl} target="_blank" rel="noreferrer" className="el_btn hp_mg_r_sm">
                          アーカイブ
                        </a>
                      )}
                    </>
                  }
                />
              );
            })}
          </div>
        </div>
      </div>

      {data && <Paging paging={data.events.paging} url={url} />}
    </>
  );
};

const Page: React.FC = () => {
  return (
    <Content>
      <Head title="鉄拳7のイベントまとめ" />
      <Breadcrumbs current="イベント" />

      <PageContent />
    </Content>
  );
};

export default Page;
