import React from 'react';

import {
  CharacterAttributes,
  CharacterDocument,
  CharacterFragment,
  CharacterQuery,
  useUpdateCharacterMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { toast } from 'react-toastify';
import { CharacterForm } from '@/components/CharacterForm';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';

interface Props {
  character: CharacterFragment;
}

const Page: React.FC<Props> = ({ character }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateCharacter, { loading }] = useUpdateCharacterMutation({
    onCompleted: () => {
      toast.success('キャラクターを更新しました。');
      router.push(Routes.dashboard.character.index());
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: CharacterAttributes) => {
    updateCharacter({ variables: { characterSlug: character.slug, attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="character">
      <Head title="キャラクター編集" />

      <PageHeader title="キャラクター編集" />

      <CharacterForm character={character} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const characterSlug = params?.characterSlug as string;
  const data: CharacterQuery = await fetchGraphql(CharacterDocument, { characterSlug });

  return { props: { character: data.character } };
};

export default Page;
