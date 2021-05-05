import React from 'react';

import {
  ComboCategoryAttributes,
  ComboCategoryDocument,
  ComboCategoryQuery,
  ComboCategoryWithCharacterFragment,
  useUpdateComboCategoryMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { toast } from 'react-toastify';
import { ComboCategoryForm } from '@/components/ComboCategoryForm';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';

interface Props {
  comboCategory: ComboCategoryWithCharacterFragment;
}

const Page: React.FC<Props> = ({ comboCategory }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateComboCategory, { loading }] = useUpdateComboCategoryMutation({
    onCompleted: () => {
      toast.success('コンボカテゴリを更新しました。');
      router.push(Routes.dashboard.comboCategory.index(comboCategory.character.slug));
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ComboCategoryAttributes) => {
    updateComboCategory({ variables: { comboCategoryId: comboCategory.id, attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="character">
      <Head title="コンボカテゴリ更新" />

      <PageHeader title="コンボカテゴリ更新" />

      <ComboCategoryForm comboCategory={comboCategory} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const comboCategoryId = params?.comboCategoryId as string;
  const data: ComboCategoryQuery = await fetchGraphql(ComboCategoryDocument, { comboCategoryId });

  return { props: { comboCategory: data.comboCategory } };
};

export default Page;
