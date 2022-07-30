import React from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { CharacterForm, AdminBreadcrumbs, AdminContent } from '@/components';
import {
  CharacterAttributes,
  PageAdminCharacterEditDocument,
  PageAdminCharacterEditQuery,
  PageAdminCharacterEditQueryVariables,
  useUpdateCharacterMutation,
} from '@/generated/graphql';
import { fetchGraphql, loadingState } from '@/lib';

const Page: React.FC<PageAdminCharacterEditQuery> = ({ character }) => {
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
    <AdminContent title="キャラクター編集" breadcrumb={<AdminBreadcrumbs to="characterEdit" character={character} />}>
      <CharacterForm character={character} onSubmit={onSubmit} />
    </AdminContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const characterSlug = params?.slug as string;
  const variables: PageAdminCharacterEditQueryVariables = { characterSlug };
  const data: PageAdminCharacterEditQuery = await fetchGraphql(PageAdminCharacterEditDocument, variables);

  return { props: data };
};

export default Page;
