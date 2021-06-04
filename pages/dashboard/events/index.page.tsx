import React from 'react';

import { useEventsQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import Link from 'next/link';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { Paging } from '@/components/blocks/Paging';

const Page: React.FC = () => (
  <DashboardContent activeTab="event">
    <Head title="イベント一覧" />

    <PageHeader title="イベント" addPageUrl={Routes.dashboard.event.new()} />

    <EventList />
  </DashboardContent>
);

const EventList: React.FC = () => {
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
      <div className="bl_horizTable">
        <table>
          <thead>
            <tr>
              <th>タイトル</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.events.records.map(event => {
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

      {data && <Paging paging={data.events.paging} url={url} />}
    </>
  );
};

export default Page;
