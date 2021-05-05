import React from 'react';

import {
  ComboCategoryDocument,
  ComboCategoryQuery,
  ComboCategoryWithCharacterFragment,
  ComboAttributes,
  useCreateComboMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ComboForm } from '@/components/ComboForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';

interface Props {
  comboCategory: ComboCategoryWithCharacterFragment;
}

const Page: React.FC<Props> = ({ comboCategory }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createCombo, { loading }] = useCreateComboMutation({
    onCompleted: () => {
      toast.success('コンボを登録しました。');
      router.push(Routes.dashboard.combo.index(comboCategory.id));
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ComboAttributes) => {
    createCombo({ variables: { comboCategoryId: comboCategory.id, attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="character">
      <Head title="コンボ作成" />

      <PageHeader title="コンボ作成" />

      <ComboForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const comboCategoryId = params?.comboCategoryId as string;
  const data: ComboCategoryQuery = await fetchGraphql(ComboCategoryDocument, { comboCategoryId });

  return { props: { comboCategory: data.comboCategory } };
};

export default Page;
