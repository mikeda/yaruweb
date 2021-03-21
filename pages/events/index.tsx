import React from 'react';

import { useEventsQuery } from '@/lib/graphql/types';
import { NotFound } from '@/components/NotFound';
import { Media } from '@/components/Media';
import dayjs from '@/lib/dayjs';

const Page: React.FC = () => {
  const { data, loading, fetchMore } = useEventsQuery({ variables: { first: 10 } });
  if (loading) return <NotFound>読み込み中</NotFound>;

  const events = data?.events.nodes;
  const pageInfo = data?.events.pageInfo;
  if (!(events && pageInfo && events.length > 0)) return <NotFound>イベントがありません。</NotFound>;

  return (
    <>
      <div className="bl_section">
        <div className="bl_section_body">
          <div className="bl_mediaUnit">
            {events.map(event => {
              if (!event) return;

              return (
                <Media
                  key={event.id}
                  imageUrl={event.imageUrl}
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

      {pageInfo.hasNextPage && (
        <div className="bl_box bl_box__unbordered bl_box__c">
          <div
            className="el_btn"
            onClick={() => {
              fetchMore({
                variables: { after: pageInfo.endCursor },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;

                  const prevNodes = prev.events.nodes;
                  const nodes = fetchMoreResult.events.nodes;
                  if (!(prevNodes && nodes)) return prev;

                  return {
                    ...fetchMoreResult,
                    events: {
                      ...fetchMoreResult.events,
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
