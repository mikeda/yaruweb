import React from 'react';

import {
  MoveCategoryAttributes,
  MoveCategoryDocument,
  MoveCategoryQuery,
  MoveCategoryWithCharacterFragment,
  useUpdateMoveCategoryMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { toast } from 'react-toastify';
import { MoveCategoryForm } from '@/components/MoveCategoryForm';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';

interface Props {
  moveCategory: MoveCategoryWithCharacterFragment;
}

const Page: React.FC<Props> = ({ moveCategory }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateMoveCategory, { loading }] = useUpdateMoveCategoryMutation({
    onCompleted: () => {
      toast.success('技データカテゴリを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: MoveCategoryAttributes) => {
    updateMoveCategory({ variables: { moveCategoryId: moveCategory.id, attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="character">
      <Head title="技データカテゴリ更新" />

      <PageHeader title="技データカテゴリ更新" />

      <MoveCategoryForm moveCategory={moveCategory} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const moveCategoryId = params?.moveCategoryId as string;
  const data: MoveCategoryQuery = await fetchGraphql(MoveCategoryDocument, { moveCategoryId });

  return { props: { moveCategory: data.moveCategory } };
};

export default Page;
