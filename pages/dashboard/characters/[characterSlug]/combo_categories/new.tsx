import React from 'react';

import {
  CharacterDocument,
  CharacterFragment,
  CharacterQuery,
  ComboCategoryAttributes,
  useCreateComboCategoryMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ComboCategoryForm } from '@/components/ComboCategoryForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';

interface Props {
  character: CharacterFragment;
}

const Page: React.FC<Props> = ({ character }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createComboCategory, { loading }] = useCreateComboCategoryMutation({
    onCompleted: () => {
      toast.success('コンボカテゴリを登録しました。');
      router.push(Routes.dashboard.comboCategory.index(character.slug));
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ComboCategoryAttributes) => {
    createComboCategory({ variables: { characterSlug: character.slug, attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="character">
      <Head title="コンボカテゴリ作成" />

      <PageHeader title="コンボカテゴリ作成" />

      <ComboCategoryForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const characterSlug = params?.characterSlug as string;
  const data: CharacterQuery = await fetchGraphql(CharacterDocument, { characterSlug });

  return { props: { character: data.character } };
};

export default Page;
