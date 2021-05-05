import React from 'react';

import {
  MoveCategoryDocument,
  MoveCategoryQuery,
  MoveCategoryWithCharacterFragment,
  MoveAttributes,
  useCreateMoveMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { MoveForm } from '@/components/MoveForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';

interface Props {
  moveCategory: MoveCategoryWithCharacterFragment;
}

const Page: React.FC<Props> = ({ moveCategory }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createMove, { loading }] = useCreateMoveMutation({
    onCompleted: () => {
      toast.success('技データを登録しました。');
      router.push(Routes.dashboard.move.index(moveCategory.id));
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: MoveAttributes) => {
    createMove({ variables: { moveCategoryId: moveCategory.id, attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="character">
      <Head title="技データ作成" />

      <PageHeader title="技データ作成" />

      <MoveForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const moveCategoryId = params?.moveCategoryId as string;
  const data: MoveCategoryQuery = await fetchGraphql(MoveCategoryDocument, { moveCategoryId });

  return { props: { moveCategory: data.moveCategory } };
};

export default Page;
