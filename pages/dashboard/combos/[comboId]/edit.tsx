import React from 'react';

import { ComboAttributes, ComboDocument, ComboQuery, ComboFragment, useUpdateComboMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { toast } from 'react-toastify';
import { ComboForm } from '@/components/ComboForm';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';

interface Props {
  combo: ComboFragment;
}

const Page: React.FC<Props> = ({ combo }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateCombo, { loading }] = useUpdateComboMutation({
    onCompleted: () => {
      toast.success('コンボを更新しました。');
      router.push(Routes.dashboard.combo.index(combo.comboCategory.id));
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ComboAttributes) => {
    updateCombo({ variables: { comboId: combo.id, attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="character">
      <Head title={combo.name} />

      <PageHeader title={combo.name} />

      <ComboForm combo={combo} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const comboId = params?.comboId as string;
  const data: ComboQuery = await fetchGraphql(ComboDocument, { comboId });

  return { props: { combo: data.combo } };
};

export default Page;
