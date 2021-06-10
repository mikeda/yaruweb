import React from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { Routes } from '@/lib/Routes';
import { useDeleteEventMutation, usePageDashboardEventsQuery, Event } from '@/lib/graphql/types';
import { DashboardContent, PageHeader, Breadcrumbs, Head, Paging, ObjectCardList } from '@/components';
import { loadingState } from 'states/loading';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { query } = router;
  const page = query.page ? Number(query.page as string) : 1;
  const { data, loading, refetch } = usePageDashboardEventsQuery({
    variables: { page },
    fetchPolicy: 'network-only',
    skip: !router.isReady,
  });

  setLoading(loading);
  if (!data) return null;

  const {
    events: { records: events, paging },
  } = data;

  setLoading(loading);

  const title = 'イベント';

  return (
    <DashboardContent activeTab="event">
      <Head title={title} />
      <Breadcrumbs current={title} />
      <PageHeader title={title} />
      <PageContent events={events} refetch={refetch} />
      <Paging paging={paging} url={Routes.dashboard.event.index} />
    </DashboardContent>
  );
};

type EventFragment = Pick<Event, 'id' | 'name'>;

interface PageContentProps {
  events: EventFragment[];
  refetch: () => void;
}

const PageContent: React.FC<PageContentProps> = ({ events, refetch }) => {
  const setLoading = useSetRecoilState(loadingState);

  const [deleteEvent, { loading: deleteLoading }] = useDeleteEventMutation({
    onCompleted: data => {
      const event = data.deleteEvent?.event;
      if (!event) return;
      refetch();
      toast.success('イベントを削除しました。');
    },
  });

  setLoading(deleteLoading);

  return (
    <ObjectCardList
      items={events.map(event => ({
        id: event.id,
        title: event.name,
        links: [
          { text: '編集する', url: Routes.dashboard.event.edit(event.id) },
          {
            text: '削除する',
            onClick: () => {
              if (window.confirm('イベントを削除します。')) {
                deleteEvent({ variables: { eventId: event.id } });
              }
            },
          },
        ],
      }))}
    />
  );
};

export default Page;
