import React from 'react';

import { MoveAttributes, MoveDocument, MoveQuery, MoveFragment, useUpdateMoveMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { toast } from 'react-toastify';
import { MoveForm } from '@/components/MoveForm';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';

interface Props {
  move: MoveFragment;
}

const Page: React.FC<Props> = ({ move }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateMove, { loading }] = useUpdateMoveMutation({
    onCompleted: () => {
      toast.success('技データを更新しました。');
      router.push(Routes.dashboard.move.index(move.moveCategory.id));
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: MoveAttributes) => {
    updateMove({ variables: { moveId: move.id, attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="character">
      <Head title={move.name} />

      <PageHeader title={move.name} />

      <MoveForm move={move} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const moveId = params?.moveId as string;
  const data: MoveQuery = await fetchGraphql(MoveDocument, { moveId });

  return { props: { move: data.move } };
};

export default Page;
