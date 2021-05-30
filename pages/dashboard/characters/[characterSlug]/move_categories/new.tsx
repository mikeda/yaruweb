import React from 'react';

import {
  CharacterDocument,
  CharacterFragment,
  CharacterQuery,
  MoveCategoryAttributes,
  useCreateMoveCategoryMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { MoveCategoryForm } from '@/components/MoveCategoryForm';
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
  const [createMoveCategory, { loading }] = useCreateMoveCategoryMutation({
    onCompleted: () => {
      toast.success('技データカテゴリを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: MoveCategoryAttributes) => {
    createMoveCategory({ variables: { characterSlug: character.slug, attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="character">
      <Head title="技データカテゴリ作成" />

      <PageHeader title="技データカテゴリ作成" />

      <MoveCategoryForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const characterSlug = params?.characterSlug as string;
  const data: CharacterQuery = await fetchGraphql(CharacterDocument, { characterSlug });

  return { props: { character: data.character } };
};

export default Page;
