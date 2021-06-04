import React from 'react';

import { EventAttributes, EventDocument, EventFragment, EventQuery, useUpdateEventMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { toast } from 'react-toastify';
import { EventForm } from '@/components/EventForm';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';

interface Props {
  event: EventFragment;
}

const Page: React.FC<Props> = ({ event }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateEvent, { loading }] = useUpdateEventMutation({
    onCompleted: () => {
      toast.success('イベントを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: EventAttributes) => {
    updateEvent({ variables: { eventId: event.id, attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="event">
      <Head title="イベント更新" />

      <PageHeader title="イベント更新" />

      <EventForm event={event} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const eventId = params?.eventId as string;
  const data: EventQuery = await fetchGraphql(EventDocument, { eventId });

  return { props: { event: data.event } };
};

export default Page;
