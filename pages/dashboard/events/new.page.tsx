import React from 'react';

import { EventAttributes, useCreateEventMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { EventForm } from '@/components/EventForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createEvent, { loading }] = useCreateEventMutation({
    onCompleted: () => {
      toast.success('イベントを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: EventAttributes) => {
    createEvent({ variables: { attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="event">
      <Head title="イベント作成" />

      <PageHeader title="イベント作成" />

      <EventForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
