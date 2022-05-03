import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import {
  CharacterAttributes,
  PageDashboardCharacterEditDocument,
  PageDashboardCharacterEditQuery,
  useUpdateCharacterMutation,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { loadingState } from '@/states/loading';

import { CharacterForm, DashboardBreadcrumbs, DashboardContent } from '@/components';

const Page: React.FC<PageDashboardCharacterEditQuery> = ({ character }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateCharacter, { loading }] = useUpdateCharacterMutation({
    onCompleted: () => {
      toast.success('キャラクターを更新しました。');
      router.back();
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
    <DashboardContent
      title="キャラクター編集"
      breadcrumb={<DashboardBreadcrumbs to="characterEdit" character={character} />}
    >
      <CharacterForm character={character} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const characterSlug = params?.slug as string;
  const data: PageDashboardCharacterEditQuery = await fetchGraphql(PageDashboardCharacterEditDocument, {
    characterSlug,
  });

  return { props: data };
};

export default Page;
