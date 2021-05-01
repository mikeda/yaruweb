import React from 'react';

import { useEventsQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import Link from 'next/link';
import { Routes } from '@/lib/Routes';
import { Heading } from '@/components/Heading';
import { ReadMore } from '@/components/blocks/ReadMore';

const Page: React.FC = () => (
  <DashboardContent activeTab="event">
    <Head title="イベント一覧" />

    <Heading lv="h1">記事</Heading>

    <EventList />
  </DashboardContent>
);

const EventList: React.FC = () => {
  const { data, loading, fetchMore } = useEventsQuery({ variables: { first: 10 } });
  if (loading) return <NotFound>読み込み中</NotFound>;
  if (!data) return <NotFound>読み込みに失敗しました</NotFound>;

  const events = data.events.nodes;
  if (!(events && events.length > 0)) return <NotFound>イベントがありません。</NotFound>;
  const pageInfo = data.events.pageInfo;

  return (
    <>
      <div className="bl_horizTable">
        <table>
          <thead>
            <tr>
              <th>タイトル</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => {
              if (!event) return;

              return (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>
                    <Link href={Routes.dashboard.event.edit(event.id)}>
                      <a>編集</a>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {data.events.pageInfo?.hasNextPage && (
        <ReadMore
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
        />
      )}
    </>
  );
};

export default Page;
